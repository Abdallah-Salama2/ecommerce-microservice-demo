import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-badge-C5zFJKSi.js
var import_jsx_runtime = require_jsx_runtime();
function stockState(stock) {
	if (stock <= 0) return "soldout";
	if (stock <= 5) return "low";
	return "instock";
}
/** Stock status badge — mono count included so inventory reads consistently. */
function StockBadge({ stock, showCount = true }) {
	const state = stockState(stock);
	if (state === "soldout") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "soldout",
		children: "Sold out"
	});
	if (state === "low") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "low",
		children: showCount ? `Only ${stock} left` : "Low stock"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "instock",
		children: showCount ? `${stock} in stock` : "In stock"
	});
}
//#endregion
export { StockBadge as t };
