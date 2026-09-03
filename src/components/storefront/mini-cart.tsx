import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { useCart, useProductThumbnailsBatch } from "@/hooks/use-api";
import { resolveImageUrl } from "@/lib/utils";
import type { CartItem } from "@/types";

export function MiniCartContents() {
  const { data: cartData, isLoading, refetch } = useCart();
  const cart = cartData?.data;
  const items = cart?.items || [];

  // Always refetch when the mini-cart opens to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Only show active items in mini-cart
  const activeItems = items.filter(item => item.isActive);
  const activeProductIds = activeItems.map(item => item.productId);
  const { data: thumbnailsData } = useProductThumbnailsBatch(activeProductIds);
  const thumbnails = thumbnailsData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  // Handle cleared cart state
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  if (activeItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-6">
      {activeItems.map((item) => {
        const itemThumbnail = thumbnails.find(t => t.productId === item.productId)?.thumbnailUrl || item.thumbnailUrl;
        const imageUrl = itemThumbnail ? resolveImageUrl(itemThumbnail) : null;

        return (
          <li key={item.productId} className="flex gap-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.name}
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
                params={{ slug: item.slug }}
                className="font-display text-base leading-snug tracking-tight transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
              <p className="font-mono text-xs text-muted-foreground">Qty {item.quantity}</p>
              <PriceTag amount={item.price * item.quantity} size="sm" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function MiniCartFooter() {
  const { data: cartData, refetch } = useCart();
  const cart = cartData?.data;
  const subtotal = cart?.subtotal ?? 0;
  const itemCount = cart?.itemCount ?? 0;

  // Refetch when footer renders to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="rule-label">Subtotal</span>
        <PriceTag amount={subtotal} size="md" />
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
