import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, Field } from "@/components/ui/field";
import { PriceTag } from "@/components/ui/price-tag";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { StockBadge } from "@/components/storefront/stock-badge";
import { ContentCard } from "@/components/storefront/content-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PDPSkeleton, ProductCardSkeleton } from "@/components/ui/skeletons";
import {
  useProduct,
  useProducts,
  useCategories,
  useAddToCart,
  useProductImages,
  useStockBatch,
  useProductThumbnailsBatch,
} from "@/hooks/use-api";
import {
  getProductIdNumber,
  getProductPrimaryImage,
  getProductStock,
} from "@/types";
import { resolveImageUrl } from "@/lib/utils";
import { useWishlist } from "@/store/wishlist";
import { toast } from "sonner";

export const Route = createFileRoute("/_storefront/product/$slug")({
  head: () => ({
    meta: [
      { title: "Product — My Store" },
      { name: "description", content: "Quality products for everyday life" },
      { property: "og:title", content: "Product — My Store" },
      {
        property: "og:description",
        content: "Quality products for everyday life",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(slug);
  const { data: productsData } = useProducts({ pageSize: 12 });
  const { data: categoriesData } = useCategories();
  const addToCart = useAddToCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [userSelectedImageIndex, setUserSelectedImageIndex] = useState<
    number | null
  >(null);

  const productId = product ? getProductIdNumber(product) : null;
  const { data: imagesData, isLoading: imagesLoading } = useProductImages(
    productId || 0,
  );
  const productImages = imagesData?.data || [];

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  // Get related products
  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) => p.id !== product.id && p.categoryId === product.categoryId,
      )
      .slice(0, 3);
  }, [product, products]);

  // Combine main product ID with related IDs for single batch requests (ALL HOOKS MUST RUN UNCONDITIONALLY AT TOP)
  const allProductIds = useMemo(() => {
    const ids: number[] = [];
    if (productId) ids.push(productId);
    for (const p of related) {
      const rId = getProductIdNumber(p);
      if (!ids.includes(rId)) ids.push(rId);
    }
    return ids;
  }, [productId, related]);

  const { data: thumbnailsData } = useProductThumbnailsBatch(allProductIds);
  const thumbnails = thumbnailsData?.data || [];
  const { data: stockData } = useStockBatch(allProductIds);
  const stockItems = stockData?.data || [];

  const stockItem = stockItems.find(
    (item) =>
      Number(item.product_id) === productId || Number((item as any).productId) === productId,
  );
  const currentStock = stockItem ? stockItem.quantity : undefined;

  // Update document title dynamically
  useEffect(() => {
    if (product) {
      document.title = `${product.name} — My Store`;
    }
  }, [product]);

  // Prepare images array sorted by sortOrder
  // The per-product endpoint (GET /products/:id/images) already returns only this product's images;
  // no status filtering here — filtering by 'processed' silently drops images with any other status
  // (e.g. 'active', null, or rows added before the status field existed).
  const galleryImages = useMemo(() => {
    if (productImages.length > 0) {
      // Sort with isPrimary first, then by sortOrder
      return [...productImages].sort((a, b) => {
        if (a.isPrimary && !b.isPrimary) return -1;
        if (!a.isPrimary && b.isPrimary) return 1;
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
      });
    }

    // Fallback to batch thumbnail for the main product when media-service has no records yet
    const mainThumbnail = thumbnails.find((t) => t.productId === productId)?.thumbnailUrl;
    const resolvedThumb = mainThumbnail || "/placeholder.jpg";

    return [
      {
        id: "primary-thumb",
        thumbnailUrl: resolvedThumb,
        previewUrl: resolvedThumb,
        altText: product?.name || "Product",
        isPrimary: true,
        sortOrder: 0,
        status: "processed" as const,
      },
    ];
  }, [product, productImages, thumbnails, productId]);

  // Find primary image index (isPrimary === true)
  const primaryIndex = useMemo(() => {
    const idx = galleryImages.findIndex((img) => img.isPrimary);
    return idx >= 0 ? idx : 0;
  }, [galleryImages]);

  // Default to primaryIndex unless user manually selected a thumbnail
  const currentImageIndex =
    userSelectedImageIndex !== null &&
    userSelectedImageIndex < galleryImages.length
      ? userSelectedImageIndex
      : primaryIndex;

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) return category.name;

    for (const cat of categories) {
      const subCat = cat.children?.find((c) => c.id === categoryId);
      if (subCat) return subCat.name;
    }

    return "General";
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart.mutateAsync({
        productId: getProductIdNumber(product),
        quantity,
      });
      toast.success(`Added ${quantity} ${product.name} to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (productLoading || imagesLoading) {
    return (
      <Container className="py-10 sm:py-16">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <PDPSkeleton />

        {/* Related products skeleton */}
        <section className="mt-28">
          <SectionHeading
            eyebrow="Pairs well with"
            title="Related products"
            action={<Skeleton className="h-9 w-32 rounded-md" />}
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <ContentCard
          eyebrow="Quality assurance"
          title="Every product meets our standards"
          className="mt-20 max-w-3xl"
          footer={<Skeleton className="h-10 w-48 rounded-md" />}
        >
          <Skeleton className="h-16 w-full" />
        </ContentCard>
      </Container>
    );
  }

  if (productError || !product) {
    return (
      <Container className="py-10 sm:py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-destructive">
            Product not found. Please try again.
          </p>
        </div>
      </Container>
    );
  }

  const soldOut = currentStock !== undefined ? currentStock <= 0 : false;
  const categoryName = getCategoryName(product.categoryId);
  const isSaved = isInWishlist(product.id);
  const fallbackImg = {
    thumbnailUrl: "/placeholder.jpg",
    previewUrl: "/placeholder.jpg",
    altText: product.name,
    isPrimary: false,
    sortOrder: 0,
    status: "processed" as const,
    id: "fallback",
  };
  const activeImage =
    galleryImages[currentImageIndex] || galleryImages[0] || fallbackImg;

  return (
    <Container className="py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          to="/shop"
          className="rule-label transition-colors hover:text-foreground"
        >
          Catalog
        </Link>
        <span className="rule-label">/</span>
        <span className="rule-label">{categoryName}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative bg-surface rounded-lg overflow-hidden">
            <img
              src={resolveImageUrl(activeImage.previewUrl)}
              alt={activeImage.altText || product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
            <span className="absolute bottom-5 right-5">
              <PriceTag amount={product.price} size="lg" />
            </span>
          </div>

          {/* Thumbnail strip — rendered dynamically if multiple images exist */}
          {galleryImages.length > 1 && (
            <div className="flex flex-wrap gap-4">
              {galleryImages.map((img, i) => (
                <button
                  key={img.id || i}
                  type="button"
                  onClick={() => setUserSelectedImageIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative w-24 h-24 overflow-hidden rounded-md bg-surface transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    currentImageIndex === i
                      ? "ring-2 ring-primary"
                      : "opacity-70"
                  }`}
                >
                  <img
                    src={resolveImageUrl(img.thumbnailUrl)}
                    alt={img.altText || `${product.name} view ${i + 1}`}
                    width={200}
                    height={200}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* detail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="rule-label">{categoryName}</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PriceTag amount={product.price} size="lg" />
            <StockBadge stock={currentStock} />
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div>
              <label
                htmlFor="pdp-qty"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Quantity
              </label>
              <div className="flex h-11 items-center rounded-md border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={soldOut || quantity <= 1}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  id="pdp-qty"
                  type="number"
                  min="1"
                  max={currentStock !== undefined && currentStock > 0 ? currentStock : 9999}
                  value={quantity}
                  disabled={soldOut}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      const maxLimit = currentStock !== undefined && currentStock > 0 ? currentStock : 9999;
                      setQuantity(Math.min(maxLimit, Math.max(1, val)));
                    } else if (e.target.value === "") {
                      setQuantity(1);
                    }
                  }}
                  className="h-full w-14 border-0 bg-transparent text-center text-sm font-semibold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={
                    soldOut ||
                    (currentStock !== undefined && currentStock > 0
                      ? quantity >= currentStock
                      : false)
                  }
                  onClick={() => {
                    const maxLimit =
                      currentStock !== undefined && currentStock > 0
                        ? currentStock
                        : 9999;
                    setQuantity((prev) => Math.min(maxLimit, prev + 1));
                  }}
                  className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled={soldOut || addToCart.isPending}
              className="flex-1 h-11"
              onClick={handleAddToCart}
            >
              {soldOut
                ? "Sold out"
                : addToCart.isPending
                  ? "Adding..."
                  : "Add to bag"}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() =>
                toggleWishlist({ id: product.id, name: product.name })
              }
              className="px-4"
              title={isSaved ? "Saved to wishlist" : "Save to wishlist"}
            >
              <Heart
                className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`}
              />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Free shipping over $200</Badge>
            <Badge>30-day returns</Badge>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <SectionHeading
            eyebrow="Pairs well with"
            title="Related products"
            action={
              <Button asChild variant="secondary" size="sm">
                <Link to="/shop">Browse catalog</Link>
              </Button>
            }
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                categoryName={getCategoryName(p.categoryId)}
                thumbnails={thumbnails}
                stockItems={stockItems}
              />
            ))}
          </div>
        </section>
      )}

      <ContentCard
        eyebrow="Quality assurance"
        title="Every product meets our standards"
        className="mt-20 max-w-3xl"
        footer={<Button variant="link">Read about our quality process</Button>}
      >
        We carefully select each product for quality and value. Most items ship
        within 1-2 business days.
      </ContentCard>
    </Container>
  );
}
