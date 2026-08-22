import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button, ButtonLink, CheckList } from "../components/ui";
import { WhopPay } from "../components/WhopPay";
import { Modal } from "../components/Modal";
import { DOWNSELL, UPSELL, formatPrice } from "../lib/offers";
import { WHOP_PLANS } from "../lib/whop";
import { useOrder } from "../lib/order";
import { recordPayment } from "../lib/supabase";
import { track } from "../lib/analytics";
import { mailtoHref } from "../lib/mailto";

/**
 * DOWNSELL. Only reachable after declining the Intensive.
 *
 * The home-study course: the same builds, recorded, at home, for well under
 * half the price. This is a genuine step DOWN in price and commitment, which is
 * what a downsell has to be, and it means nobody leaves with nothing.
 */
export default function DownsellPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();
  const [view, setView] = useState<"offer" | "pay" | "bought">("offer");

  useEffect(() => track("downsell_view"), []);

  const ref = order?.reference ?? "";

  const boughtCourseEmail = mailtoHref("I bought the home study course", [
    "Hey, I just got the home study course.",
    "",
    `Order reference: ${ref}`,
    `Name: ${order?.name ?? ""}`,
    "",
    "Send me my access details.",
  ]);

  function accept() {
    track("downsell_accept");
    setView("pay");
  }

  function decline() {
    if (order) setOrder({ ...order, downsellDecision: "declined" });
    track("downsell_decline");
    navigate("/build");
  }

  function onPaid() {
    if (order) {
      setOrder({
        ...order,
        items: [...order.items, DOWNSELL.id],
        downsellDecision: "accepted",
      });
    }
    void recordPayment(ref, "paid_home_course");
    track("downsell_paid");
    setView("bought");
  }

  /* ---------------- Paid: confirmation ---------------- */
  if (view === "bought") {
    return (
      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>You&rsquo;re in</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[18ch]">
            The course is <Faint>yours.</Faint>
          </H1>
          <p className="mx-auto mt-5 max-w-[50ch] text-ink">
            Everything we build at the Intensive, recorded, so you can work through it at home at
            your own pace. Watch your email for your access details.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[620px] rounded-2xl border border-midnight/10 bg-white p-6 text-center md:p-8">
          <ButtonLink href={boughtCourseEmail} className="w-full">
            Email us to confirm <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
          <p className="mt-3 text-xs text-muted">
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
    <Section className="pt-8 md:pt-12">
      <div className="mx-auto max-w-[820px]">
        <div className="text-center">
          <Eyebrow>Can&rsquo;t make the Intensive? Do it at home.</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[16ch]">
            Do it yourself, <Faint>at home.</Faint>
          </H1>
          <p className="mx-auto mt-6 max-w-[56ch] text-lg text-ink">
            Everything we build at the Intensive, recorded step by step. You work through it in your
            own time, at your own pace, and end up with the same systems running.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-[620px]">
          <CheckList
            className="text-[17px]"
            items={[
              "The same builds as the Intensive, recorded step by step",
              "Work at your own pace, at home, no diary to clear",
              "Pause and rewind any build until it clicks",
              "Yours to keep, so you can rebuild it any time",
            ]}
          />
        </div>

        <div className="mx-auto mt-9 max-w-[620px] rounded-2xl border border-midnight/10 bg-white p-6 text-center md:p-8">
          <p className="text-ink">
            The Intensive is {formatPrice(UPSELL.amountCents)} because we build it with you, live.
            The course is the same material, on your own.
          </p>
          <p className="mt-3 font-display text-3xl font-extrabold text-midnight">
            {formatPrice(DOWNSELL.amountCents)}{" "}
            <span className="font-body text-base font-normal text-muted">once off</span>
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-[560px] flex-col items-center gap-4">
          <Button onClick={accept} className="w-full text-base">
            Yes, get me the course &mdash; {formatPrice(DOWNSELL.amountCents)}
          </Button>
          <button
            onClick={decline}
            className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
          >
            No thanks, just my workshop
          </button>
        </div>
      </div>

      {/* Payment floats over the offer, so the comparison stays visible */}
      <Modal
        open={view === "pay"}
        onClose={() => setView("offer")}
        title="Secure checkout."
        subtitle={`${formatPrice(DOWNSELL.amountCents)}, once off. Yours to keep.`}
      >
        <WhopPay
          planId={WHOP_PLANS.homeCourse}
          email={order?.email}
          reference={ref}
          buttonText="Get the course"
          returnPath="/build"
          onPaid={onPaid}
        />
      </Modal>
    </Section>
  );
}
