"use client";

import type { Order } from "@/types/commerce";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OrderState = {
  orders: Order[];
  add: (order: Order) => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      add: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: "htc-orders",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
