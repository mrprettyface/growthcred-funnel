import { useEffect, useRef, type ReactNode } from "react";

/**
 * Checkout modal: the payment form floats over the offer instead of replacing
 * it, so the video, bullets and price stay visible behind while they pay.
 *
 * Behaviour that matters:
 *  - the page behind is dimmed and blurred, and cannot scroll
 *  - Escape closes it, so does the backdrop and the X
 *  - the panel itself scrolls on short screens, so a tall card form still fits
 *  - focus moves into the dialog on open and returns to the trigger on close
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    panelRef.current?.focus();

    // Stop the page behind from scrolling while the dialog is up.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-midnight/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Checkout"}
        /* Stop clicks inside the panel from closing the dialog. */
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[560px] rounded-2xl bg-paper p-5 shadow-2xl outline-none md:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-midnight/5 text-lg text-midnight transition hover:bg-midnight/10"
        >
          &times;
        </button>

        <div className="mb-5 pr-10">
          <h2 className="text-2xl md:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-[15px] text-ink">{subtitle}</p> : null}
        </div>

        {children}
      </div>
    </div>
  );
}
