import { useEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow, Faint, cn } from "./ui";
import { LevelScene } from "./LevelScenes";

/** The ladder, as a deck you move through rather than a table you read. */
const LEVELS: { no: string; name: string; desc: string; tag?: string }[] = [
  { no: "01", name: "Understanding", desc: "Know what AI can actually do" },
  { no: "02", name: "Assistance", desc: "Useful, but you still do the work", tag: "Where most start" },
  { no: "03", name: "Asset creation", desc: "Build once, use often" },
  { no: "04", name: "Automation", desc: "Connect the busy work so it runs itself" },
  { no: "05", name: "Agentic AI", desc: "Assign outcomes, not tasks" },
  { no: "06", name: "Autonomous AI", desc: "Systems in your own environment", tag: "Ownership" },
  { no: "07", name: "Enterprise intelligence", desc: "Trained on your knowledge", tag: "Ownership" },
];

/**
 * Seven cards on a snap track, each with its own drawn scene.
 *
 * The ladder used to be seven rows of text, which is a table — you scan it and
 * move on. As a deck it is something you work through one rung at a time, and
 * the drawing does the explaining before the sentence does.
 *
 * Native scroll-snap carries the movement, so it is GPU-smooth, works with a
 * thumb on a phone and a trackpad on a desktop, and reads no layout while the
 * gesture is happening. The arrows are for mouse users who will not think to
 * drag; they scroll the same track.
 */
export function SevenLevels({ note }: { note?: ReactNode } = {}) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setAtStart(track.scrollLeft < 8);
      setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nudge = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-level]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 grid items-end gap-6 md:grid-cols-2 md:gap-16">
        <div>
          <Eyebrow>What you will climb</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">
            The seven levels
            <br />
            <Faint>of AI.</Faint>
          </h2>
        </div>
        <div className="max-w-[44ch] text-ink">
          <p>
            Every business sits somewhere on this ladder. The work is knowing exactly where you
            stand, then climbing, one deliberate step at a time.
          </p>
          <p className="mt-3">
            Most owners are stuck between level two and three, renting tools and still doing all the
            work by hand. The value lives higher up.
          </p>
        </div>
      </div>

      {/* Arrows sit above the deck so they never cover a card. */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
          Seven rungs &middot; drag or step through
        </p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              disabled={dir === -1 ? atStart : atEnd}
              aria-label={dir === -1 ? "Previous level" : "Next level"}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                (dir === -1 ? atStart : atEnd)
                  ? "cursor-not-allowed border-midnight/10 text-midnight/25"
                  : "border-midnight/15 text-midnight hover:border-gold hover:text-gold",
              )}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir === -1 ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <ol
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LEVELS.map((l, i) => (
          <li
            key={l.no}
            data-level={i}
            className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
          >
            <div className="flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[13px] text-gold">{l.no}</span>
                {l.tag ? (
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.12em]",
                      l.tag === "Where most start"
                        ? "border-gold/40 bg-gold/15 text-[#9c7c2f]"
                        : "border-midnight/10 bg-midnight/5 text-midnight",
                    )}
                  >
                    {l.tag}
                  </span>
                ) : null}
              </div>

              <div className="my-6 grid place-items-center rounded-xl bg-midnight/[0.03] py-4">
                <LevelScene index={i} className="h-32 w-full text-midnight" />
              </div>

              <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-midnight md:text-2xl">
                {l.name}
              </h3>
              <p className="mt-2 text-ink">{l.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-7 max-w-[46ch] text-ink">
        The shift you are after runs right up this ladder: from AI curious, to AI owned. From
        operator, to owner.
      </p>

      {/* The specific claim lands last, after the general one has set it up. */}
      {note ? <div className="mt-8">{note}</div> : null}
    </div>
  );
}
