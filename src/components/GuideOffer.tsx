import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui";
import { GuideCover } from "./GuideCover";
import { captureMagnetSignup, submitContactMessage } from "../lib/supabase";
import { track } from "../lib/analytics";
import { GUIDE_OFFER, GUIDE_PATH, GUIDE_SLUG } from "../lib/guide";

/**
 * The site-wide offer of the AI Implementation Guide.
 *
 * A card, not a takeover: bottom sheet on phones, bottom-right card on larger
 * screens, no backdrop, and the page behind stays usable. Google treats
 * full-screen popups on mobile as intrusive, and search is how most people
 * arrive, so this never covers the page they came to read.
 *
 * It opens as soon as the page has drawn (about a second after arriving, at
 * Phila's request, 26 Sep 2026: the offer should be the first thing seen). It
 * stays
 * away from pages where a form is already the point, and it shows once:
 * dismissed, it rests for 14 days; claimed, it never comes back.
 *
 * The opt-in lands in `magnet_signups` (slug `ai-implementation-guide`, source
 * `popup:<path>`). With VITE_GUIDE_EMAIL=1 it is also sent through the
 * `contact-autoresponder` function as source "ai_guide", which emails the
 * visitor the guide and tells the business inbox. That flag waits until the
 * function version with the guide email is deployed: the older one would send
 * its generic "we got your message" reply instead. The guide opens on the spot
 * either way.
 */

const KEY = "gc_guide_offer";
const REST_DAYS = 14;

/** Pages where a form or a purchase is already the point, and the guide itself. */
const SKIP = [
  "/call", "/checkout", "/upsell", "/downsell", "/build", "/thank-you",
  "/class", "/webinar", "/playbook", "/brain", "/contact", GUIDE_PATH,
  "/terms", "/privacy", "/refunds",
];

function resting(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const { state, at } = JSON.parse(raw) as { state: string; at: number };
    if (state === "claimed") return true;
    return Date.now() - at < REST_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

function remember(state: "claimed" | "dismissed") {
  try {
    localStorage.setItem(KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    /* Storage refused: it may show again next visit, which is harmless. */
  }
}

export function GuideOffer() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [tried, setTried] = useState(false);
  const shown = useRef(false);
  const emailing = import.meta.env.VITE_GUIDE_EMAIL === "1";

  const eligible = !SKIP.some((p) => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    if (!eligible || shown.current || resting()) return;
    const show = () => {
      if (shown.current || resting()) return;
      shown.current = true;
      setOpen(true);
      track("guide_offer_view", { path: pathname });
    };
    // One beat after arrival, so the page paints first and the card slides in over it.
    const timer = window.setTimeout(show, 1_000);
    return () => window.clearTimeout(timer);
  }, [eligible, pathname]);

  // A route change to a page it should not appear on closes it.
  useEffect(() => {
    if (!eligible && open && state !== "done") setOpen(false);
  }, [eligible, open, state]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  function close() {
    if (state !== "done") {
      remember("dismissed");
      track("guide_offer_dismiss", { path: pathname });
    }
    setOpen(false);
  }

  const valid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && consent;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!valid) return;
    setState("sending");
    const [result, mail] = await Promise.all([
      captureMagnetSignup({
        magnet: GUIDE_SLUG,
        name: name.trim(),
        email: email.trim(),
        whatsapp: "",
        company: null,
        consent: true,
        source: `popup:${pathname}`,
      }),
      emailing
        ? submitContactMessage({
            name: name.trim(),
            email: email.trim(),
            whatsapp: null,
            message: `AI Implementation Guide request (popup:${pathname})`,
            company: "",
            source: "ai_guide",
          })
        : Promise.resolve({ ok: false, error: "off" }),
    ]);
    if (!result.ok && !mail.ok && result.error !== "not_configured") {
      setState("error");
      return;
    }
    remember("claimed");
    track("guide_offer_claim", { path: pathname });
    setState("done");
  }

  if (!open) return null;

  const field =
    "w-full rounded-xl border border-midnight/15 bg-white px-4 py-2.5 text-base text-midnight outline-none focus:border-gold";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="guide-offer-title"
      className="gc-step-in fixed inset-x-0 bottom-0 z-[90] max-h-[85vh] overflow-y-auto rounded-t-3xl border border-midnight/10 bg-paper p-5 text-midnight shadow-[0_-20px_60px_-20px_rgba(26,26,36,0.45)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:rounded-3xl sm:p-6"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-xl text-muted hover:text-midnight"
      >
        &times;
      </button>

      <p className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
        <span aria-hidden="true" className="h-px w-6 bg-gold" />
        {GUIDE_OFFER.eyebrow}
      </p>

      {state === "done" ? (
        <div className="mt-3">
          <div className="flex items-center gap-4 pr-6">
            <GuideCover className="-ml-1 w-[88px] sm:w-[104px]" />
            <div>
              <h2 id="guide-offer-title" className="text-2xl">{GUIDE_OFFER.done}</h2>
              {emailing ? <p className="mt-2 text-sm text-ink">{GUIDE_OFFER.emailed(email.trim())}</p> : null}
            </div>
          </div>
          <Link
            to={GUIDE_PATH}
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 font-semibold text-midnight no-underline hover:bg-gold-soft"
          >
            {GUIDE_OFFER.read} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-3">
          <div className="flex items-start gap-4 pr-6">
            <GuideCover className="-ml-1 w-[88px] sm:w-[104px]" />
            <div>
              <h2 id="guide-offer-title" className="text-xl leading-tight sm:text-2xl">{GUIDE_OFFER.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink">{GUIDE_OFFER.promise}</p>
            </div>
          </div>
          <ul className="mt-3 hidden space-y-1 sm:block">
            {GUIDE_OFFER.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink">
                <span aria-hidden="true" className="text-gold">&#9670;</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2.5">
            <label className="sr-only" htmlFor="guide-name">First name</label>
            <input id="guide-name" autoComplete="given-name" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
            <label className="sr-only" htmlFor="guide-email">Email</label>
            <input id="guide-email" type="email" inputMode="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>
          <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug text-ink">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-gold)]" />
            {GUIDE_OFFER.consent}
          </label>
          {tried && !valid ? (
            <p role="alert" className="mt-2 text-sm text-red-700">Add your name and email, and tick the box.</p>
          ) : null}
          {state === "error" ? (
            <p role="alert" className="mt-2 text-sm text-red-700">That did not send. Please try again.</p>
          ) : null}
          <Button type="submit" disabled={state === "sending"} className="mt-4 w-full">
            {state === "sending" ? "Sending…" : GUIDE_OFFER.cta}
          </Button>
        </form>
      )}
    </div>
  );
}
