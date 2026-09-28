"use client";

import { CategorySidebar } from "@/components/products/category-sidebar";
import { CloseIcon } from "@/components/ui/icons";
import { useEffect, useState } from "react";

export function CategoryDrawer({ activeSlug }: { activeSlug?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="border border-line px-4 py-2 text-sm lg:hidden"
        aria-expanded={open}
        aria-controls="category-drawer"
        onClick={() => setOpen(true)}
      >
        分類
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/30" aria-label="關閉分類" onClick={() => setOpen(false)} />
          <div id="category-drawer" role="dialog" aria-modal="true" aria-label="商品分類" className="absolute inset-y-0 left-0 w-[min(100%,20rem)] overflow-y-auto bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-serif text-xl">分類</p>
              <button type="button" aria-label="關閉分類" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <CategorySidebar activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
