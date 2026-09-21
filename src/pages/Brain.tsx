import { useEffect } from "react";
import { BrainBuilder } from "../components/BrainBuilder";
import { track } from "../lib/analytics";

/**
 * /brain — the Business Brain builder. A full-screen focus tool, deliberately
 * outside the normal Layout (no header selling, no footer): the whole page is
 * the worksheet. Run during the live class — "take out your phone, go to
 * growthcred.co.za/brain" — and shared afterwards as the standing entry point.
 */
export default function BrainPage() {
  useEffect(() => track("brain_view"), []);
  return <BrainBuilder />;
}
