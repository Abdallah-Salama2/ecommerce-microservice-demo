import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.shop-DfKn8naw.js
var $$splitComponentImporter = () => import("./_storefront.shop-ChJeylm0.mjs");
var Route = createFileRoute("/_storefront/shop")({
	validateSearch: (search) => ({
		category: String(search.category ?? ""),
		sort: String(search.sort ?? "featured"),
		page: Number(search.page ?? 1)
	}),
	head: () => ({ meta: [
		{ title: "Catalog — My Store" },
		{
			name: "description",
			content: "Browse our full catalog: electronics, books, beauty, toys, fitness, clothing, and home goods. Quality products for everyday life."
		},
		{
			property: "og:title",
			content: "Catalog — My Store"
		},
		{
			property: "og:description",
			content: "Every product we offer, in one place."
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
