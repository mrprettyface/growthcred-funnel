/**
 * Merch storefront: prices, colours, sizes, shipping and payment links.
 *
 * Swap PAYMENT_LINKS when Phila has Paystack or Yoco URLs. Empty strings keep
 * the Buy button on the WhatsApp / mailto order fallback — never a dead href.
 */

import { whatsappUrl } from "./contact";
import { formatPrice } from "./offers";

export const SHOP_PATH = "/shop";

export const SHOP_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
export type ShopSize = (typeof SHOP_SIZES)[number];

export const SHOP_COLOURS = ["Black", "White"] as const;
export type ShopColour = (typeof SHOP_COLOURS)[number];

/**
 * Printed-on-demand copy. Exact wording from the brief.
 * TODO(Phila): change only if the print partner's lead time changes.
 */
export const SHOP_SHIPPING =
  "Printed on demand in South Africa. Ships in 5 to 7 working days.";

/** Real QR target printed on the FREE WiFi Tee back. */
export const SHOP_QR_URL = "https://growthcred.co.za";

/**
 * Paystack or Yoco payment-link URLs per product.
 * Leave empty until Phila pastes the live links. Buy falls back to WhatsApp.
 *
 * TODO(Phila): paste Paystack or Yoco payment links here.
 */
export const PAYMENT_LINKS = {
  "gc-mark-tee": "",
  "dream-tee": "",
  "free-wifi-tee": "",
} as const satisfies Record<string, string>;

export type ShopProductId = keyof typeof PAYMENT_LINKS;

export type ShopPrint = "chest" | "dream-back" | "wifi-back";

export type ShopProduct = {
  id: ShopProductId;
  slug: string;
  name: string;
  shortName: string;
  /** Cents (ZAR). Must match the live payment link once it exists. */
  amountCents: number;
  blurb: string;
  fabric: string;
  prints: ShopPrint;
  /** Dream back: stacked all-caps lines. DREAM is rendered largest in the mockup. */
  dreamLines?: readonly string[];
  path: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "gc-mark-tee",
    slug: "gc-mark-tee",
    name: "GC Mark Tee",
    shortName: "GC Mark",
    amountCents: 54900, // R549
    blurb:
      "A heavyweight tee with a small left-chest GrowthCred mark. Black or white. I print the mark from the logo we use today. The GC arrow mark comes later.",
    fabric: "Heavyweight cotton. Oversized fit.",
    prints: "chest",
    path: "/shop/gc-mark-tee",
  },
  {
    id: "dream-tee",
    slug: "dream-tee",
    name: "Dream Tee",
    shortName: "Dream",
    amountCents: 69900, // R699
    blurb:
      "Chest mark on the front. On the back, a bold stacked question. How big would you dream if you knew you could not fail? Black or white.",
    fabric: "Heavyweight cotton. Soft hand.",
    prints: "dream-back",
    dreamLines: ["HOW BIG", "WOULD YOU", "DREAM", "IF YOU KNEW YOU", "COULD NOT FAIL?"],
    path: "/shop/dream-tee",
  },
  {
    id: "free-wifi-tee",
    slug: "free-wifi-tee",
    name: "FREE WiFi Tee",
    shortName: "FREE WiFi",
    amountCents: 69900, // R699
    blurb:
      "Small chest mark on the front. On the back, FREE WiFi over a real QR to growthcred.co.za. Black with gold type, or white with red type.",
    fabric: "Heavyweight cotton. Soft hand.",
    prints: "wifi-back",
    path: "/shop/free-wifi-tee",
  },
];

export const SHOP_BY_SLUG: Record<string, ShopProduct> = Object.fromEntries(
  SHOP_PRODUCTS.map((p) => [p.slug, p]),
);

export function shopPrice(product: ShopProduct): string {
  return formatPrice(product.amountCents);
}

/**
 * Where Buy goes. A filled payment link opens that URL. An empty one opens a
 * pre-filled WhatsApp order so the button never points at a broken link.
 */
export function buyHref(
  product: ShopProduct,
  size: ShopSize,
  colour: ShopColour,
): { href: string; mode: "payment" | "message" } {
  const link = PAYMENT_LINKS[product.id]?.trim() ?? "";
  if (link) return { href: link, mode: "payment" };

  const message = `Hi Phila, I'd like to order the ${product.name} in ${colour}, size ${size} (${shopPrice(product)}). ${SHOP_SHIPPING}`;
  return { href: whatsappUrl(message), mode: "message" };
}

/** Mailto fallback if WhatsApp is unavailable; kept for the gate and copy. */
export function buyMailto(product: ShopProduct, size: ShopSize, colour: ShopColour): string {
  const subject = encodeURIComponent(`Order: ${product.name} (${colour}, ${size})`);
  const body = encodeURIComponent(
    `Hi Phila,\n\nI'd like to order the ${product.name} in ${colour}, size ${size} (${shopPrice(product)}).\n\n${SHOP_SHIPPING}\n`,
  );
  return `mailto:info@growthcred.co.za?subject=${subject}&body=${body}`;
}

export const SHOP_STORY = {
  eyebrow: "Merch",
  h1: "Wear the work.",
  lead: "Three tees I made for you. Simple. Printed here in South Africa.",
  storyTitle: "I sell the destination.",
  story: [
    "I build AI systems for owners who are still the bottleneck. You know the feeling. Every quote, hire and question still runs through you.",
    "I care about where your business goes next. Not the tools under the hood. Same idea on a tee.",
    "I print these on demand in South Africa. You get yours in 5 to 7 working days. Sizes S to 3XL. Black or white.",
  ],
} as const;
