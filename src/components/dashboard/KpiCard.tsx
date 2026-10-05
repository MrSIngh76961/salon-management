'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  CalendarClock,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardKpi } from '@/types/dashboard';

interface KpiCardProps {
  kpi: DashboardKpi;
  index: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({ kpi, index }) => {
  const iconMap: Record<string, React.ElementType> = {
    CalendarCheck,
    CalendarClock,
    Users,
    DollarSign,
  };

  const Icon = iconMap[kpi.iconName] || DollarSign;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-pink-200 transition-all flex flex-col justify-between"
    >
      {/* Top Header: Title & Icon */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {kpi.title}
        </span>
        <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div>
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {kpi.value}
        </div>

        {/* Trend Indicator Pill & Comparison */}
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {kpi.change}
          </span>
          <span className="text-slate-400 font-medium truncate">
            {kpi.timeframe}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
