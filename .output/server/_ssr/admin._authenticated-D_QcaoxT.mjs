import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./auth-C3oJgxmz.mjs";
import { t as cn } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTheme } from "./theme-provider-B6MLIRMm.mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as FolderTree, E as LayoutDashboard, R as ChevronRight, S as Moon, T as LogOut, d as ShoppingCart, l as Sun, m as Settings, n as Users, p as ShieldCheck, x as Package } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated-D_QcaoxT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* AdminRoute — guards any admin page.
*
* Unauthenticated users → /admin/login
* Authenticated non-admins → /admin/login (they'll see the access-denied
*   state if they try to log in again, or they can use the customer link)
*/
function AdminRoute({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated, isInitialized, user } = useAuthStore();
	const isUserAdmin = user?.roles?.includes("Admin") ?? false;
	(0, import_react.useEffect)(() => {
		if (!isInitialized) return;
		if (!isAuthenticated || !isUserAdmin) navigate({ to: "/admin/login" });
	}, [
		isAuthenticated,
		isInitialized,
		navigate,
		isUserAdmin
	]);
	if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		})
	});
	if (!isAuthenticated || !isUserAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var NAV_ITEMS = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/products",
		label: "Products",
		icon: Package
	},
	{
		to: "/admin/categories",
		label: "Categories",
		icon: FolderTree
	},
	{
		to: "/admin/orders",
		label: "Orders",
		icon: ShoppingCart
	},
	{
		to: "/admin/customers",
		label: "Customers",
		icon: Users
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminAuthenticatedLayout() {
	const { logout, user } = useAuthStore();
	const currentPath = useRouterState().location.pathname;
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const isActive = (to, exact) => exact ? currentPath === to : currentPath.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center gap-2.5 border-b border-border px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: "My Store"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label mt-0.5",
							children: "Admin Panel"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 overflow-y-auto px-3 py-4",
					"aria-label": "Admin navigation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-0.5",
						children: NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
							const active = isActive(to, exact);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to,
								className: cn("flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
								"aria-current": active ? "page" : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), label]
							}) }, to);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-3 rounded-sm px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary",
							children: user?.firstName?.[0] ?? "A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-medium text-foreground",
								children: [
									user?.firstName,
									" ",
									user?.lastName
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: user?.email
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
						onClick: () => logout(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 pl-60 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-card px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Breadcrumb",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "rule-label transition-colors hover:text-foreground",
						children: "Admin"
					}), currentPath !== "/admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rule-label text-foreground capitalize",
						children: currentPath.split("/admin/")[1]?.split("/")[0] ?? ""
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Toggle theme",
						onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
						children: mounted ? theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rule-label transition-colors hover:text-foreground",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "View store ↗"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	}) });
}
//#endregion
export { AdminAuthenticatedLayout as component };
