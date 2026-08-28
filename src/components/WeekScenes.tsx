import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * One drawing per line of "your week". Same hand as the ladder and the day:
 * grammar and shared parts live in sceneKit.tsx, this file is only the six.
 *
 * These are quieter than the other sets on purpose. The ladder and the day are
 * card decks where the picture carries the rung; here the sentence carries it,
 * and the drawing is a margin note beside it. They stay grey until the line has
 * been counted, then ink in with the tally, so the set fills as the hours go.
 *
 * The week grid belongs to the day's first scene ("find your 10 hours") and the
 * moon to its fifth, so neither is reused here — Saturday is a single torn-off
 * date page and the late night is a clock, or the page starts repeating itself.
 */

export const WEEK_SCENES: ReactElement[] = [
  /* 01 You write the proposals — the words on the page are the hours. */
  <>
    <Figure x={46} y={62} arms="M0 8 l20 4 M0 12 l-12 10" />
    <rect x="100" y="32" width="66" height="86" rx="4" />
    <path d="M112 52h42M112 66h42M112 80h26" stroke={GOLD} />
    <path d="M112 102h22" />
  </>,

  /* 02 You chase the follow-ups — you are running, it is ahead of you. */
  <>
    <Figure
      x={58}
      y={62}
      arms="M0 6 l17 -8 M0 14 l-16 5"
      legs="M0 40 l-15 13 M0 40 l13 17"
    />
    <path d="M24 54h16M20 68h11" />
    <rect x="110" y="52" width="58" height="40" rx="4" fill={GOLD} stroke="none" />
    <path d="M110 56l29 21 29-21" stroke="#1a1a24" />
  </>,

  /* 03 You fix the quote that was nearly right — struck through, done again. */
  <>
    <Figure x={44} y={62} arms="M0 8 l18 6 M0 12 l-11 9" />
    <rect x="100" y="32" width="66" height="86" rx="4" />
    <path d="M112 50h42M112 64h42M112 88h34" />
    <path d="M108 94l42-12" stroke={GOLD} strokeWidth={3} />
  </>,

  /* 04 You answer the WhatsApps — you answer one, the next is already in. */
  <>
    <Figure x={44} y={66} arms="M0 6 l15 -9 M0 12 l-11 9" />
    <path d="M102 30h62a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6h-40l-16 12V70h-6a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6z" />
    <path
      d="M116 86h54a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-30l-14 10v-10h-10a6 6 0 0 1-6-6V92a6 6 0 0 1 6-6z"
      fill={GOLD}
      stroke="none"
    />
  </>,

  /* 05 You do the invoices at 21:00 — the hands are the whole point. */
  <>
    <Figure x={44} y={62} arms="M0 8 l17 7 M0 12 l-11 9" />
    <circle cx="134" cy="74" r="32" />
    <path d="M134 42v-6M134 106v6M102 74h-6M166 74h6" />
    <path d="M134 74V52M134 74h-20" stroke={GOLD} strokeWidth={3} />
    <circle cx="134" cy="74" r="3" fill="currentColor" stroke="none" />
  </>,

  /* 06 Then Saturday goes — one day, torn off and spent. */
  <>
    <Figure x={44} y={62} arms="M0 8 l18 -2 M0 12 l-11 9" />
    <rect x="100" y="38" width="70" height="76" rx="6" />
    <path d="M118 38v-8M152 38v-8" />
    <rect x="100" y="38" width="70" height="20" rx="6" fill={GOLD} stroke="none" />
    <rect x="100" y="48" width="70" height="10" fill={GOLD} stroke="none" />
    <path d="M114 76h42M114 90h42M114 104h26" />
  </>,
];

export function WeekScene({ index, className }: { index: number; className?: string }) {
  return <Scene className={className}>{WEEK_SCENES[index]}</Scene>;
}
