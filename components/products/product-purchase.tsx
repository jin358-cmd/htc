"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/icons";
import { QuantityInput } from "@/components/ui/quantity-input";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductPurchase({
  id,
  name,
  stock,
}: {
  id: string;
  name: string;
  stock: number;
}) {
  const router = useRouter();
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.ids.includes(id));
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const soldOut = stock <= 0;

  return (
    <div className="mt-8">
      <p className="text-sm text-ink-soft">{soldOut ? "補貨中" : `庫存 ${stock}`}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <QuantityInput value={quantity} max={Math.max(stock, 1)} onChange={setQuantity} label={`${name}數量`} />
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm"
          aria-pressed={saved}
          aria-label={saved ? `取消收藏 ${name}` : `收藏 ${name}`}
          onClick={() => toggle(id)}
        >
          <HeartIcon className={cn(saved && "fill-moss text-moss")} />
          收藏
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          disabled={soldOut}
          onClick={() => {
            add(id, quantity);
            setNotice(`已將 ${quantity} 件 ${name} 加入購物車`);
          }}
        >
          加入購物車
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={soldOut}
          onClick={() => {
            add(id, quantity);
            router.push("/checkout");
          }}
        >
          立即購買
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {notice}
      </p>
      {soldOut ? (
        <p className="mt-4 text-sm text-muted">這件商品目前沒有庫存，無法加入購物車。</p>
      ) : (
        <ButtonLink href="/cart" variant="ghost" className="mt-3 px-0">
          查看購物車
        </ButtonLink>
      )}
    </div>
  );
}
