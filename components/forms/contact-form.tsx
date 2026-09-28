"use client";

import { Button } from "@/components/ui/button";
import { inquiryTopics } from "@/data/site";
import { inquiryProvider } from "@/services/inquiry/provider";
import type { InquiryTopic } from "@/types/commerce";
import { useState, type FormEvent } from "react";

const topicValues = new Set(inquiryTopics.map((topic) => topic.value));

export function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const [topic, setTopic] = useState<InquiryTopic>(topicValues.has(initialTopic as InquiryTopic) ? (initialTopic as InquiryTopic) : "product");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.trim().length < 5) {
      setError("請填寫姓名、有效 Email，以及至少幾個字的訊息。");
      return;
    }
    setError("");
    setPending(true);
    const result = await inquiryProvider.submit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      topic,
      message: message.trim(),
      attachmentName: fileName || undefined,
    });
    setReceipt(result.message);
    setPending(false);
  }

  if (receipt) {
    return (
      <p className="mt-8 border border-line bg-cream p-5 text-sm leading-relaxed" role="status">
        {receipt}
      </p>
    );
  }

  return (
    <form className="mt-8 max-w-xl space-y-5" onSubmit={(event) => void submit(event)}>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm">姓名</label>
        <input id="contact-name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full border border-line bg-cream px-3 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm">Email</label>
        <input id="contact-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full border border-line bg-cream px-3 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-2 block text-sm">電話（選填）</label>
        <input id="contact-phone" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full border border-line bg-cream px-3 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-2 block text-sm">需求類型</label>
        <select id="contact-topic" value={topic} onChange={(event) => setTopic(event.target.value as InquiryTopic)} className="w-full border border-line bg-cream px-3 py-3 text-sm">
          {inquiryTopics.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm">訊息</label>
        <textarea id="contact-message" required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} className="w-full border border-line bg-cream px-3 py-3 text-sm" />
      </div>
      <div>
        <label htmlFor="contact-file" className="mb-2 block text-sm">附件（選填）</label>
        <input
          id="contact-file"
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          className="block w-full text-sm"
        />
        <p className="mt-2 text-xs text-muted">Phase 01 只保留上傳介面，檔案不會被送出或儲存。</p>
      </div>
      {error ? <p role="alert" className="text-sm text-clay">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "送出中" : "送出諮詢"}</Button>
    </form>
  );
}
