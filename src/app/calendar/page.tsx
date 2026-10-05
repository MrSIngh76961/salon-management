'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Plus,
  Filter,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { AVAILABLE_STAFF_ROSTER } from '@/data/servicesData';
import { INITIAL_CUSTOMERS } from '@/data/mockCustomers';
import { INITIAL_SERVICES } from '@/data/servicesData';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';
import { AppointmentDetailsDrawer } from '@/components/appointments/AppointmentDetailsDrawer';
import { AppointmentFormModal } from '@/components/appointments/AppointmentFormModal';
import { RescheduleModal } from '@/components/appointments/RescheduleModal';

type CalendarView = 'day' | 'week' | 'month';

const TIME_HOURS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

const WEEK_DAYS = [
  { name: 'Mon', date: 'Sep 21' },
  { name: 'Tue', date: 'Sep 22' },
  { name: 'Wed', date: 'Sep 23' },
  { name: 'Thu', date: 'Sep 24', isToday: true },
  { name: 'Fri', date: 'Sep 25' },
  { name: 'Sat', date: 'Sep 26' },
  { name: 'Sun', date: 'Sep 27' },
];

export default function CalendarPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST', 'STAFF']}>
      <CalendarContent />
    </ProtectedRoute>
  );
}

function CalendarContent() {
  const [appointments, setAppointments] = useState<SalonAppointment[]>(INITIAL_APPOINTMENTS);
  const [currentView, setCurrentView] = useState<CalendarView>('day');
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('All');
  const [currentDateDisplay, setCurrentDateDisplay] = useState('Thursday, September 24, 2026');

  // Modals & Drawers
  const [detailsAppointment, setDetailsAppointment] = useState<SalonAppointment | null>(null);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<SalonAppointment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredStaff = useMemo(() => {
    if (selectedStaffFilter === 'All') return AVAILABLE_STAFF_ROSTER.slice(0, 5);
    return AVAILABLE_STAFF_ROSTER.filter((s) => s.name === selectedStaffFilter);
  }, [selectedStaffFilter]);

  const handleStatusChange = (apt: SalonAppointment, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: newStatus } : a))
    );
    if (detailsAppointment?.id === apt.id) {
      setDetailsAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleReschedule = (aptId: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' }
          : a
      )
    );
    if (detailsAppointment?.id === aptId) {
      setDetailsAppointment((prev) =>
        prev ? { ...prev, date: newDate, time: newTime, status: 'Rescheduled' } : null
      );
    }
  };

  const handleCreateAppointment = (data: Partial<SalonAppointment>) => {
    const newApt: SalonAppointment = {
      id: `apt-${Date.now()}`,
      reference: `SP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: data.customerId || 'cust-1',
      customerName: data.customerName || 'Walk-in Client',
      customerPhone: data.customerPhone || '+1 (555) 000-0000',
      customerEmail: data.customerEmail || 'client@salonpro.io',
      customerAvatar:
        data.customerAvatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      serviceId: data.serviceId || 'srv-1',
      serviceName: data.serviceName || 'Precision Cut',
      serviceCategory: data.serviceCategory || 'Hair',
      price: data.price || 500,
      durationMinutes: data.durationMinutes || 45,
      staffId: data.staffId || 'staff-1',
      staffName: data.staffName || 'Emily Johnson',
      staffAvatar:
        data.staffAvatar ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      staffRole: data.staffRole || 'Senior Stylist',
      date: data.date || '2026-09-24',
      time: data.time || '10:00 AM',
      endTime: '11:00 AM',
      status: 'Confirmed',
      paymentStatus: 'Pending',
      notes: data.notes || '',
      createdDate: '2026-09-24',
    };
    setAppointments((prev) => [newApt, ...prev]);
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout title="Calendar" breadcrumb="Floor Scheduling">
      {/* 1. Calendar Header Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Date Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200/60">
            <button
              onClick={() => setCurrentDateDisplay('Wednesday, September 23, 2026')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDateDisplay('Thursday, September 24, 2026')}
              className="px-3 py-1 text-xs font-bold text-slate-800 hover:bg-white rounded-xl transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDateDisplay('Friday, September 25, 2026')}
              className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {currentDateDisplay}
          </h2>
        </div>

        {/* Right: View Mode Toggle & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Staff Filter */}
          <div className="relative">
            <select
              value={selectedStaffFilter}
              onChange={(e) => setSelectedStaffFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-2xl py-2 pl-3 pr-8 text-slate-700 outline-none focus:border-[#E6397A] cursor-pointer"
            >
              <option value="All">All Stylists</option>
              {AVAILABLE_STAFF_ROSTER.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Switcher: Day / Week / Month */}
          <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200/60 text-xs font-bold">
            {(['day', 'week', 'month'] as CalendarView[]).map((v) => (
              <button
                key={v}
                onClick={() => setCurrentView(v)}
                className={`px-3.5 py-1.5 rounded-xl capitalize transition-all ${
                  currentView === v
                    ? 'bg-white text-brand-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* + Book Slot */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* 2. DAY VIEW: Multi-Staff Columns Grid */}
      {currentView === 'day' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Staff Column Headers */}
              <div className="grid grid-cols-6 border-b border-slate-200/80 bg-slate-50/80 text-xs font-bold">
                <div className="p-4 border-r border-slate-200/80 text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Time</span>
                </div>
                {filteredStaff.map((st) => (
                  <div key={st.id} className="p-3.5 border-r border-slate-200/80 last:border-r-0">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
                      />
                      <div className="min-w-0">
                        <div className="font-extrabold text-slate-900 truncate">{st.name}</div>
                        <span className="text-[10px] text-slate-400 block truncate">{st.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Rows */}
              <div className="divide-y divide-slate-100">
                {TIME_HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-6 min-h-[76px]">
                    {/* Time Label */}
                    <div className="p-4 border-r border-slate-200/80 text-xs font-black text-slate-400 bg-slate-50/30 flex items-center">
                      {hour}
                    </div>

                    {/* Staff Columns */}
                    {filteredStaff.map((st) => {
                      // Match appointment for this staff at this approximate hour
                      const apt = appointments.find(
                        (a) =>
                          a.staffName.toLowerCase() === st.name.toLowerCase() &&
                          a.time.startsWith(hour.slice(0, 2))
                      );

                      const isLunchHour = hour === '01:00 PM' && st.id === 'staff-1';

                      return (
                        <div
                          key={st.id}
                          className="p-1.5 border-r border-slate-200/80 last:border-r-0 relative hover:bg-slate-50/50 transition-colors"
                        >
                          {apt && (
                            <div
                              onClick={() => setDetailsAppointment(apt)}
                              className={`p-2.5 rounded-2xl border text-xs cursor-pointer shadow-xs transition-all hover:scale-[1.02] ${
                                apt.status === 'In Progress'
                                  ? 'bg-pink-50 border-pink-200 text-brand-700'
                                  : apt.status === 'Checked-in'
                                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                                  : 'bg-purple-50 border-purple-200 text-purple-800'
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span className="truncate">{apt.customerName}</span>
                                <span className="text-[10px] opacity-75">{apt.time}</span>
                              </div>
                              <div className="text-[11px] truncate opacity-90 mt-0.5">
                                {apt.serviceName}
                              </div>
                              <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/60">
                                {apt.status}
                              </span>
                            </div>
                          )}

                          {isLunchHour && !apt && (
                            <div className="p-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-center text-[11px] font-bold">
                              Scheduled Break
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEEK VIEW: 7 Days Grid */}
      {currentView === 'week' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden p-6">
          <div className="grid grid-cols-7 gap-3">
            {WEEK_DAYS.map((day) => (
              <div
                key={day.name}
                className={`p-3.5 rounded-2xl border ${
                  day.isToday ? 'bg-pink-50/40 border-brand-200' : 'bg-slate-50/50 border-slate-200/70'
                }`}
              >
                <div className="text-center pb-2 border-b border-slate-200/70">
                  <span className="text-xs font-bold text-slate-400 uppercase">{day.name}</span>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{day.date}</div>
                </div>

                <div className="mt-3 space-y-2">
                  {appointments
                    .filter((a) => (day.isToday ? a.date === '2026-09-24' : a.date === '2026-09-25'))
                    .slice(0, 3)
                    .map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => setDetailsAppointment(apt)}
                        className="p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] shadow-xs cursor-pointer hover:border-brand-300"
                      >
                        <div className="font-bold text-slate-900 truncate">{apt.customerName}</div>
                        <div className="text-slate-400 text-[10px]">{apt.time} • {apt.serviceName}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MONTH VIEW */}
      {currentView === 'month' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-3 border-b border-slate-100">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-3">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = ((i + 1) % 31) + 1;
              const isToday = dayNum === 24;
              const hasBookings = [21, 22, 23, 24, 25, 26].includes(dayNum);

              return (
                <div
                  key={i}
                  className={`min-h-[75px] p-2 rounded-2xl border text-left flex flex-col justify-between ${
                    isToday
                      ? 'bg-pink-50 border-brand-200 ring-2 ring-brand-500/20'
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-black ${isToday ? 'text-brand-600' : 'text-slate-700'}`}>
                    {dayNum}
                  </span>
                  {hasBookings && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md inline-block">
                      {dayNum === 24 ? '10 Bookings' : '6 Bookings'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slide-in Appointment Details Drawer */}
      <AppointmentDetailsDrawer
        appointment={detailsAppointment}
        isOpen={Boolean(detailsAppointment)}
        onClose={() => setDetailsAppointment(null)}
        onEdit={() => {}}
        onReschedule={(apt) => setRescheduleAppointment(apt)}
        onStatusChange={handleStatusChange}
        onCancelClick={() => {}}
      />

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={Boolean(rescheduleAppointment)}
        onClose={() => setRescheduleAppointment(null)}
        appointment={rescheduleAppointment}
        onConfirmReschedule={handleReschedule}
      />

      {/* New Booking Modal */}
      <AppointmentFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateAppointment}
        customers={INITIAL_CUSTOMERS}
        services={INITIAL_SERVICES}
        staff={AVAILABLE_STAFF_ROSTER}
      />
    </DashboardLayout>
  );
}
