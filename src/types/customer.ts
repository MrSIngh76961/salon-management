export type CustomerStatus = 'Active' | 'VIP' | 'Inactive';

export interface CustomerTimelineItem {
  id: string;
  date: string;
  type: 'appointment_booked' | 'service_completed' | 'payment_received' | 'note_added' | 'rescheduled';
  title: string;
  description: string;
  amount?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  dateJoined: string;
  birthday?: string;
  totalVisits: number;
  totalSpend: number;
  avgBookingValue: number;
  status: CustomerStatus;
  upcomingAppointment?: string;
  lastVisit?: string;
  notes: string[];
  preferences: string[];
  preferredStylistId?: string;
  preferredStylistName?: string;
  history: CustomerTimelineItem[];
}
