import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { t as useAddToCart } from "./use-api-BH_NuuxZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Db4JAkY2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-BYharLKc.js
var import_jsx_runtime = require_jsx_runtime();
function stockState(stock) {
	if (stock <= 0) return "soldout";
	if (stock <= 5) return "low";
	return "instock";
}
/** Stock status badge — mono count included so inventory reads consistently. */
function StockBadge({ stock, showCount = true }) {
	const state = stockState(stock);
	if (state === "soldout") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "soldout",
		children: "Sold out"
	});
	if (state === "low") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "low",
		children: showCount ? `Only ${stock} left` : "Low stock"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "instock",
		children: showCount ? `${stock} in stock` : "In stock"
	});
}
function getProductIdNumber(product) {
	return parseInt(product.id, 10);
}
/**
* ProductCard — reusable across home, catalog, related, and future pages.
* Price is always rendered through <PriceTag />.
*/
function ProductCard({ product, categoryName, priority = false, className, showAddToCart = false }) {
	const imageUrl = product.thumbnailUrl || "/placeholder.jpg";
	const isOutOfStock = product.stockQuantity === 0;
	const addToCart = useAddToCart();
	const handleAddToCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await addToCart.mutateAsync({
				productId: getProductIdNumber(product),
				quantity: 1
			});
			toast.success(`Added ${product.name} to cart`);
		} catch (error) {
			toast.error("Failed to add item to cart");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group relative flex flex-col", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/product/$slug",
				params: { slug: product.slug },
				className: "block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
				"aria-label": product.name,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden bg-surface",
					children: [
						product.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl,
							alt: product.name,
							width: 1024,
							height: 1024,
							loading: priority ? "eager" : "lazy",
							className: "aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square w-full bg-muted flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-sm",
								children: "No image"
							})
						}),
						null,
						isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-4 top-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockBadge, {
								stock: 0,
								showCount: false
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-4 right-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
								amount: product.price,
								size: "md"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-normal leading-snug tracking-tight",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/product/$slug",
							params: { slug: product.slug },
							className: "transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							children: product.name
						})
					}), categoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rule-label mt-2",
						children: categoryName
					})]
				}), !isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockBadge, {
					stock: product.stockQuantity,
					showCount: false
				})]
			}),
			showAddToCart && !isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				className: "mt-4 w-full",
				onClick: handleAddToCart,
				disabled: addToCart.isPending,
				children: addToCart.isPending ? "Adding..." : "Add to cart"
			})
		]
	});
}
//#endregion
export { StockBadge as n, getProductIdNumber as r, ProductCard as t };
