import { useState } from "react";
import { WhopElements, Checkout, CheckoutElement } from "@whop/elements-react";
import { loadWhop } from "@whop/elements";
import { activePromo } from "../lib/promo";
import { whopReturnUrl, type WhopOffer } from "../lib/whopReturn";

/**
 * Whop payment, themed to GrowthCred (gold on midnight).
 *
 * Built on Whop Elements, which replaced the legacy embedded checkout
 * (@whop/checkout) before it stopped working on 21 October 2026.
 *
 * ONE checkout, no duplicates. Whop's checkout element handles every payment
 * method itself, including Apple Pay and Google Pay. We deliberately do NOT add
 * the separate express element on top: the legacy version rendered a second
 * Apple Pay button above the one already in the form.
 *
 * Card details never touch our site: everything happens inside Whop's frame.
 */

const LOADING = (
  <div className="grid min-h-[420px] place-items-center rounded-2xl bg-midnight">
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60">
      Loading secure checkout&hellip;
    </p>
  </div>
);

export function WhopPay({
  planId,
  email,
  reference,
  offer,
  returnPath,
  onPaid,
}: {
  planId: string;
  email?: string;
  /** Our order reference, tagged onto the payment so it can be matched later. */
  reference?: string;
  /** Which paid step this is, so the page Whop returns to knows it is its own payment. */
  offer: WhopOffer;
  /** The page Whop sends the buyer back to: the page this checkout sits on. */
  returnPath: string;
  onPaid: (paymentId: string) => void;
}) {
  /* One load for the whole session: loadWhop() hands back the same promise. */
  const [elements] = useState(() => loadWhop());
  const [loadError, setLoadError] = useState(false);

  /* ?promo=CODE on any checkout URL, remembered for the rest of the funnel. */
  const promoCode = activePromo();

  if (loadError) {
    return (
      <div className="grid min-h-[200px] place-items-center rounded-2xl bg-midnight p-6 text-center">
        <p className="text-sm text-cream/80">
          The secure checkout didn&rsquo;t load. Check your connection, then close this and try again.
        </p>
      </div>
    );
  }

  return (
    /* Whop's dark theme draws on a transparent ground, so the midnight comes from us. */
    <div className="overflow-hidden rounded-2xl bg-midnight p-4 md:p-5">
      <WhopElements
        elements={elements}
        appearance={{ theme: { appearance: "dark", accentColor: "gold", grayColor: "sand" } }}
        onLoadError={(error) => {
          console.error("[whop] elements failed to load", error);
          setLoadError(true);
        }}
      >
        <Checkout
          /*
           * Every checkout option is fixed when the session is minted, so a
           * different plan (the bump toggled) or promo needs a fresh mount.
           */
          key={`checkout-${planId}-${promoCode ?? ""}`}
          plan={planId}
          promoCode={promoCode}
          returnUrl={whopReturnUrl(returnPath, offer)}
          metadata={reference ? { reference, offer } : { offer }}
          attribution={{ utmSource: "growthcred_funnel", ...(reference ? { utmContent: reference } : {}) }}
          onComplete={(result) => {
            if (result.result === "payment") onPaid(result.paymentId);
          }}
          fallback={LOADING}
        >
          <CheckoutElement
            buyerEmail={email ?? ""}
            onError={(error) => {
              // Whop shows the customer its own message; this is for our console.
              console.error("[whop] checkout error", error);
            }}
          />
        </Checkout>
      </WhopElements>
    </div>
  );
}
