import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { useProducts, useCategories } from "@/hooks/use-api";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Catalog — My Store" },
      {
        name: "description",
        content:
          "Browse our full catalog: electronics, books, beauty, toys, fitness, clothing, and home goods. Quality products for everyday life.",
      },
      { property: "og:title", content: "Catalog — My Store" },
      {
        property: "og:description",
        content: "Every product we offer, in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

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

  if (productsLoading || categoriesLoading) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Container>
    );
  }

  if (productsError) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-destructive">Failed to load products. Please try again later.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Catalog</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Everything we offer
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Quality products across electronics, books, beauty, toys, fitness, clothing, and home goods. Prices are shown on the tag.
        </p>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <aside className="flex flex-col gap-8 border-t border-border pt-6">
          <Field label="Search" htmlFor="filter-search">
            <Input id="filter-search" placeholder="Search products…" />
          </Field>

          <Field label="Sort by" htmlFor="filter-sort">
            <Select
              id="filter-sort"
              defaultValue="featured"
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-asc", label: "Price — low to high" },
                { value: "price-desc", label: "Price — high to low" },
                { value: "newest", label: "Newest" },
              ]}
            />
          </Field>

          <Field label="Availability" htmlFor="filter-stock">
            <Select
              id="filter-stock"
              defaultValue="all"
              options={[
                { value: "all", label: "All products" },
                { value: "instock", label: "In stock only" },
                { value: "sale", label: "On sale" },
              ]}
            />
          </Field>

          <div className="flex flex-col gap-3">
            <span className="rule-label">Category</span>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">All</Badge>
              {categories.map((c) => (
                <Badge key={c.id}>{c.name}</Badge>
              ))}
            </div>
          </div>

          <Button variant="ghost" size="sm" className="self-start">
            Clear filters
          </Button>
        </aside>

        <section>
          <SectionHeading
            eyebrow={`${products.length} products`}
            title="The full collection"
            action={
              <Button variant="secondary" size="sm">
                View as list
              </Button>
            }
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={getCategoryName(product.categoryId)}
                priority={i < 2}
              />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
