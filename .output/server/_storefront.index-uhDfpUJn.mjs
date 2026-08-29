import { n as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { n as resolveImageUrl } from "./_ssr/utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { t as PriceTag } from "./_ssr/price-tag-DbjEP9Ql.mjs";
import { b as useProducts, s as useCategories } from "./_ssr/use-api-B_SRtOPB.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./_ssr/badge-DT0_Z5aK.mjs";
import { n as getProductPrimaryImage } from "./_ssr/types-DwK1Lx06.mjs";
import { t as ProductCard } from "./_ssr/product-card-CZOW7OOo.mjs";
import { a as ProductCardSkeleton, n as CategoryCardSkeleton, o as Skeleton, r as HeroSkeleton } from "./_ssr/skeletons-BNdFXLsd.mjs";
import { t as ContentCard } from "./_ssr/content-card-2R5OUqbI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.index-uhDfpUJn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-C8oi5OaW.jpg";
function HomePage() {
	const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
		page: 1,
		limit: 50
	});
	const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories();
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	const [mountTimestamp] = (0, import_react.useState)(() => Date.now());
	const [hairloom, setHairloom] = (0, import_react.useState)(null);
	const [featured, setFeatured] = (0, import_react.useState)([]);
	const [categoryImageMap, setCategoryImageMap] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	(0, import_react.useEffect)(() => {
		if (productsLoading || categoriesLoading || productsError || categoriesError) return;
		const inStockProducts = products.filter((p) => p.stockQuantity > 0);
		if (inStockProducts.length > 0) {
			const randomIndex = Math.floor(Math.random() * inStockProducts.length);
			setHairloom(inStockProducts[randomIndex]);
		}
		const getTopCategoryId = (categoryId) => {
			for (const cat of categories) {
				if (cat.id === categoryId) return cat.id;
				if (cat.children.some((child) => child.id === categoryId)) return cat.id;
			}
			return categoryId;
		};
		const pool = products.filter((p) => p.stockQuantity > 0);
		const selectedFeatured = [];
		const seenCategoryIds = /* @__PURE__ */ new Set();
		for (const product of pool) {
			if (selectedFeatured.length >= 4) break;
			const topCatId = getTopCategoryId(product.categoryId);
			if (!seenCategoryIds.has(topCatId)) {
				seenCategoryIds.add(topCatId);
				selectedFeatured.push(product);
			}
		}
		if (selectedFeatured.length < 4) for (const product of pool) {
			if (selectedFeatured.length >= 4) break;
			if (!selectedFeatured.some((p) => p.id === product.id)) selectedFeatured.push(product);
		}
		setFeatured(selectedFeatured);
		const getAllCategoryIds = (cat) => {
			const ids = [cat.id];
			cat.children.forEach((child) => {
				ids.push(...getAllCategoryIds(child));
			});
			return ids;
		};
		const categoryFallbackImages = {
			electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwyfHx8MTc4NzU5ODU4N3ww&ixlib=rb-4.1.0&q=80&w=400",
			fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8ZmFzaGlvbiUyMGNsb3RoaW5nfGVufDB8Mnx8fDE3ODc1OTg1ODh8MA&ixlib=rb-4.1.0&q=80&w=400",
			"home-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8aG9tZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc4NzU5ODU4OXww&ixlib=rb-4.1.0&q=80&w=400",
			"sports-outdoors": "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8c3BvcnRzJTIwb3V0ZG9vcnN8ZW58MHwyfHx8MTc4NzU5ODU5MXww&ixlib=rb-4.1.0&q=80&w=400",
			"toys-games": "https://images.unsplash.com/photo-1558060370-d644479cb6b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDI0MjYzfDB8MXxzZWFyY2h8MXx8dG95cyUyMGdhbWVzfGVufDB8Mnx8fDE3ODc1OTg1OTJ8MA&ixlib=rb-4.1.0&q=80&w=400"
		};
		const map = /* @__PURE__ */ new Map();
		categories.forEach((category) => {
			const categoryIds = getAllCategoryIds(category);
			const categoryProducts = products.filter((p) => categoryIds.includes(p.categoryId) && getProductPrimaryImage(p).thumbnailUrl !== null);
			if (categoryProducts.length > 0) {
				const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
				if (randomProduct) {
					const thumbnailUrl = getProductPrimaryImage(randomProduct).thumbnailUrl;
					if (thumbnailUrl) map.set(category.id, resolveImageUrl(thumbnailUrl));
				}
			} else {
				const fallback = categoryFallbackImages[category.slug];
				if (fallback) map.set(category.id, fallback);
			}
		});
		setCategoryImageMap(map);
	}, [
		products,
		categories,
		productsLoading,
		categoriesLoading,
		productsError,
		categoriesError,
		mountTimestamp
	]);
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const getCategoryImage = (category) => {
		return categoryImageMap.get(category.id) || null;
	};
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				className: "py-14 lg:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSkeleton, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "py-20 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Categories",
				title: "Browse by category",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-32 rounded-md" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCardSkeleton, {}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "pb-24 sm:pb-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Featured",
				title: "This month's highlights",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-32 rounded-md" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			className: "pb-24 sm:pb-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" })
					]
				}, i))
			})
		})
	] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border hero-gradient",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-24 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "New arrivals — 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 font-display text-[3.5rem] font-normal leading-[0.95] tracking-tight sm:text-[5rem] lg:text-[6.5rem]",
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
							className: "mt-8 max-w-md text-lg leading-relaxed text-muted-foreground",
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/product/$slug",
									params: { slug: hairloom.slug },
									children: ["View ", hairloom.name]
								})
							})]
						})
					]
				}), hairloom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/product/$slug",
					params: { slug: hairloom.slug },
					className: "group relative block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
					"aria-label": `View ${hairloom.name}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: resolveImageUrl(getProductPrimaryImage(hairloom).previewUrl),
						alt: getProductPrimaryImage(hairloom).altText || hairloom.name,
						width: 1600,
						height: 1200,
						className: "aspect-[4/3] w-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-[1.01] hero-entrance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-5 left-5 flex items-center gap-3 sm:left-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border border-border bg-card px-4 py-3 font-display text-sm tracking-tight transition-colors group-hover:text-primary",
							children: hairloom.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
							amount: hairloom.price,
							size: "md"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "Quality products for everyday life",
						width: 1600,
						height: 1200,
						className: "aspect-[4/3] w-full object-cover rounded-md hero-entrance"
					})
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
