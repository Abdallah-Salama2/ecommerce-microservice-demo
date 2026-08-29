import { n as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { n as useAuthStore } from "./_ssr/auth-C3oJgxmz.mjs";
import { t as cn } from "./_ssr/utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./_ssr/input-3baiqKjd.mjs";
import { n as useTheme } from "./_ssr/theme-provider-B6MLIRMm.mjs";
import { t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { t as PriceTag } from "./_ssr/price-tag-DbjEP9Ql.mjs";
import { o as useCart } from "./_ssr/use-api-B_SRtOPB.mjs";
import { _ as useNavigate, f as Outlet, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { C as Menu, E as LayoutDashboard, S as Moon, T as LogOut, f as ShoppingBag, h as Search, k as Heart, l as Sun, r as User, t as X } from "./_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront-eA_Jufj8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
						amount: (item.price || 0) * item.quantity,
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
	const subtotal = cart?.subtotal ?? 0;
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
					amount: subtotal || 0,
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
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuthStore();
	const { data: cartData } = useCart();
	const itemCount = (cartData?.data)?.itemCount || 0;
	const { theme, setTheme } = useTheme();
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Wishlist",
								onClick: () => navigate({ to: "/account/wishlist" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {})
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Toggle theme",
								onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
								children: mounted ? theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-5" })
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account/wishlist",
								onClick: () => setMenuOpen(false),
								className: "block py-2 font-display text-xl tracking-tight transition-colors hover:text-primary",
								children: "Wishlist"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shipping-policy",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Shipping"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/returns",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Returns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "rule-label transition-colors hover:text-foreground",
							children: "Privacy"
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
function StorefrontLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { StorefrontLayout as component };
