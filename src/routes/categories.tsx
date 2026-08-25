import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, SectionHeading } from "@/components/storefront/section";
import { useCategories, useProducts } from "@/hooks/use-api";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — My Store" },
      {
        name: "description",
        content: "Browse all our categories: electronics, books, beauty, toys, fitness, clothing, and home goods.",
      },
      { property: "og:title", content: "Categories — My Store" },
      {
        property: "og:description",
        content: "Find exactly what you're looking for in our organized categories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: productsData } = useProducts({ page: 1, limit: 100 });

  const categories = categoriesData?.data || [];
  const products = productsData?.data || [] as Product[];

  // Helper function to get category image - checks all nested subcategories
  const getCategoryImage = (category: any) => {
    // Collect all category IDs including nested children
    const getAllCategoryIds = (cat: any): number[] => {
      const ids = [cat.id];
      cat.children.forEach((child: any) => {
        ids.push(...getAllCategoryIds(child));
      });
      return ids;
    };

    const categoryIds = getAllCategoryIds(category);
    const categoryProducts = products.filter((p: any) => categoryIds.includes(p.categoryId));

    if (categoryProducts.length > 0) {
      const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      return randomProduct.thumbnailUrl;
    }

    // Fallback: if no products, try to use a category-specific placeholder based on slug
    const categoryImages: Record<string, string> = {
      'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwyfHx8MTc4NzU5ODU4N3ww&ixlib=rb-4.1.0&q=80&w=400',
      'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZmFzaGlvbiUyMGNsb3RoaW5nfGVufDB8Mnx8fDE3ODc1OTg1ODh8MA&ixlib=rb-4.1.0&q=80&w=400',
      'home-kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8aG9tZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc4NzU5ODU4OXww&ixlib=rb-4.1.0&q=80&w=400',
      'sports-outdoors': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8c3BvcnRzJTIwb3V0ZG9vcnN8ZW58MHwyfHx8MTc4NzU5ODU5MXww&ixlib=rb-4.1.0&q=80&w=400',
      'toys-games': 'https://images.unsplash.com/photo-1558060370-d644479cb6b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8dG95cyUyMGdhbWVzfGVufDB8Mnx8fDE3ODc1OTg1OTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    };

    return categoryImages[category.slug] || null;
  };

  if (categoriesLoading) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <span className="rule-label">Categories</span>
        <h1 className="mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
          Browse by category
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Explore our curated collection across electronics, books, beauty, toys, fitness, clothing, and home goods.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => {
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
                    <span className="text-muted-foreground text-sm">{cat.name}</span>
                  </div>
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-normal tracking-tight transition-colors group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.children.length > 0 ? `${cat.children.length} subcategories` : "Browse products"}
              </p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
