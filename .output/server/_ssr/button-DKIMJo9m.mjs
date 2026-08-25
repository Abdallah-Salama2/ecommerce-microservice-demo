import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
import { c as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DKIMJo9m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-tight transition-[color,background-color,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px",
			secondary: "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04] active:translate-y-px",
			ghost: "bg-transparent text-foreground hover:bg-accent",
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			outline: "border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04]",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			link: "h-auto p-0 text-foreground underline decoration-primary decoration-1 underline-offset-4 hover:text-primary"
		},
		size: {
			sm: "h-9 px-3.5 text-xs",
			default: "h-11 px-6",
			md: "h-11 px-6",
			lg: "h-13 px-8 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { Button as t };
