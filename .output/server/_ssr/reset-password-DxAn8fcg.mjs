import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-DxAn8fcg.js
var $$splitComponentImporter = () => import("./reset-password-CPXtUCEt.mjs");
objectType({
	password: stringType().min(6, "Password must be at least 6 characters"),
	confirmPassword: stringType().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"]
});
var Route = createFileRoute("/reset-password")({
	validateSearch: (search) => {
		return { token: stringType().optional().parse(search.token) };
	},
	head: () => ({ meta: [{ title: "Reset Password — My Store" }, {
		name: "description",
		content: "Set your new password"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
