"use client";

import {
  Wallet,
  TrendingUp,
  Building2,
  PieChart,
  Plus,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { StatCard } from "@/components/ui/StatCard";
import { RevenueChart } from "@/components/RevenueChart";
import { OccupancyDonut } from "@/components/OccupancyDonut";
import { PaymentLedger } from "@/components/PaymentLedger";
import { TenantsTable } from "@/components/TenantsTable";
import {
  LANDLORD,
  tenants,
  occupancy,
  monthlyRevenue,
  yearlyRevenue,
  revenueThisMonth,
  countByStatus,
  CURRENT_PERIOD,
} from "@/lib/mock-data";
import { formatCurrency, formatBillingPeriod } from "@/lib/format";
import {
  LayoutDashboard,
  Users,
  Wallet as WalletIcon,
  Building2 as Building,
} from "lucide-react";

const NAV: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Properties", icon: Building },
  { label: "Tenants", icon: Users },
  { label: "Payments", icon: WalletIcon },
];

export default function LandlordDashboard() {
  const monthly = revenueThisMonth(tenants);
  const paidCount = countByStatus(tenants, "paid");
  const total = tenants.length;
  const collectionRate = Math.round((paidCount / total) * 100);
  const occupancyRate = Math.round(
    (occupancy.occupied / occupancy.totalUnits) * 100,
  );

  return (
    <DashboardShell role="Landlord" userName={LANDLORD.name} nav={NAV}>
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Portfolio overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatBillingPeriod(CURRENT_PERIOD)} · {occupancy.totalUnits} units across{" "}
            {LANDLORD.properties} properties
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <Plus size={18} /> Add tenant
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value={formatCurrency(monthly)}
          sub={`of ${formatCurrency(
            tenants.reduce((s, t) => s + t.rentAmount, 0),
          )} expected`}
          icon={Wallet}
          accent="blue"
          delay={0}
        />
        <StatCard
          label="Revenue this year"
          value={formatCurrency(yearlyRevenue)}
          sub="Collected across 12 months"
          icon={TrendingUp}
          accent="green"
          delay={0.06}
        />
        <StatCard
          label="Occupancy rate"
          value={`${occupancyRate}%`}
          sub={`${occupancy.occupied} occupied · ${occupancy.vacant} vacant`}
          icon={Building2}
          accent="cyan"
          delay={0.12}
        />
        <StatCard
          label="Collection rate"
          value={`${collectionRate}%`}
          sub={`${paidCount} of ${total} tenants paid`}
          icon={PieChart}
          accent="indigo"
          delay={0.18}
        />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-5 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue trend</h2>
              <p className="text-xs text-slate-400">Monthly collected rent this year</p>
            </div>
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-700">
              ▲ 12% YoY
            </span>
          </div>
          <RevenueChart data={monthlyRevenue} />
        </div>

        <div className="glass flex flex-col items-center justify-center rounded-3xl p-5">
          <h2 className="mb-2 self-start text-base font-bold text-slate-900">Occupancy</h2>
          <OccupancyDonut occupied={occupancy.occupied} vacant={occupancy.vacant} />
          <div className="mt-4 flex w-full items-center justify-around text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              <span className="text-slate-500">Occupied {occupancy.occupied}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-200" />
              <span className="text-slate-500">Vacant {occupancy.vacant}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment tracker */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Who paid this month
            </h2>
            <p className="text-sm text-slate-500">
              Mark payments received and nudge anyone who’s behind.
            </p>
          </div>
        </div>
        <PaymentLedger initial={tenants} />
      </div>

      {/* Tenants table */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">All tenants</h2>
          <p className="text-sm text-slate-500">
            Lease status, rent and due dates across your portfolio.
          </p>
        </div>
        <TenantsTable tenants={tenants} />
      </div>
    </DashboardShell>
  );
}
