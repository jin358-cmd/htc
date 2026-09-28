import { InfoLayout } from "@/components/content/info-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "退換貨",
  description: "退換貨與發票作廢的預留說明。",
};

export default function ReturnsPage() {
  return (
    <InfoLayout title="退換貨" description="正式退換貨天數與寄回地址待補。">
      <p>未來完成退貨或取消訂單時，系統可對已開立的電子發票執行作廢。Phase 01 只保留這個接口，沒有正式發票。</p>
      <p>退貨地址、運費負擔與鑑賞期：待補正式資料。</p>
    </InfoLayout>
  );
}
