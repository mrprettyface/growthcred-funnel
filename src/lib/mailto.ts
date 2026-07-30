/**
 * Prewritten "email us" links.
 *
 * Because the database is not connected yet, these are how the business
 * actually hears about each order: the customer clicks, their own email app
 * opens with the message already written, and they hit send. One click for
 * them, a real lead in the inbox for us.
 *
 * All of them go to the business inbox.
 */
const TO = "info@growthcred.co.za";

export function mailtoHref(subject: string, bodyLines: string[]): string {
  // encodeURIComponent gives %20 for spaces and %0A for newlines, which mail
  // clients handle more reliably than URLSearchParams' "+".
  const body = bodyLines.filter((l) => l !== undefined).join("\n");
  return `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
