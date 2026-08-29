import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BdjFfDmo.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Resolves image URLs to absolute paths.
* If the URL is already absolute (starts with http:// or https://), returns it unchanged.
* Otherwise, prepends the API server's origin (base URL without /api path segment).
*/
function resolveImageUrl(url) {
	if (!url) return "/placeholder.jpg";
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	return `${"http://localhost:5000/api".replace(/\/api$/, "")}${url.startsWith("/") ? url : `/${url}`}`;
}
//#endregion
export { resolveImageUrl as n, cn as t };
