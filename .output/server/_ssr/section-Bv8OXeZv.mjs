import "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Container({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12", className),
		children
	});
}
function SectionHeading({ eyebrow, title, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rule-label",
			children: eyebrow
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 max-w-2xl font-display text-3xl font-normal leading-[1.05] tracking-tight sm:text-4xl",
			children: title
		})] }), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
//#endregion
export { SectionHeading as n, cn as r, Container as t };
