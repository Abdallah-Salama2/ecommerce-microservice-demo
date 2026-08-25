import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Container } from "./section-Bv8OXeZv.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { l as useOrder } from "./use-api-BH_NuuxZ.mjs";
import { t as Badge } from "./badge-Db4JAkY2.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CKwNL28M.mjs";
import { t as Route } from "./order-confirmation._id-CHyEVscI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmation._id-AqBFBjiC.js
var import_jsx_runtime = require_jsx_runtime();
function OrderConfirmationPage() {
	const { id } = Route.useParams();
	const { data: orderData, isLoading, error } = useOrder(id);
	const order = orderData?.data;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading order details..."
			})
		})
	});
	if (error || !order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[50vh] flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive mb-4",
				children: "Failed to load order details."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					children: "Return to shop"
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Order Confirmation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Thank you for your order!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Your order has been received and is being processed."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Order Details" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Order ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: order.id
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: {
									pending: "bg-yellow-100 text-yellow-800",
									processing: "bg-blue-100 text-blue-800",
									shipped: "bg-purple-100 text-purple-800",
									delivered: "bg-green-100 text-green-800",
									cancelled: "bg-red-100 text-red-800"
								}[order.status.toLowerCase()] || "bg-gray-100 text-gray-800",
								children: order.status
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: new Date(order.createdAt).toLocaleDateString()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
								amount: order.totalAmount,
								size: "md"
							})] })
						]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Items" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: order.items?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item.productTitle || `Product #${item.productId}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Qty: ", item.quantity]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
							amount: item.totalPrice,
							size: "md"
						})]
					}, item.id))
				}) })] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:sticky lg:top-28 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Order Summary" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: order.items?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium truncate",
										children: item.productTitle || `Product #${item.productId}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Qty: ", item.quantity]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: item.totalPrice,
									size: "sm"
								})]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: order.subtotal || order.totalAmount,
									size: "md"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Included"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: order.totalAmount,
									size: "lg"
								})]
							})
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "lg",
					className: "mt-6 w-full",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "Continue shopping"
					})
				})]
			})]
		})]
	});
}
//#endregion
export { OrderConfirmationPage as component };
