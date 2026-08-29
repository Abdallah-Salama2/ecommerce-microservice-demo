import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.category._slug-cxYjSdy2.js
var $$splitComponentImporter = () => import("./_storefront.category._slug-BghP5UXB.mjs");
var Route = createFileRoute("/_storefront/category/$slug")({
	validateSearch: (search) => ({
		sort: String(search.sort ?? "featured"),
		subcategory: search.subcategory ? Number(search.subcategory) : void 0
	}),
	head: ({ params }) => ({ meta: [
		{ title: `${params.slug} — My Store` },
		{
			name: "description",
			content: `Browse our ${params.slug} collection. Quality products for everyday life.`
		},
		{
			property: "og:title",
			content: `${params.slug} — My Store`
		},
		{
			property: "og:description",
			content: `Browse our ${params.slug} collection.`
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
