'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Building2,
  Clock,
  ShieldCheck,
  Globe,
  Save,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { SALON_BUSINESS_PROFILE } from '@/data/navigation';

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN']}>
      <SettingsContent />
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const [salonName, setSalonName] = useState(SALON_BUSINESS_PROFILE.name);
  const [address, setAddress] = useState('142 Spring Street, SoHo, New York, NY 10012');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [email, setEmail] = useState('contact@luxesalonpro.com');
  const [onlineBookingEnabled, setOnlineBookingEnabled] = useState(true);
  const [depositRequired, setDepositRequired] = useState(false);
  const [cancellationNoticeHours, setCancellationNoticeHours] = useState('24');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout title="Salon Settings" breadcrumb="Settings">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Salon Settings & Configuration
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-brand-600 border border-pink-200">
              Active Studio
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure business hours, salon branding, online booking rules, and cancellation policies.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-2.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Salon Identity Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900">Studio Profile & Branding</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salon Name</label>
              <input
                type="text"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Studio Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
              />
            </div>
          </div>
        </div>

        {/* Online Booking Policies */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900">Online Client Booking Rules</h2>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-bold block">Enable Online Customer Booking</span>
                <span className="text-[11px] text-slate-400">Allow clients to self-book on /book route</span>
              </div>
              <input
                type="checkbox"
                checked={onlineBookingEnabled}
                onChange={() => setOnlineBookingEnabled(!onlineBookingEnabled)}
                className="rounded text-brand-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="font-bold block">Require Advance Deposit for Chemical Treatments</span>
                <span className="text-[11px] text-slate-400">Requires ₹500 advance deposit on Balayage & Keratin</span>
              </div>
              <input
                type="checkbox"
                checked={depositRequired}
                onChange={() => setDepositRequired(!depositRequired)}
                className="rounded text-brand-500 w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
