import type {
  PaginatedResponse,
  Product,
  Category,
  User,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  RegisterResponse,
  CartItem,
  Cart,
  Order,
  Address,
  ApiError,
  ProductImage,
  ProductImagesResponse,
  ProductThumbnailsBatchResponse,
  StockBatchResponse,
  StockBatchItem,
  StockResponse,
  StockDeltaRequest,
  StockAbsoluteRequest,
} from "@/types";
import { getAccessToken, useAuthStore } from "@/store/auth";

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const API_BASE_URL = rawBaseUrl.endsWith("/api") ? rawBaseUrl.slice(0, -4) : rawBaseUrl;

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private subscribeToRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Add Authorization header if token exists
    const token = getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(url, {
      ...options,
      credentials: "include",
      headers,
    });

    // Handle 401 - try to refresh token
    if (response.status === 401 && !endpoint.includes("/auth/refresh")) {
      if (this.isRefreshing) {
        // Wait for the refresh to complete
        return new Promise((resolve, reject) => {
          this.subscribeToRefresh((token: string) => {
            headers["Authorization"] = `Bearer ${token}`;
            fetch(url, {
              ...options,
              credentials: "include",
              headers,
            })
              .then(res => this.processResponse<T>(res, resolve, reject))
              .catch(reject);
          });
        });
      }

      this.isRefreshing = true;
      try {
        await useAuthStore.getState().refreshAccessToken();
        const newToken = getAccessToken();
        this.onRefreshed(newToken || "");

        // Retry the original request with new token
        if (newToken) {
          headers["Authorization"] = `Bearer ${newToken}`;
        }
        response = await fetch(url, {
          ...options,
          credentials: "include",
          headers,
        });
      } catch (error) {
        // Refresh failed, user will be logged out by the store
        this.isRefreshing = false;
        throw error;
      } finally {
        this.isRefreshing = false;
      }
    }

    return this.processResponse<T>(response);
  }

  private async requestFormData<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = getAccessToken();
    const headers: HeadersInit = { ...options.headers };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers,
    });

    return this.processResponse<T>(response);
  }

  private async processResponse<T>(
    response: Response,
    resolve?: (value: T) => void,
    reject?: (reason?: any) => void
  ): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        success: false,
        message: "An error occurred",
      }));
      const errorObj = new Error(error.message || "Request failed");
      if (reject) {
        reject(errorObj);
        return Promise.reject(errorObj);
      }
      throw errorObj;
    }

    const data = await response.json();
    if (resolve) {
      resolve(data);
      return Promise.resolve(data);
    }
    return data;
  }

  // Products
  async getProducts(params?: {
    page?: number;
    pageSize?: number;
    limit?: number;
    categoryId?: number;
    searchTerm?: string;
    sortBy?: string;
  }): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    const pageNum = params?.page ? Math.max(1, Math.floor(Number(params.page))) : undefined;
    if (pageNum) queryParams.append("page", pageNum.toString());

    const pageSizeNum = (params?.pageSize ?? params?.limit)
      ? Math.min(100, Math.max(1, Math.floor(Number(params.pageSize ?? params.limit))))
      : undefined;
    if (pageSizeNum) queryParams.append("pageSize", pageSizeNum.toString());

    if (params?.categoryId !== undefined && params?.categoryId !== null && !isNaN(Number(params.categoryId))) {
      queryParams.append("categoryId", Number(params.categoryId).toString());
    }
    if (params?.searchTerm && params.searchTerm.trim()) {
      queryParams.append("searchTerm", params.searchTerm.trim());
    }
    if (params?.sortBy) {
      const sortMap: Record<string, string> = {
        "price-asc": "price_asc",
        "price-desc": "price_desc",
        "price_asc": "price_asc",
        "price_desc": "price_desc",
        "newest": "newest",
        "oldest": "oldest",
      };
      const normalizedSort = sortMap[params.sortBy.toLowerCase()];
      if (normalizedSort) {
        queryParams.append("sortBy", normalizedSort);
      }
      // UI-only sort options like 'featured' or empty strings are omitted for default ordering
    }

    const endpoint = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return this.request<PaginatedResponse<Product>>(endpoint);
  }

  async getProduct(slugOrId: string): Promise<Product> {
    const response = await this.request<{ success: boolean; data: Product; message: string }>(
      `/api/products/${slugOrId}`
    );
    return response.data;
  }

  // Media Service - Product Images
  async getProductImages(productId: number | string): Promise<ProductImagesResponse> {
    return this.request<ProductImagesResponse>(`/api/products/${productId}/images`);
  }

  // Media Service - Batch Product Thumbnails (for catalog grids)
  async getProductThumbnailsBatch(productIds: number[]): Promise<ProductThumbnailsBatchResponse> {
    const validIds = Array.from(new Set(productIds.map(Number).filter((id) => Number.isInteger(id) && id > 0)));
    if (validIds.length === 0) {
      return { success: true, data: [], message: "No IDs provided" };
    }

    // Backend accepts up to 50 IDs per request; chunk if necessary
    const CHUNK_SIZE = 50;
    const chunks: number[][] = [];
    for (let i = 0; i < validIds.length; i += CHUNK_SIZE) {
      chunks.push(validIds.slice(i, i + CHUNK_SIZE));
    }

    const responses = await Promise.all(
      chunks.map((chunk) =>
        this.request<ProductThumbnailsBatchResponse>(`/api/products/images/batch?ids=${chunk.join(",")}`)
      )
    );

    const allThumbnails = responses.flatMap((res) => res.data || []);
    return {
      success: true,
      data: allThumbnails,
      message: "Thumbnails retrieved successfully",
    };
  }

  // Inventory Service - Stock Management
  async getStockBatch(productIds: number[]): Promise<StockBatchResponse> {
    const validIds = Array.from(new Set(productIds.map(Number).filter((id) => Number.isInteger(id) && id > 0)));
    if (validIds.length === 0) {
      return { success: true, data: [], message: "No IDs provided" };
    }

    // Backend accepts up to 50 IDs per request; chunk if necessary
    const CHUNK_SIZE = 50;
    const chunks: number[][] = [];
    for (let i = 0; i < validIds.length; i += CHUNK_SIZE) {
      chunks.push(validIds.slice(i, i + CHUNK_SIZE));
    }

    const responses = await Promise.all(
      chunks.map((chunk) =>
        this.request<StockBatchResponse>(`/api/stock/batch?ids=${chunk.join(",")}`)
      )
    );

    const allStockItems = responses.flatMap((res) => res.data || []);
    return {
      success: true,
      data: allStockItems,
      message: "Stock items retrieved successfully",
    };
  }

  async updateStockDelta(productId: number, data: StockDeltaRequest): Promise<StockResponse> {
    return this.request<StockResponse>(`/api/stock/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async setStockAbsolute(productId: number, data: StockAbsoluteRequest): Promise<StockResponse> {
    return this.request<StockResponse>(`/api/stock/${productId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Categories
  async getCategories(): Promise<{ success: boolean; data: Category[]; message: string }> {
    return this.request<{ success: boolean; data: Category[]; message: string }>("/api/categories");
  }

  async getCategory(id: number): Promise<Category> {
    return this.request<Category>(`/api/categories/${id}`);
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await this.request<{ success: boolean; data: Category[]; message: string }>("/api/categories");
    // Check both main categories and subcategories
    let category = response.data.find(c => c.slug === slug);
    if (!category) {
      for (const cat of response.data) {
        const subCat = cat.children.find(c => c.slug === slug);
        if (subCat) {
          category = subCat;
          break;
        }
      }
    }
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  // Auth
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>("/api/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<{ success: boolean; data: { user: User } | User; message: string }> {
    return this.request<{ success: boolean; data: { user: User } | User; message: string }>("/api/auth/me");
  }

  // Cart
  async getCart(): Promise<{ success: boolean; data: Cart; message: string }> {
    return this.request<{ success: boolean; data: Cart; message: string }>("/api/cart");
  }

  async addToCart(productId: number, quantity: number): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>("/api/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId: number, quantity: number): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>(`/api/cart/items/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(productId: number): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>(`/api/cart/items/${productId}`, {
      method: "DELETE",
    });
  }

  async clearCart(): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>("/api/cart", {
      method: "DELETE",
    });
  }

  // Orders
  async getOrders(): Promise<{ success: boolean; data: Order[]; message: string }> {
    return this.request<{ success: boolean; data: Order[]; message: string }>("/api/orders");
  }

  async getOrder(id: string): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/api/orders/${id}`);
  }

  async cancelOrder(id: string): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/api/orders/${id}/cancel`, {
      method: "PATCH",
    });
  }

  async createOrder(data: {
    addressId: number;
    idempotencyKey: string;
  }): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Addresses
  async getAddresses(): Promise<{ success: boolean; data: Address[]; message: string }> {
    return this.request<{ success: boolean; data: Address[]; message: string }>("/api/addresses");
  }

  async createAddress(data: Omit<Address, "id">): Promise<{
    success: boolean;
    data: Address;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Address;
      message: string;
    }>("/api/addresses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateAddress(id: string, data: Partial<Address>): Promise<{
    success: boolean;
    data: Address;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Address;
      message: string;
    }>(`/api/addresses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteAddress(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/addresses/${id}`, {
      method: "DELETE",
    });
  }

  // Admin
  async getAdminOrders(params?: {
    page?: number;
    pageSize?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Order>> {
    const queryParams = new URLSearchParams();
    const pageNum = params?.page ? Math.max(1, Math.floor(Number(params.page))) : undefined;
    if (pageNum) queryParams.append("page", pageNum.toString());

    const pageSizeNum = (params?.pageSize ?? params?.limit)
      ? Math.min(100, Math.max(1, Math.floor(Number(params.pageSize ?? params.limit))))
      : undefined;
    if (pageSizeNum) queryParams.append("pageSize", pageSizeNum.toString());

    if (params?.status) {
      const normalizedStatus =
        params.status.charAt(0).toUpperCase() + params.status.slice(1).toLowerCase();
      queryParams.append("status", normalizedStatus);
    }
    const qs = queryParams.toString();
    return this.request<PaginatedResponse<Order>>(`/api/orders/admin${qs ? `?${qs}` : ""}`);
  }

  async getAdminProducts(params?: {
    page?: number;
    pageSize?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<PaginatedResponse<Product>> {
    return this.getProducts(params);
  }

  // Category Management
  async createCategory(data: {
    name: string;
    slug: string;
    parentCategoryId?: number | null;
    parentId?: number | null;
  }): Promise<{ success: boolean; data: Category; message: string }> {
    const rawParentId = data.parentCategoryId !== undefined ? data.parentCategoryId : data.parentId;
    const parentCategoryId = rawParentId !== null && rawParentId !== undefined && !isNaN(Number(rawParentId))
      ? Number(rawParentId)
      : null;

    return this.request<{ success: boolean; data: Category; message: string }>("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        slug: data.slug,
        parentCategoryId,
      }),
    });
  }

  async updateCategory(
    id: number,
    data: { name?: string; slug?: string; parentCategoryId?: number | null; parentId?: number | null }
  ): Promise<{ success: boolean; data: Category; message: string }> {
    const payload: Record<string, any> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.parentCategoryId !== undefined || data.parentId !== undefined) {
      const rawParentId = data.parentCategoryId !== undefined ? data.parentCategoryId : data.parentId;
      payload.parentCategoryId =
        rawParentId !== null && rawParentId !== undefined && !isNaN(Number(rawParentId))
          ? Number(rawParentId)
          : null;
    }

    return this.request<{ success: boolean; data: Category; message: string }>(`/api/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/categories/${id}`, {
      method: "DELETE",
    });
  }

  async restoreCategory(id: number): Promise<{ success: boolean; data: Category; message: string }> {
    return this.request<{ success: boolean; data: Category; message: string }>(
      `/api/categories/${id}/restore`,
      {
        method: "PATCH",
      }
    );
  }

  // Order Status Update Workstation
  async updateOrderStatus(
    id: string,
    newStatus: string
  ): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/api/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ newStatus }),
    });
  }

  // Product CRUD & Image Management
  async createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
  }): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProduct(
    id: number | string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      price?: number;
      categoryId?: number;
    }
  ): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>(`/api/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: number | string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/products/${id}`, {
      method: "DELETE",
    });
  }

  async uploadProductImage(
    id: number | string,
    file: File
  ): Promise<{ success: boolean; data: ProductImage; message: string }> {
    const formData = new FormData();
    formData.append("image", file);
    return this.requestFormData<{ success: boolean; data: ProductImage; message: string }>(
      `/api/products/${id}/images`,
      {
        method: "POST",
        body: formData,
      }
    );
  }

  async deleteProductImage(
    id: number | string,
    imageId: number | string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/products/${id}/images/${imageId}`,
      {
        method: "DELETE",
      }
    );
  }

  async setPrimaryProductImage(
    id: number | string,
    imageId: number | string
  ): Promise<{ success: boolean; data: ProductImage[]; message: string }> {
    return this.request<{ success: boolean; data: ProductImage[]; message: string }>(
      `/api/products/${id}/images/${imageId}/primary`,
      {
        method: "PATCH",
      }
    );
  }

  async restoreProduct(
    id: number | string
  ): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>(
      `/api/products/${id}/restore`,
      {
        method: "PATCH",
      }
    );
  }
}

export const api = new ApiClient(API_BASE_URL);
