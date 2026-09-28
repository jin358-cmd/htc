"use client";

import { getProductById } from "@/data/products";
import type { CartItem } from "@/types/commerce";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, quantity = 1) => {
        const product = getProductById(productId);
        if (!product || product.stock <= 0) return;
        set((state) => {
          const existing = state.items.find((item) => item.productId === productId);
          const nextQuantity = Math.min(product.stock, (existing?.quantity ?? 0) + quantity);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId ? { ...item, quantity: nextQuantity } : item,
              ),
            };
          }
          return { items: [...state.items, { productId, quantity: nextQuantity }] };
        });
      },
      setQuantity: (productId, quantity) => {
        const product = getProductById(productId);
        if (!product) return;
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.productId !== productId) };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(product.stock, quantity) }
                : item,
            ),
          };
        });
      },
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "htc-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
