import type { PaymentStatus, TenantStatus } from "@/lib/types";

const paymentStyles: Record<PaymentStatus, string> = {
  paid: "bg-green-500/15 text-green-700 border-green-500/25",
  pending: "bg-amber-400/15 text-amber-700 border-amber-400/30",
  late: "bg-rose-500/15 text-rose-700 border-rose-500/25",
};

const paymentLabel: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  late: "Overdue",
};

export function PaymentPill({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${paymentStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "paid"
            ? "bg-green-500"
            : status === "pending"
              ? "bg-amber-500"
              : "bg-rose-500"
        }`}
      />
      {paymentLabel[status]}
    </span>
  );
}

const tenantStyles: Record<TenantStatus, string> = {
  active: "bg-blue-500/12 text-blue-700 border-blue-500/25",
  evicted: "bg-slate-500/15 text-slate-600 border-slate-500/25",
  past_due: "bg-rose-500/15 text-rose-700 border-rose-500/25",
};

const tenantLabel: Record<TenantStatus, string> = {
  active: "Active lease",
  evicted: "Evicted",
  past_due: "Past due",
};

export function TenantStatusPill({ status }: { status: TenantStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tenantStyles[status]}`}
    >
      {tenantLabel[status]}
    </span>
  );
}
