'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, CalendarOff, Sparkles, ArrowUpRight } from 'lucide-react';
import { StaffStatsData } from '@/types/staff';

interface StaffStatsProps {
  stats: StaffStatsData;
}

export const StaffStats: React.FC<StaffStatsProps> = ({ stats }) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Staff',
      value: stats.totalStaff,
      subtext: '+2 joined this quarter',
      indicator: 'Roster Capacity',
      icon: Users,
      color: 'text-[#E6397A]',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
    },
    {
      id: 'active',
      title: 'Active Staff',
      value: stats.activeStaff,
      subtext: `${Math.round((stats.activeStaff / (stats.totalStaff || 1)) * 100)}% active duty`,
      indicator: 'Operational',
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      id: 'leave',
      title: 'On Leave',
      value: stats.onLeave,
      subtext: 'Approved holiday/sick',
      indicator: 'Scheduled',
      icon: CalendarOff,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      id: 'available',
      title: 'Available Today',
      value: stats.availableToday,
      subtext: 'Checked-in on floor',
      indicator: 'Live Now',
      icon: Sparkles,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-pink-200 transition-all flex flex-col justify-between"
          >
            {/* Top Row: Title & Icon */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {card.title}
              </span>
              <div
                className={`w-10 h-10 rounded-2xl ${card.bg} ${card.border} border flex items-center justify-center ${card.color} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Metric Value & Trend */}
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </div>

              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {card.indicator}
                </span>
                <span className="text-slate-400 font-medium truncate">
                  {card.subtext}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
