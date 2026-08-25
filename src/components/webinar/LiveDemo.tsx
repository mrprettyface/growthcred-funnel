import { memo, useEffect, useMemo, useRef, useState } from "react";
import OptionWheel from "../reactbits/OptionWheel";
import { Eyebrow, cn } from "../ui";
import { useReducedMotion, useIsMobile } from "../../lib/motion";

/**
 * THE demo, and the reason this page exists.
 *
 * The visitor picks the job that eats their week, and the same question is then
 * answered twice, live: once by AI that has never met them, once by AI that has
 * been taught their business. The page makes the argument instead of asserting
 * it, and because they chose the job, it is about their week and not mine.
 *
 * On a wide screen both panes type from one shared character counter, so they
 * visibly race and the generic one is still spitting out [Insert pricing] while
 * the other has already named a number.
 *
 * A phone cannot hold two columns of monospace side by side. An earlier version
 * solved that by showing one answer at a time and swapping it, which moved the
 * contrast out of the visitor's eye and into their memory — the giveaway was a
 * caption telling them to "tap back to compare". A section that needs an
 * instruction label is not finished.
 *
 * So the phone now gets both answers on one swipeable track, still typing from
 * the one shared counter, with the next card peeking at the edge. The race is
 * preserved; you drag between the two lanes of it. The gesture is native
 * scroll-snap rather than hand-rolled pointer maths, which buys momentum,
 * rubber-banding and GPU-smooth movement for free, and reads no layout while
 * the finger is down.
 *
 * Layout stability: every Pane renders an invisible copy of its finished text
 * (the "sizer"), so the card is full height from the first character. Nothing
 * below the demo moves while it types — on phone or desktop. This was the
 * biggest single mobile defect: the card grew as it typed and shoved the tabs,
 * caption and punchline down the screen over and over.
 *
 * Under reduced motion everything is simply printed.
 */

type Kind = "plain" | "miss" | "hit";
type Token = { text: string; kind?: Kind };

type Job = {
  label: string;
  ask: string;
  generic: Token[];
  trained: Token[];
};

const JOBS: Job[] = [
  {
    label: "Proposals",
    ask: "Write the proposal for the Sandton client we met on Tuesday.",
    generic: [
      { text: "Dear " },
      { text: "[Client Name]", kind: "miss" },
      { text: ",\n\nThank you for the opportunity to submit this proposal. We are a " },
      { text: "[industry]", kind: "miss" },
      { text: " company committed to delivering excellence and value.\n\nInvestment: " },
      { text: "[Insert pricing]", kind: "miss" },
      { text: "\nTimeline: " },
      { text: "[Insert timeline]", kind: "miss" },
      { text: "\n\nWe look forward to partnering with you on this exciting journey." },
    ],
    trained: [
      { text: "Hi " },
      { text: "Thabo", kind: "hit" },
      { text: ",\n\nGood to meet on Tuesday. You said the " },
      { text: "two-week turnaround", kind: "hit" },
      { text: " is what keeps costing you, so I've built this around that.\n\nSame three phases we ran for " },
      { text: "the Midrand job", kind: "hit" },
      { text: ".\n\n" },
      { text: "R148,000", kind: "hit" },
      { text: ", our standard " },
      { text: "50/50 terms", kind: "hit" },
      { text: ". Valid 14 days, per our usual.\n\nShall I send the SLA through as well?" },
    ],
  },
  {
    label: "Quotes",
    ask: "Quote the Randburg job we walked on Thursday.",
    generic: [
      { text: "QUOTATION\n\nClient: " },
      { text: "[Client Name]", kind: "miss" },
      { text: "\nScope: " },
      { text: "[Describe work to be performed]", kind: "miss" },
      { text: "\n\nRate: " },
      { text: "[Your rate]", kind: "miss" },
      { text: "\nSubtotal: " },
      { text: "[Calculate]", kind: "miss" },
      { text: "\nVAT: " },
      { text: "[If applicable]", kind: "miss" },
      { text: "\n\nPlease do not hesitate to contact us with any questions." },
    ],
    trained: [
      { text: "Quote 2026-" },
      { text: "0412", kind: "hit" },
      { text: " — " },
      { text: "Randburg, 3 floors", kind: "hit" },
      { text: "\n\nPriced off the walkthrough, not the plans, because last time the plans were out by " },
      { text: "40 square metres", kind: "hit" },
      { text: ".\n\nLabour " },
      { text: "R62,400", kind: "hit" },
      { text: " · Materials " },
      { text: "R31,800", kind: "hit" },
      { text: " · " },
      { text: "10% contingency", kind: "hit" },
      { text: "\nTotal " },
      { text: "R103,620 incl. VAT", kind: "hit" },
      { text: "\n\nValid 14 days. Deposit " },
      { text: "50% on acceptance", kind: "hit" },
      { text: ", as always." },
    ],
  },
  {
    label: "Follow-ups",
    ask: "Follow up everyone who didn't come back to me this week.",
    generic: [
      { text: "Subject: Following Up\n\nHi " },
      { text: "[Name]", kind: "miss" },
      { text: ",\n\nI hope this email finds you well. I wanted to follow up on my previous message regarding " },
      { text: "[topic]", kind: "miss" },
      { text: ".\n\nPlease let me know if you have any questions.\n\nBest regards,\n" },
      { text: "[Your Name]", kind: "miss" },
    ],
    trained: [
      { text: "Three to send. Drafted in order of how warm they are.\n\n1. " },
      { text: "Thabo, Sandton", kind: "hit" },
      { text: " — asked about the " },
      { text: "two-week turnaround", kind: "hit" },
      { text: " on the 14th. Nudge with the Midrand timeline as proof.\n\n2. " },
      { text: "Lerato, Centurion", kind: "hit" },
      { text: " — quote sent " },
      { text: "9 days ago", kind: "hit" },
      { text: ", expires Friday. Say so plainly.\n\n3. " },
      { text: "Sipho", kind: "hit" },
      { text: " — went quiet after the " },
      { text: "site audit", kind: "hit" },
      { text: ". One line, no pressure.\n\nSend all three?" },
    ],
  },
  {
    label: "Invoices",
    ask: "Invoice everything we finished this month.",
    generic: [
      { text: "INVOICE\n\nBill to: " },
      { text: "[Client Name and Address]", kind: "miss" },
      { text: "\nInvoice number: " },
      { text: "[Number]", kind: "miss" },
      { text: "\nDescription: " },
      { text: "[Services rendered]", kind: "miss" },
      { text: "\nAmount due: " },
      { text: "[Total]", kind: "miss" },
      { text: "\nTerms: " },
      { text: "[Net 30?]", kind: "miss" },
    ],
    trained: [
      { text: "Four jobs signed off this month. Four invoices ready.\n\n" },
      { text: "Midrand phase 2", kind: "hit" },
      { text: " — " },
      { text: "R74,000", kind: "hit" },
      { text: " (second half of the 50/50)\n" },
      { text: "Randburg audit", kind: "hit" },
      { text: " — " },
      { text: "R18,500", kind: "hit" },
      { text: "\nTwo retainers — " },
      { text: "R24,000", kind: "hit" },
      { text: " combined\n\nAll on your " },
      { text: "14-day terms", kind: "hit" },
      { text: ", numbered on from " },
      { text: "INV-0231", kind: "hit" },
      { text: ".\n\n" },
      { text: "Lerato is 6 days overdue", kind: "hit" },
      { text: " on the last one. Add a reminder line?" },
    ],
  },
  {
    label: "Reports",
    ask: "Write up the Midrand install for the client.",
    generic: [
      { text: "PROJECT REPORT\n\nOverview:\n" },
      { text: "[Summarise the project]", kind: "miss" },
      { text: "\n\nKey achievements:\n• " },
      { text: "[Achievement 1]", kind: "miss" },
      { text: "\n• " },
      { text: "[Achievement 2]", kind: "miss" },
      { text: "\n\nIn conclusion, the project was completed successfully and we remain committed to excellence." },
    ],
    trained: [
      { text: "Midrand install — close-out\n\nDone in " },
      { text: "11 working days", kind: "hit" },
      { text: " against the " },
      { text: "14 we quoted", kind: "hit" },
      { text: ".\n\nOne delay worth naming: the " },
      { text: "switchgear arrived 3 days late", kind: "hit" },
      { text: ", which we absorbed rather than passed on.\n\nSnag list closed, " },
      { text: "2 items", kind: "hit" },
      { text: ", both signed off by " },
      { text: "Thabo on site", kind: "hit" },
      { text: ".\n\nWorth mentioning the " },
      { text: "phase 3 option", kind: "hit" },
      { text: " here, while the goodwill is fresh?" },
    ],
  },
];

const total = (tokens: Token[]) => tokens.reduce((n, t) => n + t.text.length, 0);

/** How long the finished generic answer sits on screen before the card turns over. */
const TURN_DELAY_MS = 1600;

/** Renders tokens up to `count` characters, keeping the highlight markup. */
function Typed({ tokens, count }: { tokens: Token[]; count: number }) {
  let left = count;
  return (
    <>
      {tokens.map((token, i) => {
        if (left <= 0) return null;
        const text = token.text.slice(0, left);
        left -= token.text.length;
        if (token.kind === "miss") {
          return (
            <span key={i} className="bg-midnight/10 px-1 text-muted">
              {text}
            </span>
          );
        }
        if (token.kind === "hit") {
          return (
            <span
              key={i}
              className="text-midnight [box-shadow:inset_0_-0.55em_0_rgba(200,160,74,0.32)]"
            >
              {text}
            </span>
          );
        }
        return <span key={i}>{text}</span>;
      })}
    </>
  );
}

const Pane = memo(function Pane({
  label,
  tokens,
  count,
  trained,
  done,
}: {
  label: string;
  tokens: Token[];
  count: number;
  trained: boolean;
  done: boolean;
}) {
  // The sizer trick: an invisible copy of the finished text sets the card's
  // final height on frame one, so typing never pushes the page around. The
  // typed layer is pinned on top of it with identical type metrics.
  const plain = useMemo(() => tokens.map((t) => t.text).join(""), [tokens]);

  return (
    <div
      className={
        trained
          ? "relative overflow-hidden rounded-2xl border border-midnight/10 bg-white p-5 md:p-6"
          : "rounded-2xl border border-midnight/10 bg-midnight/[0.03] p-5 md:p-6"
      }
    >
      {trained && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />}
      <p
        className={
          "border-b border-midnight/10 pb-3 font-mono text-[12px] uppercase tracking-[0.14em] " +
          (trained ? "text-gold" : "text-muted")
        }
      >
        {label}
      </p>
      <div className="relative mt-4">
        {/* Sizer: reserves the finished height. */}
        <p
          aria-hidden="true"
          className="invisible whitespace-pre-wrap font-mono text-[13px] leading-relaxed"
        >
          {plain}
        </p>
        {/* Typed layer, exactly overlaid. Hidden from assistive tech — the
            sr-only copy below carries the whole answer, so a screen reader
            reads it once instead of hearing a typewriter. */}
        <p
          aria-hidden="true"
          className={
            "absolute inset-0 whitespace-pre-wrap font-mono text-[13px] leading-relaxed " +
            (trained ? "text-ink" : "text-muted")
          }
        >
          <Typed tokens={tokens} count={count} />
          {!done && (
            <span
              className={
                "ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] animate-pulse " +
                (trained ? "bg-gold" : "bg-muted/50")
              }
            />
          )}
        </p>
        <p className="sr-only">{plain}</p>
      </div>
    </div>
  );
});

export function LiveDemo() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [jobIndex, setJobIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [side, setSide] = useState<"generic" | "trained">("generic");
  const hostRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef<HTMLDivElement>(null);
  /* Once they drive it themselves, stop driving it for them. */
  const tookOver = useRef(false);

  /** Slide the compare track to a lane. Snap points do the rest. */
  const goToLane = (index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const lane = track.children[index] as HTMLElement | undefined;
    if (!lane) return;
    track.scrollTo({ left: lane.offsetLeft - track.offsetLeft, behavior: smooth && !reduced ? "smooth" : "auto" });
  };

  const job = JOBS[jobIndex];
  const longest = useMemo(() => Math.max(total(job.generic), total(job.trained)), [job]);
  // One counter on every screen, so the two answers always race each other.
  const targetLength = longest;

  const chooseJob = (index: number) => {
    if (index === jobIndex) return;
    setJobIndex(index);
    // A new job replays the sequence from the top: the point is watching the
    // generic answer fail at THIS job before seeing the trained one.
    setSide("generic");
    // Reset synchronously, or the new job's tokens render against the old
    // character count for a frame and the card flashes a garbled answer.
    setCount(0);
    tookOver.current = false;
    goToLane(0, false);
  };

  const chooseSide = (next: "generic" | "trained") => {
    tookOver.current = true;
    goToLane(next === "trained" ? 1 : 0);
  };

  // Start typing when the demo is actually on screen, not on mount.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type it out. Reduced motion gets the finished text immediately.
  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setCount(targetLength);
      return;
    }
    setCount(0);
    let raf = 0;
    let last = performance.now();
    let lastPaint = 0;
    let typed = 0;
    const CHARS_PER_SECOND = 260;
    /**
     * Repaint at ~25fps rather than on every frame. Each setCount re-renders
     * both panes and every span inside them; at 60fps that is the single most
     * expensive thing on the page while it runs. Text appearing in 40ms steps
     * looks identical to text appearing in 16ms steps — it is a typewriter,
     * not a physics simulation — and it costs less than half as much.
     */
    const PAINT_INTERVAL_MS = 40;

    const tick = (now: number) => {
      typed += ((now - last) / 1000) * CHARS_PER_SECOND;
      last = now;
      const next = Math.min(targetLength, Math.floor(typed));
      const finished = next >= targetLength;

      if (finished || now - lastPaint >= PAINT_INTERVAL_MS) {
        lastPaint = now;
        setCount(next);
      }
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduced, targetLength, jobIndex]);

  const done = count >= targetLength;

  // The turn. When the generic answer has finished embarrassing itself, show
  // what the same question looks like answered properly. Only on the phone,
  // where the two are not already side by side, and only until they take over.
  useEffect(() => {
    if (!isMobile || reduced || tookOver.current) return;
    if (side !== "generic" || !done || !started) return;
    const timer = setTimeout(() => goToLane(1), TURN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isMobile, reduced, side, done, started]);

  /**
   * The job picker behaves like the desktop wheel: whatever sits under the
   * needle is the choice. Selection commits on settle rather than on every
   * scroll event, because committing mid-flick would restart the typing over
   * and over as options slid past.
   */
  useEffect(() => {
    const pick = pickRef.current;
    if (!pick) return;
    let settle: ReturnType<typeof setTimeout>;

    const commit = () => {
      const middle = pick.scrollLeft + pick.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      const chips = pick.querySelectorAll<HTMLElement>("[data-chip]");
      chips.forEach((chip) => {
        const centre = chip.offsetLeft + chip.offsetWidth / 2;
        const distance = Math.abs(centre - middle);
        if (distance < best) {
          best = distance;
          nearest = Number(chip.dataset.chip);
        }
      });
      chooseJob(nearest);
    };

    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(commit, 140);
    };

    pick.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      pick.removeEventListener("scroll", onScroll);
    };
  });

  /** Bring an option under the needle. */
  const centreChip = (index: number) => {
    const pick = pickRef.current;
    const chip = pick?.querySelector<HTMLElement>(`[data-chip="${index}"]`);
    if (!pick || !chip) return;
    pick.scrollTo({
      left: chip.offsetLeft + chip.offsetWidth / 2 - pick.clientWidth / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Which lane is in view. One scrollLeft read, coalesced into a frame, on a
  // nested scroller — never on the page scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const lane = Math.round(track.scrollLeft / Math.max(1, track.clientWidth * 0.9));
      setSide(lane >= 1 ? "trained" : "generic");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  /**
   * Depth for the lane you are not reading: set back, dimmed, softly out of
   * focus — the same cue the desktop option wheel uses to say "this one".
   *
   * Scale and opacity are transitioned because they are free. The blur is a
   * fixed radius that snaps, because easing a blur radius re-rasterises the
   * layer on every frame of the ease, which is precisely the thing that made
   * this page stutter in the first place.
   */
  const laneClass = (lane: "generic" | "trained") =>
    cn(
      "w-[88%] shrink-0 snap-center origin-center transition-[scale,opacity] duration-300 ease-out",
      side === lane ? "scale-100 opacity-100" : "scale-[0.94] opacity-70",
      side !== lane && !reduced && "gc-lane-dim",
    );

  // A tablist should answer to arrow keys, not just taps.
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    chooseSide(side === "generic" ? "trained" : "generic");
  };

  return (
    <div ref={hostRef}>
      <div className="mx-auto mb-10 max-w-[52ch] text-center">
        <Eyebrow>Here&rsquo;s the real reason</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-5xl">It doesn&rsquo;t know your business.</h2>
        <p className="mx-auto mt-5 max-w-[54ch] text-ink">
          Pick the job that eats most of your week. I&rsquo;ll ask the same AI twice.
        </p>
      </div>

      {/* The choice. This is what makes the demo theirs and not mine.
          Phones get tappable chips; the wheel needs a drag and a lot of
          vertical room, neither of which a phone has to spare. */}
      <div className="md:hidden">
        {/* The job wheel, laid on its side. Whatever sits under the needle is
            the choice, and the options either side fall out of focus — the same
            depth cue the desktop wheel uses to say "this one". Selecting by
            scroll-and-settle rather than by tap alone makes it feel like a
            physical picker instead of a row of buttons. */}
        <div className="relative">
          <div
            ref={pickRef}
            role="group"
            aria-label="Pick the job that eats most of your week"
            className="-mx-5 flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Spacers, so the first and last option can reach the needle. */}
            <div aria-hidden="true" className="w-[38%] shrink-0" />
            {JOBS.map((j, i) => {
              const active = i === jobIndex;
              return (
                <button
                  key={j.label}
                  type="button"
                  data-chip={i}
                  onClick={() => centreChip(i)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-12 shrink-0 snap-center whitespace-nowrap rounded-full px-4 font-display font-extrabold tracking-[-0.02em] transition-[scale,opacity,color] duration-300 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                    active
                      ? "scale-100 text-2xl text-midnight opacity-100"
                      : "scale-[0.92] text-xl text-muted opacity-60",
                    !active && !reduced && "gc-pick-dim",
                  )}
                >
                  {j.label}
                </button>
              );
            })}
            <div aria-hidden="true" className="w-[38%] shrink-0" />
          </div>

          {/* The needle: two ticks marking where the choice is made. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          >
            <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
            <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
          </div>
        </div>
        {/* The ask is the setup for everything below it, so on a phone it gets
            its own card instead of floating loose between chips and answer. */}
        <div className="mt-4 rounded-xl border border-midnight/10 bg-white px-4 py-3.5">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">You ask</p>
          <p className="mt-1.5 font-mono text-sm leading-relaxed text-midnight">
            &ldquo;{job.ask}&rdquo;
          </p>
        </div>
      </div>

      <div className="mx-auto mb-8 hidden max-w-[980px] items-center gap-6 rounded-2xl border border-midnight/10 bg-white px-6 py-5 md:grid md:grid-cols-[auto_1fr]">
        {/* fontSize and inset are rem/px in this component's own units — 1.6rem
            keeps five options legible in a 200px-tall well. */}
        <div className="h-[200px] w-full shrink-0 md:w-[240px]">
          <OptionWheel
            items={JOBS.map((j) => j.label)}
            defaultSelected={0}
            onChange={(index) => chooseJob(index)}
            textColor="#74737f"
            activeColor="#1a1a24"
            fontSize={1.6}
            spacing={1.7}
            inset={12}
            tilt={5}
            blur={1.2}
            side="left"
            loop
          />
        </div>
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">You ask</p>
          <p className="mt-2 font-mono text-sm text-midnight md:text-base">
            &ldquo;{job.ask}&rdquo;
          </p>
        </div>
      </div>

      {/* Phone: both answers on one swipeable track, still racing. The peeking
          edge of the second card is the affordance — no caption required. */}
      <div className="mt-5 md:hidden">
        <div
          role="tablist"
          aria-label="Which AI is answering"
          onKeyDown={onTablistKeyDown}
          className="flex gap-1 rounded-full border border-midnight/10 bg-midnight/[0.04] p-1"
        >
          {(
            [
              ["generic", "Doesn't know you"],
              ["trained", "Knows you"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={side === value}
              onClick={() => chooseSide(value)}
              className={cn(
                /* min-h-11 = 44px, the Apple and Android minimum tap target. */
                "min-h-11 flex-1 rounded-full px-3 font-mono text-[12px] uppercase tracking-[0.12em] transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                side === value
                  ? value === "trained"
                    ? "bg-gold text-midnight"
                    : "bg-white text-midnight shadow-sm"
                  : "text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Native scroll-snap: momentum, rubber-banding and GPU-smooth movement
            for free, and no layout read while the finger is down. */}
        <div
          ref={trackRef}
          className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={laneClass("generic")}>
            <Pane
              label="Public AI · doesn't know you"
              tokens={job.generic}
              count={count}
              trained={false}
              done={done}
            />
          </div>
          <div className={laneClass("trained")}>
            <Pane
              label="AI that knows your business"
              tokens={job.trained}
              count={count}
              trained
              done={done}
            />
          </div>
        </div>

        {/* Position, not instruction. */}
        <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
          {(["generic", "trained"] as const).map((lane) => (
            <span
              key={lane}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                side === lane ? "w-6 bg-gold" : "w-1.5 bg-midnight/20",
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop: the race, side by side. */}
      <div className="mx-auto hidden max-w-[980px] gap-4 md:grid md:grid-cols-2">
        <Pane
          label="Public AI · doesn't know you"
          tokens={job.generic}
          count={count}
          trained={false}
          done={done}
        />
        <Pane
          label="AI that knows your business"
          tokens={job.trained}
          count={count}
          trained
          done={done}
        />
      </div>

      <p className="mx-auto mt-8 max-w-[30ch] text-center font-display text-xl font-extrabold tracking-[-0.03em] text-midnight md:text-2xl">
        One of these you send. The other one you rewrite.
      </p>
    </div>
  );
}
