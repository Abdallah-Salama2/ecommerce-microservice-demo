import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmation._id-CHyEVscI.js
var $$splitComponentImporter = () => import("./order-confirmation._id-AqBFBjiC.mjs");
var Route = createFileRoute("/order-confirmation/$id")({
	head: () => ({ meta: [{ title: "Order Confirmation — My Store" }, {
		name: "description",
		content: "View your order confirmation"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
