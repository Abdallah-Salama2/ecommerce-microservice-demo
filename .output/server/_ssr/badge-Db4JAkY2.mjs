import "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase leading-none tracking-[0.14em]", {
	variants: { variant: {
		default: "border-border bg-card text-muted-foreground",
		outline: "border-foreground/30 bg-transparent text-foreground",
		instock: "border-primary/25 bg-primary/10 text-primary",
		low: "border-foreground/20 bg-surface text-foreground",
		soldout: "border-border bg-muted text-muted-foreground",
		/** mustard — reserved for sale / promo only */
		sale: "border-promo bg-promo text-promo-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
