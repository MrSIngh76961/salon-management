'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AuthContextType,
  AuthUser,
  LoginCredentials,
  RegisterData,
  UserRole,
  ROLE_REDIRECTS,
} from '@/types/auth';
import { MOCK_USERS } from '@/data/mockUsers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'salonpro_auth_user';
const USERS_DB_KEY = 'salonpro_registered_users';
const PENDING_VERIFICATION_KEY = 'salonpro_pending_verification';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
      }
    } catch {
      // ignore JSON parse error in mock environment
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRegisteredUsers = (): Record<string, AuthUser & { passwordHash: string }> => {
    try {
      const stored = localStorage.getItem(USERS_DB_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveRegisteredUsers = (users: Record<string, AuthUser & { passwordHash: string }>) => {
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  };

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
    setIsLoading(true);

    // Realistic API network delay simulation
    await new Promise((r) => setTimeout(r, 650));

    const emailKey = credentials.email.toLowerCase().trim();
    const registered = getRegisteredUsers();

    // Check mock predefined users or registered users
    const foundUser = MOCK_USERS[emailKey] || registered[emailKey];

    if (!foundUser) {
      setIsLoading(false);
      return {
        success: false,
        error: 'No account found with this email address. Please check your spelling or register.',
      };
    }

    if (foundUser.passwordHash !== credentials.password) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Incorrect password. Please verify and try again.',
      };
    }

    const authUserData: AuthUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      salonName: foundUser.salonName,
      phone: foundUser.phone,
      avatar: foundUser.avatar,
      emailVerified: foundUser.emailVerified,
      createdAt: foundUser.createdAt,
    };

    setUser(authUserData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUserData));
    } catch {
      // ignore
    }

    setIsLoading(false);
    return { success: true, role: authUserData.role };
  };

  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const emailKey = data.email.toLowerCase().trim();
    const registered = getRegisteredUsers();

    if (MOCK_USERS[emailKey] || registered[emailKey]) {
      setIsLoading(false);
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      };
    }

    const newUser: AuthUser & { passwordHash: string } = {
      id: `usr_${Date.now()}`,
      name: data.fullName,
      email: data.email,
      role: 'SALON_OWNER',
      salonName: data.salonName,
      phone: data.phone,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      passwordHash: data.password,
    };

    registered[emailKey] = newUser;
    saveRegisteredUsers(registered);

    // Save as pending verification email
    try {
      localStorage.setItem(PENDING_VERIFICATION_KEY, data.email);
    } catch {
      // ignore
    }

    setIsLoading(false);
    return { success: true };
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsLoading(false);
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    try {
      localStorage.setItem('salonpro_reset_email', email);
    } catch {
      // ignore
    }
    setIsLoading(false);
    return { success: true };
  };

  const resetPassword = async (
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    try {
      const resetEmail = localStorage.getItem('salonpro_reset_email');
      if (resetEmail) {
        const registered = getRegisteredUsers();
        if (registered[resetEmail.toLowerCase()]) {
          registered[resetEmail.toLowerCase()].passwordHash = password;
          saveRegisteredUsers(registered);
        }
      }
    } catch {
      // ignore
    }

    setIsLoading(false);
    return { success: true };
  };

  const resendVerificationEmail = async (
    email?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsLoading(false);
    return { success: true };
  };

  const verifyEmail = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    if (user) {
      const updatedUser = { ...user, emailVerified: true };
      setUser(updatedUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    }

    try {
      const pendingEmail = localStorage.getItem(PENDING_VERIFICATION_KEY);
      if (pendingEmail) {
        const registered = getRegisteredUsers();
        if (registered[pendingEmail.toLowerCase()]) {
          registered[pendingEmail.toLowerCase()].emailVerified = true;
          saveRegisteredUsers(registered);
        }
      }
    } catch {
      // ignore
    }

    setIsLoading(false);
    return { success: true };
  };

  const switchDemoRole = (role: UserRole) => {
    // Find matching mock user
    const mockEntry = Object.values(MOCK_USERS).find((u) => u.role === role);
    if (mockEntry) {
      const authUser: AuthUser = {
        id: mockEntry.id,
        name: mockEntry.name,
        email: mockEntry.email,
        role: mockEntry.role,
        salonName: mockEntry.salonName,
        phone: mockEntry.phone,
        avatar: mockEntry.avatar,
        emailVerified: mockEntry.emailVerified,
        createdAt: mockEntry.createdAt,
      };
      setUser(authUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      } catch {
        // ignore
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        emailVerified: user?.emailVerified ?? false,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        resendVerificationEmail,
        verifyEmail,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
