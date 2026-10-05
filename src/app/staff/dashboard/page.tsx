'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Play,
  TrendingUp,
  Star,
  Award,
  Sparkles,
  Phone,
  User,
  Coffee,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';

export default function StaffStylistDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['STAFF', 'MANAGER', 'SALON_OWNER', 'SUPER_ADMIN']}>
      <StaffStylistDashboardContent />
    </ProtectedRoute>
  );
}

function StaffStylistDashboardContent() {
  const { user } = useAuth();
  const stylistName = user?.name || 'Julian Reed';

  const [appointments, setAppointments] = useState<SalonAppointment[]>(INITIAL_APPOINTMENTS);
  const [availability, setAvailability] = useState<'Available' | 'Busy' | 'On Break'>('Available');

  // Filter appointments specifically assigned to this stylist or default sample
  const myAppointments = appointments.filter(
    (a) => a.staffName.toLowerCase() === stylistName.toLowerCase() || a.staffId === 'staff-11' || a.staffId === 'staff-7'
  );

  const todayMyApts = myAppointments.filter((a) => a.date === '2026-09-24');
  const activeSession = todayMyApts.find((a) => a.status === 'In Progress' || a.status === 'Checked-in');
  const completedToday = todayMyApts.filter((a) => a.status === 'Completed').length;

  const handleUpdateStatus = (aptId: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status } : a))
    );
  };

  return (
    <DashboardLayout title="My Stylist Workspace" breadcrumb="Stylist Portal">
      {/* 1. Header with Personalized Welcome & Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back, {stylistName}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-brand-600 border border-pink-200">
              Senior Specialist
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Chair Station 3 • Shift: 09:00 AM – 06:00 PM • Lunch Break: 01:00 PM
          </p>
        </div>

        {/* Availability Switcher */}
        <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
          {(['Available', 'Busy', 'On Break'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setAvailability(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                availability === s
                  ? s === 'Available'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : s === 'Busy'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Personal Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today’s Appointments
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {todayMyApts.length} Scheduled
          </div>
          <span className="text-xs text-brand-600 font-semibold mt-1 block">
            {completedToday} sessions completed
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today’s Commission Share
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            ₹3,840
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            40% service revenue share
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Tips Received Today
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-2">
            ₹750
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Direct client gratuity
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Client Rating
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-2 flex items-center gap-1.5">
            <Star className="w-6 h-6 fill-amber-500" />
            <span>4.95</span>
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Based on 142 reviews
          </span>
        </div>
      </div>

      {/* 3. Active In-Chair Session Hero */}
      {activeSession ? (
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
                Current Active Session
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3">
                {activeSession.serviceName}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-white/90 text-sm">
                <span className="font-bold">{activeSession.customerName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activeSession.time} – {activeSession.endTime}
                </span>
                <span>•</span>
                <span className="font-bold">₹{activeSession.price.toLocaleString('en-IN')}</span>
              </div>
              {activeSession.notes && (
                <p className="mt-3 text-xs text-pink-100 bg-white/10 p-3 rounded-2xl backdrop-blur-md max-w-xl">
                  {activeSession.notes}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeSession.status === 'Checked-in' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(activeSession.id, 'In Progress')}
                  className="px-6 py-3 rounded-2xl font-black text-xs sm:text-sm bg-white text-brand-600 shadow-lg hover:bg-slate-50 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-brand-600" />
                  <span>Start Treatment</span>
                </button>
              )}

              {activeSession.status === 'In Progress' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(activeSession.id, 'Completed')}
                  className="px-6 py-3 rounded-2xl font-black text-xs sm:text-sm bg-white text-emerald-600 shadow-lg hover:bg-slate-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Completed</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleUpdateStatus(activeSession.id, 'No-show')}
                className="px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
              >
                No-Show
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 4. Today’s Schedule List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 mb-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              My Appointment Schedule for Today
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Client consultations, color timings, and buffer cleanup slots.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {todayMyApts.length} Assigned Clients
          </span>
        </div>

        <div className="space-y-3">
          {todayMyApts.map((apt) => (
            <div
              key={apt.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={apt.customerAvatar}
                  alt={apt.customerName}
                  className="w-11 h-11 rounded-full object-cover border border-white shadow-xs"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{apt.customerName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {apt.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {apt.serviceName} • {apt.durationMinutes} min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-left sm:text-right">
                  <span className="font-bold text-slate-900 text-sm block">{apt.time}</span>
                  <span className="text-xs text-emerald-600 font-semibold">
                    ₹{apt.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {apt.status === 'Confirmed' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(apt.id, 'In Progress')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-50 text-brand-600 hover:bg-pink-100"
                  >
                    Start Service
                  </button>
                )}

                {apt.status === 'In Progress' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
