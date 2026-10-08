import { recordPayment } from "./supabase";

/**
 * Coming back from Whop.
 *
 * Whop Elements sends the whole tab to `returnUrl` once a checkout finishes,
 * and always after an off-site step (3-D Secure, a bank page), whatever the
 * outcome. It appends `payment` (the `pay_` id) and `status` (`succeeded`,
 * `failed` or `canceled`) and keeps our own query parameters. Each paid step
 * returns to its own page tagged with `?whop=<offer>`, so the page can tell
 * its own payment from someone else's and branch on `status` before it says
 * anything about money.
 *
 * Like the old `?paid=1`, this only decides what we SAY. Anyone can type the
 * URL. Whop's webhook (supabase/functions/whop-webhook) and Whop's dashboard
 * settle who has actually paid.
 */

export type WhopOffer = "workshop" | "intensive" | "course";

export type WhopReturn = {
  status: "succeeded" | "failed" | "canceled";
  paymentId: string;
};

/** Where Whop should send this offer's buyer back to. */
export function whopReturnUrl(path: string, offer: WhopOffer): string | undefined {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}?whop=${offer}`;
}

/** The outcome Whop returned with for this offer, or null if this visit is not a return. */
export function readWhopReturn(params: URLSearchParams, offer: WhopOffer): WhopReturn | null {
  if (params.get("whop") !== offer) return null;
  const status = params.get("status");
  if (status !== "succeeded" && status !== "failed" && status !== "canceled") return null;
  return { status, paymentId: params.get("payment") ?? "" };
}

const SEEN = "gc_whop_seen";
const RECORDED = "gc_whop_recorded";

function readSet(key: string): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function addToSet(key: string, id: string): void {
  try {
    sessionStorage.setItem(key, JSON.stringify([...readSet(key), id]));
  } catch {
    /* Storage blocked: we may count a payment twice in analytics, never charge twice. */
  }
}

/**
 * True the first time this tab sees a payment, false after. The same payment
 * can reach us twice: once from `onComplete` in the page, and again when Whop
 * redirects to `returnUrl` or restores the checkout on a later load.
 */
export function claimPayment(paymentId: string): boolean {
  if (!paymentId) return true;
  if (readSet(SEEN).includes(paymentId)) return false;
  addToSet(SEEN, paymentId);
  return true;
}

/**
 * Writes our matching row once per payment. It is marked done only when the
 * insert succeeds, because Whop's redirect can cut an in-flight request off;
 * the page Whop lands on then tries again.
 */
export async function recordPaymentOnce(paymentId: string, reference: string, offer: string): Promise<void> {
  if (paymentId && readSet(RECORDED).includes(paymentId)) return;
  const result = await recordPayment(reference, offer);
  if (result.ok && paymentId) addToSet(RECORDED, paymentId);
}
