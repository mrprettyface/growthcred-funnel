import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ButtonLink, cn } from "./ui";

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
  { to: "/class", label: "Free class" },
  { to: "/", label: "The workshop" },
  { to: "/call", label: "Done for you" },
];

export function Header() {
  return (
    <div className="sticky top-0 z-50 bg-paper/80 py-3 backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2.5rem))] items-center justify-between gap-5 rounded-full bg-midnight py-2.5 pl-6 pr-3 text-cream">
        <Brand />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-[13px] font-medium no-underline transition",
                  isActive ? "text-gold" : "text-cream/80 hover:text-gold",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ButtonLink to="/checkout" className="min-h-10 px-4 text-[13px]">
          Get my time back <span aria-hidden="true">&#8599;</span>
        </ButtonLink>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-[min(1120px,calc(100%-2.5rem))] py-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-midnight/10 pt-7">
        <div>
          <Brand dark={false} />
          <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-muted">
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
        <nav className="flex flex-wrap gap-5 font-mono text-xs" aria-label="Footer">
          <Link to="/class" className="text-midnight no-underline hover:text-gold">
            Free class
          </Link>
          <Link to="/call" className="text-midnight no-underline hover:text-gold">
            Done for you
          </Link>
          <Link to="/terms" className="text-midnight no-underline hover:text-gold">
            Terms
          </Link>
          <Link to="/privacy" className="text-midnight no-underline hover:text-gold">
            Privacy
          </Link>
          <Link to="/refunds" className="text-midnight no-underline hover:text-gold">
            Refunds
          </Link>
          <a
            href="mailto:info@growthcred.co.za"
            className="text-midnight no-underline hover:text-gold"
          >
            info@growthcred.co.za
          </a>
        </nav>
      </div>
    </footer>
  );
}

export function Layout({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  return (
    <>
      {!bare && <Header />}
      <main>{children}</main>
      {!bare && <Footer />}
    </>
  );
}
