import { useEffect, useMemo, useRef, useState } from "react";
import { MATH, chatTrapCost } from "../../lib/jcciWebinar";

/**
 * "How much is the Chat Trap costing you?"
 *
 * Two inputs, three outputs, and the arithmetic is simple enough that anyone
 * can check it in their head: hours a week, times 52 weeks, times what an hour
 * is worth. That is the whole point. A calculator nobody can check is a claim
 * wearing a calculator costume, so the assumptions are printed on screen and
 * the page says plainly that this is maths, not a promise.
 *
 * Deliberately NOT the site's other calculator (src/components/CostCalculator):
 * that one models the R990 workshop on 48 working weeks and ends at /checkout.
 * This one answers a different question for a different page, and sending
 * someone from a free webinar to a paid checkout mid-argument would be a lie
 * about what they came for.
 *
 * The defaults are the ones Phila wrote into the brief, so the page loads
 * showing 520 hours and R260 000 a year before anyone touches a slider.
 */

const group = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function Slider({
  id,
  label,
  help,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  id: string;
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mt-8 first:mt-0">
      <div className="mb-3.5 flex items-baseline justify-between gap-3.5">
        <label htmlFor={id} className="max-w-[24ch] text-sm font-semibold text-midnight">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-lg text-gold">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={`${id}-help`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-paper [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-paper"
        style={{
          background: `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${pct}%, #ddd6c8 ${pct}%, #ddd6c8 100%)`,
        }}
      />
      <span id={`${id}-help`} className="mt-3 block text-xs leading-relaxed text-muted">
        {help}
      </span>
    </div>
  );
}

/**
 * A number that rolls to its new value instead of snapping.
 *
 * Interruptible on purpose: drag a slider and the target changes many times a
 * second, so every new target starts from wherever the number is NOW, not from
 * where it began. Restarting from the old value on each change would make the
 * figure judder backwards while you drag.
 *
 * Starts at the real value, so the prerendered page and the first client
 * render agree and nothing rolls on load. Under reduced motion it snaps, which
 * is what it did before this existed.
 */
function useRolledNumber(target: number, ms = 260): number {
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);
  const frame = useRef(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || shownRef.current === target) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    const from = shownRef.current;
    const start = performance.now();
    cancelAnimationFrame(frame.current);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 4); // a strong ease-out
      const value = from + (target - from) * eased;
      shownRef.current = value;
      setShown(value);
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [target, ms]);

  return shown;
}

export function ChatTrapMath() {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(500);
  const cost = useMemo(() => chatTrapCost(hours, rate), [hours, rate]);
  const randShown = useRolledNumber(cost.randYear);
  const hoursShown = useRolledNumber(cost.hoursYear);
  const weeksShown = useRolledNumber(cost.weeksLost);

  return (
    <div className="grid items-stretch gap-4 md:grid-cols-2">
      <div className="flex flex-col justify-center rounded-2xl border border-midnight/10 bg-[#f1ede3] p-6 md:p-8">
        <Slider
          id="jcci-hours"
          label="Hours a week you spend on repeat work"
          help="Replies, quotes, admin, research. The work you do again every week."
          value={hours}
          min={1}
          max={40}
          step={1}
          display={`${hours} ${hours === 1 ? "hr" : "hrs"}`}
          onChange={setHours}
        />
        <Slider
          id="jcci-rate"
          label="What an hour of your time is worth"
          help="A rough number is fine. What would you pay to buy an hour back?"
          value={rate}
          min={100}
          max={3000}
          step={50}
          display={`R${group(rate)}`}
          onChange={setRate}
        />
        <p className="mt-7 border-t border-midnight/10 pt-4 text-xs leading-relaxed text-muted">
          Worked on {MATH.weeksPerYear} weeks a year and a {MATH.hoursPerWeek} hour week. This is
          simple maths, not a promise. What you get back depends on what you do.
        </p>
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-midnight p-6 text-cream md:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 100% 0%, rgba(200,160,74,.16), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="mb-4 font-mono text-[12px] uppercase tracking-[0.18em] text-cream/60 md:text-[11px]">
            What the Chat Trap costs you, a year
          </div>
          <div className="mb-2 flex items-start gap-1 leading-none">
            <span className="mt-1.5 font-mono text-2xl text-gold">R</span>
            {/* The rolling digits are for the eye only. A screen reader would
                otherwise read every in-between figure; it hears the settled
                total below instead. */}
            <span aria-hidden="true" className="font-mono text-5xl tabular-nums text-gold md:text-6xl">
              {group(randShown)}
            </span>
            <span className="sr-only" aria-live="polite">
              R{group(cost.randYear)} a year
            </span>
          </div>
          <div className="mb-6 text-sm text-cream/60">
            the value of your own hours, not cash you would bank
          </div>

          <dl className="border-t border-cream/20">
            <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3">
              <dt className="text-sm text-cream/60">Hours a year</dt>
              <dd className="font-mono text-[15px] tabular-nums text-cream">
                {group(hoursShown)} hrs
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3">
              <dt className="text-sm text-cream/60">Working weeks lost</dt>
              <dd className="font-mono text-[15px] tabular-nums text-cream">
                {Math.round(weeksShown)} weeks
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-lg leading-snug text-cream">
            How much have you already paid, in hours, for work a system could do?
          </p>
        </div>
      </div>
    </div>
  );
}
