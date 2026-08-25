import "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/** General-purpose editorial content card. */
function ContentCard({ eyebrow, title, children, footer, className, as: As = "div" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(As, {
		className: cn("flex flex-col gap-4 border border-border bg-card p-6 sm:p-8 transition-colors hover:border-foreground/25", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rule-label",
				children: eyebrow
			}) : null,
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-normal leading-tight tracking-tight text-foreground",
				children: title
			}) : null,
			children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children
			}) : null,
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-2",
				children: footer
			}) : null
		]
	});
}
//#endregion
export { ContentCard as t };
