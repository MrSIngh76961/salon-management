'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Flame,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import {
  MOCK_REPORT_BOOKINGS,
  MOCK_REPORT_REVENUE,
  MOCK_STAFF_PERFORMANCE,
  MOCK_CUSTOMER_GROWTH,
  MOCK_PEAK_HOURS,
  MOCK_PEAK_DAYS,
} from '@/data/mockReports';
import { POPULAR_SERVICES_DATA } from '@/data/services';

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER']}>
      <ReportsContent />
    </ProtectedRoute>
  );
}

function ReportsContent() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [activeReportTab, setActiveReportTab] = useState<'bookings' | 'revenue' | 'staff' | 'trends'>('revenue');

  const ranges = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 3 Months', value: '3m' },
    { label: 'Last 12 Months', value: '12m' },
  ];

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    alert(`Exporting Salon Analytics Report in ${format.toUpperCase()} format...`);
  };

  return (
    <DashboardLayout title="Reports & Analytics" breadcrumb="Analytics">
      {/* 1. Header with Range Filter & Export Menu */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Executive Analytics & Reports
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              Live BI
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Deep salon metrics: revenue velocity, stylist efficiency, customer retention, and peak floor occupancy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Range Pills */}
          <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
            {ranges.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRange(r.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRange === r.value
                    ? 'bg-brand-50 text-brand-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Export Dropdown Group */}
          <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
            <button
              onClick={() => handleExport('csv')}
              className="p-2 text-slate-500 hover:text-brand-600 rounded-xl"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="p-2 text-slate-500 hover:text-emerald-600 rounded-xl"
              title="Export Excel"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="p-2 text-slate-500 hover:text-rose-600 rounded-xl"
              title="Export PDF"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric High-Level Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gross Revenue (30d)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            ₹{MOCK_REPORT_REVENUE.totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +{MOCK_REPORT_REVENUE.growthPercent}% MoM Growth
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Average Service Ticket
          </span>
          <div className="text-2xl sm:text-3xl font-black text-brand-600 mt-2">
            ₹{MOCK_REPORT_REVENUE.averageTransaction}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Per completed client booking
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Booking Completion Rate
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-2">
            {MOCK_REPORT_BOOKINGS.completionRatePercent}%
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Low cancellation rate (4.8%)
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Client Retention
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            {MOCK_CUSTOMER_GROWTH.retentionRatePercent}%
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            {MOCK_CUSTOMER_GROWTH.returningCustomers} returning clients
          </span>
        </div>
      </div>

      {/* 3. Report Section Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 mb-6 overflow-x-auto">
        {(['revenue', 'bookings', 'staff', 'trends'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveReportTab(tab)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${
              activeReportTab === tab
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {tab === 'revenue' && 'Revenue & Sales Velocity'}
            {tab === 'bookings' && 'Booking Lifecycles'}
            {tab === 'staff' && 'Staff Performance & Commission'}
            {tab === 'trends' && 'Peak Hours & Density'}
          </button>
        ))}
      </div>

      {/* 4. Tab 1: Revenue Velocity & Popular Treatments */}
      {activeReportTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Top Treatments by Volume & Revenue Share
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Service contribution to total salon monthly gross margin.
            </p>

            <div className="space-y-4">
              {POPULAR_SERVICES_DATA.map((svc) => (
                <div key={svc.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{svc.name}</span>
                    <span className="font-extrabold text-slate-900">
                      ₹{svc.revenue.toLocaleString('en-IN')} ({svc.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${svc.percentage}%`, backgroundColor: svc.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Revenue Snapshot</h3>
            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 text-xs">
              <span className="text-slate-500">Projected Month-End Gross</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                ₹{MOCK_REPORT_REVENUE.monthlyProjected.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
              <span className="text-slate-500">Today’s Run-Rate</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                ₹{MOCK_REPORT_REVENUE.dailyRevenue.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs">
              <span className="text-slate-500">New Client Acquisition</span>
              <div className="text-xl font-black text-emerald-600 mt-1">
                +{MOCK_CUSTOMER_GROWTH.newCustomers} clients
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Booking Lifecycles */}
      {activeReportTab === 'bookings' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
            <div className="text-xs font-bold text-slate-400">Completed Sessions</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {MOCK_REPORT_BOOKINGS.completed}
            </div>
            <span className="text-xs text-emerald-600 font-semibold">Billed without issue</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <XCircle className="w-6 h-6 text-rose-500 mb-2" />
            <div className="text-xs font-bold text-slate-400">Cancellations</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {MOCK_REPORT_BOOKINGS.cancelled}
            </div>
            <span className="text-xs text-slate-400 font-medium">Slot reopened</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <Clock className="w-6 h-6 text-amber-500 mb-2" />
            <div className="text-xs font-bold text-slate-400">No-Shows</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {MOCK_REPORT_BOOKINGS.noShow}
            </div>
            <span className="text-xs text-amber-600 font-semibold">Deposit retained</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <Sparkles className="w-6 h-6 text-purple-500 mb-2" />
            <div className="text-xs font-bold text-slate-400">Rescheduled</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {MOCK_REPORT_BOOKINGS.rescheduled}
            </div>
            <span className="text-xs text-purple-600 font-semibold">Retained in pipeline</span>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Staff Performance */}
      {activeReportTab === 'staff' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="px-5 py-4">Specialist</th>
                  <th className="px-5 py-4">Completed Bookings</th>
                  <th className="px-5 py-4">Gross Revenue</th>
                  <th className="px-5 py-4">Completion %</th>
                  <th className="px-5 py-4">Client Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {MOCK_STAFF_PERFORMANCE.map((st) => (
                  <tr key={st.id} className="hover:bg-pink-50/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{st.name}</div>
                          <span className="text-slate-400 text-[11px]">{st.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">{st.appointmentsCount}</td>
                    <td className="px-5 py-4 font-black text-emerald-600 text-sm">
                      ₹{st.revenue.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-800">{st.completionRate}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-amber-600">{st.rating} ★</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Peak Hours & Density */}
      {activeReportTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Floor Utilization by Day of Week
            </h3>
            <div className="space-y-3">
              {MOCK_PEAK_DAYS.map((d) => (
                <div key={d.day} className="flex items-center justify-between text-xs">
                  <span className="w-24 font-bold text-slate-700">{d.day}</span>
                  <div className="flex-1 mx-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${d.volume}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-black text-slate-900">{d.volume}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Peak Hours of Client Footfall
            </h3>
            <div className="space-y-3">
              {MOCK_PEAK_HOURS.map((h) => (
                <div key={h.timeSlot} className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{h.timeSlot}</span>
                    <span className="text-[10px] text-brand-600 font-semibold">{h.label}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{h.bookingDensity}% Full</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
