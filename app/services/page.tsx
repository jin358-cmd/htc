import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { serviceItems } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "空間服務",
  description: "室內設計、室內裝修、工程施工與空間諮詢。",
};

const topics: Record<string, string> = {
  interior: "interior",
  renovation: "renovation",
  construction: "construction",
  consult: "interior",
};

export default function ServicesPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="空間" title="先把空間說清楚" description="設計、裝修與工程可以分開詢問，也可以放在同一封訊息裡。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {serviceItems.map((item) => (
          <article key={item.id} id={item.id} className="flex min-h-64 flex-col justify-between border border-line bg-cream p-6">
            <div>
              <h2 className="font-serif text-3xl">{item.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </div>
            <ButtonLink href={`/contact?topic=${topics[item.id]}`} variant="secondary" className="mt-8 self-start">
              諮詢{item.title}
            </ButtonLink>
          </article>
        ))}
      </div>
    </Container>
  );
}
