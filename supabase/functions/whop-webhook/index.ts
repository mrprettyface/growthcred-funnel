import { createClient } from "npm:@supabase/supabase-js@2";
import { verifyWhopSignature } from "../_shared/whop.ts";

const COMPANY_ID = Deno.env.get("WHOP_COMPANY_ID") ?? "biz_6zU0cw4ZzQ1SpU";
const WEBHOOK_SECRET = Deno.env.get("WHOP_WEBHOOK_SECRET") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("PURCHASE_EMAIL_FROM") ?? "GrowthCred <info@growthcred.co.za>";

const PLAN_TO_OFFER = {
  plan_72K2Kk6oPeLRY: "workshop",
  plan_UCryhOI0svT2W: "bump",
  plan_Lrt0EkLTJD5nx: "upsell",
  plan_Pbw4zu8ngelfI: "downsell",
} as const;

const OFFER_LABELS: Record<string, string> = {
  workshop: "Get 10 Hours a Week Back, in One Day",
  bump: "Skip the Setup",
  upsell: "Done With You: Get Your Time Back",
  downsell: "Do It Yourself: Get Your Time Back",
};

type JsonRecord = Record<string, unknown>;

type Order = {
  reference: string;
  email: string;
  name: string | null;
  items: string[];
  amount_cents: number;
};

function getString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
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

function getPayment(event: JsonRecord): JsonRecord {
  return (event.data && typeof event.data === "object" ? event.data : {}) as JsonRecord;
}

async function findOrder(
  supabase: ReturnType<typeof createClient>,
  email: string,
  offer: string,
): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("reference,email,name,items,amount_cents")
    .ilike("email", email)
    // The same order continues through the upsell/downsell steps. The first
    // payment changes it to paid, so those later verified payments must still
    // be able to find the order and its original name/reference.
    .in("status", ["awaiting_payment", "paid"])
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw new Error(`order lookup failed: ${error.message}`);

  const rows = (data ?? []) as Order[];
  const exactPlanMatch = rows.find((row) => {
    const items = Array.isArray(row.items) ? row.items : [];
    if (offer === "workshop") return items.includes("workshop") && !items.includes("bump");
    if (offer === "bump") return items.includes("workshop") && items.includes("bump");
    return items.includes("workshop");
  });
  return exactPlanMatch ?? rows[0] ?? null;
}

function buildEmail({
  name,
  email,
  reference,
  items,
  offer,
  total,
  currency,
}: {
  name: string;
  email: string;
  reference: string | null;
  items: string[];
  offer: string;
  total: number | null;
  currency: string | null;
}): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(name);
  const greetingName = escapeHtml(firstName(name));
  const safeEmail = escapeHtml(email);
  const safeReference = reference ? escapeHtml(reference) : "Not available";
  const purchasedItems = Array.from(new Set([...items, offer])).filter((item) => OFFER_LABELS[item]);
  const itemList = purchasedItems.map((item) => `<li>${escapeHtml(OFFER_LABELS[item])}</li>`).join("");
  const price = total !== null && currency
    ? `${currency.toUpperCase()} ${total.toLocaleString("en-ZA", { maximumFractionDigits: 2 })}`
    : null;
  const priceLine = price ? `<p><strong>Payment received:</strong> ${escapeHtml(price)}</p>` : "";
  const itemText = purchasedItems.map((item) => `- ${OFFER_LABELS[item]}`).join("\n");

  return {
    subject: `You’re in, ${firstName(name)} — your GrowthCred purchase is confirmed`,
    html: `<!doctype html><html><body style="margin:0;background:#f7f3eb;color:#1a1a24;font:16px/1.6 Arial,sans-serif"><div style="max-width:620px;margin:0 auto;padding:40px 24px"><p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#9b7a32">GrowthCred</p><h1 style="font-size:32px;line-height:1.15">Congratulations, ${greetingName}.</h1><p>That was a smart move. Your payment has been confirmed and you’re officially in.</p><div style="margin:28px 0;padding:20px;border-radius:14px;background:#1a1a24;color:#fff"><p style="margin-top:0;color:#c8a04a;font-weight:bold">What you bought</p><ul>${itemList}</ul>${priceLine}<p style="margin-bottom:0;color:#d9d5cc"><strong>Order reference:</strong> ${safeReference}</p></div><p>We’ll send the practical next steps and access details to <strong>${safeEmail}</strong>. Keep an eye on your inbox, and check Promotions or Spam if the next email doesn’t appear.</p><p>You’ve made the decision. Now we’ll help you turn it into time back.</p><p style="margin-top:32px">— Phila<br/>GrowthCred</p></div></body></html>`,
    text: `Congratulations, ${name}.\n\nYour payment has been confirmed and you’re officially in.\n\nWhat you bought:\n${itemText}\n${price ? `\nPayment received: ${price}` : ""}\nOrder reference: ${reference ?? "Not available"}\n\nWe’ll send the practical next steps and access details to ${email}. Check Promotions or Spam if the next email doesn’t appear.\n\nYou’ve made the decision. Now we’ll help you turn it into time back.\n\n— Phila\nGrowthCred`,
  };
}

async function sendConfirmation({
  paymentId,
  email,
  name,
  reference,
  items,
  offer,
  total,
  currency,
}: {
  paymentId: string;
  email: string;
  name: string;
  reference: string | null;
  items: string[];
  offer: string;
  total: number | null;
  currency: string | null;
}): Promise<string> {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
  const message = buildEmail({ name, email, reference, items, offer, total, currency });
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      // Whop retries deliveries; Resend makes those retries safe for 24 hours.
      "Idempotency-Key": `growthcred/purchase-confirmation/${paymentId}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [email],
      reply_to: "info@growthcred.co.za",
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });
  const body = (await response.json().catch(() => ({}))) as JsonRecord;
  if (!response.ok) {
    const detail = getString(body.message) ?? getString(body.error) ?? `HTTP ${response.status}`;
    throw new Error(`Resend rejected email: ${detail}`);
  }
  const id = getString(body.id);
  if (!id) throw new Error("Resend returned no email id");
  return id;
}

async function handlePayment(event: JsonRecord, webhookId: string): Promise<void> {
  const payment = getPayment(event);
  const paymentId = getString(payment.id);
  const plan = (payment.plan && typeof payment.plan === "object" ? payment.plan : {}) as JsonRecord;
  const planId = getString(plan.id);
  const offer = planId ? PLAN_TO_OFFER[planId as keyof typeof PLAN_TO_OFFER] : undefined;
  const user = (payment.user && typeof payment.user === "object" ? payment.user : {}) as JsonRecord;
  const email = getString(user.email);
  if (!paymentId || !planId || !offer || !email) {
    throw new Error("payment.succeeded is missing payment id, supported plan, or customer email");
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = getServiceRoleKey();
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service credentials are not configured");
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: existing, error: existingError } = await supabase
    .from("payment_webhook_events")
    .select("email_status")
    .eq("payment_id", paymentId)
    .maybeSingle();
  if (existingError) throw new Error(`payment event lookup failed: ${existingError.message}`);
  if (existing?.email_status === "sent") return;

  const order = await findOrder(supabase, email, offer);
  const orderItems = order && Array.isArray(order.items) ? order.items : [];
  const displayName = order?.name ?? getString(user.name) ?? firstName(email);
  const reference = order?.reference ?? null;
  const total = typeof payment.total === "number" ? payment.total : null;
  const currency = getString(payment.currency);

  const { error: eventError } = await supabase.from("payment_webhook_events").upsert(
    {
      webhook_id: webhookId,
      payment_id: paymentId,
      email,
      plan_id: planId,
      order_reference: reference,
      email_status: "pending",
      last_error: null,
    },
    { onConflict: "payment_id" },
  );
  if (eventError) throw new Error(`payment event write failed: ${eventError.message}`);

  if (order) {
    const items = Array.from(new Set([...orderItems, offer]));
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        provider_ref: paymentId,
        paid_at: new Date().toISOString(),
        whop_plan_id: planId,
        items,
      })
      .eq("reference", order.reference);
    if (orderError) throw new Error(`order update failed: ${orderError.message}`);
  }

  try {
    const emailId = await sendConfirmation({
      paymentId,
      email,
      name: displayName,
      reference,
      items: orderItems,
      offer,
      total,
      currency,
    });
    const { error: sentError } = await supabase
      .from("payment_webhook_events")
      .update({ email_status: "sent", email_provider_id: emailId, last_error: null })
      .eq("payment_id", paymentId);
    if (sentError) throw new Error(`payment event finalization failed: ${sentError.message}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "confirmation email failed";
    await supabase
      .from("payment_webhook_events")
      .update({ email_status: "failed", last_error: message.slice(0, 1000) })
      .eq("payment_id", paymentId);
    throw error;
  }
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!WEBHOOK_SECRET) return new Response("Webhook is not configured", { status: 500 });

  const rawBody = await request.text();
  const valid = await verifyWhopSignature(rawBody, request.headers, WEBHOOK_SECRET);
  if (!valid) return new Response("Invalid signature", { status: 401 });

  let event: JsonRecord;
  try {
    event = JSON.parse(rawBody) as JsonRecord;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const type = getString(event.type);
  const accountId = getString(event.account_id) ?? getString(event.company_id);
  const webhookId = getString(event.id) ?? request.headers.get("webhook-id");
  if (!webhookId) return new Response("Missing webhook id", { status: 400 });
  if (accountId && accountId !== COMPANY_ID) return new Response("Wrong account", { status: 403 });
  if (type !== "payment.succeeded") return new Response("Ignored", { status: 200 });

  try {
    await handlePayment(event, webhookId);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("[whop-webhook] payment handling failed", {
      webhookId,
      paymentId: getString(getPayment(event).id),
      error: error instanceof Error ? error.message : "unknown_error",
    });
    // A non-2xx response asks Whop to retry. The database and Resend idempotency
    // keys make the retry safe after a transient failure.
    return new Response("Retry", { status: 500 });
  }
});
