"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { paymentMethods } from "@/data/site";
import { placeOrder } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { previewShippingFee } from "@/services/shipping/provider";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { usePreferenceStore } from "@/store/preference-store";
import type { InvoiceType, PaymentMethod, ShippingMethod } from "@/types/commerce";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type InputHTMLAttributes } from "react";

const steps = ["購買人", "配送", "付款", "發票", "確認"] as const;

type Draft = {
  buyerName: string;
  email: string;
  phone: string;
  recipient: string;
  recipientPhone: string;
  shippingMethod: ShippingMethod;
  city: string;
  district: string;
  address: string;
  cvsStore: string;
  note: string;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
  carrier: string;
  donationCode: string;
  taxId: string;
  notifyEmail: boolean;
  notifyLine: boolean;
  notifyTelegram: boolean;
  lineId: string;
  telegramId: string;
};

const initialDraft: Draft = {
  buyerName: "",
  email: "",
  phone: "",
  recipient: "",
  recipientPhone: "",
  shippingMethod: "home",
  city: "",
  district: "",
  address: "",
  cvsStore: "",
  note: "",
  paymentMethod: "credit-card",
  invoiceType: "personal",
  carrier: "",
  donationCode: "",
  taxId: "",
  notifyEmail: true,
  notifyLine: false,
  notifyTelegram: false,
  lineId: "",
  telegramId: "",
};

function Field({
  id,
  label,
  hint,
  ...props
}: { id: string; label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm">
        {label}
      </label>
      <input id={id} className="w-full border border-line bg-cream px-3 py-3 text-sm outline-none" {...props} />
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function CheckoutFlow() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const addOrder = useOrderStore((state) => state.add);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void Promise.resolve(usePreferenceStore.persist.rehydrate()).then(() => {
      const prefs = usePreferenceStore.getState();
      setDraft((current) => ({
        ...current,
        notifyEmail: prefs.customer.email,
        notifyLine: prefs.customer.line,
        notifyTelegram: prefs.customer.telegram,
      }));
      setReady(true);
    });
  }, []);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId);
          if (!product || product.stock <= 0) return null;
          return {
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.images[0],
            unitPrice: product.price,
            quantity: Math.min(item.quantity, product.stock),
          };
        })
        .filter((line) => line !== null),
    [items],
  );

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const shipping = previewShippingFee(draft.shippingMethod, subtotal);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function validate(index: number) {
    if (index === 0) {
      if (!draft.buyerName.trim()) return "請填寫姓名。";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) return "請填寫有效的 Email。";
    }
    if (index === 1) {
      if (!draft.recipient.trim()) return "請填寫收件人。";
      if (draft.shippingMethod === "home" && (!draft.city.trim() || !draft.district.trim() || !draft.address.trim())) {
        return "宅配需要縣市、區與地址。";
      }
      if (draft.shippingMethod === "cvs" && !draft.cvsStore.trim()) return "請填寫超商門市。";
    }
    if (index === 3 && draft.invoiceType === "company" && !/^\d{8}$/.test(draft.taxId)) {
      return "公司戶請填寫 8 碼統一編號。";
    }
    return "";
  }

  function next() {
    const message = validate(step);
    setError(message);
    if (!message) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit() {
    const message = [0, 1, 2, 3].map(validate).find(Boolean) ?? "";
    setError(message);
    if (message || lines.length === 0) return;
    setPending(true);
    try {
      const addressSummary =
        draft.shippingMethod === "home"
          ? `${draft.recipient}，${draft.city}${draft.district}${draft.address}`
          : `${draft.recipient}，超商 ${draft.cvsStore}`;
      const order = await placeOrder({
        buyerName: draft.buyerName.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim() || undefined,
        shippingMethod: draft.shippingMethod,
        addressSummary,
        paymentMethod: draft.paymentMethod,
        invoiceType: draft.invoiceType,
        carrier: draft.carrier.trim() || undefined,
        donationCode: draft.donationCode.trim() || undefined,
        taxId: draft.taxId.trim() || undefined,
        notification: {
          email: draft.notifyEmail,
          line: draft.notifyLine,
          telegram: draft.notifyTelegram,
          lineId: draft.lineId.trim() || undefined,
          telegramId: draft.telegramId.trim() || undefined,
        },
        note: draft.note.trim() || undefined,
        lines,
      });
      addOrder(order);
      clear();
      router.push(`/order?id=${order.id}`);
    } catch {
      setError("預覽訂單沒有建立成功，請再試一次。");
      setPending(false);
    }
  }

  if (!ready) return <p className="mt-10 text-sm text-muted">正在準備結帳。</p>;
  if (lines.length === 0) {
    return (
      <div className="mt-10">
        <p>購物車沒有可結帳的商品。</p>
        <ButtonLink href="/products" className="mt-6">
          返回商品
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <ol className="flex gap-3 overflow-x-auto lg:block lg:space-y-3" aria-label="結帳步驟">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              className={`text-left text-sm ${index === step ? "text-ink" : "text-muted"}`}
              aria-current={index === step ? "step" : undefined}
              onClick={() => {
                if (index < step) setStep(index);
              }}
            >
              0{index + 1} {label}
            </button>
          </li>
        ))}
      </ol>
      <div>
        <p className="border border-clay/30 bg-sand px-4 py-3 text-sm text-ink-soft">
          這是預覽結帳，不會扣款、不會開立發票，也不會送出通知。
        </p>
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (step === steps.length - 1) void submit();
            else next();
          }}
        >
          {step === 0 ? (
            <>
              <Field id="buyer-name" label="姓名" autoComplete="name" required value={draft.buyerName} onChange={(event) => update("buyerName", event.target.value)} />
              <Field id="buyer-email" label="Email" type="email" autoComplete="email" required value={draft.email} onChange={(event) => update("email", event.target.value)} />
              <Field id="buyer-phone" label="電話（選填）" autoComplete="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} />
            </>
          ) : null}
          {step === 1 ? (
            <>
              <fieldset>
                <legend className="mb-2 text-sm">配送方式</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["home", "宅配"],
                    ["cvs", "超商取貨"],
                  ].map(([id, label]) => (
                    <label key={id} className="flex items-center gap-2 border border-line px-3 py-3 text-sm">
                      <input type="radio" name="shipping" checked={draft.shippingMethod === id} onChange={() => update("shippingMethod", id as ShippingMethod)} />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="recipient" label="收件人" autoComplete="name" required value={draft.recipient} onChange={(event) => update("recipient", event.target.value)} />
              <Field id="recipient-phone" label="收件電話（選填）" autoComplete="tel" value={draft.recipientPhone} onChange={(event) => update("recipientPhone", event.target.value)} />
              {draft.shippingMethod === "home" ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="city" label="縣市" required value={draft.city} onChange={(event) => update("city", event.target.value)} />
                    <Field id="district" label="區" required value={draft.district} onChange={(event) => update("district", event.target.value)} />
                  </div>
                  <Field id="address" label="地址" autoComplete="street-address" required value={draft.address} onChange={(event) => update("address", event.target.value)} />
                </>
              ) : (
                <Field id="cvs" label="超商門市" required value={draft.cvsStore} onChange={(event) => update("cvsStore", event.target.value)} hint="門市選擇器將於物流串接後提供。" />
              )}
              <Field id="note" label="備註（選填）" value={draft.note} onChange={(event) => update("note", event.target.value)} />
            </>
          ) : null}
          {step === 2 ? (
            <fieldset className="space-y-3">
              <legend className="mb-2 text-sm">付款方式</legend>
              {paymentMethods.map((method) => (
                <label key={method.id} className="block border border-line px-4 py-3">
                  <span className="flex items-center gap-2 text-sm">
                    <input type="radio" name="payment" checked={draft.paymentMethod === method.id} onChange={() => update("paymentMethod", method.id)} />
                    {method.label}
                  </span>
                  <span className="mt-1 block pl-6 text-xs text-muted">{method.note}</span>
                </label>
              ))}
            </fieldset>
          ) : null}
          {step === 3 ? (
            <>
              <fieldset className="space-y-3">
                <legend className="mb-2 text-sm">發票</legend>
                {[
                  ["personal", "個人電子發票"],
                  ["carrier", "手機條碼"],
                  ["donation", "捐贈"],
                  ["company", "公司戶"],
                ].map(([id, label]) => (
                  <label key={id} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="invoice" checked={draft.invoiceType === id} onChange={() => update("invoiceType", id as InvoiceType)} />
                    {label}
                  </label>
                ))}
              </fieldset>
              {draft.invoiceType === "carrier" ? (
                <Field id="carrier" label="手機條碼（選填）" value={draft.carrier} onChange={(event) => update("carrier", event.target.value)} />
              ) : null}
              {draft.invoiceType === "donation" ? (
                <Field id="donation" label="捐贈碼（選填）" value={draft.donationCode} onChange={(event) => update("donationCode", event.target.value)} />
              ) : null}
              {draft.invoiceType === "company" ? (
                <Field id="tax-id" label="統一編號" inputMode="numeric" required value={draft.taxId} onChange={(event) => update("taxId", event.target.value)} />
              ) : null}
              <p className="text-xs text-muted">發票由 InvoiceProvider 預留，未來可接綠界電子發票。退貨時可呼叫作廢，並可匯出雙月資料。</p>
            </>
          ) : null}
          {step === 4 ? (
            <div className="space-y-4 text-sm">
              <p>{draft.buyerName}／{draft.email}</p>
              <p>{draft.shippingMethod === "home" ? `${draft.city}${draft.district}${draft.address}` : `超商 ${draft.cvsStore}`}</p>
              <p>付款：{paymentMethods.find((method) => method.id === draft.paymentMethod)?.label}</p>
              <ul className="divide-y divide-line">
                {lines.map((line) => (
                  <li key={line.productId} className="flex justify-between py-2">
                    <span>{line.name} × {line.quantity}</span>
                    <span>{formatPrice(line.unitPrice * line.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="flex justify-between"><span>{shipping.label}</span><span>{formatPrice(shipping.fee)}</span></p>
              <p className="flex justify-between font-serif text-2xl"><span>合計</span><span>{formatPrice(subtotal + shipping.fee)}</span></p>
              <fieldset className="space-y-2">
                <legend className="text-sm">訂單通知方式</legend>
                <label className="flex gap-2"><input type="checkbox" checked={draft.notifyEmail} onChange={(event) => update("notifyEmail", event.target.checked)} />Email</label>
                <label className="flex gap-2"><input type="checkbox" checked={draft.notifyLine} onChange={(event) => update("notifyLine", event.target.checked)} />LINE</label>
                {draft.notifyLine ? <Field id="line-id" label="LINE ID（選填）" value={draft.lineId} onChange={(event) => update("lineId", event.target.value)} /> : null}
                <label className="flex gap-2"><input type="checkbox" checked={draft.notifyTelegram} onChange={(event) => update("notifyTelegram", event.target.checked)} />Telegram</label>
                {draft.notifyTelegram ? <Field id="telegram-id" label="Telegram（選填）" value={draft.telegramId} onChange={(event) => update("telegramId", event.target.value)} /> : null}
              </fieldset>
            </div>
          ) : null}
          {error ? <p role="alert" className="text-sm text-clay">{error}</p> : null}
          <div className="flex gap-3">
            {step > 0 ? (
              <Button type="button" variant="secondary" onClick={() => setStep((current) => current - 1)}>
                上一步
              </Button>
            ) : null}
            <Button type="submit" disabled={pending}>
              {step === steps.length - 1 ? (pending ? "建立預覽訂單" : "確認預覽訂單") : "下一步"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
