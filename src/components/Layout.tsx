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
