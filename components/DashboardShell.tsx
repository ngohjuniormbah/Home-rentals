"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  Wallet,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  LifeBuoy,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { Avatar } from "./ui/Avatar";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
}

const ICONS = {
  LayoutDashboard,
  Users,
  Building2,
  Wallet,
  Bell,
  Settings,
  Home,
  LifeBuoy,
  Receipt,
};

export function DashboardShell({
  role,
  userName,
  nav,
  children,
}: {
  role: "Landlord" | "Tenant";
  userName: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-2 py-1">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-liquid-primary text-white shadow-glow-blue">
          <Home size={20} strokeWidth={2.4} />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-900">Home Rentals</p>
          <p className="text-xs text-slate-400">{role} portal</p>
        </div>
      </Link>

      <nav className="mt-8 flex-1 space-y-1.5">
        {nav.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
              item.active
                ? "bg-liquid-primary text-white shadow-glow-blue"
                : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
            }`}
          >
            <item.icon size={19} strokeWidth={2.1} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1.5 border-t border-white/50 pt-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium text-slate-600 transition hover:bg-white/70">
          <Settings size={19} strokeWidth={2.1} />
          Settings
        </button>
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          <LogOut size={19} strokeWidth={2.1} />
          Sign out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 p-4 lg:block">
        <div className="glass h-full rounded-4xl p-5">{SidebarContent}</div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="fixed inset-y-0 left-0 z-50 w-72 p-4 lg:hidden"
            >
              <div className="glass-strong h-full rounded-4xl p-5">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-6 top-6 text-slate-400"
                >
                  <X size={22} />
                </button>
                {SidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 px-4 pt-4">
          <div className="glass flex items-center justify-between rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-slate-700 lg:hidden"
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-xs font-medium text-slate-400">Welcome back</p>
                <p className="text-sm font-bold text-slate-900">{userName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-slate-600 transition hover:bg-white">
                <Bell size={19} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              <Avatar seed={userName} size={40} />
            </div>
          </div>
        </header>

        <main className="px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
