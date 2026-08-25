import { Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { OrderContext, loadOrder, saveOrder, clearOrder, type Order } from "./lib/order";
import { Layout } from "./components/Layout";
import { ExperienceBoundary } from "./components/webinar/ExperienceBoundary";

import ClassPage from "./pages/Class";

import WorkshopPage from "./pages/Workshop";
import CheckoutPage from "./pages/Checkout";
import UpsellPage from "./pages/Upsell";
import DownsellPage from "./pages/Downsell";
import BuildPage from "./pages/Build";
import ThankYouPage from "./pages/ThankYou";
import CallPage from "./pages/Call";
import WebinarPlainPage from "./pages/Webinar";

/**
 * The webinar experience carries GSAP, Lenis, motion and a WebGL background.
 * None of that should slow down the money page, so it is split into its own
 * chunk and only fetched when someone actually opens /webinar.
 */
const WebinarExperience = lazy(() => import("./pages/WebinarExperience"));

/**
 * The money page as an experience, running alongside the original rather than
 * replacing it. `/` keeps serving the page that takes payment until these have
 * been compared on real traffic.
 */
const WorkshopExperience = lazy(() => import("./pages/WorkshopExperience"));
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Refunds from "./pages/legal/Refunds";

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
 */
function RequireOrder({ children }: { children: ReactNode }) {
  const stored = loadOrder();
  if (!stored) return <Navigate to="/checkout" replace />;
  return <>{children}</>;
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
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Funnel */}
          <Route path="/class" element={<Layout><ClassPage /></Layout>} />
          {/* Live class registration. Deliberately not in the nav: this is the
              page the ads, WhatsApp broadcasts and emails point at.
              /webinar is the scroll experience; /webinar-plain is the same
              argument as a plain document, kept for slow connections and for
              A/B testing the two against each other. */}
          <Route
            path="/webinar"
            element={
              <Layout>
                <ExperienceBoundary fallback={<WebinarPlainPage />}>
                  <Suspense fallback={<WebinarLoading />}>
                    <WebinarExperience />
                  </Suspense>
                </ExperienceBoundary>
              </Layout>
            }
          />
          <Route path="/webinar-plain" element={<Layout><WebinarPlainPage /></Layout>} />
          <Route
            path="/workshop"
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
          <Route path="/" element={<Layout><WorkshopPage /></Layout>} />
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
          <Route path="/agency" element={<Navigate to="/call" replace />} />

          {/* Legal */}
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/refunds" element={<Layout><Refunds /></Layout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </OrderContext.Provider>
  );
}
