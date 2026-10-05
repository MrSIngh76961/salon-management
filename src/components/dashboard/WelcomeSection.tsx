'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, UserPlus, Scissors, Users, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SALON_BUSINESS_PROFILE } from '@/data/navigation';

interface WelcomeSectionProps {
  onOpenNewAppointment: () => void;
  onQuickAction?: (actionName: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  onOpenNewAppointment,
  onQuickAction,
}) => {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Sarah';

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Left: Greeting & Date */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-50 text-[#E6397A] border border-pink-100">
          <Calendar className="w-3.5 h-3.5" />
          <span>{todayFormatted}</span>
        </div>

        <h2
          className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          Good morning, {userName}
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Here&apos;s what&apos;s happening at <strong className="text-slate-800 font-semibold">{user?.salonName || SALON_BUSINESS_PROFILE.name}</strong> today. All 4 stylists are checked in.
        </p>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenNewAppointment}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gradient hover:brightness-105 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-600/25 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>

        <Link
          href="/customers"
          className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-slate-500" />
          <span>Add Customer</span>
        </Link>

        <Link
          href="/staff"
          className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <Users className="w-4 h-4 text-[#E6397A]" />
          <span>Add Staff</span>
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer hidden md:inline-flex"
        >
          <Scissors className="w-4 h-4 text-slate-500" />
          <span>Add Service</span>
        </Link>
      </div>
    </div>
  );
};
