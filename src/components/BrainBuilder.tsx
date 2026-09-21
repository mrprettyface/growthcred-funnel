import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui";
import {
  BRAIN_QUESTIONS,
  EMPTY_ANSWERS,
  answeredCount,
  buildBrainMarkdown,
  clearDraft,
  isAnswered,
  loadDraft,
  saveDraft,
  sendBrainEmail,
  type BrainAnswers,
} from "../lib/brain";
import { captureLead } from "../lib/supabase";
import { track } from "../lib/analytics";

/**
 * The Business Brain builder — the worksheet, made interactive.
 *
 * One question at a time, drafting saved to localStorage after every step, and
 * the instruction document assembling live from the answers. At the end: copy,
 * download as Markdown, or email it to themselves (via the `brain-send` Edge
 * Function, which rebuilds the document server-side from the fixed template).
 *
 * The lead is captured on start (fire-and-forget into `leads`), exactly like
 * the free class opt-in — the builder must never refuse to run because the
 * database is not configured.
 */

type Phase = "intro" | "questions" | "result";

const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());

export function BrainBuilder() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<BrainAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);
  const [who, setWho] = useState({ name: "", email: "" });
  const [whoError, setWhoError] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [resumed, setResumed] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  // Resume a saved draft once on mount, so a refresh never costs progress.
  useEffect(() => {
    const draft = loadDraft();
    if (draft && draft.step > 0 && draft.step < BRAIN_QUESTIONS.length) {
      const answered = BRAIN_QUESTIONS.filter((x) => draft.answers[x.id].trim()).length;
      if (answered > 0) {
        setAnswers(draft.answers);
        setStep(draft.step);
        setResumed(true);
      }
    }
  }, []);

  // Persist the draft after every change while building.
  useEffect(() => {
    if (phase === "questions") saveDraft(answers, step);
  }, [answers, step, phase]);

  // Keyboard-first: the textarea is always waiting.
  useEffect(() => {
    if (phase === "questions") areaRef.current?.focus();
  }, [step, phase]);

  const q = BRAIN_QUESTIONS[Math.min(step, BRAIN_QUESTIONS.length - 1)];
  const markdown = useMemo(() => buildBrainMarkdown(answers), [answers]);

  function start() {
    if (!who.name.trim() || !emailOk(who.email)) {
      setWhoError("Your name and a working email — your brain gets sent there at the end.");
      return;
    }
    setWhoError("");
    // Fire-and-forget lead capture, same contract as the free class opt-in.
    void captureLead({ email: who.email.trim(), source: "brain_builder" });
    track("brain_start", { resumed });
    setPhase("questions");
  }

  function next() {
    if (!isAnswered(q, answers)) return;
    if (step >= BRAIN_QUESTIONS.length - 1) {
      track("brain_complete", { answered: answeredCount(answers) });
      clearDraft();
      setPhase("result");
      window.scrollTo(0, 0);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter advances, Shift+Enter makes a newline — a chat rhythm, not a form.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      track("brain_copy");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard refused (http, permissions). Select the text so a manual
      // Ctrl+C still works.
      areaRef.current?.select();
    }
  }

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-business-brain.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    track("brain_download");
  }

  async function emailMe() {
    if (emailState === "sending" || emailState === "sent") return;
    setEmailState("sending");
    track("brain_email_requested");
    const result = await sendBrainEmail(who.name, who.email, answers);
    setEmailState(result.ok ? "sent" : "error");
  }

  function startOver() {
    clearDraft();
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
    setEmailState("idle");
    setPhase("intro");
    window.scrollTo(0, 0);
  }

  /* ------------------------------ INTRO ------------------------------ */

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-midnight px-5 py-14 text-cream md:py-20">
        <div className="mx-auto w-[min(680px,100%)]">
          <p className="font-display text-lg font-extrabold tracking-[-0.05em]">
            Growth<span className="text-gold">Cred</span>
            <span className="text-gold">.</span>
          </p>
          <h1 className="mt-8 text-4xl leading-[1.08] md:text-5xl">
            Build your Business Brain <span className="text-gold">in five minutes.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-cream/85">
            Fifteen short questions about your business. At the end you walk out with one
            paragraph that teaches any AI — ChatGPT, Claude, Copilot, Gemini — to write like you,
            price like you, and never embarrass you.
          </p>
          <ul className="mt-6 grid gap-2 text-cream/70">
            <li>&rarr; Answers save as you go. Close the tab, come back, carry on.</li>
            <li>&rarr; The finished text is yours to paste anywhere, forever.</li>
            <li>&rarr; One email with your Business Brain in it, so it survives the night.</li>
          </ul>

          <div className="mt-9 grid gap-4 rounded-2xl border border-cream/15 bg-white/[0.04] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/60">
                  Your name
                </span>
                <input
                  type="text"
                  autoComplete="name"
                  className="rounded-xl border border-cream/20 bg-midnight px-4 py-3 text-base text-cream outline-none focus:border-gold"
                  value={who.name}
                  onChange={(e) => setWho((w) => ({ ...w, name: e.target.value }))}
                  placeholder="Thabo"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/60">
                  Email address
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  className="rounded-xl border border-cream/20 bg-midnight px-4 py-3 text-base text-cream outline-none focus:border-gold"
                  value={who.email}
                  onChange={(e) => setWho((w) => ({ ...w, email: e.target.value }))}
                  placeholder="you@yourbusiness.co.za"
                />
              </label>
            </div>
            {whoError && (
              <p role="alert" className="text-sm text-gold">
                {whoError}
              </p>
            )}
            <Button onClick={start} className="w-full">
              {resumed ? "Continue where I left off" : "Start the 15 questions"}{" "}
              <span aria-hidden="true">&#8594;</span>
            </Button>
            <p className="text-center font-mono text-[11px] text-cream/50">
              About five minutes. Nothing here has to be perfect — it has to be true.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------- QUESTIONS ---------------------------- */

  if (phase === "questions") {
    const progress = ((step + (isAnswered(q, answers) ? 1 : 0)) / BRAIN_QUESTIONS.length) * 100;
    return (
      <div className="min-h-screen bg-midnight px-5 py-10 text-cream md:py-14">
        <div className="mx-auto w-[min(760px,100%)]">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              {q.part}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
              Question {q.num} of {BRAIN_QUESTIONS.length}
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-3 h-1 overflow-hidden rounded-full bg-cream/15"
          >
            <div
              className="h-full rounded-full bg-gold transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="mt-10 text-2xl leading-snug md:text-[2rem]">{q.title}</h2>
          <p className="mt-3 max-w-[60ch] text-sm text-cream/60">{q.hint}</p>

          <textarea
            ref={areaRef}
            rows={4}
            value={answers[q.id]}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            onKeyDown={onKeyDown}
            maxLength={1200}
            placeholder={q.placeholder}
            className="mt-6 w-full resize-y rounded-2xl border border-cream/20 bg-white/[0.04] px-5 py-4 text-lg leading-relaxed text-cream outline-none placeholder:text-cream/30 focus:border-gold"
          />
          <p className="mt-2 font-mono text-[11px] text-cream/40">
            Enter to continue &middot; Shift+Enter for a new line
          </p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="min-h-11 rounded-full border border-cream/25 px-5 font-body text-sm font-semibold text-cream/80 transition hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-40"
            >
              &larr; Back
            </button>
            <div className="flex items-center gap-3">
              {q.optional && (
                <button
                  type="button"
                  onClick={next}
                  className="min-h-11 px-3 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/50 transition hover:text-gold"
                >
                  Skip
                </button>
              )}
              <Button onClick={next} disabled={!isAnswered(q, answers)}>
                {step >= BRAIN_QUESTIONS.length - 1 ? "Build my brain" : "Next"}{" "}
                <span aria-hidden="true">&#8594;</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ RESULT ------------------------------ */

  return (
    <div className="min-h-screen bg-midnight px-5 py-14 text-cream md:py-20">
      <div className="mx-auto w-[min(760px,100%)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          Done — {answeredCount(answers)} of {BRAIN_QUESTIONS.length} answered
        </p>
        <h1 className="mt-4 text-3xl leading-tight md:text-4xl">
          This is your Business Brain.{" "}
          <span className="text-gold">It already sounds like you.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-cream/80">
          Copy everything below and paste it where your AI lives. From the next message on, it
          knows who you serve, how you price, and what never to say.
        </p>

        <textarea
          ref={areaRef}
          readOnly
          value={markdown}
          rows={16}
          aria-label="Your Business Brain, ready to copy"
          className="mt-7 w-full resize-y rounded-2xl border border-cream/20 bg-white/[0.04] px-5 py-4 font-mono text-[13px] leading-relaxed text-cream/90 outline-none focus:border-gold"
        />

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Button onClick={copy} className="w-full">
            {copied ? "Copied ✓" : "Copy my brain"}
          </Button>
          <Button variant="ghostLight" onClick={download} className="w-full">
            Download as .md <span aria-hidden="true">&#8595;</span>
          </Button>
          <Button
            variant="ghostLight"
            onClick={emailMe}
            className="w-full"
            disabled={emailState === "sending" || emailState === "sent"}
          >
            {emailState === "sending" ? "Sending…" : emailState === "sent" ? "Sent ✓" : "Email it to me"}
          </Button>
        </div>

        {emailState === "sent" && (
          <p role="status" className="mt-3 text-sm text-gold">
            On its way to {who.email}. It has the text above, plus where to paste it in ChatGPT,
            Claude, Copilot and Gemini.
          </p>
        )}
        {emailState === "error" && (
          <p role="alert" className="mt-3 text-sm text-gold">
            That did not send — but the Copy and Download buttons just worked, so you already have
            it. Nothing is lost.
          </p>
        )}

        <div className="mt-12 rounded-2xl border border-gold/40 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-xl md:text-2xl">Where to paste it</h2>
          <ul className="mt-4 grid gap-2.5 text-cream/80">
            <li>
              <b className="text-cream">ChatGPT</b> — Settings &rarr; Personalization &rarr; Custom
              Instructions, or any Project&rsquo;s instructions
            </li>
            <li>
              <b className="text-cream">Claude</b> — Project instructions
            </li>
            <li>
              <b className="text-cream">Copilot / Gemini</b> — the memory / instructions box in
              settings
            </li>
          </ul>
          <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-cream/85">
            The test: open a fresh chat and ask for a follow-up message to a client who has gone
            quiet about their quote. If it sounds like you, it worked.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-6">
          <p className="max-w-[46ch] text-sm text-cream/70">
            You just did step one. The workshop builds the whole machine —{" "}
            <b className="text-gold">Get 10 Hours a Week Back, in One Day.</b>
          </p>
          <div className="flex gap-3">
            <a
              href="/"
              className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 text-sm font-semibold no-underline transition hover:border-gold hover:text-gold"
            >
              The workshop
            </a>
            <button
              type="button"
              onClick={startOver}
              className="min-h-11 px-2 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/50 transition hover:text-gold"
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
