import { Building, ChatThread, Owner, PortfolioStats, Tenant } from '@/types';

/**
 * Static demo data standing in for a backend. Screens read from these
 * exports today; swap them for API calls / a store without touching the UI.
 */

export const owner: Owner = {
  name: 'James Otieno',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
};

export const buildings: Building[] = [
  {
    id: 'b1',
    name: 'Sunrise Apartments',
    address: '12 Moi Ave, Nairobi',
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    totalUnits: 12,
    occupiedUnits: 10,
    collected: 85000,
    expected: 96000,
  },
  {
    id: 'b2',
    name: 'Westview Residences',
    address: '8 Ngong Rd, Nairobi',
    imageUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
    totalUnits: 16,
    occupiedUnits: 14,
    collected: 102000,
    expected: 128000,
  },
  {
    id: 'b3',
    name: 'Garden Court',
    address: '4 Kilimani Lane, Nairobi',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    totalUnits: 10,
    occupiedUnits: 9,
    collected: 64000,
    expected: 70000,
  },
  {
    id: 'b4',
    name: 'Riverside Flats',
    address: '21 Riverside Dr, Nairobi',
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    totalUnits: 9,
    occupiedUnits: 8,
    collected: 58000,
    expected: 72000,
  },
];

export const tenants: Tenant[] = [
  {
    id: 't1',
    name: 'Jane Mwangi',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    unit: 'B3',
    buildingId: 'b1',
    buildingName: 'Sunrise Apts',
    rent: 8000,
    status: 'overdue',
    daysOverdue: 3,
    phone: '+254700000001',
  },
  {
    id: 't2',
    name: 'Peter Kamau',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    unit: 'A7',
    buildingId: 'b2',
    buildingName: 'Westview',
    rent: 12000,
    status: 'overdue',
    daysOverdue: 5,
    phone: '+254700000002',
  },
  {
    id: 't3',
    name: 'Aisha Hassan',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    unit: 'C2',
    buildingId: 'b1',
    buildingName: 'Sunrise Apts',
    rent: 9000,
    status: 'paid',
    phone: '+254700000003',
  },
  {
    id: 't4',
    name: 'David Otieno',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    unit: 'D1',
    buildingId: 'b3',
    buildingName: 'Garden Court',
    rent: 7500,
    status: 'paid',
    phone: '+254700000004',
  },
  {
    id: 't5',
    name: 'Grace Wanjiru',
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
    unit: 'B1',
    buildingId: 'b2',
    buildingName: 'Westview',
    rent: 11000,
    status: 'pending',
    phone: '+254700000005',
  },
  {
    id: 't6',
    name: 'Samuel Kiptoo',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    unit: 'A2',
    buildingId: 'b4',
    buildingName: 'Riverside',
    rent: 10000,
    status: 'overdue',
    daysOverdue: 8,
    phone: '+254700000006',
  },
];

export const chats: ChatThread[] = [
  {
    id: 'c1',
    title: 'Sunrise Apartments',
    avatarUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Caretaker: Water tank refilled this morning.',
    timestamp: '09:24',
    unreadCount: 3,
    isGroup: true,
  },
  {
    id: 'c2',
    title: 'Jane Mwangi',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    lastMessage: 'I will clear the balance by Friday.',
    timestamp: '08:10',
    unreadCount: 1,
    isGroup: false,
  },
  {
    id: 'c3',
    title: 'Westview Residences',
    avatarUrl:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'You: Reminder sent to all units.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isGroup: true,
  },
  {
    id: 'c4',
    title: 'Peter Kamau',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    lastMessage: 'Thanks for the receipt.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isGroup: false,
  },
];

/** Portfolio totals shown in the home header. */
export const portfolioStats: PortfolioStats = {
  buildings: 4,
  tenants: 47,
  paid: 38,
  overdue: 9,
  collectedPercent: 79,
};

export const overdueTenants = tenants.filter((t) => t.status === 'overdue');
