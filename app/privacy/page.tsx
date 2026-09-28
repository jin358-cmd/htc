import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "弘泰科技網站的隱私權說明。正式政策待補。",
};

export default function PrivacyPage() {
  return (
    <InfoLayout title="隱私權政策" description="以下為架構用說明，正式隱私權政策待補。">
      <p>結帳與諮詢表單會在瀏覽器中使用你輸入的姓名、Email，以及你選擇提供的電話或通知帳號。Phase 01 不會把這些資料送到外部服務。</p>
      <p>購物車、收藏、預覽訂單與通知偏好保存在這台裝置的 localStorage。清除網站資料後即消失。</p>
      <p>正式個資告知事項、保存期限與聯絡窗口：待補正式資料。</p>
    </InfoLayout>
  );
}
