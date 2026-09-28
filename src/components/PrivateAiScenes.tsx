import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * The drawings for /private-ai, in the same hand as the rest of the site
 * (sceneKit.tsx): a 200×150 box, 2px line, one person and one prop, and gold
 * used once, on the thing the scene is about.
 *
 * Each scene pops in as it scrolls into view (`.gc-pop` in index.css). That is
 * decoration only: the rule exists only under prefers-reduced-motion:
 * no-preference, and where scroll-driven animation isn't supported the scene
 * is simply there.
 */

const SCENES = {
  /* Ownership: your own AI, inside your own building, with you beside it. */
  hero: (
    <>
      <path d="M78 56 L128 24 L178 56" />
      <path d="M86 52 V124 H170 V52" />
      <rect x="110" y="70" width="36" height="46" rx="4" />
      <path d="M118 82h20M118 92h20" />
      <circle cx="128" cy="104" r="5" fill={GOLD} stroke="none" />
      <Figure x={44} y={84} arms="M0 10 l-11 12 M0 10 l24 -10" />
      <path d="M20 141h160" />
    </>
  ),

  /* The paste: a document leaving the laptop for a cloud far away. */
  paste: (
    <>
      <Figure x={38} y={78} arms="M0 10 l14 16 M0 10 l20 14" />
      <rect x="54" y="92" width="34" height="22" rx="3" />
      <path d="M50 116h44" />
      <path d="M150 38a14 14 0 0 1 26 4a11 11 0 0 1 -2 22h-30a12 12 0 0 1 6 -26z" />
      <path d="M92 86 C112 70 124 62 140 58" strokeDasharray="4 5" />
      <rect x="104" y="66" width="14" height="18" rx="2" fill={GOLD} stroke="none" transform="rotate(-18 111 75)" />
    </>
  ),

  /* The rent: one seat per person, and the bill climbing with the headcount. */
  meter: (
    <>
      <Figure x={30} y={80} arms="M0 10 l-8 12 M0 10 l8 12" />
      <Figure x={62} y={80} arms="M0 10 l-8 12 M0 10 l8 12" />
      <Figure x={94} y={80} arms="M0 10 l-8 12 M0 10 l8 12" />
      <path d="M124 126 V40 M124 126 H186" />
      <path d="M130 116 L148 100 L162 88 L180 58" stroke={GOLD} />
      <path d="M172 58h8v8" stroke={GOLD} />
    </>
  ),

  /* POPIA section 72: a document crossing the border to another country. */
  border: (
    <>
      <Figure x={34} y={78} arms="M0 10 l-10 12 M0 10 l22 -2" />
      <path d="M100 28 V132" strokeDasharray="5 6" />
      <circle cx="150" cy="80" r="26" />
      <path d="M124 80h52M150 54c-12 14 -12 38 0 52M150 54c12 14 12 38 0 52" />
      <rect x="74" y="62" width="16" height="20" rx="2" fill={GOLD} stroke="none" />
      <path d="M92 72h14" />
    </>
  ),

  /* Ban it: the phone under the desk. */
  ban: (
    <>
      <Figure x={70} y={64} arms="M0 10 l14 22 M0 10 l20 20" />
      <path d="M40 104h110M52 104v26M138 104v26" />
      <rect x="86" y="92" width="10" height="16" rx="2" fill={GOLD} stroke="none" />
      <path d="M150 40l20 20M170 40l-20 20" />
    </>
  ),

  /* Buy seats: a row of chairs, each with a price tag. */
  seats: (
    <>
      <path d="M40 70v40M40 90h26v20M66 90v-6" />
      <path d="M90 70v40M90 90h26v20M116 90v-6" />
      <path d="M140 70v40M140 90h26v20M166 90v-6" />
      <path d="M150 50l14 0 6 8 -6 8h-14z" fill={GOLD} stroke="none" />
      <path d="M30 124h150" />
    </>
  ),

  /* Build it yourself: a spanner, and a box that has started to smoke. */
  build: (
    <>
      <Figure x={48} y={70} arms="M0 10 l20 6 M0 10 l-10 14" />
      <path d="M68 76l18 -18m-4 -4l8 8" />
      <rect x="104" y="72" width="58" height="42" rx="4" />
      <path d="M114 86h38M114 98h24" />
      <path d="M140 64c-6 -8 6 -12 0 -22M152 64c-6 -8 6 -12 0 -22" stroke={GOLD} />
      <path d="M28 126h150" />
    </>
  ),

  /* Data stays: a padlock on the building. */
  stays: (
    <>
      <path d="M40 64 L100 30 L160 64" />
      <path d="M50 58 V124 H150 V58" />
      <rect x="84" y="82" width="32" height="26" rx="4" fill={GOLD} stroke="none" />
      <path d="M90 82v-8a10 10 0 0 1 20 0v8" />
    </>
  ),

  /* The cost stops climbing: the line goes flat. */
  flat: (
    <>
      <path d="M30 126 V30 M30 126 H180" />
      <path d="M38 116 L70 92 L96 76" />
      <path d="M96 76 H172" stroke={GOLD} />
      <circle cx="96" cy="76" r="4" fill={GOLD} stroke="none" />
    </>
  ),

  /* It knows your business: a person, their document, and a tick. */
  knows: (
    <>
      <Figure x={50} y={70} arms="M0 10 l-10 14 M0 10 l30 4" />
      <rect x="92" y="46" width="52" height="66" rx="4" />
      <path d="M102 62h32M102 74h32M102 86h20" />
      <path d="M128 100l8 8 16 -18" stroke={GOLD} strokeWidth={3} />
    </>
  ),

  /* Evidence: a rising bar chart, the market moving. */
  market: (
    <>
      <path d="M30 126 H180" />
      <rect x="44" y="96" width="22" height="30" rx="2" />
      <rect x="82" y="74" width="22" height="52" rx="2" />
      <rect x="120" y="50" width="22" height="76" rx="2" fill={GOLD} stroke="none" />
      <path d="M40 84 L92 60 L150 34" strokeDasharray="4 5" />
    </>
  ),

  /* Rent or buy: rent climbs, owning starts high and stays flat, and they cross. */
  breakeven: (
    <>
      <path d="M26 128 V26 M26 128 H184" />
      <path d="M32 120 L180 34" />
      <path d="M32 80 H180" strokeDasharray="6 5" />
      <circle cx="101" cy="80" r="7" fill={GOLD} stroke="none" />
      <path d="M101 88 V128" strokeDasharray="3 4" />
    </>
  ),

  /* Who: law. The scales. */
  law: (
    <>
      <path d="M100 30 V120 M72 120h56 M60 46 H140" />
      <path d="M60 46 L46 82 H74 Z" />
      <path d="M140 46 L126 82 H154 Z" fill={GOLD} stroke="none" />
      <circle cx="100" cy="30" r="4" />
    </>
  ),

  /* Who: finance. Coins, stacked. */
  finance: (
    <>
      <ellipse cx="80" cy="112" rx="26" ry="8" />
      <path d="M54 112v-12M106 112v-12" />
      <ellipse cx="80" cy="100" rx="26" ry="8" />
      <path d="M54 100v-12M106 100v-12" />
      <ellipse cx="80" cy="88" rx="26" ry="8" />
      <ellipse cx="136" cy="84" rx="22" ry="7" fill={GOLD} stroke="none" />
      <path d="M40 124h130" />
    </>
  ),

  /* Who: healthcare. A patient file with a cross. */
  health: (
    <>
      <rect x="64" y="34" width="72" height="90" rx="5" />
      <path d="M100 56v26M87 69h26" stroke={GOLD} strokeWidth={4} />
      <path d="M78 98h44M78 110h30" />
    </>
  ),

  /* Who: owner-led firms. The briefcase. */
  owner: (
    <>
      <rect x="54" y="60" width="92" height="60" rx="6" />
      <path d="M84 60v-10h32v10M54 84h92" />
      <rect x="92" y="78" width="16" height="12" rx="2" fill={GOLD} stroke="none" />
    </>
  ),

  /* Wrong call: messy files, scattered. */
  messy: (
    <>
      <Figure x={40} y={68} arms="M0 10 l-10 -16 M0 10 l10 -16" />
      <rect x="86" y="80" width="30" height="38" rx="2" transform="rotate(-14 101 99)" />
      <rect x="118" y="70" width="30" height="38" rx="2" transform="rotate(12 133 89)" />
      <rect x="140" y="96" width="30" height="30" rx="2" fill={GOLD} stroke="none" transform="rotate(-6 155 111)" />
    </>
  ),

  /* Wrong call: the creative all-rounder. A lightbulb. */
  bulb: (
    <>
      <Figure x={46} y={72} arms="M0 10 l-10 14 M0 10 l18 -18" />
      <circle cx="130" cy="60" r="24" fill={GOLD} stroke="none" />
      <path d="M120 84v14h20v-14M122 106h16" />
      <path d="M130 22v-8M160 32l6 -6M100 32l-6 -6" />
    </>
  ),

  /* Wrong call: start smaller. A seedling. */
  seed: (
    <>
      <path d="M50 124h100" />
      <path d="M100 124 V80" />
      <path d="M100 96c-20 0 -28 -12 -28 -24c16 0 28 8 28 24z" />
      <path d="M100 86c18 0 26 -14 26 -26c-16 0 -26 10 -26 26z" fill={GOLD} stroke="none" />
    </>
  ),

  /* How: audit. A magnifying glass over a document. */
  audit: (
    <>
      <rect x="44" y="34" width="62" height="84" rx="4" />
      <path d="M56 52h38M56 64h38M56 76h26" />
      <circle cx="116" cy="86" r="22" stroke={GOLD} strokeWidth={3} />
      <path d="M132 102l22 22" strokeWidth={4} />
    </>
  ),

  /* How: deploy. The box goes into the building. */
  deploy: (
    <>
      <path d="M100 52 L140 30 L180 52" />
      <path d="M108 48 V120 H172 V48" />
      <rect x="30" y="80" width="34" height="30" rx="3" fill={GOLD} stroke="none" />
      <path d="M68 95 H100 M92 87l8 8 -8 8" />
    </>
  ),

  /* How: embed. It keeps running: a loop. */
  embed: (
    <>
      <path d="M140 56a44 44 0 1 0 8 30" />
      <path d="M150 44 v16 h-16" />
      <circle cx="100" cy="80" r="10" fill={GOLD} stroke="none" />
    </>
  ),

  /* The close: the key, handed over. */
  key: (
    <>
      <Figure x={50} y={72} arms="M0 10 l-10 14 M0 10 l34 -4" />
      <circle cx="112" cy="74" r="14" stroke={GOLD} strokeWidth={3} />
      <path d="M126 74 H176 M160 74v12M170 74v8" stroke={GOLD} strokeWidth={3} />
    </>
  ),
} satisfies Record<string, ReactElement>;

export type PrivateAiSceneName = keyof typeof SCENES;

export function PrivateAiScene({ name, className }: { name: PrivateAiSceneName; className?: string }) {
  return (
    <span data-scene={name} className="gc-pop inline-block">
      <Scene className={className}>{SCENES[name]}</Scene>
    </span>
  );
}
