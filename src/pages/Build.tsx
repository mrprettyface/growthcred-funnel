import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, Eyebrow, H1, Faint, Button, ButtonLink, CheckList, VideoSlot, cn } from "../components/ui";
import { useOrder } from "../lib/order";
import { submitBuildRequest, isSupabaseConfigured } from "../lib/supabase";
import { track } from "../lib/analytics";
import { mailtoHref } from "../lib/mailto";

/**
 * CUSTOM SYSTEM ("Build It for You"), the top of the ladder.
 * Everyone passes through this before the thank-you page. It is not sold in the
 * cart: they answer a few questions, then send a prewritten "I want a custom
 * system" email that carries their answers, so we can audit and reach out.
 * (The database is not on yet, so that email is how we hear about it.)
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
  const [state, setState] = useState<"idle" | "done">("idle");
  /** True when the database did not take the request, so the email is the only copy. */
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => track("build_view"), []);

  const ready = timing !== "" && industry.trim() !== "" && whatsapp.trim() !== "";

  const customSystemEmail = mailtoHref("I want a custom system", [
    "Hey, I want a custom system.",
    "",
    `Order reference: ${order?.reference ?? ""}`,
    `Name: ${order?.name ?? ""}`,
    `Email: ${order?.email ?? ""}`,
    `Industry: ${industry}`,
    `When I want to start: ${timing}`,
    `Availability for an audit call: ${availability}`,
    `WhatsApp: ${whatsapp}`,
    `Notes: ${notes}`,
  ]);

  async function handleApply() {
    /*
     * The click also opens the prewritten email (this runs off an anchor's
     * onClick), so the mailto fires either way. We wait for the database
     * answer rather than firing and forgetting: if the insert fails and they
     * then never send the email, the request is gone with nothing to show for
     * it. Knowing it failed lets us say so on the next screen.
     */
    if (order) setOrder({ ...order, buildDecision: "applied" });
    track("build_apply", { timing, configured: isSupabaseConfigured });
    setState("done");

    const result = await submitBuildRequest({
      reference: order?.reference ?? "NO-REF",
      name: order?.name ?? "",
      email: order?.email ?? "",
      whatsapp,
      industry,
      invest_timing: timing,
      availability,
      notes,
    }).catch((error) => {
      console.error("[supabase] submitBuildRequest failed", error);
      return { ok: false as const, error: "threw" };
    });

    if (!result.ok) {
      console.error("[supabase] build request not saved:", result.error);
      // "not_configured" is the expected local/dev state, not a lost lead.
      setSaveFailed(result.error !== "not_configured");
      track("build_apply_save_failed", { reason: result.error ?? "unknown" });
    }
  }

  function decline() {
    if (order) setOrder({ ...order, buildDecision: "declined" });
    track("build_decline");
    navigate("/thank-you");
  }

  /* ---------------- Confirmation ---------------- */
  if (state === "done") {
    return (
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Almost there</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[18ch]">
            One quick <Faint>send.</Faint>
          </H1>
          <p className="mx-auto mt-5 max-w-[52ch] text-ink">
            We&rsquo;ve opened a prewritten email with your details. Just hit send, and we&rsquo;ll
            audit your business and reach out to build your custom system. If your email app
            didn&rsquo;t open, email{" "}
            <a href="mailto:info@growthcred.co.za" className="text-midnight underline decoration-gold">
              info@growthcred.co.za
            </a>{" "}
            and say you want a custom system.
          </p>
          {saveFailed && (
            <p className="mx-auto mt-4 max-w-[52ch] rounded-xl border border-dashed border-gold/60 bg-gold/10 p-4 text-sm text-ink">
              One thing: we could not save your answers on our side just now, so that email is the
              only copy of them. Please do send it, and we will pick it up from there.
            </p>
          )}
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

        <div className="mx-auto mt-9 max-w-[760px]">
          <VideoSlot slot="customSystem" label="custom system video" />
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
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 max-w-[620px] rounded-2xl border border-midnight/10 bg-white p-6 md:p-8"
        >
          <h2 className="text-2xl">A few quick questions</h2>
          <p className="mt-2 text-[15px] text-muted">
            Answer these and we will audit your business before we speak, so the call is worth your
            time. No payment now.
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
                Anything you especially want off your plate?{" "}
                <span className="text-muted">(optional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[90px] w-full resize-y rounded-xl border border-midnight/15 p-4 outline-none focus:border-gold"
              />
            </div>
          </div>

          {ready ? (
            <ButtonLink href={customSystemEmail} onClick={handleApply} className="mt-7 w-full text-base">
              Yes, I want a custom system <span aria-hidden="true">&#8599;</span>
            </ButtonLink>
          ) : (
            <Button type="button" disabled className="mt-7 w-full text-base">
              Yes, I want a custom system
            </Button>
          )}
          {!ready && (
            <p className="mt-2 text-center text-xs text-muted">
              Answer the timing, industry and WhatsApp above to continue.
            </p>
          )}
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
