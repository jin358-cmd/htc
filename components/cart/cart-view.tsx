"use client";

import { ButtonLink } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void Promise.resolve(useCartStore.persist.rehydrate()).then(() => setReady(true));
  }, []);

  if (!ready) {
    return <p className="mt-10 text-sm text-muted">正在讀取購物車。</p>;
  }

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { item, product } : null;
    })
    .filter((line) => line !== null);

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.item.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="mt-12">
        <p className="text-ink-soft">購物車是空的。</p>
        <ButtonLink href="/products" className="mt-6">
          去看看商品
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <ul className="divide-y divide-line">
        {lines.map(({ item, product }) => (
          <li key={product.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[112px_minmax(0,1fr)_auto]">
            <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] bg-sand">
              <Image src={product.images[0]} alt="" fill className="object-cover" sizes="112px" />
            </Link>
            <div className="min-w-0">
              <p className="text-xs text-muted">{product.brand}</p>
              <Link href={`/products/${product.slug}`} className="font-serif text-xl">
                {product.name}
              </Link>
              <p className="mt-1 text-sm">{formatPrice(product.price)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <QuantityInput
                  value={item.quantity}
                  max={product.stock}
                  label={product.name}
                  onChange={(quantity) => setQuantity(product.id, quantity)}
                />
                <button type="button" className="text-sm text-muted underline-offset-4 hover:underline" onClick={() => remove(product.id)}>
                  刪除
                </button>
              </div>
            </div>
            <p className="col-span-2 text-sm sm:col-span-1 sm:text-right">{formatPrice(product.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <aside className="h-fit border border-line bg-cream p-5">
        <h2 className="font-serif text-2xl">小計</h2>
        <p className="mt-4 flex justify-between text-sm">
          <span>商品</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">運費在結帳時依配送方式計算。這是預覽購物車，重新整理後仍會留在這台裝置。</p>
        <ButtonLink href="/checkout" className="mt-6 w-full">
          前往結帳
        </ButtonLink>
      </aside>
    </div>
  );
}
