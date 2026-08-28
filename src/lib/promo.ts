/**
 * Promo codes, remembered for the length of the funnel.
 *
 * A code arrives as `?promo=CODE` on a checkout URL. React Router drops the
 * query string the moment we push from /checkout to /upsell, so reading the URL
 * at each payment step would silently apply the code to the first purchase and
 * to nothing after it. We read it once and keep it in sessionStorage, alongside
 * the order, so every step of one visit is offered the same deal.
 *
 * Whop remains the authority: it silently ignores a code it does not recognise,
 * so a stale or mistyped value costs a discount, never a sale.
 */

const KEY = "gc_promo";

/** Reads `?promo=` if present, otherwise whatever this visit already captured. */
export function activePromo(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const fromUrl = new URLSearchParams(window.location.search).get("promo")?.trim();
  if (fromUrl) {
    try {
      sessionStorage.setItem(KEY, fromUrl);
    } catch {
      /* private browsing: the code still applies for this page load */
    }
    return fromUrl;
  }

  try {
    return sessionStorage.getItem(KEY) ?? undefined;
  } catch {
    return undefined;
  }
}
