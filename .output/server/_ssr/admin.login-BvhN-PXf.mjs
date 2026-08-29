import { n as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./auth-C3oJgxmz.mjs";
import { t as cn } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-3baiqKjd.mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { t as Field } from "./field-CGThm7jV.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as EyeOff, j as Eye, o as TriangleAlert, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-BvhN-PXf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loginSchema = objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(1, "Password is required")
});
function AdminLoginPage() {
	const navigate = useNavigate();
	const { login, logout, isLoading, clearError } = useAuthStore();
	const [accessDenied, setAccessDenied] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(loginSchema) });
	const onSubmit = async (data) => {
		clearError();
		setAccessDenied(false);
		try {
			await login(data);
			if (!(useAuthStore.getState().user?.roles?.includes("Admin") ?? false)) {
				await logout();
				setAccessDenied(true);
				return;
			}
			toast.success("Welcome to the admin panel.");
			navigate({ to: "/admin" });
		} catch (_err) {
			const storeError = useAuthStore.getState().error;
			toast.error(storeError || "Login failed. Please check your credentials.");
		}
	};
	const busy = isLoading || isSubmitting;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tracking-widest uppercase text-muted-foreground",
						children: "My Store / Admin"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-normal tracking-tight text-foreground",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Administrative access only. This area is not for customers."
				}),
				accessDenied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "alert",
					className: "mt-6 flex items-start gap-3 rounded-sm border border-destructive/30 bg-destructive/8 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-destructive",
						children: "Access denied"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-destructive/80",
						children: "Your account does not have administrator privileges."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-8 space-y-5",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Email",
							htmlFor: "admin-email",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "admin-email",
								type: "email",
								autoComplete: "email",
								placeholder: "admin@example.com",
								"aria-invalid": !!errors.email,
								className: errors.email ? "border-destructive focus-visible:border-destructive" : "",
								...register("email")
							}), errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.email.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Password",
							htmlFor: "admin-password",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "admin-password",
									type: showPassword ? "text" : "password",
									autoComplete: "current-password",
									placeholder: "••••••••",
									"aria-invalid": !!errors.password,
									className: cn("pr-10", errors.password ? "border-destructive focus-visible:border-destructive" : ""),
									...register("password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword((prev) => !prev),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none",
									"aria-label": showPassword ? "Hide password" : "Show password",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							}), errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.password.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							size: "lg",
							className: "mt-2 w-full",
							disabled: busy,
							children: busy ? "Signing in…" : "Sign in to admin panel"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-center text-xs text-muted-foreground",
					children: [
						"Looking for the customer store?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "underline underline-offset-2 hover:text-foreground transition-colors",
							children: "Sign in here"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
