import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { ContentCard } from "@/components/storefront/content-card";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSkeleton, ProductCardSkeleton, CategoryCardSkeleton } from "@/components/ui/skeletons";
import { useProducts, useCategories, useProductThumbnailsBatch, useStockBatch } from "@/hooks/use-api";
import { getProductPrimaryImage, getProductIdNumber, getProductStock, type Category } from "@/types";
import { resolveImageUrl } from "@/lib/utils";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/_storefront/")({
  head: () => ({
    meta: [
      { title: "My Store — Quality goods for everyday life" },
      {
        name: "description",
        content:
          "A curated marketplace featuring electronics, books, beauty, toys, fitness, clothing, and home goods. Quality products, carefully selected.",
      },
      {
        property: "og:title",
        content: "My Store — Quality goods for everyday life",
      },
      {
        property: "og:description",
        content:
          "Discover our curated collection across electronics, books, beauty, toys, fitness, clothing, and home goods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({ page: 1, pageSize: 50 });
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  // Fetch product thumbnails and stock in batch to avoid N+1 pattern
  const productIds = products.map(p => getProductIdNumber(p));
  const { data: thumbnailsData } = useProductThumbnailsBatch(productIds);
  const thumbnails = thumbnailsData?.data || [];
  const { data: stockData } = useStockBatch(productIds);
  const stockItems = stockData?.data || [];

  // Force re-initialization on mount using a timestamp
  const [mountTimestamp] = useState(() => Date.now());

  // Random selections state
  const [hairloom, setHairloom] = useState<typeof products[0] | null>(null);
  const [featured, setFeatured] = useState<typeof products>([]);
  const [categoryImageMap, setCategoryImageMap] = useState<Map<number, string>>(new Map());

  // Initialize random selections when data is available
  useEffect(() => {
    if (productsLoading || categoriesLoading || productsError || categoriesError) return;
    if (products.length === 0) return;

    // Filter in-stock products using inventory service data, fallback to all products if stock data not ready
    const inStockProducts = stockItems.length > 0
      ? products.filter((p) => getProductStock(getProductIdNumber(p), stockItems) > 0)
      : products;
    const pool = inStockProducts.length > 0 ? inStockProducts : products;

    // Pick random hero product
    const randomIndex = Math.floor(Math.random() * pool.length);
    setHairloom(pool[randomIndex] || null);

    // Helper to map a categoryId to its top-level parent category ID
    const getTopCategoryId = (categoryId: number): number => {
      for (const cat of categories) {
        if (cat.id === categoryId) return cat.id;
        if (cat.children.some((child) => child.id === categoryId)) return cat.id;
      }
      return categoryId;
    };

    // Build a category-diverse list of 4 featured products
    const selectedFeatured: typeof products = [];
    const seenCategoryIds = new Set<number>();

    // First pass: Pick 1 product per distinct category
    for (const product of pool) {
      if (selectedFeatured.length >= 4) break;
      const topCatId = getTopCategoryId(product.categoryId);
      if (!seenCategoryIds.has(topCatId)) {
        seenCategoryIds.add(topCatId);
        selectedFeatured.push(product);
      }
    }

    // Fallback pass: Fill remaining slots if fewer than 4 distinct categories exist in stock
    if (selectedFeatured.length < 4) {
      for (const product of pool) {
        if (selectedFeatured.length >= 4) break;
        if (!selectedFeatured.some((p) => p.id === product.id)) {
          selectedFeatured.push(product);
        }
      }
    }

    setFeatured(selectedFeatured);

    // Helper to collect all category IDs including nested children
    const getAllCategoryIds = (cat: Category): number[] => {
      const ids = [cat.id];
      cat.children.forEach((child) => {
        ids.push(...getAllCategoryIds(child));
      });
      return ids;
    };

    // Fallback placeholder images for categories with no products
    const categoryFallbackImages: Record<string, string> = {
      electronics:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwyfHx8MTc4NzU5ODU4N3ww&ixlib=rb-4.1.0&q=80&w=400",
      fashion:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZmFzaGlvbiUyMGNsb3RoaW5nfGVufDB8Mnx8fDE3ODc1OTg1ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
      "home-kitchen":
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8aG9tZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc4NzU5ODU4OXww&ixlib=rb-4.1.0&q=80&w=400",
      "sports-outdoors":
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8c3BvcnRzJTIwb3V0ZG9vcnN8ZW58MHwyfHx8MTc4NzU5ODU5MXww&ixlib=rb-4.1.0&q=80&w=400",
      "toys-games":
        "https://images.unsplash.com/photo-1558060370-d644479cb6b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8dG95cyUyMGdhbWVzfGVufDB8Mnx8fDE3ODc1OTg1OTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    };

    // Generate category image mapping using media thumbnails
    const map = new Map<number, string>();

    categories.forEach((category) => {
      const categoryIds = getAllCategoryIds(category);
      const categoryProducts = products.filter((p) => categoryIds.includes(p.categoryId));

      let foundImage: string | null = null;
      if (categoryProducts.length > 0) {
        for (const cp of categoryProducts) {
          const cpId = getProductIdNumber(cp);
          const thumb = thumbnails.find((t) => t.productId === cpId)?.thumbnailUrl;
          if (thumb) {
            foundImage = resolveImageUrl(thumb);
            break;
          }
        }
      }

      if (foundImage) {
        map.set(category.id, foundImage);
      } else {
        const fallback = categoryFallbackImages[category.slug];
        if (fallback) {
          map.set(category.id, fallback);
        }
      }
    });

    setCategoryImageMap(map);
  }, [products, categories, thumbnails, stockItems, productsLoading, categoriesLoading, productsError, categoriesError, mountTimestamp]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) return category.name;

    // Check in subcategories
    for (const cat of categories) {
      const subCat = cat.children.find((c) => c.id === categoryId);
      if (subCat) return subCat.name;
    }

    return "General";
  };

  // Helper function to get category image from the map
  const getCategoryImage = (category: Category) => {
    return categoryImageMap.get(category.id) || null;
  };

  if (productsLoading || categoriesLoading) {
    return (
      <>
        {/* hero skeleton */}
        <section className="border-b border-border">
          <Container className="py-14 lg:py-24">
            <HeroSkeleton />
          </Container>
        </section>

        {/* categories skeleton */}
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Categories"
            title="Browse by category"
            action={<Skeleton className="h-9 w-32 rounded-md" />}
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </Container>

        {/* featured products skeleton */}
        <Container className="pb-24 sm:pb-32">
          <SectionHeading
            eyebrow="Featured"
            title="This month's highlights"
            action={<Skeleton className="h-9 w-32 rounded-md" />}
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </Container>

        {/* editorial note skeleton */}
        <Container className="pb-24 sm:pb-32">
          <div className="grid gap-8 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </Container>
      </>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">
            Failed to load data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* hero */}
      <section className="border-b border-border hero-gradient">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24 relative z-10">
          <div className="max-w-xl">
            <span className="rule-label">New arrivals — 2026</span>
            <h1 className="mt-6 font-display text-[3.5rem] font-normal leading-[0.95] tracking-tight sm:text-[5rem] lg:text-[6.5rem]">
              Quality goods
              <span className="italic"> carefully </span>
              curated.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              From electronics and books to beauty, toys, fitness, clothing, and
              home goods — thoughtfully selected products for everyday life.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link to="/shop">Shop the collection</Link>
              </Button>
              {hairloom && (
                <Button asChild variant="link">
                  <Link to="/product/$slug" params={{ slug: hairloom.slug }}>
                    View {hairloom.name}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {hairloom ? (
            (() => {
              const hairloomThumbnail = thumbnails.find(
                (t) => t.productId === getProductIdNumber(hairloom)
              )?.thumbnailUrl;
              const heroSrc = hairloomThumbnail ? resolveImageUrl(hairloomThumbnail) : hero;

              return (
                <Link
                  to="/product/$slug"
                  params={{ slug: hairloom.slug }}
                  className="group relative block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  aria-label={`View ${hairloom.name}`}
                >
                  <img
                    src={heroSrc}
                    alt={hairloom.name}
                    width={1600}
                    height={1200}
                    className="aspect-[4/3] w-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-[1.01] hero-entrance"
                  />
                  <div className="absolute -bottom-5 left-5 flex items-center gap-3 sm:left-8">
                    <span className="border border-border bg-card px-4 py-3 font-display text-sm tracking-tight transition-colors group-hover:text-primary">
                      {hairloom.name}
                    </span>
                    <PriceTag amount={hairloom.price} size="md" />
                  </div>
                </Link>
              );
            })()
          ) : (
            <div className="relative">
              <img
                src={hero}
                alt="Quality products for everyday life"
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full object-cover rounded-md hero-entrance"
              />
            </div>
          )}
        </Container>
      </section>

      {/* categories */}
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Categories"
          title="Browse by category"
          action={
            <Button asChild variant="secondary" size="sm">
              <Link to="/shop">All categories</Link>
            </Button>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((cat) => {
            const categoryImage = getCategoryImage(cat);

            return (
              <Link
                key={cat.id}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <div className="overflow-hidden bg-surface">
                  {categoryImage ? (
                    <img
                      src={categoryImage}
                      alt={cat.name}
                      width={1024}
                      height={1280}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="aspect-[4/5] w-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        {cat.name}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-normal tracking-tight transition-colors group-hover:text-primary">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.children.length > 0
                    ? `${cat.children.length} subcategories`
                    : "Browse products"}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* featured products */}
      <Container className="pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="Featured"
          title="This month's highlights"
          action={
            <Button asChild variant="secondary" size="sm">
              <Link to="/shop">View all products</Link>
            </Button>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={getCategoryName(product.categoryId)}
              priority
              showAddToCart
              thumbnails={thumbnails}
              stockItems={stockItems}
            />
          ))}
        </div>
      </Container>

      {/* editorial note */}
      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-8 lg:grid-cols-3">
          <ContentCard eyebrow="Quality" title="Carefully selected products">
            Every item is chosen for its quality, durability, and value. We
            believe in products that stand the test of time.
          </ContentCard>
          <ContentCard eyebrow="Variety" title="Categories for every need">
            From electronics and books to beauty, toys, fitness, clothing, and
            home goods — find what you're looking for.
          </ContentCard>
          <ContentCard
            eyebrow="Service"
            title="Customer satisfaction first"
            footer={
              <div className="flex flex-wrap gap-2">
                <Badge>Free shipping over $200</Badge>
                <Badge variant="sale">Seasonal sale on now</Badge>
              </div>
            }
          >
            Easy returns, secure checkout, and dedicated support to ensure your
            shopping experience is seamless.
          </ContentCard>
        </div>
      </Container>
    </>
  );
}
