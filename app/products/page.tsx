import { CatalogBrowser } from "@/components/products/catalog-browser";
import { filterProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "商品",
  description: "瀏覽弘泰科技的生活居家、居家選品與健康生活商品。",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort || "featured";
  const products = filterProducts({ q: params.q, sort });

  return (
    <CatalogBrowser
      eyebrow="商品"
      title={params.q ? `搜尋「${params.q}」` : "全部商品"}
      description="以分類慢慢看，或直接搜尋名稱、品牌與標籤。"
      products={products}
      sort={sort}
      query={params.q}
      basePath="/products"
    />
  );
}
