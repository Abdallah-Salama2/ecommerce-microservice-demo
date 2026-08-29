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

export interface ProductImage {
  id: number | string;
  thumbnailUrl: string;
  previewUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  thumbnailUrl?: string | null;
  images?: ProductImage[];
  isActive?: boolean;
}

// Helper to get primary image or fallback for a product
export function getProductPrimaryImage(product: Product): {
  thumbnailUrl: string;
  previewUrl: string;
  altText: string;
} {
  if (product.images && product.images.length > 0) {
    const sorted = [...product.images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const primary = sorted.find((img) => img.isPrimary) || sorted[0];
    if (primary) {
      return {
        thumbnailUrl: primary.thumbnailUrl || primary.previewUrl || "/placeholder.jpg",
        previewUrl: primary.previewUrl || primary.thumbnailUrl || "/placeholder.jpg",
        altText: primary.altText || product.name,
      };
    }
  }
  const fallback = product.thumbnailUrl || "/placeholder.jpg";
  return {
    thumbnailUrl: fallback,
    previewUrl: fallback,
    altText: product.name,
  };
}

// Helper to convert string ID to number for cart API
export function getProductIdNumber(product: Product): number {
  return parseInt(product.id, 10);
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
  cartId: string;
  cartItemId: string;
  productId: string;
  quantity: number;
  productName: string;
  productSlug: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  thumbnailUrl: string | null;
  isOverStock: boolean;
}

export interface Cart {
  cartId: string;
  items: CartItem[];
  subtotal: number | null;
  itemCount: number | null;
}

export interface Address {
  id: string;
  label?: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  governorate: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | string;
  subtotal?: number;
  totalAmount: number;
  itemCount?: number;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  address?: Address;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: number | string;
  productTitle?: string;
  quantity: number;
  unitPrice?: number;
  price: number;
  totalPrice?: number;
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
