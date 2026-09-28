import { Container } from "@/components/ui/container";
import { footerExplore, footerHelp } from "@/data/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-cream">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl">弘泰科技</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            品牌官網、生活選品與空間服務的入口。商品放回生活場景裡，而不是堆在促銷欄位上。
          </p>
        </div>
        <nav aria-label="探索">
          <p className="text-xs tracking-[0.18em] text-muted">探索</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerExplore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-moss">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="協助">
          <p className="text-xs tracking-[0.18em] text-muted">協助</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerHelp.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-moss">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted">公司資料</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">待補正式資料</p>
          <p className="mt-6 text-xs tracking-[0.18em] text-muted">社群</p>
          <p className="mt-3 text-sm text-ink-soft">待補正式資料</p>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-5 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} 弘泰科技</p>
        <p>本階段為可預覽的網站基礎，金流、發票與物流尚未正式串接。</p>
      </Container>
    </footer>
  );
}
