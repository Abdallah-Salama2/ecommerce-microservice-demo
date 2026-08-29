import { n as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { n as resolveImageUrl } from "./_ssr/utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { n as Select, t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { t as PriceTag } from "./_ssr/price-tag-DbjEP9Ql.mjs";
import { b as useProducts, s as useCategories, t as useAddToCart, y as useProduct } from "./_ssr/use-api-B_SRtOPB.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { k as Heart } from "./_libs/lucide-react.mjs";
import { t as Badge } from "./_ssr/badge-DT0_Z5aK.mjs";
import { t as StockBadge } from "./_ssr/stock-badge-C5zFJKSi.mjs";
import { n as getProductPrimaryImage, t as getProductIdNumber } from "./_ssr/types-DwK1Lx06.mjs";
import { n as useWishlist, t as ProductCard } from "./_ssr/product-card-CZOW7OOo.mjs";
import { a as ProductCardSkeleton, i as PDPSkeleton, o as Skeleton } from "./_ssr/skeletons-BNdFXLsd.mjs";
import { t as ContentCard } from "./_ssr/content-card-2R5OUqbI.mjs";
import { t as Route } from "./_storefront.product._slug-CNh8JIxN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.product._slug-Cjtqy8q1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const { data: product, isLoading: productLoading, error: productError } = useProduct(slug);
	const { data: productsData } = useProducts({ limit: 12 });
	const { data: categoriesData } = useCategories();
	const addToCart = useAddToCart();
	const { isInWishlist, toggleWishlist } = useWishlist();
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [userSelectedImageIndex, setUserSelectedImageIndex] = (0, import_react.useState)(null);
	if (product) document.title = `${product.name} — My Store`;
	const products = productsData?.data || [];
	const categories = categoriesData?.data || [];
	const galleryImages = (0, import_react.useMemo)(() => {
		if (!product || !product.images || product.images.length === 0) {
			const primary = product ? getProductPrimaryImage(product) : {
				thumbnailUrl: "/placeholder.jpg",
				previewUrl: "/placeholder.jpg",
				altText: "Product"
			};
			return [{
				id: 0,
				thumbnailUrl: primary.thumbnailUrl,
				previewUrl: primary.previewUrl,
				altText: primary.altText,
				isPrimary: true,
				sortOrder: 0
			}];
		}
		return [...product.images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
	}, [product]);
	const primaryIndex = (0, import_react.useMemo)(() => {
		const idx = galleryImages.findIndex((img) => img.isPrimary);
		return idx >= 0 ? idx : 0;
	}, [galleryImages]);
	const currentImageIndex = userSelectedImageIndex !== null && userSelectedImageIndex < galleryImages.length ? userSelectedImageIndex : primaryIndex;
	const getCategoryName = (categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) return category.name;
		for (const cat of categories) {
			const subCat = cat.children.find((c) => c.id === categoryId);
			if (subCat) return subCat.name;
		}
		return "General";
	};
	const related = product ? products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 3) : [];
	const handleAddToCart = async () => {
		if (!product) return;
		try {
			await addToCart.mutateAsync({
				productId: getProductIdNumber(product),
				quantity
			});
			toast.success(`Added ${quantity} ${product.name} to cart`);
		} catch (error) {
			toast.error("Failed to add item to cart");
		}
	};
	if (productLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PDPSkeleton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Pairs well with",
					title: "Related products",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-32 rounded-md" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCard, {
				eyebrow: "Quality assurance",
				title: "Every product meets our standards",
				className: "mt-20 max-w-3xl",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48 rounded-md" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" })
			})
		]
	});
	if (productError || !product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-10 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: "Product not found. Please try again."
			})
		})
	});
	const soldOut = product.stockQuantity <= 0;
	const categoryName = getCategoryName(product.categoryId);
	const isSaved = isInWishlist(product.id);
	const fallbackImg = {
		thumbnailUrl: "/placeholder.jpg",
		previewUrl: "/placeholder.jpg",
		altText: product.name
	};
	const activeImage = galleryImages[currentImageIndex] || galleryImages[0] || fallbackImg;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Breadcrumb",
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "rule-label transition-colors hover:text-foreground",
						children: "Catalog"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rule-label",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rule-label",
						children: categoryName
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-surface rounded-lg overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: resolveImageUrl(activeImage.previewUrl),
							alt: activeImage.altText || product.name,
							width: 1024,
							height: 1024,
							className: "aspect-square w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-5 right-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
								amount: product.price,
								size: "lg"
							})
						})]
					}), galleryImages.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-4",
						children: galleryImages.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setUserSelectedImageIndex(i),
							"aria-label": `View image ${i + 1}`,
							className: `relative w-24 h-24 overflow-hidden rounded-md bg-surface transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${currentImageIndex === i ? "ring-2 ring-primary" : "opacity-70"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: resolveImageUrl(img.thumbnailUrl),
								alt: img.altText || `${product.name} view ${i + 1}`,
								width: 200,
								height: 200,
								loading: "lazy",
								className: "aspect-square w-full object-cover"
							})
						}, img.id || i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: categoryName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
								amount: product.price,
								size: "lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockBadge, { stock: product.stockQuantity })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-base leading-relaxed text-muted-foreground",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row sm:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Quantity",
									htmlFor: "pdp-qty",
									className: "sm:w-28",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										id: "pdp-qty",
										value: quantity.toString(),
										onChange: (e) => setQuantity(parseInt(e.target.value)),
										disabled: soldOut,
										options: [
											{
												value: "1",
												label: "1"
											},
											{
												value: "2",
												label: "2"
											},
											{
												value: "3",
												label: "3"
											},
											{
												value: "4",
												label: "4"
											},
											{
												value: "5",
												label: "5"
											}
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									size: "lg",
									disabled: soldOut || addToCart.isPending,
									className: "flex-1",
									onClick: handleAddToCart,
									children: soldOut ? "Sold out" : addToCart.isPending ? "Adding..." : "Add to bag"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "lg",
									"aria-label": isSaved ? "Remove from wishlist" : "Add to wishlist",
									onClick: () => toggleWishlist({
										id: product.id,
										name: product.name
									}),
									className: "px-4",
									title: isSaved ? "Saved to wishlist" : "Save to wishlist",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}` })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Free shipping over $200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "30-day returns" })]
						})
					]
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Pairs well with",
					title: "Related products",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							children: "Browse catalog"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						categoryName: getCategoryName(p.categoryId)
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentCard, {
				eyebrow: "Quality assurance",
				title: "Every product meets our standards",
				className: "mt-20 max-w-3xl",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					children: "Read about our quality process"
				}),
				children: "We carefully select each product for quality and value. Most items ship within 1-2 business days."
			})
		]
	});
}
//#endregion
export { ProductPage as component };
