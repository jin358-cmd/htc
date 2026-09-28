import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { brands } from "@/data/categories";
import { products } from "@/data/products";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "品牌專區",
  description: "依品牌瀏覽弘泰科技目前的示範選品。",
};

export default function BrandsPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="品牌" title="品牌專區" description="品牌分類已留好。現在的名稱是示範選品，正式代理資料待補。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {brands.map((brand) => {
          const count = products.filter((product) => product.brandSlug === brand.slug).length;
          return (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="border border-line bg-cream p-6 hover:border-moss">
              <h2 className="font-serif text-3xl">{brand.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{brand.description}</p>
              <p className="mt-4 text-xs text-muted">{count} 件商品</p>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
