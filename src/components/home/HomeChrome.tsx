import type { ReactNode } from "react";
import { Footer, Header } from "../Layout";
import { PillLink } from "../ui";
import { APPLY_HREF } from "../../lib/home";

/**
 * Chrome for the homepage. It uses the site's own header and footer — so every
 * section of the site is one click away — with the header's button turned to
 * the homepage's single ask: the application.
 */

/** The primary ask on the homepage: the shared gold pill, pointed at the application. */
export function ApplyButton({
  children,
  size = "lg",
  className,
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <PillLink to={APPLY_HREF} size={size} className={className}>
      {children}
    </PillLink>
  );
}

export function HomeHeader() {
  return <Header cta={{ to: APPLY_HREF, label: "Apply" }} />;
}

export function HomeFooter() {
  return <Footer />;
}
