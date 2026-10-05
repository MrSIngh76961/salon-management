export interface ReportBookingStats {
  totalBookings: number;
  completed: number;
  cancelled: number;
  noShow: number;
  rescheduled: number;
  completionRatePercent: number;
}

export interface ReportRevenueStats {
  totalRevenue: number;
  averageTransaction: number;
  dailyRevenue: number;
  monthlyProjected: number;
  growthPercent: number;
}

export interface StaffPerformanceItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  appointmentsCount: number;
  revenue: number;
  completionRate: number;
  rating: number;
}

export interface PeakTrendItem {
  timeSlot: string;
  bookingDensity: number;
  label: string;
}

export const MOCK_REPORT_BOOKINGS: ReportBookingStats = {
  totalBookings: 872,
  completed: 784,
  cancelled: 42,
  noShow: 18,
  rescheduled: 28,
  completionRatePercent: 89.9,
};

export const MOCK_REPORT_REVENUE: ReportRevenueStats = {
  totalRevenue: 840800,
  averageTransaction: 964,
  dailyRevenue: 42800,
  monthlyProjected: 1120000,
  growthPercent: 18.4,
};

export const MOCK_STAFF_PERFORMANCE: StaffPerformanceItem[] = [
  {
    id: 'staff-11',
    name: 'Elena Rostova',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    appointmentsCount: 142,
    revenue: 298400,
    completionRate: 98,
    rating: 4.95,
  },
  {
    id: 'staff-1',
    name: 'Emily Johnson',
    role: 'Senior Stylist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    appointmentsCount: 188,
    revenue: 172000,
    completionRate: 95,
    rating: 4.9,
  },
  {
    id: 'staff-3',
    name: 'Sophia Williams',
    role: 'Aesthetician',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    appointmentsCount: 124,
    revenue: 148800,
    completionRate: 94,
    rating: 4.88,
  },
  {
    id: 'staff-5',
    name: 'Ava Taylor',
    role: 'Nail Artist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    appointmentsCount: 165,
    revenue: 122400,
    completionRate: 97,
    rating: 4.92,
  },
  {
    id: 'staff-7',
    name: 'Lucas Vance',
    role: 'Stylist & Barber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    appointmentsCount: 130,
    revenue: 99200,
    completionRate: 92,
    rating: 4.85,
  },
];

export const MOCK_CUSTOMER_GROWTH = {
  newCustomers: 342,
  returningCustomers: 906,
  totalCustomers: 1248,
  retentionRatePercent: 72.6,
};

export const MOCK_PEAK_HOURS: PeakTrendItem[] = [
  { timeSlot: '09:00 - 11:00 AM', bookingDensity: 65, label: 'Moderate' },
  { timeSlot: '11:00 AM - 01:00 PM', bookingDensity: 92, label: 'Peak Rush' },
  { timeSlot: '01:00 - 03:00 PM', bookingDensity: 58, label: 'Moderate' },
  { timeSlot: '03:00 - 05:00 PM', bookingDensity: 78, label: 'High Demand' },
  { timeSlot: '05:00 - 07:00 PM', bookingDensity: 96, label: 'Evening Peak' },
];

export const MOCK_PEAK_DAYS = [
  { day: 'Monday', volume: 62 },
  { day: 'Tuesday', volume: 74 },
  { day: 'Wednesday', volume: 80 },
  { day: 'Thursday', volume: 88 },
  { day: 'Friday', volume: 98 },
  { day: 'Saturday', volume: 100 },
  { day: 'Sunday', volume: 85 },
];
