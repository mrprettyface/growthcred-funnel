import { useState } from "react";
import { Button, cn } from "./ui";
import { submitContactMessage } from "../lib/supabase";
import { track } from "../lib/analytics";
import { WHATSAPP_URL, whatsappUrl } from "../lib/contact";

/**
 * The contact form. Posts to the `contact-autoresponder` Edge Function, which
 * saves the message and sends the acknowledgment email server-side — the
 * visitor is told an auto-reply is on its way only when the function actually
 * accepted the message, never as a promise the stack cannot keep.
 *
 * `company` is the honeypot: hidden from humans, irresistible to bots, and
 * silently accepted (and dropped) server-side.
 *
 * If the send fails after its retry, the error carries a WhatsApp button with
 * the message already typed, so nobody who wrote to us is left at a dead end.
 */

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-base outline-none focus:border-gold";
const labelCls =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());

export function ContactForm({ id, className }: { id?: string; className?: string }) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "", company: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  // The message as a WhatsApp text, set only when the send failed for good.
  const [handoff, setHandoff] = useState("");

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !emailOk(form.email) || !form.message.trim()) return;
    setState("sending");
    setHandoff("");

    const result = await submitContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim() || null,
      message: form.message.trim(),
      company: form.company,
    });

    if (!result.ok) {
      track("contact_save_failed", { error: result.error ?? "unknown", backup: Boolean(result.backup) });
      setState("error");
      if (result.error === "rate_limited") {
        setMessage("You just sent us a message — give it a few minutes, or WhatsApp us if it is urgent.");
        return;
      }
      setMessage("Our form could not get through just now. Your message is written out below — one tap sends it to us on WhatsApp.");
      setHandoff(
        [
          `Hi, this is ${form.name.trim()} (${form.email.trim()}).`,
          "",
          form.message.trim(),
        ].join("\n"),
      );
      return;
    }

    track("contact_submit");
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
          Message received
        </p>
        <h2 className="mt-3 text-2xl text-midnight">
          It is with us, and it is not going anywhere.
        </h2>
        <p className="mt-4 text-ink">
          We have received your message and will respond using the details you provided.
          You can also reach us directly if your question is urgent.
        </p>
        <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-midnight">
          Something urgent in the meantime? WhatsApp is faster.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-midnight/15 px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:border-midnight"
        >
          WhatsApp us <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    );
  }

  return (
    <div id={id} className={shell}>
      <h2 className="text-xl text-midnight md:text-2xl">Send us a message</h2>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
        Send your question, or use the direct WhatsApp and email options below.
      </p>

      <form onSubmit={onSubmit} className="mt-6" noValidate>
        {/* Honeypot: visually hidden, keyboard-invisible, named to look worth filling. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${id ?? "contact"}-company`}>Company</label>
          <input
            id={`${id ?? "contact"}-company`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={set("company")}
          />
        </div>

        <label className={labelCls} htmlFor={`${id ?? "contact"}-name`}>
          Your name
        </label>
        <input
          id={`${id ?? "contact"}-name`}
          className={fieldCls}
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Thabo"
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id ?? "contact"}-email`}>
          Email address
        </label>
        <input
          id={`${id ?? "contact"}-email`}
          className={fieldCls}
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@yourbusiness.co.za"
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id ?? "contact"}-whatsapp`}>
          WhatsApp number{" "}
          <span className="normal-case tracking-normal text-muted">(optional)</span>
        </label>
        <input
          id={`${id ?? "contact"}-whatsapp`}
          className={fieldCls}
          type="tel"
          autoComplete="tel"
          value={form.whatsapp}
          onChange={set("whatsapp")}
          placeholder="082 000 0000"
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id ?? "contact"}-message`}>
          Your message
        </label>
        <textarea
          id={`${id ?? "contact"}-message`}
          className={cn(fieldCls, "min-h-36 resize-y")}
          required
          maxLength={5000}
          value={form.message}
          onChange={set("message")}
          placeholder="What can we take off your plate?"
        />

        <Button type="submit" className="mt-6 w-full" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send my message"}{" "}
          <span aria-hidden="true">&#8595;</span>
        </Button>
      </form>

      {state === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {message}
        </p>
      )}

      {state === "error" && handoff && (
        <a
          href={whatsappUrl(handoff)}
          target="_blank"
          rel="noopener"
          onClick={() => track("contact_whatsapp_handoff")}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-midnight/15 bg-white px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:border-midnight"
        >
          Send it on WhatsApp <span aria-hidden="true">&#8599;</span>
        </a>
      )}

      <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted">
        One confirmation email, one reply. No list, no newsletter.
      </p>
    </div>
  );
}
