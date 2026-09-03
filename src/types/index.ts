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
  children: Category[]; // Used by tree endpoint GET /categories
  subcategories?: Category[]; // Used by single-category endpoint GET /categories/:slug
  isActive?: boolean;
}

export interface ProductImage {
  id: number | string;
  thumbnailUrl: string;
  previewUrl: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
  status: 'pending' | 'processed';
}

// Response from media-service: GET /products/:id/images
export interface ProductImagesResponse {
  success: boolean;
  data: ProductImage[];
  message: string;
}

// Response from media-service: GET /products/images/batch?ids=1,2,3
export interface ProductThumbnail {
  productId: number;
  thumbnailUrl: string;
}

export interface ProductThumbnailsBatchResponse {
  success: boolean;
  data: ProductThumbnail[];
  message: string;
}

// Inventory Service Types
// Note: There's a known API inconsistency where batch responses use snake_case (product_id)
// while individual operations use camelCase (productId). We handle both cases explicitly.

// Batch response with snake_case (GET /stock/batch)
export interface StockBatchItem {
  product_id: number;
  quantity: number;
}

export interface StockBatchResponse {
  success: boolean;
  data: StockBatchItem[];
  message: string;
}

// Individual operation responses with camelCase (PATCH/PUT /stock/:productId)
export interface StockItem {
  productId: number;
  quantity: number;
}

export interface StockResponse {
  success: boolean;
  data: StockItem;
  message: string;
}

// Request types for inventory operations
export interface StockDeltaRequest {
  delta: number; // positive or negative integer for relative adjustments
}

export interface StockAbsoluteRequest {
  newQuantity: number; // absolute value for setting stock
}

// Helper to handle the API casing inconsistency
// Converts snake_case batch responses to camelCase for consistent usage
export function normalizeStockBatchItem(item: StockBatchItem): { productId: number; quantity: number } {
  return {
    productId: item.product_id,
    quantity: item.quantity,
  };
}

// Helper to get stock quantity for a product from batch data
// Uses Number() coercion because the API may return product_id as a string.
export function getProductStock(productId: number, stockBatch: StockBatchItem[]): number {
  const item = stockBatch.find(item => Number(item.product_id) === Number(productId));
  return item?.quantity ?? 0;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  categoryId: number;
  isActive?: boolean;
  // Note: images are no longer nested in product response
  // - images must be fetched separately from media-service: GET /products/:id/images
  // - stockQuantity comes from inventory-service (Phase 4)
}

// For product creation (POST /products) - includes stockQuantity
export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
}

// Helper to get primary image or fallback for a product
// Note: This function now expects images to be passed separately since they're no longer nested in product response
export function getProductPrimaryImage(product: Product, images?: ProductImage[]): {
  thumbnailUrl: string;
  previewUrl: string;
  altText: string;
} {
  if (images && images.length > 0) {
    const sorted = [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    const primary = sorted.find((img) => img.isPrimary) || sorted[0];
    if (primary) {
      return {
        thumbnailUrl: primary.thumbnailUrl || primary.previewUrl || "/placeholder.jpg",
        previewUrl: primary.previewUrl || primary.thumbnailUrl || "/placeholder.jpg",
        altText: primary.altText || product.name,
      };
    }
  }
  const fallback = (product as any).thumbnailUrl || "/placeholder.jpg";
  return {
    thumbnailUrl: fallback,
    previewUrl: fallback,
    altText: product.name,
  };
}

// Helper to get thumbnail from batch data for product cards
export function getProductThumbnail(product: Product, thumbnails: ProductThumbnail[]): string {
  const productId = parseInt(product.id, 10);
  const thumbnail = thumbnails.find(t => Number(t.productId) === productId);
  return thumbnail?.thumbnailUrl || (product as any).thumbnailUrl || "/placeholder.jpg";
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
}

export interface CartItem {
  productId: number; // Now used as the line-item key instead of cartItemId
  quantity: number;
  availableStock: number; // Current available stock from inventory-service
  name: string; // Product name
  slug: string; // Product slug
  price: number;
  isActive: boolean; // false if product was deactivated/deleted after being added
  isOverStock: boolean; // true if cart quantity exceeds availableStock
  thumbnailUrl: string | null;
}

export interface Cart {
  items: CartItem[];
  subtotal: number; // Only counts isActive items
  itemCount: number; // Only counts isActive items
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
  status: 'Pending' | 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | string;
  subtotal?: number;
  totalAmount: number;
  itemCount?: number; // Summary field for list views
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[]; // Only populated in GET /orders/:id, not in list views
  address?: Address;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: number;
  productTitle: string; // Snapshot of product title at time of purchase
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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
    cart?: Cart;
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
