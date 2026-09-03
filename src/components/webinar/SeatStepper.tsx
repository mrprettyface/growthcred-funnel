import { useId, useState } from "react";
import Stepper, { Step } from "../reactbits/Stepper";
import { cn } from "../ui";
import { WEBINAR, calendarUrl } from "../../lib/webinar";
import { registerForWebinar, isSupabaseConfigured } from "../../lib/supabase";
import { track } from "../../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../../lib/contact";

/**
 * Registration, one question at a time.
 *
 * The same idea as the /call application form: asking for three things at once
 * reads as a form, asking for one reads as a conversation. Three taps, each one
 * a small commitment, and the seat is booked.
 *
 * Motion is decoration here and nowhere near the critical path: the fields are
 * plain inputs, the buttons are plain buttons, and a failed save never costs a
 * registration (see the not_configured branch, same rule as the free class).
 */

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-lg outline-none focus:border-gold";
const questionCls = "font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight";
const helpCls = "mt-1.5 mb-4 text-sm text-muted";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 9;

export function SeatStepper({
  className,
  showWhen = true,
}: {
  className?: string;
  /** The dialog prints the date in its own subtitle; don't say it twice. */
  showWhen?: boolean;
}) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [step, setStep] = useState(1);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  /**
   * This form renders up to three times on one page — inline under the hero,
   * inline at the close, and inside the seat dialog. Hard-coded ids meant the
   * same DOM id existed several times over, so a label pointed at whichever
   * copy happened to be first and autofill had no way to tell them apart.
   */
  const uid = useId();
  const fieldId = (field: string) => `${uid}-${field}`;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const ready =
    step === 1
      ? form.name.trim().length > 0
      : step === 2
        ? emailOk(form.email)
        : phoneOk(form.whatsapp);

  async function submit() {
    setState("sending");
    const result = await registerForWebinar({
      webinar: WEBINAR.slug,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      source: "webinar_experience",
    });

    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }
    track("webinar_register", { webinar: WEBINAR.slug, configured: isSupabaseConfigured });
    setState("done");
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
          Your seat is saved
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">
          See you Wednesday, {form.name.trim() || "friend"}.
        </h3>
        <p className="mt-4 text-ink">
          The joining link is on its way to {form.email.trim()}. A reminder lands on WhatsApp an
          hour before we start.
        </p>
        <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-midnight">
          Stay to the end and the recording is yours. Leave halfway and it isn&rsquo;t.
        </p>
        <a
          href={calendarUrl()}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-midnight/15 px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:border-midnight"
        >
          Add it to my calendar <span aria-hidden="true">&#8599;</span>
        </a>
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
          <p className={questionCls}>First, who am I saving it for?</p>
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
            placeholder="Thabo"
          />
        </Step>

        <Step>
          <p className={questionCls}>Where do I send the joining link?</p>
          <p className={helpCls}>The link and nothing else. No newsletter.</p>
          <label className="sr-only" htmlFor={fieldId("email")}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            className={fieldCls}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@yourbusiness.co.za"
          />
        </Step>

        <Step>
          <p className={questionCls}>And your WhatsApp number?</p>
          <p className={helpCls}>One reminder, an hour before we start. That&rsquo;s all it&rsquo;s for.</p>
          <label className="sr-only" htmlFor={fieldId("whatsapp")}>
            WhatsApp number
          </label>
          <input
            id={fieldId("whatsapp")}
            className={fieldCls}
            type="tel"
            autoComplete="tel"
            value={form.whatsapp}
            onChange={set("whatsapp")}
            placeholder="082 000 0000"
          />
        </Step>
      </Stepper>

      {showWhen && (
        <p className="px-8 pb-6 font-mono text-[12px] leading-relaxed text-muted">
          {WEBINAR.dayLabel} &middot; {WEBINAR.timeLabel} &middot; {WEBINAR.where} &middot; Free
        </p>
      )}

      {state === "error" && (
        <p role="alert" className="px-8 pb-6 text-sm text-red-700">
          That did not save. Please try again, or{" "}
          <a
            href={whatsappUrl(`Hi Phila, I tried to book a seat for the ${WEBINAR.dayLabel} class and the form did not save.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-red-400 underline-offset-2"
          >
            WhatsApp me on {WHATSAPP_DISPLAY}
          </a>{" "}
          and I&rsquo;ll add you myself.
        </p>
      )}
    </div>
  );
}
