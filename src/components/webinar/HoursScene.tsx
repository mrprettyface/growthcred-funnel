import { useEffect, useRef, useState } from "react";
import { Eyebrow, cn } from "../ui";
import { WeekScene } from "../WeekScenes";
import { useReducedMotion } from "../../lib/motion";

/**
 * Scene: your week, one sentence at a time.
 *
 * Each line arrives on its own and adds to a running tally. By the time the
 * last one lands the visitor has watched ten hours a week disappear without me
 * claiming anything — they counted it themselves. The number is the same one
 * the calculator lower down starts from.
 *
 * The tally has to be visible WHILE the lines go past, or the whole effect is
 * lost. On desktop it sits in the margin, sticky. On a phone there is no margin
 * to sit in, so it becomes a frosted pill floating over the scene, appearing
 * when the scene starts and leaving with it. Same experience, different room.
 */

const LINES: { text: string; hours: number }[] = [
  { text: "You write the proposals.", hours: 2 },
  { text: "You chase the follow-ups.", hours: 2 },
  { text: "You fix the quote that was nearly right.", hours: 1 },
  { text: "You answer the WhatsApps.", hours: 1 },
  { text: "You do the invoices at 21:00.", hours: 2 },
  { text: "Then Saturday goes on the work you actually get paid for.", hours: 2 },
];

const TOTAL = LINES.reduce((n, l) => n + l.hours, 0);

export function HoursScene() {
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(reduced ? LINES.length : 0);
  const [sceneActive, setSceneActive] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const nodes = hostRef.current?.querySelectorAll<HTMLElement>("[data-line]");
    if (!nodes?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.line);
          // Only ever advance: scrolling back up should not un-count the cost.
          setSeen((current) => Math.max(current, index + 1));
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -25% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reduced]);

  // Drives the floating mobile tally: on screen only while this scene is.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { threshold: 0, rootMargin: "-15% 0px -25% 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [reduced]);

  const hours = LINES.slice(0, seen).reduce((n, l) => n + l.hours, 0);

  return (
    <div ref={hostRef} className="relative">
      <div className="mx-auto max-w-[860px]">
        <Eyebrow>Let&rsquo;s start with your week</Eyebrow>
      </div>

      {/* Floating tally, phones only. Frosted so the sentence behind it still
          reads, pinned under the site header. */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed right-4 top-[5.75rem] z-30 transition-[opacity,transform] duration-500 md:hidden",
          sceneActive && !reduced
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 rounded-full border border-midnight/10 bg-paper/75 py-2 pl-4 pr-3 shadow-[0_8px_30px_rgba(26,26,36,0.12)] backdrop-blur-md">
          <span className="font-mono text-[12px] uppercase leading-tight tracking-[0.16em] text-muted">
            Hours
            <br />
            gone
          </span>
          <span
            key={hours}
            className="gc-tick font-display text-3xl font-extrabold leading-none tracking-[-0.04em] text-gold"
          >
            {hours}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-[980px] gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          {LINES.map((line, i) => (
            <div
              key={i}
              data-line={i}
              className="flex min-h-[46vh] flex-col justify-center gap-6 md:min-h-0 md:flex-row md:items-center md:gap-10 md:py-[12vh]"
            >
              {/* Drawn in the same hand as the ladder and the day, but kept
                  secondary: the sentence is what does the work here. It greys
                  out until its hour has been counted, so the row of drawings
                  fills in alongside the tally. */}
              <WeekScene
                index={i}
                className={cn(
                  "h-[68px] w-[92px] shrink-0 transition-[color,opacity] duration-700 md:h-[104px] md:w-[140px]",
                  i < seen ? "text-midnight opacity-100" : "text-midnight/30 opacity-40",
                )}
              />
              <p
                className={cn(
                  // On a phone each line owns most of the screen, so it lands as
                  // a statement rather than as another paragraph going past.
                  "max-w-[20ch] text-[2.05rem] leading-[1.06] md:text-5xl",
                  "font-display font-extrabold tracking-[-0.04em] transition-[color,opacity] duration-700",
                  // Opacity and colour only. A blur filter here reads beautifully
                  // on a laptop and repaints the whole line on every frame on a
                  // phone, which is where the scroll jank was coming from.
                  i < seen ? "text-midnight opacity-100" : "text-midnight/30 opacity-100",
                )}
              >
                {line.text}
              </p>
            </div>
          ))}
        </div>

        {/* The margin tally. Desktop only — the phone gets the floating pill. */}
        <div className="hidden md:sticky md:top-28 md:block md:h-fit md:self-start">
          <div className="rounded-2xl border border-midnight/10 bg-white px-6 py-5 text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              Hours gone
            </p>
            <p
              key={hours}
              className="gc-tick mt-2 font-display text-5xl font-extrabold tracking-[-0.05em] text-gold"
            >
              {hours}
            </p>
            <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              per week
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[6vh] max-w-[860px] md:mt-[10vh]">
        <p className="max-w-[24ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-midnight md:text-5xl">
          That&rsquo;s {TOTAL} hours a week, and your business can only grow to the size of your
          week.
        </p>
        <p className="mt-8 max-w-[54ch] text-lg text-ink">
          Every month you stay the bottleneck, you turn down work you could have taken, and someone
          slower than you but better organised takes it instead.
        </p>
        <p className="mt-6 max-w-[54ch] border-l-2 border-gold pl-4 text-lg font-semibold text-midnight">
          A business that runs on one person doesn&rsquo;t stay the same size. It shrinks to fit that
          person&rsquo;s week.
        </p>
      </div>
    </div>
  );
}
