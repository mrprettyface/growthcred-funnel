/**
 * The workshop's hard details, and the proof.
 *
 * Both ship EMPTY on purpose, and both sections stay off the page until they
 * are filled in. A date nobody has set and a testimonial nobody gave are worse
 * than a missing section: the first breaks trust when it turns out to be wrong,
 * the second is words put in a real person's mouth.
 *
 * Fill these in and the sections appear. Nothing else needs changing.
 */

export type WorkshopEvent = {
  /** e.g. "Saturday 27 September 2026" */
  date: string;
  /** e.g. "09:00–16:00" */
  time: string;
  /** e.g. "WeWork Rosebank, Johannesburg", or "Online" */
  venue: string;
  /** True when the day runs online; the venue line is then shown, not mapped. */
  online: boolean;
  /** Start and end as ISO UTC, e.g. "2026-10-24T07:00:00Z" (09:00 SAST). They
   * drive the Event markup search engines read, so they must match date and time. */
  startUtc: string;
  endUtc: string;
  /** Total seats in the room. */
  seats: number;
  /** Seats already taken, so the page can say how many are left. */
  taken: number;
};

/** null until Phila sets the date. The date block does not render while null. */
export const WORKSHOP_EVENT: WorkshopEvent | null = null;

export type ProofEntry = {
  /** The measured outcome, e.g. "9 hrs a week". Keep it a real figure. */
  figure: string;
  /** One line in their own words, given with permission. */
  quote: string;
  name: string;
  company: string;
};

/**
 * Empty until Jeff, Julius and a third operator have each given a figure and a
 * line, with permission to publish. The proof section does not render while
 * this is empty, and no placeholder stands in for a person.
 */
export const PROOF: ProofEntry[] = [];

/** Seats left, or null when the event is not set. */
export function seatsLeft(): number | null {
  if (!WORKSHOP_EVENT) return null;
  return Math.max(0, WORKSHOP_EVENT.seats - WORKSHOP_EVENT.taken);
}
