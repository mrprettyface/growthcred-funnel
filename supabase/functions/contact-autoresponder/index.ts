/**
 * The contact autoresponder.
 *
 * The one Supabase Edge Function the *visitor* (not a payment provider) talks
 * to. The browser POSTs the contact form here; this function validates it,
 * stores it in `contact_messages`, and immediately sends two emails through
 * Resend: an acknowledgment to the sender (the autoresponder), and a heads-up
 * to the business inbox (info@), so a new message is seen without opening the
 * Supabase dashboard.
 *
 * Security posture:
 * - No anon policy exists on `contact_messages`, so the public anon key alone
 *   cannot write a row or bypass the rate limit — this function is the only
 *   door, and it closes most of the way with a honeypot plus per-email
 *   throttling. It is a public form on a static site; determined spam is a
 *   Resend quota problem at worst, never a data-integrity one.
 * - The acknowledgment and notification are best-effort and independent: if
 *   either email fails, the message row still carries `reply_status` so it can
 *   be seen and answered by hand.
 *
 * Secrets (Supabase dashboard → Edge Functions → Secrets):
 * - RESEND_API_KEY       required to send; without it messages save with
 *                        reply_status 'skipped'
 * - PURCHASE_EMAIL_FROM  shared with the purchase email function
 * - CONTACT_NOTIFY_EMAIL optional; defaults to info@growthcred.co.za
 * - SITE_URL             optional; used in email copy links
 *
 * Deploy with JWT verification LEFT ON (the browser sends the anon key, which
 * is a valid JWT):
 *   supabase functions deploy contact-autoresponder
 */

import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("PURCHASE_EMAIL_FROM") ?? "GrowthCred <info@growthcred.co.za>";
const NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_EMAIL") ?? "info@growthcred.co.za";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://growthcred.co.za";
const WHATSAPP_DISPLAY = "+27 66 283 0289";

// The CORS surface is the site itself. Public forms get `*`: the endpoint
// holds no data and accepts nothing the form could not, so origin restriction
// adds friction (pages.dev previews, future domains) without real protection.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
} as const;

type JsonRecord = Record<string, unknown>;

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function getServiceRoleKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");
  if (legacy) return legacy;

  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}") as Record<string, string>;
    return keys.default ?? "";
  } catch {
    return "";
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

/** Service-role client: needed to write `contact_messages` (no anon policy). */
function supabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = getServiceRoleKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

type ResendResult = { id: string } | null;

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<ResendResult> {
  if (!RESEND_API_KEY) return null;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      reply_to: NOTIFY_TO,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`resend ${res.status}: ${detail.slice(0, 300)}`);
  }
  const body = (await res.json()) as { id?: string };
  return body.id ? (body as { id: string }) : null;
}

function ackEmail(name: string, email: string, message: string, receivedAt: string) {
  const first = escapeHtml(firstName(name));
  const subject = `We got your message, ${firstName(name)} — here's what happens next`;

  const text = [
    `Hi ${firstName(name)},`,
    ``,
    `Thanks for reaching out to GrowthCred. Your message came through on ${receivedAt} and a real person will reply to you within one business day (Monday to Friday).`,
    ``,
    `You wrote:`,
    `"${message}"`,
    ``,
    `Anything urgent in the meantime? WhatsApp us on ${WHATSAPP_DISPLAY}.`,
    ``,
    `Talk soon,`,
    `Phila Ngwenya`,
    `GrowthCred — we take it all off your plate`,
    SITE_URL,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4ef;font-family:Georgia,serif;color:#14161f;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="margin:0;font-size:20px;font-weight:700;color:#14161f;">Growth<span style="color:#c9a24b;">Cred</span><span style="color:#c9a24b;">.</span></p>
    <div style="margin-top:24px;background:#ffffff;border-top:4px solid #c9a24b;border-radius:12px;padding:28px;">
      <p style="margin:0;">Hi ${first},</p>
      <p style="margin:16px 0 0;">Thanks for reaching out to GrowthCred. Your message came through on ${escapeHtml(receivedAt)} and a real person will reply to you within <strong>one business day</strong> (Monday to Friday).</p>
      <p style="margin:16px 0 0;">You wrote:</p>
      <p style="margin:8px 0 0;border-left:3px solid #c9a24b;padding-left:12px;color:#4a4d59;">&ldquo;${escapeHtml(message)}&rdquo;</p>
      <p style="margin:16px 0 0;">Anything urgent in the meantime? WhatsApp us on <a href="https://wa.me/27662830289" style="color:#c9a24b;">${WHATSAPP_DISPLAY}</a>.</p>
      <p style="margin:24px 0 0;">Talk soon,<br/>Phila Ngwenya<br/><span style="color:#4a4d59;">GrowthCred &mdash; we take it all off your plate</span></p>
    </div>
    <p style="margin:16px 0 0;font-family:monospace;font-size:11px;color:#8a8d98;">You are receiving this because you sent a message via ${SITE_URL}. One reply, no list.</p>
  </div>
</body></html>`;

  return { subject, html, text };
}

/**
 * The AI Implementation Guide, sent when `source` is "ai_guide" (the site-wide
 * guide card). A fixed template: the visitor's text never reaches the body, so
 * this branch cannot be used to send arbitrary email either.
 */
function guideEmail(name: string) {
  const first = escapeHtml(firstName(name));
  const link = `${SITE_URL}/ai-implementation-guide`;
  const subject = `Your AI Implementation Guide, ${firstName(name)}`;
  const text = [
    `Hi ${firstName(name)},`,
    ``,
    `Here is the AI Implementation Guide you asked for: seven steps to put AI to work in your business without changing the way you work or the platforms you work in.`,
    ``,
    `Read it here: ${link}`,
    ``,
    `Start with step two this week: list every document and message that leaves the business more than once. That list is where the hours are.`,
    ``,
    `Want to talk it through with a specialist? Reply to this email or WhatsApp us on ${WHATSAPP_DISPLAY}.`,
    ``,
    `GrowthCred — we take it all off your plate`,
    SITE_URL,
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4ef;font-family:Georgia,serif;color:#14161f;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="margin:0;font-size:20px;font-weight:700;color:#14161f;">Growth<span style="color:#c9a24b;">Cred</span><span style="color:#c9a24b;">.</span></p>
    <div style="margin-top:24px;background:#ffffff;border-top:4px solid #c9a24b;border-radius:12px;padding:28px;">
      <p style="margin:0;">Hi ${first},</p>
      <p style="margin:16px 0 0;">Here is the <strong>AI Implementation Guide</strong> you asked for: seven steps to put AI to work in your business without changing the way you work or the platforms you work in.</p>
      <p style="margin:24px 0 0;"><a href="${link}" style="display:inline-block;background:#c9a24b;color:#14161f;text-decoration:none;font-family:Arial,sans-serif;font-weight:700;padding:12px 22px;border-radius:999px;">Read the guide</a></p>
      <p style="margin:24px 0 0;">Start with step two this week: list every document and message that leaves the business more than once. That list is where the hours are.</p>
      <p style="margin:16px 0 0;">Want to talk it through with a specialist? Reply to this email or WhatsApp us on <a href="https://wa.me/27662830289" style="color:#c9a24b;">${WHATSAPP_DISPLAY}</a>.</p>
      <p style="margin:24px 0 0;color:#4a4d59;">GrowthCred &mdash; we take it all off your plate</p>
    </div>
    <p style="margin:16px 0 0;font-family:monospace;font-size:11px;color:#8a8d98;">You are receiving this because you asked for the guide on ${SITE_URL}. Reply "unsubscribe" and we will not email you again.</p>
  </div>
</body></html>`;
  return { subject, html, text };
}

function notifyEmail(name: string, email: string, whatsapp: string, message: string, id: string) {
  const subject = `New GrowthCred message from ${name}`;
  const text = [
    `New contact message (${id})`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp || "—"}`,
    ``,
    `Message:`,
    message,
  ].join("\n");
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#14161f;">
  <p><strong>New contact message</strong> <span style="color:#8a8d98;">(${escapeHtml(id)})</span></p>
  <p>Name: ${escapeHtml(name)}<br/>Email: ${escapeHtml(email)}<br/>WhatsApp: ${escapeHtml(whatsapp) || "&mdash;"}</p>
  <p style="border-left:3px solid #c9a24b;padding-left:12px;white-space:pre-wrap;">${escapeHtml(message)}</p>
  <p style="color:#8a8d98;">Reply to this email to answer them directly.</p>
</body></html>`;
  return { subject, html, text };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let payload: JsonRecord;
  try {
    payload = JSON.parse(await request.text()) as JsonRecord;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: the field is visually hidden in the form, so only a bot fills it.
  // Pretend success — never tell a bot it was caught.
  if (getString(payload.company)) return json({ ok: true });

  const name = getString(payload.name).slice(0, 120);
  const email = getString(payload.email).slice(0, 200);
  const whatsapp = getString(payload.whatsapp).slice(0, 32);
  const message = getString(payload.message).slice(0, 5000);
  const source = getString(payload.source).slice(0, 40) || "contact_page";

  const emailOk = /.+@.+\..+/.test(email);
  if (!name || !emailOk || !message) {
    return json({ ok: false, error: "invalid_fields" }, 422);
  }

  const supabase = supabaseAdmin();
  if (!supabase) return json({ ok: false, error: "not_configured" }, 500);

  // Light throttle: more than two messages from one address in ten minutes is
  // either a double-click or a flood, and neither needs a third row.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .ilike("email", email)
    .gte("created_at", since);
  if ((count ?? 0) >= 2) return json({ ok: false, error: "rate_limited" }, 429);

  const { data: inserted, error: insertError } = await supabase
    .from("contact_messages")
    .insert({ name, email, whatsapp: whatsapp || null, message, source })
    .select("id")
    .single();
  if (insertError) {
    console.error("[contact-autoresponder] insert failed", insertError.message);
    return json({ ok: false, error: "save_failed" }, 500);
  }
  const id = inserted!.id as string;

  // Acknowledgment to the sender. The message is already safe in the table, so
  // an email failure downgrades the reply rather than losing the contact.
  const receivedAt = new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });
  try {
    const ack = source === "ai_guide" ? guideEmail(name) : ackEmail(name, email, message, receivedAt);
    const result = await sendEmail({ to: email, ...ack });
    await supabase
      .from("contact_messages")
      .update(
        result
          ? { reply_status: "sent", reply_provider_id: result.id, reply_error: null }
          : { reply_status: "skipped", reply_error: "resend_not_configured" },
      )
      .eq("id", id);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "acknowledgment email failed";
    await supabase
      .from("contact_messages")
      .update({ reply_status: "failed", reply_error: detail.slice(0, 1000) })
      .eq("id", id);
  }

  // Heads-up to the business inbox. Failure here never fails the request: the
  // dashboard view is the fallback for noticing a new message.
  try {
    const note = notifyEmail(name, email, whatsapp, message, id);
    if (source === "ai_guide") note.subject = `New guide sign-up: ${name}`;
    else if (source === "call_application") note.subject = `New /call application: ${name}`;
    await sendEmail({ to: NOTIFY_TO, ...note });
  } catch (error) {
    console.error(
      "[contact-autoresponder] notification failed",
      error instanceof Error ? error.message : "unknown_error",
    );
  }

  return json({ ok: true, id });
});
