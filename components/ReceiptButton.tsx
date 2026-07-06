"use client";

import { Download } from "lucide-react";
import type { Payment } from "@/lib/types";
import { formatCurrency, formatBillingPeriod, formatDate } from "@/lib/format";

export function ReceiptButton({
  payment,
  tenantName,
}: {
  payment: Payment;
  tenantName: string;
}) {
  function download() {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${payment.billing_period}</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;color:#0f172a;max-width:560px;margin:40px auto;padding:0 24px}
  .card{border:1px solid #e2e8f0;border-radius:24px;padding:32px;box-shadow:0 8px 32px rgba(31,38,135,.08)}
  .brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px}
  .dot{width:36px;height:36px;border-radius:12px;background:linear-gradient(120deg,#2563eb,#22d3ee)}
  h1{font-size:15px;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin:28px 0 4px}
  .amt{font-size:36px;font-weight:800;margin:0}
  table{width:100%;border-collapse:collapse;margin-top:24px}
  td{padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px}
  td:last-child{text-align:right;font-weight:600}
  .paid{display:inline-block;background:rgba(34,197,94,.15);color:#15803d;font-weight:700;padding:6px 14px;border-radius:999px;font-size:13px}
</style></head><body>
  <div class="card">
    <div class="brand"><span class="dot"></span> Home Rentals</div>
    <h1>Payment Receipt</h1>
    <p class="amt">${formatCurrency(payment.amount_paid)}</p>
    <p class="paid">PAID</p>
    <table>
      <tr><td>Tenant</td><td>${tenantName}</td></tr>
      <tr><td>Billing period</td><td>${formatBillingPeriod(payment.billing_period)}</td></tr>
      <tr><td>Payment date</td><td>${formatDate(payment.payment_date)}</td></tr>
      <tr><td>Receipt no.</td><td>${payment.id.toUpperCase()}</td></tr>
    </table>
    <p style="margin-top:28px;color:#94a3b8;font-size:12px">Thank you for your payment. — Home Rentals</p>
  </div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${payment.billing_period}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-blue-600"
    >
      <Download size={14} /> Receipt
    </button>
  );
}
