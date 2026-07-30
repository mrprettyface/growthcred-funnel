import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button, CheckList, cn } from "../components/ui";
import { useOrder } from "../lib/order";
import { submitBuildRequest, isSupabaseConfigured } from "../lib/supabase";
import { track } from "../lib/analytics";

/**
 * "BUILD IT FOR YOU", the top of the ladder.
 * Shown only to buyers who DECLINED the Done With You upsell and downsell.
 * It is not sold in the cart: it is a mini application to qualify, so we can
 * audit their business and industry and reach out. No price, no bank details.
 * Decline goes to the workshop confirmation.
 */

const TIMINGS = ["Today", "Tomorrow", "This week", "Still exploring"];

export default function BuildPage() {
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();

  const [timing, setTiming] = useState("");
  const [industry, setIndustry] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [availability, setAvailability] = useState("");
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => track("build_view"), []);

  const ready = timing !== "" && industry.trim() !== "" && whatsapp.trim() !== "";

  function markDecision(applied: boolean) {
    if (order) setOrder({ ...order, buildDecision: applied ? "applied" : "declined" });
  }

  function decline() {
    markDecision(false);
    track("build_decline");
    navigate("/thank-you");
  }

  async function apply(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setState("sending");
    const result = await submitBuildRequest({
      reference: order?.reference ?? "NO-REF",
      name: order?.name ?? "",
      email: order?.email ?? "",
      whatsapp,
      industry,
      invest_timing: timing,
      availability,
      notes,
    });
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      setMessage("That did not send. Please try again, or WhatsApp us on 066 283 0289.");
      return;
    }
    markDecision(true);
    track("build_apply", { timing, configured: isSupabaseConfigured });
    setState("done");
  }

  /* ---------------- Confirmation ---------------- */
  if (state === "done") {
    return (
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Application received</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[18ch]">
            Thanks{order?.name ? `, ${order.name.split(" ")[0]}` : ""}.{" "}
            <Faint>We take it from here.</Faint>
          </H1>
          <p className="mx-auto mt-5 max-w-[50ch] text-ink">
            We will audit your business and your industry, then reach out on WhatsApp to see if we
            are the right fit to build it for you. In the meantime, your workshop is still yours.
          </p>
          <div className="mt-8">
            <Button onClick={() => navigate("/thank-you")}>
              Continue to your workshop details <span aria-hidden="true">&#8599;</span>
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  /* ---------------- Offer + mini application ---------------- */
  return (
    <Section className="pt-8 md:pt-12">
      <div className="mx-auto max-w-[820px]">
        <div className="text-center">
          <Eyebrow>One more option, before your workshop</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[16ch]">
            Or we build it <Faint>for you.</Faint>
          </H1>
          <p className="mx-auto mt-6 max-w-[56ch] text-lg text-ink">
            Some owners do not want to build it themselves, or even with us. They want it done. We
            build your systems, we secure them, and we hand them over running. You do not touch a
            setting. You just use what you have from day one.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-[620px]">
          <CheckList
            className="text-[17px]"
            items={[
              "We build every system for you, end to end, tuned to how you actually operate",
              "We handle the security and the setup, so nothing is left for you to get wrong",
              "You get the finished machine, running, with nothing to configure",
              "We stay accountable to the hours we free up, measured, not promised",
            ]}
          />
        </div>

        <form
          onSubmit={apply}
          className="mx-auto mt-10 max-w-[620px] rounded-2xl border border-midnight/10 bg-white p-6 md:p-8"
        >
          <h2 className="text-2xl">A few quick questions</h2>
          <p className="mt-2 text-[15px] text-muted">
            This is by application. Answer these and we will audit your business before we speak, so
            the call is worth your time. No payment now.
          </p>

          {/* Investment timing */}
          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-semibold text-midnight">
              If we are a fit, when are you looking to get started?
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIMINGS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTiming(t)}
                  aria-pressed={timing === t}
                  className={cn(
                    "min-h-11 rounded-xl border px-3 text-sm font-semibold transition",
                    timing === t
                      ? "border-gold bg-gold text-midnight"
                      : "border-midnight/15 bg-white text-midnight hover:border-midnight/40",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5">
            <div>
              <label htmlFor="industry" className="mb-1.5 block text-sm font-semibold text-midnight">
                What industry are you in?
              </label>
              <input
                id="industry"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. logistics, law, property, e-commerce"
                className="min-h-12 w-full rounded-xl border border-midnight/15 px-4 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-semibold text-midnight">
                Your WhatsApp number
              </label>
              <input
                id="whatsapp"
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="082 123 4567"
                className="min-h-12 w-full rounded-xl border border-midnight/15 px-4 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="availability" className="mb-1.5 block text-sm font-semibold text-midnight">
                When are you free for a short audit call?
              </label>
              <input
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="e.g. weekday mornings, or Tue and Thu afternoons"
                className="min-h-12 w-full rounded-xl border border-midnight/15 px-4 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-midnight">
                Anything you especially want off your plate? <span className="text-muted">(optional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[90px] w-full resize-y rounded-xl border border-midnight/15 p-4 outline-none focus:border-gold"
              />
            </div>
          </div>

          {state === "error" && (
            <p role="alert" className="mt-5 text-sm text-red-700">
              {message}
            </p>
          )}

          <Button type="submit" disabled={!ready || state === "sending"} className="mt-7 w-full text-base">
            {state === "sending" ? "Sending…" : "Yes, build it for me"}{" "}
            <span aria-hidden="true">&#8599;</span>
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={decline}
            className="bg-transparent font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
          >
            No thanks, just my workshop
          </button>
        </div>
      </div>
    </Section>
  );
}
