import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { products, type Product } from "@/data/products";

/**
 * Static mini-cart preview. The real cart state will replace `lines`
 * without touching the presentation below.
 */
type CartLine = { product: Product; qty: number };

const lines: CartLine[] = [
  { product: products[0]!, qty: 1 },
  { product: products[4]!, qty: 2 },
];

const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

export function MiniCartContents() {
  return (
    <ul className="flex flex-col gap-6">
      {lines.map(({ product, qty }) => (
        <li key={product.id} className="flex gap-4">
          <img
            src={product.images[0]}
            alt={product.name}
            width={1024}
            height={1024}
            loading="lazy"
            className="size-20 shrink-0 object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="font-display text-base leading-snug tracking-tight">{product.name}</p>
            <p className="font-mono text-xs text-muted-foreground">Qty {qty}</p>
            <PriceTag amount={product.price * qty} size="sm" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MiniCartFooter() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="rule-label">Subtotal</span>
        <PriceTag amount={subtotal} size="md" />
      </div>
      <Button variant="primary" size="lg" className="w-full">
        Checkout
      </Button>
      <Button variant="ghost" size="sm" className="w-full">
        Continue shopping
      </Button>
    </div>
  );
}
