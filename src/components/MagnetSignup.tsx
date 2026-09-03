import { useId, useState, type FormEvent } from "react";
import { captureMagnetSignup, registerForWebinar, isSupabaseConfigured } from "../lib/supabase";
import { MAGNETS, isDeliverable, type Magnet } from "../lib/magnets";
import { WEBINAR } from "../lib/webinar";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";
import { track } from "../lib/analytics";
import { ToComeBlock } from "./ui";

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-lg outline-none focus:border-gold";
const labelCls = "font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:text-[11px]";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 9;

type State = "form" | "saving" | "done" | "error";

/**
 * The lead magnet opt-in, and the handover to the live class.
 *
 * Two things here are deliberate and worth not undoing.
 *
 * ONE: delivery happens on this page, not by email. Nothing in this codebase
 * can send an email, so a flow that says "check your inbox" would take someone's
 * details and give them nothing. The file is handed over the moment the form is
 * accepted, which is also when the person most wants it.
 *
 * TWO: the seat is one tap, not a second form. We already hold the name, email
 * and WhatsApp number; asking for them again on the next page is where most of
 * these people would be lost. The button below reuses what was just typed.
 */
export function MagnetSignup({ magnetKey }: { magnetKey: keyof typeof MAGNETS }) {
  const magnet: Magnet = MAGNETS[magnetKey];
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", company: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<State>("form");
  const [seat, setSeat] = useState<"idle" | "saving" | "done">("idle");

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const ready =
    form.name.trim().length > 1 && emailOk(form.email) && phoneOk(form.whatsapp) && consent;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ready || state === "saving") return;
    setState("saving");

    const result = await captureMagnetSignup({
      magnet: magnet.slug,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      company: form.company.trim() || null,
      consent,
      source: "magnet_page",
    });

    // "Not configured" must never cost us the opt-in: the visitor still gets
    // the pack. Any other failure is real and has to be shown.
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }
    track("magnet_signup", { magnet: magnet.slug, configured: isSupabaseConfigured });
    setState("done");
  }

  /** The one-tap seat. Reuses the details already given. */
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
    // Deliberately not gated on success: the row either landed or it did not,
    // and re-asking someone who has already typed everything twice is worse
    // than a seat we reconcile by hand from the dashboard.
    setSeat("done");
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border-t-4 border-gold bg-paper p-6 md:p-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-gold">
          Yours &mdash; no email to wait for
        </p>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">
          Here it is, {form.name.trim().split(" ")[0] || "friend"}.
        </h3>

        {isDeliverable(magnet) ? (
          <a
            href={magnet.file as string}
            download
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft"
          >
            Download the {magnet.title} <span aria-hidden="true">&darr;</span>
          </a>
        ) : (
          <div className="mt-5">
            <ToComeBlock
              label={`${magnet.title} PDF`}
              note="Your details are saved. The pack goes out the moment it is finished."
            />
          </div>
        )}

        {/* The show-up bonus. Offered here because this is the one moment we
            know they are paying attention. */}
        <div className="mt-8 border-t border-midnight/10 pt-6">
          <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-midnight">
            One more thing, and it is the better one.
          </p>
          <p className="mt-3 text-ink">
            {MAGNETS.aiPolicy.promise} I hand it out live on the class on{" "}
            {WEBINAR.shortWhen}, to everyone in the room.
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
    <form onSubmit={onSubmit} className="rounded-2xl border-t-4 border-gold bg-paper p-6 md:p-8">
      <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">
        Where should it go?
      </p>
      <p className="mt-1.5 mb-5 text-sm text-muted">
        {magnet.shape}. You get it on the next screen, not in three days.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={fid("name")}>
            Your name
          </label>
          <input
            id={fid("name")}
            className={`${fieldCls} mt-1.5`}
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={fid("email")}>
            Email
          </label>
          <input
            id={fid("email")}
            type="email"
            inputMode="email"
            className={`${fieldCls} mt-1.5`}
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={fid("whatsapp")}>
            WhatsApp number
          </label>
          <input
            id={fid("whatsapp")}
            type="tel"
            inputMode="tel"
            className={`${fieldCls} mt-1.5`}
            value={form.whatsapp}
            onChange={set("whatsapp")}
            autoComplete="tel"
            required
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={fid("company")}>
            Company <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id={fid("company")}
            className={`${fieldCls} mt-1.5`}
            value={form.company}
            onChange={set("company")}
            autoComplete="organization"
          />
        </div>
      </div>

      {/* POPIA. Consent is recorded, not assumed: the point of it is being able
          to show later that it was given. */}
      <label className="mt-5 flex min-h-12 cursor-pointer items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#c8a04a]"
          required
        />
        <span>
          Send me the pack and occasional email about GrowthCred. I can unsubscribe whenever I
          like. See the{" "}
          <a href="/privacy" className="underline decoration-gold underline-offset-2">
            privacy policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!ready || state === "saving"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight transition hover:bg-gold-soft disabled:opacity-50 md:w-auto"
      >
        {state === "saving" ? "Sending…" : `Send me the ${magnet.title}`}{" "}
        <span aria-hidden="true">&#8599;</span>
      </button>

      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          That did not save. Please try again, or{" "}
          <a
            href={whatsappUrl(`Hi Phila, I tried to get the ${magnet.title} and the form did not save.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-red-400 underline-offset-2"
          >
            WhatsApp me on {WHATSAPP_DISPLAY}
          </a>{" "}
          and I&rsquo;ll send it over myself.
        </p>
      )}
    </form>
  );
}
