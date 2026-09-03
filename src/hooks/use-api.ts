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
  ProductImage,
  ProductThumbnail,
  StockBatchResponse,
  StockDeltaRequest,
  StockAbsoluteRequest,
} from "@/types";

// Products
export function useProducts(params?: {
  page?: number;
  pageSize?: number;
  limit?: number;
  categoryId?: number;
  searchTerm?: string;
  sortBy?: string;
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
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch on mount
  });
}

// Media Service - Product Images
// NOTE: When used in product grids (shop, category, search, home), this creates an N+1 query pattern.
// TODO: This should be replaced with a batch endpoint (GET /products/images/batch?ids=...)
// before shipping to production to avoid performance issues.
export function useProductImages(productId: number | string) {
  return useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => api.getProductImages(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes to reduce frequent refetches
  });
}

// Media Service - Batch Product Thumbnails (for catalog grids)
// This avoids the N+1 query pattern by fetching all thumbnails in one request
export function useProductThumbnailsBatch(productIds: number[]) {
  return useQuery({
    queryKey: ["product-thumbnails-batch", productIds],
    queryFn: () => api.getProductThumbnailsBatch(productIds),
    enabled: productIds.length > 0,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
}

// Inventory Service - Stock Management
export function useStockBatch(productIds: number[]) {
  return useQuery({
    queryKey: ["stock-batch", productIds],
    queryFn: () => api.getStockBatch(productIds),
    enabled: productIds.length > 0,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes - stock changes frequently
  });
}

export function useUpdateStockDelta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, delta }: { productId: number; delta: number }) =>
      api.updateStockDelta(productId, { delta }),
    onSuccess: (_, variables) => {
      // Invalidate stock batch queries to reflect the change
      queryClient.invalidateQueries({ queryKey: ["stock-batch"] });
    },
  });
}

export function useSetStockAbsolute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, newQuantity }: { productId: number; newQuantity: number }) =>
      api.setStockAbsolute(productId, { newQuantity }),
    onSuccess: (_, variables) => {
      // Invalidate stock batch queries to reflect the change
      queryClient.invalidateQueries({ queryKey: ["stock-batch"] });
    },
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
      // Invalidate cart to fetch fresh data from cart-service
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
    gcTime: 0, // Prevent retaining stale cached cart snapshots in memory
    refetchOnMount: "always", // Always fetch fresh server state on page/component mount
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
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      api.updateCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => api.removeFromCart(productId),
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => api.getOrder(id),
    enabled: !!id && isAuthenticated,
    retry: 1,
    staleTime: 30 * 1000, // 30s — order status can change so keep fresh
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => api.getAddresses(),
    enabled: isAuthenticated,
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
    onError: (error) => {
      if (error instanceof Error && error.message.includes('404')) {
        console.error('Address not found or does not belong to user');
      }
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
    onError: (error) => {
      if (error instanceof Error && error.message.includes('404')) {
        console.error('Address not found or does not belong to user');
      }
    },
  });
}



// Admin
export function useAdminOrders(params?: {
  page?: number;
  pageSize?: number;
  limit?: number;
  status?: string;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => api.getAdminOrders(params),
    enabled: isAuthenticated,
  });
}

export function useAdminProducts(params?: {
  page?: number;
  pageSize?: number;
  limit?: number;
  searchTerm?: string;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => api.getAdminProducts(params),
    enabled: isAuthenticated,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      slug: string;
      parentCategoryId?: number | null;
      parentId?: number | null;
    }) => api.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        name?: string;
        slug?: string;
        parentCategoryId?: number | null;
        parentId?: number | null;
      };
    }) => api.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useRestoreCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.restoreCategory(id),
    onSuccess: async (_, variables) => {
      // Clear cache to prevent stale data
      queryClient.clear();
      // Invalidate all category-related queries
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", String(variables)] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      // Force refetch to ensure fresh data from backend
      await queryClient.refetchQueries({ queryKey: ["category", String(variables)] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: string }) =>
      api.updateOrderStatus(id, newStatus),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

// Product Management Hooks
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      slug: string;
      description: string;
      price: number;
      stockQuantity: number;
      categoryId: number;
    }) => api.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: {
        name?: string;
        slug?: string;
        description?: string;
        price?: number;
        categoryId?: number;
      };
    }) => api.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["product", String(variables.id)] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => api.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}

export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: number | string; file: File }) =>
      api.uploadProductImage(id, file),
    onSuccess: async (_, variables) => {
      // Invalidate product images query to reflect the new upload
      queryClient.invalidateQueries({ queryKey: ["product-images", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["product-images", Number(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-images", String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-thumbnails-batch"] });
    },
  });
}

export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: number | string; imageId: number | string }) =>
      api.deleteProductImage(id, imageId),
    onSuccess: async (_, variables) => {
      // Invalidate product images query to reflect the deletion
      queryClient.invalidateQueries({ queryKey: ["product-images", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["product-images", Number(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-images", String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-thumbnails-batch"] });
    },
  });
}

export function useSetPrimaryProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: number | string; imageId: number | string }) =>
      api.setPrimaryProductImage(id, imageId),
    onSuccess: async (_, variables) => {
      // Invalidate product images query to reflect the primary image change
      queryClient.invalidateQueries({ queryKey: ["product-images", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["product-images", Number(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-images", String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["product-thumbnails-batch"] });
    },
  });
}

export function useRestoreProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => api.restoreProduct(id),
    onSuccess: async (_, variables) => {
      // Clear cache to prevent stale data from Redis
      queryClient.clear();
      // Invalidate all product-related queries
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["product", String(variables)] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["product-images", String(variables)] });
      // Force refetch to ensure fresh data from backend
      await queryClient.refetchQueries({ queryKey: ["product", String(variables)] });
    },
  });
}
