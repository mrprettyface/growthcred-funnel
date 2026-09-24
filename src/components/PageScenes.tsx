import type { ReactElement } from "react";
import { Figure, GOLD, Scene } from "./sceneKit";

/**
 * One drawn scene per search page, keyed by route.
 *
 * Same grammar as the ladder, day and week scenes (see sceneKit.tsx): a person
 * and one prop, gold once, on the thing the page is actually about. Kept apart
 * from searchPages.ts so the page copy stays plain data the prerenderer can read
 * without pulling in JSX.
 */

const INK = "#1a1a24";

export const PAGE_SCENES: Record<string, ReactElement> = {
  /* AI training — you, a laptop, and the first task on the list already lit. */
  "/ai-training-south-africa": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l20 -6" />
      <rect x="92" y="42" width="70" height="46" rx="5" />
      <path d="M82 96h90" />
      <rect x="102" y="52" width="30" height="7" rx="2" fill={GOLD} stroke="none" />
      <path d="M102 68h46M102 77h34" />
    </>
  ),

  /* AI automation — the work moves along a belt without anyone carrying it. */
  "/ai-automation-south-africa": (
    <>
      <Figure x={38} y={62} arms="M0 12 l-11 8 M0 12 l11 8" />
      <rect x="80" y="74" width="20" height="16" rx="3" />
      <rect x="112" y="74" width="20" height="16" rx="3" fill={GOLD} stroke="none" />
      <rect x="144" y="74" width="20" height="16" rx="3" />
      <path d="M72 94h100" />
      <circle cx="82" cy="102" r="5" />
      <circle cx="162" cy="102" r="5" />
      <path d="M100 58h18M112 52l6 6-6 6" />
    </>
  ),

  /* About — the founder, and where the work is done from. */
  "/about": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l14 -14" />
      <circle cx="132" cy="50" r="20" />
      <path d="M118 65l14 30 14-30" />
      <circle cx="132" cy="50" r="7" fill={GOLD} stroke="none" />
      <path d="M108 102h48" />
    </>
  ),

  /* Resources — a signpost with several ways to go, one worth taking first. */
  "/resources": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l18 -8" />
      <path d="M116 26v88M100 114h32" />
      <path d="M116 34h34l8 8-8 8h-34z" fill={GOLD} stroke="none" />
      <path d="M116 58h-30l-8 8 8 8h30z" />
      <path d="M116 82h34l8 8-8 8h-34z" />
    </>
  ),

  /* Cost of training — the same unit on both pans, so the two can be compared. */
  "/guides/ai-training-cost-south-africa": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l16 -6" />
      <path d="M128 30v76M112 106h32M100 42h56" />
      <path d="M100 42v14M156 42v14" />
      <path d="M90 56h20a10 9 0 0 1-20 0zM146 56h20a10 9 0 0 1-20 0z" />
      <circle cx="156" cy="46" r="7" fill={GOLD} stroke="none" />
    </>
  ),

  /* Business brain — write the facts once, keep them on one page. */
  "/guides/business-brain": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l24 -2" />
      <rect x="92" y="28" width="62" height="80" rx="4" />
      <rect x="92" y="28" width="62" height="16" rx="4" fill={GOLD} stroke="none" />
      <path d="M102 58h42M102 70h34M102 82h42M102 94h26" />
    </>
  ),

  /* Proposals and follow-ups — a draft you read before it goes out. */
  "/guides/ai-proposals-and-follow-ups": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l18 -8" />
      <rect x="92" y="52" width="66" height="44" rx="5" />
      <path d="M92 58l33 22 33-22" />
      <circle cx="158" cy="52" r="11" fill={GOLD} stroke="none" />
      <path d="M153 52l4 4 6-8" stroke={INK} />
    </>
  ),

  /* Training or automation — one starting point, two roads out of it. */
  "/guides/ai-training-vs-automation": (
    <>
      <Figure x={34} y={62} arms="M0 10 l-13 12 M0 10 l13 12" />
      <path d="M62 92h22l20-24h30M84 92l20 24h30" />
      <circle cx="84" cy="92" r="5" fill={GOLD} stroke="none" />
      <circle cx="148" cy="68" r="10" />
      <path d="M144 68h8M148 64v8" />
      <rect x="138" y="106" width="20" height="20" rx="3" />
      <path d="M144 116h8" />
    </>
  ),

  /* Cost of automation — an itemised bill with the total marked. */
  "/guides/ai-automation-cost-south-africa": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l16 -6" />
      <path d="M94 28h60v78l-7-6-7 6-7-6-7 6-7-6-7 6-7-6-6 6z" />
      <path d="M104 44h30M104 56h38M104 68h24" />
      <rect x="104" y="80" width="40" height="8" rx="2" fill={GOLD} stroke="none" />
    </>
  ),

  /* The time calculator — a figure with a calculator and the answer lit. */
  "/tools/admin-time-calculator": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l22 6" />
      <rect x="98" y="28" width="52" height="80" rx="6" />
      <rect x="106" y="36" width="36" height="14" rx="3" fill={GOLD} stroke="none" />
      <path d="M112 66h.01M124 66h.01M136 66h.01M112 80h.01M124 80h.01M136 80h.01M112 94h.01M124 94h.01M136 94h.01" strokeWidth={3.5} />
    </>
  ),

  /* Free resources — a folder that is open and ready to use. */
  "/playbook": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l20 -4" />
      <path d="M88 44h22l8 10h40v50H88z" />
      <path d="M88 44h22l8 10h-30z" fill={GOLD} stroke="none" />
      <path d="M100 74h48M100 88h34" />
    </>
  ),
  /* Client stories — an open book, the ribbon marking the story worth reading. */
  "/stories": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l18 -4" />
      <path d="M100 56q18-8 35 0v44q-17-8-35 0zM135 56q17-8 35 0v44q-18-8-35 0z" />
      <path d="M150 53v22l5-5 5 5V52z" fill={GOLD} stroke="none" />
    </>
  ),

  /* MNE Waste — the truck, and the load it carries. */
  "/stories/mne-waste": (
    <>
      <Figure x={40} y={59} arms="M0 10 l-12 12 M0 10 l20 -4" />
      <rect x="88" y="60" width="58" height="40" rx="3" />
      <rect x="96" y="74" width="42" height="8" rx="2" fill={GOLD} stroke="none" />
      <path d="M146 72h18l10 14v14h-28zM150 76h12l6 8h-18z" />
      <circle cx="104" cy="108" r="8" />
      <circle cx="160" cy="108" r="8" />
      <path d="M82 116h100" />
    </>
  ),

  /* Demure International — the product, and the brand on it. */
  "/stories/demure-international": (
    <>
      <Figure x={50} y={62} arms="M0 10 l-13 12 M0 10 l22 -2" />
      <rect x="110" y="56" width="34" height="58" rx="6" />
      <path d="M120 56V46h14v10M127 46V36h14" />
      <rect x="116" y="74" width="22" height="18" rx="2" fill={GOLD} stroke="none" />
    </>
  ),

  /* The first Operator Intensive — a ticket, stamped sold. */
  "/stories/operators-intensive-wework-rosebank": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-14 -10 M0 10 l14 -10" />
      <path d="M96 46h74v14a8 8 0 0 0 0 16v16H96V76a8 8 0 0 0 0-16z" />
      <rect x="112" y="60" width="44" height="16" rx="2" transform="rotate(-10 134 68)" fill={GOLD} stroke="none" />
    </>
  ),

  /* The workshop — at the laptop, the work moving along. */
  "/workshop": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l30 20" />
      <rect x="96" y="52" width="58" height="38" rx="4" />
      <path d="M86 96h78" />
      <rect x="104" y="66" width="30" height="7" rx="2" fill={GOLD} stroke="none" />
    </>
  ),

  /* The free class — a screen, and the play button worth pressing. */
  "/webinar": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l13 12" />
      <rect x="92" y="36" width="80" height="52" rx="4" />
      <path d="M132 88v14M116 102h32" />
      <path d="M124 50l18 12-18 12z" fill={GOLD} stroke="none" />
    </>
  ),
  /* Proposal automation — the document, and the line that makes it binding. */
  "/ai-proposal-automation": (
    <>
      <Figure x={44} y={62} arms="M0 10 l-13 12 M0 10 l24 -4" />
      <path d="M104 30h46l14 14v68h-60z" />
      <path d="M150 30v14h14M114 56h36M114 68h40M114 80h28" />
      <path d="M114 98h32" stroke={GOLD} strokeWidth={3.5} />
    </>
  ),

  /* Follow-up automation — the message, already on its way. */
  "/ai-follow-up-automation": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l22 -2" />
      <rect x="96" y="50" width="60" height="42" rx="3" />
      <path d="M96 52l30 22 30-22" />
      <path d="M162 60h18M172 52l8 8-8 8" stroke={GOLD} strokeWidth={3} />
    </>
  ),

  /* Admin automation — the pile, with the top tray already handled. */
  "/ai-admin-automation": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l26 -2" />
      <path d="M98 100h64v14H98zM98 82h64v14H98z" />
      <path d="M98 64h64v14H98z" fill={GOLD} stroke="none" />
      <path d="M130 52v-16M122 44l8-8 8 8" />
    </>
  ),

  /* Waste management — the bin, and the lid that keeps it in order. */
  "/ai-for-waste-management": (
    <>
      <Figure x={44} y={62} arms="M0 10 l-13 12 M0 10 l30 -2" />
      <path d="M108 60h48l-6 56h-36z" />
      <path d="M122 72v32M134 72v32M146 72l-2 32" />
      <rect x="102" y="48" width="60" height="10" rx="3" fill={GOLD} stroke="none" />
    </>
  ),

  /* Beauty and cosmetics — the jar, and the brand on its lid. */
  "/ai-for-beauty-and-cosmetics": (
    <>
      <Figure x={46} y={62} arms="M0 10 l-13 12 M0 10 l24 -4" />
      <rect x="106" y="72" width="50" height="40" rx="8" />
      <rect x="104" y="58" width="54" height="14" rx="4" fill={GOLD} stroke="none" />
      <path d="M118 88h26" />
    </>
  ),

  /* Johannesburg — here. */
  "/ai-automation-johannesburg": (
    <>
      <Figure x={44} y={62} arms="M0 10 l-13 12 M0 10 l22 -14" />
      <path d="M132 112c-18-22-26-36-26-50a26 26 0 0 1 52 0c0 14-8 28-26 50z" />
      <circle cx="132" cy="62" r="10" fill={GOLD} stroke="none" />
      <path d="M100 116h64" />
    </>
  ),

  /* The markets — the same globe, the gold on where you are. */
  "/ai-automation-uk": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l24 -6" />
      <circle cx="136" cy="70" r="34" />
      <ellipse cx="136" cy="70" rx="14" ry="34" />
      <path d="M102 70h68M108 52h56M108 88h56" />
      <circle cx="128" cy="49" r="6" fill={GOLD} stroke="none" />
    </>
  ),
  "/ai-automation-united-states": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l24 -6" />
      <circle cx="136" cy="70" r="34" />
      <ellipse cx="136" cy="70" rx="14" ry="34" />
      <path d="M102 70h68M108 52h56M108 88h56" />
      <circle cx="112" cy="58" r="6" fill={GOLD} stroke="none" />
    </>
  ),
  "/ai-automation-australia": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l24 -6" />
      <circle cx="136" cy="70" r="34" />
      <ellipse cx="136" cy="70" rx="14" ry="34" />
      <path d="M102 70h68M108 52h56M108 88h56" />
      <circle cx="158" cy="90" r="6" fill={GOLD} stroke="none" />
    </>
  ),
  "/ai-automation-africa": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l24 -6" />
      <circle cx="136" cy="70" r="34" />
      <ellipse cx="136" cy="70" rx="14" ry="34" />
      <path d="M102 70h68M108 52h56M108 88h56" />
      <circle cx="138" cy="78" r="6" fill={GOLD} stroke="none" />
    </>
  ),

  /* How we work — the month, and the day the first result lands. */
  "/guides/how-we-work-first-30-days": (
    <>
      <Figure x={42} y={62} arms="M0 10 l-13 12 M0 10 l24 -8" />
      <rect x="98" y="38" width="72" height="68" rx="4" />
      <path d="M98 54h72M112 32v12M156 32v12M110 66h8M126 66h8M158 66h8M110 80h8M142 80h8M158 80h8M110 94h8M126 94h8" />
      <rect x="140" y="62" width="12" height="10" rx="2" fill={GOLD} stroke="none" />
    </>
  ),

  /* Hire or automate — a chair for a person, a gear for a system. */
  "/guides/admin-assistant-vs-ai-automation": (
    <>
      <Figure x={40} y={62} arms="M0 10 l-13 12 M0 10 l13 12" />
      <path d="M84 70h22v26M84 70v44M106 96v18M84 96h22" />
      <g stroke={GOLD}>
        <circle cx="150" cy="84" r="11" />
        <path d="M161 84h6M157.8 91.8l4.2 4.2M150 95v6M142.2 91.8l-4.2 4.2M139 84h-6M142.2 76.2l-4.2-4.2M150 73v-6M157.8 76.2l4.2-4.2" />
      </g>
    </>
  ),

  /* Data and security — the lock, and the key only you hold. */
  "/data-and-security": (
    <>
      <Figure x={44} y={62} arms="M0 10 l-13 12 M0 10 l24 -2" />
      <rect x="104" y="64" width="52" height="46" rx="6" />
      <path d="M114 64V50a16 16 0 0 1 32 0v14" />
      <path d="M130 80a5 5 0 1 1 0 10v8" stroke={GOLD} strokeWidth={3.5} />
    </>
  ),
};

export function PageScene({ path, className }: { path: string; className?: string }) {
  const scene = PAGE_SCENES[path];
  return scene ? <Scene className={className}>{scene}</Scene> : null;
}
