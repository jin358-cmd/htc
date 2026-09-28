import { OrderCenter } from "@/components/order/order-center";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "訂單與物流",
  description: "查詢預覽訂單、查看物流狀態，並設定通知方式。",
};

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="訂單" title="訂單與物流" description="預覽訂單只存在這台裝置。正式物流單號與通知會在後續階段連接。" />
      <OrderCenter initialId={id} />
    </Container>
  );
}
