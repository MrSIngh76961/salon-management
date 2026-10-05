export type NotificationCategory =
  | 'Booking'
  | 'Appointment'
  | 'Customer'
  | 'Staff'
  | 'Billing'
  | 'System';

export interface SalonNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string; // e.g. "5m ago", "1 hour ago", "Yesterday"
  read: boolean;
  link?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface NotificationChannelSettings {
  email: {
    bookingConfirmation: boolean;
    appointmentReminder: boolean;
    cancellation: boolean;
    rescheduling: boolean;
    paymentReceipt: boolean;
  };
  sms: {
    bookingConfirmation: boolean;
    reminder2HoursBefore: boolean;
    cancellation: boolean;
  };
  push: {
    newBooking: boolean;
    staffLeaveAlerts: boolean;
    appointmentChanges: boolean;
  };
}
