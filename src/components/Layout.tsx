import { useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PillLink, cn } from "./ui";
import { AnalyticsChoice } from "./AnalyticsChoice";
import { BrandIcon, type Brand } from "./BrandIcons";
import { IMESSAGE_NUMBER, LINKEDIN_URL, whatsappUrl } from "../lib/contact";

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
  // /call is already the form: a "Register" button there only pulls people away from it.
  const showCta = useLocation().pathname !== "/call";
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
          {showCta && (
            <PillLink to={cta.to} size="sm" className="whitespace-nowrap">
              {cta.label}
            </PillLink>
          )}
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
      ["/ai-for-financial-services", "Financial services"],
      ["/ai-for-law-firms", "Law firms"],
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

/** Every way to reach us, as logos, in the footer of every page. */
const SOCIAL: { name: Brand; href: string; label: string }[] = [
  { name: "whatsapp", href: whatsappUrl("Hi GrowthCred, I'd like to speak to a specialist."), label: "WhatsApp GrowthCred" },
  { name: "imessage", href: `sms:+${IMESSAGE_NUMBER}`, label: "iMessage or text GrowthCred" },
  { name: "linkedin", href: LINKEDIN_URL, label: "GrowthCred on LinkedIn" },
  { name: "youtube", href: "https://www.youtube.com/@PhilaNgwenyagrowth", label: "GrowthCred on YouTube" },
  { name: "email", href: "mailto:info@growthcred.co.za", label: "Email GrowthCred" },
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
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {SOCIAL.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener" : undefined}
                aria-label={c.label}
                title={c.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-midnight/10 bg-white text-midnight transition hover:border-gold"
              >
                <BrandIcon name={c.name} className="h-5 w-5" />
              </a>
            ))}
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
        <a href="mailto:info@growthcred.co.za" className="inline-flex items-center gap-2 text-midnight no-underline hover:text-gold">
          <BrandIcon name="email" className="h-4 w-4" /> info@growthcred.co.za
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
