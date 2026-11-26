/**
 * Merch storefront: prices, colours, sizes, shipping, payment links and
 * Phila's official product photos in /shop/*.webp.
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
 * Printed-on-demand copy.
 * TODO(Phila): change only if the print partner's lead time changes.
 */
export const SHOP_SHIPPING =
  "Printed on demand in South Africa. Ships in 5 to 7 working days.";

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

export type ShopImage = {
  src: string;
  alt: string;
  label: string;
};

export type ShopProduct = {
  id: ShopProductId;
  slug: string;
  name: string;
  shortName: string;
  /** Cents (ZAR). */
  amountCents: number;
  blurb: string;
  fabric: string;
  colours: readonly ShopColour[];
  /** Flat-lay front used on the /shop card (matches storefront/index.html). */
  cardImage: ShopImage;
  /** Gallery views keyed by colour. Order matches the storefront kit. */
  galleries: Partial<Record<ShopColour, readonly ShopImage[]>>;
  path: string;
};

const img = (file: string, label: string, alt: string): ShopImage => ({
  src: `/shop/${file}`,
  label,
  alt,
});

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "gc-mark-tee",
    slug: "gc-mark-tee",
    name: "GC Mark Tee",
    shortName: "GC Mark",
    amountCents: 54900, // R549
    blurb:
      "A pared-back black tee with the GrowthCred mark on the left chest. Heavyweight cotton. Oversized fit.",
    fabric: "Heavyweight cotton. Oversized fit.",
    colours: ["Black"],
    cardImage: img("gc-black-front.webp", "Front", "GC Mark Tee, Black, front"),
    galleries: {
      Black: [
        img("gc-black-front.webp", "Front", "GC Mark Tee, Black, front"),
        img("gc-black-detail.webp", "Detail", "GC Mark Tee, Black, chest detail"),
        img("gc-black-on-model.webp", "On model", "GC Mark Tee, Black, on model"),
      ],
    },
    path: "/shop/gc-mark-tee",
  },
  {
    id: "dream-tee",
    slug: "dream-tee",
    name: "Dream Tee",
    shortName: "Dream",
    amountCents: 69900, // R699
    blurb:
      "Chest mark on the front. On the back, the dream line. How big would you dream if you knew you could not fail? Black or white.",
    fabric: "Heavyweight cotton. Soft hand.",
    colours: ["Black", "White"],
    cardImage: img("dream-black-front.webp", "Front", "Dream Tee, Black, front"),
    galleries: {
      Black: [
        img("dream-black-front.webp", "Front", "Dream Tee, Black, front"),
        img("dream-black-back.webp", "Back", "Dream Tee, Black, back"),
        img("dream-black-front-detail.webp", "Chest detail", "Dream Tee, Black, chest detail"),
        img("dream-black-back-detail.webp", "Back detail", "Dream Tee, Black, back detail"),
        img("dream-black-on-model.webp", "On model", "Dream Tee, Black, on model"),
      ],
      White: [
        img("dream-white-front.webp", "Front", "Dream Tee, White, front"),
        img("dream-white-back.webp", "Back", "Dream Tee, White, back"),
        img("dream-white-front-detail.webp", "Chest detail", "Dream Tee, White, chest detail"),
        img("dream-white-back-detail.webp", "Back detail", "Dream Tee, White, back detail"),
        img("dream-white-on-model.webp", "On model", "Dream Tee, White, on model"),
      ],
    },
    path: "/shop/dream-tee",
  },
  {
    id: "free-wifi-tee",
    slug: "free-wifi-tee",
    name: "FREE WiFi Tee",
    shortName: "FREE WiFi",
    amountCents: 69900, // R699
    blurb:
      "Small chest mark on the front. On the back, FREE WiFi over a QR. Black or white.",
    fabric: "Heavyweight cotton. Soft hand.",
    colours: ["Black", "White"],
    cardImage: img("wifi-black-front.webp", "Front", "FREE WiFi Tee, Black, front"),
    galleries: {
      Black: [
        img("wifi-black-front.webp", "Front", "FREE WiFi Tee, Black, front"),
        img("wifi-black-back.webp", "Back", "FREE WiFi Tee, Black, back"),
        img("wifi-black-front-detail.webp", "Chest detail", "FREE WiFi Tee, Black, chest detail"),
        img("wifi-black-back-detail.webp", "Back detail", "FREE WiFi Tee, Black, back detail"),
        img("wifi-black-on-model.webp", "On model", "FREE WiFi Tee, Black, on model"),
      ],
      White: [
        img("wifi-white-front.webp", "Front", "FREE WiFi Tee, White, front"),
        img("wifi-white-back.webp", "Back", "FREE WiFi Tee, White, back"),
        img("wifi-white-front-detail.webp", "Chest detail", "FREE WiFi Tee, White, chest detail"),
        img("wifi-white-back-detail.webp", "Back detail", "FREE WiFi Tee, White, back detail"),
        img("wifi-white-on-model.webp", "On model", "FREE WiFi Tee, White, on model"),
      ],
    },
    path: "/shop/free-wifi-tee",
  },
];

export const SHOP_BY_SLUG: Record<string, ShopProduct> = Object.fromEntries(
  SHOP_PRODUCTS.map((p) => [p.slug, p]),
);

export function shopPrice(product: ShopProduct): string {
  return formatPrice(product.amountCents);
}

export function galleryFor(product: ShopProduct, colour: ShopColour): readonly ShopImage[] {
  const views = product.galleries[colour];
  if (views?.length) return views;
  return product.galleries[product.colours[0]] ?? [];
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

/** Mailto fallback if WhatsApp is unavailable. */
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
    "I print these on demand in South Africa. You get yours in 5 to 7 working days. Sizes S to 3XL.",
  ],
} as const;
