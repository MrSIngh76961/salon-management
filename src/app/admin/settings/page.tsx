'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Settings,
  Mail,
  ShieldCheck,
  Server,
  Lock,
  Globe,
  Bell,
} from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminSettingsContent />
    </ProtectedRoute>
  );
}

function AdminSettingsContent() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);

  return (
    <DashboardLayout title="System Settings" breadcrumb="Platform Settings">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Platform Architecture & System Settings
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              Core Config
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Global salon registration policies, automated communication dispatchers, and tenant security parameters.
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Section 1: Tenant Registration Mode */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Tenant Registration Mode</h3>
              <p className="text-xs text-slate-400">Allow new salons to register online with approval queue</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={openRegistration}
                onChange={() => setOpenRegistration(!openRegistration)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500" />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Platform Maintenance Mode</h3>
              <p className="text-xs text-slate-400">Display scheduled maintenance banner to all client portals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
            </label>
          </div>
        </div>

        {/* Section 2: Security & Authentication Policy */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Lock className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-sm">Security & Governance Policies</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Mandatory 2FA for Salon Owner & Admin Accounts</span>
              <input
                type="checkbox"
                checked={require2FA}
                onChange={() => setRequire2FA(!require2FA)}
                className="rounded text-brand-500 w-4 h-4"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Automated IP Brute-Force Rate Limiting (10 req/min)</span>
              <input type="checkbox" defaultChecked className="rounded text-brand-500 w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>GDPR Client Data Anonymization Export Ready</span>
              <input type="checkbox" defaultChecked className="rounded text-brand-500 w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
