import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import type {
  Product,
  Category,
  User,
  RegisterRequest,
  LoginRequest,
  CartItem,
  Cart,
  Order,
  Address,
} from "@/types";

// Products
export function useProducts(params?: {
  page?: number;
  limit?: number;
  categoryId?: number;
  searchTerm?: string;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.getProducts(params),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => api.getProduct(slug),
    enabled: !!slug,
    retry: false,
  });
}

// Categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => api.getCategory(id),
    enabled: !!id,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => api.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

// Auth
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => api.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => api.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => api.getCurrentUser(),
    retry: false,
  });
}

// Cart
export function useCart() {
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);

  return useQuery({
    queryKey: ["cart"],
    queryFn: () => api.getCart(),
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true,
    enabled: isAuthInitialized, // Only fetch cart after auth is initialized
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      api.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      api.updateCartItem(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => api.removeFromCart(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

// Orders
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => api.getOrders(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.getOrder(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      addressId: number;
      idempotencyKey: string;
    }) => api.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
}

// Addresses
export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => api.getAddresses(),
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Address, "id">) => api.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      api.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
