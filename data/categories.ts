import type { Brand, CategoryNode } from "@/types/commerce";

export const catalogCategories: CategoryNode[] = [
  {
    slug: "living",
    name: "生活居家",
    description: "清潔、紙品、收納與每天會用到的器物。",
    children: [
      { slug: "cleaning", name: "清潔用品", description: "讓日常清潔保持單純、好收納。" },
      { slug: "paper", name: "紙品", description: "質地溫和的紙品與補充。" },
      { slug: "storage", name: "收納用品", description: "把常用的東西放回看得清楚的位置。" },
      { slug: "kitchen", name: "廚房用品", description: "備料、盛裝與桌上的小器具。" },
      { slug: "bath", name: "浴室用品", description: "濕區裡耐看、好擦拭的物件。" },
      { slug: "consumables", name: "日常消耗品", description: "需要定期補上的生活消耗。" },
    ],
  },
  {
    slug: "curated",
    name: "居家選品",
    description: "香氛、花器、裝飾與可以留下的小家具。",
    children: [
      { slug: "scent", name: "香氛", description: "氣味留在房間裡，而不是蓋過房間。" },
      { slug: "vase", name: "花器", description: "給一支花，或只是給光線一個形狀。" },
      { slug: "decor", name: "裝飾", description: "少量、可以長久放置的裝飾。" },
      { slug: "textile", name: "家飾", description: "布料、桌巾與會被摸到的表面。" },
      { slug: "furniture", name: "小型家具", description: "邊几、托架與不大張揚的家具。" },
    ],
  },
  {
    slug: "wellness",
    name: "健康生活",
    description: "個人清潔與日常照護，不涉及醫療器材。",
    children: [
      { slug: "personal-care", name: "個人清潔", description: "洗手、沐浴與身體清潔。" },
      { slug: "daily-care", name: "日常照護", description: "每天用得完的照護用品。" },
      { slug: "non-medical", name: "非醫療生活用品", description: "生活舒緩用品，非醫療器材。" },
    ],
  },
];

export const brands: Brand[] = [
  {
    slug: "hongtai-select",
    name: "弘泰選品",
    description: "弘泰科技整理的生活選品，涵蓋紙品、香氛與日常補充。",
  },
  {
    slug: "senori",
    name: "森織",
    description: "以布料與纖維為主的居家選品。",
  },
  {
    slug: "hiyori",
    name: "日和器物",
    description: "陶瓷、石材與餐桌上的容器。",
  },
  {
    slug: "foldroom",
    name: "折疊室",
    description: "收納與小型家具，強調輪廓清楚。",
  },
  {
    slug: "sumihi",
    name: "澄日",
    description: "個人清潔與日常照護。",
  },
];

export const categoryTree: CategoryNode[] = [
  ...catalogCategories,
  {
    slug: "brands",
    name: "品牌專區",
    description: "依品牌瀏覽已上架的示範商品。",
    href: "/brands",
    children: brands.map((brand) => ({
      slug: brand.slug,
      name: brand.name,
      description: brand.description,
      href: `/brands/${brand.slug}`,
    })),
  },
  {
    slug: "space",
    name: "空間服務",
    description: "室內設計、裝修、工程與諮詢。",
    href: "/services",
    children: [
      { slug: "interior", name: "室內設計", description: "空間規劃與材質方向。", href: "/services#interior" },
      { slug: "renovation", name: "室內裝修", description: "既有空間的整理與更新。", href: "/services#renovation" },
      { slug: "construction", name: "工程施工", description: "工程範圍與施作諮詢。", href: "/services#construction" },
      { slug: "consult", name: "空間諮詢", description: "先釐清需求，再決定下一步。", href: "/services#consult" },
    ],
  },
];

export function allCategoryNodes() {
  return catalogCategories.flatMap((group) => [group, ...(group.children ?? [])]);
}

export function findCategory(slug: string) {
  for (const group of catalogCategories) {
    if (group.slug === slug) return { node: group, parent: undefined };
    const child = group.children?.find((item) => item.slug === slug);
    if (child) return { node: child, parent: group };
  }
  return undefined;
}

export function categoryName(slug: string) {
  return findCategory(slug)?.node.name ?? slug;
}

export function findBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}
