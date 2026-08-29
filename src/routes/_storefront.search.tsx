import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select } from "@/components/ui/field";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/ui/skeletons";
import { useProducts, useCategories } from "@/hooks/use-api";

export const Route = createFileRoute("/_storefront/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    sort: String(search.sort ?? "featured"),
  }),
  head: () => ({
    meta: [
      { title: "Search — My Store" },
      {
        name: "description",
        content: "Search our catalog for quality products across electronics, books, beauty, toys, fitness, clothing, and home goods.",
      },
      { property: "og:title", content: "Search — My Store" },
      {
        property: "og:description",
        content: "Find exactly what you're looking for.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const sortOrder = search.sort;

  // Local state for search (no URL params, no API calls)
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from backend API using search term
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts(
    searchTerm.trim()
      ? { searchTerm: searchTerm.trim(), page: 1, limit: 20 }
      : { page: 1, limit: 20 }
  );
  const { data: categoriesData } = useCategories();

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    const cat = categories.find(c => c.id === categoryId);
    if (cat) return cat.name;

    // Check in subcategories
    for (const c of categories) {
      const subCat = c.children.find(sub => sub.id === categoryId);
      if (subCat) return subCat.name;
    }

    return "General";
  };

  // Sort API products
  const sortedProducts = useMemo(() => {
    let result = [...products];

    // Sort
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, sortOrder]);

  const handleSortChange = (sort: string) => {
    navigate({
      to: "/search",
      search: { ...search, sort }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    navigate({
      to: "/search",
      search: { sort: "featured" }
    });
  };

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Search</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Find what you need
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Search across our entire catalog of quality products.
        </p>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <aside className="flex flex-col gap-8 border-t border-border pt-6">
          <Field label="Search" htmlFor="search-input">
            <Input
              id="search-input"
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

          {searchTerm && (
            <Button variant="ghost" size="sm" className="self-start" onClick={clearSearch}>
              Clear search
            </Button>
          )}
        </aside>

        <section>
          {!searchTerm ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">Start your search</p>
                <p className="mt-2 text-muted-foreground">Enter a search term to find products.</p>
              </div>
            </div>
          ) : productsLoading ? (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} showAddToCart />
              ))}
            </div>
          ) : productsError ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <p className="text-destructive">Failed to load products. Please try again later.</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">No results found</p>
                <p className="mt-2 text-muted-foreground">
                  We couldn't find any products matching "{searchTerm}".
                </p>
                <Button variant="link" onClick={clearSearch} className="mt-4">
                  Clear search
                </Button>
              </div>
            </div>
          ) : (
            <>
              <SectionHeading
                eyebrow={`${sortedProducts.length} results`}
                title={`Search: "${searchTerm}"`}
              />
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                    priority={i < 2}
                    showAddToCart
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </Container>
  );
}
