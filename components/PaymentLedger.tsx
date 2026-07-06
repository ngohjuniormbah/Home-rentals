"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, AlertTriangle } from "lucide-react";
import type { PaymentStatus, TenantView } from "@/lib/types";
import { formatCurrency, ordinal } from "@/lib/format";
import { Avatar } from "./ui/Avatar";
import { WhatsAppButton } from "./WhatsAppButton";

const COLUMNS: {
  key: PaymentStatus;
  title: string;
  icon: typeof Check;
  ring: string;
  chip: string;
}[] = [
  { key: "paid", title: "Paid", icon: Check, ring: "ring-green-500/20", chip: "bg-green-500/15 text-green-700" },
  { key: "pending", title: "Pending", icon: Clock, ring: "ring-amber-400/25", chip: "bg-amber-400/15 text-amber-700" },
  { key: "late", title: "Overdue", icon: AlertTriangle, ring: "ring-rose-500/20", chip: "bg-rose-500/15 text-rose-700" },
];

export function PaymentLedger({ initial }: { initial: TenantView[] }) {
  const [rows, setRows] = useState(initial);

  const grouped = useMemo(() => {
    return {
      paid: rows.filter((r) => r.currentMonthStatus === "paid"),
      pending: rows.filter((r) => r.currentMonthStatus === "pending"),
      late: rows.filter((r) => r.currentMonthStatus === "late"),
    };
  }, [rows]);

  function markPaid(tenantId: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.tenantId === tenantId ? { ...r, currentMonthStatus: "paid" } : r,
      ),
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {COLUMNS.map((col) => {
        const items = grouped[col.key];
        return (
          <div key={col.key} className="glass rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`grid h-7 w-7 place-items-center rounded-xl ${col.chip}`}>
                  <col.icon size={15} strokeWidth={2.6} />
                </span>
                <h3 className="text-sm font-bold text-slate-800">{col.title}</h3>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${col.chip}`}>
                {items.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {items.length === 0 && (
                <p className="rounded-2xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
                  No tenants here
                </p>
              )}
              {items.map((t) => (
                <motion.div
                  layout
                  key={t.tenantId}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-2xl bg-white/70 p-3 ring-1 ${col.ring} transition hover:bg-white`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar seed={t.avatarSeed} size={38} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="truncate text-xs text-slate-400">
                        {t.propertyName} · {t.unitNumber}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(t.rentAmount)}
                    </p>
                  </div>

                  {col.key !== "paid" && (
                    <div className="mt-3 flex items-center gap-2">
                      <WhatsAppButton
                        name={t.name}
                        phone={t.whatsappNumber}
                        rentAmount={t.rentAmount}
                        rentDueDay={t.rentDueDay}
                        label="Remind"
                      />
                      <button
                        onClick={() => markPaid(t.tenantId)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-500/20 active:scale-95"
                      >
                        <Check size={15} strokeWidth={2.6} /> Mark paid
                      </button>
                    </div>
                  )}
                  {col.key === "paid" && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <Check size={13} strokeWidth={2.8} /> Received · due {ordinal(t.rentDueDay)}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
