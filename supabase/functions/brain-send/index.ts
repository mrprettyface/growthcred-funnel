/**
 * brain-send — emails a visitor their finished Business Brain.
 *
 * The /brain builder assembles the instruction document client-side, so by
 * the end the visitor is holding their text on their own screen. This
 * function exists so the text also survives the night: it takes the
 * STRUCTURED ANSWERS (not the document), regenerates the document from the
 * server-side template, saves the row to `business_brains`, and emails it.
 *
 * Why answers, not the finished text: the email body is a fixed template.
 * Nothing the browser sends can become arbitrary email content, so the
 * endpoint cannot be turned into a spam relay — the same reasoning that
 * gives `contact_messages` and `business_brains` no anon policies.
 *
 * The markdown template here MUST stay character-for-character identical to
 * `buildBrainMarkdown` in `src/lib/brain.ts`. The comment there says the
 * same thing. If they drift, the emailed copy and the on-screen copy differ.
 *
 * Secrets: same set as `contact-autoresponder` — RESEND_API_KEY,
 * PURCHASE_EMAIL_FROM, optional CONTACT_NOTIFY_EMAIL and SITE_URL.
 *
 * Deploy with JWT verification LEFT ON (the browser sends the anon key,
 * which is a valid JWT):  supabase functions deploy brain-send
 */

import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("PURCHASE_EMAIL_FROM") ?? "GrowthCred <info@growthcred.co.za>";
const NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_EMAIL") ?? "info@growthcred.co.za";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://growthcred.co.za";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
} as const;

type JsonRecord = Record<string, unknown>;

const ANSWER_IDS = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15"] as const;
type AnswerId = (typeof ANSWER_IDS)[number];
type Answers = Record<AnswerId, string>;

const ANSWER_MAX = 1200; // per-field cap; generous, but bounded

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );
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

/** Server-side twin of buildBrainMarkdown in src/lib/brain.ts — keep in sync. */
function buildBrain(answers: Answers): string {
  const get = (id: AnswerId): string => answers[id] || `[fill in: ${id.toUpperCase()}]`;
  return [
    `You are the AI assistant for ${get("q1")}.`,
    ``,
    `WHO WE SERVE`,
    `Our ideal client is ${get("q4")}. They hire us to make ${get("q5")} go away.`,
    `We do not serve ${get("q6")}.`,
    ``,
    `WHAT WE DO`,
    `The work clients pay for most is ${get("q2")}. A typical job runs like this: ${get("q3")}.`,
    ``,
    `HOW I SOUND`,
    `Write ${get("q7")}. Never use ${get("q8")}.`,
    answers.q9
      ? `Match the tone of this real example of mine: "${answers.q9}"`
      : `Match a plain, human tone in everything you write for me.`,
    ``,
    `MONEY`,
    `We price by ${get("q10")}, on terms of ${get("q11")}.`,
    `We can flex on ${get("q12")}.`,
    ``,
    `RULES`,
    `Never ${get("q13")}. When clients ask ${get("q14")}, answer faithfully from what I wrote here.`,
    `Above all, never get ${get("q15")} wrong — ask me before assuming.`,
    ``,
    `If anything I ask for needs a detail you do not have, ask me one short question instead of guessing.`,
  ].join("\n");
}

function emailHtml(name: string, brain: string): string {
  const first = escapeHtml(name.split(/\s+/)[0] || "there");
  const blocks = brain
    .split("\n")
    .map((line) => escapeHtml(line) || "&nbsp;")
    .join("\n");

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4ef;font-family:Georgia,serif;color:#14161f;">
  <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
    <p style="margin:0;font-size:20px;font-weight:700;">Growth<span style="color:#c9a24b;">Cred</span><span style="color:#c9a24b;">.</span></p>
    <div style="margin-top:24px;background:#ffffff;border-top:4px solid #c9a24b;border-radius:12px;padding:28px;">
      <p style="margin:0;">Hi ${first},</p>
      <p style="margin:14px 0 0;">Here is your Business Brain — the paragraph that teaches any AI your business.</p>
      <p style="margin:14px 0 0;"><strong>Where to paste it:</strong></p>
      <p style="margin:6px 0 0;color:#4a4d59;">ChatGPT: Settings &rarr; Personalization &rarr; Custom Instructions &middot; Claude: Project instructions &middot; Copilot &amp; Gemini: their settings have a memory / instructions box.</p>
      <p style="margin:14px 0 0;"><strong>The test:</strong> open a fresh chat and ask for a follow-up message to a quiet client. If it sounds like you, it worked.</p>
      <div style="margin:20px 0 0;background:#f6f4ef;border:1px solid #e2ddd0;border-radius:8px;padding:18px;font-family:Menlo,Consolas,monospace;font-size:12px;line-height:1.7;color:#14161f;white-space:pre-wrap;">${blocks}</div>
      <p style="margin:20px 0 0;">Keep this email. When a client conversation teaches you something new, update a line and re-paste. The document is the asset — the AI just reads it.</p>
      <p style="margin:20px 0 0;">Ready for the full build? <a href="${SITE_URL}" style="color:#c9a24b;">GrowthCred — Get 10 Hours a Week Back, in One Day.</a></p>
      <p style="margin:18px 0 0;">Talk soon,<br/>Phila Ngwenya</p>
    </div>
    <p style="margin:16px 0 0;font-family:monospace;font-size:11px;color:#8a8d98;">You asked for this at ${SITE_URL}/brain. One email, no list.</p>
  </div>
</body></html>`;
}

function emailText(brain: string): string {
  return [
    `Your Business Brain, from GrowthCred.`,
    ``,
    `Where to paste it:`,
    `- ChatGPT: Settings > Personalization > Custom Instructions (or any Project's instructions)`,
    `- Claude: Project instructions`,
    `- Copilot / Gemini: the memory or instructions box in settings`,
    ``,
    `The test: open a fresh chat and ask for a follow-up message to a quiet client.`,
    `If it sounds like you, it worked.`,
    ``,
    `--- Your Business Brain (copy everything below) ---`,
    ``,
    brain,
    ``,
    `---`,
    ``,
    `Keep this email. When a client conversation teaches you something new, update a line and re-paste.`,
    ``,
    `Ready for the full build? ${SITE_URL}`,
    ``,
    `Phila Ngwenya — GrowthCred`,
  ].join("\n");
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<string | null> {
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
  return body.id ?? null;
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

  const name = getString(payload.name).slice(0, 120);
  const email = getString(payload.email).slice(0, 200);
  if (!name || !/.+@.+\..+/.test(email)) return json({ ok: false, error: "invalid_fields" }, 422);

  const rawAnswers = (payload.answers && typeof payload.answers === "object"
    ? payload.answers
    : {}) as JsonRecord;
  const answers = {} as Answers;
  for (const id of ANSWER_IDS) {
    answers[id] = getString(rawAnswers[id]).slice(0, ANSWER_MAX);
  }
  // At least the identity question must be present: a brain without Q1 is a
  // bot probing the endpoint, not a builder completion.
  if (!answers.q1) return json({ ok: false, error: "invalid_fields" }, 422);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKey = getServiceRoleKey();
  if (!supabaseUrl || !serviceKey) return json({ ok: false, error: "not_configured" }, 500);
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // Throttle: three brains per address per hour is plenty, even for a room of
  // people redoing answers on the same phone.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("business_brains")
    .select("id", { count: "exact", head: true })
    .ilike("email", email)
    .gte("created_at", since);
  if ((count ?? 0) >= 3) return json({ ok: false, error: "rate_limited" }, 429);

  const { data: inserted, error: insertError } = await supabase
    .from("business_brains")
    .insert({ name, email, answers, source: "brain_builder" })
    .select("id")
    .single();
  if (insertError) {
    console.error("[brain-send] insert failed", insertError.message);
    return json({ ok: false, error: "save_failed" }, 500);
  }
  const id = inserted!.id as string;

  const brain = buildBrain(answers);
  try {
    const providerId = await sendEmail({
      to: email,
      subject: `Your Business Brain — copy, paste, done`,
      html: emailHtml(name, brain),
      text: emailText(brain),
    });
    await supabase
      .from("business_brains")
      .update(
        providerId
          ? { email_status: "sent", email_provider_id: providerId, email_error: null }
          : { email_status: "skipped", email_error: "resend_not_configured" },
      )
      .eq("id", id);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "brain email failed";
    await supabase
      .from("business_brains")
      .update({ email_status: "failed", email_error: detail.slice(0, 1000) })
      .eq("id", id);
  }

  // Quiet heads-up to the business inbox. Failure never fails the request.
  try {
    await sendEmail({
      to: NOTIFY_TO,
      subject: `Business Brain completed by ${name}`,
      html: `<p>${escapeHtml(name)} (${escapeHtml(email)}) completed the Business Brain builder.</p>`,
      text: `${name} (${email}) completed the Business Brain builder.`,
    });
  } catch (error) {
    console.error("[brain-send] notification failed",
      error instanceof Error ? error.message : "unknown_error");
  }

  return json({ ok: true, id });
});
