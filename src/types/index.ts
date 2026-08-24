// API Response Types
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  message: string;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategoryId: number | null;
  children: Category[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  thumbnailUrl: string | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  cart: CartItem[] | null;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

// Auth Types
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  data: User[];
  message: string;
}

// API Error Response
export interface ApiError {
  success: false;
  message: string;
  error?: string;
}
