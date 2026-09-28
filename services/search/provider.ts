import { filterProducts } from "@/lib/catalog";
import type { Product } from "@/types/commerce";

export interface SearchService {
  id: string;
  search(query: string): Product[];
}

export const searchProvider: SearchService = {
  id: "local-mock",
  search(query) {
    return filterProducts({ q: query });
  },
};
