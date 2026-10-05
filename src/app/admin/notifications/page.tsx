'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Bell,
  Building2,
  CreditCard,
  ShieldAlert,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface PlatformAlert {
  id: string;
  title: string;
  message: string;
  category: 'Registration' | 'Subscription' | 'Security';
  timestamp: string;
  read: boolean;
}

const INITIAL_ALERTS: PlatformAlert[] = [
  {
    id: 'alt-1',
    title: 'New Salon Registration: Miracle Touch Skin Clinic',
    message: 'Submitted documents for studio verification in Downtown, Seattle.',
    category: 'Registration',
    timestamp: '15 min ago',
    read: false,
  },
  {
    id: 'alt-2',
    title: 'Subscription Upgraded to Enterprise Business Plan',
    message: 'Kérastase Haute Coiffure upgraded from Professional ($99) to Business ($199/mo).',
    category: 'Subscription',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 'alt-3',
    title: 'Automated Database Snapshot Complete',
    message: 'Global tenant database backup finished across US-East cluster.',
    category: 'Security',
    timestamp: '1 day ago',
    read: true,
  },
];

export default function AdminNotificationsPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminNotificationsContent />
    </ProtectedRoute>
  );
}

function AdminNotificationsContent() {
  const [alerts, setAlerts] = useState<PlatformAlert[]>(INITIAL_ALERTS);

  return (
    <DashboardLayout title="Platform Security & Alerts" breadcrumb="Platform Alerts">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Platform Alerts & Audit Stream
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Platform Telemetry
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time multi-tenant registration requests, billing plan events, and infrastructure audit warnings.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className={`p-5 rounded-3xl border flex items-start justify-between gap-4 transition-all ${
              !alt.read
                ? 'bg-white border-purple-200 shadow-sm ring-1 ring-purple-500/10'
                : 'bg-white/80 border-slate-200/80'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
                {alt.category === 'Registration' ? (
                  <Building2 className="w-5 h-5" />
                ) : alt.category === 'Subscription' ? (
                  <CreditCard className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
                    {alt.category}
                  </span>
                  <span className="text-xs text-slate-400">• {alt.timestamp}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{alt.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{alt.message}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alt.id))}
              className="p-1.5 text-slate-400 hover:text-rose-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
