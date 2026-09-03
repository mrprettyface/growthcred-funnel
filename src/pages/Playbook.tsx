import { useEffect } from "react";
import { Section, Eyebrow, CheckList, ToComeBlock } from "../components/ui";
import { MagnetCtaProvider, MagnetButton } from "../components/magnet/MagnetCta";
import { MAGNETS, PACK_SHOT } from "../lib/magnets";
import { WEBINAR } from "../lib/webinar";
import { track } from "../lib/analytics";

/**
 * THE PARALLEL FUNNEL. Two packs traded for four details, ending at the seat.
 *
 * The promise is deliberately the promise the live class makes. The ad, this
 * page and the packs all say "get your time back", because message match is the
 * largest single lever on opt-in rate and the cheapest one to hold.
 *
 * Both packs are handed over on the last screen of the dialog. Neither is ever
 * promised by email -- nothing in this codebase can send one.
 */
export default function Playbook() {
  const playbook = MAGNETS.playbook;
  const policy = MAGNETS.aiPolicy;

  useEffect(() => {
    track("magnet_view", { magnet: playbook.slug });
  }, [playbook.slug]);

  return (
    <MagnetCtaProvider magnetKey="playbook">
      <Section dark className="py-14 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-16">
          <div>
            <Eyebrow dark>Two free packs &middot; Nothing to pay</Eyebrow>

            <h1 className="mt-6 max-w-[18ch] font-display text-4xl font-extrabold leading-[1.03] tracking-[-0.04em] text-cream md:text-6xl">
              Ten hours a week, and you cannot point at where they went.
            </h1>

            <p className="mt-7 max-w-[46ch] text-lg text-cream/85">
              One pack takes the work off your desk.{" "}
              <span className="font-semibold text-cream">
                The other keeps your client data out of ChatGPT.
              </span>
            </p>

            <div className="mt-9 max-w-[48ch]">
              <CheckList
                dark
                items={[
                  `${playbook.title} — ${playbook.subtitle}`,
                  `${policy.title} — ${policy.subtitle}`,
                  "Both written for a South African business, not a Silicon Valley one.",
                  "Yours on the last screen. No waiting on an email.",
                ]}
              />
            </div>

            <div className="mt-10">
              <MagnetButton>Send me both packs</MagnetButton>
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/45">
                Free &middot; No card &middot; Four quick questions
              </p>
            </div>
          </div>

          {/* The product shot. Two covers photographed together is the whole
              argument for "two packs" made in one glance, which is why it gets
              the space rather than a stack of feature bullets. */}
          <div className="lg:justify-self-end">
            {PACK_SHOT ? (
              <img
                src={PACK_SHOT}
                alt={`${playbook.title} and ${policy.title}, the two free packs.`}
                width={1123}
                height={1424}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-gold/20 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.85)]"
              />
            ) : (
              <ToComeBlock
                label="pack shot — both covers"
                note="Save the photograph to public/images/lead-magnets.jpg and set PACK_SHOT in src/lib/magnets.ts."
              />
            )}
          </div>
        </div>
      </Section>

      <Section className="py-14 md:py-24">
        <div className="mx-auto max-w-[62ch] text-center">
          <Eyebrow>And then the room</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-midnight md:text-5xl">
            The packs show you the ten. The class builds one with you.
          </h2>
          <p className="mt-6 text-lg text-ink">
            Reading a system and having one are different things. On{" "}
            <span className="font-semibold">{WEBINAR.shortWhen}</span> I take a real job out of a
            real business and build the thing that does it, live, in the hour.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <MagnetButton className="md:w-auto">Send me both packs</MagnetButton>
            <a
              href="/webinar"
              className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted underline decoration-gold underline-offset-4 md:text-[11px]"
            >
              Or see what the class covers
            </a>
          </div>
        </div>
      </Section>
    </MagnetCtaProvider>
  );
}
