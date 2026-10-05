'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  DollarSign,
  PieChart,
  Flame,
  ArrowUpRight,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { POPULAR_SERVICES_DATA, SERVICE_ANALYTICS_SUMMARY } from '@/data/services';

export const ServiceAnalyticsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* 1. Popular Services Breakdown (Spans 2 columns on lg) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-pink-50 text-[#E6397A] border border-pink-100">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Popular Services & Volume Share
                </h3>
                <p className="text-xs text-slate-400">
                  Top performing menu items by client appointment frequency and demand.
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200/70">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              Last 30 Days
            </span>
          </div>

          {/* Progress Bars List */}
          <div className="space-y-4">
            {POPULAR_SERVICES_DATA.map((service, idx) => (
              <div key={service.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      {service.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({service.category})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-medium">
                      {service.appointmentCount} bookings
                    </span>
                    <span className="font-extrabold text-slate-900 w-12 text-right">
                      {service.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${service.percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Hair Color and Haircut generate over 56% of salon footfall.</span>
          <span className="font-semibold text-brand-600 hover:underline cursor-pointer">
            View Menu Optimization →
          </span>
        </div>
      </div>

      {/* 2. Service Performance KPI Highlights (Spans 1 column on lg) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-pink-300">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold tracking-tight text-white">
                Service Performance
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-pink-200 backdrop-blur-md">
              High Margin
            </span>
          </div>

          <div className="space-y-4 my-3">
            {/* Metric 1: Total Appointments Volume */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[11px] text-slate-300 font-medium block">
                Total Service Bookings
              </span>
              <div className="text-2xl font-black text-white mt-0.5 flex items-baseline justify-between">
                <span>{SERVICE_ANALYTICS_SUMMARY.totalBookings}</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.2%
                </span>
              </div>
            </div>

            {/* Metric 2: Average Service Ticket Price */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[11px] text-slate-300 font-medium block">
                Average Ticket Price
              </span>
              <div className="text-2xl font-black text-white mt-0.5 flex items-baseline justify-between">
                <span>₹{SERVICE_ANALYTICS_SUMMARY.averagePrice.toLocaleString('en-IN')}</span>
                <span className="text-xs text-pink-300 font-semibold">
                  Avg per appointment
                </span>
              </div>
            </div>

            {/* Metric 3: Highest Revenue Service */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[11px] text-slate-300 font-medium block">
                Top Revenue Treatment
              </span>
              <div className="text-sm font-black text-white mt-1 truncate">
                {SERVICE_ANALYTICS_SUMMARY.highestRevenueService.name}
              </div>
              <span className="text-xs text-emerald-400 font-bold block mt-0.5">
                ₹{SERVICE_ANALYTICS_SUMMARY.highestRevenueService.revenue.toLocaleString('en-IN')} gross
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between relative z-10">
          <span>Catalog Health: Excellent</span>
          <span className="text-pink-300 font-semibold">96% Available</span>
        </div>
      </div>
    </div>
  );
};
