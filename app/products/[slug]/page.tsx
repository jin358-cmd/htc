import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfoTabs } from "@/components/products/product-info-tabs";
import { ProductPurchase } from "@/components/products/product-purchase";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/ui/container";
import { findBrand, categoryName, findCategory } from "@/data/categories";
import { getProductBySlug, products } from "@/data/products";
import { relatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "找不到商品" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = findCategory(product.subcategory);
  const brand = findBrand(product.brandSlug);
  const related = relatedProducts(product);

  return (
    <Container className="py-10 lg:py-14">
      <nav aria-label="麵包屑" className="text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/">首頁</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products">商品</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/categories/${product.subcategory}`}>{category?.node.name ?? categoryName(product.subcategory)}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          {brand ? (
            <Link href={`/brands/${brand.slug}`} className="text-sm text-moss">
              {product.brand}
            </Link>
          ) : (
            <p className="text-sm text-moss">{product.brand}</p>
          )}
          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 flex items-baseline gap-3 text-lg">
            <span>{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price ? (
              <span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span>
            ) : null}
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{product.shortDescription}</p>
          <p className="mt-3 text-xs text-muted">SKU {product.sku}</p>
          <ProductPurchase id={product.id} name={product.name} stock={product.stock} />
          <p className="mt-6 text-xs text-muted">所示價格與規格為 Phase 01 示範資料。</p>
        </div>
      </div>
      <ProductInfoTabs description={product.description} specs={product.specs} />
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl">相關商品</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
