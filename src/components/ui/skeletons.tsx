import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProductCard skeleton - mirrors the actual ProductCard component structure
 * Image block + title + category + price chip area
 */
export function ProductCardSkeleton({ showAddToCart = false }: { showAddToCart?: boolean }) {
  return (
    <article className="group relative flex flex-col h-full">
      <div className="relative overflow-hidden bg-surface rounded-sm">
        {/* Image skeleton */}
        <Skeleton className="aspect-square w-full" />
        
        {/* Wishlist button skeleton */}
        <Skeleton className="absolute right-3 top-3 h-9 w-9 rounded-full" />
        
        {/* Price tag chip skeleton */}
        <Skeleton className="absolute bottom-4 right-4 h-8 w-20 rounded-md" />
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          {/* Title skeleton - 2 lines */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          {/* Category skeleton */}
          <Skeleton className="h-4 w-24 mt-2" />
        </div>

        <div className="flex-1 min-h-[1rem]" />

        {showAddToCart && (
          <Skeleton className="w-full h-10 mt-4 rounded-md" />
        )}
      </div>
    </article>
  );
}

/**
 * CategoryCard skeleton - mirrors the category card structure
 * Image block + title + description
 */
export function CategoryCardSkeleton() {
  return (
    <div className="group block">
      <div className="overflow-hidden bg-surface rounded-sm">
        {/* Image skeleton */}
        <Skeleton className="aspect-[4/5] w-full" />
      </div>
      {/* Title skeleton */}
      <Skeleton className="h-7 w-3/4 mt-5" />
      {/* Description skeleton */}
      <Skeleton className="h-4 w-1/2 mt-2" />
    </div>
  );
}

/**
 * CartItem skeleton - mirrors the cart item structure
 * Thumbnail + product info + quantity + price
 */
export function CartItemSkeleton() {
  return (
    <div className="flex gap-6 border-b border-border pb-8">
      {/* Thumbnail skeleton */}
      <Skeleton className="w-24 h-24 shrink-0 rounded-sm" />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            {/* Product name skeleton */}
            <Skeleton className="h-6 w-48" />
            {/* Stock info skeleton */}
            <Skeleton className="h-4 w-32" />
          </div>
          {/* Price skeleton */}
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity input skeleton */}
          <Skeleton className="h-10 w-20 rounded-md" />
          {/* Remove button skeleton */}
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * TableRow skeleton for admin tables - mirrors table row structure
 * Matches column widths of admin products/orders tables
 */
export function TableRowSkeleton({ columns = 7 }: { columns?: number }) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-5 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Form skeleton - mirrors form input structure
 * Label + input field
 */
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

/**
 * PDP skeleton - mirrors product detail page structure
 * Gallery + product info
 */
export function PDPSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
      {/* Gallery skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        {/* Thumbnail strip skeleton */}
        <div className="flex gap-4">
          <Skeleton className="w-24 h-24 rounded-md" />
          <Skeleton className="w-24 h-24 rounded-md" />
          <Skeleton className="w-24 h-24 rounded-md" />
          <Skeleton className="w-24 h-24 rounded-md" />
        </div>
      </div>

      {/* Product info skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-28 rounded-md" />
          <Skeleton className="h-12 flex-1 rounded-md" />
          <Skeleton className="h-12 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Hero skeleton - mirrors homepage hero section
 */
export function HeroSkeleton() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24">
      <div className="max-w-xl space-y-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-20 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>
      <Skeleton className="aspect-[4/3] w-full rounded-md" />
    </div>
  );
}
