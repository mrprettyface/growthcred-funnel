import { Component, type ReactNode } from "react";

/**
 * If the experience cannot run, the class still has to be bookable.
 *
 * The experience lives in a lazily-imported chunk carrying GSAP, Lenis, motion
 * and WebGL. A flaky connection, a blocked script or a runtime error in any of
 * that must not cost a registration, so this catches the failure and renders
 * the plain version of the same page instead. The visitor sees a page that
 * works; they never see a broken one.
 */
export class ExperienceBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // Left visible on purpose: a silent fallback hides a real problem.
    console.error("[webinar] experience failed, serving the plain page", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
