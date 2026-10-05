import { UserRole } from './auth';

export type SalonOrgStatus = 'Active' | 'Pending' | 'Suspended' | 'Inactive';
export type SubscriptionTier = 'Starter' | 'Professional' | 'Business';

export interface SalonOrganization {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  phone: string;
  staffCount: number;
  customerCount: number;
  bookingCount: number;
  monthlyRevenue: number;
  subscriptionTier: SubscriptionTier;
  status: SalonOrgStatus;
  registeredDate: string;
  approvedDate?: string;
  logoUrl?: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salonName: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  createdDate: string;
  avatar?: string;
}

export interface PlatformSubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  activeCount: number;
  trialCount: number;
  features: string[];
}

export interface SuperAdminStatsData {
  totalSalons: number;
  activeSalons: number;
  pendingSalons: number;
  totalUsers: number;
  totalBookings: number;
  platformMRR: number;
  platformRevenue: number;
}
