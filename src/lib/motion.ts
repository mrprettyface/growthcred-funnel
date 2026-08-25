import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Synchronous read, for setup code that runs before React paints. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Live-updating reduced-motion preference.
 *
 * The whole webinar experience is built on the rule that motion is decoration:
 * every scene must read and convert with this returning true. Components use it
 * to render the plain version, never to hide content.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * True on devices where a full-screen WebGL background is a bad trade: no
 * WebGL, a phone-sized screen, or a machine that says it is low on power.
 */
export function skipHeavyVisuals(): boolean {
  if (typeof window === "undefined") return true;
  if (prefersReducedMotion()) return true;
  if (window.innerWidth < 768) return true;
  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores <= 4) return true;
  return false;
}

/** Live media-query match. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    // Re-sync if the query prop itself changed since mount.
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Phone-sized. Matches Tailwind's `md` breakpoint, so a JS branch and a
 * `md:` class are always talking about the same screen.
 */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
