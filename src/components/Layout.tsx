import { useEffect, useRef, useState, type ReactNode } from "react";
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

type NavLinkItem = { to: string; label: string; blurb: string };
type NavItem =
  | { label: string; to: string; menu?: undefined }
  | { label: string; to?: undefined; menu: { heading?: string; links: NavLinkItem[] }[] };

/**
 * The main nav, grouped the way Harvey groups theirs: the product first, then
 * what we do, who we've done it for, how we keep data safe, and the ways in.
 * scripts/verify-corporate.mjs reads this array, so it must stay named NAV.
 */
const NAV = [
  {
    label: "Command Core",
    menu: [
      {
        links: [
          { to: "/", label: "The Command Core", blurb: "Your own AI, deployed and run for you." },
          { to: "/private-ai", label: "Private AI, explained", blurb: "Why firms are moving AI in-house, and what owning costs." },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    menu: [
      {
        heading: "For teams and owners",
        links: [
          { to: "/corporate-ai-training", label: "Corporate AI training", blurb: "Every team producing its reports and documents faster." },
          { to: "/ai-automation-south-africa", label: "AI automation", blurb: "Your repetitive work, built into AI workflows." },
          { to: "/ai-training-south-africa", label: "AI training for owners", blurb: "AI on the work your business already does." },
        ],
      },
      {
        heading: "By industry",
        links: [
          { to: "/ai-for-law-firms", label: "Law firms", blurb: "Faster drafts. Your lawyers still sign off." },
          { to: "/ai-for-financial-services", label: "Financial services", blurb: "Prepared work, with the adviser in charge." },
          { to: "/ai-for-waste-management", label: "Waste management", blurb: "Trucks, compliance and contracts, organised." },
          { to: "/ai-for-beauty-and-cosmetics", label: "Beauty and cosmetics", blurb: "Orders, bookings and brand content." },
        ],
      },
    ],
  },
  { label: "Customers", to: "/stories" },
  { label: "Security", to: "/data-and-security" },
  {
    label: "Resources",
    menu: [
      {
        links: [
          { to: "/resources", label: "Guides", blurb: "Articles for owners who want AI to do real work." },
          { to: "/workshop", label: "The one-day workshop", blurb: "Build your first systems yourself, in one day." },
          { to: "/webinar", label: "Free online class", blurb: "A first hour on giving AI your business context." },
        ],
      },
      {
        links: [
          { to: "/tools/admin-time-calculator", label: "Admin time calculator", blurb: "Put a rand figure on the hours admin takes." },
          { to: "/about", label: "About GrowthCred", blurb: "Who we are, and why we build this way." },
        ],
      },
    ],
  },
] as NavItem[];

/**
 * The site header. Every page shares the nav; the button is the page's one ask
 * — "Register" for the workshop funnel by default, "Apply" on the homepage.
 *
 * Dropdowns: every panel is in the prerendered HTML (hidden until opened), so
 * crawlers follow the links. They open on hover (pointer devices), click or
 * keyboard, and close on Escape, an outside click, or a route change. No
 * animation, so there is nothing to switch off under reduced motion.
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const light = tone === "light";
  // /call is already the form: a "Register" button there only pulls people away from it.
  const showCta = pathname !== "/call";

  useEffect(() => {
    setOpenGroup(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`nav-button-${openGroup}`)?.focus();
      setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const hoverable = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const itemCls = (active: boolean) =>
    cn(
      "inline-flex h-16 items-center gap-1.5 whitespace-nowrap border-b-2 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-colors",
      active ? "border-gold text-gold" : cn("border-transparent", light ? "text-midnight/70 hover:text-gold" : "text-cream/65 hover:text-gold"),
    );
  const groupActive = (item: NavItem) => Boolean(item.menu?.some((col) => col.links.some((l) => l.to === pathname)));

  return (
    /* Solid, not backdrop-blur: a blurred sticky bar re-rasterises on every
       scroll frame, which the mobile rules in STATUS.md forbid. */
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b",
        light ? "border-midnight/10 bg-paper/95 text-midnight" : "border-cream/10 bg-midnight/95 text-cream",
      )}
    >
      <div className="mx-auto flex h-16 w-[min(1120px,calc(100%-2.5rem))] items-center justify-between gap-5">
        <Brand dark={!light} />
        <nav className="hidden h-16 lg:block" aria-label="Main">
          <ul className="flex h-16 items-center gap-7">
            {NAV.map((item) => {
              if (!item.menu)
                return (
                  <li key={item.label}>
                    <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => itemCls(isActive)}>
                      {item.label}
                    </NavLink>
                  </li>
                );
              const open = openGroup === item.label;
              const id = item.label.toLowerCase();
              return (
                <li
                  key={item.label}
                  onMouseEnter={() => hoverable() && setOpenGroup(item.label)}
                  onMouseLeave={() => hoverable() && setOpenGroup(null)}
                >
                  <button
                    id={`nav-button-${item.label}`}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`nav-panel-${id}`}
                    onClick={() => setOpenGroup(open ? null : item.label)}
                    className={itemCls(open || groupActive(item))}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" aria-hidden="true" className={cn("h-3 w-3", open && "rotate-180")}>
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    id={`nav-panel-${id}`}
                    hidden={!open}
                    className={cn(
                      "absolute inset-x-0 top-full border-b shadow-[0_30px_60px_-30px_rgba(26,26,36,0.35)]",
                      light ? "border-midnight/10 bg-paper" : "border-cream/10 bg-midnight",
                    )}
                  >
                    <div className="mx-auto grid w-[min(1120px,calc(100%-2.5rem))] grid-cols-2 gap-x-16 gap-y-2 py-10">
                      {item.menu.map((col, c) => (
                        <div key={c}>
                          {col.heading ? (
                            <p className={cn("mb-3 font-mono text-[12px] uppercase tracking-[0.18em]", light ? "text-muted" : "text-cream/45")}>
                              {col.heading}
                            </p>
                          ) : null}
                          <ul className="space-y-1">
                            {col.links.map((link) => (
                              <li key={link.to}>
                                <Link
                                  to={link.to}
                                  onClick={() => setOpenGroup(null)}
                                  className={cn(
                                    "group block rounded-xl px-3 py-3 no-underline -mx-3",
                                    light ? "hover:bg-midnight/[0.04]" : "hover:bg-cream/[0.05]",
                                  )}
                                >
                                  <span className={cn("block font-display text-lg font-bold tracking-[-0.02em] group-hover:text-gold", light ? "text-midnight" : "text-cream")}>
                                    {link.label}
                                  </span>
                                  <span className={cn("mt-1 block text-sm leading-relaxed", light ? "text-ink" : "text-cream/60")}>{link.blurb}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
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
            "max-h-[calc(100vh-4rem)] overflow-y-auto border-t px-5 pb-4 pt-2 lg:hidden",
            light ? "border-midnight/10 bg-paper" : "border-cream/10 bg-midnight",
          )}
        >
          {NAV.map((item) =>
            item.menu ? (
              <div key={item.label} className={cn("border-b py-2", light ? "border-midnight/10" : "border-cream/10")}>
                <p className={cn("pt-2 font-mono text-[12px] uppercase tracking-[0.16em]", light ? "text-muted" : "text-cream/45")}>{item.label}</p>
                {item.menu.flatMap((col) => col.links).map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={cn("flex min-h-11 items-center pl-3 text-base no-underline", light ? "text-midnight" : "text-cream")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex min-h-12 items-center border-b font-mono text-[12px] uppercase tracking-[0.16em] no-underline",
                  light ? "border-midnight/10 text-midnight" : "border-cream/10 text-cream",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={cn("flex min-h-12 items-center font-mono text-[12px] uppercase tracking-[0.16em] no-underline", light ? "text-midnight" : "text-cream")}
          >
            Contact
          </Link>
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
      ["/private-ai", "Private AI"],
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
