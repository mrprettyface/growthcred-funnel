/**
 * Who just registered, carried from the form to the thank-you page.
 *
 * The thank-you pages are real routes, so an email or a WhatsApp reminder can
 * link straight to them. That means they can be opened cold, by someone who
 * never filled the form in this tab. So this is a best-effort handover, never a
 * precondition: the form writes it, the thank-you page reads it, and a page that
 * finds nothing still renders everything that does not depend on knowing who you
 * are (the Brain Builder, the WhatsApp group, the VIP offer). Only the personal
 * referral link needs the email, and that block is the one thing that hides.
 *
 * sessionStorage rather than router state alone, so a refresh on the thank-you
 * page does not empty it. Nothing sensitive goes in: a first name and the email
 * the person just typed, in their own browser, for the length of one visit.
 */

const KEY = "gc_seat";

export type Seat = "free" | "vip";

export type SeatHandover = {
  name: string;
  email: string;
  seat: Seat;
};

function isHandover(v: unknown): v is SeatHandover {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    typeof o.email === "string" &&
    (o.seat === "free" || o.seat === "vip")
  );
}

export function saveSeat(seat: SeatHandover): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(seat));
  } catch {
    /* private browsing, or storage refused. Router state still carries it. */
  }
}

/** The stored registration, or null. Never throws, on any host or in SSR. */
export function loadSeat(): SeatHandover | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isHandover(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Router state, when the visitor arrived straight from the form. */
export function seatFromRouter(state: unknown): SeatHandover | null {
  return isHandover(state) ? state : null;
}
