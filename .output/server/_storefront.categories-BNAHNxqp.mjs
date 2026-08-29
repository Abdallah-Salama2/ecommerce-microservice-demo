import { n as resolveImageUrl } from "./_ssr/utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { b as useProducts, s as useCategories } from "./_ssr/use-api-B_SRtOPB.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as getProductPrimaryImage } from "./_ssr/types-DwK1Lx06.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.categories-BNAHNxqp.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
	const { data: productsData } = useProducts({
		page: 1,
		limit: 100
	});
	const categories = categoriesData?.data || [];
	const products = productsData?.data || [];
	const getCategoryImage = (category) => {
		const getAllCategoryIds = (cat) => {
			const ids = [cat.id];
			cat.children.forEach((child) => {
				ids.push(...getAllCategoryIds(child));
			});
			return ids;
		};
		const categoryIds = getAllCategoryIds(category);
		const categoryProducts = products.filter((p) => categoryIds.includes(p.categoryId));
		if (categoryProducts.length > 0) {
			const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
			return randomProduct ? resolveImageUrl(getProductPrimaryImage(randomProduct).thumbnailUrl) : null;
		}
		return {
			"electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwyfHx8MTc4NzU5ODU4N3ww&ixlib=rb-4.1.0&q=80&w=400",
			"fashion": "https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZmFzaGlvbiUyMGNsb3RoaW5nfGVufDB8Mnx8fDE3ODc1OTg1ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
			"home-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8aG9tZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc4NzU5ODU4OXww&ixlib=rb-4.1.0&q=80&w=400",
			"sports-outdoors": "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8c3BvcnRzJTIwb3V0ZG9vcnN8ZW58MHwyfHx8MTc4NzU5ODU5MXww&ixlib=rb-4.1.0&q=80&w=400",
			"toys-games": "https://images.unsplash.com/photo-1558060370-d644479cb6b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8dG95cyUyMGdhbWVzfGVufDB8Mnx8fDE3ODc1OTg1OTJ8MA&ixlib=rb-4.1.0&q=80&w=400"
		}[category.slug] || null;
	};
	if (categoriesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading..."
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
					children: "Categories"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Browse by category"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Explore our curated collection across electronics, books, beauty, toys, fitness, clothing, and home goods."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: categories.map((cat) => {
				const categoryImage = getCategoryImage(cat);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/category/$slug",
					params: { slug: cat.slug },
					className: "group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden bg-surface",
							children: categoryImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: categoryImage,
								alt: cat.name,
								width: 1024,
								height: 1280,
								className: "aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/5] w-full bg-muted flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground text-sm",
									children: cat.name
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-xl font-normal tracking-tight transition-colors group-hover:text-primary",
							children: cat.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: cat.children.length > 0 ? `${cat.children.length} subcategories` : "Browse products"
						})
					]
				}, cat.id);
			})
		})]
	});
}
//#endregion
export { CategoriesPage as component };
