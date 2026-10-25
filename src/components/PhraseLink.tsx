import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const TONE = {
  light: "text-midnight underline decoration-gold underline-offset-2 hover:text-gold",
  dark: "text-gold underline decoration-gold/70 underline-offset-2 hover:text-gold-soft",
} as const;

/**
 * Turn the first exact `phrase` in `text` into an internal link.
 * The surrounding words stay as written. If the phrase is missing, the text is unchanged.
 * Inside a flex parent, wrap the result so the sentence stays one item.
 */
export function linkPhrase(text: string, phrase: string, to: string, tone: keyof typeof TONE = "light"): ReactNode {
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Link to={to} className={TONE[tone]}>
        {phrase}
      </Link>
      {text.slice(at + phrase.length)}
    </>
  );
}
