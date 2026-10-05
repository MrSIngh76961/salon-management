'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  Users,
  UserCheck,
  Scissors,
  BarChart3,
  Bell,
  CreditCard,
  Settings,
  Sparkles,
  HelpCircle,
  LogOut,
  ChevronRight,
  X,
  Building2,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { getNavItemsForRole, SALON_BUSINESS_PROFILE } from '@/data/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_LABELS } from '@/types/auth';

interface SidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    CalendarDays,
    Calendar,
    Users,
    UserCheck,
    Scissors,
    BarChart3,
    Bell,
    CreditCard,
    Settings,
    Sparkles,
    Building2,
  };

  const navItems = getNavItemsForRole(user?.role);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200/90 flex flex-col justify-between select-none">
      {/* Top Header & Business Badge */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <Logo variant="light" />
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Salon Identity Card */}
        <div className="bg-[#FAF9FB] rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#E6397A] flex items-center justify-center font-bold text-xs shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {user?.salonName || SALON_BUSINESS_PROFILE.name}
              </h4>
              <span className="text-[10px] font-semibold text-pink-600 block">
                {user?.role === 'SUPER_ADMIN' ? 'Platform HQ' : SALON_BUSINESS_PROFILE.tier}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {user?.role === 'SUPER_ADMIN' ? 'Platform Administration' : 'Salon Management'}
        </div>

        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-gradient text-white shadow-md shadow-pink-500/20 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#E6397A]'
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-pink-100 text-[#E6397A]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section: Help, Profile & Logout */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Help & Documentation</span>
        </Link>

        {/* User Card */}
        <div className="bg-[#FAF9FB] rounded-2xl p-3 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-100 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {user?.name || 'Elena Rostova'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {user?.role ? ROLE_LABELS[user.role] : 'Salon Owner'}
              </div>
            </div>
          </div>


          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
