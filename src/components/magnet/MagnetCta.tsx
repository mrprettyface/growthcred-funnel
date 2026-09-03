import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Modal } from "../Modal";
import { MagnetStepper } from "./MagnetStepper";
import { cn } from "../ui";
import { MAGNETS } from "../../lib/magnets";

/**
 * The ask, in a dialog, available from anywhere on the page.
 *
 * Same reasoning as the seat CTA: a page that argues for something has to be
 * able to take the answer at the moment it lands, not send the reader to a form
 * at the far end of the document. Every button here opens the same four-step
 * form and returns the reader exactly where they were.
 *
 * No Lenis handling, unlike SeatCtaProvider: the magnet pages do not run smooth
 * scroll, and Modal already locks body overflow on its own.
 */

const MagnetModalContext = createContext<() => void>(() => {});

/** Opens the magnet dialog. Available to anything inside MagnetCtaProvider. */
export const useMagnetModal = () => useContext(MagnetModalContext);

export function MagnetCtaProvider({
  magnetKey,
  children,
}: {
  magnetKey: keyof typeof MAGNETS;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const magnet = MAGNETS[magnetKey];

  return (
    <MagnetModalContext.Provider value={openModal}>
      {children}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        // The page offers two covers, so the dialog has to say two as well.
        title="Send me both packs"
        subtitle={`${magnet.title} + ${MAGNETS.aiPolicy.title} · Free · Yours on the last screen`}
      >
        <MagnetStepper magnetKey={magnetKey} className="border-t-0 shadow-none" />
      </Modal>
    </MagnetModalContext.Provider>
  );
}

/**
 * The button. Use it anywhere on the page; it always opens the same dialog.
 *
 * Full width on a phone, natural width from md up, for the same reason the seat
 * button is: a narrow pill floating in a column is the weakest possible ask on
 * a small screen.
 */
export function MagnetButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const open = useMagnetModal();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight transition",
        "hover:-translate-y-0.5 hover:bg-gold-soft",
        "active:translate-y-0 active:bg-gold-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40",
        "md:w-auto",
        className,
      )}
    >
      {children ?? "Send me both packs"} <span aria-hidden="true">&#8599;</span>
    </button>
  );
}
