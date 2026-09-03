import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, Edit2, Trash2, Package, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/price-tag";
import { StockBadge } from "@/components/storefront/stock-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRowSkeleton } from "@/components/ui/skeletons";
import { useAdminProducts, useCategories, useDeleteProduct, useRestoreProduct, useStockBatch, useProductThumbnailsBatch } from "@/hooks/use-api";
import { getProductPrimaryImage, getProductIdNumber, getProductStock } from "@/types";
import { resolveImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/")({
  component: AdminProductsIndexPage,
});

function AdminProductsIndexPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: productsData, isLoading, error } = useAdminProducts({
    page: currentPage,
    pageSize: 10,
    ...(searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}),
  });

  const { data: categoriesData } = useCategories();
  const deleteProductMutation = useDeleteProduct();
  const restoreProductMutation = useRestoreProduct();

  const products = productsData?.data || [];
  const pagination = productsData?.pagination;
  const categories = categoriesData?.data || [];

  // Fetch stock and thumbnails from microservices for all visible products
  const productIds = products.map(p => getProductIdNumber(p));
  const { data: stockData } = useStockBatch(productIds);
  const stockItems = stockData?.data || [];
  const { data: thumbnailsData } = useProductThumbnailsBatch(productIds);
  const thumbnails = thumbnailsData?.data || [];

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) return category.name;

    for (const cat of categories) {
      const subCat = cat.children.find((c) => c.id === categoryId);
      if (subCat) return subCat.name;
    }

    return "General";
  };

  const handleDelete = async (product: (typeof products)[0]) => {
    const idNum = getProductIdNumber(product);
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await deleteProductMutation.mutateAsync(idNum);
      toast.success(`Product "${product.name}" deleted successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  const handleRestore = async (product: (typeof products)[0]) => {
    const idNum = getProductIdNumber(product);
    try {
      await restoreProductMutation.mutateAsync(idNum);
      toast.success(`Product "${product.name}" restored successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to restore product");
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            Products Master List
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage product catalog items, prices, inventory, and images.
          </p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link to="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Main Card Container */}
      <Card>
        <CardHeader className="border-b border-border py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-medium">
              Products ({pagination?.totalItems ?? products.length})
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Thumbnail</th>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock Status</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TableRowSkeleton key={i} columns={7} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-destructive">Failed to load products.</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No products found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Thumbnail</th>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock Status</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => {
                    const idNum = getProductIdNumber(product);
                    const thumb = thumbnails.find((t) => Number(t.productId) === idNum)?.thumbnailUrl || getProductPrimaryImage(product).thumbnailUrl;
                    const imageUrl = thumb ? resolveImageUrl(thumb) : null;
                    const categoryName = getCategoryName(product.categoryId);
                    const isInactive = product.isActive === false;
                    const stockItem = stockItems.find(
                      (i) => Number(i.product_id) === idNum || Number((i as any).productId) === idNum
                    );
                    const resolvedStock = stockItem !== undefined ? stockItem.quantity : undefined;

                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-muted/30 transition-colors ${isInactive
                          ? 'bg-muted/20 opacity-70'
                          : ''
                          }`}
                      >
                        <td className="px-6 py-4">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className={`h-12 w-12 rounded-sm object-cover border border-border bg-surface shrink-0 ${isInactive ? 'grayscale opacity-50' : ''
                                }`}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-sm bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                              No image
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="min-w-0">
                            <p className={`font-medium truncate max-w-[240px] ${isInactive ? 'text-muted-foreground line-through' : 'text-foreground'
                              }`}>
                              {product.name}
                            </p>
                            <p className="font-mono text-xs text-muted-foreground truncate max-w-[240px]">
                              {product.slug}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="whitespace-nowrap">
                            {categoryName}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <PriceTag amount={product.price} size="sm" />
                        </td>
                        <td className="px-6 py-4">
                          <StockBadge stock={resolvedStock} showCount />
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={isInactive ? "destructive" : "default"}
                            className="whitespace-nowrap"
                          >
                            {isInactive ? "Inactive" : "Active"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Link
                                to="/admin/products/$slug/edit"
                                params={{ slug: product.slug }}
                                aria-label={`Edit ${product.name}`}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Link>
                            </Button>
                            {isInactive ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRestore(product)}
                                disabled={restoreProductMutation.isPending}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                aria-label={`Restore ${product.name}`}
                                title="Restore product"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(product)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                aria-label={`Delete ${product.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= pagination.totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
