export type AppointmentStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Checked-in'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'No-show'
  | 'Rescheduled';

export type PaymentStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Refunded' | 'Failed';

export type PaymentMethod = 'Card' | 'Cash' | 'UPI' | 'Online' | 'Gift Card';

export interface SalonAppointment {
  id: string;
  reference: string; // e.g. "SP-2026-00482"
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  price: number;
  durationMinutes: number;
  staffId: string;
  staffName: string;
  staffAvatar: string;
  staffRole: string;
  date: string; // "YYYY-MM-DD" e.g. "2026-09-24"
  time: string; // "10:30 AM"
  endTime: string; // "11:30 AM"
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdDate: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: 'booked' | 'break' | 'leave' | 'available';
  assignedAppointmentId?: string;
}

export interface AppointmentStatsData {
  totalToday: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  revenueToday: number;
}
