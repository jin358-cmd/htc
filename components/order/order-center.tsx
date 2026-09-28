"use client";

import { NotificationSettings } from "@/components/forms/notification-settings";
import { formatPrice } from "@/lib/format";
import { shippingProvider, type Shipment } from "@/services/shipping/provider";
import { useOrderStore } from "@/store/order-store";
import { useEffect, useState } from "react";

const timeline = ["訂單成立", "完成付款", "出貨", "配送", "完成訂單"];

export function OrderCenter({ initialId }: { initialId?: string }) {
  const orders = useOrderStore((state) => state.orders);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState(initialId ?? "");
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    void Promise.resolve(useOrderStore.persist.rehydrate()).then(() => setReady(true));
  }, []);

  const order = orders.find((item) => item.id === query.trim());

  useEffect(() => {
    if (!order) return;
    let ignore = false;
    void shippingProvider.getTracking(order.id).then((result) => {
      if (!ignore) setShipment(result);
    });
    return () => {
      ignore = true;
    };
  }, [order]);

  if (!ready) return <p className="mt-8 text-sm text-muted">正在讀取這台裝置上的訂單。</p>;

  return (
    <div className="mt-8 space-y-10">
      <form
        className="flex max-w-xl flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(query.trim());
        }}
      >
        <div className="flex-1">
          <label htmlFor="order-id" className="mb-2 block text-sm">訂單編號</label>
          <input id="order-id" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full border border-line bg-cream px-3 py-3 text-sm" />
        </div>
        <button type="submit" className="self-end bg-moss px-5 py-3 text-sm text-cream">查詢</button>
      </form>
      {query && !order ? <p className="text-sm text-ink-soft">這台裝置找不到這筆預覽訂單。</p> : null}
      {order ? (
        <article className="border border-line bg-cream p-5">
          <p className="text-xs tracking-[0.16em] text-moss">{order.id}</p>
          <h2 className="mt-2 font-serif text-3xl">訂單成立</h2>
          <p className="mt-2 text-sm text-muted">{new Date(order.createdAt).toLocaleString("zh-TW")}</p>
          <ol className="mt-6 grid gap-2 sm:grid-cols-5">
            {timeline.map((label, index) => (
              <li key={label} className={`border px-3 py-3 text-sm ${index === 0 ? "border-moss text-ink" : "border-line text-muted"}`}>
                {label}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ink-soft">{shipment?.message ?? "正在讀取物流狀態。"}</p>
          <ul className="mt-6 divide-y divide-line text-sm">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between py-2">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">{order.addressSummary}</p>
          <p className="mt-2 text-sm">{order.shippingLabel} {formatPrice(order.shippingFee)}</p>
          <p className="mt-4 font-serif text-2xl">合計 {formatPrice(order.total)}</p>
          <p className="mt-3 text-xs text-muted">付款參考 {order.paymentId}／發票參考 {order.invoiceId}。兩者都尚未送出正式服務。</p>
        </article>
      ) : null}
      {orders.length > 0 ? (
        <div>
          <h2 className="font-serif text-2xl">這台裝置的預覽訂單</h2>
          <ul className="mt-4 divide-y divide-line">
            {orders.map((item) => (
              <li key={item.id}>
                <button type="button" className="flex w-full justify-between py-3 text-left text-sm" onClick={() => setQuery(item.id)}>
                  <span>{item.id}</span>
                  <span>{formatPrice(item.total)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-ink-soft">還沒有預覽訂單。完成結帳流程後，編號會留在這台裝置。</p>
      )}
      <NotificationSettings />
    </div>
  );
}
