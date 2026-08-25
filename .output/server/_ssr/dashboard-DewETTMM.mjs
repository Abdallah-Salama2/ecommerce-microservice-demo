import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SectionHeading, t as Container } from "./section-Bv8OXeZv.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { n as useAddresses, u as useOrders } from "./use-api-BH_NuuxZ.mjs";
import { t as Badge } from "./badge-Db4JAkY2.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CKwNL28M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DewETTMM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProtectedRoute({ children, redirectTo = "/login" }) {
	const navigate = useNavigate();
	const { isAuthenticated, isInitialized } = useAuthStore();
	(0, import_react.useEffect)(() => {
		if (isInitialized && !isAuthenticated) navigate({
			to: redirectTo,
			search: { redirect: window.location.pathname }
		});
	}, [
		isAuthenticated,
		isInitialized,
		navigate,
		redirectTo
	]);
	if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading..."
		})
	});
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function DashboardPage() {
	const { data: ordersData, isLoading: ordersLoading } = useOrders();
	const { data: addressesData, isLoading: addressesLoading } = useAddresses();
	const { user } = useAuthStore();
	const orders = ordersData?.data || [];
	const addresses = addressesData?.data || [];
	const statusColors = {
		pending: "bg-yellow-100 text-yellow-800",
		processing: "bg-blue-100 text-blue-800",
		shipped: "bg-purple-100 text-purple-800",
		delivered: "bg-green-100 text-green-800",
		cancelled: "bg-red-100 text-red-800",
		Pending: "bg-yellow-100 text-yellow-800",
		Processing: "bg-blue-100 text-blue-800",
		Shipped: "bg-purple-100 text-purple-800",
		Delivered: "bg-green-100 text-green-800",
		Cancelled: "bg-red-100 text-red-800"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: ["Welcome back, ", user?.firstName || "User"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Manage your orders and addresses"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: `${orders.length} order${orders.length !== 1 ? "s" : ""}`,
					title: "Your orders",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							children: "Start shopping"
						})
					})
				}), ordersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex items-center justify-center py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Loading orders..."
					})
				}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col items-center justify-center py-12 border border-border rounded-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium",
							children: "No orders yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "When you place an order, it will appear here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "lg",
							className: "mt-6",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								children: "Start shopping"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-4",
					children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											children: ["Order #", order.id]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: statusColors[order.status] || "bg-gray-100 text-gray-800",
											children: order.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: new Date(order.createdAt).toLocaleDateString()
									}),
									order.itemCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											order.itemCount,
											" item",
											order.itemCount !== 1 ? "s" : ""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: order.totalAmount,
									size: "md"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "mt-2",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/order-confirmation/$id",
										params: { id: order.id },
										children: "View details"
									})
								})]
							})]
						})
					}) }, order.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: `${addresses.length} address${addresses.length !== 1 ? "es" : ""}`,
					title: "Your addresses",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							children: "Add new address"
						})
					})
				}), addressesLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex items-center justify-center py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Loading addresses..."
					})
				}) : addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col items-center justify-center py-12 border border-border rounded-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-medium",
							children: "No addresses saved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Save an address to make checkout faster."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "primary",
							size: "lg",
							className: "mt-6",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								children: "Add address"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: addresses.map((address) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: address.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: address.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: address.line1
								}),
								address.line2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: address.line2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										address.city,
										", ",
										address.governorate
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: address.country
								}),
								address.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary mt-2",
									children: "Default"
								})
							]
						})
					}) }, address.id))
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-28 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Quick actions" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "lg",
							className: "w-full justify-start",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								children: "Shop all products"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "lg",
							className: "w-full justify-start",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cart",
								children: "View cart"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "lg",
							className: "w-full justify-start",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout",
								children: "Checkout"
							})
						})
					]
				})] })
			})]
		})]
	}) });
}
//#endregion
export { DashboardPage as component };
