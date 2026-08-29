import { n as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./_ssr/auth-C3oJgxmz.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./_ssr/input-3baiqKjd.mjs";
import { t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.forgot-password-CAEuh3kn.js
var import_jsx_runtime = require_jsx_runtime();
var forgotPasswordSchema = objectType({ email: stringType().email("Invalid email address") });
function ForgotPasswordPage() {
	const { forgotPassword, isLoading, error, clearError } = useAuthStore();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(forgotPasswordSchema) });
	const onSubmit = async (data) => {
		clearError();
		try {
			await forgotPassword(data.email);
			toast.success("Password reset email sent! Check your inbox.");
		} catch (err) {
			toast.error(error || "Failed to send reset email. Please try again.");
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
						children: "Forgot password?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Enter your email address and we'll send you a link to reset your password."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-12 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						htmlFor: "email",
						error: errors.email?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							placeholder: "you@example.com",
							...register("email")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "primary",
						size: "lg",
						className: "w-full",
						disabled: isLoading || isSubmitting,
						children: isLoading || isSubmitting ? "Sending..." : "Send reset link"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "rule-label text-sm transition-colors hover:text-foreground",
						children: "Back to sign in"
					})
				})
			]
		})
	});
}
//#endregion
export { ForgotPasswordPage as component };
