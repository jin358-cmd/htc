export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  stock: number;
  sku: string;
  featured: boolean;
  tags: string[];
  specs: ProductSpec[];
};

export type CategoryNode = {
  slug: string;
  name: string;
  description: string;
  href?: string;
  children?: CategoryNode[];
};

export type Brand = {
  slug: string;
  name: string;
  description: string;
};

export type PaymentMethod = "credit-card" | "atm" | "cvs" | "third-party";

export type ShippingMethod = "home" | "cvs";

export type InvoiceType = "personal" | "carrier" | "donation" | "company";

export type CustomerChannel = "email" | "line" | "telegram";

export type AdminChannel = "telegram" | "line" | "email" | "web-push";

export type NotificationEvent =
  | "order.created"
  | "order.paid"
  | "order.shipped"
  | "order.delivering"
  | "order.completed";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderStatus = "created" | "paid" | "shipped" | "delivering" | "completed";

export type OrderNotification = {
  email: boolean;
  line: boolean;
  telegram: boolean;
  lineId?: string;
  telegramId?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: Array<{
    productId: string;
    name: string;
    slug: string;
    image: string;
    unitPrice: number;
    quantity: number;
  }>;
  buyerName: string;
  email: string;
  phone?: string;
  shippingMethod: ShippingMethod;
  shippingLabel: string;
  shippingFee: number;
  addressSummary: string;
  paymentMethod: PaymentMethod;
  paymentId: string;
  invoiceType: InvoiceType;
  invoiceId: string;
  subtotal: number;
  total: number;
  status: OrderStatus;
  notification: OrderNotification;
  note?: string;
};

export type InquiryTopic =
  | "product"
  | "order"
  | "interior"
  | "renovation"
  | "construction"
  | "business"
  | "other";
