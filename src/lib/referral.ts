/**
 * Referrals, remembered for the length of one visit.
 *
 * Every registrant gets a stable code derived from their email, so their share
 * link `/webinar?ref=<code>` is the same every time without us storing a lookup
 * table (anon is insert-only; there is nothing to SELECT against). A visitor who
 * arrives on that link has the code captured here and written to their own row
 * as `referred_by`, exactly the way `promo.ts` captures `?promo=` — because
 * React Router drops the query string on the first client navigation, so reading
 * the URL later would lose it. We read it once and keep it in sessionStorage.
 *
 * Matching referrer to referred is done by hand from the dashboard/Sheet:
 * `referred_by` on the new row equals the referrer's `ref_code`. Fulfilment of
 * the reward (the "Stop the Leak" pack) is manual, like the other class sends.
 */

const KEY = "gc_ref";

/**
 * A stable, URL-safe code for someone, derived from their email.
 *
 * Deterministic (same email in, same code out) and normalised (case and
 * surrounding space do not matter), so a link shared today still resolves to the
 * same person next week. It is a one-way hash, never the email itself, so no
 * address is ever placed in a URL. base36-uppercased keeps it inside [0-9A-Z],
 * which is a subset of what `activeReferrer` accepts, so a generated code always
 * survives the round trip back through a URL.
 */
export function refCode(email: string): string {
  const normalized = email.trim().toLowerCase();
  // cyrb53 — a small, well-distributed non-cryptographic hash. We do not need
  // secrecy here, only that two different people rarely collide on one code.
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const n = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return n.toString(36).toUpperCase().slice(0, 8);
}

/**
 * Reads `?ref=` if present, otherwise whatever this visit already captured.
 *
 * Sanitised to the same [A-Za-z0-9] alphabet a generated code uses and capped in
 * length, so a mangled or hostile query value can never become a row value or,
 * worse, reach anything that trusts it. An empty result after sanitising is
 * treated as no referrer at all.
 */
export function activeReferrer(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const clean = (raw: string | null): string | undefined => {
    const v = (raw ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 16);
    return v.length ? v.toUpperCase() : undefined;
  };

  const fromUrl = clean(new URLSearchParams(window.location.search).get("ref"));
  if (fromUrl) {
    try {
      sessionStorage.setItem(KEY, fromUrl);
    } catch {
      /* private browsing: the referrer still applies for this page load */
    }
    return fromUrl;
  }

  try {
    return clean(sessionStorage.getItem(KEY));
  } catch {
    return undefined;
  }
}

/** The absolute link a registrant shares to bring someone else to the class. */
export function referralUrl(code: string): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://growthcred.co.za";
  return `${origin}/webinar?ref=${encodeURIComponent(code)}`;
}
