// Domain models — mirror the planned Supabase schema so swapping the
// mock data layer for real queries later touches only lib/data.ts.

export type Role = "landlord" | "tenant";

export type UnitStatus = "vacant" | "occupied";
export type TenantStatus = "active" | "evicted" | "past_due";
export type PaymentStatus = "paid" | "pending" | "late";

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  phone_number: string;
  created_at: string;
}

export interface Property {
  id: string;
  landlord_id: string;
  name: string;
  address: string;
  created_at: string;
}

export interface Unit {
  id: string;
  property_id: string;
  unit_number: string;
  rent_amount: number;
  status: UnitStatus;
  created_at: string;
}

export interface Tenant {
  id: string;
  profile_id: string;
  unit_id: string;
  rent_start_date: string;
  rent_due_day: number; // e.g. 5 -> 5th of every month
  whatsapp_number: string;
  status: TenantStatus;
}

export interface Payment {
  id: string;
  tenant_id: string;
  amount_paid: number;
  payment_date: string | null;
  billing_period: string; // MM-YYYY
  status: PaymentStatus;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  recipient_phone: string;
  message_body: string;
  sent_at: string;
  status: "sent" | "failed";
}

// Convenience view models the UI consumes (joined shapes).
export interface TenantView {
  tenantId: string;
  name: string;
  whatsappNumber: string;
  propertyName: string;
  unitNumber: string;
  rentAmount: number;
  rentDueDay: number;
  leaseStart: string;
  status: TenantStatus;
  currentMonthStatus: PaymentStatus; // paid | pending | late
  avatarSeed: string;
}
