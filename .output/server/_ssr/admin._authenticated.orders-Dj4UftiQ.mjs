import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as cn } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { t as PriceTag } from "./price-tag-DbjEP9Ql.mjs";
import { r as useAdminOrders } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as ChevronRight, h as Search, j as Eye, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { s as TableRowSkeleton } from "./skeletons-BNdFXLsd.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.orders-Dj4UftiQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_TABS = [
	{
		key: "ALL",
		label: "All Orders"
	},
	{
		key: "PENDING",
		label: "Pending"
	},
	{
		key: "PROCESSING",
		label: "Processing"
	},
	{
		key: "SHIPPED",
		label: "Shipped"
	},
	{
		key: "DELIVERED",
		label: "Delivered"
	},
	{
		key: "CANCELLED",
		label: "Cancelled"
	}
];
function AdminOrdersListPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("ALL");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const statusParam = activeTab === "ALL" ? void 0 : activeTab;
	const { data, isLoading, error } = useAdminOrders({
		page: currentPage,
		limit: 10,
		...statusParam ? { status: statusParam } : {}
	});
	const orders = data?.data || [];
	const pagination = data?.pagination;
	const filteredOrders = orders.filter((order) => {
		if (!searchTerm.trim()) return true;
		const term = searchTerm.toLowerCase();
		const orderIdStr = String(order.id).toLowerCase();
		const email = order.user?.email?.toLowerCase() || "";
		const name = `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.toLowerCase();
		return orderIdStr.includes(term) || email.includes(term) || name.includes(term);
	});
	const getStatusBadgeVariant = (status) => {
		switch (status.toUpperCase()) {
			case "PENDING": return "pending";
			case "PROCESSING": return "processing";
			case "SHIPPED": return "shipped";
			case "DELIVERED": return "delivered";
			case "CANCELLED": return "cancelled";
			default: return "default";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
				children: "Orders Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Monitor customer orders, review details, and update fulfillment statuses."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border pb-4",
				children: STATUS_TABS.map((tab) => {
					const isActive = activeTab === tab.key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setActiveTab(tab.key);
							setCurrentPage(1);
						},
						className: cn("rounded-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors", isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"),
						children: tab.label
					}, tab.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "border-b border-border py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "text-base font-medium",
						children: [
							"Orders (",
							pagination?.totalItems ?? filteredOrders.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-xs w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search order ID or email...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-primary"
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-0",
				children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Order ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Items"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Total Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Workstation"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRowSkeleton, { columns: 7 }, i))
						})]
					})
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-destructive",
					children: "Failed to load orders."
				}) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-12 text-center text-muted-foreground",
					children: "No orders found."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Order ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Items"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Total Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Workstation"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: filteredOrders.map((order) => {
								const statusVariant = getStatusBadgeVariant(order.status);
								const itemCount = order.items?.reduce((acc, i) => acc + i.quantity, 0) ?? 0;
								const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric"
								});
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-6 py-4 font-mono text-xs font-semibold text-foreground",
											children: ["#", order.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate font-medium text-foreground max-w-[180px]",
													children: order.user ? `${order.user.firstName} ${order.user.lastName}` : "Guest User"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs text-muted-foreground max-w-[180px]",
													children: order.user?.email || "No email"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-6 py-4 text-muted-foreground font-mono text-xs",
											children: [
												itemCount,
												" ",
												itemCount === 1 ? "item" : "items"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
												amount: order.totalAmount,
												size: "sm"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-xs text-muted-foreground whitespace-nowrap",
											children: dateStr
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: statusVariant,
												className: "whitespace-nowrap",
												children: order.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "secondary",
												size: "sm",
												className: "gap-1.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/admin/orders/$id",
													params: { id: String(order.id) },
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), "Inspect"]
												})
											})
										})
									]
								}, order.id);
							})
						})]
					})
				}), pagination && pagination.totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Page ",
							pagination.currentPage,
							" of ",
							pagination.totalPages
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: currentPage <= 1,
							onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
							className: "gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Previous"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: currentPage >= pagination.totalPages,
							onClick: () => setCurrentPage((prev) => prev + 1),
							className: "gap-1",
							children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					})]
				})]
			})] })
		]
	});
}
//#endregion
export { AdminOrdersListPage as component };
