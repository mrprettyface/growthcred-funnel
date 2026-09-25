import { useMemo, useState } from "react";
import { cn } from "./ui";
import { track } from "../lib/analytics";
import { ROI, ROI_DEFAULTS, corporateRoi, type RoiInputs } from "../lib/corporate";

/**
 * The corporate ROI model. Server-rendered at its defaults, so the prerendered
 * page already shows a complete, checkable business case; the sliders only
 * refine it. Every input and output carries its raw value in a data attribute,
 * which scripts/verify-corporate.mjs reads to recompute the result on its own.
 */

/** Deterministic thousands separator, so the server and browser render the same string. */
const group = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const rand = (n: number) => "R" + group(n);
/** R3.2M for the headline figure: a board reads millions, not seven digits. */
function randShort(n: number) {
  if (n >= 1_000_000) return `R${(n / 1_000_000).toFixed(n >= 100_000_000 ? 0 : 1)}M`;
  return rand(n);
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
  id: keyof RoiInputs;
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
  const htmlId = `roi-${id}`;
  return (
    <div className="mt-8 first:mt-0" data-roi-input={id} data-value={value}>
      <div className="mb-3.5 flex items-baseline justify-between gap-4">
        <label htmlFor={htmlId} className="max-w-[26ch] text-sm font-semibold text-midnight">
          {label}
        </label>
        <output htmlFor={htmlId} className="shrink-0 font-mono text-lg text-gold">
          {display}
        </output>
      </div>
      <input
        id={htmlId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={`${htmlId}-help`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-paper [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-paper"
        style={{
          background: `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${pct}%, #ddd6c8 ${pct}%, #ddd6c8 100%)`,
        }}
      />
      <span id={`${htmlId}-help`} className="mt-3 block text-sm leading-relaxed text-muted">
        {help}
      </span>
    </div>
  );
}

export function CorporateRoi() {
  const [inputs, setInputs] = useState<RoiInputs>(ROI_DEFAULTS);
  const [touched, setTouched] = useState(false);
  const r = useMemo(() => corporateRoi(inputs), [inputs]);

  const set = (key: keyof RoiInputs) => (v: number) => {
    setInputs((prev) => ({ ...prev, [key]: v }));
    if (!touched) {
      setTouched(true);
      track("corporate_roi_used");
    }
  };

  const copy = ROI.inputs;

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_1.1fr]">
      {/* Controls */}
      <div className="rounded-3xl border border-midnight/10 bg-[#f1ede3] p-6 md:p-9">
        <Slider
          id="employees"
          label={copy.employees.label}
          help={copy.employees.help}
          value={inputs.employees}
          min={10}
          max={1000}
          step={10}
          display={group(inputs.employees)}
          onChange={set("employees")}
        />
        <Slider
          id="docHours"
          label={copy.docHours.label}
          help={copy.docHours.help}
          value={inputs.docHours}
          min={2}
          max={25}
          step={1}
          display={`${inputs.docHours} hrs`}
          onChange={set("docHours")}
        />
        <Slider
          id="monthlyCtc"
          label={copy.monthlyCtc.label}
          help={copy.monthlyCtc.help}
          value={inputs.monthlyCtc}
          min={15000}
          max={150000}
          step={2500}
          display={rand(inputs.monthlyCtc)}
          onChange={set("monthlyCtc")}
        />
        <fieldset className="mt-8" data-roi-input="speed" data-value={inputs.speed}>
          <legend className="mb-3.5 text-sm font-semibold text-midnight">{copy.speed.label}</legend>
          <div className="grid grid-cols-2 gap-2 rounded-full border border-midnight/10 bg-white p-1">
            {([2, 3] as const).map((speed) => {
              const on = inputs.speed === speed;
              return (
                <button
                  key={speed}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("speed")(speed)}
                  className={cn(
                    "min-h-11 rounded-full px-3 text-sm font-semibold transition-colors",
                    on ? "bg-midnight text-cream" : "text-midnight hover:text-gold",
                  )}
                >
                  {speed === 2 ? copy.speed.conservative : copy.speed.target}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Result */}
      <div
        className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-midnight p-6 text-cream shadow-[0_40px_90px_-40px_rgba(26,26,36,0.7)] md:p-9"
        aria-live="polite"
      >
        <div aria-hidden="true" className="cc-glow pointer-events-none absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem]" />
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-cream/55">{ROI.outputs.value}</p>
        <p
          className="cc-gold-text mt-3 font-display text-[length:clamp(3.25rem,9vw,5.5rem)] font-extrabold leading-none tracking-[-0.05em]"
          data-roi-output="annualValue"
          data-value={Math.round(r.annualValue)}
        >
          {randShort(r.annualValue)}
        </p>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-cream/10 sm:grid-cols-3">
          <div className="bg-midnight-soft p-5">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/55">{ROI.outputs.hours}</dt>
            <dd
              className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em] text-cream"
              data-roi-output="hoursBackPerYear"
              data-value={Math.round(r.hoursBackPerYear)}
            >
              {group(r.hoursBackPerYear)}
            </dd>
          </div>
          <div className="bg-midnight-soft p-5">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/55">{ROI.outputs.fte}</dt>
            <dd
              className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em] text-cream"
              data-roi-output="fte"
              data-value={r.fte.toFixed(1)}
            >
              {r.fte.toFixed(1)}
            </dd>
          </div>
          <div className="bg-midnight-soft p-5">
            <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/55">{ROI.outputs.perEmployee}</dt>
            <dd
              className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em] text-gold"
              data-roi-output="valuePerEmployee"
              data-value={Math.round(r.valuePerEmployee)}
            >
              {rand(r.valuePerEmployee)}
            </dd>
          </div>
        </dl>

        <p className="mt-7 leading-relaxed text-cream/80">{ROI.perEmployeeNote}</p>
        <p className="mt-4 border-l-2 border-gold pl-4 leading-relaxed text-cream/70">{ROI.capacityNote}</p>
        <p className="mt-auto pt-7 font-mono text-[12px] uppercase leading-relaxed tracking-[0.12em] text-cream/45" data-roi-disclaimer>
          {ROI.disclaimer}
        </p>
      </div>
    </div>
  );
}
