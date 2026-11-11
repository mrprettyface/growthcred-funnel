/**
 * Which ad brought this registration.
 *
 * The ad plan in docs/marketing/jcci-webinar-meta-ads.md runs roughly twenty
 * small ad sets at once, and the whole method depends on one number per ad set:
 * what a registration cost there. Throttle the expensive ones, feed the cheap
 * ones, build more like the cheap ones. Without that number per ad set, the
 * structure is just a lot of ad sets.
 *
 * There is no server-side tracking on this site and no analytics provider is
 * connected yet (see the note at the top of src/lib/analytics.ts). So the
 * cheapest honest way to get the number is to carry Meta's own URL parameters
 * onto the registration row and divide:
 *
 *     Meta's spend for an ad set  /  rows carrying that ad set's utm_content
 *       = cost per registration, for that ad set
 *
 * That is Meta's reported spend, not independently verified attribution, and it
 * misses anyone who clicks an ad today and registers from a bookmark next week.
 * It is good enough to decide which ad sets to throttle, which is all it is for.
 *
 * Captured once and remembered for the visit, exactly as promo.ts, referral.ts
 * and segments.ts do, because React Router drops the query string on the first
 * client navigation.
 */

const KEY = "gc_utm";

/** The five standard UTM fields, plus the segment slug the ad carried. */
export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** The AD SET. This is the one the throttle rule is computed per. */
  utm_content: string | null;
  /** The individual ad or hook inside that ad set. */
  utm_term: string | null;
};

const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const EMPTY: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  utm_term: null,
};

/**
 * Sanitised to a short, printable slug. These values are written to a row and
 * read back in a dashboard, and they arrive from a URL anyone can type, so they
 * are treated as hostile: lowercased, stripped to a safe alphabet, capped.
 */
function clean(raw: string | null): string | null {
  const v = (raw ?? "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 64);
  return v.length ? v : null;
}

/** True when at least one field carries something worth storing. */
function isEmpty(a: Attribution): boolean {
  return FIELDS.every((f) => a[f] === null);
}

/**
 * This visit's attribution: from the URL if the visitor has just arrived on an
 * ad link, otherwise whatever this visit already captured. All nulls when
 * someone came straight to the site, which is a real answer, not a failure.
 */
export function activeAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = Object.fromEntries(
    FIELDS.map((f) => [f, clean(params.get(f))]),
  ) as Attribution;

  if (!isEmpty(fromUrl)) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(fromUrl));
    } catch {
      /* private browsing: attribution still applies for this page load */
    }
    return fromUrl;
  }

  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return EMPTY;
    const stored = parsed as Record<string, unknown>;
    return Object.fromEntries(
      FIELDS.map((f) => [f, typeof stored[f] === "string" ? clean(stored[f] as string) : null]),
    ) as Attribution;
  } catch {
    return EMPTY;
  }
}
