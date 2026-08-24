import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { ContentCard } from "@/components/storefront/content-card";
import { useProducts, useCategories } from "@/hooks/use-api";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Store — Quality goods for everyday life" },
      {
        name: "description",
        content:
          "A curated marketplace featuring electronics, books, beauty, toys, fitness, clothing, and home goods. Quality products, carefully selected.",
      },
      { property: "og:title", content: "My Store — Quality goods for everyday life" },
      {
        property: "og:description",
        content: "Discover our curated collection across electronics, books, beauty, toys, fitness, clothing, and home goods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({ limit: 8 });
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const featured = products.slice(0, 4);
  const hairloom = products[0];

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) return category.name;

    // Check in subcategories
    for (const cat of categories) {
      const subCat = cat.children.find(c => c.id === categoryId);
      if (subCat) return subCat.name;
    }

    return "General";
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Failed to load data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* hero */}
      <section className="border-b border-border">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
          <div className="max-w-xl">
            <span className="rule-label">New arrivals — 2026</span>
            <h1 className="mt-6 font-display text-[2.75rem] font-normal leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Quality goods
              <span className="italic"> carefully </span>
              curated.
            </h1>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              From electronics and books to beauty, toys, fitness, clothing, and home goods — thoughtfully selected products for everyday life.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link to="/shop">Shop the collection</Link>
              </Button>
              {hairloom && (
                <Button asChild variant="link">
                  <Link to="/product/$slug" params={{ slug: hairloom.slug }}>
                    View featured item
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <img
              src={hero}
              alt="Quality products for everyday life"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
            />
            {hairloom && (
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 sm:left-8">
                <span className="border border-border bg-card px-4 py-3 font-display text-sm tracking-tight">
                  {hairloom.name}
                </span>
                <PriceTag amount={hairloom.price} size="md" />
              </div>
            )}
          </div>
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
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div className="overflow-hidden bg-surface">
                <div className="aspect-[4/5] w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">{cat.name}</span>
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-normal tracking-tight transition-colors group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.children.length > 0 ? `${cat.children.length} subcategories` : "Browse products"}
              </p>
            </Link>
          ))}
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
            />
          ))}
        </div>
      </Container>

      {/* editorial note */}
      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-8 lg:grid-cols-3">
          <ContentCard eyebrow="Quality" title="Carefully selected products">
            Every item is chosen for its quality, durability, and value. We believe in products that stand the test of time.
          </ContentCard>
          <ContentCard eyebrow="Variety" title="Categories for every need">
            From electronics and books to beauty, toys, fitness, clothing, and home goods — find what you're looking for.
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
            Easy returns, secure checkout, and dedicated support to ensure your shopping experience is seamless.
          </ContentCard>
        </div>
      </Container>
    </>
  );
}
