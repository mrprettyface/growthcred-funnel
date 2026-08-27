import type { ReactElement } from "react";

/**
 * One line-drawn scene per rung of the ladder.
 *
 * Hand-authored SVG rather than stock illustration: it keeps the set on one
 * grammar (200×150 box, 2px stroke, round caps, no fills), it inherits
 * currentColor so the linework picks up the ink colour of whatever card it sits
 * on, and the gold is the only filled colour — always on the thing the rung is
 * actually about. Each scene is a person and one prop; the moment you add a
 * second prop it stops reading at card size.
 *
 * All decorative: the rung name and its description carry the meaning.
 */

const GOLD = "#c8a04a";

/** A person, drawn the same way every time so the seven read as one set. */
function Figure({
  x,
  y,
  arms,
  legs = "M0 40 l-8 17 M0 40 l8 17",
}: {
  x: number;
  y: number;
  /** Arm path, relative to the figure's origin at the neck. */
  arms: string;
  legs?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-9" r="8.5" />
      <path d="M0 0 V40" />
      <path d={arms} />
      <path d={legs} />
    </g>
  );
}

export const LEVEL_SCENES: ReactElement[] = [
  /* 01 Understanding — looking at what the thing can actually do. */
  <>
    <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l16 -8" />
    <rect x="96" y="34" width="72" height="54" rx="7" />
    <circle cx="132" cy="55" r="11" fill={GOLD} stroke="none" />
    <path d="M127 70h10M128.5 75h7" />
    <path d="M132 36v-7M114 42l-4-5M150 42l4-5" />
  </>,

  /* 02 Assistance — you are still carrying it; the help carries one sheet. */
  <>
    <Figure x={38} y={62} arms="M0 6 l22 -4 M0 14 l22 6" />
    <rect x="62" y="40" width="44" height="12" rx="2" />
    <rect x="62" y="54" width="44" height="12" rx="2" />
    <rect x="62" y="68" width="44" height="12" rx="2" />
    <rect x="128" y="72" width="34" height="30" rx="6" />
    <path d="M145 72v-8M138 86h.01M152 86h.01" />
    <rect x="134" y="46" width="22" height="16" rx="2" fill={GOLD} stroke="none" />
    <path d="M145 62v10" />
  </>,

  /* 03 Asset creation — build it once, then it exists for good. */
  <>
    <Figure x={150} y={62} arms="M0 10 l-18 -4 M0 10 l10 12" />
    <rect x="36" y="66" width="38" height="34" rx="3" fill={GOLD} stroke="none" />
    <rect x="52" y="52" width="38" height="34" rx="3" />
    <rect x="68" y="38" width="38" height="34" rx="3" />
    <path d="M118 76h16M128 70l6 6-6 6" />
  </>,

  /* 04 Automation — it turns without you turning it. */
  <>
    <Figure x={44} y={62} arms="M0 12 l-11 8 M0 12 l11 8" />
    <circle cx="112" cy="60" r="20" />
    <path d="M112 33v7M112 80v7M85 60h7M132 60h7M94 42l5 5M130 78l-5-5M130 42l-5 5M94 78l5-5" />
    <circle cx="112" cy="60" r="6" fill={GOLD} stroke="none" />
    <circle cx="152" cy="92" r="13" />
    <path d="M152 74v6M152 104v6M134 92h6M164 92h6" />
  </>,

  /* 05 Agentic — you name the outcome, it goes and gets it. */
  <>
    <Figure x={40} y={62} arms="M0 8 l24 -6 M0 12 l-10 10" />
    <rect x="86" y="60" width="30" height="26" rx="6" />
    <path d="M101 60v-7M93 72h.01M109 72h.01M92 86l-4 12M110 86l4 12" />
    <path d="M74 66h-8M78 76h-10" />
    <circle cx="156" cy="62" r="18" />
    <circle cx="156" cy="62" r="10" />
    <circle cx="156" cy="62" r="3.5" fill={GOLD} stroke="none" />
  </>,

  /* 06 Autonomous — it runs inside your own walls while you are elsewhere. */
  <>
    <path d="M78 66 L118 36 L158 66" />
    <path d="M86 62v46h64V62" />
    <circle cx="118" cy="84" r="12" fill={GOLD} stroke="none" />
    <path d="M118 64v8M118 96v8M98 84h8M130 84h8" />
    <Figure x={40} y={66} arms="M0 10 l-13 3 M0 12 l14 -1" legs="M0 40 l-9 16 M0 40 l9 16" />
    <path d="M54 70h13v11a6.5 6.5 0 0 1-13 0z" />
    <path d="M67 73h4a3.5 3.5 0 0 1 0 7h-4" />
  </>,

  /* 07 Enterprise intelligence — your knowledge is what it is built on. */
  <>
    <Figure x={28} y={62} arms="M0 8 l18 -3 M0 12 l-11 9" />
    <path d="M48 56h24v34H48zM72 56h24v34H72zM72 56v34" />
    <path d="M54 66h12M54 74h12M78 66h12M78 74h12" />
    <path d="M104 73h16M114 67l6 6-6 6" />
    <rect x="128" y="44" width="42" height="17" rx="3" />
    <rect x="128" y="65" width="42" height="17" rx="3" />
    <rect x="128" y="86" width="42" height="17" rx="3" />
    <circle cx="138" cy="52.5" r="3" fill={GOLD} stroke="none" />
    <circle cx="138" cy="73.5" r="3" fill={GOLD} stroke="none" />
    <circle cx="138" cy="94.5" r="3" fill={GOLD} stroke="none" />
  </>,
];

export function LevelScene({ index, className }: { index: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {LEVEL_SCENES[index]}
    </svg>
  );
}
