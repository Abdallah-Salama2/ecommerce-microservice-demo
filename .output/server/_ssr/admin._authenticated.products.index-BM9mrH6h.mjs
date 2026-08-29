import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as resolveImageUrl } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { t as PriceTag } from "./price-tag-DbjEP9Ql.mjs";
import { S as useRestoreProduct, h as useDeleteProduct, i as useAdminProducts, s as useCategories } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as ChevronRight, _ as RotateCcw, b as Pen, c as Trash2, h as Search, y as Plus, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { t as StockBadge } from "./stock-badge-C5zFJKSi.mjs";
import { n as getProductPrimaryImage, t as getProductIdNumber } from "./types-DwK1Lx06.mjs";
import { s as TableRowSkeleton } from "./skeletons-BNdFXLsd.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.products.index-BM9mrH6h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminProductsIndexPage() {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const { data: productsData, isLoading, error } = useAdminProducts({
		page: currentPage,
		limit: 10,
		...searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}
	});
	const { data: categoriesData } = useCategories();
	const deleteProductMutation = useDeleteProduct();
	const restoreProductMutation = useRestoreProduct();
	const products = productsData?.data || [];
	const pagination = productsData?.pagination;
	const categories = categoriesData?.data || [];
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const handleDelete = async (product) => {
		const idNum = getProductIdNumber(product);
		if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
		try {
			await deleteProductMutation.mutateAsync(idNum);
			toast.success(`Product "${product.name}" deleted successfully`);
		} catch (err) {
			toast.error(err.message || "Failed to delete product");
		}
	};
	const handleRestore = async (product) => {
		const idNum = getProductIdNumber(product);
		try {
			await restoreProductMutation.mutateAsync(idNum);
			toast.success(`Product "${product.name}" restored successfully`);
		} catch (err) {
			toast.error(err.message || "Failed to restore product");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
				children: "Products Master List"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage product catalog items, prices, inventory, and images."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "gap-2 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/products/new",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Product"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "border-b border-border py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base font-medium",
					children: [
						"Products (",
						pagination?.totalItems ?? products.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-xs w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search products by name...",
						value: searchTerm,
						onChange: (e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						},
						className: "w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-0",
			children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Thumbnail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Product Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Stock Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRowSkeleton, { columns: 7 }, i))
					})]
				})
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-12 text-center text-destructive",
				children: "Failed to load products."
			}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-12 text-center text-muted-foreground",
				children: "No products found."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Thumbnail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Product Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Stock Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-3 text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: products.map((product) => {
							const primaryImg = getProductPrimaryImage(product);
							const categoryName = getCategoryName(product.categoryId);
							const idNum = getProductIdNumber(product);
							const isInactive = product.isActive === false;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `hover:bg-muted/30 transition-colors ${isInactive ? "bg-muted/20 opacity-70" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: primaryImg.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: resolveImageUrl(primaryImg.thumbnailUrl),
											alt: product.name,
											className: `h-12 w-12 rounded-sm object-cover border border-border bg-surface shrink-0 ${isInactive ? "grayscale opacity-50" : ""}`
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-12 w-12 rounded-sm bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0",
											children: "No image"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `font-medium truncate max-w-[240px] ${isInactive ? "text-muted-foreground line-through" : "text-foreground"}`,
												children: product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-xs text-muted-foreground truncate max-w-[240px]",
												children: product.slug
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "whitespace-nowrap",
											children: categoryName
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
											amount: product.price,
											size: "sm"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockBadge, {
											stock: product.stockQuantity,
											showCount: true
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: isInactive ? "destructive" : "default",
											className: "whitespace-nowrap",
											children: isInactive ? "Inactive" : "Active"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "ghost",
												size: "sm",
												className: "h-8 w-8 p-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/admin/products/$id/edit",
													params: { id: idNum },
													"aria-label": `Edit ${product.name}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
												})
											}), isInactive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleRestore(product),
												disabled: restoreProductMutation.isPending,
												className: "h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50",
												"aria-label": `Restore ${product.name}`,
												title: "Restore product",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleDelete(product),
												className: "h-8 w-8 p-0 text-destructive hover:text-destructive",
												"aria-label": `Delete ${product.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											})]
										})
									})
								]
							}, product.id);
						})
					})]
				})
			}), pagination && pagination.totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-border px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Page ",
						pagination.currentPage,
						" of ",
						pagination.totalPages
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: currentPage <= 1,
						onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
						className: "gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Previous"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: currentPage >= pagination.totalPages,
						onClick: () => setCurrentPage((prev) => prev + 1),
						className: "gap-1",
						children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})]
				})]
			})]
		})] })]
	});
}
//#endregion
export { AdminProductsIndexPage as component };
