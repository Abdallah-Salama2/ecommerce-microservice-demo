import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { T as useUpdateCategory, d as useCreateCategory, m as useDeleteCategory, s as useCategories } from "./use-api-B_SRtOPB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as FolderTree, D as Layers, b as Pen, c as Trash2, h as Search, t as X, y as Plus } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.categories-BtxlInWJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCategoriesPage() {
	const { data: categoriesData, isLoading, error } = useCategories();
	const createCategoryMutation = useCreateCategory();
	const updateCategoryMutation = useUpdateCategory();
	const deleteCategoryMutation = useDeleteCategory();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [parentId, setParentId] = (0, import_react.useState)(null);
	const categories = categoriesData?.data || [];
	const flattenedCategories = [];
	categories.forEach((cat) => {
		flattenedCategories.push({
			category: cat,
			isSubcategory: false
		});
		if (cat.children && cat.children.length > 0) cat.children.forEach((subCat) => {
			flattenedCategories.push({
				category: subCat,
				parentName: cat.name,
				isSubcategory: true
			});
		});
	});
	const filteredCategories = flattenedCategories.filter((item) => item.category.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.slug.toLowerCase().includes(searchTerm.toLowerCase()) || item.parentName && item.parentName.toLowerCase().includes(searchTerm.toLowerCase()));
	const handleOpenCreateModal = () => {
		setEditingCategory(null);
		setName("");
		setSlug("");
		setParentId(null);
		setIsModalOpen(true);
	};
	const handleOpenEditModal = (item) => {
		const { category } = item;
		setEditingCategory(category);
		setName(category.name);
		setSlug(category.slug);
		let parentCategory;
		if (item.parentName) parentCategory = categories.find((c) => c.name === item.parentName);
		setParentId(parentCategory ? parentCategory.id : null);
		setIsModalOpen(true);
	};
	const handleNameChange = (val) => {
		setName(val);
		if (!editingCategory) setSlug(val.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !slug.trim()) {
			toast.error("Please fill in both name and slug");
			return;
		}
		try {
			if (editingCategory) {
				await updateCategoryMutation.mutateAsync({
					id: editingCategory.id,
					data: {
						name: name.trim(),
						slug: slug.trim(),
						parentId: parentId || null
					}
				});
				toast.success(`Category "${name}" updated successfully`);
			} else {
				await createCategoryMutation.mutateAsync({
					name: name.trim(),
					slug: slug.trim(),
					parentId: parentId || null
				});
				toast.success(`Category "${name}" created successfully`);
			}
			setIsModalOpen(false);
		} catch (err) {
			toast.error(err.message || "Failed to save category");
		}
	};
	const handleDelete = async (cat) => {
		if (!window.confirm(`Are you sure you want to delete "${cat.name}"?`)) return;
		try {
			await deleteCategoryMutation.mutateAsync(cat.id);
			toast.success(`Category "${cat.name}" deleted successfully`);
		} catch (err) {
			toast.error(err.message || "Failed to delete category");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
					children: "Categories Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Organize catalog products into top-level categories and nested subcategories."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenCreateModal,
					className: "gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Category"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "border-b border-border py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base font-medium",
						children: [
							"All Categories (",
							flattenedCategories.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-xs w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search categories...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-muted-foreground",
					children: "Loading categories..."
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-destructive",
					children: "Failed to load categories."
				}) : filteredCategories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-muted-foreground",
					children: "No categories found matching your search."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Category Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Slug"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Hierarchy / Parent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Subcategories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: filteredCategories.map(({ category, parentName, isSubcategory }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-4 font-mono text-xs text-muted-foreground",
										children: ["#", category.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [isSubcategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground pl-3 text-xs",
												children: "└"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground truncate max-w-[200px]",
												children: category.name
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 font-mono text-xs text-muted-foreground truncate max-w-[160px]",
										children: category.slug
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: isSubcategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "whitespace-nowrap gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }), parentName]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "instock",
											className: "whitespace-nowrap",
											children: "Top Level"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-muted-foreground",
										children: !isSubcategory && category.children ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs",
											children: [category.children.length, " subcategories"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground/60",
											children: "—"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleOpenEditModal({
													category,
													parentName: parentName ?? void 0
												}),
												className: "h-8 w-8 p-0",
												"aria-label": `Edit ${category.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleDelete(category),
												className: "h-8 w-8 p-0 text-destructive hover:text-destructive",
												"aria-label": `Delete ${category.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											})]
										})
									})
								]
							}, category.id))
						})]
					})
				})
			})] }),
			isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-normal text-foreground",
							children: editingCategory ? "Edit Category" : "Create New Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsModalOpen(false),
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Category Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: name,
								onChange: (e) => handleNameChange(e.target.value),
								placeholder: "e.g. Smart Home Electronics",
								className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "URL Slug"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: slug,
								onChange: (e) => setSlug(e.target.value),
								placeholder: "e.g. smart-home-electronics",
								className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Parent Category (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: parentId ?? "",
								onChange: (e) => setParentId(e.target.value ? Number(e.target.value) : null),
								className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "None (Top-Level Category)"
								}), categories.filter((c) => !editingCategory || c.id !== editingCategory.id).map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: cat.id,
									children: cat.name
								}, cat.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-3 pt-4 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: () => setIsModalOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: createCategoryMutation.isPending || updateCategoryMutation.isPending,
									children: createCategoryMutation.isPending || updateCategoryMutation.isPending ? "Saving..." : editingCategory ? "Save Changes" : "Create Category"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminCategoriesPage as component };
