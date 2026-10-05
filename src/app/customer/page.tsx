'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  CalendarDays,
  Clock,
  Sparkles,
  Heart,
  Crown,
  RotateCcw,
  Scissors,
  CheckCircle2,
  CalendarPlus,
  ArrowRight,
  User,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { POPULAR_SERVICES_DATA } from '@/data/services';
import { RescheduleModal } from '@/components/appointments/RescheduleModal';
import { SalonAppointment } from '@/types/appointment';

export default function CustomerPortalPage() {
  return (
    <ProtectedRoute allowedRoles={['CUSTOMER', 'SALON_OWNER', 'SUPER_ADMIN']}>
      <CustomerPortalContent />
    </ProtectedRoute>
  );
}

function CustomerPortalContent() {
  const [appointments, setAppointments] = useState<SalonAppointment[]>(INITIAL_APPOINTMENTS);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [rescheduleApt, setRescheduleApt] = useState<SalonAppointment | null>(null);

  // Filter for customer
  const clientAppointments = appointments.filter((a) => a.customerId === 'cust-1');
  const upcomingApts = clientAppointments.filter((a) => a.date >= '2026-09-24' && a.status !== 'Cancelled');
  const pastApts = clientAppointments.filter((a) => a.status === 'Completed' || a.date < '2026-09-24');
  const cancelledApts = clientAppointments.filter((a) => a.status === 'Cancelled');

  const heroApt = upcomingApts[0] || clientAppointments[0];

  const handleCancelApt = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
      );
    }
  };

  const handleConfirmReschedule = (aptId: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === aptId ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' } : a
      )
    );
  };

  return (
    <DashboardLayout title="Client Portal" breadcrumb="My Portal">
      {/* 1. Header with Quick Book CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome, Sophia
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              VIP Diamond Member
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Luxe Hair & Spa Studio Member • 1,450 Reward Points Balance
          </p>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/25 transition-all"
        >
          <Scissors className="w-4 h-4 stroke-[2.5]" />
          <span>Book an Appointment</span>
        </Link>
      </div>

      {/* 2. Upcoming Session Hero Card */}
      {heroApt && (
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
                  Your Next Glam Session
                </span>
                <span className="text-xs text-pink-300 font-semibold">• Today at {heroApt.time}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black mt-3">
                {heroApt.serviceName}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-white/90 text-xs sm:text-sm">
                <span>With {heroApt.staffName}</span>
                <span>•</span>
                <span>{heroApt.durationMinutes} minutes</span>
                <span>•</span>
                <span className="font-bold text-pink-300">
                  ₹{heroApt.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>SoHo Flagship Studio • Chair 3 • Elena Rostova Suite</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setRescheduleApt(heroApt)}
                className="px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white text-slate-900 shadow-md hover:bg-slate-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Reschedule</span>
              </button>

              <button
                type="button"
                onClick={() => handleCancelApt(heroApt.id)}
                className="px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. My Appointments Tabs & History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 mb-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-brand-50 text-brand-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Ref: SP-2026 Client Account
          </span>
        </div>

        <div className="space-y-3">
          {(activeTab === 'upcoming'
            ? upcomingApts
            : activeTab === 'past'
            ? pastApts
            : cancelledApts
          ).map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={apt.staffAvatar}
                  alt={apt.staffName}
                  className="w-11 h-11 rounded-full object-cover border border-white shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{apt.serviceName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {apt.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Stylist: {apt.staffName} • {apt.durationMinutes} min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 text-xs">
                <div className="text-left sm:text-right">
                  <div className="font-bold text-slate-900">{apt.date} at {apt.time}</div>
                  <span className="text-emerald-600 font-black">
                    ₹{apt.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {activeTab === 'upcoming' && (
                  <button
                    type="button"
                    onClick={() => setRescheduleApt(apt)}
                    className="px-3 py-1.5 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:border-brand-300 hover:text-brand-600"
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Favorite Treatments (One-Click Rebook) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 mb-8">
        <h3 className="text-base font-extrabold text-slate-900">
          Rebook Your Favorite Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {POPULAR_SERVICES_DATA.slice(0, 3).map((fav) => (
            <div
              key={fav.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                  {fav.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{fav.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Custom formula on file</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-black text-slate-900 text-sm">
                  ₹{Math.round(fav.revenue / fav.appointmentCount).toLocaleString('en-IN')}
                </span>
                <Link
                  href="/book"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 shadow-xs"
                >
                  Book Again
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={Boolean(rescheduleApt)}
        onClose={() => setRescheduleApt(null)}
        appointment={rescheduleApt}
        onConfirmReschedule={handleConfirmReschedule}
      />
    </DashboardLayout>
  );
}
