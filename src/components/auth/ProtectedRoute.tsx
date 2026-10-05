'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole, ROLE_REDIRECTS, ROLE_LABELS } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect unauthenticated user to login with return redirect parameter
        const returnUrl = encodeURIComponent(pathname);
        router.replace(`/login?redirect=${returnUrl}`);
      } else if (allowedRoles && role && !allowedRoles.includes(role)) {
        // User is authenticated but doesn't have permission for this route
        // Redirect to their designated role dashboard
        const targetPath = ROLE_REDIRECTS[role] || '/dashboard';
        if (targetPath !== pathname) {
          router.replace(targetPath);
        }
      }
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0C11] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-gradient p-0.5 shadow-xl shadow-pink-500/30 flex items-center justify-center animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Verifying SalonPro Credentials...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    const myDashboard = ROLE_REDIRECTS[role] || '/dashboard';

    return (
      <div className="min-h-screen bg-[#FAF9FB] flex flex-col items-center justify-center p-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Access Restricted</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Permission Guard Active
          </p>
        </div>
        <p className="text-sm text-slate-600 max-w-md leading-relaxed">
          Your current account role (<strong>{ROLE_LABELS[role]}</strong>) does not have authorization to view this operational portal.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push(myDashboard)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-gradient text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:opacity-95 transition-opacity cursor-pointer"
          >
            Go to My Workspace ({ROLE_LABELS[role]})
          </button>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            Switch Account / Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role) {
      // Authenticated users should not see login/register pages
      const targetPath = ROLE_REDIRECTS[role] || '/dashboard';
      router.replace(targetPath);
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9FB] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#E6397A]" />
      </div>
    );
  }

  return <>{children}</>;
};
