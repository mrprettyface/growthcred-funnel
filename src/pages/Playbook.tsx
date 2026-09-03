import { useEffect } from "react";
import { Section, Eyebrow, CheckList } from "../components/ui";
import { MagnetSignup } from "../components/MagnetSignup";
import { MAGNETS } from "../lib/magnets";
import { WEBINAR } from "../lib/webinar";
import { track } from "../lib/analytics";

/**
 * THE PARALLEL FUNNEL. A lead magnet opt-in that ends at the live class.
 *
 * The promise here is deliberately the same promise the class makes. The ad,
 * this page and the pack all say "get your time back", because message match
 * is the largest single lever on opt-in rate and the cheapest one to hold.
 *
 * The pack is handed over on this page the moment the form is accepted. It is
 * never promised by email -- nothing in this codebase can send one.
 */
export default function Playbook() {
  const magnet = MAGNETS.playbook;

  useEffect(() => {
    track("magnet_view", { magnet: magnet.slug });
  }, [magnet.slug]);

  return (
    <>
      <Section dark className="py-14 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
          <div>
            <Eyebrow dark>Free pack &middot; {magnet.shape}</Eyebrow>

            <h1 className="mt-6 max-w-[18ch] font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.04em] text-cream md:text-6xl">
              Ten hours a week, and you cannot point at where they went.
            </h1>

            <p className="mt-7 max-w-[46ch] text-lg text-cream/85">{magnet.promise}</p>
            <p className="mt-3 max-w-[46ch] text-lg text-cream/85">
              Not theory, and not a list of apps.{" "}
              <span className="font-semibold text-cream">One job a day for ten days</span>, starting
              with the one that pays back fastest.
            </p>

            <div className="mt-9 max-w-[46ch]">
              <CheckList dark items={[...magnet.inside]} />
            </div>

            <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/45">
              Free &middot; No card &middot; Yours on the next screen
            </p>
          </div>

          {/* The form rides beside the promise on desktop and directly under it
              on a phone, so nobody has to scroll past the offer to act on it. */}
          <div className="lg:sticky lg:top-24">
            <MagnetSignup magnetKey="playbook" />
          </div>
        </div>
      </Section>

      <Section className="py-14 md:py-24">
        <div className="mx-auto max-w-[62ch] text-center">
          <Eyebrow>And then the room</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-midnight md:text-5xl">
            The playbook shows you the ten. The class builds one with you.
          </h2>
          <p className="mt-6 text-lg text-ink">
            Reading a system and having one are different things. On{" "}
            <span className="font-semibold">{WEBINAR.shortWhen}</span> I take a real job out of a
            real business and build the thing that does it, live, in the hour.
          </p>
          <p className="mt-4 text-lg text-ink">
            Everyone in the room also leaves with the{" "}
            <span className="font-semibold">{MAGNETS.aiPolicy.title}</span> &mdash;{" "}
            {MAGNETS.aiPolicy.promise.toLowerCase()}
          </p>
          <a
            href="/webinar"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-midnight px-7 font-body text-sm font-semibold text-cream no-underline transition hover:bg-midnight-soft"
          >
            See what the class covers <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </Section>
    </>
  );
}
