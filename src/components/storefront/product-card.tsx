import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge, SaleBadge } from "@/components/storefront/stock-badge";
import type { Product, ProductThumbnail, StockBatchItem } from "@/types";
import { getProductPrimaryImage, getProductIdNumber, getProductThumbnail } from "@/types";
import { cn, resolveImageUrl } from "@/lib/utils";
import { useAddToCart } from "@/hooks/use-api";
import { useWishlist } from "@/store/wishlist";
import { toast } from "sonner";

/**
 * ProductCard — reusable across home, catalog, related, and future pages.
 * Price is always rendered through <PriceTag />.
 */
export function ProductCard({
  product,
  categoryName,
  priority = false,
  className,
  showAddToCart = false,
  thumbnails = [],
  stock,
  stockItems,
}: {
  product: Product;
  categoryName?: string;
  priority?: boolean;
  className?: string;
  showAddToCart?: boolean;
  thumbnails?: ProductThumbnail[];
  stock?: number;
  stockItems?: StockBatchItem[];
}) {
  // All hooks must run unconditionally at the top of the component
  const addToCart = useAddToCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const productIdNum = getProductIdNumber(product);

  // Resolve thumbnail from batch thumbnails if provided, or fallback to product primary image
  const thumbnailItem = thumbnails && thumbnails.length > 0
    ? getProductThumbnail(product, thumbnails)
    : null;
  const primaryImg = getProductPrimaryImage(product);
  const rawImageUrl = thumbnailItem || primaryImg.thumbnailUrl;
  const imageUrl = rawImageUrl ? resolveImageUrl(rawImageUrl) : "";
  const imageAlt = primaryImg.altText || product.name;

  const onSale = false; // API doesn't provide compareAt price

  // Find this product's stock entry directly from the batch.
  // Number() coercion handles APIs that return product_id as a string.
  // resolvedStock stays undefined (not 0) when: stockItems is empty/loading,
  // or when this product has no entry in the batch yet.
  const batchItem = Array.isArray(stockItems) && stockItems.length > 0
    ? stockItems.find(
        (i) => Number(i.product_id) === productIdNum || Number((i as any).productId) === productIdNum
      )
    : undefined;

  const resolvedStock =
    stock !== undefined
      ? stock
      : batchItem !== undefined
      ? batchItem.quantity
      : undefined;

  const isOutOfStock = resolvedStock !== undefined ? resolvedStock <= 0 : false;
  const isSaved = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id: product.id, name: product.name });
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addToCart.mutateAsync({
        productId: getProductIdNumber(product),
        quantity: 1,
      });
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <article className={cn("group relative flex flex-col h-full", className)}>
      <div className="relative overflow-hidden bg-surface rounded-sm">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={product.name}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              width={1024}
              height={1024}
              loading={priority ? "eager" : "lazy"}
              className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="aspect-square w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </Link>

        {/* Wishlist toggle button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="group/wish absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isSaved
                ? "fill-primary text-primary"
                : "text-foreground/70 group-hover/wish:text-foreground"
            )}
          />
        </button>

        {onSale ? (
          <span className="absolute left-4 top-4">
            <SaleBadge />
          </span>
        ) : null}
        {isOutOfStock && resolvedStock !== undefined && (
          <span className="absolute left-4 top-4">
            <StockBadge stock={resolvedStock} showCount={false} />
          </span>
        )}

        {/* price tag chip — signature element */}
        <span className="absolute bottom-4 right-4">
          <PriceTag amount={product.price} size="md" />
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-normal leading-snug tracking-tight min-h-[2.75rem] line-clamp-2">
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {product.name}
              </Link>
            </h3>
            {resolvedStock !== undefined && (
              <StockBadge stock={resolvedStock} showCount={true} />
            )}
          </div>
          {categoryName && <p className="rule-label mt-2">{categoryName}</p>}
        </div>

        <div className="flex-1 min-h-[1rem]" />

        {showAddToCart && !isOutOfStock && (
          <Button
            variant="secondary"
            size="sm"
            className="w-full mt-4"
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
          >
            {addToCart.isPending ? "Adding..." : "Add to cart"}
          </Button>
        )}
      </div>
    </article>
  );
}
