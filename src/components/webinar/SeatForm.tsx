import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "../ui";
import { WEBINAR, sessionHasPassed } from "../../lib/webinar";
import { JCCI, VIP_SEATS } from "../../lib/jcciWebinar";
import { registerForWebinar } from "../../lib/supabase";
import { saveSeat, type Seat } from "../../lib/seat";
import { track } from "../../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../../lib/contact";
import { BrandIcon } from "../BrandIcons";

/**
 * The registration form: details, then the seat.
 *
 * Two steps on purpose. Everything that identifies someone is asked first, so a
 * person who stops at the seat question is already a lead. Only then does the
 * page ask for money, which is also why the free seat is the default and the
 * pre-selected option: the webinar is a JCCI member benefit, and the VIP hour is
 * an offer beside it, not a toll on the way in.
 *
 * The row is written before the seat is paid for, every time. So a VIP who
 * abandons the checkout is still registered for the webinar, and still reachable
 * — the opposite of the usual arrangement, where the lead only exists if the
 * card clears.
 *
 * A save that fails never costs a registration, exactly as the other seat forms
 * behave: Supabase not being configured is not the visitor's problem, and a hard
 * failure offers WhatsApp instead of a dead end.
 */

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-base outline-none focus:border-gold";
const labelCls =
  "mb-1.5 block font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:text-[11px]";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 9;

type Field = "name" | "email" | "whatsapp";

export function SeatForm({ id, className }: { id?: string; className?: string }) {
  const navigate = useNavigate();
  const uid = useId();
  const fieldId = (f: string) => `${uid}-${f}`;

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", business: "" });
  const [consent, setConsent] = useState(false);
  const [seat, setSeat] = useState<Seat>("free");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const problems: Record<Field | "consent", string | null> = {
    name: form.name.trim() ? null : "Tell me your name, so I know whose seat it is.",
    email: emailOk(form.email) ? null : "I need an email that works. That is where the link goes.",
    whatsapp: phoneOk(form.whatsapp) ? null : "A WhatsApp number, so the reminder reaches you.",
    consent: consent ? null : "Tick the box and I can send you the link.",
  };
  const stepOneOk = Object.values(problems).every((p) => p === null);

  /* The session is over. Nothing here should still be taking registrations. */
  if (sessionHasPassed()) {
    return (
      <div
        id={id}
        className={cn(
          "rounded-2xl border-t-4 border-gold bg-paper p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-8",
          className,
        )}
      >
        <h2 className="text-xl text-midnight md:text-2xl">This one has already run.</h2>
        <p className="mt-4 text-ink">
          The {WEBINAR.dayLabel} session is done. I run these regularly. Tell me what is eating
          your week and I will put you on the list for the next one.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft"
        >
          Put me on the list <span aria-hidden="true">&#8599;</span>
        </Link>
      </div>
    );
  }

  function toStepTwo(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!stepOneOk) return;
    setStep(2);
  }

  async function confirm(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    track("webinar_seat_chosen", { seat });

    const name = form.name.trim();
    const email = form.email.trim();

    const result = await registerForWebinar({
      webinar: WEBINAR.slug,
      name,
      email,
      whatsapp: form.whatsapp.trim(),
      business: form.business.trim() || null,
      consent,
      seat,
      source: "jcci_webinar",
    });

    /* Not configured yet must never cost us a registration. */
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }

    track("webinar_register", { webinar: WEBINAR.slug, seat });
    const handover = { name, email, seat };
    saveSeat(handover);
    navigate(seat === "vip" ? "/webinar/vip" : "/webinar/thanks", { state: handover });
  }

  const shell = cn(
    "rounded-2xl border-t-4 border-gold bg-paper p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-8",
    className,
  );

  return (
    <div id={id} className={cn(shell, "scroll-mt-28")}>
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:text-[11px]">
        Step {step} of 2 &middot; {step === 1 ? "Your details" : "Choose your seat"}
      </p>

      {step === 1 ? (
        <form onSubmit={toStepTwo} className="mt-4" noValidate>
          <h2 className="text-xl text-midnight md:text-2xl">Save your free seat.</h2>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
            <span className="text-midnight">{WEBINAR.dayLabel}</span>
            <br />
            {WEBINAR.timeLabel} &middot; {WEBINAR.where}
          </p>

          <div className="mt-6">
            <label className={labelCls} htmlFor={fieldId("name")}>
              Full name
            </label>
            <input
              id={fieldId("name")}
              className={fieldCls}
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
              placeholder="Thabo Mokoena"
              aria-invalid={touched && problems.name ? true : undefined}
            />
          </div>

          <div className="mt-4">
            <label className={labelCls} htmlFor={fieldId("email")}>
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
              aria-invalid={touched && problems.email ? true : undefined}
            />
          </div>

          <div className="mt-4">
            <label className={labelCls} htmlFor={fieldId("whatsapp")}>
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
              placeholder="+27 82 000 0000"
              aria-describedby={fieldId("whatsapp-help")}
              aria-invalid={touched && problems.whatsapp ? true : undefined}
            />
            <span id={fieldId("whatsapp-help")} className="mt-1.5 block text-xs text-muted">
              I send your link and your reminders here.
            </span>
          </div>

          <div className="mt-4">
            <label className={labelCls} htmlFor={fieldId("business")}>
              Business name <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id={fieldId("business")}
              className={fieldCls}
              type="text"
              autoComplete="organization"
              value={form.business}
              onChange={set("business")}
              placeholder="Mokoena Logistics"
            />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-midnight/30 accent-gold"
              aria-invalid={touched && problems.consent ? true : undefined}
            />
            <span>
              GrowthCred may contact me about this webinar and related offers. I can unsubscribe
              any time. Read the <Link to="/privacy">privacy policy</Link>.
            </span>
          </label>

          {touched && !stepOneOk && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {problems.name ?? problems.email ?? problems.whatsapp ?? problems.consent}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight transition hover:bg-gold-soft"
          >
            Continue <span aria-hidden="true">&rarr;</span>
          </button>
        </form>
      ) : (
        <form onSubmit={confirm} className="mt-4">
          <h2 className="text-xl text-midnight md:text-2xl">Which seat, {form.name.trim().split(" ")[0]}?</h2>

          <fieldset className="mt-5">
            <legend className="sr-only">Choose your seat</legend>

            <label
              className={cn(
                "flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition",
                seat === "free" ? "border-gold bg-gold/[0.07]" : "border-midnight/15",
              )}
            >
              <input
                type="radio"
                name={`${uid}-seat`}
                value="free"
                checked={seat === "free"}
                onChange={() => setSeat("free")}
                className="mt-1 h-5 w-5 shrink-0 accent-gold"
              />
              <span>
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-midnight">
                    Free Seat
                  </span>
                  <span className="font-mono text-sm text-gold">R0</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink">
                  The live webinar, plus the free gifts for everyone who is there live.
                </span>
              </span>
            </label>

            <label
              className={cn(
                "mt-3 flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition",
                seat === "vip" ? "border-gold bg-gold/[0.07]" : "border-midnight/15",
              )}
            >
              <input
                type="radio"
                name={`${uid}-seat`}
                value="vip"
                checked={seat === "vip"}
                onChange={() => setSeat("vip")}
                className="mt-1 h-5 w-5 shrink-0 accent-gold"
              />
              <span>
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-midnight">
                    VIP Seat
                  </span>
                  <span className="font-mono text-sm text-gold">{JCCI.vipPrice}</span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink">
                  Everything in the free seat, plus a private hour with me before the webinar, your
                  Brain Builder reviewed live, and the recording. Only {VIP_SEATS} of these.
                </span>
              </span>
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={state === "sending"}
            className={cn(
              "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight transition hover:bg-gold-soft",
              state === "sending" && "pointer-events-none opacity-60",
            )}
          >
            {state === "sending" ? "Saving your seat…" : "Confirm my seat"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-3 block w-full text-center font-mono text-[12px] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:underline md:text-[11px]"
          >
            Back to my details
          </button>

          {state === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              That did not save. Try again, or{" "}
              <a
                href={whatsappUrl(
                  `Hi Phila, I tried to book a seat for the ${WEBINAR.dayLabel} JCCI webinar and the form did not save.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-red-400 underline-offset-2"
              >
                <BrandIcon name="whatsapp" className="h-4 w-4" /> WhatsApp me on {WHATSAPP_DISPLAY}
              </a>{" "}
              and I will add you myself.
            </p>
          )}
        </form>
      )}

      <p className="mt-5 flex items-start gap-2 border-t border-midnight/10 pt-4 font-mono text-[12px] leading-relaxed text-muted md:text-[11px]">
        <span aria-hidden="true">&#128274;</span>
        <span>Your details are safe with us. We follow POPIA.</span>
      </p>
    </div>
  );
}
