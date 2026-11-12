/**
 * Whop plans, in one place.
 *
 * Each Whop plan is a fixed product at a fixed price, so the order bump is
 * handled by picking the MATCHING plan rather than by sending a total:
 *
 *   workshop only            -> WORKSHOP_ONLY  (R990)
 *   workshop + Skip the Setup -> WORKSHOP_PLUS_BUMP (R1 490)
 *   Operators Intensive       -> OPERATORS_INTENSIVE (R25 000, repriced from R9 900 on 27 Sep 2026)
 *
 * All plans are priced in ZAR in the Whop dashboard. If you change a price in
 * Whop, change the matching amount in src/lib/offers.ts so the site agrees
 * with the checkout.
 */

export const WHOP_PLANS = {
  /** A - "Get 10 Hours a Week Back, in One Day" */
  workshopOnly: "plan_72K2Kk6oPeLRY",
  /** B - "Workshop + Skip the Setup" */
  workshopPlusBump: "plan_UCryhOI0svT2W",
  /** C - "Operators Intensive" */
  operatorsIntensive: "plan_Lrt0EkLTJD5nx",
  /** D - the home-study course, offered when the Intensive is declined */
  homeCourse: "plan_Pbw4zu8ngelfI",
  /**
   * E - the JCCI webinar's VIP seat ("VIP Seat - GrowthCred" in Whop), one-time.
   *
   * Created by Phila on 11 Nov 2026. Its price MUST equal VIP_SEAT.amountCents
   * in src/lib/offers.ts, which is what every button on the site prints. If this
   * is ever set back to null, /webinar/vip falls back to taking the seat by hand
   * over WhatsApp rather than rendering a checkout that cannot charge.
   */
  vipSeat: "plan_p4azvJzT5gWRg" as string | null,
} as const;

/**
 * What a plan was SEEN to charge on Whop's own checkout page, and when.
 *
 * Not a price source -- src/lib/offers.ts is, and it is what every button on
 * the site prints. This is the receipt the site is checked against, because the
 * site and Whop drifting apart has bitten this project twice.
 * scripts/verify-jcci-webinar.mjs fails the build when the two disagree.
 *
 * Whenever a plan's price changes in Whop, open its checkout page
 * (https://whop.com/checkout/<plan id>), read the amount, and update the entry
 * and its date here. A stale entry fails loudly, which is the point: it forces
 * the re-check rather than trusting a number nobody has looked at.
 */
export const WHOP_SEEN: Partial<Record<keyof typeof WHOP_PLANS, { cents: number; seen: string }>> = {
  /* "VIP Seat - GrowthCred", read off whop.com/checkout/plan_p4azvJzT5gWRg:
     495.00 in ZAR, one-time payment. */
  vipSeat: { cents: 49500, seen: "2026-11-11" },
};

/** Picks the workshop plan that matches whether the order bump was ticked. */
export function workshopPlanId(bump: boolean): string {
  return bump ? WHOP_PLANS.workshopPlusBump : WHOP_PLANS.workshopOnly;
}
