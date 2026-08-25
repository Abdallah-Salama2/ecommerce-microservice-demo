import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { useProducts, useCategories } from "@/hooks/use-api";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: String(search.category ?? ""),
    sort: String(search.sort ?? "featured"),
  }),
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
  const search = useSearch({ from: "/shop" });
  const navigate = Route.useNavigate();

  const categoryFilter = search.category;
  const sortOrder = search.sort;

  // Local state for search (no URL params, no API calls)
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products (we'll filter client-side)
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
    page: 1,
    limit: 100, // Get more products for client-side filtering
    categoryId: categoryFilter ? Number(categoryFilter) : undefined,
  });
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const pagination = productsData?.pagination;

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

  // Client-side filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    // featured = no sorting, keep original order

    return result;
  }, [products, searchTerm, sortOrder]);

  const handleCategoryChange = (categoryId: string) => {
    navigate({
      to: "/shop",
      search: { ...search, category: categoryId }
    });
  };

  const handleSortChange = (sort: string) => {
    navigate({
      to: "/shop",
      search: { ...search, sort }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    navigate({
      to: "/shop",
      search: { category: "", sort: "featured" }
    });
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
            <Input
              id="filter-search"
              placeholder="Search products…"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Field>

          <Field label="Sort by" htmlFor="filter-sort">
            <Select
              id="filter-sort"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-asc", label: "Price — low to high" },
                { value: "price-desc", label: "Price — high to low" },
                { value: "newest", label: "Newest" },
              ]}
            />
          </Field>

          <div className="flex flex-col gap-3">
            <span className="rule-label">Category</span>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={categoryFilter === "" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryChange("")}
              >
                All
              </Badge>
              {categories.map((c) => (
                <Badge
                  key={c.id}
                  variant={categoryFilter === c.id.toString() ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryChange(c.id.toString())}
                >
                  {c.name}
                </Badge>
              ))}
            </div>
          </div>

          {(categoryFilter || searchTerm) && (
            <Button variant="ghost" size="sm" className="self-start" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </aside>

        <section>
          <SectionHeading
            eyebrow={`${filteredAndSortedProducts.length} products`}
            title="The full collection"
          />
          {filteredAndSortedProducts.length === 0 ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
                <Button variant="link" onClick={clearFilters} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
              {filteredAndSortedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={getCategoryName(product.categoryId)}
                  priority={i < 2}
                  showAddToCart
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
