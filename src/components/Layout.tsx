import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { PillLink, cn } from "./ui";
import { AnalyticsChoice } from "./AnalyticsChoice";

/** Brand wordmark. Gold "Cred" + gold full stop, matching the current site. */
export function Brand({ dark = true }: { dark?: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        "font-display text-lg font-extrabold tracking-[-0.05em] no-underline",
        dark ? "text-cream" : "text-midnight",
      )}
    >
      Growth<span className="text-gold">Cred</span>
      <span className="text-gold">.</span>
    </Link>
  );
}

const NAV = [
  { to: "/ai-training-south-africa", label: "AI training" },
  { to: "/corporate-ai-training", label: "Corporate" },
  { to: "/workshop", label: "The workshop" },
  { to: "/ai-automation-south-africa", label: "Automation" },
  { to: "/stories", label: "Stories" },
  { to: "/resources", label: "Guides" },
];

/**
 * The site header. Every page shares the nav; the button is the page's one ask
 * — "Register" for the workshop funnel by default, "Apply" on the homepage.
 */
export function Header({
  cta = { to: "/checkout", label: "Register" },
  tone = "dark",
}: {
  cta?: { to: string; label: string };
  /** "light" over the homepage's white hero; dark everywhere else. */
  tone?: "dark" | "light";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const light = tone === "light";
  return (
    /* Solid, not backdrop-blur: a blurred sticky bar re-rasterises on every
       scroll frame, which the mobile rules in STATUS.md forbid. */
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        light ? "border-midnight/10 bg-paper/95 text-midnight" : "border-cream/10 bg-midnight/95 text-cream",
      )}
    >
      <div className="mx-auto flex h-16 w-[min(1120px,calc(100%-2.5rem))] items-center justify-between gap-5">
        <Brand dark={!light} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-colors",
                  isActive ? "text-gold" : light ? "text-midnight/70 hover:text-gold" : "text-cream/65 hover:text-gold",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "min-h-11 px-2 font-mono text-[12px] uppercase tracking-[0.16em] lg:hidden",
              light ? "text-midnight/80" : "text-cream/80",
            )}
          >
            Menu
          </button>
          <PillLink to={cta.to} size="sm" className="whitespace-nowrap">
            {cta.label}
          </PillLink>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={cn(
            "border-t px-5 pb-4 pt-2 lg:hidden",
            light ? "border-midnight/10 bg-paper" : "border-cream/10 bg-midnight",
          )}
        >
          {[...NAV, { to: "/webinar", label: "Free online class" }, { to: "/contact", label: "Contact" }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex min-h-12 items-center border-b font-mono text-[12px] uppercase tracking-[0.16em] no-underline last:border-b-0",
                light ? "border-midnight/10 text-midnight" : "border-cream/10 text-cream",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

/**
 * The footer is the site map a person can read: every service, industry,
 * market and article is one click from every page. Internal links are how
 * search engines learn what each page is about and how they relate.
 */
const FOOTER: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: [
      ["/", "The Command Core"],
      ["/ai-automation-south-africa", "AI automation"],
      ["/ai-proposal-automation", "Proposal automation"],
      ["/ai-follow-up-automation", "Follow-up automation"],
      ["/ai-admin-automation", "Admin automation"],
      ["/ai-training-south-africa", "AI training"],
      ["/corporate-ai-training", "Corporate AI training"],
      ["/workshop", "The one-day workshop"],
      ["/webinar", "Free online class"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["/ai-for-waste-management", "Waste management"],
      ["/ai-for-beauty-and-cosmetics", "Beauty & cosmetics"],
    ],
  },
  {
    title: "Where we work",
    links: [
      ["/ai-automation-johannesburg", "Johannesburg"],
      ["/ai-automation-south-africa", "South Africa"],
      ["/ai-automation-uk", "United Kingdom"],
      ["/ai-automation-united-states", "United States"],
      ["/ai-automation-australia", "Australia"],
      ["/ai-automation-africa", "Africa"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About Phila"],
      ["/stories", "Client stories"],
      ["/guides/how-we-work-first-30-days", "How we work"],
      ["/resources", "AI guides"],
      ["/tools/admin-time-calculator", "Admin time calculator"],
      ["/brain", "Business Brain builder"],
      ["/data-and-security", "Data & security"],
      ["/contact", "Contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mx-auto w-[min(1120px,calc(100%-2.5rem))] py-12">
      <div className="flex flex-wrap items-start justify-between gap-10 border-t border-midnight/10 pt-7">
        <div>
          <Brand dark={false} />
          <p className="mt-2.5 font-mono text-[12px] leading-relaxed text-muted">
            GrowthCred (Pty) Ltd &middot; Reg. 2026/229279/07
            <br />
            Rosebank, Johannesburg &middot; &copy; 2026
          </p>

          {/* Social, carried over from the previous site */}
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.youtube.com/@PhilaNgwenyagrowth"
              target="_blank"
              rel="noopener"
              aria-label="GrowthCred on YouTube"
              className="grid h-9 w-9 place-items-center rounded-full border border-midnight/15 text-midnight transition hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/phila-ngwenya-908b1a179/"
              target="_blank"
              rel="noopener"
              aria-label="Phila Ngwenya on LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-midnight/15 text-midnight transition hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
              </svg>
            </a>
          </div>
        </div>
        <nav aria-label="Footer" className="grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{col.title}</p>
              <ul className="mt-4 space-y-1">
                {col.links.map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-flex min-h-9 items-center text-sm text-midnight no-underline hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-midnight/10 pt-6 font-mono text-[12px] uppercase tracking-[0.14em]">
        <a href="mailto:info@growthcred.co.za" className="text-midnight no-underline hover:text-gold">
          info@growthcred.co.za
        </a>
        <Link to="/terms" className="text-midnight no-underline hover:text-gold">Terms</Link>
        <Link to="/privacy" className="text-midnight no-underline hover:text-gold">Privacy</Link>
        <Link to="/refunds" className="text-midnight no-underline hover:text-gold">Refunds</Link>
      </div>
      <AnalyticsChoice />
    </footer>
  );
}

export function Layout({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  return (
    <>
      {!bare && <Header />}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-4">Skip to content</a>
      <main id="main-content">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
