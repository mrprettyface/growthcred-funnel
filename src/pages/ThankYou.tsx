import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint } from "../components/ui";
import { OFFERS, formatPrice, sumOffers } from "../lib/offers";
import { useOrder } from "../lib/order";
import { track } from "../lib/analytics";
import { WHATSAPP_URL } from "../lib/contact";

/**
 * CONFIRMATION. Locked headline: "Your Time Back Starts Now"
 * Jobs: dissolve remorse, tell them what happens next, and set the expectation
 * that workshop details and payment instructions come by WhatsApp/email.
 *
 * Deliberately NO banking details on the page. Payment is arranged personally
 * in the follow-up. The reference below is what ties their payment to them.
 */
export default function ThankYouPage() {
  const { order } = useOrder();
  useEffect(() => track("thankyou_view"), []);

  const items = order?.items ?? [];
  const total = sumOffers(items);

  return (
    <>
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow>Order received</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[16ch]">
            Your Time Back <Faint>Starts Now.</Faint>
          </H1>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink">
            You made the right call, and we&rsquo;re glad you&rsquo;re in. Here is exactly what
            happens next, so there are no surprises.
          </p>
        </div>
      </Section>

      {/* What happens next, plus a summary of what they registered for */}
      <Section className="pt-0">
        <div className="mx-auto max-w-[760px] rounded-2xl bg-midnight p-6 text-cream md:p-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
            What happens next
          </div>
          <h2 className="mt-3 text-2xl text-cream md:text-3xl">
            Now watch your email.
          </h2>
          <p className="mt-4 text-cream/80">
            Your payment is in, so you&rsquo;re booked. Within one working day we&rsquo;ll email you
            everything you need: your date, what to bring, and how to get set up. Nothing to do right
            now except keep an eye on your inbox.
          </p>
          <p className="mt-3 text-cream/80">
            One thing: check your spam or promotions folder if you don&rsquo;t see it. That first
            email likes to hide there, so mark it &ldquo;not spam&rdquo; and you&rsquo;re set.
          </p>

          {/* Summary of what they registered for */}
          <div className="mt-6 border-t border-cream/20">
            {items.map((id) => (
              <div
                key={id}
                className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3"
              >
                <span className="text-sm">{OFFERS[id]?.name ?? id}</span>
                <span className="font-mono text-sm text-cream/80">
                  {formatPrice(OFFERS[id]?.amountCents ?? null)}
                </span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 py-4">
              <span className="font-display font-extrabold">Total paid</span>
              <span className="font-mono text-2xl text-gold">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Reference ties their payment to them */}
          <div className="mt-2 rounded-xl border border-gold/40 bg-gold/15 p-4">
            <div className="text-xs text-cream/70">Your order reference</div>
            <div className="mt-1 font-mono text-2xl tracking-wider text-gold">
              {order?.reference ?? "—"}
            </div>
          </div>

          <p className="mt-5 text-sm text-cream/70">
            Cannot wait? Reach us on WhatsApp{" "}
            <a href={WHATSAPP_URL} className="text-gold underline">
              066 283 0289
            </a>{" "}
            or email{" "}
            <a href="mailto:info@growthcred.co.za" className="text-gold underline">
              info@growthcred.co.za
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
