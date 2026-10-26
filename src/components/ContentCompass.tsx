import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  EXAMPLE_GROUPS,
  downloadBasename,
  numberedQuestions,
  questionsFor,
  questionsMarkdown,
} from "../lib/contentCompass";
import { Button, Eyebrow, cn } from "./ui";

/** Stable keys in reel order. The question text changes as the fields change. */
const QUESTION_KEY = [
  "cost",
  "lasts",
  "best-near-me",
  "when",
  "breaking",
  "which",
  "fix-myself",
  "insurance",
  "need",
  "repair-or-replace",
  "worth",
  "safe",
  "versus",
  "or",
  "companies-like",
  "alternatives",
  "reviews",
  "near-me",
  "open-now",
  "same-day",
  "beginners",
  "bad-credit",
  "without-insurance",
  "cheapest",
  "popular",
  "emergency",
  "problems",
  "mistakes",
  "before-after",
  "how-long",
  "after",
  "monthly",
  "free-quote",
  "scam",
] as const;

const fieldCls =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-base text-midnight outline-none focus:border-gold";
const labelCls = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted";

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* Some browsers block the async clipboard. Try the selection fallback. */
    }
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

function downloadFile(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Client-side list of 34 customer questions. The list is on the page before
 * any click. Preset chips write the service field only.
 */
export function ContentCompass() {
  const [service, setService] = useState("");
  const [company, setCompany] = useState("");
  const [competitor, setCompetitor] = useState("");
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const questions = useMemo(
    () => questionsFor({ service, company, competitor }),
    [service, company, competitor],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function flash(message: string) {
    setStatus(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }

  async function copyText(text: string, success: string) {
    const ok = await writeClipboard(text);
    flash(ok ? success : "Copy failed. Select the list and copy it yourself.");
  }

  function save(extension: "txt" | "md") {
    const base = downloadBasename(service);
    if (extension === "md") {
      downloadFile(`${base}.md`, questionsMarkdown(questions, { service, company, competitor }), "text/markdown");
      flash("Downloaded the markdown file.");
      return;
    }
    downloadFile(`${base}.txt`, `${numberedQuestions(questions)}\n`, "text/plain");
    flash("Downloaded the text file.");
  }

  return (
    <section id="compass" aria-labelledby="compass-heading" className="scroll-mt-28">
      <Eyebrow>Content compass</Eyebrow>
      <h2 id="compass-heading" className="mt-3 text-2xl md:text-3xl">
        Your 34 questions
      </h2>
      <p className="mt-4 max-w-[68ch] leading-relaxed text-ink">
        Type what you sell. The list fills in as you type. A blank box stays a placeholder.
      </p>

      <div className="mt-6 rounded-2xl border border-midnight/10 bg-[#f1ede3] p-6 md:p-8">
        <label className={labelCls} htmlFor="cc-service">
          What you sell
        </label>
        <input
          id="cc-service"
          className={fieldCls}
          type="text"
          value={service}
          maxLength={80}
          autoComplete="off"
          placeholder="For example, private AI"
          onChange={(event) => setService(event.target.value)}
        />
        <p id="cc-service-help" className="mt-2 text-sm leading-relaxed text-muted">
          A service or a product. One noun is enough.
        </p>

        <div className="mt-5">
          <p className="text-sm text-midnight">Examples. These fill only what you sell.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {EXAMPLE_GROUPS.map((group) => (
              <div key={group.id}>
                <p id={`${group.id}-label`} className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {group.label}
                </p>
                <div role="group" aria-labelledby={`${group.id}-label`} className="mt-2 flex flex-wrap gap-2">
                  {group.values.map((example) => (
                    <button
                      key={example}
                      type="button"
                      aria-pressed={service === example}
                      onClick={() => setService(example)}
                      className={cn(
                        "min-h-11 rounded-full border px-4 text-sm font-semibold",
                        service === example
                          ? "border-gold bg-gold text-midnight"
                          : "border-midnight/15 bg-white text-midnight hover:border-gold",
                      )}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="cc-company">
              Your company <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="cc-company"
              className={fieldCls}
              type="text"
              value={company}
              maxLength={80}
              autoComplete="organization"
              placeholder="[your company]"
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="cc-competitor">
              A competitor <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="cc-competitor"
              className={fieldCls}
              type="text"
              value={competitor}
              maxLength={80}
              autoComplete="off"
              placeholder="[competitor]"
              onChange={(event) => setCompetitor(event.target.value)}
            />
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Leave either box blank. I keep [your company] or [competitor] in the list. I will not invent a name.
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => copyText(numberedQuestions(questions), "Copied all 34 questions.")}>
            Copy all
          </Button>
          <Button type="button" variant="outline" onClick={() => save("txt")}>
            Download .txt
          </Button>
          <Button type="button" variant="outline" onClick={() => save("md")}>
            Download .md
          </Button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-midnight">
          {status}
        </p>

        <ol className="mt-2 list-decimal space-y-0 pl-6 marker:font-mono marker:text-gold">
          {questions.map((question, index) => (
            <li key={QUESTION_KEY[index]} className="border-b border-midnight/10 py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 flex-1 leading-relaxed text-ink">{question}</p>
                <button
                  type="button"
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-midnight/15 px-3 text-sm font-semibold text-midnight hover:border-gold"
                  aria-label={`Copy question ${index + 1}`}
                  onClick={() => copyText(question, `Copied question ${index + 1}.`)}
                >
                  Copy
                </button>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-[62ch] leading-relaxed text-ink">
          Want your customer to land on your answer? <Link to="/contact">Contact us</Link>.
        </p>
      </div>
    </section>
  );
}
