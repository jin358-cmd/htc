# 弘泰科技官網｜HTC

弘泰科技官方網站暨電商平台。Phase 01 建立可預覽的品牌官網與電商前台，並預留金流、電子發票、物流與通知接口。

## 專案定位

品牌官網、生活選品電商，以及居家空間／工程服務入口。

## 本地開發

```bash
npm install
npm run dev
```

驗收：

```bash
npm run typecheck
npm run lint
npm run build
```

環境變數名稱見 `.env.example`。不要把真實 API 金鑰寫進版本庫。

## Phase 01 路線

- `/` 首頁
- `/products` 商品列表與搜尋
- `/products/[slug]` 商品詳細
- `/categories/[slug]` 分類
- `/brands` 與 `/brands/[slug]` 品牌專區
- `/cart` 購物車
- `/checkout` 結帳
- `/order` 訂單與物流
- `/contact` 諮詢
- `/services` 空間服務
- `/about` 關於弘泰
- `/news` 最新消息
- `/account` 帳戶與通知設定
- `/wishlist` 收藏
- `/guide` `/shipping` `/returns` `/privacy` `/terms`

## 整合預留

- `services/payment`：ECPay／NewebPay
- `services/invoice`：電子發票、作廢、雙月匯出
- `services/shipping`：運費與物流狀態
- `services/notification`：管理者與訂購者通知
- `services/search`：可替換的搜尋服務
- `services/inquiry`：諮詢表單

Phase 01 不串接正式金流、發票、物流、Telegram、LINE、WeChat 或正式資料庫。

## 狀態

Phase 01 前台基礎已建立。下一階段為電商 Backend、Supabase 與訂單資料模型。
