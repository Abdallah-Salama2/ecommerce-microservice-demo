import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { i as useAdminProducts, r as useAdminOrders } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as CircleX, H as ArrowRight, I as CircleCheck, P as Clock, a as Truck, d as ShoppingCart, o as TriangleAlert, s as TrendingUp, x as Package } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.index-bWWqwBfn.js
var import_jsx_runtime = require_jsx_runtime();
function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(amount);
}
function getStatusVariant(status) {
	return {
		Pending: "pending",
		Processing: "processing",
		Shipped: "shipped",
		Delivered: "delivered",
		Cancelled: "cancelled"
	}[status] ?? "default";
}
var STATUS_META = {
	Pending: {
		label: "Pending",
		icon: Clock
	},
	Processing: {
		label: "Processing",
		icon: TrendingUp
	},
	Shipped: {
		label: "Shipped",
		icon: Truck
	},
	Delivered: {
		label: "Delivered",
		icon: CircleCheck
	},
	Cancelled: {
		label: "Cancelled",
		icon: CircleX
	}
};
function MetricCard({ label, value, sub, icon: Icon, accent = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-border bg-card p-6 flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rule-label",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex h-9 w-9 items-center justify-center rounded-sm ${accent ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl font-normal tracking-tight text-foreground",
			children: value
		}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: sub
		})] })]
	});
}
function OrderRow({ order }) {
	const Icon = STATUS_META[order.status]?.icon ?? Clock;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 py-3 border-b border-border last:border-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-foreground truncate",
					children: ["Order #", order.id]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: new Date(order.createdAt).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: getStatusVariant(order.status),
				className: "shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mr-1 h-3 w-3" }), order.status]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tabular-nums shrink-0",
				children: formatCurrency(order.totalAmount)
			})
		]
	});
}
function LowStockRow({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 py-3 border-b border-border last:border-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 shrink-0 rounded-sm bg-surface overflow-hidden",
				children: product.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.thumbnailUrl,
					alt: "",
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-muted" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "flex-1 min-w-0 text-sm text-foreground truncate",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: product.stockQuantity === 0 ? "cancelled" : "pending",
				className: "shrink-0 tabular-nums",
				children: product.stockQuantity === 0 ? "Out of stock" : `${product.stockQuantity} left`
			})
		]
	});
}
function AdminDashboardPage() {
	const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({ limit: 100 });
	const { data: productsData, isLoading: productsLoading } = useAdminProducts({ limit: 200 });
	const orders = ordersData?.data ?? [];
	const products = productsData?.data ?? [];
	const totalOrders = ordersData?.pagination?.totalItems ?? orders.length;
	const totalProducts = productsData?.pagination?.totalItems ?? products.length;
	const revenue = orders.reduce((sum, o) => sum + (o.totalAmount ?? 0), 0);
	const statusCounts = orders.reduce((acc, o) => {
		acc[o.status] = (acc[o.status] ?? 0) + 1;
		return acc;
	}, {});
	const pendingCount = statusCounts["Pending"] ?? 0;
	const lowStock = [...products].filter((p) => p.stockQuantity <= 5).sort((a, b) => a.stockQuantity - b.stockQuantity).slice(0, 8);
	const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
	const loading = ordersLoading || productsLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-normal tracking-tight text-foreground",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Overview of your store's activity and inventory."
			})] }),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-sm bg-muted" }, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Total Revenue",
						value: formatCurrency(revenue),
						sub: `from ${totalOrders} order${totalOrders !== 1 ? "s" : ""}`,
						icon: TrendingUp,
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Total Orders",
						value: totalOrders,
						sub: pendingCount > 0 ? `${pendingCount} pending action` : "All fulfilled",
						icon: ShoppingCart
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Products",
						value: totalProducts,
						sub: lowStock.length > 0 ? `${lowStock.length} low stock` : "Stock healthy",
						icon: Package
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Low / Out of Stock",
						value: lowStock.length,
						sub: lowStock.length > 0 ? "Needs attention" : "All stocked",
						icon: TriangleAlert,
						accent: lowStock.length > 0
					})
				]
			}),
			!loading && Object.keys(statusCounts).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rule-label mb-4",
					children: "Orders by Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: Object.entries(statusCounts).map(([status, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: getStatusVariant(status),
							children: status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tabular-nums text-muted-foreground",
							children: count
						})]
					}, status))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Recent Orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							className: "gap-1 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/orders",
								children: ["All orders ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
							})
						})]
					}), ordersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 animate-pulse rounded-sm bg-muted" }, i))
					}) : recentOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No orders yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: recentOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderRow, { order }, order.id)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Low / Out of Stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							className: "gap-1 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin/products",
								children: ["All products ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
							})
						})]
					}), productsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 animate-pulse rounded-sm bg-muted" }, i))
					}) : lowStock.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center py-8 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "All products are well stocked."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: lowStock.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LowStockRow, { product }, product.id)) })]
				})]
			})
		]
	});
}
//#endregion
export { AdminDashboardPage as component };
