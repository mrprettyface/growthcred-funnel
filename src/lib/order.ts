import { createContext, useContext } from "react";

/**
 * Funnel order state, carried across /checkout -> /upsell -> /downsell -> /thank-you.
 *
 * Persisted to sessionStorage so a refresh mid-funnel does not lose the order,
 * and so /upsell, /downsell and /thank-you can be GATED: landing on them
 * without an order sends you back to the start instead of showing a broken page.
 */

export type Order = {
  reference: string;
  email: string;
  name: string;
  items: string[]; // offer ids
  bump: boolean;
  upsellDecision: "accepted" | "declined" | null;
  downsellDecision: "accepted" | "declined" | null;
  buildDecision: "applied" | "declined" | null;
  createdAt: string;
};

const KEY = "gc_order";

export function loadOrder(): Order | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function saveOrder(order: Order): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* private browsing: fall back to in-memory context only */
  }
}

export function clearOrder(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* no-op */
  }
}

export type OrderContextValue = {
  order: Order | null;
  setOrder: (order: Order | null) => void;
};

export const OrderContext = createContext<OrderContextValue>({
  order: null,
  setOrder: () => {},
});

export function useOrder(): OrderContextValue {
  return useContext(OrderContext);
}
