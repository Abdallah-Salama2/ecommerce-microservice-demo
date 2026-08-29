import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.product._slug-CNh8JIxN.js
var $$splitComponentImporter = () => import("./_storefront.product._slug-Cjtqy8q1.mjs");
var Route = createFileRoute("/_storefront/product/$slug")({
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
