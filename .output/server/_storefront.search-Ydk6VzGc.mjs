import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.search-Ydk6VzGc.js
var $$splitComponentImporter = () => import("./_storefront.search-BPpZy98c.mjs");
var Route = createFileRoute("/_storefront/search")({
	validateSearch: (search) => ({ sort: String(search.sort ?? "featured") }),
	head: () => ({ meta: [
		{ title: "Search — My Store" },
		{
			name: "description",
			content: "Search our catalog for quality products across electronics, books, beauty, toys, fitness, clothing, and home goods."
		},
		{
			property: "og:title",
			content: "Search — My Store"
		},
		{
			property: "og:description",
			content: "Find exactly what you're looking for."
		},
		{
			property: "og:type",
			content: "website"
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
