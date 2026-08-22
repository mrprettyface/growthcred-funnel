/**
 * Whop plans, in one place.
 *
 * Each Whop plan is a fixed product at a fixed price, so the order bump is
 * handled by picking the MATCHING plan rather than by sending a total:
 *
 *   workshop only            -> WORKSHOP_ONLY  (R990)
 *   workshop + Skip the Setup -> WORKSHOP_PLUS_BUMP (R1 480)
 *   Operators Intensive       -> OPERATORS_INTENSIVE (R9 900)
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
} as const;

/** Picks the workshop plan that matches whether the order bump was ticked. */
export function workshopPlanId(bump: boolean): string {
  return bump ? WHOP_PLANS.workshopPlusBump : WHOP_PLANS.workshopOnly;
}
