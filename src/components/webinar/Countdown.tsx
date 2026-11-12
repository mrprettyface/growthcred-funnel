import { useEffect, useState } from "react";
import { cn } from "../ui";
import { JCCI } from "../../lib/jcciWebinar";
import { WEBINAR, msUntilStart, sessionHasPassed } from "../../lib/webinar";

/**
 * The bar above the headline: who it is with, when it is, and how long is left.
 *
 * Three rules it has to keep.
 *
 * It never counts below zero. `msUntilStart` clamps at 0, and once the session
 * has started the bar drops the clock entirely rather than showing 00d 00h.
 *
 * It is not rendered on the server. The page is prerendered at build time, so a
 * clock computed during SSR would bake "7 days left" into the HTML and serve it
 * for a month. The digits mount on the client instead, which also means no
 * hydration mismatch. Until then the bar still carries the date and the time,
 * which is the part that actually matters.
 *
 * It does not shout at screen readers. A clock that re-announces itself every
 * second makes the page unusable with a reader, so the digits are aria-hidden
 * and the date beside them is the accessible version of the same fact.
 */

function split(ms: number) {
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** The clock on its own, for the hero as well as the bar. */
export function Countdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    if (sessionHasPassed()) return;
    setLeft(msUntilStart());
    const tick = window.setInterval(() => {
      const next = msUntilStart();
      setLeft(next);
      if (next === 0) window.clearInterval(tick);
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  if (left === null || left === 0) return null;
  const { d, h, m, s } = split(left);

  return (
    <span
      aria-hidden="true"
      className={cn("font-mono tabular-nums tracking-[0.08em]", className)}
    >
      {pad(d)}d : {pad(h)}h : {pad(m)}m : {pad(s)}s
    </span>
  );
}

/**
 * The full top bar. Sits above everything, states the partnership, the date and
 * the time, and adds the clock once the page is interactive.
 */
export function WebinarTopBar() {
  const passed = sessionHasPassed();

  return (
    <div className="border-b border-cream/10 bg-midnight px-5 py-2.5 text-center">
      <p className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/70 md:text-[12px]">
        <span className="text-gold">
          {JCCI.partner} &times; GrowthCred
        </span>
        {passed ? (
          <span>This one has run. Tell me about the next one.</span>
        ) : (
          <>
            <span aria-hidden="true" className="text-cream/25">
              &middot;
            </span>
            <span>Free live webinar</span>
            <span aria-hidden="true" className="text-cream/25">
              &middot;
            </span>
            <span className="text-cream">
              {WEBINAR.dayLabel} &middot; {WEBINAR.timeLabel}
            </span>
            <Countdown className="text-gold" />
          </>
        )}
      </p>
    </div>
  );
}
