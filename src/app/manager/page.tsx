'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  CalendarDays,
  UserCheck,
  Clock,
  Sparkles,
  AlertTriangle,
  Play,
  ArrowRight,
  TrendingUp,
  PackageCheck,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { AVAILABLE_STAFF_ROSTER } from '@/data/servicesData';

export default function ManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['MANAGER', 'SALON_OWNER', 'SUPER_ADMIN']}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

function ManagerDashboardContent() {
  const todayAppointments = INITIAL_APPOINTMENTS.filter((a) => a.date === '2026-09-24');
  const availableStaff = AVAILABLE_STAFF_ROSTER.filter((s) => s.availability === 'Available');

  return (
    <DashboardLayout title="Floor Manager Operations" breadcrumb="Manager">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Floor Operations & Shift Desk
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Active Floor Shift
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Chair occupancy coordination, staff shift coverage, client check-in escalation, and inventory reorders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/calendar"
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-slate-50"
          >
            Open Floor Calendar
          </Link>
          <Link
            href="/appointments"
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
          >
            Manage Bookings
          </Link>
        </div>
      </div>

      {/* 2. Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today’s Floor Roster
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {AVAILABLE_STAFF_ROSTER.length} Specialists
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            100% Shift Attendance
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Chair Occupancy
          </span>
          <div className="text-2xl sm:text-3xl font-black text-brand-600 mt-2">
            88% Target
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            7 of 8 Styling Stations In Use
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Floor Appointments
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-2">
            {todayAppointments.length} Today
          </div>
          <span className="text-xs text-purple-600 font-semibold mt-1 block">
            1 in Chair • 1 Checked-in
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Backbar Inventory Alert
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">
            2 Reorders Due
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">
            Redken Shades EQ Developer Low
          </span>
        </div>
      </div>

      {/* 3. Main Operational Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left 2 Cols: Real-time Today's Queue */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Floor Queue & Active Sessions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time appointment statuses for active floor coordination.
              </p>
            </div>
            <Link
              href="/appointments"
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {todayAppointments.slice(0, 5).map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={apt.customerAvatar}
                    alt={apt.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">
                        {apt.customerName}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                        {apt.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 block truncate">
                      {apt.time} • {apt.serviceName} with <strong>{apt.staffName}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-sm text-slate-900 block">
                    ₹{apt.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-400">{apt.durationMinutes} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Staff Floor Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Stylist Floor Radar</h3>
              <p className="text-[11px] text-slate-400">Live chair & station availability</p>
            </div>
            <Link href="/staff" className="text-xs font-bold text-brand-600 hover:underline">
              Roster →
            </Link>
          </div>

          <div className="space-y-3">
            {AVAILABLE_STAFF_ROSTER.slice(0, 6).map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{staff.name}</h4>
                    <span className="text-[10px] text-slate-400 truncate block">{staff.role}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    staff.availability === 'Available'
                      ? 'bg-emerald-50 text-emerald-700'
                      : staff.availability === 'Busy'
                      ? 'bg-pink-50 text-brand-600'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {staff.availability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
