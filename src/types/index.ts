/** Domain models for the property-management app. */

export interface Building {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  totalUnits: number;
  occupiedUnits: number;
  /** Rent collected this month, in FCFA. */
  collected: number;
  /** Rent expected this month, in FCFA. */
  expected: number;
}

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface Tenant {
  id: string;
  name: string;
  avatarUrl: string;
  unit: string;
  buildingId: string;
  buildingName: string;
  rent: number;
  status: PaymentStatus;
  /** Days overdue — only meaningful when status is 'overdue'. */
  daysOverdue?: number;
  phone: string;
}

export interface ChatThread {
  id: string;
  title: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
}

export interface PortfolioStats {
  buildings: number;
  tenants: number;
  paid: number;
  overdue: number;
  /** Percentage of expected rent collected this month (0–100). */
  collectedPercent: number;
}

export interface Owner {
  name: string;
  avatarUrl: string;
}
