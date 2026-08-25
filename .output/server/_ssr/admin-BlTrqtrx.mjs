import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BlTrqtrx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminRoute({ children, redirectTo = "/" }) {
	const navigate = useNavigate();
	const { isAuthenticated, isInitialized, user } = useAuthStore();
	const isUserAdmin = user?.roles?.includes("Admin") || false;
	(0, import_react.useEffect)(() => {
		if (!isInitialized) return;
		if (!isAuthenticated) navigate({
			to: "/login",
			search: { redirect: window.location.pathname }
		});
		else if (!isUserAdmin) navigate({ to: redirectTo });
	}, [
		isAuthenticated,
		isInitialized,
		navigate,
		redirectTo,
		isUserAdmin
	]);
	if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading..."
		})
	});
	if (!isAuthenticated || !isUserAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container mx-auto px-4 py-12 md:py-24 max-w-7xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8 flex items-center justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold tracking-tight text-foreground sm:text-5xl",
				children: "Admin Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: "Welcome to the secure administrative area."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium text-foreground",
						children: "Total Users"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-3xl font-semibold",
						children: "1,248"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium text-foreground",
						children: "Active Orders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-3xl font-semibold",
						children: "42"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium text-foreground",
						children: "Revenue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-3xl font-semibold",
						children: "$12,450"
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { AdminDashboard as component };
