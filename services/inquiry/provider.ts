import type { InquiryTopic } from "@/types/commerce";

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  topic: InquiryTopic;
  message: string;
  attachmentName?: string;
};

export type InquiryReceipt = {
  id: string;
  status: "placeholder";
  message: string;
};

export interface InquiryProvider {
  id: string;
  submit(input: InquiryInput): Promise<InquiryReceipt>;
}

export const inquiryProvider: InquiryProvider = {
  id: "placeholder",
  async submit() {
    return {
      id: `inq_preview_${Date.now().toString(36)}`,
      status: "placeholder",
      message: "諮詢已留在這個預覽流程，尚未送進正式客服系統，附件也不會上傳。",
    };
  },
};
