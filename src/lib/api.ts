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
} from "@/types";
import { getAccessToken, useAuthStore } from "@/store/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
    limit?: number;
    categoryId?: number;
    searchTerm?: string;
  }): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId.toString());
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return this.request<PaginatedResponse<Product>>(endpoint);
  }

  async getProduct(slugOrId: string): Promise<Product> {
    const response = await this.request<{ success: boolean; data: Product; message: string }>(
      `/products/${slugOrId}`
    );
    return response.data;
  }

  // Categories
  async getCategories(): Promise<{ success: boolean; data: Category[]; message: string }> {
    return this.request<{ success: boolean; data: Category[]; message: string }>("/categories");
  }

  async getCategory(id: number): Promise<Category> {
    return this.request<Category>(`/categories/${id}`);
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await this.request<{ success: boolean; data: Category[]; message: string }>("/categories");
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
    return this.request<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<{ success: boolean; data: User; message: string }> {
    return this.request<{ success: boolean; data: User; message: string }>("/auth/me");
  }

  // Cart
  async getCart(): Promise<{ success: boolean; data: Cart; message: string }> {
    return this.request<{ success: boolean; data: Cart; message: string }>("/cart");
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
    }>("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(cartItemId: string, quantity: number): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>(`/cart/items/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(cartItemId: string): Promise<{
    success: boolean;
    data: Cart;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: Cart;
      message: string;
    }>(`/cart/items/${cartItemId}`, {
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
    }>("/cart", {
      method: "DELETE",
    });
  }

  // Orders
  async getOrders(): Promise<{ success: boolean; data: Order[]; message: string }> {
    return this.request<{ success: boolean; data: Order[]; message: string }>("/orders");
  }

  async getOrder(id: string): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/orders/${id}`);
  }

  async cancelOrder(id: string): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/orders/${id}/cancel`, {
      method: "PATCH",
    });
  }

  async createOrder(data: {
    addressId: number;
    idempotencyKey: string;
  }): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Addresses
  async getAddresses(): Promise<{ success: boolean; data: Address[]; message: string }> {
    return this.request<{ success: boolean; data: Address[]; message: string }>("/addresses");
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
    }>("/addresses", {
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
    }>(`/addresses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteAddress(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/addresses/${id}`, {
      method: "DELETE",
    });
  }

  // Admin
  async getAdminOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Order>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    const qs = queryParams.toString();
    return this.request<PaginatedResponse<Order>>(`/orders/admin${qs ? `?${qs}` : ""}`);
  }

  async getAdminProducts(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    const qs = queryParams.toString();
    return this.request<PaginatedResponse<Product>>(`/products/admin${qs ? `?${qs}` : ""}`);
  }

  // Category Management
  async createCategory(data: {
    name: string;
    slug: string;
    parentId?: number | null;
  }): Promise<{ success: boolean; data: Category; message: string }> {
    return this.request<{ success: boolean; data: Category; message: string }>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCategory(
    id: number,
    data: { name?: string; slug?: string; parentId?: number | null }
  ): Promise<{ success: boolean; data: Category; message: string }> {
    return this.request<{ success: boolean; data: Category; message: string }>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  // Order Status Update Workstation
  async updateOrderStatus(
    id: string,
    newStatus: string
  ): Promise<{ success: boolean; data: Order; message: string }> {
    return this.request<{ success: boolean; data: Order; message: string }>(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ newStatus }),
    });
  }

  // Product CRUD & Image Management
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

  async createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
  }): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>("/products", {
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
      stockQuantity?: number;
      categoryId?: number;
    }
  ): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: number | string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
  }

  async uploadProductImage(
    id: number | string,
    file: File
  ): Promise<{ success: boolean; data: Product; message: string }> {
    const formData = new FormData();
    formData.append("image", file);
    return this.requestFormData<{ success: boolean; data: Product; message: string }>(
      `/products/${id}/images`,
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
      `/products/${id}/images/${imageId}`,
      {
        method: "DELETE",
      }
    );
  }

  async setPrimaryProductImage(
    id: number | string,
    imageId: number | string
  ): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>(
      `/products/${id}/images/${imageId}/primary`,
      {
        method: "PATCH",
      }
    );
  }

  async restoreProduct(
    id: number | string
  ): Promise<{ success: boolean; data: Product; message: string }> {
    return this.request<{ success: boolean; data: Product; message: string }>(
      `/products/${id}/restore`,
      {
        method: "PATCH",
      }
    );
  }
}

export const api = new ApiClient(API_BASE_URL);
