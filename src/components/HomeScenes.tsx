import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * The homepage's drawings. Same hand as the ladder, day, week and search-page
 * sets (grammar in sceneKit.tsx): a person and one prop, gold exactly once, on
 * the thing the block is actually about. Decorative — the copy carries the
 * meaning, so every scene is aria-hidden through <Scene>.
 */

/** The time drain: the hours running out while the founder watches. */
const DRAIN: ReactElement = (
  <>
    <Figure x={54} y={58} arms="M0 10 l-12 12 M0 10 l24 6" />
    <path d="M112 28h44M112 116h44" />
    <path d="M118 28c0 22 16 30 16 44s-16 22-16 44M150 28c0 22-16 30-16 44s16 22 16 44" />
    <path d="M134 74v34M123 114q11-15 22 0z" stroke={GOLD} fill={GOLD} />
  </>
);

/** Velocity: one day, against the clock. */
const VELOCITY: ReactElement = (
  <>
    <Figure x={62} y={58} arms="M0 10 l-12 8 M0 10 l12 -6" legs="M0 40 l-13 15 M0 40 l10 8 l6 10" />
    <path d="M22 70h14M18 82h12M26 94h10" />
    <circle cx="140" cy="74" r="26" />
    <path d="M134 42h12M140 42v6M140 52v4M162 74h-4" />
    <path d="M140 74l12-12" stroke={GOLD} strokeWidth={3.5} />
  </>
);

/** Integration: every department wired to one core. */
const INTEGRATION: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l22 -2" />
    <rect x="86" y="34" width="26" height="18" rx="3" />
    <rect x="86" y="64" width="26" height="18" rx="3" />
    <rect x="86" y="94" width="26" height="18" rx="3" />
    <path d="M112 43l30 24M112 73h28M112 103l30-24" />
    <circle cx="152" cy="73" r="11" fill={GOLD} stroke="none" />
  </>
);

/** Transformation: the whole operating model, built and flying its flag. */
const TRANSFORMATION: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l24 -16" />
    <rect x="100" y="38" width="62" height="78" rx="3" />
    <path d="M100 58h62M100 78h62M100 98h62M131 38v78" />
    <path d="M131 38V18" />
    <path d="M131 18h18l-5 5 5 5h-18z" fill={GOLD} stroke="none" />
  </>
);

/** Audit: a close look at where the hours actually go. */
const AUDIT: ReactElement = (
  <>
    <Figure x={60} y={58} arms="M0 10 l-12 12 M0 10 l30 24" />
    <circle cx="130" cy="56" r="26" />
    <path d="M112 74l-20 20" strokeWidth={3} />
    <path d="M130 56V40M130 56l11 7" stroke={GOLD} strokeWidth={3} />
  </>
);

/** Deploy: the founder's judgment, fitted into the machine. */
const DEPLOY: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l36 -6" />
    <g stroke={GOLD}>
      <circle cx="96" cy="62" r="9" />
      <path d="M105 62h5M102.4 68.4l3.5 3.5M96 71v5M89.6 68.4l-3.5 3.5M87 62h-5M89.6 55.6l-3.5-3.5M96 53v-5M102.4 55.6l3.5-3.5" />
    </g>
    <rect x="122" y="40" width="56" height="64" rx="5" />
    <path d="M136 58h28M122 90h56" />
  </>
);

/** Embed: performance tracked, and climbing. */
const EMBED: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l22 -10" />
    <path d="M86 30v84h90" />
    <path d="M92 104l22-14 18 4 20-24 20-22M162 44h10v10" stroke={GOLD} strokeWidth={3} />
  </>
);

/** The close: the business keeps its light on without you in the room. */
const OUT_OF_THE_ROOM: ReactElement = (
  <>
    <Figure x={58} y={58} arms="M0 10 l-10 14 M0 10 l10 12" legs="M0 40 l-10 17 M0 40 l9 15" />
    <path d="M114 28h42v88h-42z" fill={GOLD} stroke="none" opacity={0.3} />
    <rect x="112" y="26" width="46" height="90" rx="2" />
    <path d="M112 26L96 34v76l16 6" />
    <path d="M28 116h150" />
  </>
);

/** The bill: another seat, and the total climbs. */
const SEATS: ReactElement = (
  <>
    <Figure x={46} y={62} arms="M0 10 l-12 14 M0 10 l24 2" />
    <rect x="108" y="32" width="60" height="86" rx="3" />
    <path d="M120 48h36M120 60h28M120 72h32" />
    <path d="M120 88h36" />
    <path d="M138 114V96M130 104l8-12 8 12" stroke={GOLD} strokeWidth={3} />
  </>
);

/** The file: already out of their hands. */
const LEAVING: ReactElement = (
  <>
    <Figure x={42} y={64} arms="M0 10 l-12 14 M0 10 l20 -6" />
    <path d="M78 64h16M84 78h14M90 92h12" />
    <rect x="124" y="42" width="46" height="58" rx="3" stroke={GOLD} transform="rotate(-14 147 71)" />
    <path d="M136 58h24M136 70h24M136 82h16" transform="rotate(-14 147 71)" />
  </>
);

/** The rented tool: every task starts with a question. */
const STRANGER: ReactElement = (
  <>
    <Figure x={40} y={64} arms="M0 10 l-12 14 M0 10 l22 2" />
    <rect x="108" y="36" width="64" height="46" rx="3" />
    <path d="M100 82h80l-10 12H110z" />
    <path d="M128 48C128 38 148 38 148 50C148 58 138 58 138 68M138 74a2 2 0 1 0 0.1 0" stroke={GOLD} strokeWidth={3} />
  </>
);

/** Equipment: a box sized to the person beside it. */
const FITTED: ReactElement = (
  <>
    <Figure x={48} y={58} arms="M0 10 l-12 12 M0 10 l20 4" />
    <rect x="112" y="38" width="56" height="76" rx="4" stroke={GOLD} />
    <path d="M112 60h56" />
    <path d="M126 74h28M126 88h20" />
    <circle cx="154" cy="102" r="3" />
  </>
);

/** The document it already knows. */
const KNOWS: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-12 12 M0 10 l26 6" />
    <rect x="108" y="34" width="58" height="78" rx="3" />
    <path d="M120 50h34M120 62h34M120 74h22" />
    <path d="M124 96l10 12 22-24" stroke={GOLD} strokeWidth={3} />
  </>
);

/** An agent, built for the job. */
const AGENTS: ReactElement = (
  <>
    <Figure x={42} y={58} arms="M0 10 l-12 12 M0 10 l28 4" />
    <rect x="118" y="64" width="48" height="46" rx="8" fill={GOLD} stroke="none" />
    <path d="M142 64V46" />
    <circle cx="142" cy="40" r="5" />
    <path d="M130 84h8M150 84h8" />
  </>
);

/** The lesson: a tick on the board, and a hand up. */
const TRAINED: ReactElement = (
  <>
    <Figure x={40} y={66} arms="M0 10 l-12 14 M0 10 l16 -22" />
    <rect x="102" y="30" width="72" height="52" rx="3" />
    <path d="M114 46h26M114 58h18" />
    <path d="M140 46l8 10 14-16" stroke={GOLD} strokeWidth={3} />
    <path d="M118 82v28M158 82v28" />
  </>
);

export const HOME_SCENES = {
  drain: DRAIN,
  velocity: VELOCITY,
  integration: INTEGRATION,
  transformation: TRANSFORMATION,
  audit: AUDIT,
  deploy: DEPLOY,
  embed: EMBED,
  outOfTheRoom: OUT_OF_THE_ROOM,
  seats: SEATS,
  leaving: LEAVING,
  stranger: STRANGER,
  fitted: FITTED,
  knows: KNOWS,
  agents: AGENTS,
  trained: TRAINED,
} as const;

export type HomeSceneName = keyof typeof HOME_SCENES;

export function HomeScene({ name, className }: { name: HomeSceneName; className?: string }) {
  return <Scene className={className}>{HOME_SCENES[name]}</Scene>;
}

/** The tiers, the method, and the rent-or-own cards, in the order the page lists them. */
export const STAGE_SCENES: HomeSceneName[] = ["velocity", "integration", "transformation"];
export const METHOD_SCENES: HomeSceneName[] = ["audit", "deploy", "embed"];
export const RENTING_SCENES: HomeSceneName[] = ["seats", "leaving", "stranger"];
export const OWN_SCENES: HomeSceneName[] = ["fitted", "knows", "agents", "trained"];
