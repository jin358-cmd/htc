"use client";

import { usePreferenceStore } from "@/store/preference-store";
import type { AdminChannel } from "@/types/commerce";
import { useEffect, useState } from "react";

const adminOptions: Array<{ id: AdminChannel; label: string }> = [
  { id: "telegram", label: "Telegram" },
  { id: "line", label: "LINE" },
  { id: "email", label: "Email" },
  { id: "web-push", label: "Web Push" },
];

export function NotificationSettings() {
  const prefs = usePreferenceStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void Promise.resolve(usePreferenceStore.persist.rehydrate()).then(() => setReady(true));
  }, []);

  if (!ready) return <p className="text-sm text-muted">正在讀取通知設定。</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="border border-line bg-cream p-5">
        <h2 className="font-serif text-2xl">訂購者通知</h2>
        <p className="mt-2 text-sm text-ink-soft">選擇之後希望收到訂單成立、付款、出貨、配送與到貨的方式。此設定只存在這台裝置。</p>
        <div className="mt-4 space-y-2 text-sm">
          {(["email", "line", "telegram"] as const).map((channel) => (
            <label key={channel} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={prefs.customer[channel]}
                onChange={(event) => prefs.setCustomer(channel, event.target.checked)}
              />
              {channel === "email" ? "Email" : channel === "line" ? "LINE" : "Telegram"}
            </label>
          ))}
        </div>
      </section>
      <section className="border border-line bg-cream p-5">
        <h2 className="font-serif text-2xl">管理者通知預留</h2>
        <p className="mt-2 text-sm text-ink-soft">新訂單、付款、出貨、配送與完成時通知管理者。尚未連接任何通訊服務。</p>
        <div className="mt-4 space-y-2 text-sm">
          {adminOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={prefs.adminChannels[option.id]}
                onChange={(event) => prefs.setAdminChannel(option.id, event.target.checked)}
              />
              {option.label}
            </label>
          ))}
        </div>
        <fieldset className="mt-5">
          <legend className="text-sm">通知音</legend>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="radio" name="sound" checked={prefs.sound === "default"} onChange={() => prefs.setSound("default")} />
            預設提示音（音檔待補）
          </label>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="radio" name="sound" checked={prefs.sound === "off"} onChange={() => prefs.setSound("off")} />
            關閉
          </label>
        </fieldset>
      </section>
    </div>
  );
}
