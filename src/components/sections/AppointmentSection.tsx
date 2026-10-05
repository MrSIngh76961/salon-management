'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  XCircle,
  UserCheck,
  Search,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { CALENDAR_APPOINTMENTS, SAMPLE_STYLISTS } from '@/data/mockData';
import { AppointmentStatus, CalendarAppointment } from '@/types';

export const AppointmentSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [appointments, setAppointments] = useState<CalendarAppointment[]>(CALENDAR_APPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);

  const statusColors: Record<AppointmentStatus, { bg: string; text: string; border: string }> = {
    Confirmed: { bg: 'bg-emerald-500/10', text: 'text-emerald-700', border: 'border-emerald-500/30' },
    Pending: { bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-500/30' },
    'Checked-in': { bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-500/30' },
    'In Progress': { bg: 'bg-pink-500/10', text: 'text-[#E6397A]', border: 'border-pink-500/30' },
    Completed: { bg: 'bg-slate-500/10', text: 'text-slate-700', border: 'border-slate-500/30' },
    Cancelled: { bg: 'bg-rose-500/10', text: 'text-rose-700', border: 'border-rose-500/30' },
  };

  const filterOptions = ['All', 'In Progress', 'Checked-in', 'Confirmed', 'Pending', 'Completed'];

  const filteredAppointments = activeFilter === 'All'
    ? appointments
    : appointments.filter((apt) => apt.status === activeFilter);

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  return (
    <section id="calendar" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <SectionBadge variant="pink">CALENDAR & APPOINTMENTS</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Real-Time Salon Schedule Command Center
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Manage your entire salon floor at a glance. Multi-column stylist rosters, live status flags, and instant drag-and-drop rescheduling.
          </p>
        </div>

        {/* Realistic SaaS Calendar Mockup Container */}
        <div className="bg-[#FAF9FB] rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Calendar Toolbar */}
          <div className="bg-white p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            {/* Date Navigator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  type="button"
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 text-xs font-bold text-slate-900">Today</span>
                <button
                  type="button"
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#E6397A]" />
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  Wednesday, September 24, 2026
                </span>
              </div>
            </div>

            {/* View Modes & Action */}
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                <span className="px-3 py-1 bg-white text-slate-900 rounded-lg shadow-sm">Day</span>
                <span className="px-3 py-1 hover:text-slate-900 cursor-pointer">Week</span>
                <span className="px-3 py-1 hover:text-slate-900 cursor-pointer">Month</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-gradient hover:brightness-105 shadow-md shadow-pink-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Booking</span>
              </button>
            </div>
          </div>

          {/* Status Filter Badges Row */}
          <div className="px-5 py-3 bg-[#F4F3F7] border-b border-slate-200/80 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#12131C] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-slate-500 hidden md:inline">
              Showing {filteredAppointments.length} active sessions
            </span>
          </div>

          {/* Main Calendar Grid Showcase */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[780px]">
              {/* Stylist Columns Header */}
              <div className="grid grid-cols-12 gap-3 mb-4">
                <div className="col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
                  Timeline
                </div>
                {SAMPLE_STYLISTS.map((stylist) => (
                  <div
                    key={stylist.id}
                    className="col-span-3 bg-white p-3 rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-xs"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={stylist.avatar}
                      alt={stylist.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-100"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {stylist.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {stylist.role}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-span-1 text-center py-2 text-xs font-semibold text-slate-400">
                  Notes
                </div>
              </div>

              {/* Time Slots Rows with Live Appointments */}
              <div className="space-y-3">
                {/* 09:30 AM Slot */}
                <div className="grid grid-cols-12 gap-3 items-center min-h-[90px]">
                  <div className="col-span-2 text-xs font-semibold text-slate-500 pl-2">
                    09:30 AM
                  </div>
                  {/* Elena: In Progress */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[0])}
                      className="p-3 rounded-2xl bg-pink-50 border border-pink-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6397A] bg-pink-100/80 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                        <span className="text-xs font-bold text-slate-900">$195</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Sophia Martinez
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Balayage & Blowdry • 2h 15m
                      </div>
                    </motion.div>
                  </div>

                  {/* Marcus: Checked-in */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[1])}
                      className="p-3 rounded-2xl bg-blue-50 border border-blue-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                          Checked-in
                        </span>
                        <span className="text-xs font-bold text-slate-900">$65</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Alexander Hayes
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Men&apos;s Executive Cut • 45m
                      </div>
                    </motion.div>
                  </div>

                  {/* Chloe: Confirmed */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[2])}
                      className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          Confirmed
                        </span>
                        <span className="text-xs font-bold text-slate-900">$95</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Jessica Taylor
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Botanical Hydrafacial • 1h
                      </div>
                    </motion.div>
                  </div>

                  <div className="col-span-1 text-center text-[10px] text-slate-400">
                    Station 1
                  </div>
                </div>

                {/* 01:00 PM Slot */}
                <div className="grid grid-cols-12 gap-3 items-center min-h-[90px]">
                  <div className="col-span-2 text-xs font-semibold text-slate-500 pl-2">
                    01:00 PM
                  </div>
                  {/* Elena: Confirmed */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[3])}
                      className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          Confirmed
                        </span>
                        <span className="text-xs font-bold text-slate-900">$220</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Emma Watson
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Full Highlights & Tone • 2h 30m
                      </div>
                    </motion.div>
                  </div>

                  {/* Marcus: Pending */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[4])}
                      className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                        <span className="text-xs font-bold text-slate-900">$55</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        David Kim
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Beard Sculpt & Fade • 45m
                      </div>
                    </motion.div>
                  </div>

                  {/* Chloe: Completed */}
                  <div className="col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAppointment(appointments[5])}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                        <span className="text-xs font-bold text-slate-900">$80</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Rachel Green
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        Spa Pedicure + Gel • 1h 15m
                      </div>
                    </motion.div>
                  </div>

                  <div className="col-span-1 text-center text-[10px] text-slate-400">
                    Station 2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reschedule & Manage Action Bar */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                In Progress (Active)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Checked-in
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Confirmed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Pending Confirmation
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Click any card to inspect or reschedule</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
