"use client";

import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { usePreferenceStore } from "@/store/preference-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useEffect } from "react";

export function StoreHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
    void useOrderStore.persist.rehydrate();
    void usePreferenceStore.persist.rehydrate();
  }, []);

  return null;
}
