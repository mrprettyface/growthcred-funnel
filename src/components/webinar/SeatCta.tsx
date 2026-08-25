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

/**
 * A CTA strip between scenes. One line that follows from the point just made,
 * then the ask. Deliberately small: it should feel like a hand on the shoulder,
 * not another billboard.
 */
export function CtaBand({
  line,
  cta = "Save my seat",
  tone = "light",
  action,
  note,
}: {
  line: ReactNode;
  cta?: string;
  tone?: "light" | "dark";
  /**
   * The button. Defaults to the seat dialog, which is what the webinar wants.
   * The workshop passes a checkout link instead — same band, different ask.
   */
  action?: ReactNode;
  /** Overrides the date line under the headline. */
  note?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      data-tone={tone}
      /* No top padding: the band always carries the tone of the section above
         it, so the two read as one block and the ask lands with the point it
         belongs to instead of floating in its own field of whitespace. */
      className={cn("pb-8 pt-0 md:pb-16", dark ? "bg-midnight text-cream" : "bg-paper")}
    >
      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
        <div
          className={cn(
            // Phone: tighter card padding than desktop (the page gutter already
            // eats 20px a side) and a stretched, full-width button.
            "flex flex-col items-stretch gap-5 rounded-2xl border px-5 py-6",
            "md:flex-row md:items-center md:justify-between md:gap-6 md:px-9 md:py-7",
            dark ? "border-cream/15 bg-midnight-soft" : "border-midnight/10 bg-white",
          )}
        >
          <div>
            <p
              className={cn(
                "max-w-[46ch] font-display text-xl font-extrabold tracking-[-0.03em] md:text-2xl",
                dark ? "text-cream" : "text-midnight",
              )}
            >
              {line}
            </p>
            <p
              className={cn(
                "mt-2 font-mono text-[12px] uppercase tracking-[0.14em]",
                dark ? "text-cream/50" : "text-muted",
              )}
            >
              {note ?? `${WEBINAR.shortWhen} · 60 minutes · Free`}
            </p>
          </div>
          {action ?? <SeatButton className="shrink-0">{cta}</SeatButton>}
        </div>
      </div>
    </section>
  );
}
