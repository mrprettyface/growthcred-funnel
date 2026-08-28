import { type ReactNode } from "react";
import { cn } from "../ui";

/**
 * A CTA strip between scenes. One line that follows from the point just made,
 * then the ask. Deliberately small: a hand on the shoulder, not a billboard.
 *
 * Lives apart from SeatCta on purpose. It used to be exported from there, which
 * meant importing a band also imported the seat dialog, the three-step form and
 * the spring library behind it — 44 kB gzipped of booking machinery pulled onto
 * the landing page, which never opens that dialog. The band is presentational
 * and takes whatever button it is given.
 */
export function CtaBand({
  line,
  tone = "light",
  action,
  note,
}: {
  line: ReactNode;
  tone?: "light" | "dark";
  /** The button. Required, so the band never reaches for one itself. */
  action: ReactNode;
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
            {note ? (
              <p
                className={cn(
                  "mt-2 font-mono text-[12px] uppercase tracking-[0.14em]",
                  dark ? "text-cream/50" : "text-muted",
                )}
              >
                {note}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      </div>
    </section>
  );
}
