import type { ReactElement } from "react";
import { Figure, GOLD } from "../sceneKit";
import type { ArtName } from "./ArticleFigures";

/**
 * The article and menu drawings, in the house hand (grammar in sceneKit.tsx):
 * a 200×150 box, a person and one prop, gold exactly once, on the thing the
 * section is about. 22 Nov 2026: these replace the generated seated figures,
 * which drew the same desk scene for every subject and chopped the caption
 * into a speech bubble. Each scene now matches its `ArtName`.
 */

/** Live session: a trainer at the board, the session on air. */
const LIVE: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l30 -14" />
    <rect x="96" y="30" width="80" height="56" rx="4" />
    <path d="M108 50h40M108 62h52M108 74h30" />
    <path d="M136 86l-10 26M136 86l10 26" />
    <circle cx="166" cy="40" r="5" fill={GOLD} stroke="none" />
  </>
);

/** Recorded video: a screen with the play button. */
const VIDEO: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l12 10" />
    <rect x="92" y="34" width="86" height="58" rx="5" />
    <path d="M135 92v14M118 108h34" />
    <path d="M127 52l20 11-20 11z" fill={GOLD} stroke={GOLD} />
  </>
);

/** Two options side by side, split down the middle. */
const SPLIT: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l40 -8" />
    <rect x="86" y="30" width="96" height="76" rx="5" />
    <path d="M98 48h24M98 60h26M98 72h18M146 48h24M146 60h26M146 72h18" />
    <path d="M134 22v92" stroke={GOLD} strokeWidth={3} />
  </>
);

/** Private files: the folder, locked. */
const LOCK: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l26 14" />
    <path d="M92 46h28l8 8h48v56H92z" />
    <g stroke={GOLD} strokeWidth={2.5}>
      <rect x="121" y="76" width="28" height="22" rx="3" />
      <path d="M127 76v-7a8 8 0 0 1 16 0v7" />
    </g>
  </>
);

/** Weighing it up: a balance, the beam in gold. */
const SCALE: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l24 -4" />
    <path d="M134 42v70M118 112h32" />
    <path d="M100 48h68" stroke={GOLD} strokeWidth={3} />
    <path d="M100 48l-12 26h24zM168 48l-12 26h24z" />
  </>
);

/** A comparison table, one column picked out. */
const TABLE: ReactElement = (
  <>
    <Figure x={40} y={58} arms="M0 10 l-12 12 M0 10 l40 -6" />
    <rect x="118" y="32" width="32" height="76" fill={GOLD} stroke="none" opacity={0.35} />
    <rect x="86" y="32" width="96" height="76" rx="4" />
    <path d="M86 52h96M86 72h96M86 92h96M118 32v76M150 32v76" />
  </>
);

/** A checklist on a clipboard, the first line ticked. */
const LIST: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l30 6" />
    <rect x="98" y="30" width="66" height="84" rx="5" />
    <path d="M118 26h26v10h-26z" />
    <path d="M126 56h26M126 74h26M126 92h26" />
    <path d="M108 74l4 4 6-8M108 92l4 4 6-8" />
    <path d="M108 56l4 4 6-8" stroke={GOLD} strokeWidth={3} />
  </>
);

/** A person checks the page before it goes. */
const CHECK: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l38 0" />
    <rect x="96" y="28" width="66" height="86" rx="4" />
    <path d="M108 46h40M108 58h44M108 70h30" />
    <path d="M116 92l10 10 22-24" stroke={GOLD} strokeWidth={3.5} />
  </>
);

/** A file about to go into a chat box: the warning is the point. */
const PASTE: ReactElement = (
  <>
    <Figure x={32} y={58} arms="M0 10 l-12 12 M0 10 l26 -8" />
    <rect x="58" y="34" width="24" height="30" rx="2" />
    <path d="M63 43h14M63 51h10" />
    <path d="M90 50h14M100 45l5 5-5 5" />
    <path d="M114 30h68v54h-40l-12 14v-14h-16z" />
    <g stroke={GOLD} strokeWidth={3}>
      <circle cx="148" cy="57" r="13" />
      <path d="M148 50v8M148 64v.5" />
    </g>
  </>
);

/** The page starts empty: one gold line to begin. */
const BLANK: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l14 12" />
    <rect x="100" y="28" width="66" height="86" rx="4" />
    <path d="M112 48h32" stroke={GOLD} strokeWidth={3} />
  </>
);

/** A team on one task: two people side by side at the same board. */
const GROUPS: ReactElement = (
  <>
    <Figure x={34} y={58} arms="M0 10 l-10 12 M0 10 l16 10" />
    <Figure x={74} y={58} arms="M0 10 l-14 10 M0 10 l32 -10" />
    <rect x="112" y="30" width="70" height="56" rx="4" stroke={GOLD} strokeWidth={2.5} />
    <path d="M124 48h34M124 60h44M124 72h24" />
    <path d="M147 86v26" />
  </>
);

/** A missing figure stays a question. */
const QUOTE: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l30 4" />
    <rect x="94" y="28" width="70" height="86" rx="4" />
    <path d="M106 46h34M106 58h44M106 70h22" />
    <path d="M122 84a8 8 0 1 1 10 8v5M132 104v.5" stroke={GOLD} strokeWidth={3} />
  </>
);

/** A new hire handed the page they need. */
const HIRE: ReactElement = (
  <>
    <Figure x={44} y={58} arms="M0 10 l-12 12 M0 10 l36 6" />
    <Figure x={146} y={62} arms="M0 10 l-34 4 M0 10 l12 12" />
    <rect x="84" y="58" width="24" height="30" rx="2" stroke={GOLD} strokeWidth={2.5} />
  </>
);

/** Set up for you: the kit, and the part that makes it run. */
const TOOLS: ReactElement = (
  <>
    <Figure x={46} y={58} arms="M0 10 l-12 12 M0 10 l30 16" />
    <rect x="98" y="80" width="78" height="34" rx="4" />
    <path d="M122 80v-8h30v8M98 94h78" />
    <g stroke={GOLD}>
      <circle cx="137" cy="46" r="9" />
      <path d="M146 46h5M143.4 52.4l3.5 3.5M137 55v5M130.6 52.4l-3.5 3.5M128 46h-5M130.6 39.6l-3.5-3.5M137 37v-5M143.4 39.6l3.5-3.5" />
    </g>
  </>
);

/** Time: the clock, its hands in gold. */
const CLOCK: ReactElement = (
  <>
    <Figure x={50} y={58} arms="M0 10 l-12 12 M0 10 l12 -6" />
    <circle cx="136" cy="70" r="32" />
    <path d="M136 42v4M164 70h-4M136 98v-4M108 70h4" />
    <path d="M136 70V52M136 70l12 8" stroke={GOLD} strokeWidth={3.5} />
  </>
);

export const ARTICLE_SCENES: Record<ArtName, ReactElement> = {
  live: LIVE,
  video: VIDEO,
  split: SPLIT,
  lock: LOCK,
  scale: SCALE,
  table: TABLE,
  list: LIST,
  check: CHECK,
  paste: PASTE,
  blank: BLANK,
  groups: GROUPS,
  quote: QUOTE,
  hire: HIRE,
  tools: TOOLS,
  clock: CLOCK,
};

/**
 * For drawings with no subject of their own (the guide menu, the offer
 * strips), pick the scene from the caption. First match wins, so the order
 * runs from the most specific subject to the most general.
 */
const RULES: [RegExp, ArtName][] = [
  [/video|recorded/i, "video"],
  [/\blive\b|session|class|workshop|train/i, "live"],
  [/lock|private|popia|safe|own it|data|confiden/i, "lock"],
  [/price|cost|rand|\bR\d|budget|\bpay|compare|\bvs\b|scale/i, "scale"],
  [/quote|question|\?/i, "quote"],
  [/hire|onboard|\bstaff/i, "hire"],
  [/tool|equipment|built|build|install|set up/i, "tools"],
  [/\bday\b|week|hour|time|clock|minute|fast|slow/i, "clock"],
  [/checklist|list|rules|steps/i, "list"],
  [/paste|chat|copy|retyp|brief/i, "paste"],
  [/table|side by side/i, "table"],
  [/group|team|together/i, "groups"],
  [/blank|empty|start/i, "blank"],
];

export function sceneForCaption(caption: string): ArtName {
  return RULES.find(([re]) => re.test(caption))?.[1] ?? "check";
}

/** A related subject for each scene, used when the same scene would repeat. */
const RELATED: Record<ArtName, ArtName> = {
  live: "groups",
  video: "clock",
  split: "table",
  lock: "paste",
  scale: "table",
  table: "scale",
  list: "check",
  check: "list",
  paste: "lock",
  blank: "list",
  groups: "live",
  quote: "check",
  hire: "groups",
  tools: "check",
  clock: "list",
};

/**
 * Never draw the same scene twice in a row. The guide copy often gives the
 * hero and the first section the same subject; the reader then sees one
 * picture twice. Keep the given scene unless it repeats the one above; then
 * try the caption's own subject, then a related one.
 */
export function sceneAfter(prev: ArtName | undefined, name: ArtName, caption: string): ArtName {
  if (name !== prev) return name;
  const fromCaption = sceneForCaption(caption);
  if (fromCaption !== prev) return fromCaption;
  return RELATED[name];
}

/** Scenes for a row of captioned cards: each from its caption, none repeated. */
export function scenesForCaptions(captions: string[]): ArtName[] {
  const used = new Set<ArtName>();
  let prev: ArtName | undefined;
  return captions.map((caption) => {
    let name = sceneAfter(prev, sceneForCaption(caption), caption);
    if (used.has(name)) name = RELATED[name];
    if (used.has(name)) name = (Object.keys(RELATED) as ArtName[]).find((n) => !used.has(n)) ?? name;
    used.add(name);
    prev = name;
    return name;
  });
}
