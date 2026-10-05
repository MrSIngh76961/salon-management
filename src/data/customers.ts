import { CustomerGrowthData } from '@/types/dashboard';

export const CUSTOMER_GROWTH_DATA: CustomerGrowthData[] = [
  { month: 'Apr', newCustomers: 85, returningCustomers: 240, totalCustomers: 980 },
  { month: 'May', newCustomers: 98, returningCustomers: 285, totalCustomers: 1060 },
  { month: 'Jun', newCustomers: 110, returningCustomers: 310, totalCustomers: 1140 },
  { month: 'Jul', newCustomers: 124, returningCustomers: 345, totalCustomers: 1210 },
  { month: 'Aug', newCustomers: 135, returningCustomers: 380, totalCustomers: 1260 },
  { month: 'Sep', newCustomers: 142, returningCustomers: 410, totalCustomers: 1284 },
];

export const CUSTOMER_RETENTION_METRICS = {
  retentionRate: 92.4,
  avgVisitsPerYear: 8.4,
  avgLifetimeValue: '$1,640',
  satisfactionScore: '98%',
};
