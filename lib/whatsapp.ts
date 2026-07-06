import { formatCurrency, formatBillingPeriod, ordinal } from "./format";

export interface ReminderContext {
  name: string;
  rentAmount: number;
  billingPeriod: string; // MM-YYYY
  rentDueDay: number;
}

/** Builds the rent-reminder template message. */
export function buildReminderMessage(ctx: ReminderContext): string {
  return (
    `Hello ${ctx.name}, your rent of ${formatCurrency(ctx.rentAmount)} ` +
    `for ${formatBillingPeriod(ctx.billingPeriod)} is due. ` +
    `Please pay by the ${ordinal(ctx.rentDueDay)} to avoid late fees. ` +
    `Thank you! — Home Rentals`
  );
}

/**
 * Builds a wa.me deep link that opens WhatsApp (web or app) with the
 * message pre-filled. Option A of the notification spec — no backend
 * required, works immediately without a database.
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const normalized = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
