import { useState } from "react";
import { Eyebrow, Faint, Button, cn } from "./ui";
import { BrandIcon } from "./BrandIcons";
import { submitApplication, isSupabaseConfigured, type Application } from "../lib/supabase";
import { track } from "../lib/analytics";
import { IMESSAGE_NUMBER, LINKEDIN_URL, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";

/**
 * The /call form: three fields on one screen, then straight into a
 * conversation. Speed beats depth here: someone who clicked "Apply" is ready
 * now and gone in a minute, so we take a name and a number and talk to them
 * while they still care. The questions the old nine-step application asked
 * are asked on the call instead.
 *
 * What happens next depends on VITE_INSTANT_CALL:
 * - "1": an n8n workflow, triggered by a Supabase Database Webhook on
 *   `applications` inserts (server-side, so its URL never ships to the browser
 *   and nobody can use it to ring arbitrary numbers), has the AI assistant
 *   ring them within minutes. The confirmation promises that call.
 * - unset: nothing automatic is promised beyond a WhatsApp reply; the
 *   confirmation leads with "message Phila now".
 * Either way the confirmation offers WhatsApp, iMessage and LinkedIn in one tap,
 * each opening with the message already written. The voice is the company's
 * ("speak to a specialist"), not one person's.
 */

type Fields = { name: string; phone: string; email: string; want: string };

const EMPTY: Fields = { name: "", phone: "", email: "", want: "" };

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** South African numbers typed as 082 123 4567 become +27821234567, so a dialler can use them. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return "+" + digits.slice(1).replace(/\+/g, "");
  if (digits.startsWith("00")) return "+" + digits.slice(2);
  if (digits.startsWith("27") && digits.length === 11) return "+" + digits;
  if (digits.startsWith("0") && digits.length === 10) return "+27" + digits.slice(1);
  return digits;
}
/** iPhone and Mac Messages read `&body=`; Android reads `?body=` and would dial "&body=…" as part of the number. */
function smsUrl(body: string): string {
  const apple = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  return `sms:+${IMESSAGE_NUMBER}${apple ? "&" : "?"}body=${encodeURIComponent(body)}`;
}

const phoneOk = (v: string) => normalisePhone(v).replace(/\D/g, "").length >= 9;

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-lg text-midnight outline-none focus:border-gold";
const labelCls = "mb-1.5 block text-sm font-semibold text-midnight";

export function ApplicationForm({ schedulerUrl }: { schedulerUrl?: string }) {
  const instantCall = import.meta.env.VITE_INSTANT_CALL === "1";
  const [form, setForm] = useState<Fields>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [tried, setTried] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim().length > 0 && phoneOk(form.phone) && emailOk(form.email);
  const first = form.name.trim().split(/\s+/)[0] ?? "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!valid) return;
    setState("sending");
    const app: Application = {
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: normalisePhone(form.phone),
      business: "",
      business_does: "",
      reason: form.want.trim(),
      outcome: "",
      frustration: "",
      team_size: null,
    };
    const result = await submitApplication(app);
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }
    track("call_apply", { configured: isSupabaseConfigured, instant_call: instantCall });
    setState("done");
  }

  /* ---------------- After sending: talk now ---------------- */
  if (state === "done") {
    const hello = `Hi GrowthCred, it's ${form.name.trim()}. I've just applied on the website${
      form.want.trim() ? ` and I want ${form.want.trim()} off my plate` : ""
    }. I'd like to speak to a specialist.`;
    const openLinkedIn = async () => {
      track("call_linkedin");
      try {
        await navigator.clipboard.writeText(hello);
        setCopied(true);
      } catch {
        /* Clipboard refused: the profile still opens, they just type it. */
      }
    };
    return (
      <div className="rounded-2xl border border-midnight/10 bg-white p-6 text-center md:p-10">
        <Eyebrow>Got it</Eyebrow>
        {instantCall ? (
          <>
            <h2 className="mx-auto mt-4 max-w-[20ch] text-2xl md:text-3xl">
              Keep your phone close{first ? `, ${first}` : ""}. <Faint>We're calling you now.</Faint>
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-ink">
              Expect a call on {normalisePhone(form.phone)} in the next few minutes. It's our AI assistant: a few
              quick questions so your specialist comes to the call prepared. Rather message? Tap below.
            </p>
          </>
        ) : (
          <>
            <h2 className="mx-auto mt-4 max-w-[20ch] text-2xl md:text-3xl">
              Thanks{first ? `, ${first}` : ""}. <Faint>Let's talk now.</Faint>
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-ink">
              Message a specialist now and the conversation starts straight away. Otherwise we'll WhatsApp you on{" "}
              {normalisePhone(form.phone)} within one working day.
            </p>
          </>
        )}

        <div className="mx-auto mt-8 grid max-w-[440px] gap-3">
          <a
            href={whatsappUrl(hello)}
            target="_blank"
            rel="noopener"
            onClick={() => track("call_whatsapp")}
            aria-label="Speak to a specialist on WhatsApp"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gold px-6 font-semibold text-midnight no-underline hover:bg-gold-soft"
          >
            <BrandIcon name="whatsapp" className="h-6 w-6" />
            Speak to a specialist
          </a>
          <a
            href={smsUrl(hello)}
            onClick={() => track("call_imessage")}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-midnight/15 px-6 font-semibold text-midnight no-underline hover:border-gold"
          >
            <BrandIcon name="imessage" className="h-6 w-6" />
            iMessage or text instead
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener"
            onClick={() => void openLinkedIn()}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-midnight/15 px-6 font-semibold text-midnight no-underline hover:border-gold"
          >
            <BrandIcon name="linkedin" className="h-6 w-6" />
            Message us on LinkedIn
          </a>
        </div>
        <p role="status" className="mt-4 min-h-5 text-sm text-ink">
          {copied ? "Your message is copied. On LinkedIn, tap Message and paste it in." : ""}
        </p>

        {schedulerUrl ? (
          <div className="mt-10">
            <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">Or pick a time now</p>
            <iframe
              src={schedulerUrl}
              title="Book your call with GrowthCred"
              className="h-[680px] w-full rounded-2xl border border-midnight/10"
            />
          </div>
        ) : null}
      </div>
    );
  }

  /* ---------------- The form: one screen, three fields ---------------- */
  const bad = (ok: boolean) => tried && !ok;
  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-midnight/10 bg-white p-6 text-left shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] md:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="apply-name" className={labelCls}>Your name</label>
          <input
            id="apply-name"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Thabo Mokoena"
            aria-invalid={bad(form.name.trim().length > 0)}
            className={cn(fieldCls, bad(form.name.trim().length > 0) && "border-red-600")}
          />
        </div>
        <div>
          <label htmlFor="apply-phone" className={labelCls}>Mobile number (WhatsApp)</label>
          <input
            id="apply-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="082 123 4567"
            aria-invalid={bad(phoneOk(form.phone))}
            className={cn(fieldCls, bad(phoneOk(form.phone)) && "border-red-600")}
          />
        </div>
        <div>
          <label htmlFor="apply-email" className={labelCls}>Email</label>
          <input
            id="apply-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@yourbusiness.co.za"
            aria-invalid={bad(emailOk(form.email))}
            className={cn(fieldCls, bad(emailOk(form.email)) && "border-red-600")}
          />
        </div>
        <div>
          <label htmlFor="apply-want" className={labelCls}>
            What do you most want off your plate? <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="apply-want"
            value={form.want}
            onChange={set("want")}
            placeholder="Proposals, follow-ups, admin…"
            className={fieldCls}
          />
        </div>
      </div>

      {tried && !valid && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Add your name, a mobile number and an email, and we'll take it from there.
        </p>
      )}
      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          That did not send. Please try again, or WhatsApp us on {WHATSAPP_DISPLAY}.
        </p>
      )}

      <Button type="submit" disabled={state === "sending"} className="mt-6 w-full">
        {state === "sending" ? "Sending…" : instantCall ? "Call me now" : "Let's talk"} <span aria-hidden="true">&#8599;</span>
      </Button>
      <p className="mt-4 text-center text-[13px] leading-relaxed text-muted">
        {instantCall
          ? "Sending this means we may call or WhatsApp you about it. The first call is from our AI assistant."
          : "Sending this means we may call or WhatsApp you about it."}{" "}
        No list, no newsletter.
      </p>
    </form>
  );
}
