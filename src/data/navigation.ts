import { DashboardNavItem } from '@/types/dashboard';
import { UserRole } from '@/types/auth';

export const SALON_BUSINESS_PROFILE = {
  name: 'Luxe Hair & Spa Studio',
  tier: 'Professional Plan',
  location: 'SoHo Flagship Studio, New York',
  chairCount: 8,
  currency: '₹',
  rating: 4.9,
};

export const OWNER_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Appointments', href: '/appointments', icon: 'CalendarDays', badge: '10 Today' },
  { title: 'Calendar', href: '/calendar', icon: 'Calendar' },
  { title: 'Customers', href: '/customers', icon: 'Users' },
  { title: 'Staff', href: '/staff', icon: 'UserCheck' },
  { title: 'Services', href: '/services', icon: 'Scissors' },
  { title: 'Reports', href: '/reports', icon: 'BarChart3' },
  { title: 'Notifications', href: '/notifications', icon: 'Bell', badge: 3 },
  { title: 'Billing', href: '/billing', icon: 'CreditCard' },
  { title: 'Settings', href: '/settings', icon: 'Settings' },
  { title: 'Subscription', href: '/subscription', icon: 'Sparkles' },
];

export const MANAGER_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'Floor Overview', href: '/manager', icon: 'LayoutDashboard' },
  { title: 'Appointments', href: '/appointments', icon: 'CalendarDays', badge: '10 Today' },
  { title: 'Calendar', href: '/calendar', icon: 'Calendar' },
  { title: 'Customers', href: '/customers', icon: 'Users' },
  { title: 'Staff Shifts', href: '/staff', icon: 'UserCheck' },
  { title: 'Services', href: '/services', icon: 'Scissors' },
  { title: 'Reports', href: '/reports', icon: 'BarChart3' },
  { title: 'Notifications', href: '/notifications', icon: 'Bell', badge: 3 },
];

export const RECEPTIONIST_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'Reception Desk', href: '/reception', icon: 'LayoutDashboard' },
  { title: 'Appointments', href: '/appointments', icon: 'CalendarDays', badge: '10 Today' },
  { title: 'Floor Calendar', href: '/calendar', icon: 'Calendar' },
  { title: 'Customers', href: '/customers', icon: 'Users' },
  { title: 'Billing & POS', href: '/billing', icon: 'CreditCard' },
  { title: 'Notifications', href: '/notifications', icon: 'Bell', badge: 3 },
];

export const STAFF_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'My Workspace', href: '/staff/dashboard', icon: 'LayoutDashboard' },
  { title: 'My Appointments', href: '/appointments', icon: 'CalendarDays', badge: 'Today' },
  { title: 'My Schedule', href: '/calendar', icon: 'Calendar' },
  { title: 'Salon Services', href: '/services', icon: 'Scissors' },
  { title: 'Notifications', href: '/notifications', icon: 'Bell', badge: 2 },
];

export const CUSTOMER_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'My Hub', href: '/customer', icon: 'LayoutDashboard' },
  { title: 'Book Treatment', href: '/book', icon: 'Scissors', badge: 'Instant' },
  { title: 'My Appointments', href: '/customer', icon: 'CalendarDays' },
  { title: 'Notifications', href: '/notifications', icon: 'Bell' },
];

export const ADMIN_NAV_ITEMS: DashboardNavItem[] = [
  { title: 'Platform HQ', href: '/admin', icon: 'LayoutDashboard' },
  { title: 'Salons Directory', href: '/admin/salons', icon: 'Building2', badge: '8 Pending' },
  { title: 'User Accounts', href: '/admin/users', icon: 'Users' },
  { title: 'Subscriptions', href: '/admin/subscriptions', icon: 'CreditCard' },
  { title: 'Platform BI', href: '/admin/analytics', icon: 'BarChart3' },
  { title: 'Platform Alerts', href: '/admin/notifications', icon: 'Bell', badge: 4 },
  { title: 'System Settings', href: '/admin/settings', icon: 'Settings' },
];

export const DASHBOARD_NAV_ITEMS = OWNER_NAV_ITEMS;

export function getNavItemsForRole(role?: UserRole | null): DashboardNavItem[] {
  switch (role) {
    case 'SUPER_ADMIN':
      return ADMIN_NAV_ITEMS;
    case 'MANAGER':
      return MANAGER_NAV_ITEMS;
    case 'RECEPTIONIST':
      return RECEPTIONIST_NAV_ITEMS;
    case 'STAFF':
      return STAFF_NAV_ITEMS;
    case 'CUSTOMER':
      return CUSTOMER_NAV_ITEMS;
    case 'SALON_OWNER':
    default:
      return OWNER_NAV_ITEMS;
  }
}
