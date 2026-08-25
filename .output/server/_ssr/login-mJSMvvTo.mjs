import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Container } from "./section-Bv8OXeZv.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Field } from "./field-D_fasfp7.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-mJSMvvTo.js
var import_jsx_runtime = require_jsx_runtime();
var loginSchema = objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
function LoginPage() {
	const navigate = useNavigate();
	const { login, isLoading, error, clearError } = useAuthStore();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(loginSchema) });
	const onSubmit = async (data) => {
		clearError();
		try {
			await login(data);
			toast.success("Successfully logged in!");
			navigate({ to: "/" });
		} catch (err) {
			toast.error(error || "Login failed. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl",
						children: "Welcome back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Sign in to your account to continue"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-12 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							htmlFor: "email",
							error: errors.email?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								placeholder: "you@example.com",
								...register("email")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							htmlFor: "password",
							error: errors.password?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								placeholder: "••••••••",
								...register("password")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								className: "rule-label text-sm transition-colors hover:text-foreground",
								children: "Forgot password?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							size: "lg",
							className: "w-full",
							disabled: isLoading || isSubmitting,
							children: isLoading || isSubmitting ? "Signing in..." : "Sign in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								className: "rule-label transition-colors hover:text-foreground",
								children: "Sign up"
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
