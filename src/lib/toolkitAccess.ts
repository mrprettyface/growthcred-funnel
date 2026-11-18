/**
 * The JCCI toolkit gate.
 *
 * A soft gate, on purpose. The files are static, so anyone with a direct link
 * can open one. What the gate does is make the trade fair and visible: your
 * name, your email and your yes to one email a day, for the whole kit. That is
 * the list this page exists to build.
 *
 * Unlocking is remembered in this browser, so someone who comes back next week
 * from the same phone walks straight into the vault. Storage can be refused
 * (private browsing, strict cookie settings), so every read and write is
 * wrapped and the in-memory state is the authority for this visit.
 */

const KEY = "gc_toolkit_access_v1";

export type ToolkitAccess = { name: string; email: string; at: string };

export function loadAccess(): ToolkitAccess | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ToolkitAccess;
    return parsed && typeof parsed.email === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAccess(access: ToolkitAccess): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(access));
  } catch {
    /* Storage refused. They still get in for this visit. */
  }
}

export function clearAccess(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
}

/** Stored on magnet_signups.magnet. Never rename it: the rows keep it forever. */
export const TOOLKIT_SLUG = "jcci-toolkit-2026-11";
