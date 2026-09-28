"use client";

import { invoiceProvider } from "@/services/invoice/provider";
import { useState } from "react";

export function InvoiceTools() {
  const [note, setNote] = useState("");

  return (
    <section className="mt-8 border border-line bg-cream p-5">
      <h2 className="font-serif text-2xl">發票資料預留</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        完成交易後可開立電子發票，退貨或取消時可作廢。雙月交易與發票匯出已留接口，目前只會產生空的 CSV 範本。
      </p>
      <button
        type="button"
        className="mt-4 border border-ink/20 px-4 py-2 text-sm"
        onClick={() => {
          void invoiceProvider.exportBimonthly({ year: new Date().getFullYear(), startMonth: 1 }).then(async (result) => {
            const voided = await invoiceProvider.voidInvoice("preview", "phase-01");
            setNote(`${result.filename}：${result.note} ${voided.message}`);
          });
        }}
      >
        產生雙月匯出範本
      </button>
      {note ? <p className="mt-3 text-sm text-ink-soft">{note}</p> : null}
    </section>
  );
}
