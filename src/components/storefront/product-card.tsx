import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge, SaleBadge } from "@/components/storefront/stock-badge";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useAddToCart } from "@/hooks/use-api";
import { getProductIdNumber } from "@/types";
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
}: {
  product: Product;
  categoryName?: string;
  priority?: boolean;
  className?: string;
  showAddToCart?: boolean;
}) {
  const imageUrl = product.thumbnailUrl || "/placeholder.jpg";
  const onSale = false; // API doesn't provide compareAt price
  const isOutOfStock = product.stockQuantity === 0;
  const addToCart = useAddToCart();

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
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        aria-label={product.name}
      >
        <div className="relative overflow-hidden bg-surface">
          {product.thumbnailUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
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
          {onSale ? (
            <span className="absolute left-4 top-4">
              <SaleBadge />
            </span>
          ) : null}
          {isOutOfStock && (
            <span className="absolute left-4 top-4">
              <StockBadge stock={0} showCount={false} />
            </span>
          )}

          {/* price tag chip — signature element */}
          <span className="absolute bottom-4 right-4">
            <PriceTag amount={product.price} size="md" />
          </span>
        </div>
      </Link>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-normal leading-snug tracking-tight">
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {product.name}
            </Link>
          </h3>
          {categoryName && <p className="rule-label mt-2">{categoryName}</p>}
        </div>
        {!isOutOfStock && <StockBadge stock={product.stockQuantity} showCount={false} />}
      </div>

      {showAddToCart && !isOutOfStock && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-4 w-full"
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
        >
          {addToCart.isPending ? "Adding..." : "Add to cart"}
        </Button>
      )}
    </article>
  );
}
