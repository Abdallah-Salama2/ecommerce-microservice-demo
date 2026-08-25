import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Container } from "./section-Bv8OXeZv.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { m as useUpdateCartItem, o as useClearCart, p as useRemoveFromCart, r as useCart } from "./use-api-BH_NuuxZ.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DS3X_XmA.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { data: cartData, isLoading, error, refetch } = useCart();
	const updateCartItem = useUpdateCartItem();
	const removeFromCart = useRemoveFromCart();
	const clearCart = useClearCart();
	const cart = cartData?.data;
	const items = cart?.items || [];
	const subtotal = cart?.subtotal || 0;
	const itemCount = cart?.itemCount || 0;
	const handleQuantityChange = async (cartItemId, newQuantity) => {
		if (newQuantity < 1) return;
		try {
			await updateCartItem.mutateAsync({
				cartItemId,
				quantity: newQuantity
			});
			refetch();
		} catch (error) {
			toast.error("Failed to update quantity");
			refetch();
		}
	};
	const handleRemoveItem = async (cartItemId) => {
		try {
			await removeFromCart.mutateAsync(cartItemId);
			toast.success("Item removed from cart");
			refetch();
		} catch (error) {
			toast.error("Failed to remove item");
			refetch();
		}
	};
	const handleClearCart = async () => {
		try {
			await clearCart.mutateAsync();
			toast.success("Cart cleared");
			refetch();
		} catch (error) {
			toast.error("Failed to clear cart");
			refetch();
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading cart..."
			})
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[50vh] flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive mb-4",
				children: "Failed to load cart. Please try again later."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => refetch(),
				variant: "secondary",
				children: "Retry"
			})]
		})
	});
	if (!cart || cart.items === null && cart.subtotal === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rule-label",
				children: "Cart"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
				children: "Your bag"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 flex min-h-[50vh] flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-medium",
					children: "Your cart is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Add some products to get started."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "primary",
					size: "lg",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "Start shopping"
					})
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Cart"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Your bag"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: [
						itemCount,
						" item",
						itemCount !== 1 ? "s" : "",
						" in your cart"
					]
				})
			]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 flex min-h-[50vh] flex-col items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-medium",
					children: "Your cart is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Add some products to get started."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "primary",
					size: "lg",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "Start shopping"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-8",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-6 border-b border-border pb-8",
					children: [item.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: item.productSlug },
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumbnailUrl,
							alt: item.productName,
							width: 1024,
							height: 1024,
							loading: "lazy",
							className: "w-24 h-24 object-cover"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-24 h-24 shrink-0 bg-muted flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-xs",
							children: "No image"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$slug",
									params: { slug: item.productSlug },
									className: "font-display text-lg leading-snug tracking-tight transition-colors hover:text-primary",
									children: item.productName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: item.stockQuantity > 0 ? `${item.stockQuantity} in stock` : "Out of stock"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
								amount: item.price * item.quantity,
								size: "md"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: `qty-${item.cartItemId}`,
										className: "sr-only",
										children: "Quantity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `qty-${item.cartItemId}`,
										type: "number",
										min: "1",
										max: item.stockQuantity,
										value: item.quantity,
										onChange: (e) => {
											const value = parseInt(e.target.value);
											if (value > 0 && value <= item.stockQuantity) handleQuantityChange(item.cartItemId, value);
										},
										className: "w-20",
										disabled: updateCartItem.isPending
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted-foreground",
										children: ["× $", item.price.toFixed(2)]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => handleRemoveItem(item.cartItemId),
								disabled: removeFromCart.isPending,
								children: "Remove"
							})]
						})]
					})]
				}, item.cartItemId))
			}), items.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: handleClearCart,
				disabled: clearCart.isPending,
				className: "self-start",
				children: "Clear cart"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-28 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg tracking-tight",
							children: "Order summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: subtotal,
									size: "md"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Calculated at checkout"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 border-t border-border pt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: subtotal,
									size: "lg"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "lg",
							className: "mt-6 w-full",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								children: "Proceed to checkout"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "mt-4 w-full",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								children: "Continue shopping"
							})
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { CartPage as component };
