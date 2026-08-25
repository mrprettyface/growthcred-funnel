import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True only once the .env keys are present. Mirrors the Fumba pattern. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** Null until configured, so the UI shows a friendly message instead of crashing. */
export const supabase = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

export type Lead = {
  email: string;
  source: string;
};

export type OrderRow = {
  reference: string;
  email: string;
  name: string | null;
  items: string[];
  amount_cents: number;
  status: "awaiting_payment" | "paid" | "cancelled";
  payment_method: string;
};

/**
 * Capture an email for the free class.
 * RLS allows anon INSERT only, so a failure here is never fatal to the UX.
 */
export async function captureLead(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase.from("leads").insert(lead);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Record an order as an INTENT. Nothing is fulfilled until the wire is
 * confirmed by a human, so this row is a request, not proof of payment.
 * We generate the reference client-side so we never need a SELECT policy.
 */
export async function createOrder(order: OrderRow): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase.from("orders").insert(order);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Records that a Whop payment completed, against our order reference.
 *
 * We cannot UPDATE the orders row (anon is insert-only by design, so nobody can
 * mark their own order paid), so successful payments are appended here instead.
 * Whop's dashboard remains the authority on money; this is our matching trail.
 */
export async function recordPayment(
  reference: string,
  offer: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase
    .from("upsell_events")
    .insert({ reference, offer, accepted: true });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A high-ticket application. This is the point of the exercise: the form does
 * not just collect a name, it begins the relationship. The three open
 * questions mean Phila walks into the call already understanding the goal,
 * the desired outcome, and the frustration, so the conversation starts warm.
 */
export type Application = {
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  business_does: string;
  reason: string; // what made you apply today
  outcome: string; // what a successful outcome looks like
  frustration: string; // the most frustrating part so far
  team_size: string | null; // light qualifier
};

export async function submitApplication(
  app: Application,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase.from("applications").insert(app);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A "Build It for You" request: the top tier, sold by qualification and audit
 * rather than in the cart. This is a mini application taken right after the
 * upsell is declined, so we keep it short. `reference` links it to the order.
 */
export type BuildRequest = {
  reference: string;
  name: string;
  email: string;
  whatsapp: string;
  industry: string;
  invest_timing: string; // "Today" | "Tomorrow" | "This week" | "Still exploring"
  availability: string;
  notes: string;
};

export async function submitBuildRequest(
  req: BuildRequest,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase.from("build_requests").insert(req);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A free live class seat. Name and WhatsApp are required because that is how
 * the seat is honoured: joining link by email, reminder on WhatsApp an hour
 * before. `webinar` is the event slug, so the same table serves every future
 * live class without a migration.
 */
export type WebinarRegistration = {
  webinar: string;
  name: string;
  email: string;
  whatsapp: string;
  source?: string;
};

export async function registerForWebinar(
  reg: WebinarRegistration,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: "not_configured" };
  const { error } = await supabase.from("webinar_registrations").insert(reg);
  return error ? { ok: false, error: error.message } : { ok: true };
}
