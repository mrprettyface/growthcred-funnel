import { useEffect, useRef, useState } from "react";
import { Eyebrow, Faint, Button, cn } from "./ui";
import { submitApplication, isSupabaseConfigured, type Application } from "../lib/supabase";
import { track } from "../lib/analytics";
import { WHATSAPP_URL } from "../lib/contact";

/**
 * The application, asked ONE QUESTION AT A TIME. Answering advances to the
 * next question, which animates in, until the whole thing is done.
 *
 * This is the "your form should begin the relationship" idea taken further:
 * a conversation, not a wall of inputs. The three open questions still do the
 * real work, letting Phila walk into the call already understanding the
 * prospect. The step friction also qualifies: the right owner finishes it.
 */

type StepDef = {
  key: keyof Application;
  kind: "text" | "email" | "tel" | "textarea" | "select";
  question: string;
  help?: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
};

const STEPS: StepDef[] = [
  { key: "name", kind: "text", question: "First, who are we talking to?", help: "Your name.", required: true, placeholder: "Thabo Mokoena" },
  { key: "business", kind: "text", question: "What is your business called?", required: true, placeholder: "Mokoena Consulting" },
  { key: "business_does", kind: "text", question: "In a line, what does it do?", help: "Optional, but it helps us come in prepared.", required: false, placeholder: "B2B consulting for logistics firms" },
  { key: "email", kind: "email", question: "Where should we email you?", required: true, placeholder: "you@yourbusiness.co.za" },
  { key: "whatsapp", kind: "tel", question: "And your WhatsApp number?", help: "Fastest way we reach you to set a time.", required: true, placeholder: "082 123 4567" },
  { key: "team_size", kind: "select", question: "How big is your team?", required: false, options: ["Just me", "2 to 5", "6 to 20", "20+"] },
  { key: "reason", kind: "textarea", question: "What made you apply today?", help: "What is going on in the business that made now the moment.", required: true },
  { key: "outcome", kind: "textarea", question: "If this works, what does getting your time back actually let you do?", help: "Paint the picture. The deal you would chase, the thing you would build, the afternoon you would take.", required: true },
  { key: "frustration", kind: "textarea", question: "What has been the most frustrating part of trying to fix this yourself?", help: "Be honest. This is the part we most want to understand before we speak.", required: true },
];

const EMPTY: Application = {
  name: "", email: "", whatsapp: "", business: "", business_does: "",
  reason: "", outcome: "", frustration: "", team_size: "",
};

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const valueOk = (step: StepDef, v: string) =>
  !step.required || (step.kind === "email" ? emailOk(v) : v.trim().length > 0);

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-lg outline-none focus:border-gold";

export function ApplicationForm({ schedulerUrl }: { schedulerUrl?: string }) {
  const [form, setForm] = useState<Application>(EMPTY);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const total = STEPS.length;
  const current = STEPS[step];
  const isLast = step === total - 1;
  const value = (form[current.key] ?? "") as string;
  const ready = valueOk(current, value);

  // Focus the field each time the question changes, without yanking the scroll.
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [step]);

  const setValue = (v: string) => setForm((f) => ({ ...f, [current.key]: v }));

  async function doSubmit() {
    setState("sending");
    const result = await submitApplication(form);
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      setMessage("That did not send. Please try again, or WhatsApp us on 066 283 0289.");
      return;
    }
    track("call_apply", { configured: isSupabaseConfigured });
    setState("done");
  }

  function advance(e?: React.FormEvent) {
    e?.preventDefault();
    if (!ready) {
      inputRef.current?.focus();
      return;
    }
    if (isLast) void doSubmit();
    else setStep((s) => s + 1);
  }

  function skip() {
    if (isLast) void doSubmit();
    else setStep((s) => s + 1);
  }

  /* ---------------- Confirmation ---------------- */
  if (state === "done") {
    return (
      <div className="rounded-2xl border border-midnight/10 bg-white p-6 text-center md:p-10">
        <Eyebrow>Application received</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[18ch] text-2xl md:text-3xl">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. <Faint>We read every word.</Faint>
        </h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-ink">
          Because you told us where you are, the call starts warm. We will come in already
          understanding what you are trying to fix and what a win looks like for you.
        </p>

        {schedulerUrl ? (
          <div className="mt-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Pick a time that suits you
            </p>
            <iframe
              src={schedulerUrl}
              title="Book your call with GrowthCred"
              className="h-[680px] w-full rounded-2xl border border-midnight/10"
            />
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-[46ch] rounded-xl border border-dashed border-midnight/25 bg-midnight/[0.03] p-6">
            <p className="text-sm text-ink">
              We will reach out on WhatsApp within one working day to set a time. Sooner is fine too:
            </p>
            <a
              href={WHATSAPP_URL}
              className="mt-3 inline-block font-mono text-sm text-midnight underline decoration-gold underline-offset-4 hover:text-gold"
            >
              Message us on 066 283 0289
            </a>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- Guided, one question at a time ---------------- */
  const pct = Math.round(((step + (ready ? 1 : 0)) / total) * 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-white">
      {/* Progress */}
      <div className="h-1.5 w-full bg-midnight/5">
        <div
          className="h-full bg-gold transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <form onSubmit={advance} className="p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Eyebrow>Apply to work together</Eyebrow>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* key={step} remounts the block so the entrance animation replays */}
        <div key={step} className="gc-step-in mt-7">
          <h2 className="max-w-[22ch] text-2xl md:text-3xl">{current.question}</h2>
          {current.help ? <p className="mt-2 max-w-[52ch] text-[15px] text-muted">{current.help}</p> : null}

          <div className="mt-6">
            {current.kind === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={current.placeholder}
                className={cn(fieldCls, "min-h-[130px] resize-y")}
                aria-label={current.question}
              />
            ) : current.kind === "select" ? (
              <select
                ref={inputRef as React.RefObject<HTMLSelectElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={fieldCls}
                aria-label={current.question}
              >
                <option value="">Select&hellip;</option>
                {current.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={current.kind}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={current.placeholder}
                className={fieldCls}
                aria-label={current.question}
              />
            )}
          </div>

          {current.kind === "textarea" && (
            <p className="mt-2 font-mono text-[11px] text-muted">Take your time. There is no wrong answer.</p>
          )}
        </div>

        {state === "error" && (
          <p role="alert" className="mt-5 text-sm text-red-700">
            {message}
          </p>
        )}

        {/* Controls */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition hover:text-midnight disabled:opacity-0"
          >
            &larr; Back
          </button>

          <div className="flex-1" />

          {!current.required && (
            <button
              type="button"
              onClick={skip}
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted underline underline-offset-4 hover:text-midnight"
            >
              Skip
            </button>
          )}

          <Button type="submit" disabled={!ready || state === "sending"}>
            {state === "sending"
              ? "Sending…"
              : isLast
                ? "Send my application"
                : "Continue"}{" "}
            <span aria-hidden="true">&#8599;</span>
          </Button>
        </div>

        {!isLast && current.kind !== "textarea" && current.kind !== "select" && (
          <p className="mt-3 text-right font-mono text-[12px] uppercase tracking-[0.14em] text-muted md:text-[11px]">
            Press Enter &crarr;
          </p>
        )}
      </form>
    </div>
  );
}
