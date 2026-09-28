"use client";

import { CloseIcon } from "@/components/ui/icons";
import { mainNav } from "@/data/site";
import { categoryTree } from "@/data/categories";
import Link from "next/link";
import { useEffect } from "react";

export function MobileNav({ onClose }: { onClose: () => void }) {
  useEffect(() => {
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

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-ink/30" aria-label="關閉選單" onClick={onClose} />
      <nav className="absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col overflow-y-auto bg-cream px-6 py-5" aria-label="手機選單">
        <div className="flex items-center justify-between">
          <p className="font-serif text-xl">弘泰科技</p>
          <button type="button" className="p-2" aria-label="關閉選單" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <ul className="mt-8 space-y-1">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-2 font-serif text-2xl" onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
          <Link href="/account" className="border border-line px-3 py-3" onClick={onClose}>
            帳戶
          </Link>
          <Link href="/wishlist" className="border border-line px-3 py-3" onClick={onClose}>
            收藏
          </Link>
          <Link href="/cart" className="border border-line px-3 py-3" onClick={onClose}>
            購物車
          </Link>
          <Link href="/contact" className="border border-line px-3 py-3" onClick={onClose}>
            諮詢
          </Link>
        </div>
        <div className="mt-8 space-y-4 pb-8">
          {categoryTree.slice(0, 3).map((group) => (
            <div key={group.slug}>
              <Link href={group.href ?? `/categories/${group.slug}`} className="text-sm text-moss" onClick={onClose}>
                {group.name}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
