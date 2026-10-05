import {
  DashboardKpi,
  RevenueDataPoint,
  BookingTrendsData,
  SalonInsightItem,
} from '@/types/dashboard';

export const DASHBOARD_KPIS: DashboardKpi[] = [
  {
    id: 'kpi-today-appts',
    title: "Today's Appointments",
    value: '24',
    change: '+12.5%',
    trend: 'up',
    timeframe: 'from yesterday',
    iconName: 'CalendarCheck',
  },
  {
    id: 'kpi-upcoming-appts',
    title: 'Upcoming Appointments',
    value: '48',
    change: '+8.0%',
    trend: 'up',
    timeframe: 'next 72 hours',
    iconName: 'CalendarClock',
  },
  {
    id: 'kpi-total-customers',
    title: 'Total Customers',
    value: '1,284',
    change: '+24 new',
    trend: 'up',
    timeframe: 'this month',
    iconName: 'Users',
  },
  {
    id: 'kpi-today-revenue',
    title: "Today's Revenue",
    value: '$2,840',
    change: '+15.2%',
    trend: 'up',
    timeframe: 'vs daily average',
    iconName: 'DollarSign',
  },
];

export const REVENUE_TIMEFRAME_DATA: Record<
  '7D' | '30D' | '3M' | '12M',
  {
    total: string;
    growth: string;
    comparison: string;
    points: RevenueDataPoint[];
  }
> = {
  '7D': {
    total: '$19,840',
    growth: '+14.2%',
    comparison: '+$2,480 vs last 7 days',
    points: [
      { date: 'Thu', revenue: 2450, appointments: 21 },
      { date: 'Fri', revenue: 3890, appointments: 32 },
      { date: 'Sat', revenue: 4420, appointments: 38 },
      { date: 'Sun', revenue: 1950, appointments: 16 },
      { date: 'Mon', revenue: 2100, appointments: 18 },
      { date: 'Tue', revenue: 2190, appointments: 19 },
      { date: 'Wed', revenue: 2840, appointments: 24 },
    ],
  },
  '30D': {
    total: '$84,650',
    growth: '+18.4%',
    comparison: '+$13,200 vs previous month',
    points: [
      { date: 'Week 1', revenue: 19200, appointments: 162 },
      { date: 'Week 2', revenue: 21400, appointments: 184 },
      { date: 'Week 3', revenue: 20950, appointments: 175 },
      { date: 'Week 4', revenue: 23100, appointments: 198 },
    ],
  },
  '3M': {
    total: '$248,300',
    growth: '+22.6%',
    comparison: '+$45,800 vs previous quarter',
    points: [
      { date: 'Jul', revenue: 76500, appointments: 680 },
      { date: 'Aug', revenue: 87150, appointments: 745 },
      { date: 'Sep', revenue: 84650, appointments: 720 },
    ],
  },
  '12M': {
    total: '$942,800',
    growth: '+31.8%',
    comparison: '+$228,000 YoY growth',
    points: [
      { date: 'Oct', revenue: 68000, appointments: 610 },
      { date: 'Nov', revenue: 72500, appointments: 650 },
      { date: 'Dec', revenue: 98400, appointments: 890 },
      { date: 'Jan', revenue: 71200, appointments: 640 },
      { date: 'Feb', revenue: 74000, appointments: 665 },
      { date: 'Mar', revenue: 81500, appointments: 710 },
      { date: 'Apr', revenue: 79000, appointments: 700 },
      { date: 'May', revenue: 83400, appointments: 735 },
      { date: 'Jun', revenue: 86900, appointments: 760 },
      { date: 'Jul', revenue: 89200, appointments: 780 },
      { date: 'Aug', revenue: 91400, appointments: 805 },
      { date: 'Sep', revenue: 94800, appointments: 830 },
    ],
  },
};

export const BOOKING_TRENDS_DATA: BookingTrendsData = {
  total: 340,
  completed: 298,
  completedPct: 87.6,
  cancelled: 28,
  cancelledPct: 8.2,
  noShow: 14,
  noShowPct: 4.1,
};

export const SALON_INSIGHTS: SalonInsightItem[] = [
  {
    id: 'ins-1',
    title: 'Booking Velocity Up 18%',
    description: 'Your online booking rate is trending 18% higher than last month, driven by Instagram & Google Reserve.',
    type: 'trend',
    metric: '+18%',
  },
  {
    id: 'ins-2',
    title: 'Hair Color Peak Demand',
    description: 'Balayage & Color Gloss account for 32% of total service volume and 52% of net gross revenue.',
    type: 'highlight',
    metric: '32% Share',
  },
  {
    id: 'ins-3',
    title: 'Peak Volume: Saturday',
    description: 'Saturday chairs are 96% booked through the next 3 weeks. Consider opening an evening shift.',
    type: 'recommendation',
    metric: '96% Full',
  },
  {
    id: 'ins-4',
    title: 'Staff Availability Live',
    description: '3 stylists are currently available on the floor for walk-ins or add-on express blowouts.',
    type: 'alert',
    metric: '3 Ready',
  },
];
