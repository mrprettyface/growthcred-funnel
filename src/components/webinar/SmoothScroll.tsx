import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Handle on the page's Lenis instance, for the few places that must pause it.
 *
 * The seat modal locks body scroll; Lenis has to be told as well, or it keeps
 * driving the page underneath the dialog.
 */
export const scrollControl = {
  pause: () => {},
  resume: () => {},
};

/**
 * THE page's single scroll authority.
 *
 * One Lenis instance, driven by the GSAP ticker, reporting every scroll to
 * ScrollTrigger. Nothing else on this page may construct a Lenis (ScrollStack
 * is passed manageScroll={false} for exactly this reason) — two smooth-scroll
 * engines on one document fight, and the symptom is janky, drifting pins.
 *
 * Under reduced motion this renders nothing at all: native scrolling, and every
 * scene falls back to its plain version.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // index.css sets scroll-behavior: smooth on <html>, which Lenis cannot
    // drive. Hand the wheel over for as long as this page is mounted.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch is left alone deliberately: native momentum is what phone users
      // expect, and syncing it makes the page feel heavy on mid-range Androids.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    scrollControl.pause = () => lenis.stop();
    scrollControl.resume = () => lenis.start();

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links (#register) have to go through Lenis to land accurately.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    // Late-loading images change the page height under ScrollTrigger's feet.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", onLoad);
      scrollControl.pause = () => {};
      scrollControl.resume = () => {};
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
