import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    {
      id: '1',
      name: 'Delicious Burger',
      price: 250,
      imageUrl: 'https://res.cloudinary.com/dfhc8yteg/image/upload/v1743866683/Notice/hl9snhqhbplkm4od2qss.jpg',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Crispy Fries',
      price: 150,
      imageUrl: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
      quantity: 2,
    },
  ],

  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...newItem, quantity: 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    })),

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