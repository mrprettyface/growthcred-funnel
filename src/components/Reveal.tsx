import type { ReactNode } from "react";
import { cn } from "./ui";

/**
 * A section arriving, rather than simply being there.
 *
 * All of the behaviour is in one CSS rule (`.gc-reveal` in index.css), driven
 * by the browser's own view timeline. There is no observer and no scroll
 * handler here on purpose.
 *
 * The first version used an IntersectionObserver and started hidden. That makes
 * every failure mode — a JS error, a blocked bundle, an observer that does not
 * deliver — into a permanently invisible section, on the page that takes the
 * money. This version cannot do that: where the browser does not support
 * scroll-driven animation, or the visitor prefers reduced motion, the rule
 * never applies and the content is simply there.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("gc-reveal", className)}>{children}</div>;
}
