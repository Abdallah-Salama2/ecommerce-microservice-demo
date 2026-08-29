import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { n as Select, t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { b as useProducts, s as useCategories } from "./_ssr/use-api-B_SRtOPB.mjs";
import { R as ChevronRight, z as ChevronLeft } from "./_libs/lucide-react.mjs";
import { t as Badge } from "./_ssr/badge-DT0_Z5aK.mjs";
import { t as ProductCard } from "./_ssr/product-card-CZOW7OOo.mjs";
import { a as ProductCardSkeleton, o as Skeleton } from "./_ssr/skeletons-BNdFXLsd.mjs";
import { t as Route } from "./_storefront.shop-DfKn8naw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.shop-ChJeylm0.js
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const categoryFilter = search.category;
	const sortOrder = search.sort;
	const currentPage = search.page;
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		page: currentPage,
		limit: 20,
		categoryId: categoryFilter ? Number(categoryFilter) : void 0
	});
	const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	const pagination = productsData?.pagination;
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const handleCategoryChange = (categoryId) => {
		navigate({
			to: "/shop",
			search: {
				...search,
				category: categoryId,
				page: 1
			}
		});
	};
	const handleSortChange = (sort) => {
		navigate({
			to: "/shop",
			search: {
				...search,
				sort,
				page: 1
			}
		});
	};
	const handlePageChange = (newPage) => {
		navigate({
			to: "/shop",
			search: {
				...search,
				page: newPage
			}
		});
	};
	const clearFilters = () => {
		navigate({
			to: "/shop",
			search: {
				category: "",
				sort: "featured",
				page: 1
			}
		});
	};
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-3/4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-full" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-8 border-t border-border pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full rounded-md" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-16 rounded-md" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-20 rounded-md" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-md" })
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-48" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, { showAddToCart: true }, i))
			})] })]
		})]
	});
	if (productsError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: "Failed to load products. Please try again later."
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Catalog"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Everything we offer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Quality products across electronics, books, beauty, toys, fitness, clothing, and home goods. Prices are shown on the tag."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-8 border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Sort by",
						htmlFor: "filter-sort",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							id: "filter-sort",
							value: sortOrder,
							onChange: (e) => handleSortChange(e.target.value),
							options: [
								{
									value: "featured",
									label: "Featured"
								},
								{
									value: "price-asc",
									label: "Price — low to high"
								},
								{
									value: "price-desc",
									label: "Price — high to low"
								},
								{
									value: "newest",
									label: "Newest"
								}
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: categoryFilter === "" ? "default" : "outline",
								className: "cursor-pointer",
								onClick: () => handleCategoryChange(""),
								children: "All"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: categoryFilter === c.id.toString() ? "default" : "outline",
								className: "cursor-pointer",
								onClick: () => handleCategoryChange(c.id.toString()),
								children: c.name
							}, c.id))]
						})]
					}),
					categoryFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "self-start",
						onClick: clearFilters,
						children: "Clear filters"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: `${pagination?.totalItems ?? 0} products`,
				title: "The full collection"
			}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium",
							children: "No products found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Try adjusting your filters."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							onClick: clearFilters,
							className: "mt-4",
							children: "Clear all filters"
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: products.map((product, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					categoryName: getCategoryName(product.categoryId),
					priority: i < 2,
					showAddToCart: true
				}, product.id))
			}), pagination && pagination.totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex items-center justify-between border-t border-border pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
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
						onClick: () => handlePageChange(currentPage - 1),
						className: "gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Previous"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: currentPage >= pagination.totalPages,
						onClick: () => handlePageChange(currentPage + 1),
						className: "gap-1",
						children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})]
				})]
			})] })] })]
		})]
	});
}
//#endregion
export { ShopPage as component };
