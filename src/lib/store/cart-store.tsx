import { ExtendedApiResponse } from "@/types/ApiResponse";
import { CartItem, CartResponse } from "@/types/cart";
import axios from "axios";
import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  fetchDefaultCart: () => Promise<void>;
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  fetchDefaultCart: async () => {
    try {
      const response = await axios.get<ExtendedApiResponse<CartResponse>>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`
      );
      console.log(response.data);
      set({ items: response.data.data.items });
    } catch (err) {
      console.log("Error fetching cart", err);
    }
  },
  addItem: async (id) => {
    console.log(id);
    set((state) => {
      console.log("Current state", state);
      return state;
      //update state
    });
  },

  removeItem: (id) => {
    console.log("Remove item with id ", id);
  },
  updateQuantity: (id, quantity) => {
    console.log("Update ", id, ": ", quantity);
  },
  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
