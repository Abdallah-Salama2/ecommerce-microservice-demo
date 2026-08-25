import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-GOh1txBj.js
var $$splitComponentImporter = () => import("./category._slug-Drgd4A7m.mjs");
var Route = createFileRoute("/category/$slug")({
	validateSearch: (search) => ({ sort: String(search.sort ?? "featured") }),
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
