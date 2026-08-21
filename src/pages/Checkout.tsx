import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Section, Eyebrow, Faint, Button } from "../components/ui";
import { Brand } from "../components/Layout";
import { WhopPay } from "../components/WhopPay";
import { WORKSHOP, ORDER_BUMP, formatPrice, sumOffers } from "../lib/offers";
import { newReference } from "../lib/payment";
import { workshopPlanId } from "../lib/whop";
import { useOrder } from "../lib/order";
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
 * truth for whether money actually moved.
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { setOrder } = useOrder();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bump, setBump] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"details" | "pay">("details");
  const [reference, setReference] = useState("");

  useEffect(() => track("checkout_view"), []);

  const items = ["workshop", ...(bump ? ["bump"] : [])];
  const total = sumOffers(items);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    const ref = newReference();
    setReference(ref);

    const order = {
      reference: ref,
      email,
      name,
      items,
      bump,
      upsellDecision: null,
      downsellDecision: null,
      buildDecision: null,
      createdAt: new Date().toISOString(),
    };

    // Best effort: never block the funnel if Supabase is unreachable.
    await createOrder({
      reference: order.reference,
      email: order.email,
      name: order.name || null,
      items: order.items,
      amount_cents: total ?? 0,
      status: "awaiting_payment",
      payment_method: "whop",
    });

    setOrder(order);
    track("checkout_submit", { bump });
    setBusy(false);
    setStage("pay");
  }

  /** Fires once Whop confirms the payment went through. */
  function onPaid() {
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
      </div>

      <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-[1.1fr_0.9fr]">
        {/* Stage 2: pay, on this page, inside Whop's secure checkout */}
        {stage === "pay" ? (
          <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                <Eyebrow>Payment</Eyebrow>
                <h1 className="mt-3 text-2xl md:text-3xl">
                  Last step. <Faint>Secure checkout.</Faint>
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setStage("details")}
                className="shrink-0 bg-transparent font-mono text-[11px] uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
              >
                &larr; Edit
              </button>
            </div>
            <WhopPay
              planId={workshopPlanId(bump)}
              email={email}
              reference={reference}
              buttonText="Get my time back"
              onPaid={onPaid}
            />
          </div>
        ) : (
        /* Stage 1: details */
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
        )}

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
              <span className="font-mono text-xl text-gold">{formatPrice(total)}</span>
            </div>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-cream/60">
            {stage === "pay"
              ? "Paid securely through Whop. Your card details never touch our site."
              : "Secure card payment on the next step. Your workshop details follow by email."}
          </p>

          <p className="mt-5 font-mono text-[11px] text-cream/50">
            <Link to="/refunds" className="underline">
              Refund policy
            </Link>
          </p>
        </aside>
      </div>
    </Section>
  );
}
