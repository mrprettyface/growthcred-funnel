import { useMemo, useState } from "react";
import { ButtonLink, Eyebrow } from "./ui";

/**
 * "The cost of busy work" calculator, ported from the landing page.
 * Assumptions are deliberately rough and stated on screen: honest by design.
 */
const WORKING_WEEKS = 48;
const HOURS_PER_DAY = 8;
const TARGET_BACK = 10; // hours a week the workshop aims to return

const group = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

function fractionLabel(days: number): string {
  const share = days / 250;
  if (share >= 0.66) return "two thirds of your year";
  if (share >= 0.45) return "half of your year";
  if (share >= 0.3) return "a third of your year";
  if (share >= 0.2) return "a quarter of your year";
  if (share >= 0.12) return "a month and a half";
  if (share >= 0.06) return "a full working month";
  return "a couple of working weeks";
}

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
        <label htmlFor={id} className="max-w-[22ch] text-sm font-semibold text-midnight">
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

export function CostCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(450);

  const stats = useMemo(() => {
    const hoursYear = hours * WORKING_WEEKS;
    const days = hoursYear / HOURS_PER_DAY;
    return {
      hoursYear,
      days,
      cost: hoursYear * rate,
      backCost: Math.min(hours, TARGET_BACK) * WORKING_WEEKS * rate,
      fraction: fractionLabel(days),
    };
  }, [hours, rate]);

  return (
    <div>
      <div className="mb-8 max-w-[640px]">
        <Eyebrow>The cost of busy work</Eyebrow>
        <h2 className="mt-3.5 text-3xl md:text-4xl">What is it actually costing you?</h2>
        <p className="mt-3.5 max-w-[54ch] text-muted">
          The bill for repetitive work never lands all at once. It comes in slices, an hour at a
          time, so you never see the full number. Move the sliders and see it.
        </p>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {/* Controls */}
        <div className="flex flex-col justify-center rounded-2xl border border-midnight/10 bg-[#f1ede3] p-6 md:p-8">
          <Slider
            id="gc-hours"
            label="Hours a week on repetitive, admin-type work"
            help="Follow-ups, quotes, scheduling, chasing, copy-paste admin."
            value={hours}
            min={1}
            max={40}
            step={1}
            display={`${hours} ${hours === 1 ? "hr" : "hrs"}`}
            onChange={setHours}
          />
          <Slider
            id="gc-rate"
            label="What an hour of your time is worth"
            help="A rough sense is fine. What you would pay to buy an hour back."
            value={rate}
            min={100}
            max={3000}
            step={50}
            display={`R${group(rate)}`}
            onChange={setRate}
          />
          <p className="mt-7 border-t border-midnight/10 pt-4 text-xs leading-relaxed text-muted">
            Worked on {WORKING_WEEKS} working weeks a year and an {HOURS_PER_DAY} hour day. Rough by
            design, honest on purpose.
          </p>
        </div>

        {/* Statement */}
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
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
              Statement, per year
            </div>
            <div className="mb-2 flex items-start gap-1 leading-none">
              <span className="mt-1.5 font-mono text-2xl text-gold">R</span>
              <span
                className="font-mono text-5xl tabular-nums text-gold md:text-6xl"
                aria-live="polite"
              >
                {group(stats.cost)}
              </span>
            </div>
            <div className="mb-6 text-sm text-cream/60">
              handed to work a system could carry for you
            </div>

            <dl className="border-t border-cream/20">
              {[
                ["Hours lost a year", `${group(stats.hoursYear)} hrs`],
                ["That is working days", `${Math.round(stats.days)} days`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3"
                >
                  <dt className="text-sm text-cream/60">{k}</dt>
                  <dd className="font-mono text-[15px] tabular-nums text-cream">{v}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-3">
                <dt className="text-sm text-cream/60">Roughly a whole</dt>
                <dd className="font-mono text-[13px] text-cream/60">{stats.fraction}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-xl border border-gold/40 bg-gold/15 p-4">
              <div className="mb-1 text-xs text-cream/60">
                If the workshop gives you {TARGET_BACK} hours a week back
              </div>
              <div className="text-base font-semibold text-cream">
                <span className="font-mono text-gold">R{group(stats.backCost)}</span> a year,
                returned to you
              </div>
            </div>

            <ButtonLink to="/checkout" className="mt-5 w-full">
              Get my time back <span aria-hidden="true">&#8599;</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
