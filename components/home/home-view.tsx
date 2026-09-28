import { HeroScene } from "@/components/home/hero-scene";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/page-intro";
import { catalogCategories } from "@/data/categories";
import { filterProducts } from "@/lib/catalog";
import { serviceItems } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

const featuredCategories = [
  catalogCategories[0],
  catalogCategories[1],
  catalogCategories[2],
  { slug: "services", name: "空間服務", description: "設計、裝修、工程與一次把需求說清楚的諮詢。", href: "/services" },
];

export function HomeView() {
  const selected = filterProducts({ featured: true }).slice(0, 4);
  const arrivals = filterProducts({ tag: "new" }).slice(0, 4);

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-8 py-10 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="text-xs tracking-[0.28em] text-moss">HONG TAI LIVING</p>
            <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.18] text-ink sm:text-5xl lg:text-[4.15rem]">
              讓生活，
              <br />
              多一點選擇。
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              從日常用品到空間體驗，找到真正適合生活的好物。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/products">探索商品</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                空間服務
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-xl lg:order-2 lg:max-w-none">
            <HeroScene />
            <p className="mt-3 text-right text-xs tracking-[0.16em] text-muted">日常，慢慢就位。</p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="分類" title="依生活的節奏挑選" description="先從房間裡真正會用到的地方開始，而不是一次看完整個倉庫。" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((item) => (
              <Link
                key={item.slug}
                href={"href" in item && item.href ? item.href : `/categories/${item.slug}`}
                className="flex min-h-52 flex-col justify-between bg-sand p-6 transition-colors hover:bg-paper-deep"
              >
                <span className="text-xs tracking-[0.16em] text-moss">分類</span>
                <span>
                  <span className="block font-serif text-2xl">{item.name}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="精選" title="現在想先被看見的" />
            <Link href="/products" className="text-sm text-moss underline-offset-4 hover:underline">
              全部商品
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {selected.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="新品" title="剛放進來的" description="新品不是喊得最大聲的那一區，只是最近才出現在這個場景裡。" />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {arrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep/50 py-16 lg:py-24">
        <Container className="grid items-stretch gap-6 lg:grid-cols-12">
          <div className="relative min-h-[420px] lg:col-span-7">
            <Image src="/images/products/vase.png" alt="手拉石紋花器放在柔和的桌面上" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <p className="text-xs tracking-[0.22em] text-moss">生活場景</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">器物，放回生活裡。</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                花器可以只有一支花，桌巾可以只是鋪著。商品的位置比標籤更重要。
              </p>
              <ButtonLink href="/products/stone-vase" variant="secondary" className="mt-6">
                看這件花器
              </ButtonLink>
            </div>
            <div className="relative aspect-[5/4]">
              <Image src="/images/products/linen.png" alt="晨霧亞麻桌巾的布料皺褶" fill className="object-cover" sizes="(min-width: 1024px) 35vw, 100vw" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="關於弘泰"
              title="選品、空間，同一張桌子"
              description="弘泰科技把生活用品與居家空間放在同一個入口。現在先把商品與服務的骨架搭好，之後再接上訂單、會員與正式金流。"
            />
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              關於我們
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceItems.map((item) => (
              <article key={item.id} id={item.id} className="border border-line bg-cream p-5">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="bg-moss px-6 py-12 text-cream sm:px-12 lg:flex lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.22em] text-cream/70">諮詢</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">有一件事還沒被分類，也可以先說。</h2>
              <p className="mt-4 text-cream/80">商品、訂單、空間或合作，留下需求即可。這個階段不會把資料送進正式客服系統。</p>
            </div>
            <ButtonLink href="/contact" className="mt-8 bg-cream text-ink hover:bg-paper lg:mt-0">
              前往諮詢
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
