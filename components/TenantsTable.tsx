import type { TenantView } from "@/lib/types";
import { formatCurrency, formatDate, ordinal } from "@/lib/format";
import { Avatar } from "./ui/Avatar";
import { PaymentPill, TenantStatusPill } from "./ui/StatusPill";
import { WhatsAppButton } from "./WhatsAppButton";

export function TenantsTable({ tenants }: { tenants: TenantView[] }) {
  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="hidden grid-cols-12 gap-4 border-b border-white/50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
        <div className="col-span-4">Tenant</div>
        <div className="col-span-2">Rent</div>
        <div className="col-span-2">Due date</div>
        <div className="col-span-2">This month</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      <div className="divide-y divide-white/40">
        {tenants.map((t) => (
          <div
            key={t.tenantId}
            className="grid grid-cols-1 gap-4 px-6 py-4 transition hover:bg-white/50 md:grid-cols-12 md:items-center"
          >
            <div className="col-span-4 flex items-center gap-3">
              <Avatar seed={t.avatarSeed} size={44} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{t.name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="truncate text-xs text-slate-400">
                    {t.propertyName} · {t.unitNumber}
                  </span>
                  <TenantStatusPill status={t.status} />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <p className="font-semibold text-slate-900">{formatCurrency(t.rentAmount)}</p>
              <p className="text-xs text-slate-400 md:hidden">
                since {formatDate(t.leaseStart)}
              </p>
            </div>

            <div className="col-span-2 text-sm text-slate-600">
              {ordinal(t.rentDueDay)} monthly
            </div>

            <div className="col-span-2">
              <PaymentPill status={t.currentMonthStatus} />
            </div>

            <div className="col-span-2 flex md:justify-end">
              {t.currentMonthStatus === "paid" ? (
                <span className="text-sm font-medium text-slate-300">—</span>
              ) : (
                <WhatsAppButton
                  name={t.name}
                  phone={t.whatsappNumber}
                  rentAmount={t.rentAmount}
                  rentDueDay={t.rentDueDay}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
