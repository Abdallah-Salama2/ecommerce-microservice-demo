import { n as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./_ssr/auth-C3oJgxmz.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./_ssr/input-3baiqKjd.mjs";
import { t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as stringType, t as objectType } from "./_libs/zod.mjs";
import { t as Route } from "./_storefront.reset-password-COyGgv8Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.reset-password-BP9372s6.js
var import_jsx_runtime = require_jsx_runtime();
var resetPasswordSchema = objectType({
	password: stringType().min(6, "Password must be at least 6 characters"),
	confirmPassword: stringType().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"]
});
function ResetPasswordPage() {
	const { token } = Route.useSearch();
	const navigate = useNavigate();
	const { resetPassword, isLoading, error, clearError } = useAuthStore();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(resetPasswordSchema) });
	const onSubmit = async (data) => {
		if (!token) {
			toast.error("Invalid or missing reset token");
			return;
		}
		clearError();
		try {
			await resetPassword(token, data.password);
			toast.success("Password reset successfully! Please sign in with your new password.");
			navigate({ to: "/login" });
		} catch (err) {
			toast.error(error || "Failed to reset password. Please try again.");
		}
	};
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl",
					children: "Invalid reset link"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground",
					children: "This password reset link is invalid or has expired."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "primary",
					size: "lg",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Request new reset link"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-5xl",
						children: "Set new password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Enter your new password below"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-12 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "New password",
							htmlFor: "password",
							error: errors.password?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								placeholder: "••••••••",
								...register("password")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confirm new password",
							htmlFor: "confirmPassword",
							error: errors.confirmPassword?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirmPassword",
								type: "password",
								placeholder: "••••••••",
								...register("confirmPassword")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							size: "lg",
							className: "w-full",
							disabled: isLoading || isSubmitting,
							children: isLoading || isSubmitting ? "Resetting..." : "Reset password"
						})
					]
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
export { ResetPasswordPage as component };
