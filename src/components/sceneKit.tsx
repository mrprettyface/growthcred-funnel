import type { ReactElement, ReactNode } from "react";

/**
 * Shared parts for every drawn scene on the site.
 *
 * One grammar across the whole set: a 200×150 box, 2px stroke, round caps, no
 * fills, currentColor for the linework, and gold used exactly once per scene —
 * always on the thing the scene is actually about. A person and one prop. The
 * moment a scene gains a second prop it stops reading at card size.
 */

export const GOLD = "#c8a04a";

/** A person, drawn the same way every time so the set reads as one hand. */
export function Figure({
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

/** The frame every scene is drawn in. Decorative: the copy carries the meaning. */
export function Scene({
  children,
  className,
  viewBox = "0 0 200 150",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export type SceneList = ReactElement[];
