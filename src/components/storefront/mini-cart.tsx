import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { useCart } from "@/hooks/use-api";
import type { CartItem } from "@/types";

export function MiniCartContents() {
  const { data: cartData, isLoading, refetch } = useCart();
  const cart = cartData?.data;
  const items = cart?.items || [];

  // Always refetch when the mini-cart opens to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  // Handle cleared cart state
  if (!cart || (cart.items === null && cart.subtotal === null)) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6">
      {items.map((item) => (
        <li key={item.cartItemId} className="flex gap-4">
          {item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={item.productName}
              width={1024}
              height={1024}
              loading="lazy"
              className="size-20 shrink-0 object-cover"
            />
          ) : (
            <div className="size-20 shrink-0 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">No image</span>
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Link
              to="/product/$slug"
              params={{ slug: item.productSlug }}
              className="font-display text-base leading-snug tracking-tight transition-colors hover:text-primary"
            >
              {item.productName}
            </Link>
            <p className="font-mono text-xs text-muted-foreground">Qty {item.quantity}</p>
            <PriceTag amount={(item.price || 0) * item.quantity} size="sm" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MiniCartFooter() {
  const { data: cartData, refetch } = useCart();
  const cart = cartData?.data;
  const subtotal = cart?.subtotal ?? 0;
  const itemCount = cart?.itemCount || 0;

  // Refetch when footer renders to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="rule-label">Subtotal</span>
        <PriceTag amount={subtotal || 0} size="md" />
      </div>
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={itemCount === 0}
        asChild
      >
        <Link to="/cart">Checkout</Link>
      </Button>
      <Button variant="ghost" size="sm" className="w-full" asChild>
        <Link to="/shop" search={{ category: "", sort: "featured" }}>Continue shopping</Link>
      </Button>
    </div>
  );
}
