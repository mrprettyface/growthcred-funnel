import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] ?? "runtime";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function sourceChecks() {
  const webhook = await readFile(path.join(root, "supabase/functions/whop-webhook/index.ts"), "utf8");
  const verifier = await readFile(path.join(root, "supabase/functions/_shared/whop.ts"), "utf8");
  const config = await readFile(path.join(root, "supabase/config.toml"), "utf8");
  const client = await readFile(path.join(root, "src/components/WhopPay.tsx"), "utf8");

  for (const marker of [
    "payment.succeeded",
    "verifyWhopSignature",
    "webhook-id",
    "payment_webhook_events",
    'status: "paid"',
    '"Idempotency-Key"',
    "RESEND_API_KEY",
    "PURCHASE_EMAIL_FROM",
  ]) assert(webhook.includes(marker), `webhook is missing ${marker}`);
  for (const marker of ["HMAC", "webhook-signature", "webhook-timestamp", "5 * 60", "constantTimeEqual"]) {
    assert(verifier.includes(marker), `verifier is missing ${marker}`);
  }
  assert(config.includes("[functions.whop-webhook]") && config.includes("verify_jwt = false"), "webhook JWT config is missing");
  assert(!client.includes("RESEND_API_KEY") && !client.includes("api.resend.com"), "email sending leaked into the browser client");
  console.log("purchase email source checks passed");
}

async function schemaChecks() {
  const schema = await readFile(path.join(root, "supabase/schema.sql"), "utf8");
  for (const marker of [
    "create table if not exists public.payment_webhook_events",
    "webhook_id       text primary key",
    "payment_id       text not null unique",
    "email_status     text not null default 'pending'",
    "paid_at         timestamptz",
    "whop_plan_id    text",
    "create policy \"anon can create an order\"",
  ]) assert(schema.includes(marker), `schema is missing ${marker}`);
  assert(!schema.includes("anon can update payment_webhook_events"), "payment event update policy would trust the browser");
  console.log("purchase email schema checks passed");
}

async function runtimeChecks() {
  const { verifyWhopSignature } = await import(
    pathToFileURL(path.join(root, "supabase/functions/_shared/whop.ts")).href,
  );
  const secret = "ws_test_secret";
  const body = JSON.stringify({ id: "msg_test", type: "payment.succeeded" });
  const webhookId = "msg_test";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", secret)
    .update(`${webhookId}.${timestamp}.${body}`)
    .digest("base64");
  const headers = {
    "webhook-id": webhookId,
    "webhook-timestamp": timestamp,
    "webhook-signature": `v1,${signature}`,
  };

  assert(await verifyWhopSignature(body, headers, secret), "valid signature was rejected");
  assert(!(await verifyWhopSignature(`${body}x`, headers, secret)), "tampered body was accepted");
  const stale = { ...headers, "webhook-timestamp": String(Number(timestamp) - 301) };
  assert(!(await verifyWhopSignature(body, stale, secret)), "stale signature was accepted");
  console.log("purchase email verification passed");
}

if (mode === "source") await sourceChecks();
else if (mode === "schema") await schemaChecks();
else await runtimeChecks();
