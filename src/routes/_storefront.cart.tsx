import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceTag } from "@/components/ui/price-tag";
import { Container, SectionHeading } from "@/components/storefront/section";
import { Skeleton } from "@/components/ui/skeleton";
import { CartItemSkeleton } from "@/components/ui/skeletons";
import {
  useCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
  useProductThumbnailsBatch,
  useStockBatch,
} from "@/hooks/use-api";
import { resolveImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_storefront/cart")({
  head: () => ({
    meta: [
      { title: "Cart — My Store" },
      { name: "description", content: "Review your shopping cart" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { data: cartData, isLoading, error, refetch } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const cart = cartData?.data;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal ?? 0;
  const itemCount = cart?.itemCount || 0;

  // Fetch product thumbnails and stock in batch for cart items
  const productIds = items.map((i) => i.productId);
  const { data: thumbnailsData } = useProductThumbnailsBatch(productIds);
  const { data: stockData } = useStockBatch(productIds);
  const thumbnails = thumbnailsData?.data || [];
  const stockItems = stockData?.data || [];

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItem.mutateAsync({ productId, quantity: newQuantity });
      // Refetch to ensure we have the latest data
      refetch();
    } catch (error) {
      toast.error("Failed to update quantity");
      refetch(); // Refetch even on error to get current state
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success("Item removed from cart");
      refetch();
    } catch (error) {
      toast.error("Failed to remove item");
      refetch();
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync();
      toast.success("Cart cleared");
      refetch();
    } catch (error) {
      toast.error("Failed to clear cart");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <span className="rule-label">Cart</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Your bag
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Loading your items...
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <section>
            <div className="flex flex-col gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </aside>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <p className="text-destructive mb-4">Failed to load cart. Please try again later.</p>
          <Button onClick={() => refetch()} variant="secondary">
            Retry
          </Button>
        </div>
      </Container>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0 || itemCount === 0;

  if (isEmpty) {
    return (
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <span className="rule-label">Cart</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Your bag
          </h1>
        </header>
        <div className="mt-12 flex min-h-[50vh] flex-col items-center justify-center">
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="mt-2 text-muted-foreground">Add some products to get started.</p>
          <Button asChild variant="primary" size="lg" className="mt-8">
            <Link to="/shop">Start shopping</Link>
          </Button>
        </div>
      </Container>
    );
  }

  // Separate active and inactive items
  const activeItems = items.filter(item => item.isActive);
  const inactiveItems = items.filter(item => !item.isActive);

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Cart</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Your bag
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <section>
          <div className="flex flex-col gap-8">
            {/* Active items */}
            {activeItems.map((item) => {
              const itemThumbnail =
                thumbnails.find((t) => Number(t.productId) === item.productId)?.thumbnailUrl ||
                item.thumbnailUrl;
              const imageUrl = itemThumbnail ? resolveImageUrl(itemThumbnail) : null;

              const stockItem = stockItems.find(
                (s) =>
                  Number(s.product_id) === item.productId ||
                  Number((s as any).productId) === item.productId
              );
              const resolvedStock =
                stockItem !== undefined
                  ? stockItem.quantity
                  : typeof item.availableStock === "number" && item.availableStock > 0
                  ? item.availableStock
                  : undefined;
              const isOutOfStock = resolvedStock !== undefined ? resolvedStock <= 0 : false;
              const isOverStock =
                resolvedStock !== undefined && resolvedStock > 0
                  ? item.quantity > resolvedStock
                  : false;

              return (
                <div key={item.productId} className="flex gap-6 border-b border-border pb-8">
                  {imageUrl ? (
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      className="shrink-0"
                    >
                      <img
                        src={imageUrl}
                        alt={item.name}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        className="w-24 h-24 object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="w-24 h-24 shrink-0 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No image</span>
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.slug }}
                          className="font-display text-lg leading-snug tracking-tight transition-colors hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {resolvedStock !== undefined
                            ? resolvedStock > 0
                              ? `${resolvedStock} in stock`
                              : "Out of stock"
                            : "In stock"}
                        </p>
                        {/* isOverStock warning */}
                        {isOverStock && (
                          <p className="mt-1 text-sm text-destructive font-medium">
                            Only {resolvedStock} left — please reduce quantity
                          </p>
                        )}
                      </div>
                      <PriceTag amount={item.price * item.quantity} size="md" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`qty-${item.productId}`} className="sr-only">
                          Quantity
                        </label>
                        <Input
                          id={`qty-${item.productId}`}
                          type="number"
                          min="1"
                          max={resolvedStock !== undefined && resolvedStock > 0 ? resolvedStock : 999}
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value > 0) {
                              handleQuantityChange(item.productId, value);
                            }
                          }}
                          className="w-20"
                          disabled={updateCartItem.isPending}
                        />
                        <span className="text-sm text-muted-foreground">
                          × ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={removeFromCart.isPending}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Inactive items - show with remove button */}
            {inactiveItems.length > 0 && (
              <div className="border-t border-border pt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  No longer available
                </h3>
                {inactiveItems.map((item) => (
                  <div key={item.productId} className="flex gap-6 border-b border-border pb-6 last:border-0">
                    <div className="w-24 h-24 shrink-0 bg-muted flex items-center justify-center opacity-50">
                      <span className="text-muted-foreground text-xs">Unavailable</span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2 opacity-50">
                      <p className="font-medium line-through">{item.name}</p>
                      <p className="text-sm text-muted-foreground">This product is no longer available</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.productId)}
                        disabled={removeFromCart.isPending}
                        className="self-start"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeItems.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              disabled={clearCart.isPending}
              className="self-start"
            >
              Clear cart
            </Button>
          )}
        </section>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-lg tracking-tight">Order summary</h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <PriceTag amount={subtotal || 0} size="md" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <PriceTag amount={subtotal || 0} size="lg" />
              </div>
            </div>

            <Button variant="primary" size="lg" className="mt-6 w-full" asChild>
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>

            <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  );
}
