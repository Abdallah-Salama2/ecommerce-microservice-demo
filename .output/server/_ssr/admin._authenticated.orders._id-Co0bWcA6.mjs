import { n as resolveImageUrl } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { t as PriceTag } from "./price-tag-DbjEP9Ql.mjs";
import { E as useUpdateOrderStatus, _ as useOrder } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as CircleAlert, N as CreditCard, r as User, v as RefreshCw, w as MapPin, x as Package, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { n as getProductPrimaryImage } from "./types-DwK1Lx06.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
import { t as Route } from "./admin._authenticated.orders._id-LjO8zYOq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.orders._id-Co0bWcA6.js
var import_jsx_runtime = require_jsx_runtime();
var VALID_TRANSITIONS = {
	Pending: ["Processing", "Cancelled"],
	Processing: ["Shipped", "Cancelled"],
	Shipped: ["Delivered"],
	Delivered: [],
	Cancelled: []
};
var TERMINAL_STATES = /* @__PURE__ */ new Set(["Delivered", "Cancelled"]);
/** Normalize whatever the backend sends ("PENDING", "pending", "Pending") → "Pending" */
function normalizeStatus(raw) {
	const s = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
	if (s in VALID_TRANSITIONS) return s;
	return raw;
}
var STATUS_BADGE_VARIANT = {
	Pending: "pending",
	Processing: "processing",
	Shipped: "shipped",
	Delivered: "delivered",
	Cancelled: "cancelled"
};
function StatusControl({ currentStatus, orderId }) {
	const updateStatusMutation = useUpdateOrderStatus();
	const nextOptions = VALID_TRANSITIONS[currentStatus] ?? [];
	const isTerminal = TERMINAL_STATES.has(currentStatus);
	const handleTransition = async (newStatus) => {
		try {
			await updateStatusMutation.mutateAsync({
				id: orderId,
				newStatus
			});
			toast.success(`Order status updated to ${newStatus}`);
		} catch (err) {
			const msg = err?.message ?? "";
			if (msg.includes("409") || msg.toLowerCase().includes("conflict")) toast.error("Status conflict — this order was already updated by another session. Refresh the page and retry.");
			else toast.error(msg || "Failed to update order status");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-primary/20 bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: "Fulfillment Status Control"
				}), isTerminal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "inline h-3 w-3 text-amber-500" }), "Terminal state — no further transitions are allowed."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Advance the order through the fulfillment pipeline."
				})] })]
			}), isTerminal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: STATUS_BADGE_VARIANT[currentStatus] ?? "default",
				className: "whitespace-nowrap self-start px-3 py-1.5 text-xs sm:self-auto",
				children: [currentStatus, " (Terminal)"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: nextOptions.map((nextStatus) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: nextStatus === "Cancelled" ? "destructive" : "default",
					disabled: updateStatusMutation.isPending,
					onClick: () => handleTransition(nextStatus),
					className: "whitespace-nowrap gap-1.5",
					children: updateStatusMutation.isPending ? "Updating..." : `→ ${nextStatus}`
				}, nextStatus))
			})]
		})
	});
}
function AdminOrderWorkstationPage() {
	const { id } = Route.useParams();
	const { data, isLoading, error, refetch } = useOrder(id);
	const order = data?.data;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-12 text-center text-muted-foreground",
		children: "Loading order workstation..."
	});
	if (error || !order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-12 text-center space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-destructive font-medium",
				children: [
					"Order #",
					id,
					" not found or access denied."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground max-w-sm mx-auto",
				children: "If you are trying to view a customer order, ensure your admin session is active. The admin role is required to inspect orders that don't belong to your own account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => refetch(),
					children: "Retry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/orders",
						children: "Back to Orders List"
					})
				})]
			})
		]
	});
	const currentStatus = normalizeStatus(order.status || "Pending");
	const badgeVariant = STATUS_BADGE_VARIANT[currentStatus] ?? "default";
	const dateStr = new Date(order.createdAt).toLocaleString("en-US", {
		dateStyle: "medium",
		timeStyle: "short"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "gap-1 px-0 text-muted-foreground hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/orders",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Back to Orders List"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
					children: [
						"Order #",
						order.id,
						" Workstation"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: ["Placed on ", dateStr]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: badgeVariant,
					className: "whitespace-nowrap text-sm px-3 py-1 self-start sm:self-auto",
					children: currentStatus
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusControl, {
				currentStatus,
				orderId: id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "border-b border-border py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "flex items-center gap-2 text-base font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4 text-primary" }),
								"Line Items (",
								(order.items || []).length,
								")"
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3",
											children: "Item"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3",
											children: "Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3",
											children: "Qty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3 text-right",
											children: "Subtotal"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: (order.items || []).map((item) => {
										const img = item.product ? getProductPrimaryImage(item.product) : null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [img?.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: resolveImageUrl(img.thumbnailUrl),
														alt: item.product?.name || "Product",
														className: "h-12 w-12 rounded-sm object-cover border border-border shrink-0 bg-surface"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-12 w-12 rounded-sm bg-muted flex items-center justify-center shrink-0 text-xs text-muted-foreground",
														children: "No img"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-medium text-foreground truncate max-w-[240px]",
															children: item.product?.name || `Product #${item.productId}`
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "font-mono text-xs text-muted-foreground",
															children: ["SKU: PRD-", item.productId]
														})]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
													amount: item.price,
													size: "sm"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 font-mono text-xs text-foreground",
												children: item.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
													amount: item.price * item.quantity,
													size: "sm"
												})
											})
										] }, item.id);
									})
								})]
							})
						})
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "border-b border-border py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2 text-base font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-primary" }), "Customer Info"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-3 p-5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest User"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-foreground truncate",
								children: order.user?.email || "N/A"
							})] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "border-b border-border py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2 text-base font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), "Shipping Address"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "p-5 text-sm leading-relaxed text-muted-foreground",
							children: order.address ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: order.address.line1
								}),
								order.address.line2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.address.line2 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									order.address.city,
									", ",
									order.address.governorate,
									" ",
									order.address.postalCode || ""
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.address.country })
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "italic text-muted-foreground/70",
								children: "Standard Shipping Address"
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "border-b border-border py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2 text-base font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-primary" }), "Payment Summary"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-3 p-5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
										amount: order.totalAmount,
										size: "sm"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Free"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Included"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border pt-3 font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Paid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
										amount: order.totalAmount,
										size: "md"
									})]
								})
							]
						})] })
					]
				})]
			})
		]
	});
}
//#endregion
export { AdminOrderWorkstationPage as component };
