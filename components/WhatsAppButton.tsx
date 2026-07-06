"use client";

import { MessageCircle } from "lucide-react";
import { buildReminderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { CURRENT_PERIOD } from "@/lib/mock-data";

export function WhatsAppButton({
  name,
  phone,
  rentAmount,
  rentDueDay,
  label = "Send Reminder",
}: {
  name: string;
  phone: string;
  rentAmount: number;
  rentDueDay: number;
  label?: string;
}) {
  function handleClick() {
    const message = buildReminderMessage({
      name,
      rentAmount,
      rentDueDay,
      billingPeriod: CURRENT_PERIOD,
    });
    const url = buildWhatsAppLink(phone, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button onClick={handleClick} className="btn-whatsapp" title={`WhatsApp ${name}`}>
      <MessageCircle size={16} strokeWidth={2.4} />
      {label}
    </button>
  );
}
