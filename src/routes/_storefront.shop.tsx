import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/ui/skeletons";
import { useProducts, useCategories } from "@/hooks/use-api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_storefront/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: String(search.category ?? ""),
    sort: String(search.sort ?? "featured"),
    page: Number(search.page ?? 1),
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
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const categoryFilter = search.category;
  const sortOrder = search.sort;
  const currentPage = search.page;

  // Fetch products with server-side pagination
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
    page: currentPage,
    limit: 20,
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

  const handleCategoryChange = (categoryId: string) => {
    navigate({
      to: "/shop",
      search: { ...search, category: categoryId, page: 1 }
    });
  };

  const handleSortChange = (sort: string) => {
    navigate({
      to: "/shop",
      search: { ...search, sort, page: 1 }
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: "/shop",
      search: { ...search, page: newPage }
    });
  };

  const clearFilters = () => {
    navigate({
      to: "/shop",
      search: { category: "", sort: "featured", page: 1 }
    });
  };

  if (productsLoading || categoriesLoading) {
    return (
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="flex flex-col gap-8 border-t border-border pt-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          </aside>

          <section>
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} showAddToCart />
              ))}
            </div>
          </section>
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

          {categoryFilter && (
            <Button variant="ghost" size="sm" className="self-start" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </aside>

        <section>
          <SectionHeading
            eyebrow={`${pagination?.totalItems ?? 0} products`}
            title="The full collection"
          />
          {products.length === 0 ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters.</p>
                <Button variant="link" onClick={clearFilters} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                    priority={i < 2}
                    showAddToCart
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= pagination.totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Container>
  );
}
