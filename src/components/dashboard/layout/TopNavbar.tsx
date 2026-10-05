'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  User,
  Settings,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { RECENT_NOTIFICATIONS } from '@/data/activities';

interface TopNavbarProps {
  onToggleMobileMenu: () => void;
  title?: string;
  breadcrumb?: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleMobileMenu,
  title = 'Dashboard',
  breadcrumb = 'Overview',
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(e.target as Node)
      ) {
        setNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Page Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>SalonPro</span>
            <span>/</span>
            <span className="text-[#E6397A]">{breadcrumb}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications, Help, User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center relative w-56 lg:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search appointments, clients..."
            className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200/80 py-2 pl-9 pr-3 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationMenuRef}>
          <button
            type="button"
            onClick={() => {
              setNotificationMenuOpen(!notificationMenuOpen);
              setUserMenuOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E6397A] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">
                  Salon Notifications ({unreadCount} new)
                </span>
                <button
                  type="button"
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-semibold text-[#E6397A] hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="py-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {RECENT_NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-slate-400 text-[10px]">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/notifications"
                  onClick={() => setNotificationMenuOpen(false)}
                  className="text-xs font-bold text-[#E6397A] hover:underline"
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Help Link */}
        <Link
          href="/settings"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:inline-flex"
          title="Help & Guides"
          aria-label="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>

        {/* User Dropdown */}
        <div className="relative pl-1 border-l border-slate-200" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="User profile menu"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'Owner'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-100"
            />
            <span className="hidden sm:inline-block text-xs font-bold text-slate-800 truncate max-w-[120px]">
              {user?.name || 'Sarah Jenkins'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">
                  {user?.name || 'Sarah Jenkins'}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {user?.email || 'owner@luxestudio.com'}
                </div>
                <span className="mt-1 inline-block text-[10px] font-bold text-[#E6397A] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                  Salon Owner
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/subscription"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#E6397A]" />
                  <span>Subscription (Pro)</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
