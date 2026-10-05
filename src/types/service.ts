export type ServiceCategoryName =
  | 'Hair'
  | 'Hair Color'
  | 'Skin & Facial'
  | 'Nails'
  | 'Spa'
  | 'Makeup'
  | 'Grooming';

export type ServiceStatus = 'Active' | 'Inactive';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  description?: string;
  serviceCount: number;
  status: 'Active' | 'Inactive';
  color?: string;
}

export interface ServiceAssignedStaff {
  id: string;
  name: string;
  avatar: string;
  role: string;
  availability: 'Available' | 'Busy' | 'On Break' | 'On Leave' | 'Offline';
}

export interface SalonServiceItem {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  discountPrice?: number;
  taxRatePercent?: number;
  durationMinutes: number;
  durationLabel: string;
  image: string;
  assignedStaff: ServiceAssignedStaff[];
  totalBookings: number;
  totalRevenue: number;
  status: ServiceStatus;
  createdAt: string;
  isPopular?: boolean;
}

export interface ServiceStatsData {
  totalServices: number;
  activeServices: number;
  totalCategories: number;
  mostBookedServiceName: string;
  mostBookedServiceCount: number;
  highestRevenueServiceName: string;
  totalRevenue: number;
}
