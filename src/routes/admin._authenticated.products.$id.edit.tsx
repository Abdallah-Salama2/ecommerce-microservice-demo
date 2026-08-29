import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Save, Upload, Trash2, Star, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useProduct,
  useCategories,
  useUpdateProduct,
  useUploadProductImage,
  useDeleteProductImage,
  useSetPrimaryProductImage,
} from "@/hooks/use-api";
import { getProductIdNumber } from "@/types";
import { resolveImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/$id/edit")({
  component: AdminEditProductPage,
});

interface FormErrors {
  name?: string;
  slug?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  categoryId?: string;
}

function AdminEditProductPage() {
  const { id } = Route.useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { data: categoriesData } = useCategories();

  const updateProductMutation = useUpdateProduct();
  const uploadImageMutation = useUploadProductImage();
  const deleteImageMutation = useDeleteProductImage();
  const setPrimaryImageMutation = useSetPrimaryProductImage();

  const categories = categoriesData?.data || [];
  const productId = product ? getProductIdNumber(product) : Number(id);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setSlug(product.slug || "");
      setDescription(product.description || "");
      setPrice(product.price ? String(product.price) : "");
      setStockQuantity(product.stockQuantity !== undefined ? String(product.stockQuantity) : "");
      setCategoryId(product.categoryId ? String(product.categoryId) : "");
    }
  }, [product]);

  const validate = () => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Product name is required";
    if (!slug.trim()) errs.slug = "Slug is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!price || Number(price) <= 0) errs.price = "Enter a valid positive price";
    if (stockQuantity === "" || Number(stockQuantity) < 0)
      errs.stockQuantity = "Enter a valid stock quantity";
    if (!categoryId) errs.categoryId = "Category selection is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !productId) {
      toast.error("Please fix errors before saving");
      return;
    }

    try {
      await updateProductMutation.mutateAsync({
        id: productId,
        data: {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          price: Number(price),
          stockQuantity: Number(stockQuantity),
          categoryId: Number(categoryId),
        },
      });
      toast.success(`Product "${name}" updated successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !productId) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          await uploadImageMutation.mutateAsync({
            id: productId,
            file,
          });
        }
      }
      toast.success("Image uploaded successfully");
      e.target.value = "";
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (imageId: number | string) => {
    if (!productId) return;
    try {
      await setPrimaryImageMutation.mutateAsync({ id: productId, imageId });
      toast.success("Primary image updated");
    } catch (err: any) {
      console.error("Set primary error:", err);
      const errorMessage = err.message || "Failed to set primary image";
      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        toast.error("Image may have been deleted. Refreshing...");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleDeleteImage = async (imageId: number | string) => {
    if (!productId) return;
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteImageMutation.mutateAsync({ id: productId, imageId });
      toast.success("Image deleted");
    } catch (err: any) {
      console.error("Delete error:", err);
      const errorMessage = err.message || "Failed to delete image";
      // If it's a 404 or similar error, the image might already be deleted
      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        toast.error("Image may have already been deleted. Refreshing...");
        // Force refresh to clear stale data
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-muted-foreground">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-12 text-center">
        <p className="text-destructive font-medium">Product #{id} not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/admin/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-1 px-0 text-muted-foreground hover:text-foreground">
          <Link to="/admin/products">
            <ChevronLeft className="h-4 w-4" />
            Back to Products List
          </Link>
        </Button>
        <h1 className="mt-2 font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          Edit Product #{productId} — {product.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update product details and manage image gallery.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Form Details */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdateProduct} className="space-y-6">
            <Card>
              <CardHeader className="border-b border-border py-4">
                <CardTitle className="text-base font-medium">Product Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
                  />
                  {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <option value="">Select Category...</option>
                    {categories.map((cat) => (
                      <optgroup key={cat.id} label={cat.name}>
                        <option value={cat.id}>{cat.name} (Main)</option>
                        {cat.children?.map((subCat) => (
                          <option key={subCat.id} value={subCat.id}>
                            ── {subCat.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="mt-1 text-xs text-destructive">{errors.categoryId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-destructive">{errors.description}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
                    />
                    {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
                    />
                    {errors.stockQuantity && (
                      <p className="mt-1 text-xs text-destructive">{errors.stockQuantity}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-3">
              <Button asChild variant="secondary">
                <Link to="/admin/products">Cancel</Link>
              </Button>
              <Button type="submit" disabled={updateProductMutation.isPending} className="gap-2">
                <Save className="h-4 w-4" />
                {updateProductMutation.isPending ? "Saving..." : "Save Product Details"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Col: Image Gallery & Management */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  Product Gallery ({images.length})
                </CardTitle>
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    <Upload className="h-3.5 w-3.5" />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploading}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </CardHeader>

            <CardContent className="p-5">
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-md">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-xs text-muted-foreground">No images uploaded yet.</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Upload images to showcase this item on product cards and details page.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative overflow-hidden rounded-md border border-border bg-surface"
                    >
                      <img
                        src={resolveImageUrl(img.previewUrl || img.thumbnailUrl)}
                        alt={img.altText || product.name}
                        className="aspect-square w-full object-cover"
                      />

                      {/* Primary Indicator Badge */}
                      {img.isPrimary && (
                        <div className="absolute top-2 left-2 z-20">
                          <Badge variant="sale" className="whitespace-nowrap gap-1 text-[0.55rem] px-2 py-0.5 shadow-md">
                            <Star className="h-3 w-3 fill-current" />
                            PRIMARY
                          </Badge>
                        </div>
                      )}

                      {/* Action overlay */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                        {!img.isPrimary && (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleSetPrimary(img.id)}
                            disabled={setPrimaryImageMutation.isPending}
                            className="h-8 px-2 text-xs"
                            title="Set as primary image"
                          >
                            Set Primary
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteImage(img.id)}
                          disabled={deleteImageMutation.isPending}
                          className="h-8 w-8 p-0 bg-background/80 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          title="Delete image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
