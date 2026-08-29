import { n as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { t as cn } from "./_ssr/utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime, a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./_ssr/input-3baiqKjd.mjs";
import { n as SectionHeading, t as Container } from "./_ssr/section-BM93ovYl.mjs";
import { t as Button } from "./_ssr/button-Dch78aLu.mjs";
import { t as Field } from "./_ssr/field-CGThm7jV.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { B as ChevronDown } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storefront.about-BfQfFcQ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var faqItems = [
	{
		question: "How long does shipping take?",
		answer: "Standard shipping takes 5–7 business days. Express shipping is 2–3 business days, and next-day delivery is available for select areas. Orders over $200 qualify for free standard shipping."
	},
	{
		question: "What is your return policy?",
		answer: "We accept returns within 30 days of delivery. Items must be in their original condition — unused, unworn, and with all tags attached. Visit our Returns & Refunds page for full details."
	},
	{
		question: "Do you ship internationally?",
		answer: "Yes, we ship to select international destinations. International delivery typically takes 7–14 business days. Please note that customs duties and import taxes may apply and are the customer's responsibility."
	},
	{
		question: "How can I track my order?",
		answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order from your account dashboard under 'Your orders'."
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. Additional payment options are displayed at checkout."
	},
	{
		question: "How do I create an account?",
		answer: "Click the user icon in the top navigation bar and select 'Create account'. You'll need to provide your name, email address, and a secure password. Once registered, you can track orders, save addresses, and manage your wishlist."
	}
];
function AboutPage() {
	const [contactForm, setContactForm] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const handleContactSubmit = (e) => {
		e.preventDefault();
		toast.success("Thank you for your message! We'll get back to you soon.");
		setContactForm({
			name: "",
			email: "",
			subject: "",
			message: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-14 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "About Us"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl",
					children: "Our Story"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base leading-relaxed text-muted-foreground",
					children: "Quality products, carefully selected for everyday life."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-14 max-w-3xl space-y-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-normal tracking-tight",
					children: "Our Mission"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground",
					children: "At My Store, we believe in curating products that stand the test of time. Every item in our collection is chosen for its quality, durability, and value. We're committed to providing our customers with products that enhance their daily lives."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-normal tracking-tight",
					children: "What We Offer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground",
					children: "From electronics and books to beauty, toys, fitness, clothing, and home goods — we offer a carefully selected range of products across multiple categories. Our goal is to be your one-stop destination for quality items that meet your everyday needs."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-normal tracking-tight",
					children: "Our Values"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-base leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Quality First:" }), " We never compromise on quality. Every product is vetted for excellence."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Customer Satisfaction:" }), " Your happiness is our priority. We're here to help with any questions or concerns."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sustainability:" }), " We strive to offer products that are environmentally responsible and built to last."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Transparency:" }), " We believe in honest pricing and clear communication about our products."] })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Support",
					title: "Frequently asked questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "mt-8",
					children: faqItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `faq-${index}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left font-medium",
							children: item.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-muted-foreground leading-relaxed",
							children: item.answer
						})]
					}, index))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "contact",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Reach out",
							title: "Get in touch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-base leading-relaxed text-muted-foreground",
							children: "Have questions, feedback, or need help with an order? Fill out the form below, and our team will get back to you within 1–2 business days."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleContactSubmit,
							className: "mt-8 space-y-6",
							"aria-label": "Contact form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										htmlFor: "contact-name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "contact-name",
											type: "text",
											placeholder: "Your name",
											value: contactForm.name,
											onChange: (e) => setContactForm((prev) => ({
												...prev,
												name: e.target.value
											})),
											required: true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										htmlFor: "contact-email",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "contact-email",
											type: "email",
											placeholder: "you@example.com",
											value: contactForm.email,
											onChange: (e) => setContactForm((prev) => ({
												...prev,
												email: e.target.value
											})),
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Subject",
									htmlFor: "contact-subject",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "contact-subject",
										type: "text",
										placeholder: "What can we help with?",
										value: contactForm.subject,
										onChange: (e) => setContactForm((prev) => ({
											...prev,
											subject: e.target.value
										})),
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Message",
									htmlFor: "contact-message",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "contact-message",
										placeholder: "Tell us more…",
										rows: 5,
										value: contactForm.message,
										onChange: (e) => setContactForm((prev) => ({
											...prev,
											message: e.target.value
										})),
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "primary",
									size: "lg",
									children: "Send message"
								})
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AboutPage as component };
