import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button } from "../components/ui";
import { DOWNSELL, formatPrice } from "../lib/offers";
import { useOrder } from "../lib/order";
import { track } from "../lib/analytics";

/**
 * DOWNSELL. Only reachable after declining the upsell.
 * Locked headline: "Try It Free for 7 Days" (secondary: "Start Now, Pay Later")
 */
export default function DownsellPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();

  useEffect(() => track("downsell_view"), []);

  function decide(accepted: boolean) {
    if (order) {
      setOrder({
        ...order,
        items: accepted ? [...order.items, DOWNSELL.id] : order.items,
        downsellDecision: accepted ? "accepted" : "declined",
      });
    }
    track(accepted ? "downsell_accept" : "downsell_decline");
    // Accepting the trial = getting Done With You, so skip the Build It for You
    // offer. Declining means they passed on DWY entirely, so offer Build It for You.
    navigate(accepted ? "/thank-you" : "/build");
  }

  return (
    <Section className="pt-8">
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow>Understood. Then try it a different way.</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[16ch]">
          Try It Free <Faint>for 7 Days.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink">
          Start now, pay later. Seven days to see it work before you decide.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-[620px] space-y-4 rounded-2xl border border-midnight/10 bg-white p-6 text-ink md:p-8">
        <h3 className="text-xl text-midnight">Start now, pay later</h3>
        <p>
          Get full access today for 7 days, free. You get everything in the workshop, all of it,
          from the moment you start.
        </p>
        <p>
          On day 7, if you have not cancelled, we charge {formatPrice(DOWNSELL.amountCents)} to the
          card you entered, and you keep full access. If it is not for you, cancel any time in those
          7 days and you are charged nothing.
        </p>
        <p>
          To cancel, email{" "}
          <a href="mailto:info@growthcred.co.za" className="text-midnight underline decoration-gold">
            info@growthcred.co.za
          </a>{" "}
          or use the cancel link in your welcome message before day 7. No forms, no phone call, no
          “let me transfer you”.
        </p>
      </div>

      <div className="mx-auto mt-9 flex max-w-[560px] flex-col items-center gap-4">
        <Button onClick={() => decide(true)} className="w-full text-base">
          Start my 7 days free <span aria-hidden="true">&#8599;</span>
        </Button>
        <button
          onClick={() => decide(false)}
          className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
        >
          No thanks, just the workshop
        </button>
      </div>
    </Section>
  );
}
