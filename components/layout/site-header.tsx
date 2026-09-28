"use client";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/icons";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<"none" | "menu" | "search">("none");
  const closePanel = useCallback(() => setPanel("none"), []);
  const [ready, setReady] = useState(false);
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const saved = useWishlistStore((state) => state.ids.length);

  useEffect(() => {
    void Promise.all([
      Promise.resolve(useCartStore.persist.rehydrate()),
      Promise.resolve(useWishlistStore.persist.rehydrate()),
    ]).then(() => setReady(true));
  }, []);

  function active(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <a
        href="#main"
        className="absolute left-4 top-3 z-50 -translate-y-20 bg-ink px-4 py-2 text-sm text-cream focus:translate-y-0"
      >
        跳至主要內容
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-3 px-4 md:px-8 lg:h-20 lg:px-10">
        <button type="button" className="p-2 lg:hidden" aria-label="開啟選單" aria-expanded={panel === "menu"} onClick={() => setPanel("menu")}>
          <MenuIcon />
        </button>
        <Link href="/" className="font-serif text-xl tracking-wide text-ink sm:text-2xl">
          弘泰<span className="text-base text-muted">科技</span>
        </Link>
        <nav className="ml-6 hidden items-center gap-5 lg:flex" aria-label="主要選單">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={cn("text-sm text-ink-soft hover:text-ink", active(item.href) && "text-ink")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center">
          <button type="button" className="p-2" aria-label="搜尋" onClick={() => setPanel("search")}>
            <SearchIcon />
          </button>
          <Link href="/account" className="hidden p-2 sm:inline-flex" aria-label="帳戶">
            <UserIcon />
          </Link>
          <Link href="/wishlist" className="relative hidden p-2 sm:inline-flex" aria-label={ready && saved > 0 ? `收藏，${saved} 件` : "收藏"}>
            <HeartIcon />
            {ready && saved > 0 ? (
              <span className="absolute right-0 top-0 min-w-4 rounded-full bg-moss px-1 text-center text-[10px] leading-4 text-cream">{saved}</span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative p-2" aria-label={ready && count > 0 ? `購物車，${count} 件商品` : "購物車"}>
            <BagIcon />
            {ready && count > 0 ? (
              <span className="absolute right-0 top-0 min-w-4 rounded-full bg-moss px-1 text-center text-[10px] leading-4 text-cream">{count}</span>
            ) : null}
          </Link>
        </div>
      </div>
      {panel === "menu" ? <MobileNav onClose={closePanel} /> : null}
      {panel === "search" ? <SearchOverlay onClose={closePanel} /> : null}
    </header>
  );
}
