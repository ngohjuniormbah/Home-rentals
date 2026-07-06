"use client";

import {
  LayoutDashboard,
  Receipt,
  LifeBuoy,
  Home,
  MapPin,
  CalendarDays,
  Wallet,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { RentStatusBanner } from "@/components/RentStatusBanner";
import { PaymentHistory } from "@/components/PaymentHistory";
import { MaintenanceForm } from "@/components/MaintenanceForm";
import { getTenant, paymentHistory, DEMO_TENANT_ID } from "@/lib/mock-data";
import { formatCurrency, formatDate, ordinal } from "@/lib/format";
import { notFound } from "next/navigation";

const NAV: NavItem[] = [
  { label: "My rent", icon: LayoutDashboard, active: true },
  { label: "Payments", icon: Receipt },
  { label: "Support", icon: LifeBuoy },
];

export default function TenantDashboard() {
  const tenant = getTenant(DEMO_TENANT_ID);
  if (!tenant) return notFound();
  const history = paymentHistory[tenant.tenantId] ?? [];

  const leaseFacts = [
    { icon: Home, label: "Residence", value: tenant.propertyName },
    { icon: MapPin, label: "Unit", value: tenant.unitNumber },
    { icon: Wallet, label: "Monthly rent", value: formatCurrency(tenant.rentAmount) },
    { icon: CalendarDays, label: "Due day", value: `${ordinal(tenant.rentDueDay)} of month` },
  ];

  return (
    <DashboardShell role="Tenant" userName={tenant.name} nav={NAV}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Hi {tenant.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here’s where your rent stands and everything about your lease.
        </p>
      </div>

      <RentStatusBanner
        status={tenant.currentMonthStatus}
        rentAmount={tenant.rentAmount}
        rentDueDay={tenant.rentDueDay}
      />

      {/* Lease facts */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {leaseFacts.map((f) => (
          <div key={f.label} className="glass rounded-3xl p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/12 text-blue-600">
              <f.icon size={17} />
            </span>
            <p className="mt-3 text-xs font-medium text-slate-400">{f.label}</p>
            <p className="mt-0.5 truncate text-sm font-bold text-slate-900">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PaymentHistory payments={history} tenantName={tenant.name} />
        </div>
        <div className="lg:col-span-2">
          <MaintenanceForm />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Lease started {formatDate(tenant.leaseStart)} · Home Rentals
      </p>
    </DashboardShell>
  );
}
