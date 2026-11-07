import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const TONE = {
  light: "text-midnight underline decoration-gold underline-offset-2 hover:text-gold",
  dark: "text-gold underline decoration-gold/70 underline-offset-2 hover:text-gold-soft",
} as const;

type Anchor = { phrase: string; href: string };

/**
 * Turn each exact phrase into an internal link. The surrounding words stay as written.
 * A phrase that is missing, or that overlaps one already placed, is left as text.
 * Inside a flex parent, wrap the result so the sentence stays one item.
 */
export function linkPhrases(text: string, anchors: readonly Anchor[], tone: keyof typeof TONE = "light"): ReactNode {
  const hits: { phrase: string; href: string; at: number }[] = [];
  let cursor = 0;
  const sorted = anchors
    .map((anchor) => ({ ...anchor, at: text.indexOf(anchor.phrase) }))
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at || b.phrase.length - a.phrase.length);
  for (const hit of sorted) {
    if (hit.at < cursor) continue;
    hits.push(hit);
    cursor = hit.at + hit.phrase.length;
  }
  if (hits.length === 0) return text;
  const nodes: ReactNode[] = [];
  let from = 0;
  for (const hit of hits) {
    if (hit.at > from) nodes.push(text.slice(from, hit.at));
    nodes.push(
      <Link key={`${hit.at}-${hit.href}`} to={hit.href} className={TONE[tone]}>
        {hit.phrase}
      </Link>,
    );
    from = hit.at + hit.phrase.length;
  }
  if (from < text.length) nodes.push(text.slice(from));
  return <>{nodes}</>;
}

/** Turn the first exact `phrase` in `text` into an internal link. */
export function linkPhrase(text: string, phrase: string, to: string, tone: keyof typeof TONE = "light"): ReactNode {
  return linkPhrases(text, [{ phrase, href: to }], tone);
}
