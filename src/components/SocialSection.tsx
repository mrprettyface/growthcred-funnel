import { Section, Eyebrow, Faint } from "./ui";

/**
 * "Insights & Content" — the big YouTube and LinkedIn cards, carried over from
 * the previous single-page site. Copy and brand icon colours are kept as they
 * were (#FF0000 YouTube, #0A66C2 LinkedIn).
 */
const CHANNELS = [
  {
    href: "https://www.youtube.com/@PhilaNgwenyagrowth",
    name: "YouTube",
    blurb: "Deep dives, framework teardowns, and practical guides to building AI systems.",
    fill: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    href: "https://www.linkedin.com/in/phila-ngwenya-908b1a179/",
    name: "LinkedIn",
    blurb: "Daily insights on business strategy, systems, and the shift from operator to owner.",
    fill: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export function SocialSection() {
  return (
    <Section id="content" className="pt-0">
      <div className="mx-auto mb-10 max-w-[46ch] text-center">
        <Eyebrow>Insights &amp; Content</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-5xl">
          Keep learning
          <br />
          <Faint>with us.</Faint>
        </h2>
        <p className="mt-5 text-ink">
          I document exactly how we build systems for South African businesses. Follow along for
          ongoing strategy and practical AI teardowns.
        </p>
      </div>

      <div className="mx-auto grid max-w-[820px] gap-4 md:grid-cols-2">
        {CHANNELS.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener"
            className="flex flex-col items-center rounded-[20px] border border-midnight/10 bg-white p-8 text-center text-midnight no-underline transition hover:-translate-y-1 hover:shadow-[0_16px_30px_-16px_rgba(26,26,36,0.15)]"
          >
            <svg viewBox="0 0 24 24" className="mb-4 h-12 w-12" fill={c.fill} aria-hidden="true">
              <path d={c.path} />
            </svg>
            <h3 className="text-xl">{c.name}</h3>
            <p className="mt-2 text-sm text-ink">{c.blurb}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
