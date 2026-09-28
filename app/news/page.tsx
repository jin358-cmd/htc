import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { articles } from "@/data/news";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "最新消息",
  description: "弘泰科技的生活筆記與服務說明。目前為示範內容。",
};

export default function NewsPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="消息" title="最新消息" description="這些文章用來撐起內容架構，正式消息待補。" />
      <div className="mt-10 space-y-10">
        {articles.map((article) => (
          <article key={article.slug} className="max-w-2xl border-t border-line pt-6">
            <p className="text-xs tracking-[0.16em] text-moss">{article.label}</p>
            <h2 className="mt-2 font-serif text-3xl">{article.title}</h2>
            <p className="mt-3 text-sm text-muted">{article.excerpt}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{article.body}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}
