export type UserRole =
  | 'SUPER_ADMIN'
  | 'SALON_OWNER'
  | 'MANAGER'
  | 'RECEPTIONIST'
  | 'STAFF'
  | 'CUSTOMER';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  salonName?: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  salonName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  emailVerified: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  resendVerificationEmail: (email?: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: () => Promise<{ success: boolean; error?: string }>;
  switchDemoRole: (role: UserRole) => void;
}

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  SUPER_ADMIN: '/admin',
  SALON_OWNER: '/dashboard',
  MANAGER: '/manager',
  RECEPTIONIST: '/reception',
  STAFF: '/staff/dashboard',
  CUSTOMER: '/customer',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Administrator',
  SALON_OWNER: 'Salon Owner',
  MANAGER: 'Floor Manager',
  RECEPTIONIST: 'Front Desk / Receptionist',
  STAFF: 'Stylist / Specialist',
  CUSTOMER: 'Client / Customer',
};
