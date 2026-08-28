import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Modal } from "../Modal";
import { SeatStepper } from "./SeatStepper";
import { cn } from "../ui";
import { WEBINAR } from "../../lib/webinar";
import { scrollControl } from "./SmoothScroll";

/**
 * The ask, available everywhere.
 *
 * A long page needs the offer repeated after each point lands, but repeating a
 * link that yanks the reader to a form at the other end of the document is a
 * worse experience than not asking at all. So every CTA opens the same
 * three-step form in a dialog: they book from wherever they got convinced, and
 * land back exactly where they were.
 */

const SeatModalContext = createContext<() => void>(() => {});

/** Opens the seat dialog. Available to anything inside SeatCtaProvider. */
export const useSeatModal = () => useContext(SeatModalContext);

export function SeatCtaProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);

  // Modal locks body scroll; Lenis has to be stopped too or it keeps driving
  // the page behind the dialog.
  useEffect(() => {
    if (!open) return;
    scrollControl.pause();
    return () => scrollControl.resume();
  }, [open]);

  return (
    <SeatModalContext.Provider value={openModal}>
      {children}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Save my seat"
        subtitle={`${WEBINAR.dayLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.where} · Free`}
      >
        <SeatStepper className="border-t-0 shadow-none" showWhen={false} />
      </Modal>
    </SeatModalContext.Provider>
  );
}

/**
 * The gold button itself. Use anywhere; it always opens the dialog.
 *
 * Full-width on phone (a narrow pill floating in a column is the weakest
 * possible ask on a small screen), natural width from `md` up. Pass `w-auto` in
 * className if a spot ever genuinely needs it inline on mobile.
 */
export function SeatButton({
  children = "Save my seat",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const open = useSeatModal();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight transition",
        "hover:-translate-y-0.5 hover:bg-gold-soft",
        "active:translate-y-0 active:bg-gold-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight/30",
        "md:w-auto",
        className,
      )}
    >
      {children} <span aria-hidden="true">&#8599;</span>
    </button>
  );
}
