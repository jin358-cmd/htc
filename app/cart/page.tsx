import { CartView } from "@/components/cart/cart-view";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "購物車",
  description: "檢視已選商品、調整數量並前往結帳。",
};

export default function CartPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="購物" title="購物車" description="數量與刪除會留在這台裝置，重新整理後仍然在。" />
      <CartView />
    </Container>
  );
}
