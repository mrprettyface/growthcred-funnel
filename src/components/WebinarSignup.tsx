import { useState } from "react";
import { Button, cn } from "./ui";
import { WEBINAR, calendarUrl } from "../lib/webinar";
import { registerForWebinar, isSupabaseConfigured } from "../lib/supabase";
import { track } from "../lib/analytics";
import { WHATSAPP_DISPLAY } from "../lib/contact";

/**
 * The seat form. Appears three times on the webinar page (hero, close, and the
 * anchor the sticky mobile bar jumps to), so it owns its own state and its own
 * success view. Registration is never blocked by Supabase not being
 * configured, exactly as the free class opt-in behaves.
 */

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-base outline-none focus:border-gold";
const labelCls =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());

export function WebinarSignup({
  id,
  className,
  heading = "Save my seat",
  fineprint = "You’ll get the joining link by email and a reminder on WhatsApp an hour before. Nothing else.",
}: {
  id?: string;
  className?: string;
  heading?: string;
  fineprint?: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOk(form.email)) return;
    setState("sending");

    const result = await registerForWebinar({
      webinar: WEBINAR.slug,
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      source: "webinar_page",
    });

    // Not configured yet must never cost us a registration.
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      setMessage(`That did not save. Please try again, or WhatsApp ${WHATSAPP_DISPLAY}.`);
      return;
    }

    track("webinar_register", { webinar: WEBINAR.slug, configured: isSupabaseConfigured });
    setState("done");
  }

  const shell = cn(
    "rounded-2xl border-t-4 border-gold bg-paper p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-8",
    className,
  );

  if (state === "done") {
    return (
      <div id={id} className={shell}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
          Your seat is saved
        </p>
        <h3 className="mt-3 text-2xl text-midnight">
          See you {WEBINAR.dayLabel.replace("Wed", "Wednesday")}.
        </h3>
        <p className="mt-4 text-ink">
          Check your email for the joining link. A reminder lands on WhatsApp an hour before we
          start.
        </p>
        <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-midnight">
          Put the hour in your diary now. It is live, and I answer questions in the room.
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
    <div id={id} className={shell}>
      <h3 className="text-xl text-midnight md:text-2xl">{heading}</h3>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
        <span className="text-midnight">{WEBINAR.dayLabel}</span>
        <br />
        {WEBINAR.timeLabel} &middot; {WEBINAR.where}
        <br />
        Free &middot; Seats are limited
      </p>

      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <label className={labelCls} htmlFor={`${id ?? "reg"}-name`}>
          First name
        </label>
        <input
          id={`${id ?? "reg"}-name`}
          className={fieldCls}
          type="text"
          autoComplete="given-name"
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Thabo"
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id ?? "reg"}-email`}>
          Email address
        </label>
        <input
          id={`${id ?? "reg"}-email`}
          className={fieldCls}
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@yourbusiness.co.za"
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id ?? "reg"}-whatsapp`}>
          WhatsApp number
        </label>
        <input
          id={`${id ?? "reg"}-whatsapp`}
          className={fieldCls}
          type="tel"
          autoComplete="tel"
          required
          value={form.whatsapp}
          onChange={set("whatsapp")}
          placeholder="082 000 0000"
        />

        <Button type="submit" className="mt-6 w-full" disabled={state === "sending"}>
          {state === "sending" ? "Saving your seat…" : "Save my seat"}{" "}
          <span aria-hidden="true">&#8599;</span>
        </Button>
      </form>

      {state === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {message}
        </p>
      )}

      <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted">
        {fineprint}
      </p>
    </div>
  );
}
