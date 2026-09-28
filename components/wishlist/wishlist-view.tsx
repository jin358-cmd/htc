"use client";

import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useWishlistStore } from "@/store/wishlist-store";
import { useEffect, useState } from "react";

export function WishlistView() {
  const ids = useWishlistStore((state) => state.ids);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void Promise.resolve(useWishlistStore.persist.rehydrate()).then(() => setReady(true));
  }, []);

  if (!ready) return <p className="mt-10 text-sm text-muted">正在讀取收藏。</p>;

  const saved = ids.map((id) => getProductById(id)).filter((product) => product !== undefined);
  if (saved.length === 0) {
    return (
      <div className="mt-10">
        <p className="text-ink-soft">還沒有收藏。</p>
        <ButtonLink href="/products" className="mt-6">
          瀏覽商品
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {saved.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
