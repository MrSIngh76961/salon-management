import { PopularServiceItem } from '@/types/dashboard';
export * from './servicesData';

export const POPULAR_SERVICES_DATA: PopularServiceItem[] = [
  {
    id: 'svc-1',
    name: 'Hair Color & Balayage',
    category: 'Hair Color',
    percentage: 32,
    appointmentCount: 184,
    revenue: 331200,
    color: '#E6397A', // SalonPro Magenta
  },
  {
    id: 'svc-2',
    name: 'Precision Haircut & Styling',
    category: 'Hair',
    percentage: 24,
    appointmentCount: 290,
    revenue: 145000,
    color: '#8B5CF6', // Violet
  },
  {
    id: 'svc-3',
    name: 'Botanical Hydrafacial Glow',
    category: 'Skin & Facial',
    percentage: 18,
    appointmentCount: 128,
    revenue: 153600,
    color: '#06B6D4', // Cyan
  },
  {
    id: 'svc-4',
    name: 'Deluxe Russian Gel Manicure',
    category: 'Nails',
    percentage: 14,
    appointmentCount: 160,
    revenue: 112000,
    color: '#10B981', // Emerald
  },
  {
    id: 'svc-5',
    name: 'Luxury Aromatherapy Spa Pedicure',
    category: 'Nails',
    percentage: 12,
    appointmentCount: 110,
    revenue: 99000,
    color: '#F59E0B', // Amber
  },
];

export interface ServiceAnalyticsSummary {
  totalBookings: number;
  totalRevenue: number;
  averagePrice: number;
  mostBookedService: {
    name: string;
    bookings: number;
    category: string;
  };
  highestRevenueService: {
    name: string;
    revenue: number;
    category: string;
  };
}

export const SERVICE_ANALYTICS_SUMMARY: ServiceAnalyticsSummary = {
  totalBookings: 872,
  totalRevenue: 840800,
  averagePrice: 965,
  mostBookedService: {
    name: 'Hair Color & Balayage',
    bookings: 184,
    category: 'Hair Color',
  },
  highestRevenueService: {
    name: 'Bridal HD Glam Airbrush',
    revenue: 297500,
    category: 'Makeup',
  },
};

