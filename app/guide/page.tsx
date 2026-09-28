import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "購物說明",
  description: "如何瀏覽商品、加入購物車與完成預覽結帳。",
};

export default function GuidePage() {
  return (
    <InfoLayout title="購物說明" description="目前是可預覽的購物流程，不會產生正式訂單。">
      <p>選擇商品後可調整數量、加入購物車或立即前往結帳。購物車會保存在這台裝置。</p>
      <p>結帳依序填寫購買人、配送、付款方式、發票與通知方式。確認後只會建立預覽訂單。</p>
      <p>正式的購物條款、運費與發票規則：待補正式資料。</p>
    </InfoLayout>
  );
}
