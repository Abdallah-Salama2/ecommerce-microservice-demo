import { t as create } from "../_libs/zustand.mjs";
import { n as resolveImageUrl, t as cn } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { t as PriceTag } from "./price-tag-DbjEP9Ql.mjs";
import { t as useAddToCart } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { k as Heart } from "../_libs/lucide-react.mjs";
import { t as StockBadge } from "./stock-badge-C5zFJKSi.mjs";
import { n as getProductPrimaryImage, t as getProductIdNumber } from "./types-DwK1Lx06.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-CZOW7OOo.js
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "wishlist_items";
function loadWishlistFromStorage() {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? new Set(JSON.parse(saved)) : /* @__PURE__ */ new Set();
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function saveWishlistToStorage(ids) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
	} catch {}
}
var useWishlistStore = create((set, get) => ({
	wishlistIds: loadWishlistFromStorage(),
	isInWishlist: (productId) => {
		return get().wishlistIds.has(productId);
	},
	toggleWishlist: (product) => {
		const current = get().wishlistIds;
		const next = new Set(current);
		if (next.has(product.id)) {
			next.delete(product.id);
			saveWishlistToStorage(next);
			set({ wishlistIds: next });
			toast.success(`Removed "${product.name}" from wishlist`);
		} else {
			next.add(product.id);
			saveWishlistToStorage(next);
			set({ wishlistIds: next });
			toast.success(`Added "${product.name}" to wishlist`);
		}
	},
	removeFromWishlist: (productId) => {
		const current = get().wishlistIds;
		if (!current.has(productId)) return;
		const next = new Set(current);
		next.delete(productId);
		saveWishlistToStorage(next);
		set({ wishlistIds: next });
	},
	clearWishlist: () => {
		const empty = /* @__PURE__ */ new Set();
		saveWishlistToStorage(empty);
		set({ wishlistIds: empty });
		toast.success("Cleared wishlist");
	}
}));
/**
* useWishlist — convenient hook alias for consuming the wishlist store.
*/
function useWishlist() {
	const store = useWishlistStore();
	return {
		wishlistIds: store.wishlistIds,
		isInWishlist: store.isInWishlist,
		toggleWishlist: store.toggleWishlist,
		removeFromWishlist: store.removeFromWishlist,
		clearWishlist: store.clearWishlist
	};
}
/**
* ProductCard — reusable across home, catalog, related, and future pages.
* Price is always rendered through <PriceTag />.
*/
function ProductCard({ product, categoryName, priority = false, className, showAddToCart = false }) {
	const primaryImg = getProductPrimaryImage(product);
	const imageUrl = resolveImageUrl(primaryImg.thumbnailUrl);
	const imageAlt = primaryImg.altText || product.name;
	const isOutOfStock = product.stockQuantity === 0;
	const addToCart = useAddToCart();
	const { isInWishlist, toggleWishlist } = useWishlist();
	const isSaved = isInWishlist(product.id);
	const handleToggleWishlist = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleWishlist({
			id: product.id,
			name: product.name
		});
	};
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
		className: cn("group relative flex flex-col h-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-surface rounded-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: product.slug },
					className: "block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
					"aria-label": product.name,
					children: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageUrl,
						alt: imageAlt,
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
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleToggleWishlist,
					"aria-label": isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`,
					className: "group/wish absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-5 w-5 transition-colors", isSaved ? "fill-primary text-primary" : "text-foreground/70 group-hover/wish:text-foreground") })
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-1 flex-col justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-normal leading-snug tracking-tight min-h-[2.75rem] line-clamp-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/product/$slug",
							params: { slug: product.slug },
							className: "transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							children: product.name
						})
					}), !isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockBadge, {
						stock: product.stockQuantity,
						showCount: false
					})]
				}), categoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rule-label mt-2",
					children: categoryName
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 min-h-[1rem]" }),
				showAddToCart && !isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					className: "w-full mt-4",
					onClick: handleAddToCart,
					disabled: addToCart.isPending,
					children: addToCart.isPending ? "Adding..." : "Add to cart"
				})
			]
		})]
	});
}
//#endregion
export { useWishlist as n, ProductCard as t };
