import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "數位服務",
  description: "弘泰科技的軟體與平台系統開發，以及語音助理、點餐、防災、地圖和客服應用。",
};

const inquiryHref = "/contact?topic=business";

const products = [
  {
    id: "pmos",
    title: "PMOS AI 生活語音助理",
    headline: "開口交辦，進度隨時掌握",
    description: "用語音或文字交辦任務，查看執行進度與驗收結果。",
    href: "https://pmos.space",
    banner: "bg-moss-deep text-cream",
  },
  {
    id: "chaoxi",
    title: "巢栖飯堂｜AI 語音點餐系統",
    headline: "想吃什麼，開口就能點",
    description: "用語音選餐與線上訂購，支援門店自取與外送。",
    href: "https://chaoxi.pmos.space",
    banner: "bg-[#804831] text-cream",
  },
  {
    id: "weather",
    title: "AI 語音即時災害通報平台",
    headline: "掌握天氣變化與災害通報",
    description: "在同一個入口查看天氣資訊與即時災害通報。",
    href: "https://weather.pmos.space",
    banner: "bg-[#344b55] text-cream",
  },
  {
    id: "achange",
    title: "阿昌志工地圖",
    headline: "服務站點與車次，一圖查找",
    description: "在地圖上查找志工服務站點、車次與服務路線。",
    href: "https://achange.pmos.space",
    banner: "bg-[#536046] text-cream",
  },
  {
    id: "driving",
    title: "AI 智駕地圖",
    headline: "出發前，先看路線與沿途資訊",
    description: "透過地圖查看行車路線與沿途資訊。",
    href: null,
    banner: "bg-[#45434e] text-cream",
  },
  {
    id: "shopee",
    title: "蝦皮客服 AI 語音助理 Widget",
    headline: "把買家問題整理成回覆草稿",
    description: "用語音整理買家詢問，產生可編輯的客服回覆。",
    href: null,
    banner: "bg-[#735343] text-cream",
  },
];

export default function DigitalServicesPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro
        eyebrow="數位服務"
        title="軟體與平台系統開發"
        description="從語音點餐、客服到地圖與通報，弘泰科技為日常生活與店家營運開發實用的數位工具。"
      />

      <section className="mt-12 border-t border-line pt-10" aria-labelledby="digital-products-heading">
        <h2 id="digital-products-heading" className="font-serif text-3xl sm:text-4xl">數位產品與服務</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {products.map(({ id, title, headline, description, href, banner }) => (
            <article key={id} id={id} className="flex scroll-mt-24 flex-col border border-line bg-cream">
              <div className={`relative isolate flex min-h-44 flex-col justify-end overflow-hidden p-6 sm:p-8 ${banner}`}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[repeating-radial-gradient(circle_at_100%_0%,transparent_0_18px,#ffffff20_19px_20px,transparent_21px_34px)] [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
                <h3 className="max-w-md text-sm font-medium leading-relaxed">{title}</h3>
                <p className="mt-3 max-w-sm font-serif text-3xl leading-tight">{headline}</p>
              </div>
              <div className="flex flex-1 flex-col items-start gap-4 p-6 sm:px-8">
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">{description}</p>
                <ButtonLink
                  href={href ?? inquiryHref}
                  variant="secondary"
                  aria-label={href ? `前往${title}` : `洽詢${title}`}
                >
                  {href ? "前往服務" : "洽詢使用方式"}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
        <h2 className="font-serif text-2xl">系統開發與合作洽詢</h2>
        <ButtonLink href={inquiryHref}>聯絡我們</ButtonLink>
      </div>
    </Container>
  );
}
