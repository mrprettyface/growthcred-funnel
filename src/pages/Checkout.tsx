import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Section, Eyebrow, Faint, Button, cn } from "../components/ui";
import { Brand } from "../components/Layout";
import { WhopPay } from "../components/WhopPay";
import { Modal } from "../components/Modal";
import { WORKSHOP, ORDER_BUMP, formatPrice, sumOffers } from "../lib/offers";
import { newReference } from "../lib/payment";
import { workshopPlanId } from "../lib/whop";
import { useOrder } from "../lib/order";
import { activePromo } from "../lib/promo";
import { createOrder, recordPayment } from "../lib/supabase";
import { track } from "../lib/analytics";

/**
 * CHECKOUT. Two stages on one page:
 *   1. "details" - name, email and the order bump. The total updates live.
 *   2. "pay"     - Whop's embedded checkout, loaded with the plan that MATCHES
 *                  the bump choice (workshop only, or workshop + Skip the Setup).
 *
 * The order is written to Supabase when they move to payment, so we still
 * capture the lead even if they abandon the card form. Whop is the source of
 * truth for whether money actually moved, so the order carries `paid: false`
 * until Whop confirms it and nothing downstream may congratulate them before.
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bump, setBump] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"details" | "pay">("details");

  /**
   * ONE reference per visit to this page. Generating a fresh one on every
   * submit meant that opening the payment modal, closing it and trying again
   * left an orphan order row behind, and paid against a reference that no
   * longer matched the one we had stored.
   */
  const [reference] = useState(newReference);
  /** The reference already written to Supabase, so a retry does not re-insert. */
  const savedRef = useRef<string | null>(null);

  useEffect(() => track("checkout_view"), []);

  const promo = activePromo();
  const items = ["workshop", ...(bump ? ["bump"] : [])];
  const total = sumOffers(items);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    const next = {
      reference,
      email,
      name,
      items,
      bump,
      paid: false,
      upsellDecision: null,
      downsellDecision: null,
      buildDecision: null,
      createdAt: new Date().toISOString(),
    };

    /*
     * Lead capture is best effort and deliberately NOT awaited: Supabase can be
     * paused, blocked by an extension or simply slow, and a hanging insert must
     * never leave the button stuck on "One moment…" while the customer is
     * trying to pay. The row is written once per reference; if they reopen the
     * modal with a different bump choice, which plan they actually paid for is
     * recorded by recordPayment below and is authoritative in Whop regardless.
     */
    if (savedRef.current !== reference) {
      savedRef.current = reference;
      void createOrder({
        reference: next.reference,
        email: next.email,
        name: next.name || null,
        items: next.items,
        amount_cents: total ?? 0,
        status: "awaiting_payment",
        payment_method: "whop",
      }).catch((error) => console.error("[supabase] createOrder failed", error));
    }

    setOrder(next);
    track("checkout_submit", { bump });
    setBusy(false);
    setStage("pay");
  }

  /** Fires once Whop confirms the payment went through. */
  function onPaid() {
    if (order) setOrder({ ...order, items, bump, paid: true });
    void recordPayment(reference, bump ? "paid_workshop_plus_bump" : "paid_workshop");
    track("checkout_paid", { bump });
    navigate("/upsell");
  }

  return (
    <Section className="pt-8">
      <div className="mb-10 text-center">
        <div className="inline-block rounded-full bg-midnight px-6 py-2.5">
          <Brand />
        </div>
        {/* The layout is bare here, so this is the only way back to the offer. */}
        <div className="mt-5">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted underline underline-offset-4 hover:text-midnight md:text-[11px]"
          >
            &larr; Back to the workshop
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-[1.1fr_0.9fr]">
        {/* Details stay on screen; payment opens over them in a modal */}
        <form onSubmit={onSubmit} className="rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
          <Eyebrow>Your details</Eyebrow>
          <h1 className="mt-4 text-2xl md:text-3xl">
            Almost there. <Faint>Where do we send it?</Faint>
          </h1>

          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-midnight">
                Your name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-midnight/15 px-4 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-midnight">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-midnight/15 px-4 outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* ORDER BUMP, before payment */}
          <div className="mt-6 rounded-xl border-2 border-dashed border-gold/60 bg-gold/[0.07] p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={bump}
                onChange={(e) => setBump(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#c8a04a]"
              />
              <span>
                <span className="block font-display font-extrabold text-midnight">
                  Yes, add {ORDER_BUMP.name} &mdash; {formatPrice(ORDER_BUMP.amountCents)}
                </span>
                <span className="mt-1 block text-sm text-ink">{ORDER_BUMP.blurb}</span>
              </span>
            </label>
          </div>

          <Button type="submit" disabled={busy} className="mt-6 w-full">
            {busy ? "One moment…" : "Continue to payment"} <span aria-hidden="true">&#8599;</span>
          </Button>

          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Get the 10 hours back, or you don&rsquo;t pay
          </p>
        </form>

        {/* Summary */}
        <aside className="h-max rounded-2xl bg-midnight p-6 text-cream md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
            Your order
          </div>

          <div className="mt-5 border-t border-cream/20">
            <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3">
              <span className="text-sm">{WORKSHOP.name}</span>
              <span className="font-mono text-sm text-cream">
                {formatPrice(WORKSHOP.amountCents)}
              </span>
            </div>
            {bump && (
              <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3">
                <span className="text-sm">{ORDER_BUMP.name}</span>
                <span className="font-mono text-sm text-cream">
                  {formatPrice(ORDER_BUMP.amountCents)}
                </span>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-4 py-4">
              <span className="font-display font-extrabold">Total</span>
              <span
                className={cn(
                  "font-mono text-xl text-gold",
                  promo && "text-cream/50 line-through decoration-cream/40",
                )}
              >
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* A promo code is applied inside Whop's form, so the total above is
              no longer what they pay. Say so rather than showing two prices. */}
          {promo && (
            <p className="mt-3 rounded-xl border border-dashed border-gold/50 bg-gold/10 px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-gold md:text-[11px]">
              Promo {promo} applied &middot; final price shown at checkout
            </p>
          )}

          <p className="mt-2 text-xs leading-relaxed text-cream/60">
            Paid securely through Whop. Your card details never touch our site.
          </p>

          <p className="mt-5 font-mono text-[11px] text-cream/50">
            <Link to="/refunds" className="underline">
              Refund policy
            </Link>
          </p>
        </aside>
      </div>

      {/* Payment opens over the details, which stay filled in behind */}
      <Modal
        open={stage === "pay"}
        onClose={() => setStage("details")}
        title="Last step."
        subtitle={
          promo
            ? `Promo ${promo} applied, so your final price is shown in the form. Paid securely through Whop, your card details never touch our site.`
            : `${formatPrice(total)} total. Paid securely through Whop, your card details never touch our site.`
        }
      >
        <WhopPay
          planId={workshopPlanId(bump)}
          email={email}
          reference={reference}
          buttonText="Get my time back"
          returnPath="/upsell"
          onPaid={onPaid}
        />
      </Modal>
    </Section>
  );
}
