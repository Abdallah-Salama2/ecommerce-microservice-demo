import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SectionHeading, t as Container } from "./section-Bv8OXeZv.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { f as useProducts, i as useCategories } from "./use-api-BH_NuuxZ.mjs";
import { t as Badge } from "./badge-Db4JAkY2.mjs";
import { t as ProductCard } from "./product-card-BYharLKc.mjs";
import { t as ContentCard } from "./content-card-DCOEOO8p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-0TNLckxo.js
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-C8oi5OaW.jpg";
function HomePage() {
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		page: 1,
		limit: 8
	});
	const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories();
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	const featured = products.slice(0, 4);
	const hairloom = products[0];
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading..."
			})
		})
	});
	if (productsError || categoriesError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: "Failed to load data. Please try again later."
			})
		})
	});
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
		if (categoryProducts.length > 0) return categoryProducts[Math.floor(Math.random() * categoryProducts.length)].thumbnailUrl;
		return {
			"electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwyfHx8MTc4NzU5ODU4N3ww&ixlib=rb-4.1.0&q=80&w=400",
			"fashion": "https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZmFzaGlvbiUyMGNsb3RoaW5nfGVufDB8Mnx8fDE3ODc1OTg1ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
			"home-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8aG9tZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc4NzU5ODU4OXww&ixlib=rb-4.1.0&q=80&w=400",
			"sports-outdoors": "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8c3BvcnRzJTIwb3V0ZG9vcnN8ZW58MHwyfHx8MTc4NzU5ODU5MXww&ixlib=rb-4.1.0&q=80&w=400",
			"toys-games": "https://images.unsplash.com/photo-1558060370-d644479cb6b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8dG95cyUyMGdhbWVzfGVufDB8Mnx8fDE3ODc1OTg1OTJ8MA&ixlib=rb-4.1.0&q=80&w=400"
		}[category.slug] || null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "New arrivals — 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 font-display text-[2.75rem] font-normal leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl",
							children: [
								"Quality goods",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: " carefully "
								}),
								"curated."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-7 max-w-md text-base leading-relaxed text-muted-foreground",
							children: "From electronics and books to beauty, toys, fitness, clothing, and home goods — thoughtfully selected products for everyday life."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "primary",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									children: "Shop the collection"
								})
							}), hairloom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "link",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$slug",
									params: { slug: hairloom.slug },
									children: "View featured item"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "Quality products for everyday life",
						width: 1600,
						height: 1200,
						className: "aspect-[4/3] w-full object-cover"
					}), hairloom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-5 left-5 flex items-center gap-3 sm:left-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border border-border bg-card px-4 py-3 font-display text-sm tracking-tight",
							children: hairloom.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
							amount: hairloom.price,
							size: "md"
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-20 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Categories",
				title: "Browse by category",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "All categories"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
				children: categories.slice(0, 4).map((cat) => {
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "pb-24 sm:pb-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Featured",
				title: "This month's highlights",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "View all products"
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product,
					categoryName: getCategoryName(product.categoryId),
					priority: true,
					showAddToCart: true
				}, product.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			className: "pb-24 sm:pb-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCard, {
						eyebrow: "Quality",
						title: "Carefully selected products",
						children: "Every item is chosen for its quality, durability, and value. We believe in products that stand the test of time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCard, {
						eyebrow: "Variety",
						title: "Categories for every need",
						children: "From electronics and books to beauty, toys, fitness, clothing, and home goods — find what you're looking for."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCard, {
						eyebrow: "Service",
						title: "Customer satisfaction first",
						footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Free shipping over $200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "sale",
								children: "Seasonal sale on now"
							})]
						}),
						children: "Easy returns, secure checkout, and dedicated support to ensure your shopping experience is seamless."
					})
				]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
