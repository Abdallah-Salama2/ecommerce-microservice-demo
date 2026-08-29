import { create } from "zustand";
import { toast } from "sonner";

interface WishlistState {
  wishlistIds: Set<string>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: { id: string; name: string }) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const STORAGE_KEY = "wishlist_items";

// Helper to safely load wishlist IDs from localStorage
function loadWishlistFromStorage(): Set<string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

// Helper to save wishlist IDs to localStorage
function saveWishlistToStorage(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Ignore storage write errors
  }
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: loadWishlistFromStorage(),

  isInWishlist: (productId: string) => {
    return get().wishlistIds.has(productId);
  },

  toggleWishlist: (product: { id: string; name: string }) => {
    const current = get().wishlistIds;
    const next = new Set(current);

    if (next.has(product.id)) {
      next.delete(product.id);
      saveWishlistToStorage(next);
      set({ wishlistIds: next });
      toast.success(`Removed "${product.name}" from wishlist`);
    } else {
      next.add(product.id);
      saveWishlistToStorage(next);
      set({ wishlistIds: next });
      toast.success(`Added "${product.name}" to wishlist`);
    }
  },

  removeFromWishlist: (productId: string) => {
    const current = get().wishlistIds;
    if (!current.has(productId)) return;
    const next = new Set(current);
    next.delete(productId);
    saveWishlistToStorage(next);
    set({ wishlistIds: next });
  },

  clearWishlist: () => {
    const empty = new Set<string>();
    saveWishlistToStorage(empty);
    set({ wishlistIds: empty });
    toast.success("Cleared wishlist");
  },
}));

/**
 * useWishlist — convenient hook alias for consuming the wishlist store.
 */
export function useWishlist() {
  const store = useWishlistStore();
  return {
    wishlistIds: store.wishlistIds,
    isInWishlist: store.isInWishlist,
    toggleWishlist: store.toggleWishlist,
    removeFromWishlist: store.removeFromWishlist,
    clearWishlist: store.clearWishlist,
  };
}
