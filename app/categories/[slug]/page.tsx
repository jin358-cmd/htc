import { CatalogBrowser } from "@/components/products/catalog-browser";
import { catalogCategories, findCategory } from "@/data/categories";
import { filterProducts } from "@/lib/catalog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return catalogCategories.flatMap((group) => [group, ...(group.children ?? [])]).map((node) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return { title: "找不到分類" };
  return { title: category.node.name, description: category.node.description };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const category = findCategory(slug);
  if (!category) notFound();
  const sort = query.sort || "featured";

  return (
    <CatalogBrowser
      eyebrow={category.parent?.name ?? "分類"}
      title={category.node.name}
      description={category.node.description}
      products={filterProducts({ category: slug, q: query.q, sort })}
      activeSlug={slug}
      sort={sort}
      query={query.q}
      basePath={`/categories/${slug}`}
    />
  );
}
