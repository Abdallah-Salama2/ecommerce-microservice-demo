import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Edit2, Trash2, FolderTree, Tag, Layers, X, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useRestoreCategory,
} from "@/hooks/use-api";
import type { Category } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authenticated/categories")({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const { data: categoriesData, isLoading, error } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const restoreCategoryMutation = useRestoreCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  const categories = categoriesData?.data || [];

  // Flatten categories list to present parent-child hierarchy in table rows
  const flattenedCategories: {
    category: Category;
    parentName?: string;
    isSubcategory: boolean;
  }[] = [];

  categories.forEach((cat) => {
    flattenedCategories.push({
      category: cat,
      isSubcategory: false,
    });

    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((subCat) => {
        flattenedCategories.push({
          category: subCat,
          parentName: cat.name,
          isSubcategory: true,
        });
      });
    }
  });

  const filteredCategories = flattenedCategories.filter(
    (item) =>
      item.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.parentName && item.parentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setParentId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: { category: Category; parentName?: string }) => {
    const { category } = item;
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);

    // Find parentId if subcategory
    let parentCategory: Category | undefined;
    if (item.parentName) {
      parentCategory = categories.find((c) => c.name === item.parentName);
    }
    const resolvedParentId =
      category.parentCategoryId !== undefined && category.parentCategoryId !== null
        ? Number(category.parentCategoryId)
        : parentCategory
        ? Number(parentCategory.id)
        : null;

    setParentId(resolvedParentId);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      // Auto-generate slug when creating new category
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !slug.trim()) {
      toast.error("Please fill in both name and slug");
      return;
    }

    const selectedParentCategoryId =
      parentId !== null && parentId !== undefined && !isNaN(Number(parentId))
        ? Number(parentId)
        : null;

    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data: {
            name: name.trim(),
            slug: slug.trim(),
            parentCategoryId: selectedParentCategoryId,
            parentId: selectedParentCategoryId,
          },
        });
        toast.success(`Category "${name}" updated successfully`);
      } else {
        await createCategoryMutation.mutateAsync({
          name: name.trim(),
          slug: slug.trim(),
          parentCategoryId: selectedParentCategoryId,
          parentId: selectedParentCategoryId,
        });
        toast.success(`Category "${name}" created successfully`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!window.confirm(`Are you sure you want to delete "${cat.name}"?`)) {
      return;
    }

    try {
      await deleteCategoryMutation.mutateAsync(cat.id);
      toast.success(`Category "${cat.name}" deleted successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  const handleRestore = async (cat: Category) => {
    try {
      await restoreCategoryMutation.mutateAsync(cat.id);
      toast.success(`Category "${cat.name}" restored successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to restore category");
    }
  };

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            Categories Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize catalog products into top-level categories and nested subcategories.
          </p>
        </div>
        <Button onClick={handleOpenCreateModal} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Main Card Container */}
      <Card>
        <CardHeader className="border-b border-border py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-medium">
              All Categories ({flattenedCategories.length})
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading categories...</div>
          ) : error ? (
            <div className="p-12 text-center text-destructive">Failed to load categories.</div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No categories found matching your search.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Category Name</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Hierarchy / Parent</th>
                    <th className="px-6 py-3">Subcategories</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCategories.map(({ category, parentName, isSubcategory }) => {
                    const isInactive = category.isActive === false;

                    return (
                      <tr
                        key={category.id}
                        className={`hover:bg-muted/30 transition-colors ${
                          isInactive ? "bg-muted/20 opacity-70" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                          #{category.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {isSubcategory ? (
                              <span className="text-muted-foreground pl-3 text-xs">└</span>
                            ) : (
                              <FolderTree className="h-4 w-4 text-primary shrink-0" />
                            )}
                            <span
                              className={`font-medium truncate max-w-[200px] ${
                                isInactive ? "text-muted-foreground line-through" : "text-foreground"
                              }`}
                            >
                              {category.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground truncate max-w-[160px]">
                          {category.slug}
                        </td>
                        <td className="px-6 py-4">
                          {isSubcategory ? (
                            <Badge variant="outline" className="whitespace-nowrap gap-1">
                              <Layers className="h-3 w-3" />
                              {parentName}
                            </Badge>
                          ) : (
                            <Badge variant="instock" className="whitespace-nowrap">
                              Top Level
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {!isSubcategory && category.children ? (
                            <span className="font-mono text-xs">
                              {category.children.length} subcategories
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground/60">—</span>
                          )}
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleOpenEditModal({
                                  category,
                                  parentName: parentName ?? undefined,
                                })
                              }
                              className="h-8 w-8 p-0"
                              aria-label={`Edit ${category.name}`}
                              title="Edit category"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            {isInactive ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRestore(category)}
                                disabled={restoreCategoryMutation.isPending}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                aria-label={`Restore ${category.name}`}
                                title="Restore category"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(category)}
                                disabled={deleteCategoryMutation.isPending}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                aria-label={`Delete ${category.name}`}
                                title="Delete category"
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
        </CardContent>
      </Card>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-display text-xl font-normal text-foreground">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Smart Home Electronics"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. smart-home-electronics"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Parent Category (Optional)
                </label>
                <select
                  value={parentId !== null && parentId !== undefined ? String(parentId) : ""}
                  onChange={(e) =>
                    setParentId(e.target.value ? Number(e.target.value) : null)
                  }
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <option value="">None (Top-Level Category)</option>
                  {categories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createCategoryMutation.isPending || updateCategoryMutation.isPending
                  }
                >
                  {createCategoryMutation.isPending || updateCategoryMutation.isPending
                    ? "Saving..."
                    : editingCategory
                    ? "Save Changes"
                    : "Create Category"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
