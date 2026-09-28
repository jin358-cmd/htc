import { WishlistView } from "@/components/wishlist/wishlist-view";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "收藏",
  description: "留在這台裝置上的收藏商品。",
};

export default function WishlistPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="收藏" title="先留著" description="收藏不會同步到帳號。會員系統將於後續階段開放。" />
      <WishlistView />
    </Container>
  );
}
