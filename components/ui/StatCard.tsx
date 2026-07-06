"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "blue",
  delay = 0,
  children,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  accent?: "blue" | "green" | "cyan" | "indigo";
  delay?: number;
  children?: ReactNode;
}) {
  const accents: Record<string, string> = {
    blue: "from-blue-600 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    cyan: "from-cyan-400 to-blue-500",
    indigo: "from-indigo-500 to-violet-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.015 }}
      className="glass group relative overflow-hidden rounded-3xl p-5"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-liquid-soft blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          {sub && <p className="mt-1 text-xs font-medium text-slate-400">{sub}</p>}
        </div>
        <div
          className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${accents[accent]} text-white shadow-glow-blue`}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
      {children && <div className="relative mt-4">{children}</div>}
    </motion.div>
  );
}
