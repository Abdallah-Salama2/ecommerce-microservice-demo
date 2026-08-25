import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SectionHeading, t as Container } from "./section-Bv8OXeZv.mjs";
import { _ as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { f as useProducts, i as useCategories } from "./use-api-BH_NuuxZ.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as Select, t as Field } from "./field-D_fasfp7.mjs";
import { t as Badge } from "./badge-Db4JAkY2.mjs";
import { t as ProductCard } from "./product-card-BYharLKc.mjs";
import { t as Route } from "./shop-_bu3BV3T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-t99okDm2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const search = useSearch({ from: "/shop" });
	const navigate = Route.useNavigate();
	const categoryFilter = search.category;
	const sortOrder = search.sort;
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		page: 1,
		limit: 100,
		categoryId: categoryFilter ? Number(categoryFilter) : void 0
	});
	const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	productsData?.pagination;
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const filteredAndSortedProducts = (0, import_react.useMemo)(() => {
		let result = [...products];
		if (searchTerm) result = result.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
		if (sortOrder === "price-asc") result.sort((a, b) => a.price - b.price);
		else if (sortOrder === "price-desc") result.sort((a, b) => b.price - a.price);
		return result;
	}, [
		products,
		searchTerm,
		sortOrder
	]);
	const handleCategoryChange = (categoryId) => {
		navigate({
			to: "/shop",
			search: {
				...search,
				category: categoryId
			}
		});
	};
	const handleSortChange = (sort) => {
		navigate({
			to: "/shop",
			search: {
				...search,
				sort
			}
		});
	};
	const handleSearchChange = (value) => {
		setSearchTerm(value);
	};
	const clearFilters = () => {
		setSearchTerm("");
		navigate({
			to: "/shop",
			search: {
				category: "",
				sort: "featured"
			}
		});
	};
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading..."
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
					(categoryFilter || searchTerm) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "self-start",
						onClick: clearFilters,
						children: "Clear filters"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: `${filteredAndSortedProducts.length} products`,
				title: "The full collection"
			}), filteredAndSortedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Try adjusting your filters or search terms."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							onClick: clearFilters,
							className: "mt-4",
							children: "Clear all filters"
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: filteredAndSortedProducts.map((product, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
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
export { ShopPage as component };
