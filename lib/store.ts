import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  user: any | null;
  isDarkMode: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  setUser: (user: any) => void;
  logout: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      user: null,
      isDarkMode: false,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.find((item) => item.id === product.id);
          if (exists) {
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'stories-storage',
    }
  )
);
