//#region node_modules/.nitro/vite/services/ssr/assets/types-DwK1Lx06.js
function getProductPrimaryImage(product) {
	if (product.images && product.images.length > 0) {
		const sorted = [...product.images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
		const primary = sorted.find((img) => img.isPrimary) || sorted[0];
		if (primary) return {
			thumbnailUrl: primary.thumbnailUrl || primary.previewUrl || "/placeholder.jpg",
			previewUrl: primary.previewUrl || primary.thumbnailUrl || "/placeholder.jpg",
			altText: primary.altText || product.name
		};
	}
	const fallback = product.thumbnailUrl || "/placeholder.jpg";
	return {
		thumbnailUrl: fallback,
		previewUrl: fallback,
		altText: product.name
	};
}
function getProductIdNumber(product) {
	return parseInt(product.id, 10);
}
//#endregion
export { getProductPrimaryImage as n, getProductIdNumber as t };
