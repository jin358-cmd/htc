import type { ShippingMethod } from "@/types/commerce";

export type ShippingQuote = {
  fee: number;
  label: string;
};

export type Shipment = {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  trackingNumber?: string;
  message: string;
};

export interface ShippingProvider {
  id: string;
  quote(input: { method: ShippingMethod; subtotal: number }): Promise<ShippingQuote>;
  createShipment(orderId: string): Promise<Shipment>;
  getTracking(orderId: string): Promise<Shipment>;
}

export function previewShippingFee(method: ShippingMethod, subtotal: number): ShippingQuote {
  if (method === "cvs") {
    return { fee: 60, label: "超商取貨（預覽運費）" };
  }
  if (subtotal >= 2000) {
    return { fee: 0, label: "宅配（滿額免運，預覽）" };
  }
  return { fee: 120, label: "宅配（預覽運費）" };
}

export const shippingProvider: ShippingProvider = {
  id: "placeholder",
  async quote(input) {
    return previewShippingFee(input.method, input.subtotal);
  },
  async createShipment(orderId) {
    return {
      id: `ship_preview_${orderId}`,
      status: "pending",
      message: "物流尚未串接，沒有建立正式托運單。",
    };
  },
  async getTracking(orderId) {
    return {
      id: `ship_preview_${orderId}`,
      status: "pending",
      message: "尚無配送單號。出貨後才會顯示物流狀態。",
    };
  },
};
