import type { ReactElement } from "react";
import { GOLD } from "./sceneKit";

/**
 * Small figure marks for FAQ rows.
 *
 * A 200×150 scene shrunk into an accordion row is illegible, so these are their
 * own compact drawings: a 60×60 box, one figure, one symbol, nothing else. Same
 * hand as the big scenes, sized for a 44px well.
 */

export type FaqMarkName =
  | "price"
  | "not-technical"
  | "industry"
  | "diy"
  | "bring"
  | "after"
  | "youtube"
  | "recording";

const MARKS: Record<FaqMarkName, ReactElement> = {
  /* Why is it only R990 — a figure and a coin. */
  price: (
    <>
      <circle cx="22" cy="18" r="6" />
      <path d="M22 24v18M22 30l-8 6M22 30l8 6M22 42l-6 12M22 42l6 12" />
      <circle cx="45" cy="22" r="10" fill={GOLD} stroke="none" />
      <path d="M45 16v12M41 20h8M41 24h8" stroke="#1a1a24" />
    </>
  ),
  /* Not technical — a figure walking past the code brackets. */
  "not-technical": (
    <>
      <circle cx="20" cy="18" r="6" />
      <path d="M20 24v18M20 30l-8 5M20 30l8 5M20 42l-6 12M20 42l6 12" />
      <path d="M40 22l-6 8 6 8M52 22l6 8-6 8" />
      <path d="M48 18l-4 24" stroke={GOLD} />
    </>
  ),
  /* Will it work for my industry — one figure, three different shapes. */
  industry: (
    <>
      <circle cx="18" cy="20" r="6" />
      <path d="M18 26v16M18 32l-7 5M18 32l7 5M18 42l-5 11M18 42l5 11" />
      <rect x="36" y="14" width="12" height="12" rx="2" />
      <circle cx="53" cy="38" r="6" fill={GOLD} stroke="none" />
      <path d="M36 46l7-12 7 12z" />
    </>
  ),
  /* Do I build it or do you — a figure with a spanner. */
  diy: (
    <>
      <circle cx="22" cy="18" r="6" />
      <path d="M22 24v18M22 30l-8 5M22 30l10 -3M22 42l-6 12M22 42l6 12" />
      <path d="M34 25l14 14" stroke={GOLD} strokeWidth={3} />
      <path d="M46 21a7 7 0 1 0 6 6l-6-6z" />
    </>
  ),
  /* What do I bring — a figure with a laptop. */
  bring: (
    <>
      <circle cx="20" cy="18" r="6" />
      <path d="M20 24v18M20 30l-7 5M20 30l9 2M20 42l-6 12M20 42l6 12" />
      <path d="M36 26h22v16H36z" />
      <path d="M32 46h30l-4-4H36z" fill={GOLD} stroke="none" />
    </>
  ),
  /* What happens after — a figure walking forward. */
  after: (
    <>
      <circle cx="20" cy="18" r="6" />
      <path d="M20 24v16M20 29l-8 6M20 29l8 3M20 40l-7 13M20 40l8 12" />
      <path d="M38 34h16M48 28l6 6-6 6" stroke={GOLD} />
    </>
  ),
  /* How is this different from YouTube — a figure and a play button. */
  youtube: (
    <>
      <circle cx="20" cy="18" r="6" />
      <path d="M20 24v18M20 30l-8 5M20 30l8 5M20 42l-6 12M20 42l6 12" />
      <rect x="36" y="20" width="24" height="18" rx="4" />
      <path d="M45 26l7 3-7 3z" fill={GOLD} stroke="none" />
    </>
  ),
  /* Will there be a recording — a figure and a record dot. */
  recording: (
    <>
      <circle cx="20" cy="18" r="6" />
      <path d="M20 24v18M20 30l-8 5M20 30l8 5M20 42l-6 12M20 42l6 12" />
      <circle cx="47" cy="30" r="12" />
      <circle cx="47" cy="30" r="5" fill={GOLD} stroke="none" />
    </>
  ),
};

export function FaqMark({ name, className = "h-7 w-7" }: { name: FaqMarkName; className?: string }) {
  return (
    <svg
      viewBox="0 0 68 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {MARKS[name]}
    </svg>
  );
}
