import { Eyebrow, Faint } from "./ui";

/** The ladder, folded into the VSL as the "what you'll climb" section. */
const LEVELS: { no: string; name: string; desc: string; tag?: string }[] = [
  { no: "01", name: "Understanding", desc: "Know what AI can actually do" },
  { no: "02", name: "Assistance", desc: "Useful, but you still do the work", tag: "Where most start" },
  { no: "03", name: "Asset creation", desc: "Build once, use often" },
  { no: "04", name: "Automation", desc: "Connect the busy work so it runs itself" },
  { no: "05", name: "Agentic AI", desc: "Assign outcomes, not tasks" },
  { no: "06", name: "Autonomous AI", desc: "Systems in your own environment", tag: "Ownership" },
  { no: "07", name: "Enterprise intelligence", desc: "Trained on your knowledge", tag: "Ownership" },
];

export function SevenLevels() {
  return (
    <div>
      <div className="mb-10 grid items-end gap-6 md:grid-cols-2 md:gap-16">
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

      <ol className="border-t border-midnight/10">
        {LEVELS.map((l) => (
          <li
            key={l.no}
            className="group grid grid-cols-[54px_1fr] items-center gap-4 border-b border-midnight/10 py-5 transition md:grid-cols-[74px_1fr_auto] md:py-6"
          >
            <span className="font-mono text-[13px] text-gold">{l.no}</span>
            <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-midnight md:text-3xl">
              {l.name}
              {l.tag ? (
                <span
                  className={
                    l.tag === "Where most start"
                      ? "ml-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-2.5 py-1 align-middle font-mono text-[12px] uppercase tracking-[0.14em] md:text-[9.5px] text-[#9c7c2f]"
                      : "ml-3 inline-block rounded-full border border-midnight/10 bg-midnight/5 px-2.5 py-1 align-middle font-mono text-[12px] uppercase tracking-[0.14em] md:text-[9.5px] text-midnight"
                  }
                >
                  {l.tag}
                </span>
              ) : null}
            </span>
            <span className="hidden text-right font-mono text-xs text-muted md:block">
              {l.desc}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-7 max-w-[46ch] text-ink">
        The shift you are after runs right up this ladder: from AI curious, to AI owned. From
        operator, to owner.
      </p>
    </div>
  );
}
