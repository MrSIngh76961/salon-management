'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  Plus,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Scissors,
  DollarSign,
} from 'lucide-react';
import { DashboardAppointment, DashboardAppointmentStatus } from '@/types/dashboard';

interface TodayAppointmentsProps {
  appointments: DashboardAppointment[];
  onOpenNewAppointment: () => void;
}

export const TodayAppointments: React.FC<TodayAppointmentsProps> = ({
  appointments,
  onOpenNewAppointment,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesFilter = filter === 'All' || apt.status === filter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.staffName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [appointments, filter, searchQuery]);

  const countByStatus = (status: string) => {
    if (status === 'All') return appointments.length;
    return appointments.filter((a) => a.status === status).length;
  };

  const getStatusBadge = (status: DashboardAppointmentStatus) => {
    switch (status) {
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-[#E6397A] border border-pink-200/80 shadow-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#E6397A] animate-pulse" />
            In Progress
          </span>
        );
      case 'Checked-in':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Checked-in
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 whitespace-nowrap">
            Cancelled
          </span>
        );
      case 'No-show':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 whitespace-nowrap">
            No-show
          </span>
        );
    }
  };

  const filterTabs = ['All', 'In Progress', 'Checked-in', 'Confirmed', 'Completed'];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      {/* Header: Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-bold text-slate-900">Today&apos;s Appointments</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-[#E6397A]">
              {appointments.length} Sessions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time operational schedule and chair assignments for today
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>View Calendar</span>
          </Link>

          <button
            type="button"
            onClick={onOpenNewAppointment}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-gradient hover:brightness-105 shadow-md shadow-pink-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Filter Tabs & Real-time Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        {/* Filter Tabs with Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {filterTabs.map((tab) => {
            const isActive = filter === tab;
            const count = countByStatus(tab);
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* In-table Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search client, service, stylist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs rounded-xl bg-slate-50 border border-slate-200/80 py-1.5 pl-8 pr-3 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#E6397A] transition-all"
          />
        </div>
      </div>

      {/* Appointments Table with guaranteed column widths and horizontal padding */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/70">
        <table className="w-full min-w-[960px] text-left text-xs border-collapse bg-white">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="px-5 py-3.5 w-32 whitespace-nowrap">Time</th>
              <th className="px-5 py-3.5 min-w-[210px]">Client / Contact</th>
              <th className="px-5 py-3.5 min-w-[220px]">Service & Category</th>
              <th className="px-5 py-3.5 min-w-[170px]">Assigned Stylist</th>
              <th className="px-5 py-3.5 w-28 whitespace-nowrap">Duration</th>
              <th className="px-5 py-3.5 w-24 whitespace-nowrap">Price</th>
              <th className="px-5 py-3.5 min-w-[140px] whitespace-nowrap">Status</th>
              <th className="px-5 py-3.5 w-20 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                  No appointments found matching this criteria.
                </td>
              </tr>
            ) : (
              filtered.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-pink-50/20 transition-colors group"
                >
                  {/* Time */}
                  <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-pink-50 text-[#E6397A] flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{apt.time}</span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={apt.customerAvatar}
                        alt={apt.customerName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm whitespace-nowrap">
                          {apt.customerName}
                        </div>
                        <div className="text-[11px] text-slate-400 whitespace-nowrap">
                          {apt.customerPhone || 'Verified Client'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 text-xs whitespace-nowrap">
                        {apt.serviceName}
                      </div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500 whitespace-nowrap">
                        {apt.serviceCategory}
                      </span>
                    </div>
                  </td>

                  {/* Stylist */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={apt.staffAvatar}
                        alt={apt.staffName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-pink-100 shrink-0"
                      />
                      <span className="font-semibold text-slate-700 text-xs">
                        {apt.staffName}
                      </span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] font-semibold text-slate-600 inline-block">
                      {apt.duration}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-extrabold text-slate-900 text-sm">
                      ${apt.price}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getStatusBadge(apt.status)}
                  </td>

                  {/* Action button */}
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <Link
                      href="/calendar"
                      className="p-2 rounded-xl text-slate-400 hover:text-[#E6397A] hover:bg-pink-50 transition-colors inline-flex items-center justify-center cursor-pointer"
                      title="View in Calendar"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: View All Appointments Link */}
      <div className="pt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">
          Showing <strong className="text-slate-700 font-bold">{filtered.length}</strong> of{' '}
          <strong className="text-slate-700 font-bold">{appointments.length}</strong> scheduled appointments
        </span>
        <Link
          href="/appointments"
          className="font-bold text-[#E6397A] hover:underline flex items-center gap-1.5"
        >
          <span>View all appointments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

