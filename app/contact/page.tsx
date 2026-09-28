import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "商品、訂單、空間設計、裝修、工程與合作諮詢。",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="諮詢" title="把需求留在這裡" description="電話不是必填。附件欄位已留好，這個階段不會真的上傳檔案。" />
      <ContactForm initialTopic={topic} />
    </Container>
  );
}
