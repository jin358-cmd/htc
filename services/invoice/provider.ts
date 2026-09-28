import type { InvoiceType } from "@/types/commerce";

export type IssueInvoiceInput = {
  orderId: string;
  amount: number;
  buyerName: string;
  email: string;
  invoiceType: InvoiceType;
  carrier?: string;
  donationCode?: string;
  taxId?: string;
};

export type InvoiceRecord = {
  id: string;
  status: "placeholder" | "void_placeholder";
  provider: string;
  message: string;
};

export type InvoiceExport = {
  filename: string;
  csv: string;
  note: string;
};

export interface InvoiceProvider {
  id: string;
  issue(input: IssueInvoiceInput): Promise<InvoiceRecord>;
  voidInvoice(invoiceId: string, reason: string): Promise<InvoiceRecord>;
  exportBimonthly(period: { year: number; startMonth: number }): Promise<InvoiceExport>;
}

export const invoiceProvider: InvoiceProvider = {
  id: "ecpay-invoice-placeholder",
  async issue(input) {
    return {
      id: `inv_preview_${input.orderId}`,
      status: "placeholder",
      provider: "ecpay-invoice",
      message: "電子發票尚未串接，這次不會開立發票。",
    };
  },
  async voidInvoice(invoiceId) {
    return {
      id: invoiceId,
      status: "void_placeholder",
      provider: "ecpay-invoice",
      message: "作廢接口已預留，Phase 01 沒有正式發票可作廢。",
    };
  },
  async exportBimonthly(period) {
    const month = String(period.startMonth).padStart(2, "0");
    return {
      filename: `invoices-${period.year}-${month}.csv`,
      csv: "invoice_id,order_id,amount,status\n",
      note: "雙月匯出為空範本。正式資料將於發票串接後產生。",
    };
  },
};
