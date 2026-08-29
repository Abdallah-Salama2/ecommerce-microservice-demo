import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./auth-C3oJgxmz.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-3baiqKjd.mjs";
import { t as themeScript } from "./theme-provider-B6MLIRMm.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$27 } from "../_storefront.category._slug-cxYjSdy2.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Route$28 } from "../_storefront.order-confirmation._id-BJ_amsrQ.mjs";
import { t as Route$29 } from "../_storefront.product._slug-CNh8JIxN.mjs";
import { t as Route$30 } from "../_storefront.reset-password-COyGgv8Y.mjs";
import { t as Route$31 } from "../_storefront.search-Ydk6VzGc.mjs";
import { t as Route$32 } from "../_storefront.shop-DfKn8naw.mjs";
import { t as Route$33 } from "./admin._authenticated.orders._id-LjO8zYOq.mjs";
import { t as Route$34 } from "./admin._authenticated.products._id.edit-ByErm2Xm.mjs";
import { t as Route$35 } from "./admin._authenticated.products._slug.edit-BeaPDnjD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C_cCHL_R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-vRToi67Y.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function ErrorSearchBar() {
	const [query, setQuery] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.trim()) window.location.href = `/search`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "mt-6 flex w-full max-w-sm gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "text",
			placeholder: "Search for products…",
			value: query,
			onChange: (e) => setQuery(e.target.value),
			className: "flex-1"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
			children: "Search"
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-md flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSearchBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80",
						children: "Back to home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-md flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "500"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "We hit an unexpected error. You can try refreshing, search for what you need, or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorSearchBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Back to home"
					})]
				})
			]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "My Store — Quality goods for everyday life" },
			{
				name: "description",
				content: "My Store offers quality products across electronics, books, beauty, toys, fitness, clothing, and home goods."
			},
			{
				property: "og:title",
				content: "My Store — Quality goods for everyday life"
			},
			{
				property: "og:description",
				content: "Quality products across electronics, books, beauty, toys, fitness, clothing, and home goods."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			id: "theme-script",
			children: themeScript
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	(0, import_react.useEffect)(() => {
		initializeAuth();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$25 = () => import("../_storefront-eA_Jufj8.mjs");
var Route$25 = createFileRoute("/_storefront")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./admin-ChRe4jtd.mjs");
var Route$24 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("../_storefront.index-uhDfpUJn.mjs");
var Route$23 = createFileRoute("/_storefront/")({
	head: () => ({ meta: [
		{ title: "My Store — Quality goods for everyday life" },
		{
			name: "description",
			content: "A curated marketplace featuring electronics, books, beauty, toys, fitness, clothing, and home goods. Quality products, carefully selected."
		},
		{
			property: "og:title",
			content: "My Store — Quality goods for everyday life"
		},
		{
			property: "og:description",
			content: "Discover our curated collection across electronics, books, beauty, toys, fitness, clothing, and home goods."
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
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("../_storefront.about-BfQfFcQ1.mjs");
var Route$22 = createFileRoute("/_storefront/about")({
	head: () => ({ meta: [
		{ title: "About Us — My Store" },
		{
			name: "description",
			content: "Learn about My Store - our mission, values, and commitment to quality products and customer satisfaction."
		},
		{
			property: "og:title",
			content: "About Us — My Store"
		},
		{
			property: "og:description",
			content: "Discover our story and what drives us to provide the best products."
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
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("../_storefront.cart-BIYRLbhg.mjs");
var Route$21 = createFileRoute("/_storefront/cart")({
	head: () => ({ meta: [{ title: "Cart — My Store" }, {
		name: "description",
		content: "Review your shopping cart"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("../_storefront.categories-BNAHNxqp.mjs");
var Route$20 = createFileRoute("/_storefront/categories")({
	head: () => ({ meta: [
		{ title: "Categories — My Store" },
		{
			name: "description",
			content: "Browse all our categories: electronics, books, beauty, toys, fitness, clothing, and home goods."
		},
		{
			property: "og:title",
			content: "Categories — My Store"
		},
		{
			property: "og:description",
			content: "Find exactly what you're looking for in our organized categories."
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
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("../_storefront.checkout-DiDW_Iqg.mjs");
var Route$19 = createFileRoute("/_storefront/checkout")({
	head: () => ({ meta: [{ title: "Checkout — My Store" }, {
		name: "description",
		content: "Complete your purchase"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("../_storefront.dashboard-NRT8KbEn.mjs");
var Route$18 = createFileRoute("/_storefront/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — My Store" }, {
		name: "description",
		content: "Manage your orders and addresses"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("../_storefront.forgot-password-CAEuh3kn.mjs");
objectType({ email: stringType().email("Invalid email address") });
var Route$17 = createFileRoute("/_storefront/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot Password — My Store" }, {
		name: "description",
		content: "Reset your password"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_storefront.login-C-bKvbc2.mjs");
objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
var Route$16 = createFileRoute("/_storefront/login")({
	beforeLoad: () => {
		if (useAuthStore.getState().isAuthenticated) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Login — My Store" }, {
		name: "description",
		content: "Sign in to your account"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("../_storefront.privacy-BXL8fBuv.mjs");
var Route$15 = createFileRoute("/_storefront/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — My Store" }, {
		name: "description",
		content: "Learn how My Store collects, uses, and protects your personal information when you shop with us."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_storefront.register-DwvPG1_o.mjs");
objectType({
	firstName: stringType().min(2, "First name must be at least 2 characters"),
	lastName: stringType().min(2, "Last name must be at least 2 characters"),
	email: stringType().email("Invalid email address"),
	password: stringType().min(6, "Password must be at least 6 characters"),
	confirmPassword: stringType().min(6, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"]
});
var Route$14 = createFileRoute("/_storefront/register")({
	beforeLoad: () => {
		if (useAuthStore.getState().isAuthenticated) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Register — My Store" }, {
		name: "description",
		content: "Create a new account"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("../_storefront.returns-u9rI-Zk5.mjs");
var Route$13 = createFileRoute("/_storefront/returns")({
	head: () => ({ meta: [{ title: "Returns & Refunds — My Store" }, {
		name: "description",
		content: "Learn about My Store's return and refund policies, including eligibility, timelines, and how to initiate a return."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_storefront.shipping-policy-By-J_0A6.mjs");
var Route$12 = createFileRoute("/_storefront/shipping-policy")({
	head: () => ({ meta: [{ title: "Shipping Policy — My Store" }, {
		name: "description",
		content: "Learn about My Store's shipping options, delivery times, tracking, and international shipping details."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_storefront.terms-DGJ7hubb.mjs");
var Route$11 = createFileRoute("/_storefront/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — My Store" }, {
		name: "description",
		content: "Read the terms and conditions governing your use of My Store and purchases made through our platform."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin._authenticated-D_QcaoxT.mjs");
var Route$10 = createFileRoute("/admin/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.login-BvhN-PXf.mjs");
objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(1, "Password is required")
});
var Route$9 = createFileRoute("/admin/login")({
	head: () => ({ meta: [
		{ title: "Admin Login — My Store" },
		{
			name: "description",
			content: "Administrative access only"
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_storefront.account.wishlist-CLMq5e8f.mjs");
var Route$8 = createFileRoute("/_storefront/account/wishlist")({
	head: () => ({ meta: [{ title: "Wishlist — My Store" }, {
		name: "description",
		content: "Your saved products — keep track of items you love and add them to your cart when you're ready."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/**
* WishlistPage — consumes shared reactive useWishlist store.
*
* TODO: Replace with backend API when wishlist endpoint is available.
*/
var $$splitComponentImporter$7 = () => import("./admin._authenticated.index-bWWqwBfn.mjs");
var Route$7 = createFileRoute("/admin/_authenticated/")({
	head: () => ({ meta: [{ title: "Dashboard — Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin._authenticated.categories-BtxlInWJ.mjs");
var Route$6 = createFileRoute("/admin/_authenticated/categories")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin._authenticated.customers-BmkOpUO8.mjs");
var Route$5 = createFileRoute("/admin/_authenticated/customers")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin._authenticated.orders-Dj4UftiQ.mjs");
var Route$4 = createFileRoute("/admin/_authenticated/orders")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin._authenticated.products-BbRhn3Oo.mjs");
var Route$3 = createFileRoute("/admin/_authenticated/products")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin._authenticated.settings-Dl98vfwk.mjs");
var Route$2 = createFileRoute("/admin/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin._authenticated.products.index-BM9mrH6h.mjs");
var Route$1 = createFileRoute("/admin/_authenticated/products/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin._authenticated.products.new-y43_iWSI.mjs");
var Route = createFileRoute("/admin/_authenticated/products/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var StorefrontRoute = Route$25.update({
	id: "/_storefront",
	getParentRoute: () => Route$26
});
var AdminRoute = Route$24.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$26
});
var StorefrontIndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => StorefrontRoute
});
var StorefrontAboutRoute = Route$22.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => StorefrontRoute
});
var StorefrontCartRoute = Route$21.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => StorefrontRoute
});
var StorefrontCategoriesRoute = Route$20.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => StorefrontRoute
});
var StorefrontCheckoutRoute = Route$19.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => StorefrontRoute
});
var StorefrontDashboardRoute = Route$18.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => StorefrontRoute
});
var StorefrontForgotPasswordRoute = Route$17.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => StorefrontRoute
});
var StorefrontLoginRoute = Route$16.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => StorefrontRoute
});
var StorefrontPrivacyRoute = Route$15.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => StorefrontRoute
});
var StorefrontRegisterRoute = Route$14.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => StorefrontRoute
});
var StorefrontResetPasswordRoute = Route$30.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => StorefrontRoute
});
var StorefrontReturnsRoute = Route$13.update({
	id: "/returns",
	path: "/returns",
	getParentRoute: () => StorefrontRoute
});
var StorefrontSearchRoute = Route$31.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => StorefrontRoute
});
var StorefrontShippingPolicyRoute = Route$12.update({
	id: "/shipping-policy",
	path: "/shipping-policy",
	getParentRoute: () => StorefrontRoute
});
var StorefrontShopRoute = Route$32.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => StorefrontRoute
});
var StorefrontTermsRoute = Route$11.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => StorefrontRoute
});
var AdminAuthenticatedRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$9.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var StorefrontAccountWishlistRoute = Route$8.update({
	id: "/account/wishlist",
	path: "/account/wishlist",
	getParentRoute: () => StorefrontRoute
});
var StorefrontCategorySlugRoute = Route$27.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => StorefrontRoute
});
var StorefrontOrderConfirmationIdRoute = Route$28.update({
	id: "/order-confirmation/$id",
	path: "/order-confirmation/$id",
	getParentRoute: () => StorefrontRoute
});
var StorefrontProductSlugRoute = Route$29.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => StorefrontRoute
});
var AdminAuthenticatedIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedCategoriesRoute = Route$6.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedCustomersRoute = Route$5.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedOrdersRoute = Route$4.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedProductsRoute = Route$3.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminAuthenticatedRoute
});
var AdminAuthenticatedOrdersIdRoute = Route$33.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AdminAuthenticatedOrdersRoute
});
var AdminAuthenticatedProductsIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminAuthenticatedProductsRoute
});
var AdminAuthenticatedProductsNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminAuthenticatedProductsRoute
});
var AdminAuthenticatedProductsIdEditRoute = Route$34.update({
	id: "/$id/edit",
	path: "/$id/edit",
	getParentRoute: () => AdminAuthenticatedProductsRoute
});
var AdminAuthenticatedProductsSlugEditRoute = Route$35.update({
	id: "/$slug/edit",
	path: "/$slug/edit",
	getParentRoute: () => AdminAuthenticatedProductsRoute
});
var StorefrontRouteChildren = {
	StorefrontAboutRoute,
	StorefrontCartRoute,
	StorefrontCategoriesRoute,
	StorefrontCheckoutRoute,
	StorefrontDashboardRoute,
	StorefrontForgotPasswordRoute,
	StorefrontLoginRoute,
	StorefrontPrivacyRoute,
	StorefrontRegisterRoute,
	StorefrontResetPasswordRoute,
	StorefrontReturnsRoute,
	StorefrontSearchRoute,
	StorefrontShippingPolicyRoute,
	StorefrontShopRoute,
	StorefrontTermsRoute,
	StorefrontIndexRoute,
	StorefrontAccountWishlistRoute,
	StorefrontCategorySlugRoute,
	StorefrontOrderConfirmationIdRoute,
	StorefrontProductSlugRoute
};
var StorefrontRouteWithChildren = StorefrontRoute._addFileChildren(StorefrontRouteChildren);
var AdminAuthenticatedOrdersRouteChildren = { AdminAuthenticatedOrdersIdRoute };
var AdminAuthenticatedOrdersRouteWithChildren = AdminAuthenticatedOrdersRoute._addFileChildren(AdminAuthenticatedOrdersRouteChildren);
var AdminAuthenticatedProductsRouteChildren = {
	AdminAuthenticatedProductsNewRoute,
	AdminAuthenticatedProductsIndexRoute,
	AdminAuthenticatedProductsIdEditRoute,
	AdminAuthenticatedProductsSlugEditRoute
};
var AdminAuthenticatedRouteChildren = {
	AdminAuthenticatedCategoriesRoute,
	AdminAuthenticatedCustomersRoute,
	AdminAuthenticatedOrdersRoute: AdminAuthenticatedOrdersRouteWithChildren,
	AdminAuthenticatedProductsRoute: AdminAuthenticatedProductsRoute._addFileChildren(AdminAuthenticatedProductsRouteChildren),
	AdminAuthenticatedSettingsRoute,
	AdminAuthenticatedIndexRoute
};
var AdminRouteChildren = {
	AdminAuthenticatedRoute: AdminAuthenticatedRoute._addFileChildren(AdminAuthenticatedRouteChildren),
	AdminLoginRoute
};
var rootRouteChildren = {
	StorefrontRoute: StorefrontRouteWithChildren,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren)
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: {
		queries: {
			staleTime: 3e5,
			retry: 1,
			refetchOnWindowFocus: false
		},
		mutations: { retry: 1 }
	} });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
