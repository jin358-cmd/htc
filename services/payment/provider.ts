import type { PaymentMethod } from "@/types/commerce";

export type CreatePaymentInput = {
  orderId: string;
  amount: number;
  method: PaymentMethod;
};

export type PaymentIntent = {
  id: string;
  status: "placeholder";
  provider: string;
  message: string;
};

export interface PaymentProvider {
  id: string;
  createPayment(input: CreatePaymentInput): Promise<PaymentIntent>;
}

const providerHint: Record<PaymentMethod, string> = {
  "credit-card": "ecpay-or-newebpay",
  "third-party": "ecpay-or-newebpay",
  atm: "bank-transfer",
  cvs: "cvs-code",
};

export const paymentProvider: PaymentProvider = {
  id: "placeholder",
  async createPayment(input) {
    return {
      id: `pay_preview_${input.orderId}`,
      status: "placeholder",
      provider: providerHint[input.method],
      message: "Phase 01 不會向金流服務送出交易，也不收集卡號。",
    };
  },
};
