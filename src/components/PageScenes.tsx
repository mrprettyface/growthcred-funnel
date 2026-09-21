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
};

export function PageScene({ path, className }: { path: string; className?: string }) {
  const scene = PAGE_SCENES[path];
  return scene ? <Scene className={className}>{scene}</Scene> : null;
}
