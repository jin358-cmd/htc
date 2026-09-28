import { InvoiceTools } from "@/components/account/invoice-tools";
import { NotificationSettings } from "@/components/forms/notification-settings";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "帳戶",
  description: "會員入口預留，以及通知與發票設定。",
};

export default function AccountPage() {
  return (
    <Container className="py-12 lg:py-16">
      <PageIntro eyebrow="帳戶" title="會員稍後再說" description="登入、訂單雲端同步與會員載具會在下一階段接上。現在可以先設定這台裝置的通知偏好。" />
      <div className="mt-8 border border-line bg-sand p-5 text-sm text-ink-soft">帳戶登入尚未開放。不需要在這個階段建立密碼。</div>
      <div className="mt-8">
        <NotificationSettings />
      </div>
      <InvoiceTools />
    </Container>
  );
}
