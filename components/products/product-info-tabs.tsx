"use client";

import type { ProductSpec } from "@/types/commerce";
import { useState } from "react";

const tabs = [
  { id: "description", label: "商品說明" },
  { id: "shipping", label: "配送資訊" },
  { id: "payment", label: "付款方式" },
  { id: "returns", label: "退換貨說明" },
] as const;

export function ProductInfoTabs({ description, specs }: { description: string; specs: ProductSpec[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("description");

  return (
    <div className="mt-16">
      <div
        role="tablist"
        aria-label="商品資訊"
        className="flex gap-2 overflow-x-auto border-b border-line"
        onKeyDown={(event) => {
          const index = tabs.findIndex((tab) => tab.id === active);
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          event.preventDefault();
          const next = event.key === "ArrowRight" ? tabs[(index + 1) % tabs.length] : tabs[(index - 1 + tabs.length) % tabs.length];
          setActive(next.id);
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`shrink-0 px-4 py-3 text-sm ${active === tab.id ? "border-b-2 border-moss text-ink" : "text-muted"}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="max-w-3xl py-6 text-sm leading-relaxed text-ink-soft">
        <div role="tabpanel" id="panel-description" aria-labelledby="tab-description" hidden={active !== "description"}>
          <p>{description}</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {specs.map((item) => (
              <div key={item.label} className="border border-line bg-cream p-4">
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="mt-2 text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div role="tabpanel" id="panel-shipping" aria-labelledby="tab-shipping" hidden={active !== "shipping"}>
          <p>預覽運費：宅配未滿額 120 元，滿 2,000 元免運；超商取貨 60 元。正式物流費率與配送範圍待補。</p>
        </div>
        <div role="tabpanel" id="panel-payment" aria-labelledby="tab-payment" hidden={active !== "payment"}>
          <p>結帳頁提供信用卡、ATM、超商代碼與第三方支付的介面。Phase 01 不串接綠界或藍新，也不收集卡號。</p>
        </div>
        <div role="tabpanel" id="panel-returns" aria-labelledby="tab-returns" hidden={active !== "returns"}>
          <p>退換貨天數、寄回地址與發票作廢流程待補正式資料。介面上已保留退貨時作廢發票的位置。</p>
        </div>
      </div>
    </div>
  );
}
