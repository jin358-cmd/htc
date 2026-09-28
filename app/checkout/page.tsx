import { CheckoutFlow } from "@/components/checkout/checkout-flow";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "結帳",
  description: "填寫購買人、配送、付款與發票資料。此階段不會進行實際扣款。",
};

export default function CheckoutPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="結帳" title="確認這一次的選擇" description="五個步驟走完預覽訂單。付款、發票與通知都先停在接口。" />
      <CheckoutFlow />
    </Container>
  );
}
