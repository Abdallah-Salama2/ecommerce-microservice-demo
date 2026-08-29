import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./auth-C3oJgxmz.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protected-route-CdiYTn0X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProtectedRoute({ children, redirectTo = "/login" }) {
	const navigate = useNavigate();
	const { isAuthenticated, isInitialized } = useAuthStore();
	(0, import_react.useEffect)(() => {
		if (isInitialized && !isAuthenticated) navigate({
			to: redirectTo,
			search: { redirect: window.location.pathname }
		});
	}, [
		isAuthenticated,
		isInitialized,
		navigate,
		redirectTo
	]);
	if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading..."
		})
	});
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { ProtectedRoute as t };
