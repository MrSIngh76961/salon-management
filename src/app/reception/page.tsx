'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  UserPlus,
  CalendarPlus,
  UserCheck,
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Users,
  Building2,
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { AVAILABLE_STAFF_ROSTER } from '@/data/servicesData';
import { INITIAL_CUSTOMERS } from '@/data/mockCustomers';
import { INITIAL_SERVICES } from '@/data/servicesData';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';
import { AppointmentFormModal } from '@/components/appointments/AppointmentFormModal';

export default function ReceptionPage() {
  return (
    <ProtectedRoute allowedRoles={['RECEPTIONIST', 'MANAGER', 'SALON_OWNER', 'SUPER_ADMIN']}>
      <ReceptionContent />
    </ProtectedRoute>
  );
}

function ReceptionContent() {
  const [appointments, setAppointments] = useState<SalonAppointment[]>(INITIAL_APPOINTMENTS);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [walkinSuccessMsg, setWalkinSuccessMsg] = useState('');

  const todayApts = appointments.filter((a) => a.date === '2026-09-24');
  const checkedInCount = todayApts.filter((a) => a.status === 'Checked-in').length;
  const inProgressCount = todayApts.filter((a) => a.status === 'In Progress').length;
  const pendingPaymentCount = todayApts.filter((a) => a.paymentStatus === 'Pending').length;

  const handleStatusTransition = (aptId: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a))
    );
  };

  const handleCollectPayment = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, paymentStatus: 'Paid' } : a))
    );
    alert('Payment collected successfully via POS terminal.');
  };

  const handleAddWalkinGuest = () => {
    const walkinApt: SalonAppointment = {
      id: `apt-${Date.now()}`,
      reference: `SP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: 'cust-walkin',
      customerName: 'Walk-in Guest',
      customerPhone: '+1 (555) 019-2834',
      customerEmail: 'walkin@salonpro.io',
      customerAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      serviceId: 'srv-1',
      serviceName: 'Precision Haircut & Styling',
      serviceCategory: 'Hair',
      price: 500,
      durationMinutes: 45,
      staffId: 'staff-1',
      staffName: 'Emily Johnson',
      staffAvatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      staffRole: 'Senior Stylist',
      date: '2026-09-24',
      time: '12:30 PM',
      endTime: '01:15 PM',
      status: 'Checked-in',
      paymentStatus: 'Pending',
      createdDate: '2026-09-24',
    };
    setAppointments((prev) => [walkinApt, ...prev]);
    setWalkinSuccessMsg('Walk-in guest added and marked as Checked-in in lounge!');
    setTimeout(() => setWalkinSuccessMsg(''), 4000);
  };

  return (
    <DashboardLayout title="Reception & Front Desk" breadcrumb="Front Desk">
      {/* 1. Header & Fast Quick Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Front Desk Command Station
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Reception Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Client greeting, lounge check-in, rapid walk-ins, chair handover, and point-of-sale payment collection.
          </p>
        </div>

        {/* Rapid Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddWalkinGuest}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 shadow-xs hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            <UserPlus className="w-4 h-4 text-brand-500" />
            <span>+ Quick Walk-In</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNewBookingModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20 transition-all"
          >
            <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {walkinSuccessMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{walkinSuccessMsg}</span>
        </div>
      )}

      {/* 2. Front Desk KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Waiting in Lounge
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-2">
            {checkedInCount} Arrived
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Ready for stylist greeting
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Currently In Chair
          </span>
          <div className="text-2xl sm:text-3xl font-black text-brand-600 mt-2">
            {inProgressCount} Sessions
          </div>
          <span className="text-xs text-brand-600 font-semibold mt-1 block">
            Styling in progress
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pending POS Checkout
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">
            {pendingPaymentCount} Invoices
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">
            Collect at front counter
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Today’s Total Bookings
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {todayApts.length} Scheduled
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            100% on floor schedule
          </span>
        </div>
      </div>

      {/* 3. Front Desk Queue Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Today’s Client Arrival & Checkout Queue
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              One-click arrival check-in, seat in chair handover, and checkout payment collection.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {todayApts.length} Clients Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Treatment</th>
                <th className="px-5 py-4">Assigned Stylist</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4 text-right">Front Desk Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {todayApts.map((apt) => (
                <tr key={apt.id} className="hover:bg-pink-50/20">
                  <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                    {apt.time}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.customerAvatar}
                        alt={apt.customerName}
                        className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{apt.customerName}</div>
                        <span className="text-slate-400 text-[11px]">{apt.customerPhone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-800">{apt.serviceName}</td>
                  <td className="px-5 py-4 text-slate-700 font-semibold">{apt.staffName}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        apt.status === 'In Progress'
                          ? 'bg-pink-50 text-brand-600'
                          : apt.status === 'Checked-in'
                          ? 'bg-blue-50 text-blue-700'
                          : apt.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900">
                        ₹{apt.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          apt.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        ({apt.paymentStatus})
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    {apt.status === 'Confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusTransition(apt.id, 'Checked-in')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        Check-in
                      </button>
                    )}

                    {apt.status === 'Checked-in' && (
                      <button
                        type="button"
                        onClick={() => handleStatusTransition(apt.id, 'In Progress')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-50 text-brand-600 hover:bg-pink-100"
                      >
                        Seat in Chair
                      </button>
                    )}

                    {apt.status === 'In Progress' && (
                      <button
                        type="button"
                        onClick={() => handleStatusTransition(apt.id, 'Completed')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      >
                        Mark Completed
                      </button>
                    )}

                    {apt.paymentStatus === 'Pending' && (
                      <button
                        type="button"
                        onClick={() => handleCollectPayment(apt.id)}
                        className="ml-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800"
                      >
                        Collect ₹{apt.price}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      <AppointmentFormModal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onSave={(data) => {
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
            createdDate: '2026-09-24',
          };
          setAppointments((prev) => [newApt, ...prev]);
          setIsNewBookingModalOpen(false);
        }}
        customers={INITIAL_CUSTOMERS}
        services={INITIAL_SERVICES}
        staff={AVAILABLE_STAFF_ROSTER}
      />
    </DashboardLayout>
  );
}
