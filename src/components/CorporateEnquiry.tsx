import { useState } from "react";
import { Button, cn } from "./ui";
import { submitContactMessage } from "../lib/supabase";
import { track } from "../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";
import { ENQUIRY } from "../lib/corporate";

/**
 * The corporate proposal request. It posts through the same
 * `contact-autoresponder` Edge Function as /contact, so it needs no new table
 * and no new function: the organisation and team size are written into the
 * top of the message, where they are the first thing read in the inbox.
 *
 * `company` is the contact form's honeypot, so the real organisation field is
 * named `organisation` and never sent under that key.
 *
 * A firm that fills this in is never left at a dead end. If the send fails
 * after its retry, the error carries a WhatsApp button with the whole enquiry
 * already typed (name, email, organisation, team size, phone, message), so one
 * tap delivers it by a route that does not depend on the site's backend.
 */

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-base outline-none focus:border-gold";
const labelCls = "mb-1.5 block font-mono text-[12px] uppercase tracking-[0.14em] text-muted";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());

export function CorporateEnquiry({ id }: { id: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    size: "",
    whatsapp: "",
    message: "",
    company: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  // The enquiry as a WhatsApp message, set only when the send failed for good.
  const [handoff, setHandoff] = useState("");

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const ready = form.name.trim() && emailOk(form.email) && form.organisation.trim() && form.message.trim();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) {
      setState("error");
      setError("Please add your name, a work email, your organisation and a line about the team.");
      return;
    }
    setState("sending");
    setHandoff("");

    const header = [
      "CORPORATE TRAINING ENQUIRY",
      `Organisation: ${form.organisation.trim()}`,
      `People to train: ${form.size || "not given"}`,
    ];
    const message = [...header, "", form.message.trim()].join("\n");

    const result = await submitContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim() || null,
      message,
      source: "corporate_training",
      company: form.company,
    });

    if (!result.ok) {
      track("corporate_enquiry_failed", { error: result.error ?? "unknown", backup: Boolean(result.backup) });
      setState("error");
      if (result.error === "rate_limited") {
        setError("You just sent us a request — give it a few minutes, or WhatsApp us if it is urgent.");
        return;
      }
      setError("Our form could not get through just now. Your enquiry is written out below — one tap sends it to us on WhatsApp.");
      setHandoff(
        [
          ...header,
          `Name: ${form.name.trim()}`,
          `Email: ${form.email.trim()}`,
          ...(form.whatsapp.trim() ? [`Phone: ${form.whatsapp.trim()}`] : []),
          "",
          form.message.trim(),
        ].join("\n"),
      );
      return;
    }

    track("corporate_enquiry_submit", { size: form.size || "none" });
    setState("done");
  }

  const shell = "rounded-3xl border-t-4 border-gold bg-paper p-6 text-left text-midnight shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-9";

  if (state === "done") {
    return (
      <div id={id} className={shell}>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-gold">Request received</p>
        <h3 className="mt-3 text-2xl text-midnight md:text-3xl">It is with us.</h3>
        <p className="mt-4 text-ink">
          We will reply to {form.email.trim()} with the next step: a short call to agree which teams
          and documents to baseline first.
        </p>
        <a
          href={whatsappUrl(ENQUIRY.whatsapp)}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-midnight/15 px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:border-midnight"
        >
          Prefer WhatsApp? {WHATSAPP_DISPLAY} <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    );
  }

  return (
    <div id={id} className={shell}>
      <h3 className="text-2xl text-midnight">Tell us about the team</h3>
      <form onSubmit={onSubmit} className="mt-6" noValidate>
        {/* Honeypot: visually hidden, keyboard-invisible, named to look worth filling. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${id}-company`}>Company</label>
          <input
            id={`${id}-company`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={set("company")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={`${id}-name`}>
              Your name
            </label>
            <input
              id={`${id}-name`}
              className={fieldCls}
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-email`}>
              Work email
            </label>
            <input
              id={`${id}-email`}
              className={fieldCls}
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="you@organisation.co.za"
            />
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-organisation`}>
              Organisation
            </label>
            <input
              id={`${id}-organisation`}
              className={fieldCls}
              type="text"
              autoComplete="organization"
              required
              value={form.organisation}
              onChange={set("organisation")}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor={`${id}-size`}>
              People to train
            </label>
            <select id={`${id}-size`} className={fieldCls} value={form.size} onChange={set("size")}>
              <option value="">Choose a range</option>
              {ENQUIRY.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id}-whatsapp`}>
          Phone or WhatsApp <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id={`${id}-whatsapp`}
          className={fieldCls}
          type="tel"
          autoComplete="tel"
          value={form.whatsapp}
          onChange={set("whatsapp")}
        />

        <label className={cn(labelCls, "mt-4")} htmlFor={`${id}-message`}>
          The teams and the documents
        </label>
        <textarea
          id={`${id}-message`}
          className={cn(fieldCls, "min-h-32 resize-y")}
          required
          maxLength={4000}
          value={form.message}
          onChange={set("message")}
          placeholder={ENQUIRY.placeholder}
        />

        <Button type="submit" className="mt-6 w-full" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Request a proposal"}
        </Button>
      </form>

      {state === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {state === "error" && handoff && (
        <a
          href={whatsappUrl(handoff)}
          target="_blank"
          rel="noopener"
          onClick={() => track("corporate_enquiry_whatsapp_handoff")}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-midnight/15 bg-white px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:border-midnight"
        >
          Send it on WhatsApp <span aria-hidden="true">&#8599;</span>
        </a>
      )}

      <p className="mt-4 text-center font-mono text-[12px] leading-relaxed text-muted">
        One confirmation email, one reply. No list, no newsletter.
      </p>
    </div>
  );
}
