import { SalonActivityItem, DashboardNotificationItem } from '@/types/dashboard';

export const SALON_ACTIVITIES: SalonActivityItem[] = [
  {
    id: 'act-1',
    type: 'payment',
    title: 'Payment received ($195.00)',
    description: 'Sophia Martinez paid for Balayage & Glaze via Apple Pay.',
    timestamp: '4 mins ago',
    amount: 195,
  },
  {
    id: 'act-2',
    type: 'booking',
    title: 'New Online Booking confirmed',
    description: 'Jessica Taylor booked Botanical Hydrafacial with Chloe Dubois.',
    timestamp: '18 mins ago',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-3',
    type: 'customer',
    title: 'New VIP Customer registered',
    description: 'Charlotte Bennett created an online profile and booked a Keratin Infusion.',
    timestamp: '42 mins ago',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-4',
    type: 'staff',
    title: 'Staff availability updated',
    description: 'Marcus Vance marked shift open for Saturday evening walk-ins.',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-5',
    type: 'cancellation',
    title: 'Appointment rescheduled via SMS',
    description: 'Lucas Vance moved haircut appointment from Friday to Saturday 11:00 AM.',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-6',
    type: 'service',
    title: 'Service duration completed',
    description: 'Olivia Wilde completed Blowout & Scalp Treatment with Julian Reed.',
    timestamp: '3 hours ago',
    amount: 70,
  },
];

export const RECENT_NOTIFICATIONS: DashboardNotificationItem[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'New Online Booking',
    message: 'Jessica Taylor scheduled Botanical Hydrafacial for 10:00 AM.',
    timestamp: '10 mins ago',
    read: false,
    actionUrl: '/appointments',
  },
  {
    id: 'notif-2',
    type: 'staff',
    title: 'Leave Request Pending',
    message: 'Julian Reed submitted a time-off request for Oct 12-14.',
    timestamp: '35 mins ago',
    read: false,
    actionUrl: '/staff-management',
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Batch Deposit Payout Cleared',
    message: 'Stripe deposit of $4,820.00 initiated to your Chase Business account.',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/billing',
  },
  {
    id: 'notif-4',
    type: 'reminder',
    title: 'Automated 24h SMS Reminders Sent',
    message: '28 SMS reminders dispatched to tomorrow’s booked clients with 100% confirmation.',
    timestamp: '5 hours ago',
    read: true,
    actionUrl: '/notifications',
  },
];
