import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Container } from "./section-Bv8OXeZv.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Field } from "./field-D_fasfp7.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-D3qY5Dr2.js
var import_jsx_runtime = require_jsx_runtime();
var registerSchema = objectType({
	firstName: stringType().min(2, "First name must be at least 2 characters"),
	lastName: stringType().min(2, "Last name must be at least 2 characters"),
	email: stringType().email("Invalid email address"),
	password: stringType().min(6, "Password must be at least 6 characters"),
	confirmPassword: stringType().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"]
});
function RegisterPage() {
	const { register: registerUser, isLoading, error, clearError } = useAuthStore();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(registerSchema) });
	const onSubmit = async (data) => {
		clearError();
		try {
			await registerUser({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password
			});
			toast.success("Account created successfully! Please sign in.");
			window.location.href = "/login";
		} catch (err) {
			toast.error(error || "Registration failed. Please try again.");
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
						children: "Create account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Join us to start shopping"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-12 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "First name",
								htmlFor: "firstName",
								error: errors.firstName?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "firstName",
									type: "text",
									placeholder: "John",
									...register("firstName")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Last name",
								htmlFor: "lastName",
								error: errors.lastName?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lastName",
									type: "text",
									placeholder: "Doe",
									...register("lastName")
								})
							})]
						}),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Confirm password",
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
							children: isLoading || isSubmitting ? "Creating account..." : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "rule-label transition-colors hover:text-foreground",
								children: "Sign in"
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
