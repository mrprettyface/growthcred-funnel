import { Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { OrderContext, loadOrder, saveOrder, clearOrder, useOrder, type Order } from "./lib/order";
import { Layout } from "./components/Layout";
import { ExperienceBoundary } from "./components/webinar/ExperienceBoundary";

import NextClass from "./pages/NextClass";
import { Metadata } from "./seo/Metadata";
import { SEARCH_PAGES } from "./content/searchPages";
import { SearchPage, NotFound } from "./pages/SearchPage";

import WorkshopPage from "./pages/Workshop";
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const UpsellPage = lazy(() => import("./pages/Upsell"));
const DownsellPage = lazy(() => import("./pages/Downsell"));
const BuildPage = lazy(() => import("./pages/Build"));
const ThankYouPage = lazy(() => import("./pages/ThankYou"));
const CallPage = lazy(() => import("./pages/Call"));

import ContactPage from "./pages/Contact";
const BrainPage = lazy(() => import("./pages/Brain"));

/**
 * The webinar experience carries GSAP, Lenis, motion and a WebGL background.
 * None of that should slow down the money page, so it is split into its own
 * chunk and only fetched when someone actually opens /webinar.
 */


/**
 * The money page as an experience, running alongside the original rather than
 * replacing it. `/` keeps serving the page that takes payment until these have
 * been compared on real traffic.
 */
const WorkshopExperience = lazy(() => import("./pages/WorkshopExperience"));
/** The lead magnet funnel. Small page, lazy for the same reason as the rest. */
const PlaybookPage = lazy(() => import("./pages/Playbook"));
/**
 * The legal pages are long, rarely opened, and were sitting in the main bundle
 * where the money page paid for them on every first load. Split out: they now
 * cost `/` nothing and fetch in a few hundred milliseconds when someone clicks
 * a footer link.
 */
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Refunds = lazy(() => import("./pages/legal/Refunds"));

/** Scrolls to top on every route change, so funnel steps start at the headline. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Funnel gate. /upsell, /downsell and /thank-you are mid-funnel pages: landing
 * on them without an order means the flow was never started, so we send the
 * visitor to checkout rather than showing a broken or exploitable page.
 *
 * The in-memory order is the primary source, and sessionStorage only the
 * fallback. Reading storage first would eject a paying customer mid-funnel
 * wherever writes are refused or wiped between navigations (private browsing,
 * "block all cookies", an ITP purge): saveOrder swallows those failures by
 * design, so the context would hold a live order while storage held nothing.
 */
function RequireOrder({ children }: { children: ReactNode }) {
  const { order } = useOrder();
  if (!order && !loadOrder()) return <Navigate to="/checkout" replace />;
  return <>{children}</>;
}

/** Holds the page while a legal chunk arrives. Short, so it is never seen for long. */
function LegalLoading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted md:text-[11px]">
        Loading&hellip;
      </p>
    </div>
  );
}

/** Holds the fold while the experience chunk arrives. Brand, not a spinner. */
function WebinarLoading() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-midnight">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
        Loading the class&hellip;
      </p>
    </div>
  );
}

export default function App() {
  const [order, setOrderState] = useState<Order | null>(() => loadOrder());

  const value = useMemo(
    () => ({
      order,
      setOrder: (next: Order | null) => {
        setOrderState(next);
        if (next) saveOrder(next);
        else clearOrder();
      },
    }),
    [order],
  );

  return (
    <OrderContext.Provider value={value}>
      <>
        <Metadata />
        <ScrollToTop />
        <Suspense fallback={<LegalLoading />}><Routes>
          {/* Funnel */}
          <Route path="/class" element={<Layout><NextClass /></Layout>} />
          {/* The parallel funnel. A lead magnet opt-in whose thank-you state
              hands the pack over on the spot and offers a one-tap seat at the
              live class. Deliberately not in the nav: this is an ad
              destination, same as /webinar. */}
          <Route
            path="/playbook"
            element={
              <Layout>
                <Suspense fallback={<WebinarLoading />}>
                  <PlaybookPage />
                </Suspense>
              </Layout>
            }
          />
          {/* Live class registration. Deliberately not in the nav: this is the
              page the ads, WhatsApp broadcasts and emails point at.
              /webinar is the scroll experience; /webinar-plain is the same
              argument as a plain document, kept for slow connections and for
              A/B testing the two against each other. */}
          <Route path="/webinar" element={<Layout><NextClass /></Layout>} />
          <Route path="/webinar-plain" element={<Navigate to="/webinar" replace />} />
          {SEARCH_PAGES.map(page => <Route key={page.path} path={page.path} element={<Layout><SearchPage page={page} /></Layout>} />)}
          {/* THE LANDING PAGE.
              The scroll experience is now what growthcred.co.za serves, with the
              original page kept as its crash fallback rather than deleted — if
              the experience ever throws, the visitor still lands on a complete
              page that sells and still reaches the same checkout. */}
          <Route
            path="/"
            element={
              <Layout>
                <ExperienceBoundary fallback={<WorkshopPage />}>
                  <Suspense fallback={<WebinarLoading />}>
                    <WorkshopExperience />
                  </Suspense>
                </ExperienceBoundary>
              </Layout>
            }
          />
          {/* Anything already pointing at /workshop keeps working. */}
          <Route path="/workshop" element={<Navigate to="/" replace />} />
          <Route path="/checkout" element={<Layout bare><CheckoutPage /></Layout>} />
          <Route
            path="/upsell"
            element={<RequireOrder><Layout bare><UpsellPage /></Layout></RequireOrder>}
          />
          <Route
            path="/downsell"
            element={<RequireOrder><Layout bare><DownsellPage /></Layout></RequireOrder>}
          />
          <Route
            path="/build"
            element={<RequireOrder><Layout bare><BuildPage /></Layout></RequireOrder>}
          />
          <Route
            path="/thank-you"
            element={<RequireOrder><Layout><ThankYouPage /></Layout></RequireOrder>}
          />

          {/* Backend offer */}
          <Route path="/call" element={<Layout><CallPage /></Layout>} />
          <Route path="/agency" element={<Navigate to="/ai-automation-south-africa" replace />} />

          {/* Front door for anything that is not a funnel step. Deliberately
              out of the header nav: the header sells, the footer serves. */}
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

          {/* The Business Brain builder. Full-screen on purpose — it runs
              live, in the room, on phones, so nothing else competes. */}
          <Route path="/brain" element={<BrainPage />} />

          {/* Legal */}
          <Route
            path="/terms"
            element={<Layout><Suspense fallback={<LegalLoading />}><Terms /></Suspense></Layout>}
          />
          <Route
            path="/privacy"
            element={<Layout><Suspense fallback={<LegalLoading />}><Privacy /></Suspense></Layout>}
          />
          <Route
            path="/refunds"
            element={<Layout><Suspense fallback={<LegalLoading />}><Refunds /></Suspense></Layout>}
          />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes></Suspense>
      </>
    </OrderContext.Provider>
  );
}
