"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CalendarClock, AlertTriangle } from "lucide-react";
import type { PaymentStatus } from "@/lib/types";
import { formatCurrency, ordinal, daysUntilDue } from "@/lib/format";

export function RentStatusBanner({
  status,
  rentAmount,
  rentDueDay,
}: {
  status: PaymentStatus;
  rentAmount: number;
  rentDueDay: number;
}) {
  const days = daysUntilDue(rentDueDay);
  const isPaid = status === "paid";
  const isLate = status === "late" || days < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong relative overflow-hidden rounded-4xl p-7"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${
          isPaid ? "bg-green-400/40" : isLate ? "bg-rose-400/40" : "bg-blue-500/30"
        }`}
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Rent for this month</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            {formatCurrency(rentAmount)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Due on the {ordinal(rentDueDay)} of every month
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          {isPaid ? (
            <span className="inline-flex animate-pulse-ring items-center gap-2 rounded-2xl bg-green-500/15 px-4 py-2.5 font-bold text-green-700 shadow-glow-green">
              <CheckCircle2 size={20} /> Paid — you’re all set
            </span>
          ) : isLate ? (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-rose-500/15 px-4 py-2.5 font-bold text-rose-700">
              <AlertTriangle size={20} /> Overdue by {Math.abs(days)} days
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl bg-blue-600/12 px-4 py-2.5 font-bold text-blue-700">
              <CalendarClock size={20} /> Due in {days} {days === 1 ? "day" : "days"}
            </span>
          )}
          {!isPaid && (
            <button className="btn-primary">Pay rent now</button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
