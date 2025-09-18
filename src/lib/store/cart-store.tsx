import { ExtendedApiResponse } from "@/types/ApiResponse";
import { CartResponse, CartItem } from "@/types/cart";
import { Food } from "@/types/foods";
import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (foodId: string, quantity?: number, food?: Food) => Promise<void>;
  removeItem: (foodId: string) => Promise<void>;
  updateQuantity: (foodId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (foodId: string) => number;
  isItemInCart: (foodId: string) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response =
        await axios.get<ExtendedApiResponse<CartResponse>>("/api/cart");
      console.log(response);
      if (response.data.success) {
        set({ items: response.data.data.items || [] });
      } else {
        set({ error: response.data.message || "Failed to fetch cart" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch cart";
      set({ error: errorMessage });
      console.error("Error fetching cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (foodId: string, quantity = 1, food?: Food) => {
    // Optimistic update
    set({ isLoading: true, error: null });
    const previousItems = get().items;

    const existing = previousItems.find((i) => i.foodId === foodId);
    const optimisticItems: CartItem[] = existing
      ? previousItems.map((i) =>
          i.foodId === foodId ? { ...i, quantity: i.quantity + quantity } : i
        )
      : [...previousItems, { foodId, quantity: Math.max(quantity, 1), food }];

    set({ items: optimisticItems, isLoading: false });

    try {
      const response = await axios.post<ExtendedApiResponse<CartResponse>>(
        "/api/cart",
        { foodId, quantity }
      );

      if (response.data.success) {
        // Reconcile with server response (contains authoritative pricing/details)
        set({ items: response.data.data.items || optimisticItems });
        toast.success("Item added to cart");
      } else {
        set({
          items: previousItems,
          error: response.data.message || "Failed to add item",
        });
        toast.error(response.data.message || "Failed to add item");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item";
      set({ items: previousItems, error: errorMessage });
      toast.error(errorMessage);
      console.error("Error adding item to cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (foodId: string) => {
    // Optimistic remove
    set({ isLoading: true, error: null });
    const previousItems = get().items;
    const optimisticItems = previousItems.filter((i) => i.foodId !== foodId);
    set({ items: optimisticItems, isLoading: false });

    try {
      const response = await axios.delete<ExtendedApiResponse<CartResponse>>(
        `/api/cart/${foodId}`
      );

      if (response.data.success) {
        set({ items: response.data.data.items || optimisticItems });
        toast.success("Item removed from cart");
      } else {
        set({
          items: previousItems,
          error: response.data.message || "Failed to remove item",
        });
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove item";
      set({ items: previousItems, error: errorMessage });
      toast.error(errorMessage);
      console.error("Error removing item from cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (foodId: string, quantity: number) => {
    if (quantity < 1) {
      return await get().removeItem(foodId);
    }

    // Optimistic quantity update
    set({ isLoading: true, error: null });
    const previousItems = get().items;
    const optimisticItems = previousItems.map((i) =>
      i.foodId === foodId ? { ...i, quantity } : i
    );
    set({ items: optimisticItems, isLoading: false });

    try {
      const response = await axios.put<ExtendedApiResponse<CartResponse>>(
        `/api/cart/${foodId}`,
        { quantity }
      );

      if (response.data.success) {
        const newItems = optimisticItems.map((item, index) => {
          return {
            ...item,
            quantity: response.data.data.items[index].quantity,
          };
        });
        set({ items: newItems });
      } else {
        set({
          items: previousItems,
          error: response.data.message || "Failed to update quantity",
        });
        toast.error(response.data.message || "Failed to update quantity");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update quantity";
      set({ items: previousItems, error: errorMessage });
      toast.error(errorMessage);
      console.error("Error updating cart item quantity:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    // Optimistic clear
    set({ isLoading: true, error: null });
    const previousItems = get().items;
    set({ items: [] });

    try {
      const response =
        await axios.delete<ExtendedApiResponse<CartResponse>>("/api/cart");

      if (response.data.success) {
        set({ items: [] });
        toast.success("Cart cleared");
      } else {
        set({
          items: previousItems,
          error: response.data.message || "Failed to clear cart",
        });
        toast.error(response.data.message || "Failed to clear cart");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      set({ items: previousItems, error: errorMessage });
      toast.error(errorMessage);
      console.error("Error clearing cart:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = item.food?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },

  getItemQuantity: (foodId: string) => {
    const { items } = get();
    const item = items.find((item) => item.foodId === foodId);
    return item ? item.quantity : 0;
  },

  isItemInCart: (foodId: string) => {
    const { items } = get();
    return items.some((item) => item.foodId === foodId);
  },
}));
