import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Container } from "./section-Bv8OXeZv.mjs";
import { n as useAuthStore } from "./api-DleoGe4W.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-DKIMJo9m.mjs";
import { t as PriceTag } from "./price-tag-Ceswt2sB.mjs";
import { c as useCreateOrder, n as useAddresses, r as useCart, s as useCreateAddress } from "./use-api-BH_NuuxZ.mjs";
import { t as Input } from "./input-B26E0caP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CKwNL28M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-h_ruVj6o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
function CheckoutPage() {
	const navigate = useNavigate();
	const { data: cartData, isLoading: cartLoading, error: cartError } = useCart();
	const { data: addressesData, isLoading: addressesLoading, refetch: refetchAddresses } = useAddresses();
	const createAddress = useCreateAddress();
	const createOrder = useCreateOrder();
	const { isAuthenticated, user } = useAuthStore();
	const [step, setStep] = (0, import_react.useState)("auth");
	const [selectedAddressId, setSelectedAddressId] = (0, import_react.useState)(null);
	const [isGuest, setIsGuest] = (0, import_react.useState)(false);
	const [guestEmail, setGuestEmail] = (0, import_react.useState)("");
	const [newAddress, setNewAddress] = (0, import_react.useState)({
		fullName: "",
		phone: "",
		line1: "",
		line2: "",
		city: "",
		governorate: "",
		country: "Egypt",
		postalCode: "",
		isDefault: false
	});
	const [showNewAddressForm, setShowNewAddressForm] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const cart = cartData?.data;
	const items = cart?.items || [];
	const subtotal = cart?.subtotal || 0;
	const addresses = addressesData?.data || [];
	if (!cartLoading && !cartError && (!cart || items.length === 0)) {
		navigate({ to: "/cart" });
		return null;
	}
	if (step === "auth" && isAuthenticated) setStep("address");
	const handleGuestCheckout = () => {
		if (!guestEmail || !guestEmail.includes("@")) {
			toast.error("Please enter a valid email address");
			return;
		}
		setIsGuest(true);
		setStep("address");
	};
	const handleLogin = () => {
		navigate({
			to: "/login",
			search: { redirect: "/checkout" }
		});
	};
	const handleAddressSelect = (addressId) => {
		setSelectedAddressId(addressId);
	};
	const handleNewAddressSubmit = async (e) => {
		e.preventDefault();
		if (!newAddress.fullName || !newAddress.phone || !newAddress.line1 || !newAddress.city || !newAddress.governorate) {
			toast.error("Please fill in all required address fields");
			return;
		}
		try {
			await createAddress.mutateAsync(newAddress);
			toast.success("Address added successfully");
			setShowNewAddressForm(false);
			setNewAddress({
				fullName: "",
				phone: "",
				line1: "",
				line2: "",
				city: "",
				governorate: "",
				country: "Egypt",
				postalCode: "",
				isDefault: false
			});
			refetchAddresses();
		} catch (error) {
			toast.error("Failed to add address");
		}
	};
	const handleProceedToPayment = () => {
		if (!selectedAddressId && !isGuest) {
			toast.error("Please select a shipping address");
			return;
		}
		setStep("payment");
	};
	const handlePlaceOrder = async () => {
		if (!selectedAddressId && !isGuest) {
			toast.error("Please select a shipping address");
			return;
		}
		setIsSubmitting(true);
		setStep("processing");
		try {
			const addressId = selectedAddressId ? parseInt(selectedAddressId, 10) : 0;
			const idempotencyKey = generateUUID();
			const result = await createOrder.mutateAsync({
				addressId,
				idempotencyKey
			});
			toast.success("Order placed successfully!");
			navigate({
				to: "/order-confirmation/$id",
				params: { id: result.data.id }
			});
		} catch (error) {
			toast.error("Failed to place order. Please try again.");
			setStep("payment");
			setIsSubmitting(false);
		}
	};
	if (cartLoading || addressesLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-[50vh] items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading checkout..."
			})
		})
	});
	if (cartError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-14 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[50vh] flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive mb-4",
				children: "Failed to load cart. Please try again later."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					children: "Return to cart"
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rule-label",
				children: "Checkout"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
				children: "Complete your order"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8",
				children: [
					step === "auth" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Step 1: Account" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "lg",
									className: "w-full",
									onClick: handleLogin,
									children: "Sign in to existing account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex justify-center text-xs uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-card px-2 text-muted-foreground",
											children: "Or continue as guest"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "guest-email",
										className: "text-sm font-medium",
										children: "Email address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "guest-email",
										type: "email",
										placeholder: "you@example.com",
										value: guestEmail,
										onChange: (e) => setGuestEmail(e.target.value),
										className: "mt-2"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "primary",
										size: "lg",
										className: "w-full",
										onClick: handleGuestCheckout,
										children: "Continue as guest"
									})]
								})
							]
						})
					})] }),
					step === "address" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Step 2: Shipping Address" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6",
						children: [
							!isGuest && addresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Select an existing address:"
								}), addresses.map((address) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `cursor-pointer rounded-lg border p-4 transition-colors ${selectedAddressId === address.id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/40"}`,
									onClick: () => handleAddressSelect(address.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: address.fullName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: address.phone
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: address.line1
											}),
											address.line2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: address.line2
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													address.city,
													", ",
													address.governorate
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: address.country
											}),
											address.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary",
												children: "Default"
											})
										]
									})
								}, address.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex justify-center text-xs uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-card px-2 text-muted-foreground",
										children: showNewAddressForm ? "Cancel" : "Or add a new address"
									})
								})]
							}),
							!showNewAddressForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "lg",
								className: "w-full",
								onClick: () => setShowNewAddressForm(true),
								children: "Add new address"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleNewAddressSubmit,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "fullName",
											className: "text-sm font-medium",
											children: "Full name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "fullName",
											placeholder: "John Doe",
											value: newAddress.fullName,
											onChange: (e) => setNewAddress({
												...newAddress,
												fullName: e.target.value
											}),
											className: "mt-2",
											required: true
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "phone",
											className: "text-sm font-medium",
											children: "Phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "phone",
											placeholder: "+20 123 456 7890",
											value: newAddress.phone,
											onChange: (e) => setNewAddress({
												...newAddress,
												phone: e.target.value
											}),
											className: "mt-2",
											required: true
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "line1",
										className: "text-sm font-medium",
										children: "Address line 1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "line1",
										placeholder: "123 Main St",
										value: newAddress.line1,
										onChange: (e) => setNewAddress({
											...newAddress,
											line1: e.target.value
										}),
										className: "mt-2",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "line2",
										className: "text-sm font-medium",
										children: "Address line 2 (optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "line2",
										placeholder: "Apt 4B",
										value: newAddress.line2,
										onChange: (e) => setNewAddress({
											...newAddress,
											line2: e.target.value
										}),
										className: "mt-2"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "city",
											className: "text-sm font-medium",
											children: "City"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "city",
											placeholder: "Cairo",
											value: newAddress.city,
											onChange: (e) => setNewAddress({
												...newAddress,
												city: e.target.value
											}),
											className: "mt-2",
											required: true
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "governorate",
											className: "text-sm font-medium",
											children: "Governorate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "governorate",
											placeholder: "Cairo",
											value: newAddress.governorate,
											onChange: (e) => setNewAddress({
												...newAddress,
												governorate: e.target.value
											}),
											className: "mt-2",
											required: true
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "country",
											className: "text-sm font-medium",
											children: "Country"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "country",
											placeholder: "Egypt",
											value: newAddress.country,
											onChange: (e) => setNewAddress({
												...newAddress,
												country: e.target.value
											}),
											className: "mt-2",
											required: true
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "postalCode",
											className: "text-sm font-medium",
											children: "Postal code (optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "postalCode",
											placeholder: "12345",
											value: newAddress.postalCode,
											onChange: (e) => setNewAddress({
												...newAddress,
												postalCode: e.target.value
											}),
											className: "mt-2"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "secondary",
											size: "lg",
											className: "flex-1",
											onClick: () => {
												setShowNewAddressForm(false);
												setNewAddress({
													fullName: "",
													phone: "",
													line1: "",
													line2: "",
													city: "",
													governorate: "",
													country: "Egypt",
													postalCode: "",
													isDefault: false
												});
											},
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											variant: "primary",
											size: "lg",
											className: "flex-1",
											disabled: createAddress.isPending,
											children: createAddress.isPending ? "Adding..." : "Add address"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								size: "lg",
								className: "w-full",
								onClick: handleProceedToPayment,
								disabled: !selectedAddressId && !isGuest,
								children: "Continue to payment"
							})
						]
					})] }),
					step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Step 3: Payment" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-muted p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "This is a payment placeholder. No real payment will be processed."
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-4",
							onSubmit: (e) => {
								e.preventDefault();
								handlePlaceOrder();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "card-number",
									className: "text-sm font-medium",
									children: "Card number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "card-number",
									placeholder: "1234 5678 9012 3456",
									className: "mt-2"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "expiry",
										className: "text-sm font-medium",
										children: "Expiry date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "expiry",
										placeholder: "MM/YY",
										className: "mt-2"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "cvc",
										className: "text-sm font-medium",
										children: "CVC"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cvc",
										placeholder: "123",
										className: "mt-2"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "card-name",
									className: "text-sm font-medium",
									children: "Name on card"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "card-name",
									placeholder: "John Doe",
									className: "mt-2"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "primary",
									size: "lg",
									className: "w-full",
									disabled: isSubmitting,
									children: isSubmitting ? "Processing..." : `Place order — $${subtotal.toFixed(2)}`
								})
							]
						})]
					})] }),
					step === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-medium",
									children: "Processing your order..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Please don't close this page"
								})
							]
						})
					}) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-28 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Order summary" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium truncate",
										children: item.productName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Qty: ", item.quantity]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: item.price * item.quantity,
									size: "sm"
								})]
							}, item.cartItemId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: subtotal,
									size: "md"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Calculated at checkout"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceTag, {
									amount: subtotal,
									size: "lg"
								})]
							})
						})
					]
				})] })
			})]
		})]
	});
}
//#endregion
export { CheckoutPage as component };
