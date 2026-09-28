import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "配送說明",
  description: "宅配與超商取貨的預覽運費說明。",
};

export default function ShippingPage() {
  return (
    <InfoLayout title="配送說明" description="運費數字只用於預覽結帳，不是正式物流報價。">
      <p>宅配未滿 2,000 元為 120 元，滿額免運。超商取貨為 60 元。配送範圍、到貨天數與超商門市選擇待物流串接後提供。</p>
      <p>訂單頁可以查看預覽物流狀態。目前不會向物流商建立托運單。</p>
    </InfoLayout>
  );
}
