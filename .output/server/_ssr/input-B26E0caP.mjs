import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./section-Bv8OXeZv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-B26E0caP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		ref,
		className: cn("flex h-11 w-full rounded-sm border border-input bg-card px-3.5 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-foreground/40 focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium", className),
		...props
	});
});
Input.displayName = "Input";
//#endregion
export { Input as t };
