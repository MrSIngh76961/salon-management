'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Server,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { SUPER_ADMIN_STATS, INITIAL_SALONS } from '@/data/mockSalons';

export default function SuperAdminPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <SuperAdminContent />
    </ProtectedRoute>
  );
}

function SuperAdminContent() {
  const stats = SUPER_ADMIN_STATS;

  return (
    <DashboardLayout title="Platform Headquarters" breadcrumb="Super Admin">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Super Admin Platform HQ
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Global Multi-Tenant
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Global network telemetry, multi-tenant salon approvals, SaaS subscription billing, and cross-platform users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/salons"
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:bg-slate-50"
          >
            Review 8 Pending Salons
          </Link>
          <Link
            href="/admin/subscriptions"
            className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
          >
            Manage MRR Plans
          </Link>
        </div>
      </div>

      {/* 2. Platform KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Salon Organizations
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {stats.totalSalons} Salons
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            {stats.activeSalons} Active • {stats.pendingSalons} Pending Review
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Platform Monthly Recurring Revenue
          </span>
          <div className="text-3xl font-black text-emerald-600 mt-2">
            ${stats.platformMRR.toLocaleString('en-US')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            +18.2% ARR Trajectory
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Platform Users
          </span>
          <div className="text-3xl font-black text-purple-600 mt-2">
            {stats.totalUsers.toLocaleString('en-US')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Owners, Managers, Stylists & Clients
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Appointments Booked
          </span>
          <div className="text-3xl font-black text-brand-600 mt-2">
            {stats.totalBookings.toLocaleString('en-US')}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Across 142 Active Studio Locations
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gross GMV Processed
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            ${stats.platformRevenue.toLocaleString('en-US')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Lifetime salon service payments
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Platform Health & Uptime
          </span>
          <div className="text-3xl font-black text-emerald-500 mt-2 flex items-center gap-2">
            <Server className="w-6 h-6 text-emerald-500" />
            <span>99.98%</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Zero Incidents in past 90 days
          </span>
        </div>
      </div>

      {/* 3. Recent Salons Table Preview */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Salon Organizations Onboarding Radar
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and approve newly registered salon tenants on the SalonPro network.
            </p>
          </div>
          <Link
            href="/admin/salons"
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
          >
            <span>View All Salons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-5 py-4">Salon Organization</th>
                <th className="px-5 py-4">Owner Contact</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Staff & Clients</th>
                <th className="px-5 py-4">Plan</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {INITIAL_SALONS.slice(0, 5).map((salon) => (
                <tr key={salon.id} className="hover:bg-pink-50/20">
                  <td className="px-5 py-4 font-bold text-slate-900 text-sm">
                    {salon.name}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-800">{salon.ownerName}</div>
                    <span className="text-[11px] text-slate-400">{salon.ownerEmail}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{salon.location}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-800">{salon.staffCount} staff</span> •{' '}
                    <span className="text-slate-400">{salon.customerCount} clients</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700">
                      {salon.subscriptionTier}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        salon.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : salon.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {salon.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href="/admin/salons"
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
