/**
 * How someone reaches us when the site itself is the thing that failed.
 *
 * The fallback is WhatsApp rather than info@growthcred.co.za on purpose: that
 * mailbox rides on the same provider account as the DNS and the hosting, so the
 * outage that loses a registration is the same outage that would swallow the
 * email telling us about it. This number depends on the domain for nothing.
 */
export const WHATSAPP_NUMBER = "27662830289";
export const WHATSAPP_DISPLAY = "+27 66 283 0289";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** A wa.me link that opens the chat with the first message already typed. */
export function whatsappUrl(message?: string): string {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;
}
