import { useId, useState } from "react";
import Stepper, { Step } from "../reactbits/Stepper";
import { cn, ToComeBlock } from "../ui";
import { MAGNETS, isDeliverable, type Magnet } from "../../lib/magnets";
import { WEBINAR } from "../../lib/webinar";
import { captureMagnetSignup, registerForWebinar, isSupabaseConfigured } from "../../lib/supabase";
import { track } from "../../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../../lib/contact";

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-lg outline-none focus:border-gold";
const questionCls = "font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight";
const helpCls = "mt-1.5 mb-4 text-sm text-muted";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 9;

/**
 * The lead magnet opt-in, one question at a time.
 *
 * Same reasoning as the seat form: asking for four things at once reads as a
 * form, asking for one reads as a conversation. Four taps and the pack is
 * theirs.
 *
 * Three things here are load-bearing.
 *
 * ONE: delivery happens on this screen, not by email. Nothing in this codebase
 * can send one, so "check your inbox" would take someone's details and give
 * them nothing.
 *
 * TWO: the seat that follows is a single tap on details already typed. Asking
 * again on a following page is where most of these people would be lost.
 *
 * THREE: consent gates the final step and is written to the row. Consent
 * nobody recorded is a claim, not consent.
 */
export function MagnetStepper({
  magnetKey,
  className,
}: {
  magnetKey: keyof typeof MAGNETS;
  className?: string;
}) {
  const magnet: Magnet = MAGNETS[magnetKey];
  const uid = useId();
  const fieldId = (field: string) => `${uid}-${field}`;

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", company: "" });
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState(1);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [seat, setSeat] = useState<"idle" | "saving" | "done">("idle");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const ready =
    step === 1
      ? form.name.trim().length > 0
      : step === 2
        ? emailOk(form.email)
        : step === 3
          ? phoneOk(form.whatsapp)
          : consent; // step 4: company is optional, consent is not

  async function submit() {
    setState("sending");
    const result = await captureMagnetSignup({
      magnet: magnet.slug,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      company: form.company.trim() || null,
      consent,
      source: "magnet_modal",
    });

    // Not configured must never cost us the opt-in: they still get the pack.
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }
    track("magnet_signup", { magnet: magnet.slug, configured: isSupabaseConfigured });
    setState("done");
  }

  /** The seat, in one tap, on what they have already given us. */
  async function claimSeat() {
    if (seat !== "idle") return;
    setSeat("saving");
    await registerForWebinar({
      webinar: WEBINAR.slug,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      source: `magnet:${magnet.slug}`,
    });
    track("webinar_register", { webinar: WEBINAR.slug, from: magnet.slug });
    // Not gated on success: making someone who has typed everything once do it
    // again is worse than a seat we reconcile by hand from the dashboard.
    setSeat("done");
  }

  if (state === "done") {
    return (
      <div
        className={cn(
          "rounded-2xl border-t-4 border-gold bg-paper p-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.28)]",
          className,
        )}
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-gold">
          Yours &mdash; nothing to wait for
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">
          Here it is, {form.name.trim().split(" ")[0] || "friend"}.
        </h3>

        {/* Both packs, not one. The offer on the page shows two covers, so
            the delivery screen has to hand over two things or it reads as a
            bait. `magnet` on the row still records which page they came in
            through. */}
        <div className="mt-6 grid gap-4">
          {(Object.keys(MAGNETS) as (keyof typeof MAGNETS)[]).map((key) => {
            const pack: Magnet = MAGNETS[key];
            return isDeliverable(pack) ? (
              <a
                key={key}
                href={pack.file}
                download
                className="flex min-h-12 items-center justify-between gap-4 rounded-xl border border-midnight/15 bg-white px-5 py-4 no-underline transition hover:border-gold"
              >
                <span>
                  <span className="block font-display text-lg font-extrabold tracking-[-0.02em] text-midnight">
                    {pack.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{pack.shape}</span>
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-gold">
                  Download <span aria-hidden="true">&darr;</span>
                </span>
              </a>
            ) : (
              <ToComeBlock
                key={key}
                label={`${pack.title} PDF`}
                note="Your details are saved. This one comes to you the moment it is finished."
              />
            );
          })}
        </div>

        <div className="mt-8 border-t border-midnight/10 pt-6">
          <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-midnight">
            Reading it and having it are different things.
          </p>
          <p className="mt-3 text-ink">
            On {WEBINAR.shortWhen} I take a real job out of a real business and build the thing
            that does it, live, in the hour. Free, and you are already halfway signed up.
          </p>

          {seat === "done" ? (
            <p className="mt-5 border-l-2 border-gold pl-3 text-sm text-midnight">
              Your seat is saved. The joining link goes to {form.email.trim()} before Wednesday
              &mdash; check spam if you do not see it.
            </p>
          ) : (
            <button
              type="button"
              onClick={claimSeat}
              disabled={seat === "saving"}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-midnight px-7 font-body text-sm font-semibold text-cream transition hover:bg-midnight-soft disabled:opacity-60"
            >
              {seat === "saving" ? "Saving your seat…" : "Yes — save my seat too"}{" "}
              <span aria-hidden="true">&#8599;</span>
            </button>
          )}
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:text-[11px]">
            Free &middot; 60 minutes &middot; Nothing to install
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border-t-4 border-gold bg-paper py-2 shadow-[0_24px_60px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <Stepper
        initialStep={1}
        onStepChange={setStep}
        onFinalStepCompleted={submit}
        backButtonText="Back"
        nextButtonText="Next"
        completeButtonText={state === "sending" ? "Sending…" : "Send me the packs"}
        stepCircleContainerClassName="max-w-none rounded-none bg-transparent shadow-none"
        stepContainerClassName="px-8 pt-6 pb-2"
        contentClassName="px-8"
        nextButtonProps={{
          disabled: !ready || state === "sending",
          className: cn(
            "duration-350 flex min-h-11 items-center justify-center rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight transition hover:bg-gold-soft",
            (!ready || state === "sending") && "pointer-events-none opacity-40",
          ),
        }}
      >
        <Step>
          <p className={questionCls}>First, who is it for?</p>
          <p className={helpCls}>Just your first name.</p>
          <label className="sr-only" htmlFor={fieldId("name")}>
            First name
          </label>
          <input
            id={fieldId("name")}
            className={fieldCls}
            type="text"
            autoComplete="given-name"
            value={form.name}
            onChange={set("name")}
          />
        </Step>

        <Step>
          <p className={questionCls}>Where should I send it?</p>
          <p className={helpCls}>You get it on the next screen either way.</p>
          <label className="sr-only" htmlFor={fieldId("email")}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            className={fieldCls}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
          />
        </Step>

        <Step>
          <p className={questionCls}>And your WhatsApp number?</p>
          <p className={helpCls}>Only used for the class reminder. Never for anything else.</p>
          <label className="sr-only" htmlFor={fieldId("whatsapp")}>
            WhatsApp number
          </label>
          <input
            id={fieldId("whatsapp")}
            className={fieldCls}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={set("whatsapp")}
          />
        </Step>

        <Step>
          <p className={questionCls}>Last one.</p>
          <p className={helpCls}>Your company, if you want it tailored. Skip it if you like.</p>
          <label className="sr-only" htmlFor={fieldId("company")}>
            Company (optional)
          </label>
          <input
            id={fieldId("company")}
            className={fieldCls}
            type="text"
            autoComplete="organization"
            placeholder="Company (optional)"
            value={form.company}
            onChange={set("company")}
          />

          {/* POPIA. Recorded, not assumed: the point of consent is being able
              to show later that it was given. */}
          <label className="mt-5 flex min-h-12 cursor-pointer items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#c8a04a]"
            />
            <span>
              Send me the pack and occasional email from GrowthCred. I can unsubscribe whenever I
              like. See the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener"
                className="underline decoration-gold underline-offset-2"
              >
                privacy policy
              </a>
              .
            </span>
          </label>

          {state === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              That did not save. Please try again, or{" "}
              <a
                href={whatsappUrl(
                  `Hi Phila, I tried to get ${magnet.title} and the form did not save.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-red-400 underline-offset-2"
              >
                WhatsApp me on {WHATSAPP_DISPLAY}
              </a>{" "}
              and I&rsquo;ll send it over myself.
            </p>
          )}
        </Step>
      </Stepper>
    </div>
  );
}
