import type { InquiryTopic } from "@/types/commerce";

export const site = {
  name: "弘泰科技",
  nameEn: "Hong Tai",
  title: "弘泰科技｜讓生活，多一點選擇",
  description: "從日常用品到空間體驗，找到真正適合生活的好物。弘泰科技提供生活選品、居家用品與空間服務入口。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const mainNav = [
  { href: "/", label: "首頁" },
  { href: "/products", label: "商品" },
  { href: "/categories/curated", label: "居家生活" },
  { href: "/brands", label: "品牌專區" },
  { href: "/services", label: "空間服務" },
  { href: "/news", label: "最新消息" },
  { href: "/about", label: "關於弘泰" },
] as const;

export const footerExplore = [
  { href: "/about", label: "關於我們" },
  { href: "/products", label: "商品" },
  { href: "/brands", label: "品牌專區" },
  { href: "/services", label: "空間服務" },
  { href: "/news", label: "最新消息" },
  { href: "/contact", label: "聯絡我們" },
] as const;

export const footerHelp = [
  { href: "/guide", label: "購物說明" },
  { href: "/shipping", label: "配送說明" },
  { href: "/returns", label: "退換貨" },
  { href: "/order", label: "訂單查詢" },
  { href: "/privacy", label: "隱私權政策" },
  { href: "/terms", label: "使用條款" },
] as const;

export const inquiryTopics: Array<{ value: InquiryTopic; label: string }> = [
  { value: "product", label: "商品諮詢" },
  { value: "order", label: "訂單問題" },
  { value: "interior", label: "空間設計" },
  { value: "renovation", label: "室內裝修" },
  { value: "construction", label: "工程施工" },
  { value: "business", label: "商業合作" },
  { value: "other", label: "其他" },
];

export const paymentMethods = [
  { id: "credit-card" as const, label: "信用卡", note: "預留綠界 ECPay／藍新 NewebPay，本站不收集卡號。" },
  { id: "atm" as const, label: "ATM 轉帳", note: "預留虛擬帳號付款。" },
  { id: "cvs" as const, label: "超商代碼", note: "預留下單代碼繳費。" },
  { id: "third-party" as const, label: "第三方支付", note: "預留綠界／藍新等第三方支付。" },
];

export const serviceItems = [
  {
    id: "interior",
    title: "室內設計",
    text: "從動線、採光到材質，整理一個可以長久居住的空間輪廓。",
  },
  {
    id: "renovation",
    title: "室內裝修",
    text: "針對既有居家進行修繕與更新，讓使用方式回到生活本身。",
  },
  {
    id: "construction",
    title: "工程施工",
    text: "工程與施作窗口，適合需要進一步討論工期與範圍的專案。",
  },
  {
    id: "consult",
    title: "空間諮詢",
    text: "還不確定要從哪裡開始時，先用一次諮詢釐清需求。",
  },
] as const;
