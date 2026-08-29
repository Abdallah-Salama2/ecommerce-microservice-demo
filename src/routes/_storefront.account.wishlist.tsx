import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { useProducts } from "@/hooks/use-api";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useWishlist } from "@/store/wishlist";

export const Route = createFileRoute("/_storefront/account/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — My Store" },
      {
        name: "description",
        content:
          "Your saved products — keep track of items you love and add them to your cart when you're ready.",
      },
    ],
  }),
  component: WishlistPage,
});

/**
 * WishlistPage — consumes shared reactive useWishlist store.
 *
 * TODO: Replace with backend API when wishlist endpoint is available.
 */
function WishlistPage() {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();

  const { data: productsData, isLoading } = useProducts({
    page: 1,
    limit: 100,
  });

  const allProducts = productsData?.data || [];
  const wishlistProducts = allProducts.filter((p) => wishlistIds.has(p.id));

  return (
    <ProtectedRoute>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <span className="rule-label">Your wishlist</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Saved items
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Products you've saved for later. Add them to your cart when you're
            ready.
          </p>
        </header>

        <div className="mt-14">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading…</p>
            </div>
          ) : wishlistProducts.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center rounded-lg border border-border py-20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-6 text-lg font-medium">
                Your wishlist is empty
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse our catalog and save items you love.
              </p>
              <Button variant="primary" size="lg" className="mt-8" asChild>
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <SectionHeading
                eyebrow={`${wishlistProducts.length} item${wishlistProducts.length !== 1 ? "s" : ""}`}
                title="Your saved products"
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearWishlist}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear all
                  </Button>
                }
              />
              <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="group/wish relative">
                    <ProductCard product={product} showAddToCart />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity group-hover/wish:opacity-100"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Suggested products when wishlist is empty */}
          {wishlistProducts.length === 0 && allProducts.length > 0 && (
            <section className="mt-20">
              <SectionHeading
                eyebrow="Discover"
                title="You might like these"
              />
              <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddToCart
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </ProtectedRoute>
  );
}
