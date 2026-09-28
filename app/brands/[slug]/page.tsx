import { CatalogBrowser } from "@/components/products/catalog-browser";
import { brands, findBrand } from "@/data/categories";
import { filterProducts } from "@/lib/catalog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = findBrand(slug);
  if (!brand) return { title: "找不到品牌" };
  return { title: brand.name, description: brand.description };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const brand = findBrand(slug);
  if (!brand) notFound();
  const sort = query.sort || "featured";

  return (
    <CatalogBrowser
      eyebrow="品牌專區"
      title={brand.name}
      description={brand.description}
      products={filterProducts({ brand: slug, sort })}
      activeSlug={slug}
      sort={sort}
      basePath={`/brands/${slug}`}
    />
  );
}
