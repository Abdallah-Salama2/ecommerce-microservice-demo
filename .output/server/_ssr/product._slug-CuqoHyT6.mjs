import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-CuqoHyT6.js
var $$splitComponentImporter = () => import("./product._slug-DBWx5yz5.mjs");
var Route = createFileRoute("/product/$slug")({
	head: () => ({ meta: [
		{ title: "Product — My Store" },
		{
			name: "description",
			content: "Quality products for everyday life"
		},
		{
			property: "og:title",
			content: "Product — My Store"
		},
		{
			property: "og:description",
			content: "Quality products for everyday life"
		},
		{
			property: "og:type",
			content: "product"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
