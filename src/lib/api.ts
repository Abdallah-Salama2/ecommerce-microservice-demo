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
    search?: string;
  }): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId.toString());
    if (params?.search) queryParams.append("search", params.search);

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return this.request<PaginatedResponse<Product>>(endpoint);
  }

  async getProduct(slug: string): Promise<Product> {
    // First try to get all products and find by slug
    const response = await this.request<PaginatedResponse<Product>>("/products");
    const product = response.data.find(p => p.slug === slug);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  // Categories
  async getCategories(): Promise<{ success: boolean; data: Category[]; message: string }> {
    return this.request<{ success: boolean; data: Category[]; message: string }>("/categories");
  }

  async getCategory(id: number): Promise<Category> {
    return this.request<Category>(`/categories/${id}`);
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
  async getCart(): Promise<{ success: boolean; data: CartItem[]; message: string }> {
    return this.request<{ success: boolean; data: CartItem[]; message: string }>("/cart");
  }

  async addToCart(productId: string, quantity: number): Promise<{
    success: boolean;
    data: CartItem;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: CartItem;
      message: string;
    }>("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<{
    success: boolean;
    data: CartItem;
    message: string;
  }> {
    return this.request<{
      success: boolean;
      data: CartItem;
      message: string;
    }>(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/cart/${itemId}`, {
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

  async createOrder(data: {
    shippingAddress: Address;
    items: { productId: string; quantity: number }[];
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
}

export const api = new ApiClient(API_BASE_URL);
