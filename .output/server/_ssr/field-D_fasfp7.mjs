import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-D_fasfp7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Label + control + hint wrapper shared by every form surface. */
function Field({ label, htmlFor, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-2", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor,
				className: "rule-label",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
/** Native select styled to match Input — safe to wire to real state later. */
var Select = import_react.forwardRef(({ className, options, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			ref,
			className: cn("h-11 w-full appearance-none rounded-sm border border-input bg-card px-3.5 pr-9 text-sm text-foreground transition-colors hover:border-foreground/40 focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50", className),
			...props,
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.value,
				children: o.label
			}, o.value))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground",
			children: "▾"
		})]
	});
});
Select.displayName = "Select";
//#endregion
export { Select as n, Field as t };
