import { create } from "zustand";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistStore {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggleWishlist: (item) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === item.id);
      if (exists) {
        return { items: state.items.filter((i) => i.id !== item.id) };
      }
      return { items: [...state.items, item] };
    }),
  isInWishlist: (id) => get().items.some((i) => i.id === id),
}));