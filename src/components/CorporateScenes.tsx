import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * The corporate training page's drawings. Same hand as every other set
 * (grammar in sceneKit.tsx): a person and one prop, gold exactly once, on the
 * thing the block is actually about. Decorative — the copy carries the meaning,
 * so every scene is aria-hidden through <Scene>.
 */

/* ---------- What they have already tried ---------- */

/** The licence rollout: the seat was bought, and it gathers dust. */
const LICENCE: ReactElement = (
  <>
    <Figure x={52} y={58} arms="M0 10 l-10 14 M0 10 l10 14" />
    <rect x="102" y="48" width="66" height="44" rx="5" />
    <circle cx="118" cy="66" r="7" />
    <path d="M132 62h26M132 72h18" />
    <rect x="148" y="78" width="12" height="8" rx="1.5" fill={GOLD} stroke="none" />
    <path d="M110 36h8M130 30h8M150 36h8" />
  </>
);

/** The lunch-and-learn: a bright idea on a screen, and nothing after it. */
const LUNCH: ReactElement = (
  <>
    <Figure x={48} y={58} arms="M0 10 l-12 12 M0 10 l34 -14" />
    <rect x="98" y="28" width="74" height="54" rx="4" />
    <path d="M135 82v24M120 106h30" />
    <g stroke={GOLD}>
      <circle cx="135" cy="50" r="10" />
      <path d="M131 63h8M132 68h6" />
    </g>
  </>
);

/** The e-learning module: the tick is gold, and it is the only thing that changed. */
const MODULE: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l40 20" />
    <rect x="102" y="52" width="62" height="42" rx="4" />
    <path d="M94 100h78" />
    <path d="M118 74l9 9 18-18" stroke={GOLD} strokeWidth={3.5} />
  </>
);

/** The innovation pilot: a flag planted in a sandbox, and fenced in there. */
const PILOT: ReactElement = (
  <>
    <Figure x={48} y={58} arms="M0 10 l-12 12 M0 10 l26 -4" />
    <path d="M98 88h72v26H98z" />
    <path d="M134 88V56" />
    <path d="M134 56h18l-5 6 5 6h-18z" fill={GOLD} stroke="none" />
  </>
);

/** The policy memo: the barrier is down, and the work goes round it. */
const POLICY: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-10 14 M0 10 l10 14" />
    <path d="M104 116V64M100 116h8" />
    <rect x="104" y="64" width="68" height="12" rx="3" />
    <path d="M118 64l-8 12M136 64l-8 12M154 64l-8 12M172 66l-6 10" stroke={GOLD} />
  </>
);

/* ---------- The transformation ---------- */

/** The target: one number the whole programme is aimed at. */
const TARGET: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-12 12 M0 10 l28 -4" />
    <circle cx="140" cy="66" r="32" />
    <circle cx="140" cy="66" r="19" />
    <circle cx="140" cy="66" r="6" fill={GOLD} stroke="none" />
    <path d="M100 104l34-32M100 104h10M100 104v-10" />
  </>
);

/* ---------- Delivery ---------- */

/** Baseline: the stopwatch starts before anyone is trained. */
const BASELINE: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l40 -2" />
    <circle cx="138" cy="74" r="28" />
    <path d="M132 40h12M138 40v6M160 52l5-5" />
    <path d="M138 74V54" stroke={GOLD} strokeWidth={3.5} />
  </>
);

/** Live workshops: someone at the flip chart, the day's one idea on it. */
const WORKSHOP: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l40 -18" />
    <rect x="102" y="28" width="66" height="50" rx="3" />
    <path d="M110 78l-8 36M160 78l8 36M135 78v36" />
    <path d="M112 42h34M112 52h44" />
    <rect x="112" y="60" width="26" height="8" rx="2" fill={GOLD} stroke="none" />
  </>
);

/** Follow-along packs: a stack of workbooks, the top one theirs to keep. */
const PACKS: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l44 12" />
    <rect x="102" y="98" width="66" height="14" rx="3" />
    <rect x="106" y="84" width="60" height="14" rx="3" />
    <rect x="100" y="70" width="62" height="14" rx="3" fill={GOLD} stroke="none" />
  </>
);

/** Measure and report: the before bar, and the gold after bar far shorter. */
const MEASURE: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-12 12 M0 10 l30 -8" />
    <path d="M96 114h80" />
    <rect x="106" y="38" width="22" height="76" rx="2" />
    <rect x="142" y="88" width="22" height="26" rx="2" fill={GOLD} stroke="none" />
  </>
);

/* ---------- The people who sign it off ---------- */

/** Finance: the return, stacked up where it can be counted. */
const FINANCE: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l40 8" />
    <rect x="108" y="100" width="54" height="12" rx="6" />
    <rect x="112" y="88" width="54" height="12" rx="6" />
    <rect x="106" y="76" width="54" height="12" rx="6" />
    <rect x="110" y="64" width="54" height="12" rx="6" fill={GOLD} stroke="none" />
  </>
);

/** People: the playbook, open, with the page marked for the next hire. */
const PEOPLE: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l44 4" />
    <path d="M104 58q16-9 32 0q16-9 32 0v44q-16-9-32 0q-16-9-32 0z" />
    <path d="M136 58v44" />
    <path d="M152 52v18l5-5 5 5V52z" fill={GOLD} stroke="none" />
  </>
);

/** Operations: the document that decisions wait for, moving faster. */
const OPERATIONS: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-12 12 M0 10 l40 -6" />
    <rect x="104" y="28" width="50" height="64" rx="3" />
    <path d="M114 44h30M114 56h30M114 68h20" />
    <path d="M118 104l12 8-12 8M136 104l12 8-12 8" stroke={GOLD} strokeWidth={3} />
  </>
);

/** Risk: the shield holds, and the tick on it is gold. */
const RISK: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l38 2" />
    <path d="M138 30l28 10v24c0 22-13 36-28 42c-15-6-28-20-28-42V40z" />
    <path d="M125 68l9 9 17-17" stroke={GOLD} strokeWidth={3.5} />
  </>
);

export const CORPORATE_SCENES = {
  licence: LICENCE,
  lunch: LUNCH,
  module: MODULE,
  pilot: PILOT,
  policy: POLICY,
  target: TARGET,
  baseline: BASELINE,
  workshop: WORKSHOP,
  packs: PACKS,
  measure: MEASURE,
  finance: FINANCE,
  people: PEOPLE,
  operations: OPERATIONS,
  risk: RISK,
} as const;

export type CorporateSceneName = keyof typeof CORPORATE_SCENES;

export function CorporateScene({ name, className }: { name: CorporateSceneName; className?: string }) {
  return (
    <span data-scene={name} className="contents">
      <Scene className={className}>{CORPORATE_SCENES[name]}</Scene>
    </span>
  );
}
