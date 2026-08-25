import { n as useAuthStore, t as api } from "./api-DleoGe4W.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-api-BH_NuuxZ.js
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
		retry: false
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
function useAddresses() {
	return useQuery({
		queryKey: ["addresses"],
		queryFn: () => api.getAddresses()
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
//#endregion
export { useCategoryBySlug as a, useCreateOrder as c, useProduct as d, useProducts as f, useCategories as i, useOrder as l, useUpdateCartItem as m, useAddresses as n, useClearCart as o, useRemoveFromCart as p, useCart as r, useCreateAddress as s, useAddToCart as t, useOrders as u };
