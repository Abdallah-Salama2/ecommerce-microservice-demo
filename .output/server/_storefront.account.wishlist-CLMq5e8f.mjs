import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { b as useProducts } from "./_ssr/use-api-B_SRtOPB.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Trash2, k as Heart } from "./_libs/lucide-react.mjs";
import { n as useWishlist, t as ProductCard } from "./_ssr/product-card-CZOW7OOo.mjs";
import { t as ProtectedRoute } from "./_ssr/protected-route-CdiYTn0X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.account.wishlist-CLMq5e8f.js
var import_jsx_runtime = require_jsx_runtime();
/**
* WishlistPage — consumes shared reactive useWishlist store.
*
* TODO: Replace with backend API when wishlist endpoint is available.
*/
function WishlistPage() {
	const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
	const { data: productsData, isLoading } = useProducts({
		page: 1,
		limit: 100
	});
	const allProducts = productsData?.data || [];
	const wishlistProducts = allProducts.filter((p) => wishlistIds.has(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Your wishlist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Saved items"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Products you've saved for later. Add them to your cart when you're ready."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14",
			children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Loading…"
				})
			}) : wishlistProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center rounded-lg border border-border py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-8 w-8 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg font-medium",
						children: "Your wishlist is empty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Browse our catalog and save items you love."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						size: "lg",
						className: "mt-8",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							children: "Start shopping"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: `${wishlistProducts.length} item${wishlistProducts.length !== 1 ? "s" : ""}`,
				title: "Your saved products",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: clearWishlist,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Clear all"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: wishlistProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group/wish relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						showAddToCart: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity group-hover/wish:opacity-100",
						onClick: () => removeFromWishlist(product.id),
						"aria-label": `Remove ${product.name} from wishlist`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				}, product.id))
			})] }), wishlistProducts.length === 0 && allProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Discover",
					title: "You might like these"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: allProducts.slice(0, 4).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						showAddToCart: true
					}, product.id))
				})]
			})]
		})]
	}) });
}
//#endregion
export { WishlistPage as component };
