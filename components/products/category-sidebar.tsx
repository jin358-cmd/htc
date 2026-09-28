import { categoryTree } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import type { CategoryNode } from "@/types/commerce";
import Link from "next/link";

function countFor(node: CategoryNode) {
  if (node.href?.startsWith("/brands/")) {
    return products.filter((product) => product.brandSlug === node.slug).length;
  }
  if (node.href?.startsWith("/services")) return undefined;
  return products.filter((product) => product.category === node.slug || product.subcategory === node.slug).length;
}

export function CategorySidebar({ activeSlug, onNavigate }: { activeSlug?: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="商品分類" className="space-y-8">
      {categoryTree.map((group) => {
        const groupHref = group.href ?? `/categories/${group.slug}`;
        const groupActive = activeSlug === group.slug;
        return (
          <div key={group.slug}>
            <Link
              href={groupHref}
              aria-current={groupActive ? "page" : undefined}
              className={cn("text-sm text-ink", groupActive && "text-moss")}
              onClick={onNavigate}
            >
              {group.name}
            </Link>
            <ul className="mt-2 space-y-1 border-l border-line pl-3">
              {group.children?.map((child) => {
                const href = child.href ?? `/categories/${child.slug}`;
                const active = activeSlug === child.slug;
                const count = countFor(child);
                return (
                  <li key={child.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex items-center justify-between gap-3 py-1 text-sm text-ink-soft hover:text-ink", active && "text-ink")}
                      onClick={onNavigate}
                    >
                      <span>{child.name}</span>
                      {typeof count === "number" ? <span className="text-xs text-muted">{count}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
