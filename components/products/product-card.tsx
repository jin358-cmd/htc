"use client";

import { HeartIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types/commerce";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCartStore((state) => state.add);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = useWishlistStore((state) => state.ids.includes(product.id));
  const [notice, setNotice] = useState("");
  const soldOut = product.stock <= 0;

  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={product.images[0]}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <h2 className="mt-4 font-serif text-xl leading-snug">{product.name}</h2>
        </Link>
        <button
          type="button"
          className="absolute right-3 top-3 bg-cream/90 p-2"
          aria-label={saved ? `取消收藏 ${product.name}` : `收藏 ${product.name}`}
          aria-pressed={saved}
          onClick={() => toggle(product.id)}
        >
          <HeartIcon className={cn(saved && "fill-moss text-moss")} />
        </button>
      </div>
      <p className="mt-1 text-sm text-muted">{product.brand}</p>
      <p className="mt-2 flex items-baseline gap-2 text-sm">
        <span>{formatPrice(product.price)}</span>
        {product.originalPrice && product.originalPrice > product.price ? (
          <span className="text-muted line-through">{formatPrice(product.originalPrice)}</span>
        ) : null}
      </p>
      <button
        type="button"
        className="mt-4 text-sm text-moss underline-offset-4 hover:underline disabled:text-muted disabled:no-underline"
        disabled={soldOut}
        onClick={() => {
          add(product.id, 1);
          setNotice(`已將 ${product.name} 加入購物車`);
        }}
      >
        {soldOut ? "補貨中" : "加入購物車"}
      </button>
      <span className="sr-only" aria-live="polite">
        {notice}
      </span>
    </article>
  );
}
