"use client";

import { CloseIcon } from "@/components/ui/icons";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { searchProvider } from "@/services/search/provider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const trimmed = query.trim();
  const results = trimmed ? searchProvider.search(trimmed).slice(0, 6) : products.filter((item) => item.featured).slice(0, 4);

  function submit() {
    const href = trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products";
    router.push(href);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-paper/96 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-5 py-6 md:px-8" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="flex items-center justify-between">
          <p id={titleId} className="text-xs tracking-[0.22em] text-moss">
            搜尋商品
          </p>
          <button type="button" className="p-2" aria-label="關閉搜尋" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form
          role="search"
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label htmlFor="site-search" className="sr-only">
            搜尋商品名稱、品牌、分類或標籤
          </label>
          <input
            ref={inputRef}
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋名稱、品牌、分類或標籤"
            className="w-full border-b border-ink/20 bg-transparent py-4 font-serif text-3xl outline-none placeholder:text-muted"
          />
        </form>
        <p className="mt-6 text-sm text-muted">{trimmed ? `「${trimmed}」的結果` : "精選建議"}</p>
        <ul className="mt-3 divide-y divide-line overflow-auto">
          {results.length === 0 ? <li className="py-6 text-sm text-ink-soft">沒有符合的商品。</li> : null}
          {results.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.slug}`} className="flex items-center gap-4 py-3" onClick={onClose}>
                <span className="relative h-16 w-14 shrink-0 bg-sand">
                  <Image src={product.images[0]} alt="" fill className="object-cover" sizes="56px" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{product.brand}</span>
                  <span className="block font-serif text-lg">{product.name}</span>
                </span>
                <span className="ml-auto text-sm">{formatPrice(product.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" className="mt-4 self-start text-sm text-moss underline-offset-4 hover:underline" onClick={submit}>
          查看全部結果
        </button>
      </div>
    </div>
  );
}
