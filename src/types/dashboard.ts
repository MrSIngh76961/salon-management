import { UserRole } from './auth';

export type DashboardAppointmentStatus =
  | 'Confirmed'
  | 'Checked-in'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'No-show';

export interface DashboardAppointment {
  id: string;
  time: string;
  date: string;
  customerName: string;
  customerAvatar: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceName: string;
  serviceCategory: string;
  staffName: string;
  staffAvatar: string;
  duration: string;
  price: number;
  status: DashboardAppointmentStatus;
  notes?: string;
}

export interface DashboardKpi {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  iconName: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  appointments: number;
}

export interface BookingTrendsData {
  total: number;
  completed: number;
  completedPct: number;
  cancelled: number;
  cancelledPct: number;
  noShow: number;
  noShowPct: number;
}

export interface CustomerGrowthData {
  month: string;
  newCustomers: number;
  returningCustomers: number;
  totalCustomers: number;
}

export interface PopularServiceItem {
  id: string;
  name: string;
  category: string;
  percentage: number;
  appointmentCount: number;
  revenue: number;
  color: string;
}

export interface StaffPerformanceItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  appointmentsCount: number;
  revenueGenerated: number;
  completionRate: number;
  rating: number;
  utilizationRate: number;
  status: 'In Session' | 'Available' | 'On Break' | 'Off Duty';
}

export interface SalonActivityItem {
  id: string;
  type: 'booking' | 'customer' | 'payment' | 'staff' | 'cancellation' | 'service';
  title: string;
  description: string;
  timestamp: string;
  userAvatar?: string;
  amount?: number;
}

export interface SalonInsightItem {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'recommendation' | 'alert' | 'highlight';
  metric?: string;
}

export interface DashboardNotificationItem {
  id: string;
  type: 'booking' | 'reminder' | 'cancellation' | 'staff' | 'payment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  allowedRoles?: UserRole[];
}
