import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Select } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/storefront/section";
import { ProductCard } from "@/components/storefront/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/ui/skeletons";
import { useProducts, useCategoryBySlug, useCategories } from "@/hooks/use-api";

export const Route = createFileRoute("/_storefront/category/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    sort: String(search.sort ?? "featured"),
    subcategory: search.subcategory ? Number(search.subcategory) : undefined,
  }),
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — My Store` },
      {
        name: "description",
        content: `Browse our ${params.slug} collection. Quality products for everyday life.`,
      },
      { property: "og:title", content: `${params.slug} — My Store` },
      {
        property: "og:description",
        content: `Browse our ${params.slug} collection.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const sortOrder = search.sort;
  const selectedSubcategoryId = search.subcategory;

  // Local state for search (no URL params, no API calls)
  const [searchTerm, setSearchTerm] = useState("");

  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategoryBySlug(slug);
  const { data: categoriesData } = useCategories();

  // Determine which category ID to use for filtering
  // If a subcategory is selected, use that ID; otherwise use parent category ID
  const activeCategoryId = selectedSubcategoryId || category?.id;

  // Fetch products from backend API using categoryId and search term
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
    ...(activeCategoryId ? { categoryId: activeCategoryId } : {}),
    ...(searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}),
    page: 1,
    limit: 50,
  });

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

  // Get the active category name for heading
  const activeCategoryName = selectedSubcategoryId
    ? getCategoryName(selectedSubcategoryId)
    : category?.name || "";

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
      to: "/category/$slug",
      params: { slug },
      search: { ...search, sort }
    });
  };

  const handleSubcategoryChange = (subcategoryId: number | undefined) => {
    navigate({
      to: "/category/$slug",
      params: { slug },
      search: { ...search, subcategory: subcategoryId }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (categoryLoading || productsLoading) {
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

  if (categoryError || !category) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-destructive">Category not found.</p>
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
        <span className="rule-label">Category</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          {category.name}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Browse our curated collection of {category.name.toLowerCase()} products.
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

          {category?.children && category.children.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="rule-label">Subcategory</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={!selectedSubcategoryId ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSubcategoryChange(undefined)}
                >
                  All {category.name}
                </Badge>
                {category.children.map((child) => (
                  <Badge
                    key={child.id}
                    variant={selectedSubcategoryId === child.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSubcategoryChange(child.id)}
                  >
                    {child.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </aside>

        <section>
          <SectionHeading
            eyebrow={`${sortedProducts.length} products`}
            title={activeCategoryName}
          />
          {sortedProducts.length === 0 ? (
            <div className="mt-12 flex min-h-[30vh] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your search terms.</p>
              </div>
            </div>
          ) : (
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
          )}
        </section>
      </div>
    </Container>
  );
}
