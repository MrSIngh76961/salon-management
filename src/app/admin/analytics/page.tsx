'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  BarChart3,
  TrendingUp,
  Building2,
  Users,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { SUPER_ADMIN_STATS } from '@/data/mockSalons';

export default function AdminAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminAnalyticsContent />
    </ProtectedRoute>
  );
}

function AdminAnalyticsContent() {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <DashboardLayout title="Platform Business Intelligence" breadcrumb="Platform BI">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Platform BI & Multi-Tenant Analytics
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Macro Growth
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Salon tenant acquisition rate, active bookings trajectory, and multi-region platform volume.
          </p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart 1: Salon Tenant Growth */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Salon Organizations Growth</h3>
              <p className="text-xs text-slate-400">Total onboarded studios (Past 6 Months)</p>
            </div>
            <span className="text-xs font-black text-emerald-600">+142% Overall</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4">
            {[48, 64, 82, 104, 122, 142].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-brand-500 to-purple-600 rounded-xl"
                  style={{ height: `${(val / 142) * 100}%` }}
                />
                <span className="text-[11px] font-bold text-slate-500">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Booking Trajectory */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Platform Bookings Volume</h3>
              <p className="text-xs text-slate-400">Appointments scheduled across all studios</p>
            </div>
            <span className="text-xs font-black text-brand-600">94,800 Total</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4">
            {[32, 45, 58, 71, 84, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-xl"
                  style={{ height: `${(val / 95) * 100}%` }}
                />
                <span className="text-[11px] font-bold text-slate-500">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
