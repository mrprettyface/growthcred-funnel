/**
 * Payment provider adapter. SUPERSEDED, except for newReference() at the bottom.
 *
 * @deprecated Payment is taken by Whop's embedded checkout (src/components/
 * WhopPay.tsx) against the plans in src/lib/whop.ts. ManualWireProvider,
 * StitchProvider and getProvider() are no longer called from anywhere, and
 * VITE_PAYMENT_PROVIDER is read by nothing. They are kept only because the
 * one-click upsell work in STATUS.md needs this exact shape — a `chargeSaved`
 * against a stored token — and the security note below still applies to it.
 * newReference() IS live: /checkout calls it for every order reference.
 *
 * The description that follows is the original phase-1 plan, kept for that
 * future work. It does NOT describe how the site takes money today.
 *
 * Phase 1 is MANUAL WIRE: we take the order, show banking details, and a human
 * confirms funds. No card is stored, so there is no silent re-charge and
 * therefore no true one-click upsell yet. The funnel handles this by making
 * the upsell and downsell ADD-ONS that adjust the total before the wire
 * instruction, rather than pretending to charge a saved card.
 *
 * Phase 2 (Stitch): implement StitchProvider below. The only new capability is
 * `chargeSaved`, which turns /upsell and /downsell back into true one-click
 * post-purchase offers. No page or route needs to change.
 *
 * SECURITY: a real provider's SECRET key must never live in this file or in any
 * VITE_ variable, because both ship to the browser. It belongs in a Supabase
 * Edge Function that this client calls over HTTPS.
 */

export type PaymentIntent = {
  reference: string;
  amountCents: number | null;
  items: string[];
};

export type PaymentResult =
  | { kind: "instructions"; method: "wire" } // show banking details, confirm manually
  | { kind: "redirect"; url: string } // hosted checkout
  | { kind: "charged"; providerRef: string }; // charged a saved card

export interface PaymentProvider {
  readonly id: string;
  /** Can this provider charge a stored card without the customer re-entering it? */
  readonly supportsOneClick: boolean;
  begin(intent: PaymentIntent): Promise<PaymentResult>;
  /** Only meaningful when supportsOneClick is true. */
  chargeSaved?(intent: PaymentIntent): Promise<PaymentResult>;
}

/** Phase 1. Nothing is charged automatically; funds are confirmed by a human. */
export const ManualWireProvider: PaymentProvider = {
  id: "manual_wire",
  supportsOneClick: false,
  async begin() {
    return { kind: "instructions", method: "wire" };
  },
};

/**
 * Phase 2 placeholder. [TO COME: Stitch integration]
 * When implemented, `begin` should call a Supabase Edge Function that creates
 * the payment server-side (prices resolved server-side, never from the client),
 * and `chargeSaved` should charge the stored token via that same function.
 */
export const StitchProvider: PaymentProvider = {
  id: "stitch",
  supportsOneClick: true,
  async begin() {
    throw new Error("[TO COME] Stitch is not wired up yet. Using manual wire.");
  },
  async chargeSaved() {
    throw new Error("[TO COME] Stitch is not wired up yet.");
  },
};

export function getProvider(): PaymentProvider {
  const configured = import.meta.env.VITE_PAYMENT_PROVIDER ?? "manual_wire";
  return configured === "stitch" ? StitchProvider : ManualWireProvider;
}

/** Human-readable order reference, e.g. GC-7F3K2Q. */
export function newReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no lookalike characters
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `GC-${out}`;
}
