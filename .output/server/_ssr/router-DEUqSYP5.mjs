import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn, t as Container } from "./section-Bv8OXeZv.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { A as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as useCart } from "./use-api-BH_NuuxZ.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Field } from "./field-D_fasfp7.mjs";
import { t as Route$11 } from "./category._slug-GOh1txBj.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Route$12 } from "./order-confirmation._id-CHyEVscI.mjs";
import { t as Route$13 } from "./product._slug-CuqoHyT6.mjs";
import { t as Route$14 } from "./reset-password-DxAn8fcg.mjs";
import { t as Route$15 } from "./search-D21myLli.mjs";
import { t as Route$16 } from "./shop-_bu3BV3T.mjs";
import { a as Menu, i as Search, n as User, o as LogOut, r as ShoppingBag, s as LayoutDashboard, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DEUqSYP5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C7o9nrFU.css";
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
function PanelShell({ open, onOpenChange, title, description, children, footer, className, contentClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-foreground/25 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn(contentClassName, className),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-6 border-b border-border px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl font-normal tracking-tight",
						children: title
					}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-sm text-muted-foreground",
						children: description
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "sr-only",
						children: title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						"aria-label": "Close",
						className: "-mr-2 -mt-1 rounded-sm p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6 py-6",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-6 py-5",
					children: footer
				}) : null
			]
		})] })
	});
}
function Drawer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelShell, {
		...props,
		contentClassName: "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-[var(--shadow-lift)] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300"
	});
}
function MiniCartContents() {
	const { data: cartData, isLoading, refetch } = useCart();
	const cart = cartData?.data;
	const items = cart?.items || [];
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading cart..."
		})
	});
	if (!cart || cart.items === null && cart.subtotal === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Your cart is empty"
		})
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Your cart is empty"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-6",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-4",
			children: [item.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.thumbnailUrl,
				alt: item.productName,
				width: 1024,
				height: 1024,
				loading: "lazy",
				className: "size-20 shrink-0 object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-20 shrink-0 bg-muted flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-xs",
					children: "No image"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: item.productSlug },
						className: "font-display text-base leading-snug tracking-tight transition-colors hover:text-primary",
						children: item.productName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: ["Qty ", item.quantity]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
						amount: item.price * item.quantity,
						size: "sm"
					})
				]
			})]
		}, item.cartItemId))
	});
}
function MiniCartFooter() {
	const { data: cartData, refetch } = useCart();
	const cart = cartData?.data;
	const subtotal = cart?.subtotal || 0;
	const itemCount = cart?.itemCount || 0;
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Subtotal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
					amount: subtotal,
					size: "md"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				size: "lg",
				className: "w-full",
				disabled: itemCount === 0,
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					children: "Checkout"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				className: "w-full",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						category: "",
						sort: "featured"
					},
					children: "Continue shopping"
				})
			})
		]
	});
}
var nav = [
	{
		to: "/shop",
		label: "Shop all"
	},
	{
		to: "/categories",
		label: "Categories"
	},
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/about",
		label: "About us"
	}
];
function SiteHeader() {
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuthStore();
	const { data: cartData } = useCart();
	const itemCount = (cartData?.data)?.itemCount || 0;
	const isUserAdmin = user?.roles?.includes("Admin") || false;
	const handleLogout = async () => {
		await logout();
		toast.success("Signed out successfully");
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
				className: "flex h-16 items-center justify-between gap-6 sm:h-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-2xl",
						children: "My\xA0Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Main",
						className: "hidden items-center gap-8 md:flex",
						children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "rule-label transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
							children: item.label
						}, item.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Search",
								onClick: () => navigate({ to: "/search" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Open cart",
								onClick: () => setCartOpen(true),
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}), itemCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
									children: itemCount
								})]
							}),
							isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Dashboard",
									onClick: () => navigate({ to: "/dashboard" }),
									title: "Dashboard",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {})
								}),
								isUserAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Admin dashboard",
									onClick: () => navigate({ to: "/admin" }),
									title: "Admin Dashboard",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Logout",
									onClick: handleLogout,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {})
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Login",
								onClick: () => navigate({ to: "/login" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Open menu",
								className: "md:hidden",
								onClick: () => setMenuOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				open: cartOpen,
				onOpenChange: setCartOpen,
				title: "Your bag",
				description: `${itemCount} item${itemCount !== 1 ? "s" : ""} in your cart`,
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCartFooter, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCartContents, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				open: menuOpen,
				onOpenChange: setMenuOpen,
				title: "Menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Mobile",
					className: "flex flex-col",
					children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: () => setMenuOpen(false),
						className: "border-b border-border py-4 font-display text-2xl tracking-tight transition-colors hover:text-primary",
						children: item.label
					}, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border py-4",
						children: isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "rule-label mb-4",
								children: ["Signed in as ", user?.firstName]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								onClick: () => setMenuOpen(false),
								className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary",
								children: "Dashboard"
							}),
							isUserAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								onClick: () => setMenuOpen(false),
								className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary",
								children: "Admin Dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									handleLogout();
									setMenuOpen(false);
								},
								className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary text-left",
								children: "Sign out"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setMenuOpen(false),
							className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary",
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							onClick: () => setMenuOpen(false),
							className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary",
							children: "Create account"
						})] })
					})]
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-28 border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl leading-snug tracking-tight",
					children: "Quality goods for everyday life, delivered to your door."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Catalog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Care guide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Shipping"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Contact"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => e.preventDefault(),
				"aria-label": "Newsletter",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Studio letter",
					htmlFor: "footer-email",
					hint: "One note a month. Nothing else.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "footer-email",
						type: "email",
						placeholder: "you@example.com"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					className: "self-start",
					children: "Subscribe"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			className: "flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: "© 2026 My Store"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: "Prices in USD"
			})]
		})]
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
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
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
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
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
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
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
		]
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
	const { queryClient } = Route$10.useRouteContext();
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	(0, import_react.useEffect)(() => {
		initializeAuth();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-0TNLckxo.mjs");
var Route$9 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./about-CLx_G1ZJ.mjs");
var Route$8 = createFileRoute("/about")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin-BlTrqtrx.mjs");
var Route$7 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./cart-DS3X_XmA.mjs");
var Route$6 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Cart — My Store" }, {
		name: "description",
		content: "Review your shopping cart"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./categories-BExuDh8O.mjs");
var Route$5 = createFileRoute("/categories")({
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./checkout-h_ruVj6o.mjs");
var Route$4 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — My Store" }, {
		name: "description",
		content: "Complete your purchase"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard-DewETTMM.mjs");
var Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — My Store" }, {
		name: "description",
		content: "Manage your orders and addresses"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./forgot-password-CplvIF9M.mjs");
objectType({ email: stringType().email("Invalid email address") });
var Route$2 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot Password — My Store" }, {
		name: "description",
		content: "Reset your password"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./login-mJSMvvTo.mjs");
objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
var Route$1 = createFileRoute("/login")({
	beforeLoad: () => {
		if (useAuthStore.getState().isAuthenticated) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Login — My Store" }, {
		name: "description",
		content: "Sign in to your account"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./register-D3qY5Dr2.mjs");
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
var Route = createFileRoute("/register")({
	beforeLoad: () => {
		if (useAuthStore.getState().isAuthenticated) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [{ title: "Register — My Store" }, {
		name: "description",
		content: "Create a new account"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AboutRoute: Route$8.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$10
	}),
	AdminRoute: Route$7.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$10
	}),
	CartRoute: Route$6.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$10
	}),
	CategoriesRoute: Route$5.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => Route$10
	}),
	CheckoutRoute: Route$4.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$10
	}),
	DashboardRoute: Route$3.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$10
	}),
	ForgotPasswordRoute: Route$2.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$10
	}),
	LoginRoute: Route$1.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$10
	}),
	RegisterRoute: Route.update({
		id: "/register",
		path: "/register",
		getParentRoute: () => Route$10
	}),
	ResetPasswordRoute: Route$14.update({
		id: "/reset-password",
		path: "/reset-password",
		getParentRoute: () => Route$10
	}),
	SearchRoute: Route$15.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$10
	}),
	ShopRoute: Route$16.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$10
	}),
	CategorySlugRoute: Route$11.update({
		id: "/category/$slug",
		path: "/category/$slug",
		getParentRoute: () => Route$10
	}),
	OrderConfirmationIdRoute: Route$12.update({
		id: "/order-confirmation/$id",
		path: "/order-confirmation/$id",
		getParentRoute: () => Route$10
	}),
	ProductSlugRoute: Route$13.update({
		id: "/product/$slug",
		path: "/product/$slug",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
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
