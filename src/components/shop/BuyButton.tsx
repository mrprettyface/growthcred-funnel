import { ButtonLink } from "../ui";
import {
  buyHref,
  buyMailto,
  type ShopColour,
  type ShopProduct,
  type ShopSize,
} from "../../lib/shop";

/**
 * Buy opens a payment link when one is set in src/lib/shop.ts.
 * While the Paystack / Yoco URL is empty, it opens a WhatsApp order message.
 */
export function BuyButton({
  product,
  size,
  colour,
  className,
}: {
  product: ShopProduct;
  size: ShopSize;
  colour: ShopColour;
  className?: string;
}) {
  const { href, mode } = buyHref(product, size, colour);
  const label =
    mode === "payment" ? `Buy · ${colour} · ${size}` : `Order by message · ${colour} · ${size}`;

  return (
    <div className={className}>
      <ButtonLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
        data-buy-mode={mode}
        data-product={product.id}
        data-colour={colour}
      >
        {label}
      </ButtonLink>
      {mode === "message" ? (
        <p className="mt-3 text-center text-sm text-muted">
          Payment link coming. For now this opens WhatsApp with your colour and size filled in.{" "}
          <a href={buyMailto(product, size, colour)} className="text-gold underline-offset-2 hover:underline">
            Or email the order
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
