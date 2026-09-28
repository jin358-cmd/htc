import type { AdminChannel, CustomerChannel, NotificationEvent } from "@/types/commerce";

export type NotificationResult = {
  delivered: false;
  channel: AdminChannel | CustomerChannel | "admin";
  event: NotificationEvent;
  reason: string;
};

export interface NotificationProvider {
  id: string;
  notifyAdmin(event: NotificationEvent, payload: Record<string, string>): Promise<NotificationResult>;
  notifyCustomer(
    channel: CustomerChannel,
    event: NotificationEvent,
    payload: Record<string, string>,
  ): Promise<NotificationResult>;
}

export const notificationProvider: NotificationProvider = {
  id: "placeholder",
  async notifyAdmin(event) {
    return {
      delivered: false,
      channel: "admin",
      event,
      reason: "Telegram、LINE、Email 與 Web Push 尚未連接。",
    };
  },
  async notifyCustomer(channel, event) {
    return {
      delivered: false,
      channel,
      event,
      reason: "訂購者通知尚未連接，這次不會送出訊息。",
    };
  },
};
