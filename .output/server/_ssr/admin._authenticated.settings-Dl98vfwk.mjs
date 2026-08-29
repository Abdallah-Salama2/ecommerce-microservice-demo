import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { P as Clock, m as Settings } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { n as CardContent, t as Card } from "./card-BXC95m2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.settings-Dl98vfwk.js
var import_jsx_runtime = require_jsx_runtime();
function AdminSettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
			children: "Store Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Configure store preferences, currency display, shipping rules, and security."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-dashed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center justify-center p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "mt-4 gap-1.5 whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), "Backend Endpoint Pending"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-lg font-normal tracking-tight text-foreground",
						children: "Store Settings Workstation Coming Soon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm text-muted-foreground leading-relaxed",
						children: "The store configuration API is scheduled for the next backend release. Once active, store branding, payment gateway toggles, and notification settings will be manageable here."
					})
				]
			})
		})]
	});
}
//#endregion
export { AdminSettingsPage as component };
