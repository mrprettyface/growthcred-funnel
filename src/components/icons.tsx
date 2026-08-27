import type { ReactElement, SVGProps } from "react";

/**
 * Line icons for list points.
 *
 * Hand-drawn as inline SVG rather than pulled from a library: the set is small,
 * it inherits currentColor so it picks up the gold on light and dark bands
 * alike, and it adds nothing to the bundle. One consistent grammar — 24px box,
 * 1.75 stroke, round caps, no fills — so seven different icons still read as
 * one family.
 *
 * Every icon is decorative. The text beside it carries the meaning, so they are
 * all aria-hidden at the call site.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export type IconName =
  | "brain"
  | "wired"
  | "handover"
  | "moon"
  | "rhythm"
  | "book"
  | "people"
  | "owner"
  | "bottleneck"
  | "generic-ai"
  | "no-code"
  | "calendar";

const PATHS: Record<IconName, ReactElement> = {
  /** One place that holds the business. */
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-5.7-1.3A2.8 2.8 0 0 0 4 7a2.9 2.9 0 0 0 .8 2A3 3 0 0 0 6 14.4V16a3 3 0 0 0 6 0Z" />
      <path d="M12 5.5a3 3 0 0 1 5.7-1.3A2.8 2.8 0 0 1 20 7a2.9 2.9 0 0 1-.8 2A3 3 0 0 1 18 14.4V16a3 3 0 0 1-6 0Z" />
      <path d="M12 5.5V20" />
    </>
  ),
  /** The worker plugged into it. */
  wired: (
    <>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="13" width="7" height="7" rx="1.5" />
      <path d="M6.5 11v3.5a2 2 0 0 0 2 2H14" />
    </>
  ),
  /** Work leaving your hands. */
  handover: (
    <>
      <path d="M12 3v9" />
      <path d="m8.5 8.5 3.5 3.5 3.5-3.5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </>
  ),
  /** Running while you sleep. */
  moon: <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />,
  /** The rhythm that keeps it running. */
  rhythm: (
    <>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9L21 9" />
      <path d="M21 4.5V9h-4.5" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L3 15" />
      <path d="M3 19.5V15h4.5" />
    </>
  ),
  /** Documented, not half-remembered. */
  book: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v14H6.5A1.5 1.5 0 0 0 5 18.5Z" />
      <path d="M5 18.5A1.5 1.5 0 0 0 6.5 20H19v-3" />
      <path d="M9 7.5h6" />
    </>
  ),
  /** The room, and the group after it. */
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M17.5 14.2A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  /** You own it and you still do the work in it. */
  owner: (
    <>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  /** Everything runs through you. */
  bottleneck: (
    <>
      <path d="M4 4h16l-6 7v7l-4 2v-9Z" />
    </>
  ),
  /** Tried the public tool, got something generic. */
  "generic-ai": (
    <>
      <rect x="3.5" y="5" width="17" height="12" rx="2.5" />
      <path d="M8 21l2.5-4M16 21l-2.5-4" />
      <path d="M9 10.5h.01M15 10.5h.01" />
    </>
  ),
  /** Not technical, and not planning to be. */
  "no-code": (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 6-3 12" />
    </>
  ),
  /** One full day. */
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5V6M16 3.5V6" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg {...base} className={className}>
      {PATHS[name]}
    </svg>
  );
}
