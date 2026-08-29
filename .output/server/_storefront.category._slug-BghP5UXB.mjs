import { n as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./_ssr/input-3baiqKjd.mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { n as Select, t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { b as useProducts, c as useCategoryBySlug, s as useCategories } from "./_ssr/use-api-B_SRtOPB.mjs";
import { t as Badge } from "./_ssr/badge-DT0_Z5aK.mjs";
import { t as ProductCard } from "./_ssr/product-card-CZOW7OOo.mjs";
import { a as ProductCardSkeleton, o as Skeleton } from "./_ssr/skeletons-BNdFXLsd.mjs";
import { t as Route } from "./_storefront.category._slug-cxYjSdy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.category._slug-BghP5UXB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const sortOrder = search.sort;
	const selectedSubcategoryId = search.subcategory;
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const { data: category, isLoading: categoryLoading, error: categoryError } = useCategoryBySlug(slug);
	const { data: categoriesData } = useCategories();
	const activeCategoryId = selectedSubcategoryId || category?.id;
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		...activeCategoryId ? { categoryId: activeCategoryId } : {},
		...searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {},
		page: 1,
		limit: 50
	});
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	const getCategoryName = (categoryId) => {
		const cat = categories.find((c) => c.id === categoryId);
		if (cat) return cat.name;
		for (const c of categories) {
			const subCat = c.children.find((sub) => sub.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const activeCategoryName = selectedSubcategoryId ? getCategoryName(selectedSubcategoryId) : category?.name || "";
	const sortedProducts = (0, import_react.useMemo)(() => {
		let result = [...products];
		if (sortOrder === "price-asc") result.sort((a, b) => a.price - b.price);
		else if (sortOrder === "price-desc") result.sort((a, b) => b.price - a.price);
		return result;
	}, [products, sortOrder]);
	const handleSortChange = (sort) => {
		navigate({
			to: "/category/$slug",
			params: { slug },
			search: {
				...search,
				sort
			}
		});
	};
	const handleSubcategoryChange = (subcategoryId) => {
		navigate({
			to: "/category/$slug",
			params: { slug },
			search: {
				...search,
				subcategory: subcategoryId
			}
		});
	};
	const handleSearchChange = (value) => {
		setSearchTerm(value);
	};
	if (categoryLoading || productsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full rounded-md" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full rounded-md" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-16 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-20 rounded-md" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-md" })
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-48" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, { showAddToCart: true }, i))
			})] })]
		})]
	});
	if (categoryError || !category) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: "Category not found."
			})
		})
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
					children: "Category"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: category.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: [
						"Browse our curated collection of ",
						category.name.toLowerCase(),
						" products."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-8 border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Search",
						htmlFor: "filter-search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "filter-search",
							placeholder: "Search products…",
							value: searchTerm,
							onChange: (e) => handleSearchChange(e.target.value)
						})
					}),
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
					category?.children && category.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Subcategory"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: !selectedSubcategoryId ? "default" : "outline",
								className: "cursor-pointer",
								onClick: () => handleSubcategoryChange(void 0),
								children: ["All ", category.name]
							}), category.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: selectedSubcategoryId === child.id ? "default" : "outline",
								className: "cursor-pointer",
								onClick: () => handleSubcategoryChange(child.id),
								children: child.name
							}, child.id))]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: `${sortedProducts.length} products`,
				title: activeCategoryName
			}), sortedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium",
						children: "No products found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Try adjusting your search terms."
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: sortedProducts.map((product, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					categoryName: getCategoryName(product.categoryId),
					priority: i < 2,
					showAddToCart: true
				}, product.id))
			})] })]
		})]
	});
}
//#endregion
export { CategoryPage as component };
