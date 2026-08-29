import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price-tag-DbjEP9Ql.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* PriceTag — the signature element.
* A small rotated monospace "physical price tag" chip with a punch hole.
* Use this EVERYWHERE a price is displayed (cards, PDP, cart, admin).
*/
var priceTagVariants = cva("relative inline-flex select-none items-center gap-1.5 border pl-4 pr-2.5 font-mono tabular-nums leading-none shadow-[var(--shadow-tag)]", {
	variants: {
		variant: {
			default: "border-border bg-card text-foreground",
			primary: "border-primary bg-primary text-primary-foreground",
			promo: "border-promo bg-promo text-promo-foreground",
			muted: "border-border bg-muted text-muted-foreground"
		},
		size: {
			sm: "h-6 rounded-sm text-[0.6875rem] -rotate-2",
			md: "h-8 rounded-sm text-sm -rotate-2",
			lg: "h-11 rounded-md pl-6 pr-4 text-xl -rotate-3"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
function formatPrice(amount, currency = "$") {
	return `${currency}${amount.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
var PriceTag = import_react.forwardRef(({ amount, compareAt, currency = "$", variant, size, className, ...props }, ref) => {
	const onSale = typeof compareAt === "number" && compareAt > amount;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: cn(priceTagVariants({
			variant: onSale ? "promo" : variant,
			size
		}), className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full border border-current opacity-60", size === "lg" ? "size-2" : "size-1.5")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: formatPrice(amount, currency)
			}),
			onSale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.85em] line-through opacity-60",
				children: formatPrice(compareAt, currency)
			}) : null
		]
	});
});
PriceTag.displayName = "PriceTag";
//#endregion
export { PriceTag as t };
