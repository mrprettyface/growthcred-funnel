/**
 * Funnel event tracking, so we can see drop-off per stage.
 *
 * Deliberately provider-agnostic and dependency-free. Events are pushed to
 * window.dataLayer (works with GTM / GA4 if you add the snippet later) and
 * mirrored to the console in dev. No third-party script is loaded here, so
 * nothing is sent anywhere until you choose a provider.
 *
 * [TO COME: analytics provider decision, e.g. GA4, Plausible, Umami]
 */

type FunnelStep =
  | "class_view"
  | "class_optin"
  | "workshop_view"
  | "checkout_view"
  | "checkout_submit"
  | "checkout_paid"
  | "upsell_view"
  | "upsell_paid"
  | "upsell_accept"
  | "upsell_decline"
  | "downsell_view"
  | "downsell_accept"
  | "downsell_paid"
  | "downsell_decline"
  | "build_view"
  | "build_apply"
  | "build_decline"
  | "thankyou_view"
  | "call_view"
  | "call_apply"
  | "call_booked";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(step: FunnelStep, payload: Record<string, unknown> = {}): void {
  const event = { event: `gc_${step}`, ...payload, ts: new Date().toISOString() };
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(event);
    if (import.meta.env.DEV) console.debug("[funnel]", event);
  }
}
