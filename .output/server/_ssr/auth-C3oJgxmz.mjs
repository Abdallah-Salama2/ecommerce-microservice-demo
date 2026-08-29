import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-C3oJgxmz.js
var API_BASE_URL = "http://localhost:5000/api";
var ApiClient = class {
	baseUrl;
	isRefreshing = false;
	refreshSubscribers = [];
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}
	subscribeToRefresh(callback) {
		this.refreshSubscribers.push(callback);
	}
	onRefreshed(token) {
		this.refreshSubscribers.forEach((callback) => callback(token));
		this.refreshSubscribers = [];
	}
	async request(endpoint, options = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const token = getAccessToken();
		const headers = {
			"Content-Type": "application/json",
			...options.headers
		};
		if (token) headers["Authorization"] = `Bearer ${token}`;
		let response = await fetch(url, {
			...options,
			credentials: "include",
			headers
		});
		if (response.status === 401 && !endpoint.includes("/auth/refresh")) {
			if (this.isRefreshing) return new Promise((resolve, reject) => {
				this.subscribeToRefresh((token) => {
					headers["Authorization"] = `Bearer ${token}`;
					fetch(url, {
						...options,
						credentials: "include",
						headers
					}).then((res) => this.processResponse(res, resolve, reject)).catch(reject);
				});
			});
			this.isRefreshing = true;
			try {
				await useAuthStore.getState().refreshAccessToken();
				const newToken = getAccessToken();
				this.onRefreshed(newToken || "");
				if (newToken) headers["Authorization"] = `Bearer ${newToken}`;
				response = await fetch(url, {
					...options,
					credentials: "include",
					headers
				});
			} catch (error) {
				this.isRefreshing = false;
				throw error;
			} finally {
				this.isRefreshing = false;
			}
		}
		return this.processResponse(response);
	}
	async processResponse(response, resolve, reject) {
		if (!response.ok) {
			const error = await response.json().catch(() => ({
				success: false,
				message: "An error occurred"
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
	async getProducts(params) {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.categoryId) queryParams.append("categoryId", params.categoryId.toString());
		if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
		const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
		return this.request(endpoint);
	}
	async getProduct(slugOrId) {
		return (await this.request(`/products/${slugOrId}`)).data;
	}
	async getCategories() {
		return this.request("/categories");
	}
	async getCategory(id) {
		return this.request(`/categories/${id}`);
	}
	async getCategoryBySlug(slug) {
		const response = await this.request("/categories");
		let category = response.data.find((c) => c.slug === slug);
		if (!category) for (const cat of response.data) {
			const subCat = cat.children.find((c) => c.slug === slug);
			if (subCat) {
				category = subCat;
				break;
			}
		}
		if (!category) throw new Error("Category not found");
		return category;
	}
	async register(data) {
		return this.request("/auth/register", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async login(data) {
		return this.request("/auth/login", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async logout() {
		return this.request("/auth/logout", { method: "POST" });
	}
	async getCurrentUser() {
		return this.request("/auth/me");
	}
	async getCart() {
		return this.request("/cart");
	}
	async addToCart(productId, quantity) {
		return this.request("/cart/items", {
			method: "POST",
			body: JSON.stringify({
				productId,
				quantity
			})
		});
	}
	async updateCartItem(cartItemId, quantity) {
		return this.request(`/cart/items/${cartItemId}`, {
			method: "PATCH",
			body: JSON.stringify({ quantity })
		});
	}
	async removeFromCart(cartItemId) {
		return this.request(`/cart/items/${cartItemId}`, { method: "DELETE" });
	}
	async clearCart() {
		return this.request("/cart", { method: "DELETE" });
	}
	async getOrders() {
		return this.request("/orders");
	}
	async getOrder(id) {
		return this.request(`/orders/${id}`);
	}
	async cancelOrder(id) {
		return this.request(`/orders/${id}/cancel`, { method: "PATCH" });
	}
	async createOrder(data) {
		return this.request("/orders", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async getAddresses() {
		return this.request("/addresses");
	}
	async createAddress(data) {
		return this.request("/addresses", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async updateAddress(id, data) {
		return this.request(`/addresses/${id}`, {
			method: "PUT",
			body: JSON.stringify(data)
		});
	}
	async deleteAddress(id) {
		return this.request(`/addresses/${id}`, { method: "DELETE" });
	}
	async getAdminOrders(params) {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.status) queryParams.append("status", params.status);
		const qs = queryParams.toString();
		return this.request(`/orders/admin${qs ? `?${qs}` : ""}`);
	}
	async getAdminProducts(params) {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
		const qs = queryParams.toString();
		return this.request(`/products/admin${qs ? `?${qs}` : ""}`);
	}
	async createCategory(data) {
		return this.request("/categories", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async updateCategory(id, data) {
		return this.request(`/categories/${id}`, {
			method: "PUT",
			body: JSON.stringify(data)
		});
	}
	async deleteCategory(id) {
		return this.request(`/categories/${id}`, { method: "DELETE" });
	}
	async updateOrderStatus(id, newStatus) {
		return this.request(`/orders/${id}/status`, {
			method: "PUT",
			body: JSON.stringify({ newStatus })
		});
	}
	async requestFormData(endpoint, options = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const token = getAccessToken();
		const headers = { ...options.headers };
		if (token) headers["Authorization"] = `Bearer ${token}`;
		const response = await fetch(url, {
			...options,
			credentials: "include",
			headers
		});
		return this.processResponse(response);
	}
	async createProduct(data) {
		return this.request("/products", {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async updateProduct(id, data) {
		return this.request(`/products/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data)
		});
	}
	async deleteProduct(id) {
		return this.request(`/products/${id}`, { method: "DELETE" });
	}
	async uploadProductImage(id, file) {
		const formData = new FormData();
		formData.append("image", file);
		return this.requestFormData(`/products/${id}/images`, {
			method: "POST",
			body: formData
		});
	}
	async deleteProductImage(id, imageId) {
		return this.request(`/products/${id}/images/${imageId}`, { method: "DELETE" });
	}
	async setPrimaryProductImage(id, imageId) {
		return this.request(`/products/${id}/images/${imageId}/primary`, { method: "PATCH" });
	}
	async restoreProduct(id) {
		return this.request(`/products/${id}/restore`, { method: "PATCH" });
	}
};
var api = new ApiClient(API_BASE_URL);
var useAuthStore = create((set, get) => ({
	user: null,
	accessToken: null,
	isAuthenticated: false,
	isLoading: false,
	isInitialized: false,
	error: null,
	login: async (credentials) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			const { user, accessToken } = (await api.login(credentials)).data;
			set({
				user,
				accessToken,
				isAuthenticated: true,
				isLoading: false,
				error: null
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : "Login failed"
			});
			throw error;
		}
	},
	register: async (data) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			await api.register(data);
			set({
				isLoading: false,
				error: null
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : "Registration failed"
			});
			throw error;
		}
	},
	logout: async () => {
		set({
			isLoading: true,
			error: null
		});
		try {
			await api.logout();
		} catch (error) {} finally {
			set({
				user: null,
				accessToken: null,
				isAuthenticated: false,
				isLoading: false,
				error: null
			});
		}
	},
	fetchCurrentUser: async () => {
		const { accessToken } = get();
		if (!accessToken) {
			set({
				isAuthenticated: false,
				user: null
			});
			return;
		}
		set({
			isLoading: true,
			error: null
		});
		try {
			const response = await api.getCurrentUser();
			set({
				user: response.data.user ?? response.data,
				isAuthenticated: true,
				isLoading: false,
				error: null
			});
		} catch (error) {
			set({
				user: null,
				accessToken: null,
				isAuthenticated: false,
				isLoading: false,
				error: null
			});
			throw error;
		}
	},
	refreshAccessToken: async () => {
		const response = await fetch(`http://localhost:5000/api/auth/refresh`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" }
		});
		if (!response.ok) throw new Error("Token refresh failed");
		const data = await response.json();
		if (!data.success || !data.data?.accessToken) throw new Error("Invalid refresh response");
		set({
			accessToken: data.data.accessToken,
			isAuthenticated: true
		});
		return data.data.accessToken;
	},
	initializeAuth: async () => {
		try {
			await get().refreshAccessToken();
			await get().fetchCurrentUser();
		} catch (error) {
			set({
				user: null,
				accessToken: null,
				isAuthenticated: false
			});
		} finally {
			set({ isInitialized: true });
		}
	},
	forgotPassword: async (email) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			await fetch(`http://localhost:5000/api/auth/forgot-password`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email })
			});
			set({
				isLoading: false,
				error: null
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : "Failed to send reset email"
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({
			isLoading: true,
			error: null
		});
		try {
			await fetch(`http://localhost:5000/api/auth/reset-password`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token,
					password
				})
			});
			set({
				isLoading: false,
				error: null
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : "Password reset failed"
			});
			throw error;
		}
	},
	clearError: () => set({ error: null })
}));
var getAccessToken = () => useAuthStore.getState().accessToken;
//#endregion
export { useAuthStore as n, api as t };
