import { Suspense, lazy, useEffect, useState } from "react";
import TextType from "../reactbits/TextType";
import SplitText from "../reactbits/SplitText";

import Magnet from "../reactbits/Magnet";
import { Eyebrow } from "../ui";
import { WEBINAR } from "../../lib/webinar";
import { useReducedMotion, skipHeavyVisuals } from "../../lib/motion";

/**
 * WebGL rays pull in `ogl`. Phones and reduced-motion visitors never render
 * them, so they should never pay to download them either — hence the lazy
 * import rather than a top-level one.
 */
const LightRays = lazy(() => import("../reactbits/LightRays"));

const QUESTION = "Can AI do your job for you — even if it's complicated?";

/**
 * The opening. The question types itself, once, and then the answer lands.
 *
 * The real <h1> is always in the DOM for search engines and screen readers; the
 * animated copy is aria-hidden decoration on top of it. Under reduced motion,
 * or on a phone or a low-core machine, the WebGL rays never load at all and the
 * headline is simply printed — the page opens the same way, just quietly.
 */
export function HeroScene() {
  const reduced = useReducedMotion();
  const [heavy, setHeavy] = useState(false);
  const [answered, setAnswered] = useState(reduced);
  const [bailout, setBailout] = useState(false);

  useEffect(() => setHeavy(!skipHeavyVisuals()), []);

  // Failsafe. The headline and the answer both start invisible and are revealed
  // by JS; if that never finishes — a background tab freezing rAF, a throttled
  // phone, GSAP failing after load — the most important words on the page would
  // sit there unread. Six seconds is far longer than the ~3s the sequence
  // takes, so this only ever fires when something has actually gone wrong.
  useEffect(() => {
    if (answered) return;
    const timer = setTimeout(() => setBailout(true), 6000);
    return () => clearTimeout(timer);
  }, [answered]);

  const plain = reduced || bailout;

  return (
    <header className="relative isolate overflow-hidden bg-midnight text-cream">
      {heavy && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <Suspense fallback={null}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#c8a04a"
            raysSpeed={0.7}
            lightSpread={1.1}
            rayLength={2.4}
            fadeDistance={1.6}
            saturation={0.9}
            followMouse
            mouseInfluence={0.08}
            noiseAmount={0.06}
            distortion={0.03}
          />
          </Suspense>
        </div>
      )}

      <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))] py-16 md:py-24">
        <Eyebrow dark>
          Free live class &middot; {WEBINAR.shortWhen}
        </Eyebrow>

        {/* The honest, always-present headline. */}
        <h1 className="sr-only">{QUESTION}</h1>

        <div aria-hidden="true" className="mt-6">
          {plain ? (
            <p className="max-w-[16ch] font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.04em] text-cream md:text-6xl lg:text-7xl">
              {QUESTION}
            </p>
          ) : (
            <TextType
              as="p"
              text={[QUESTION]}
              loop={false}
              typingSpeed={38}
              initialDelay={400}
              showCursor
              cursorCharacter="|"
              cursorClassName="text-gold"
              className="min-h-[3.2em] max-w-[16ch] font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.04em] text-cream md:text-6xl lg:text-7xl"
              onSentenceComplete={() => setAnswered(true)}
            />
          )}
        </div>

        <div className="mt-8 min-h-[4.5rem]">
          {(answered || bailout) &&
            (plain ? (
              <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-gold md:text-4xl">
                No. But it can do about 80% of it.
              </p>
            ) : (
              <SplitText
                tag="p"
                text="No. But it can do about 80% of it."
                className="font-display text-2xl font-extrabold tracking-[-0.03em] text-gold md:text-4xl"
                delay={30}
                duration={0.7}
                splitType="words"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0}
                rootMargin="0px"
                textAlign="left"
              />
            ))}
        </div>

        <p className="mt-6 max-w-[46ch] text-lg text-cream/85">
          If yours isn&rsquo;t doing that yet, it&rsquo;s not your prompts.
        </p>
        <p className="mt-3 max-w-[46ch] text-lg text-cream/85">
          It&rsquo;s that{" "}
          <span className="font-semibold text-cream">the AI doesn&rsquo;t know your business.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Magnet padding={80} magnetStrength={6} disabled={plain}>
            <a
              href="#register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft"
            >
              Save my seat <span aria-hidden="true">&#8599;</span>
            </a>
          </Magnet>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/50">
            60 minutes &middot; Free &middot; Nothing to install
          </p>
        </div>

        <p className="mt-14 font-mono text-[12px] uppercase tracking-[0.18em] text-cream/40">
          Scroll &darr;
        </p>
      </div>
    </header>
  );
}
