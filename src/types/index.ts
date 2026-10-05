export interface NavItem {
  label: string;
  href: string;
}

export interface QuickFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
  trend?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: string;
  description: string;
}

export interface StylistItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
}

export type AppointmentStatus =
  | 'Confirmed'
  | 'Pending'
  | 'Checked-in'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface CalendarAppointment {
  id: string;
  clientName: string;
  clientAvatar: string;
  service: string;
  stylistName: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  price: number;
}

export interface StaffScheduleItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  shifts: string;
  hoursWorked: number;
  utilization: number;
  assignedServices: string[];
  status: 'Available' | 'In Session' | 'On Break' | 'Off Duty';
}

export interface CustomerCRMRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalSpent: number;
  visitsCount: number;
  lastVisit: string;
  nextAppointment: string;
  favoriteStylist: string;
  formulaNotes: string;
  preferences: string[];
  isVip: boolean;
}

export interface FeatureGridItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  salonName: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  metrics: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
