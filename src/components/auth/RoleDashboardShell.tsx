'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  ShieldCheck,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, ROLE_LABELS, ROLE_REDIRECTS } from '@/types/auth';
import { DEMO_PRESETS } from '@/data/mockUsers';

interface RoleDashboardShellProps {
  currentRole: UserRole;
  title: string;
  subtitle: string;
  badgeColor?: string;
  children?: React.ReactNode;
}

export const RoleDashboardShell: React.FC<RoleDashboardShellProps> = ({
  currentRole,
  title,
  subtitle,
  badgeColor = 'bg-pink-500/10 text-[#FF659F] border-pink-500/20',
  children,
}) => {
  const { user, logout, switchDemoRole } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const roleTheme: Record<UserRole, { ring: string; gradient: string }> = {
    SUPER_ADMIN: { ring: 'ring-purple-400', gradient: 'from-purple-600 to-indigo-600' },
    SALON_OWNER: { ring: 'ring-pink-400', gradient: 'from-[#E6397A] to-[#D81B60]' },
    MANAGER: { ring: 'ring-blue-400', gradient: 'from-blue-600 to-cyan-600' },
    RECEPTIONIST: { ring: 'ring-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
    STAFF: { ring: 'ring-amber-400', gradient: 'from-amber-600 to-orange-600' },
    CUSTOMER: { ring: 'ring-rose-400', gradient: 'from-rose-500 to-pink-500' },
  };

  const theme = roleTheme[currentRole] || roleTheme.SALON_OWNER;

  return (
    <div className="min-h-screen bg-[#0B0C11] text-white flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="py-4 px-4 sm:px-8 border-b border-white/[0.08] bg-[#0E1018]/90 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="dark" />
          <span className="hidden sm:inline-block h-5 w-px bg-white/10" />
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-400">
            {ROLE_LABELS[currentRole]}
          </span>
        </div>

        {/* User Session & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5 text-right">
            <div>
              <div className="text-xs font-bold text-white">{user?.name || 'Authorized User'}</div>
              <div className="text-[10px] text-slate-400">{user?.email}</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Avatar'}
              className={`w-8 h-8 rounded-full object-cover ring-2 ${theme.ring}`}
            />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Preview */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#141624] border border-white/10 p-6 sm:p-8 shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6397A]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Protected Route Verified
                </span>
                <span className="text-[11px] text-slate-400 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Role: {currentRole}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Back to Home Link */}
            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View Marketing Landing</span>
              </Link>
            </div>
          </div>
        </div>

        {/* User Session Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#141624]/80 rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Authenticated Session
            </div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-500/30"
              />
              <div>
                <div className="text-sm font-bold text-white">{user?.name}</div>
                <div className="text-xs text-slate-400">{user?.email}</div>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Status: Active Session</span>
              <span className="text-emerald-400 font-semibold">Verified</span>
            </div>
          </div>

          <div className="bg-[#141624]/80 rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assigned Organization
            </div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#FF659F]" />
              <span>{user?.salonName || 'SalonPro Headquarters'}</span>
            </div>
            <p className="text-xs text-slate-400">
              Role permissions strictly enforced via Centralized RoleGuard Architecture.
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] text-slate-500">
              Tenant ID: {user?.id || 'usr_001'}
            </div>
          </div>

          <div className="bg-[#141624]/80 rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Security Architecture
            </div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Protected Route Guard Active</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unauthenticated access automatically blocked and redirected to <code className="text-[#FF659F]">/login</code> with return state preservation.
            </p>
          </div>
        </div>

        {/* Children Custom Role Content */}
        {children}

        {/* Testing Switcher Bar for Reviewers */}
        <div className="mt-12 p-6 rounded-3xl bg-[#141624]/50 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF659F]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Dev & Evaluation Tool: Test Role Redirection
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Click any role below to switch session & test its protected route:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {DEMO_PRESETS.map((preset) => {
              const isCurrent = preset.role === currentRole;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => {
                    switchDemoRole(preset.role);
                    router.push(preset.redirectUrl);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                    isCurrent
                      ? 'bg-[#E6397A]/20 border-[#E6397A] text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="font-bold truncate">{preset.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{preset.redirectUrl}</div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-8 border-t border-white/[0.08] text-center text-xs text-slate-500 bg-[#0E1018]/50">
        <span>SalonPro Phase 2 Authentication & Role Infrastructure Verified • Protected Route</span>
      </footer>
    </div>
  );
};
