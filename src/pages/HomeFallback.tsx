import { ApplyButton, HomeFooter, HomeHeader } from "../components/home/HomeChrome";
import { HERO, CAPACITY, STAGES, GUARANTEE, CLOSE } from "../lib/home";

/**
 * Crash fallback for `/`. If Home ever throws, the visitor still lands on a
 * complete page that makes the same promise and reaches the same application.
 *
 * Every word comes from src/lib/home.ts, so it cannot drift from Home. It is
 * deliberately plain — no marquee, no chart, no animation — because a fallback
 * must not be able to fail the way its page did.
 */
const WRAP = "mx-auto w-[min(1120px,calc(100%-2.5rem))]";

export default function HomeFallback() {
  return (
    <>
      <HomeHeader />

      <section className="bg-paper py-16 text-midnight md:py-24">
        <div className={WRAP}>
          <h1 className="max-w-[12ch] text-5xl text-midnight md:text-7xl">
            {HERO.headlineLead} <span className="cc-marker">{HERO.headlineMark}</span>{" "}
            <span className="cc-marker">{HERO.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-ink">{HERO.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ApplyButton className="w-full sm:w-auto">{HERO.cta}</ApplyButton>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{HERO.scarcity}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className={`${WRAP} max-w-[760px]`}>
          <h2 className="text-3xl md:text-5xl">
            {CAPACITY.lead} <span className="text-gold">{CAPACITY.figure}</span> {CAPACITY.tail}
          </h2>
          <p className="mt-6 text-lg">
            {CAPACITY.closeA} <strong>{CAPACITY.closeB}</strong>
          </p>
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-24">
        <div className={`${WRAP} grid gap-5 md:grid-cols-3`}>
          {STAGES.items.map((stage) => (
            <div key={stage.name} className="rounded-3xl border border-midnight/10 bg-white p-7">
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{stage.band}</p>
              <h3 className="mt-6 text-3xl">
                {stage.family} {stage.name}
              </h3>
              <p className="mt-4 text-ink">{stage.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-midnight py-16 text-center text-cream md:py-24">
        <div className={WRAP}>
          <h2 className="text-4xl text-cream md:text-6xl">
            {GUARANTEE.lead} <span className="text-gold">{GUARANTEE.accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg text-cream/75">{GUARANTEE.body}</p>
          <h2 className="mx-auto mt-16 max-w-[18ch] text-3xl text-cream md:text-5xl">{CLOSE.heading}</h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-cream/70">{CLOSE.sub}</p>
          <div className="mt-8 flex justify-center">
            <ApplyButton className="w-full sm:w-auto">{CLOSE.cta}</ApplyButton>
          </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
