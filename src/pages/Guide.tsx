import { Link } from "react-router-dom";
import { Section, Eyebrow, H1 } from "../components/ui";
import { GUIDE } from "../lib/guide";
import { GuideCover } from "../components/GuideCover";

/**
 * /ai-implementation-guide — the guide itself, where the opt-in sends people
 * and where the emailed copy links. Not indexed and not in the nav: it is the
 * thing people swap their email for, so search should not hand it out.
 */
export default function GuidePage() {
  return (
    <article>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-[720px]">
          <GuideCover className="mb-8 w-36 md:w-44" />
          <Eyebrow>{GUIDE.eyebrow}</Eyebrow>
          <H1 className="mt-5 max-w-[18ch]">{GUIDE.heading}</H1>
          {GUIDE.intro.map((p) => (
            <p key={p} className="mt-6 text-lg leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <ol className="mx-auto max-w-[720px] divide-y divide-midnight/10 border-y border-midnight/10">
          {GUIDE.steps.map((step) => (
            <li key={step.n} className="py-10">
              <p className="font-mono text-sm text-gold">{step.n}</p>
              <h2 className="mt-2 text-2xl md:text-3xl">{step.t}</h2>
              {step.body.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              {step.list ? (
                <ul className="mt-5 space-y-3 rounded-2xl border border-midnight/10 bg-white p-5 md:p-6">
                  {step.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-relaxed text-midnight">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-2xl md:text-3xl">{GUIDE.avoid.heading}</h2>
          <ul className="mt-6 space-y-5">
            {GUIDE.avoid.items.map((item) => (
              <li key={item.t} className="leading-relaxed text-ink">
                <strong className="font-semibold text-midnight">{item.t}</strong> {item.b}
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl bg-midnight p-6 text-cream md:p-9">
            <h2 className="text-2xl text-cream md:text-3xl">{GUIDE.next.heading}</h2>
            <p className="mt-4 text-cream/80">{GUIDE.next.body}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {GUIDE.next.links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={
                    i === 0
                      ? "inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 font-semibold text-midnight no-underline hover:bg-gold-soft"
                      : "inline-flex min-h-11 items-center justify-center rounded-full border border-cream/20 px-6 font-semibold text-cream no-underline hover:border-gold"
                  }
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </article>
  );
}
