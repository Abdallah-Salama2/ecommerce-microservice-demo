import { n as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as resolveImageUrl } from "./utils-BdjFfDmo.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Dch78aLu.mjs";
import { C as useSetPrimaryProductImage, D as useUpdateProduct, O as useUploadProductImage, g as useDeleteProductImage, s as useCategories, y as useProduct } from "./use-api-B_SRtOPB.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as Image, c as Trash2, g as Save, i as Upload, u as Star, z as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DT0_Z5aK.mjs";
import { t as getProductIdNumber } from "./types-DwK1Lx06.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXC95m2z.mjs";
import { t as Route } from "./admin._authenticated.products._slug.edit-BeaPDnjD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._authenticated.products._slug.edit-DAq1VFCW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminEditProductPage() {
	const { slug: routeSlug } = Route.useParams();
	const { data: product, isLoading, error } = useProduct(routeSlug);
	const { data: categoriesData } = useCategories();
	const updateProductMutation = useUpdateProduct();
	const uploadImageMutation = useUploadProductImage();
	const deleteImageMutation = useDeleteProductImage();
	const setPrimaryImageMutation = useSetPrimaryProductImage();
	const categories = categoriesData?.data || [];
	const productId = product ? getProductIdNumber(product) : 0;
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [stockQuantity, setStockQuantity] = (0, import_react.useState)("");
	const [categoryId, setCategoryId] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [uploading, setUploading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (product) {
			setName(product.name || "");
			setSlug(product.slug || "");
			setDescription(product.description || "");
			setPrice(product.price ? String(product.price) : "");
			setStockQuantity(product.stockQuantity !== void 0 ? String(product.stockQuantity) : "");
			setCategoryId(product.categoryId ? String(product.categoryId) : "");
		}
	}, [product]);
	const validate = () => {
		const errs = {};
		if (!name.trim()) errs.name = "Product name is required";
		if (!slug.trim()) errs.slug = "Slug is required";
		if (!description.trim()) errs.description = "Description is required";
		if (!price || Number(price) <= 0) errs.price = "Enter a valid positive price";
		if (stockQuantity === "" || Number(stockQuantity) < 0) errs.stockQuantity = "Enter a valid stock quantity";
		if (!categoryId) errs.categoryId = "Category selection is required";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const handleUpdateProduct = async (e) => {
		e.preventDefault();
		if (!validate() || !productId) {
			toast.error("Please fix errors before saving");
			return;
		}
		try {
			await updateProductMutation.mutateAsync({
				id: productId,
				data: {
					name: name.trim(),
					slug: slug.trim(),
					description: description.trim(),
					price: Number(price),
					stockQuantity: Number(stockQuantity),
					categoryId: Number(categoryId)
				}
			});
			toast.success(`Product "${name}" updated successfully`);
		} catch (err) {
			toast.error(err.message || "Failed to update product");
		}
	};
	const handleFileUpload = async (e) => {
		const files = e.target.files;
		if (!files || files.length === 0 || !productId) return;
		setUploading(true);
		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (file) await uploadImageMutation.mutateAsync({
					id: productId,
					file
				});
			}
			toast.success("Image uploaded successfully");
			e.target.value = "";
		} catch (err) {
			toast.error(err.message || "Failed to upload image");
		} finally {
			setUploading(false);
		}
	};
	const handleSetPrimary = async (imageId) => {
		if (!productId) return;
		try {
			await setPrimaryImageMutation.mutateAsync({
				id: productId,
				imageId
			});
			toast.success("Primary image updated");
		} catch (err) {
			console.error("Set primary error:", err);
			const errorMessage = err.message || "Failed to set primary image";
			if (errorMessage.includes("404") || errorMessage.includes("not found")) {
				toast.error("Image may have been deleted. Refreshing...");
				setTimeout(() => window.location.reload(), 1500);
			} else toast.error(errorMessage);
		}
	};
	const handleDeleteImage = async (imageId) => {
		if (!productId) return;
		if (!window.confirm("Are you sure you want to delete this image?")) return;
		try {
			await deleteImageMutation.mutateAsync({
				id: productId,
				imageId
			});
			toast.success("Image deleted");
		} catch (err) {
			console.error("Delete error:", err);
			const errorMessage = err.message || "Failed to delete image";
			if (errorMessage.includes("404") || errorMessage.includes("not found")) {
				toast.error("Image may have already been deleted. Refreshing...");
				setTimeout(() => window.location.reload(), 1500);
			} else toast.error(errorMessage);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-12 text-center text-muted-foreground",
		children: "Loading product details..."
	});
	if (error || !product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-destructive font-medium",
			children: [
				"Product \"",
				routeSlug,
				"\" not found."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/products",
				children: "Back to Products"
			})
		})]
	});
	const images = product.images || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 p-6 lg:p-8 max-w-5xl mx-auto",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 font-display text-2xl font-normal tracking-tight text-foreground sm:text-3xl",
				children: ["Edit Product — ", product.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Update product details and manage image gallery."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleUpdateProduct,
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "border-b border-border py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base font-medium",
							children: "Product Configuration"
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
									onChange: (e) => setName(e.target.value),
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
							disabled: updateProductMutation.isPending,
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), updateProductMutation.isPending ? "Saving..." : "Save Product Details"]
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "border-b border-border py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "flex items-center gap-2 text-base font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 text-primary" }),
								"Product Gallery (",
								images.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }), uploading ? "Uploading..." : "Upload Image"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								multiple: true,
								disabled: uploading,
								onChange: handleFileUpload,
								className: "hidden"
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-5",
					children: images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8 text-muted-foreground/50 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No images uploaded yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground/70 mt-1",
								children: "Upload images to showcase this item on product cards and details page."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4",
						children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative overflow-hidden rounded-md border border-border bg-surface",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: resolveImageUrl(img.previewUrl || img.thumbnailUrl),
									alt: img.altText || product.name,
									className: "aspect-square w-full object-cover"
								}),
								img.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-2 left-2 z-20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "sale",
										className: "whitespace-nowrap gap-1 text-[0.55rem] px-2 py-0.5 shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }), "PRIMARY"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2",
									children: [!img.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => handleSetPrimary(img.id),
										disabled: setPrimaryImageMutation.isPending,
										className: "h-8 px-2 text-xs",
										title: "Set as primary image",
										children: "Set Primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => handleDeleteImage(img.id),
										disabled: deleteImageMutation.isPending,
										className: "h-8 w-8 p-0 bg-background/80 text-destructive hover:bg-destructive hover:text-destructive-foreground",
										title: "Delete image",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							]
						}, img.id))
					})
				})] })
			})]
		})]
	});
}
//#endregion
export { AdminEditProductPage as component };
