import { n as useAuthStore, t as api } from "./auth-C3oJgxmz.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-api-B_SRtOPB.js
function useProducts(params) {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => api.getProducts(params)
	});
}
function useProduct(slug) {
	return useQuery({
		queryKey: ["product", slug],
		queryFn: () => api.getProduct(slug),
		enabled: !!slug,
		retry: false,
		refetchOnWindowFocus: true,
		refetchOnMount: true
	});
}
function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => api.getCategories()
	});
}
function useCategoryBySlug(slug) {
	return useQuery({
		queryKey: ["category", slug],
		queryFn: () => api.getCategoryBySlug(slug),
		enabled: !!slug
	});
}
function useCart() {
	const isAuthInitialized = useAuthStore((state) => state.isInitialized);
	return useQuery({
		queryKey: ["cart"],
		queryFn: () => api.getCart(),
		staleTime: 0,
		gcTime: 0,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		enabled: isAuthInitialized
	});
}
function useAddToCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ productId, quantity }) => api.addToCart(productId, quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}
function useUpdateCartItem() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ cartItemId, quantity }) => api.updateCartItem(cartItemId, quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}
function useRemoveFromCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (cartItemId) => api.removeFromCart(cartItemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}
function useClearCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => api.clearCart(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}
function useOrders() {
	return useQuery({
		queryKey: ["orders"],
		queryFn: () => api.getOrders()
	});
}
function useOrder(id) {
	return useQuery({
		queryKey: ["order", id],
		queryFn: () => api.getOrder(id),
		enabled: !!id
	});
}
function useCreateOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => api.createOrder(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.refetchQueries({ queryKey: ["cart"] });
		}
	});
}
function useCancelOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => api.cancelOrder(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["order"] });
		}
	});
}
function useAddresses() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return useQuery({
		queryKey: ["addresses"],
		queryFn: () => api.getAddresses(),
		enabled: isAuthenticated
	});
}
function useCreateAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => api.createAddress(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
		}
	});
}
function useAdminOrders(params) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return useQuery({
		queryKey: ["admin-orders", params],
		queryFn: () => api.getAdminOrders(params),
		enabled: isAuthenticated
	});
}
function useAdminProducts(params) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	return useQuery({
		queryKey: ["admin-products", params],
		queryFn: () => api.getAdminProducts(params),
		enabled: isAuthenticated
	});
}
function useCreateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => api.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	});
}
function useUpdateCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => api.updateCategory(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	});
}
function useDeleteCategory() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => api.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	});
}
function useUpdateOrderStatus() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, newStatus }) => api.updateOrderStatus(id, newStatus),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
		}
	});
}
function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => api.createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["admin-products"] });
		}
	});
}
function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => api.updateProduct(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["admin-products"] });
			queryClient.invalidateQueries({ queryKey: ["product", String(variables.id)] });
		}
	});
}
function useDeleteProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => api.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["admin-products"] });
		}
	});
}
function useUploadProductImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, file }) => api.uploadProductImage(id, file),
		onSuccess: async (_, variables) => {
			queryClient.clear();
			await queryClient.refetchQueries({ queryKey: ["product", String(variables.id)] });
		}
	});
}
function useDeleteProductImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, imageId }) => api.deleteProductImage(id, imageId),
		onSuccess: async (_, variables) => {
			queryClient.clear();
			await queryClient.refetchQueries({ queryKey: ["product", String(variables.id)] });
		}
	});
}
function useSetPrimaryProductImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, imageId }) => api.setPrimaryProductImage(id, imageId),
		onSuccess: async (_, variables) => {
			queryClient.clear();
			await queryClient.refetchQueries({ queryKey: ["product", String(variables.id)] });
		}
	});
}
function useRestoreProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => api.restoreProduct(id),
		onSuccess: async (_, variables) => {
			queryClient.clear();
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["admin-products"] });
			queryClient.invalidateQueries({ queryKey: ["product", String(variables)] });
			queryClient.invalidateQueries({ queryKey: ["product"] });
			await queryClient.refetchQueries({ queryKey: ["product", String(variables)] });
		}
	});
}
//#endregion
export { useSetPrimaryProductImage as C, useUpdateProduct as D, useUpdateOrderStatus as E, useUploadProductImage as O, useRestoreProduct as S, useUpdateCategory as T, useOrder as _, useCancelOrder as a, useProducts as b, useCategoryBySlug as c, useCreateCategory as d, useCreateOrder as f, useDeleteProductImage as g, useDeleteProduct as h, useAdminProducts as i, useClearCart as l, useDeleteCategory as m, useAddresses as n, useCart as o, useCreateProduct as p, useAdminOrders as r, useCategories as s, useAddToCart as t, useCreateAddress as u, useOrders as v, useUpdateCartItem as w, useRemoveFromCart as x, useProduct as y };
