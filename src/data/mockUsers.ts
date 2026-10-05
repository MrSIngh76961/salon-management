import { AuthUser, UserRole } from '@/types/auth';

export const MOCK_USERS: Record<string, AuthUser & { passwordHash: string }> = {
  'owner@salonpro.io': {
    id: 'usr_owner_101',
    name: 'Elena Rostova',
    email: 'owner@salonpro.io',
    role: 'SALON_OWNER',
    salonName: 'Luxe Hair & Spa Studio',
    phone: '+1 (555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2026-01-15T09:00:00Z',
    passwordHash: 'SalonPro2026!',
  },
  'admin@salonpro.io': {
    id: 'usr_admin_001',
    name: 'Victoria Sterling',
    email: 'admin@salonpro.io',
    role: 'SUPER_ADMIN',
    salonName: 'SalonPro Global Networks',
    phone: '+1 (555) 900-0001',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2025-10-01T08:00:00Z',
    passwordHash: 'SalonPro2026!',
  },
  'manager@salonpro.io': {
    id: 'usr_mgr_202',
    name: 'Marcus Vance',
    email: 'manager@salonpro.io',
    role: 'MANAGER',
    salonName: 'Luxe Hair & Spa Studio',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2026-02-10T10:00:00Z',
    passwordHash: 'SalonPro2026!',
  },
  'reception@salonpro.io': {
    id: 'usr_rec_303',
    name: 'Chloe Dubois',
    email: 'reception@salonpro.io',
    role: 'RECEPTIONIST',
    salonName: 'Luxe Hair & Spa Studio',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2026-03-01T11:00:00Z',
    passwordHash: 'SalonPro2026!',
  },
  'staff@salonpro.io': {
    id: 'usr_stf_404',
    name: 'Julian Reed',
    email: 'staff@salonpro.io',
    role: 'STAFF',
    salonName: 'Luxe Hair & Spa Studio',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2026-04-12T09:30:00Z',
    passwordHash: 'SalonPro2026!',
  },
  'customer@salonpro.io': {
    id: 'usr_cust_505',
    name: 'Sophia Martinez',
    email: 'customer@salonpro.io',
    role: 'CUSTOMER',
    salonName: 'Client Account',
    phone: '+1 (555) 392-8841',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    emailVerified: true,
    createdAt: '2026-05-18T14:20:00Z',
    passwordHash: 'SalonPro2026!',
  },
};

export const DEMO_PRESETS: Array<{
  role: UserRole;
  label: string;
  email: string;
  desc: string;
  redirectUrl: string;
}> = [
  {
    role: 'SALON_OWNER',
    label: 'Salon Owner',
    email: 'owner@salonpro.io',
    desc: 'Full operational control, reports, staff management',
    redirectUrl: '/dashboard',
  },
  {
    role: 'SUPER_ADMIN',
    label: 'Super Admin',
    email: 'admin@salonpro.io',
    desc: 'Platform governance, global multi-tenancy & billing',
    redirectUrl: '/admin',
  },
  {
    role: 'MANAGER',
    label: 'Manager',
    email: 'manager@salonpro.io',
    desc: 'Floor operations, schedules, inventory reorders',
    redirectUrl: '/manager',
  },
  {
    role: 'RECEPTIONIST',
    label: 'Receptionist',
    email: 'reception@salonpro.io',
    desc: 'Front desk, check-ins, appointment calendar',
    redirectUrl: '/reception',
  },
  {
    role: 'STAFF',
    label: 'Staff / Stylist',
    email: 'staff@salonpro.io',
    desc: 'Personal appointments, client formulas, tips',
    redirectUrl: '/staff/dashboard',
  },
  {
    role: 'CUSTOMER',
    label: 'Client / Customer',
    email: 'customer@salonpro.io',
    desc: 'Self-booking history, loyalty points, upcoming visits',
    redirectUrl: '/customer',
  },
];
