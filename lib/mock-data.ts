import type { Payment, PaymentStatus, TenantView } from "./types";
import { currentBillingPeriod } from "./format";

// ---------------------------------------------------------------------------
// Mock data layer (Phase 1 — no database yet).
// Everything the UI renders comes from here. When Supabase is wired up later,
// these exports get replaced by real queries and the components stay the same.
// ---------------------------------------------------------------------------

export const LANDLORD = {
  name: "Junior Mbah",
  email: "landlord@homerentals.app",
  properties: 3,
};

export const CURRENT_PERIOD = currentBillingPeriod();

export const tenants: TenantView[] = [
  {
    tenantId: "t1",
    name: "Amina Nkeng",
    whatsappNumber: "+237650112233",
    propertyName: "Bonapriso Residence",
    unitNumber: "A-101",
    rentAmount: 150000,
    rentDueDay: 5,
    leaseStart: "2024-02-01",
    status: "active",
    currentMonthStatus: "paid",
    avatarSeed: "AN",
  },
  {
    tenantId: "t2",
    name: "Eric Tabi",
    whatsappNumber: "+237677445566",
    propertyName: "Bonapriso Residence",
    unitNumber: "A-102",
    rentAmount: 150000,
    rentDueDay: 5,
    leaseStart: "2023-09-15",
    status: "active",
    currentMonthStatus: "pending",
    avatarSeed: "ET",
  },
  {
    tenantId: "t3",
    name: "Clarisse Fon",
    whatsappNumber: "+237698223344",
    propertyName: "Bonapriso Residence",
    unitNumber: "B-201",
    rentAmount: 200000,
    rentDueDay: 3,
    leaseStart: "2024-06-01",
    status: "past_due",
    currentMonthStatus: "late",
    avatarSeed: "CF",
  },
  {
    tenantId: "t4",
    name: "Samuel Ekwe",
    whatsappNumber: "+237655778899",
    propertyName: "Akwa Towers",
    unitNumber: "3F",
    rentAmount: 250000,
    rentDueDay: 10,
    leaseStart: "2022-11-20",
    status: "active",
    currentMonthStatus: "paid",
    avatarSeed: "SE",
  },
  {
    tenantId: "t5",
    name: "Blessing Achu",
    whatsappNumber: "+237699001122",
    propertyName: "Akwa Towers",
    unitNumber: "5C",
    rentAmount: 250000,
    rentDueDay: 10,
    leaseStart: "2024-01-05",
    status: "active",
    currentMonthStatus: "pending",
    avatarSeed: "BA",
  },
  {
    tenantId: "t6",
    name: "Ngozi Bello",
    whatsappNumber: "+237678334455",
    propertyName: "Akwa Towers",
    unitNumber: "2A",
    rentAmount: 180000,
    rentDueDay: 1,
    leaseStart: "2023-04-12",
    status: "past_due",
    currentMonthStatus: "late",
    avatarSeed: "NB",
  },
  {
    tenantId: "t7",
    name: "David Manga",
    whatsappNumber: "+237651667788",
    propertyName: "Deido Court",
    unitNumber: "G-04",
    rentAmount: 120000,
    rentDueDay: 7,
    leaseStart: "2024-03-30",
    status: "active",
    currentMonthStatus: "paid",
    avatarSeed: "DM",
  },
  {
    tenantId: "t8",
    name: "Grace Ivo",
    whatsappNumber: "+237690556677",
    propertyName: "Deido Court",
    unitNumber: "G-05",
    rentAmount: 120000,
    rentDueDay: 7,
    leaseStart: "2023-12-01",
    status: "active",
    currentMonthStatus: "pending",
    avatarSeed: "GI",
  },
];

// Occupancy across the portfolio.
export const occupancy = {
  totalUnits: 12,
  occupied: 8,
  vacant: 4,
};

// Monthly revenue trend (collected) for the current year, in FCFA.
export const monthlyRevenue = [
  { month: "Jan", revenue: 1180000 },
  { month: "Feb", revenue: 1240000 },
  { month: "Mar", revenue: 1310000 },
  { month: "Apr", revenue: 1290000 },
  { month: "May", revenue: 1420000 },
  { month: "Jun", revenue: 1380000 },
  { month: "Jul", revenue: 1450000 },
  { month: "Aug", revenue: 1470000 },
  { month: "Sep", revenue: 1390000 },
  { month: "Oct", revenue: 1510000 },
  { month: "Nov", revenue: 1480000 },
  { month: "Dec", revenue: 1560000 },
];

// Per-tenant payment history used by the tenant portal.
export const paymentHistory: Record<string, Payment[]> = {
  t2: [
    { id: "p-t2-1", tenant_id: "t2", amount_paid: 150000, payment_date: "2026-06-04", billing_period: "06-2026", status: "paid", created_at: "2026-06-04" },
    { id: "p-t2-2", tenant_id: "t2", amount_paid: 150000, payment_date: "2026-05-05", billing_period: "05-2026", status: "paid", created_at: "2026-05-05" },
    { id: "p-t2-3", tenant_id: "t2", amount_paid: 150000, payment_date: "2026-04-06", billing_period: "04-2026", status: "late", created_at: "2026-04-06" },
    { id: "p-t2-4", tenant_id: "t2", amount_paid: 150000, payment_date: "2026-03-03", billing_period: "03-2026", status: "paid", created_at: "2026-03-03" },
  ],
};

// The tenant whose portal we render in the demo (mock "logged-in" tenant).
export const DEMO_TENANT_ID = "t2";

export function getTenant(id: string): TenantView | undefined {
  return tenants.find((t) => t.tenantId === id);
}

// -------- Derived stats helpers ----------------------------------------------

export function revenueThisMonth(list: TenantView[]): number {
  return list
    .filter((t) => t.currentMonthStatus === "paid")
    .reduce((sum, t) => sum + t.rentAmount, 0);
}

export function expectedThisMonth(list: TenantView[]): number {
  return list.reduce((sum, t) => sum + t.rentAmount, 0);
}

export function countByStatus(
  list: TenantView[],
  status: PaymentStatus,
): number {
  return list.filter((t) => t.currentMonthStatus === status).length;
}

export const yearlyRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
