import { CategoryDrawer } from "@/components/products/category-drawer";
import { CategorySidebar } from "@/components/products/category-sidebar";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/commerce";
import Link from "next/link";

const sorts = [
  { id: "featured", label: "精選" },
  { id: "new", label: "新品" },
  { id: "price-asc", label: "價格由低到高" },
  { id: "price-desc", label: "價格由高到低" },
];

function hrefFor(basePath: string, params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function CatalogBrowser({
  eyebrow,
  title,
  description,
  products,
  activeSlug,
  sort = "featured",
  query,
  basePath,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  activeSlug?: string;
  sort?: string;
  query?: string;
  basePath: string;
}) {
  return (
    <Container className="py-10 lg:py-14">
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <div className="hidden lg:block">
          <CategorySidebar activeSlug={activeSlug} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CategoryDrawer activeSlug={activeSlug} />
            <p className="text-sm text-muted">
              {products.length} 件{query ? `符合「${query}」` : ""}
            </p>
            <div className="flex flex-wrap gap-2" aria-label="排序">
              {sorts.map((item) => (
                <Link
                  key={item.id}
                  href={hrefFor(basePath, { q: query, sort: item.id === "featured" ? undefined : item.id })}
                  aria-current={sort === item.id ? "page" : undefined}
                  className={cn("px-2 py-1 text-sm text-muted", sort === item.id && "text-ink underline underline-offset-4")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {products.length === 0 ? (
            <p className="mt-16 text-ink-soft">這個分類裡還沒有商品。可以換一個分類，或直接搜尋。</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
