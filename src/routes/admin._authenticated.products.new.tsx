import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCategories, useCreateProduct } from "@/hooks/use-api";
import { getProductIdNumber } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/products/new")({
  component: AdminCreateProductPage,
});

interface FormErrors {
  name?: string;
  slug?: string;
  description?: string;
  price?: string;
  stockQuantity?: string;
  categoryId?: string;
}

function AdminCreateProductPage() {
  const navigate = useNavigate();
  const { data: categoriesData } = useCategories();
  const createProductMutation = useCreateProduct();

  const categories = categoriesData?.data || [];

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Errors State
  const [errors, setErrors] = useState<FormErrors>({});

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const validate = () => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Product name is required";
    if (!slug.trim()) errs.slug = "Slug is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!price || Number(price) <= 0) errs.price = "Enter a valid positive price";
    if (!stockQuantity || Number(stockQuantity) < 0)
      errs.stockQuantity = "Enter a valid stock quantity";
    if (!categoryId) errs.categoryId = "Category selection is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix errors before submitting");
      return;
    }

    try {
      const res = await createProductMutation.mutateAsync({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        categoryId: Number(categoryId),
      });

      const newProduct = res.data;
      const newId = getProductIdNumber(newProduct);
      toast.success(`Product "${name}" created! You can now manage its images.`);
      
      // Redirect to edit workstation so images can be added
      navigate({
        to: "/admin/products/$slug/edit",
        params: { slug: newProduct.slug },
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div>
        <Button asChild variant="ghost" size="sm" className="gap-1 px-0 text-muted-foreground hover:text-foreground">
          <Link to="/admin/products">
            <ChevronLeft className="h-4 w-4" />
            Back to Products List
          </Link>
        </Button>
        <h1 className="mt-2 font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          Create New Product
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new item to your store catalog.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader className="border-b border-border py-4">
            <CardTitle className="text-base font-medium">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Wireless Noise-Canceling Headphones"
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. wireless-noise-canceling-headphones"
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
              />
              {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
            </div>

            {/* Category Selection */}
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

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of product features..."
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Price & Stock Row */}
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
                  placeholder="29.99"
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
                  placeholder="50"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
                />
                {errors.stockQuantity && (
                  <p className="mt-1 text-xs text-destructive">{errors.stockQuantity}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button asChild variant="secondary">
            <Link to="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={createProductMutation.isPending} className="gap-2">
            <Check className="h-4 w-4" />
            {createProductMutation.isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
