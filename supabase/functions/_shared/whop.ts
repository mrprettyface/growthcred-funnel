/**
 * Whop Standard Webhooks verification.
 *
 * Keep this independent of Supabase so it can be exercised with a local Node
 * test as well as run in the Deno Edge Function. The raw request body must be
 * passed unchanged; parsing and re-serialising JSON changes the signed bytes.
 */
export type HeaderSource = Headers | Record<string, string | undefined>;

function readHeader(headers: HeaderSource, name: string): string | null {
  if (headers instanceof Headers) return headers.get(name);
  const target = name.toLowerCase();
  const key = Object.keys(headers).find((candidate) => candidate.toLowerCase() === target);
  return key ? headers[key] ?? null : null;
}

function constantTimeEqual(left: string, right: string): boolean {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) difference |= a[i] ^ b[i];
  return difference === 0;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** Return true only for a valid, recent Whop signature. */
export async function verifyWhopSignature(
  rawBody: string,
  headers: HeaderSource,
  secret: string,
  nowMs = Date.now(),
): Promise<boolean> {
  const webhookId = readHeader(headers, "webhook-id");
  const timestamp = readHeader(headers, "webhook-timestamp");
  const signatureHeader = readHeader(headers, "webhook-signature");
  if (!webhookId || !timestamp || !signatureHeader || !secret) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) return false;
  if (Math.abs(nowMs / 1000 - timestampSeconds) > 5 * 60) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const message = `${webhookId}.${timestamp}.${rawBody}`;
  const digest = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)),
  );
  const expected = toBase64(digest);

  // Standard Webhooks permits more than one versioned signature during key
  // rotation. Accept only a v1 signature that matches in constant time.
  return signatureHeader.split(" ").some((part) => {
    const [version, value] = part.split(",", 2);
    return version === "v1" && value ? constantTimeEqual(value, expected) : false;
  });
}

