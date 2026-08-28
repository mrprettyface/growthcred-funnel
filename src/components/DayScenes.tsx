import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * One scene per block of the workshop day, plus the guarantee.
 *
 * Same grammar as the ladder: a person and one prop, gold on the thing the
 * block is actually about. Read in order they are a story — find the hours,
 * build the brain, wire it up, watch it work, let it run overnight, keep the
 * rhythm — so each scene has to carry its own step of that without a caption.
 */

export const DAY_SCENES: ReactElement[] = [
  /* 01 Find your 10 hours — the week laid out, the repeat work marked. */
  <>
    <Figure x={34} y={62} arms="M0 8 l18 -6 M0 12 l-11 9" />
    <rect x="76" y="34" width="96" height="76" rx="5" />
    <path d="M76 52h96M100 34v76M124 34v76M148 34v76" />
    <rect x="80" y="58" width="16" height="14" rx="2" fill={GOLD} stroke="none" />
    <rect x="128" y="58" width="16" height="14" rx="2" fill={GOLD} stroke="none" />
    <rect x="104" y="80" width="16" height="14" rx="2" fill={GOLD} stroke="none" />
  </>,

  /* 02 Build your business a brain — everything you know, written down once. */
  <>
    <Figure x={36} y={62} arms="M0 8 l20 -4 M0 12 l-11 9" />
    <path d="M64 60h22v14H64z" />
    <path d="M92 66h14M100 60l6 6-6 6" />
    <path
      d="M136 44a15 15 0 0 0-27 7 13 13 0 0 0 3 18v11a10 10 0 0 0 20 0V44z"
      fill={GOLD}
      stroke="none"
    />
    <path d="M136 44a15 15 0 0 1 27 7 13 13 0 0 1-3 18v11a10 10 0 0 1-20 0V44" />
    <path d="M136 44v42" />
  </>,

  /* 03 Wire the brain to a worker — the cable is the whole point. */
  <>
    <path d="M50 44a14 14 0 0 0-25 6 12 12 0 0 0 2 16v10a9.5 9.5 0 0 0 19 0V44z" />
    <path d="M50 44a14 14 0 0 1 25 6 12 12 0 0 1-2 16v10a9.5 9.5 0 0 1-19 0V44" />
    <path d="M50 44v42M36 60h9M55 60h9M40 74h6M54 74h6" />
    <path d="M78 78c20 2 20 18 40 18" stroke={GOLD} />
    <circle cx="120" cy="96" r="4" fill={GOLD} stroke="none" />
    <rect x="128" y="58" width="44" height="38" rx="8" />
    <path d="M150 58v-9M139 74h.01M161 74h.01M137 96l-5 14M163 96l5 14" />
  </>,

  /* 04 Put it to work in front of you — the page fills while you watch. */
  <>
    <Figure x={36} y={62} arms="M0 10 l-12 8 M0 10 l14 6" />
    <rect x="76" y="30" width="52" height="44" rx="6" />
    <path d="M102 30v-8M91 46h.01M113 46h.01M86 74l-4 12M118 74l4 12" />
    <rect x="112" y="82" width="56" height="42" rx="3" fill={GOLD} stroke="none" />
    <path d="M120 92h34M120 100h34M120 108h22" stroke="#1a1a24" />
  </>,

  /* 05 Make it work while you sleep — you are horizontal, it is not. */
  <>
    <circle cx="46" cy="96" r="8.5" />
    <path d="M54 96h34M56 104h30" />
    <path d="M30 112h74" />
    <path d="M60 82c6-4 12-4 18 0" />
    <path d="M148 44a14 14 0 1 1-16-13 11 11 0 0 0 16 13z" fill={GOLD} stroke="none" />
    <circle cx="132" cy="92" r="16" />
    <path d="M132 68v8M132 108v8M108 92h8M148 92h8" />
    <circle cx="132" cy="92" r="5" />
  </>,

  /* 06 Lock in the rhythm — the same loop, every day, without you. */
  <>
    <Figure x={34} y={62} arms="M0 10 l-11 9 M0 10 l13 7" />
    <path d="M84 46h84M84 62h84M84 78h84" />
    <circle cx="74" cy="46" r="3.5" fill={GOLD} stroke="none" />
    <circle cx="74" cy="62" r="3.5" fill={GOLD} stroke="none" />
    <circle cx="74" cy="78" r="3.5" fill={GOLD} stroke="none" />
    <path d="M96 104a22 22 0 1 0 22-22" stroke={GOLD} />
    <path d="M118 82l-9-6M118 82l-9 7" stroke={GOLD} />
  </>,
];

/** The guarantee: the money comes back if the hours do not. */
export const GUARANTEE_SCENE: ReactElement = (
  <>
    <Figure x={40} y={60} arms="M0 8 l22 -3 M0 12 l-11 9" />
    <path d="M116 30l30 10v26c0 20-13 32-30 40-17-8-30-20-30-40V40z" />
    <path d="M103 66l9 10 19-21" stroke={GOLD} strokeWidth={3.5} />
    <path d="M66 56h14" />
  </>
);

export function DayScene({ index, className }: { index: number; className?: string }) {
  return <Scene className={className}>{DAY_SCENES[index]}</Scene>;
}

export function GuaranteeScene({ className }: { className?: string }) {
  return <Scene className={className}>{GUARANTEE_SCENE}</Scene>;
}
