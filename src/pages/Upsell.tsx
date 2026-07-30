import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button, VideoSlot, CheckList } from "../components/ui";
import { UPSELL, formatPrice } from "../lib/offers";
import { useOrder } from "../lib/order";
import { track } from "../lib/analytics";
import { getProvider } from "../lib/payment";

/**
 * UPSELL. Locked headline: "Done With You: Get Your Time Back"
 *
 * Phase 1 (manual wire): there is no card on file, so this is an ADD-ON to the
 * order, not a second charge. Accepting adds it to the total the customer wires.
 * Phase 2 (Stitch): provider.supportsOneClick flips true and this becomes a real
 * one-click post-purchase charge. The page copy does not need to change.
 */
export default function UpsellPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();
  const provider = getProvider();

  useEffect(() => track("upsell_view"), []);

  function decide(accepted: boolean) {
    if (order) {
      setOrder({
        ...order,
        items: accepted ? [...order.items, UPSELL.id] : order.items,
        upsellDecision: accepted ? "accepted" : "declined",
      });
    }
    track(accepted ? "upsell_accept" : "upsell_decline");
    navigate(accepted ? "/thank-you" : "/downsell");
  }

  return (
    <Section className="pt-8">
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow>Your order is in. One thing before you go.</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[18ch]">
          Done With You: <Faint>Get Your Time Back.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink">
          {UPSELL.blurb}
        </p>
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
        <Button onClick={() => decide(true)} className="w-full text-base">
          Yes, add this to my order &mdash; {formatPrice(UPSELL.amountCents)}
        </Button>

        {!provider.supportsOneClick && (
          <p className="text-center text-xs text-muted">
            Added to your order. Nothing to pay now, we&rsquo;ll sort payment when we follow up.
          </p>
        )}

        <button
          onClick={() => decide(false)}
          className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
        >
          No thanks, I&rsquo;ll do it myself
        </button>
      </div>
    </Section>
  );
}
