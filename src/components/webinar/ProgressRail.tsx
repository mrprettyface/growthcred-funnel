import { useEffect, useState } from "react";
import { cn } from "../ui";

/**
 * Where am I, and how much is left?
 *
 * A long scroll experience without orientation feels like being trapped. This
 * is the map: the current scene gold, every dot clickable so anyone who wants
 * to skip straight to the form can. Desktop only — on a phone the sticky CTA
 * does this job without stealing width.
 *
 * The rail is fixed over a page that alternates between paper and midnight
 * bands, so it reads the tone of whatever section it is currently sitting on
 * (every <Section> publishes `data-tone`) and inverts. Without this it simply
 * vanishes for the length of every dark section.
 */
export function ProgressRail({ scenes }: { scenes: { id: string; label: string }[] }) {
  const [active, setActive] = useState(scenes[0]?.id);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const sections = scenes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [scenes]);

  // Tone is tracked separately from the active scene, because the rail also
  // passes over dark bands that are not scenes at all (the pull quote, the
  // image breaks, the CTA strips).
  //
  // The root margin collapses the viewport to a single line at its middle —
  // exactly where the rail sits — so whatever band is intersecting that line is
  // what the rail is currently drawn on top of. Cheaper than measuring every
  // band on every scroll event, and it does not depend on a rAF tick.
  useEffect(() => {
    const bands = document.querySelectorAll<HTMLElement>("[data-tone]");
    if (!bands.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const under = entries.find((e) => e.isIntersecting);
        if (under) setOnDark((under.target as HTMLElement).dataset.tone === "dark");
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    bands.forEach((band) => io.observe(band));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {scenes.map((scene) => {
          const isActive = scene.id === active;
          return (
            <li key={scene.id}>
              <a
                href={`#${scene.id}`}
                className="group flex items-center gap-3 no-underline"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full transition-[transform,background-color] duration-300",
                    isActive
                      ? "scale-150 bg-gold"
                      : onDark
                        ? "bg-cream/30 group-hover:bg-cream/70"
                        : "bg-midnight/20 group-hover:bg-midnight/50",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[12px] uppercase tracking-[0.14em] transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    isActive
                      ? onDark
                        ? "text-cream"
                        : "text-midnight"
                      : onDark
                        ? "text-cream/70"
                        : "text-muted",
                  )}
                >
                  {scene.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
