import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "使用條款",
  description: "弘泰科技網站的使用說明。正式條款待補。",
};

export default function TermsPage() {
  return (
    <InfoLayout title="使用條款" description="以下為架構用說明，正式使用條款待補。">
      <p>本網站 Phase 01 的商品、價格、庫存與文章皆為示範內容，不能視為要約。預覽結帳不會成立正式買賣契約。</p>
      <p>空間服務頁面是諮詢入口，不代表已承接特定工程。</p>
      <p>管轄與正式契約文本：待補正式資料。</p>
    </InfoLayout>
  );
}
