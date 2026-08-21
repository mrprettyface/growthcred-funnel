import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button, ButtonLink, VideoSlot, CheckList } from "../components/ui";
import { WhopPay } from "../components/WhopPay";
import { UPSELL, formatPrice } from "../lib/offers";
import { WHOP_PLANS } from "../lib/whop";
import { useOrder } from "../lib/order";
import { recordPayment } from "../lib/supabase";
import { track } from "../lib/analytics";
import { mailtoHref } from "../lib/mailto";

/**
 * UPSELL. Locked headline: "Done With You: Get Your Time Back"
 *
 * Two jobs now:
 * 1. Confirm the workshop purchase up top ("Welcome to the workshop") with a
 *    one-click prewritten email, so the customer feels acknowledged and we get
 *    the order in our inbox (the database is not on yet).
 * 2. Offer the upgrade. Accepting shows a congratulations + next steps + its
 *    own prewritten email, then continues to the custom-system offer.
 */
export default function UpsellPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();
  const [view, setView] = useState<"offer" | "pay" | "accepted">("offer");

  useEffect(() => track("upsell_view"), []);

  const ref = order?.reference ?? "";
  const name = order?.name ?? "";

  const boughtWorkshopEmail = mailtoHref("I've bought the workshop", [
    "Hey, I've just bought the workshop.",
    "",
    `Order reference: ${ref}`,
    `Name: ${name}`,
    `Email: ${order?.email ?? ""}`,
    "",
    "Please send me the workshop details.",
  ]);

  const upgradedEmail = mailtoHref("I upgraded to operators intensive", [
    "Hey, I just upgraded to operators intensive.",
    "",
    `Order reference: ${ref}`,
    `Name: ${name}`,
    "",
    "Send me the next steps.",
  ]);

  /** They want it: show Whop's checkout for the Operators Intensive plan. */
  function accept() {
    track("upsell_accept");
    setView("pay");
  }

  /** Whop confirmed the R9 900 payment. */
  function onPaid() {
    if (order) {
      setOrder({ ...order, items: [...order.items, UPSELL.id], upsellDecision: "accepted" });
    }
    void recordPayment(ref, "paid_operators_intensive");
    track("upsell_paid");
    setView("accepted");
  }

  function decline() {
    if (order) setOrder({ ...order, upsellDecision: "declined" });
    track("upsell_decline");
    navigate("/downsell");
  }

  /* ---------------- Pay for the upgrade ---------------- */
  if (view === "pay") {
    return (
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-6 text-center">
            <Eyebrow>Add Done With You</Eyebrow>
            <H1 className="mx-auto mt-4 max-w-[18ch] text-3xl md:text-5xl">
              Secure checkout.
            </H1>
            <p className="mx-auto mt-4 max-w-[46ch] text-ink">
              {formatPrice(UPSELL.amountCents)}, paid securely through Whop. Your card details never
              touch our site.
            </p>
          </div>

          <WhopPay
            planId={WHOP_PLANS.operatorsIntensive}
            email={order?.email}
            reference={ref}
            buttonText="Add Done With You"
            returnPath="/build"
            onPaid={onPaid}
          />

          <div className="mt-6 text-center">
            <button
              onClick={() => setView("offer")}
              className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
            >
              &larr; Back
            </button>
          </div>
        </div>
      </Section>
    );
  }

  /* ---------------- Upgrade accepted: congrats + steps ---------------- */
  if (view === "accepted") {
    return (
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Upgrade confirmed</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[18ch]">
            You&rsquo;re in. <Faint>Congrats on the upgrade.</Faint>
          </H1>
          <p className="mx-auto mt-5 max-w-[50ch] text-ink">
            You just added Done With You, so we build the first systems alongside you. Here are your
            next steps.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[620px] rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
          <ol className="grid gap-4">
            {[
              "Send us the email below so we lock in your upgrade.",
              "Watch your inbox, and your spam folder, for your onboarding details.",
              "We reach out to book your first build session.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold font-mono text-sm text-midnight">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <ButtonLink href={upgradedEmail} className="mt-6 w-full">
            Email us to confirm your upgrade <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-muted">
            Opens your email with the message ready. Just hit send.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[620px] text-center">
          <Button onClick={() => navigate("/build")}>
            Continue <span aria-hidden="true">&#8599;</span>
          </Button>
        </div>
      </Section>
    );
  }

  /* ---------------- Offer ---------------- */
  return (
    <Section className="pt-8">
      {/* Workshop purchase confirmation */}
      <div className="mx-auto mb-10 max-w-[680px] rounded-2xl border border-gold/40 bg-gold/[0.08] p-5 text-center md:p-6">
        <p className="font-display text-lg font-extrabold text-midnight">
          Welcome to the workshop.
        </p>
        <p className="mt-1 text-sm text-ink">
          We&rsquo;ll email you more details for the workshop. Send us a quick note so we know
          you&rsquo;re in:
        </p>
        <ButtonLink href={boughtWorkshopEmail} variant="outline" className="mt-4">
          Email us: I&rsquo;ve just bought the workshop <span aria-hidden="true">&#8599;</span>
        </ButtonLink>
      </div>

      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow>One thing before you go</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[18ch]">
          Done With You: <Faint>Get Your Time Back.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink">{UPSELL.blurb}</p>
      </div>

      <div className="mx-auto mt-9 max-w-[760px]">
        <VideoSlot slot="upsell" label="upsell video" />
      </div>

      <div className="mx-auto mt-9 max-w-[680px]">
        <h3 className="text-2xl">Let us build the first ones with you</h3>
        <CheckList
          className="mt-5 text-[17px]"
          items={[
            "We build your core systems with you, live, so you skip the trial and error entirely",
            "Your business brain set up properly the first time, no guessing, no gaps",
            "Your highest-value tasks handed over first, so you feel the hours come back fastest",
            "Direct help while you set it up, so you never get stuck and quietly give up",
            "You leave with it running and running well, not just started",
          ]}
        />
        <p className="mt-5 text-ink">
          This is for you if you want the result faster and would rather not do the wiring alone.
        </p>
      </div>

      <div className="mx-auto mt-9 flex max-w-[560px] flex-col items-center gap-4">
        <Button onClick={accept} className="w-full text-base">
          Yes, add this to my order &mdash; {formatPrice(UPSELL.amountCents)}
        </Button>
        <p className="text-center text-xs text-muted">
          Secure card payment on the next step, then we get you booked in.
        </p>
        <button
          onClick={decline}
          className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
        >
          No thanks, I&rsquo;ll do it myself
        </button>
      </div>
    </Section>
  );
}
