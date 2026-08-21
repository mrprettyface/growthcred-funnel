/**
 * Single source of truth for what is sold and what it costs.
 *
 * Prices below are the owner's RECOMMENDED defaults (confirm before launch).
 * Amounts are in CENTS (ZAR). Change a price here and checkout, the upsell,
 * the downsell and the wire instruction all update.
 */

export type Offer = {
  id: string;
  /** Outcome-first name. Names the result, not the thing. */
  name: string;
  blurb: string;
  amountCents: number | null; // null = not set
};

export const WORKSHOP: Offer = {
  id: "workshop",
  name: "Get 10 Hours a Week Back, in One Day",
  blurb: "Get 10 hours a week back, in one day, with the systems built and running before you leave.",
  amountCents: 99000, // R990 recommended (hold R1 950 to keep the founding price)
};

export const ORDER_BUMP: Offer = {
  id: "bump",
  name: "Skip the Setup",
  blurb:
    "We set up your business brain for you before the day, so you arrive ready to build instead of starting from a blank page.",
  amountCents: 50000, // R500, so workshop + bump = R1 490 and matches Whop plan B exactly
};

export const UPSELL: Offer = {
  id: "upsell",
  name: "Done With You: Get Your Time Back",
  blurb:
    "We build your core systems with you, so you get your time back faster and never get stuck doing it alone.",
  amountCents: 990000, // R9 900 recommended
};

export const DOWNSELL: Offer = {
  id: "downsell",
  name: "Try It Free for 7 Days",
  blurb: "Start today, pay in 7 days. Full access from the moment you begin.",
  amountCents: 990000, // 7-day trial converts to the full upsell (R9 900) on day 7
};

export const OFFERS: Record<string, Offer> = {
  [WORKSHOP.id]: WORKSHOP,
  [ORDER_BUMP.id]: ORDER_BUMP,
  [UPSELL.id]: UPSELL,
  [DOWNSELL.id]: DOWNSELL,
};

/** Formats cents as Rands, or a visible placeholder when the price is not set. */
export function formatPrice(amountCents: number | null): string {
  if (amountCents === null) return "[TO COME]";
  return "R" + (amountCents / 100).toLocaleString("en-ZA", { maximumFractionDigits: 0 });
}

/** Sums a set of offer ids. Returns null if any price is still unset. */
export function sumOffers(ids: string[]): number | null {
  let total = 0;
  for (const id of ids) {
    const amount = OFFERS[id]?.amountCents;
    if (amount === null || amount === undefined) return null;
    total += amount;
  }
  return total;
}
