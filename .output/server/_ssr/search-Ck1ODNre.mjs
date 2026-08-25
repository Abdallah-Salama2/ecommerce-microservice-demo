import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SectionHeading, t as Container } from "./section-Bv8OXeZv.mjs";
import { _ as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { f as useProducts, i as useCategories } from "./use-api-BH_NuuxZ.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as Select, t as Field } from "./field-D_fasfp7.mjs";
import { t as ProductCard } from "./product-card-BYharLKc.mjs";
import { t as Route } from "./search-D21myLli.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-Ck1ODNre.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const search = useSearch({ from: "/search" });
	const navigate = Route.useNavigate();
	const sortOrder = search.sort;
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		page: 1,
		limit: 100
	});
	const { data: categoriesData } = useCategories();
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
	const handleSortChange = (sort) => {
		navigate({
			to: "/search",
			search: {
				...search,
				sort
			}
		});
	};
	const handleSearchChange = (value) => {
		setSearchTerm(value);
	};
	const clearSearch = () => {
		setSearchTerm("");
		navigate({
			to: "/search",
			search: { sort: "featured" }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Search"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Find what you need"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Search across our entire catalog of quality products."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-8 border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Search",
						htmlFor: "search-input",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "search-input",
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
					searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "self-start",
						onClick: clearSearch,
						children: "Clear search"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: !searchTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-medium",
						children: "Start your search"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Enter a search term to find products."
					})]
				})
			}) : productsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Loading..."
				})
			}) : productsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-destructive",
					children: "Failed to load products. Please try again later."
				})
			}) : filteredAndSortedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex min-h-[30vh] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium",
							children: "No results found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted-foreground",
							children: [
								"We couldn't find any products matching \"",
								searchTerm,
								"\"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							onClick: clearSearch,
							className: "mt-4",
							children: "Clear search"
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: `${filteredAndSortedProducts.length} results`,
				title: `Search: "${searchTerm}"`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3",
				children: filteredAndSortedProducts.map((product, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					categoryName: getCategoryName(product.categoryId),
					priority: i < 2,
					showAddToCart: true
				}, product.id))
			})] }) })]
		})]
	});
}
//#endregion
export { SearchPage as component };
