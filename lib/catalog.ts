import { categoryName } from "@/data/categories";
import { getProductBySlug, products } from "@/data/products";
import type { Product } from "@/types/commerce";

export type ProductQuery = {
  category?: string;
  brand?: string;
  q?: string;
  sort?: string;
  featured?: boolean;
  tag?: string;
};

export function filterProducts(query: ProductQuery = {}) {
  let items = products.slice();

  if (query.category) {
    items = items.filter(
      (product) => product.category === query.category || product.subcategory === query.category,
    );
  }

  if (query.brand) {
    items = items.filter((product) => product.brandSlug === query.brand);
  }

  if (query.featured) {
    items = items.filter((product) => product.featured);
  }

  if (query.tag) {
    items = items.filter((product) => product.tags.includes(query.tag ?? ""));
  }

  const needle = query.q?.trim().toLowerCase();
  if (needle) {
    items = items.filter((product) => {
      const haystack = [
        product.name,
        product.brand,
        categoryName(product.category),
        categoryName(product.subcategory),
        product.shortDescription,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }

  switch (query.sort) {
    case "price-asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "new":
      items.sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
      break;
    default:
      items.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "zh-Hant"));
  }

  return items;
}

export function relatedProducts(product: Product, limit = 4) {
  const sameSub = products.filter(
    (item) => item.slug !== product.slug && item.subcategory === product.subcategory,
  );
  const sameParent = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category && item.subcategory !== product.subcategory,
  );
  return [...sameSub, ...sameParent].slice(0, limit);
}

export function productPath(slug: string) {
  return `/products/${slug}`;
}

export function getVisibleProduct(slug: string) {
  return getProductBySlug(slug);
}
