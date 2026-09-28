import { brands, catalogCategories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/cart", "/checkout", "/contact", "/about", "/services", "/order", "/wishlist", "/account", "/news", "/brands", "/guide", "/shipping", "/returns", "/privacy", "/terms"].map(
    (path) => ({ url: `${site.url}${path || "/"}`, lastModified: new Date() }),
  );
  const categories = catalogCategories.flatMap((group) => [group.slug, ...(group.children?.map((child) => child.slug) ?? [])]);
  return [
    ...staticRoutes,
    ...categories.map((slug) => ({ url: `${site.url}/categories/${slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${site.url}/products/${product.slug}`, lastModified: new Date() })),
    ...brands.map((brand) => ({ url: `${site.url}/brands/${brand.slug}`, lastModified: new Date() })),
  ];
}
