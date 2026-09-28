import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { ReactNode } from "react";

export function InfoLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="弘泰科技" title={title} description={description} />
      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-ink-soft">{children}</div>
    </Container>
  );
}
