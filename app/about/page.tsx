import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於弘泰",
  description: "弘泰科技是品牌官網、生活選品與空間服務的入口。",
};

export default function AboutPage() {
  return (
    <InfoLayout title="關於弘泰" description="品牌官網、生活選品電商，以及居家空間與工程服務的入口。">
      <p>網站初期以高質感生活用品、居家用品，以及已授權的代理或經銷商品為主要內容。空間服務先以諮詢入口呈現，之後再擴充個案與報價。</p>
      <p>架構預留了 Marketplace、會員、B2B 詢價、AI 客服、金流、電子發票與物流。Phase 01 先把可以預覽的前台完成。</p>
      <p>公司登記名稱、地址、統編與聯絡電話：待補正式資料。</p>
    </InfoLayout>
  );
}
