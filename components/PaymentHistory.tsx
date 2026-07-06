import type { Payment } from "@/lib/types";
import { formatCurrency, formatBillingPeriod, formatDate } from "@/lib/format";
import { PaymentPill } from "./ui/StatusPill";
import { ReceiptButton } from "./ReceiptButton";

export function PaymentHistory({
  payments,
  tenantName,
}: {
  payments: Payment[];
  tenantName: string;
}) {
  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="text-base font-bold text-slate-900">Payment history</h2>
      <p className="text-xs text-slate-400">Every rent payment on your lease</p>

      <ol className="mt-5 space-y-1">
        {payments.map((p, i) => (
          <li key={p.id} className="relative flex items-center gap-4 pl-8">
            {/* timeline rail */}
            <span className="absolute left-[9px] top-0 h-full w-px bg-slate-200/70 first:top-1/2" />
            <span
              className={`absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white ${
                p.status === "paid" ? "bg-green-500" : "bg-amber-500"
              } shadow`}
            />
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-white/50 px-4 py-3 transition hover:bg-white/80">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatBillingPeriod(p.billing_period)}
                </p>
                <p className="text-xs text-slate-400">Paid {formatDate(p.payment_date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-sm font-bold text-slate-900 sm:block">
                  {formatCurrency(p.amount_paid)}
                </span>
                <PaymentPill status={p.status} />
                <ReceiptButton payment={p} tenantName={tenantName} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
