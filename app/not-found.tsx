import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-xs tracking-[0.22em] text-moss">404</p>
      <h1 className="mt-3 font-serif text-5xl">這頁不在場景裡。</h1>
      <p className="mt-4 text-ink-soft">連結可能已更換，或這個路徑還沒有建立。</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">回首頁</ButtonLink>
        <ButtonLink href="/products" variant="secondary">
          看商品
        </ButtonLink>
      </div>
    </Container>
  );
}
