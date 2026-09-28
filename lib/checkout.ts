import { invoiceProvider } from "@/services/invoice/provider";
import { notificationProvider } from "@/services/notification/provider";
import { paymentProvider } from "@/services/payment/provider";
import { shippingProvider } from "@/services/shipping/provider";
import type { InvoiceType, Order, OrderNotification, PaymentMethod, ShippingMethod } from "@/types/commerce";

export type CheckoutLine = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

export type CheckoutSubmission = {
  buyerName: string;
  email: string;
  phone?: string;
  shippingMethod: ShippingMethod;
  addressSummary: string;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
  carrier?: string;
  donationCode?: string;
  taxId?: string;
  notification: OrderNotification;
  note?: string;
  lines: CheckoutLine[];
};

export async function placeOrder(input: CheckoutSubmission): Promise<Order> {
  const subtotal = input.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const id = `HTC${Date.now().toString(36).toUpperCase()}`;
  const quote = await shippingProvider.quote({ method: input.shippingMethod, subtotal });
  const total = subtotal + quote.fee;
  const payment = await paymentProvider.createPayment({
    orderId: id,
    amount: total,
    method: input.paymentMethod,
  });
  const invoice = await invoiceProvider.issue({
    orderId: id,
    amount: total,
    buyerName: input.buyerName,
    email: input.email,
    invoiceType: input.invoiceType,
    carrier: input.carrier,
    donationCode: input.donationCode,
    taxId: input.taxId,
  });
  await shippingProvider.createShipment(id);

  const payload = { orderId: id, total: String(total), email: input.email };
  await notificationProvider.notifyAdmin("order.created", payload);
  if (input.notification.email) {
    await notificationProvider.notifyCustomer("email", "order.created", payload);
  }
  if (input.notification.line) {
    await notificationProvider.notifyCustomer("line", "order.created", payload);
  }
  if (input.notification.telegram) {
    await notificationProvider.notifyCustomer("telegram", "order.created", payload);
  }

  return {
    id,
    createdAt: new Date().toISOString(),
    items: input.lines,
    buyerName: input.buyerName,
    email: input.email,
    phone: input.phone,
    shippingMethod: input.shippingMethod,
    shippingLabel: quote.label,
    shippingFee: quote.fee,
    addressSummary: input.addressSummary,
    paymentMethod: input.paymentMethod,
    paymentId: payment.id,
    invoiceType: input.invoiceType,
    invoiceId: invoice.id,
    subtotal,
    total,
    status: "created",
    notification: input.notification,
    note: input.note,
  };
}
