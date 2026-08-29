import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { p as useCreateProduct, s as useCategories } from "./use-api-B_SRtOPB.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { V as Check, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as getProductIdNumber } from "./types-DwK1Lx06.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.products.new-y43_iWSI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCreateProductPage() {
	const navigate = useNavigate();
	const { data: categoriesData } = useCategories();
	const createProductMutation = useCreateProduct();
	const categories = categoriesData?.data || [];
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [stockQuantity, setStockQuantity] = (0, import_react.useState)("");
	const [categoryId, setCategoryId] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const handleNameChange = (val) => {
		setName(val);
		setSlug(val.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
	};
	const validate = () => {
		const errs = {};
		if (!name.trim()) errs.name = "Product name is required";
		if (!slug.trim()) errs.slug = "Slug is required";
		if (!description.trim()) errs.description = "Description is required";
		if (!price || Number(price) <= 0) errs.price = "Enter a valid positive price";
		if (!stockQuantity || Number(stockQuantity) < 0) errs.stockQuantity = "Enter a valid stock quantity";
		if (!categoryId) errs.categoryId = "Category selection is required";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) {
			toast.error("Please fix errors before submitting");
			return;
		}
		try {
			const newProduct = (await createProductMutation.mutateAsync({
				name: name.trim(),
				slug: slug.trim(),
				description: description.trim(),
				price: Number(price),
				stockQuantity: Number(stockQuantity),
				categoryId: Number(categoryId)
			})).data;
			const newId = getProductIdNumber(newProduct);
			toast.success(`Product "${name}" created! You can now manage its images.`);
			navigate({
				to: "/admin/products/$id/edit",
				params: { id: String(newId) }
			});
		} catch (err) {
			toast.error(err.message || "Failed to create product");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8 max-w-4xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "gap-1 px-0 text-muted-foreground hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/products",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Back to Products List"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
				children: "Create New Product"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Add a new item to your store catalog."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "border-b border-border py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base font-medium",
					children: "Product Details"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Product Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: name,
							onChange: (e) => handleNameChange(e.target.value),
							placeholder: "e.g. Wireless Noise-Canceling Headphones",
							className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
						}),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.name
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "URL Slug"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: slug,
							onChange: (e) => setSlug(e.target.value),
							placeholder: "e.g. wireless-noise-canceling-headphones",
							className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
						}),
						errors.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.slug
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: categoryId,
							onChange: (e) => setCategoryId(e.target.value),
							className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select Category..."
							}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
								label: cat.name,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: cat.id,
									children: [cat.name, " (Main)"]
								}), cat.children?.map((subCat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: subCat.id,
									children: ["── ", subCat.name]
								}, subCat.id))]
							}, cat.id))]
						}),
						errors.categoryId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.categoryId
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 4,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Detailed description of product features...",
							className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-primary"
						}),
						errors.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.description
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Price ($ USD)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.01",
								min: "0",
								value: price,
								onChange: (e) => setPrice(e.target.value),
								placeholder: "29.99",
								className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
							}),
							errors.price && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.price
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Stock Quantity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: stockQuantity,
								onChange: (e) => setStockQuantity(e.target.value),
								placeholder: "50",
								className: "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-2 focus-visible:outline-primary"
							}),
							errors.stockQuantity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.stockQuantity
							})
						] })]
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/products",
						children: "Cancel"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: createProductMutation.isPending,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), createProductMutation.isPending ? "Creating..." : "Create Product"]
				})]
			})]
		})]
	});
}
//#endregion
export { AdminCreateProductPage as component };
