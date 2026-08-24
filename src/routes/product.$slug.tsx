import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Select, Field } from "@/components/ui/field";
import { PriceTag } from "@/components/ui/price-tag";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { StockBadge } from "@/components/storefront/stock-badge";
import { ContentCard } from "@/components/storefront/content-card";
import { useProduct, useProducts, useCategories } from "@/hooks/use-api";

export const Route = createFileRoute("/product/$slug")({
  head: () => ({
    meta: [
      { title: "Product — My Store" },
      { name: "description", content: "Quality products for everyday life" },
      { property: "og:title", content: "Product — My Store" },
      { property: "og:description", content: "Quality products for everyday life" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product, isLoading: productLoading, error: productError } = useProduct(slug);
  const { data: productsData } = useProducts({ limit: 12 });
  const { data: categoriesData } = useCategories();

  // Update document title dynamically
  if (product) {
    document.title = `${product.name} — My Store`;
  }

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

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

  // Get related products (same category, excluding current product)
  const related = product
    ? products
      .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
      .slice(0, 3)
    : [];

  if (productLoading) {
    return (
      <Container className="py-10 sm:py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </Container>
    );
  }

  if (productError || !product) {
    return (
      <Container className="py-10 sm:py-16">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-destructive">Product not found. Please try again.</p>
        </div>
      </Container>
    );
  }

  const soldOut = product.stockQuantity <= 0;
  const categoryName = getCategoryName(product.categoryId);
  const imageUrl = product.thumbnailUrl || "/placeholder.jpg";

  return (
    <Container className="py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link to="/shop" className="rule-label transition-colors hover:text-foreground">
          Catalog
        </Link>
        <span className="rule-label">/</span>
        <span className="rule-label">{categoryName}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative bg-surface">
            <img
              src={imageUrl}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
            <span className="absolute bottom-5 right-5">
              <PriceTag amount={product.price} size="lg" />
            </span>
          </div>
        </div>

        {/* detail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="rule-label">{categoryName}</span>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PriceTag amount={product.price} size="lg" />
            <StockBadge stock={product.stockQuantity} />
          </div>

          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            Quality product carefully selected for our collection.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <Field label="Quantity" htmlFor="pdp-qty" className="sm:w-28">
              <Select
                id="pdp-qty"
                defaultValue="1"
                disabled={soldOut}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            </Field>
            <Button variant="primary" size="lg" disabled={soldOut} className="flex-1">
              {soldOut ? "Sold out" : "Add to bag"}
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
              />
            ))}
          </div>
        </section>
      )}

      <ContentCard
        eyebrow="Quality assurance"
        title="Every product meets our standards"
        className="mt-20 max-w-3xl"
        footer={
          <Button variant="link">
            Read about our quality process
          </Button>
        }
      >
        We carefully select each product for quality and value. Most items ship within 1-2 business days.
      </ContentCard>
    </Container>
  );
}
