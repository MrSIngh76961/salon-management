'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  Briefcase,
  CheckCircle,
  Coffee,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { STAFF_MEMBERS } from '@/data/mockData';
import { StaffScheduleItem } from '@/types';

export const StaffSchedulingSection: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffScheduleItem>(STAFF_MEMBERS[0]);

  const getStatusBadge = (status: StaffScheduleItem['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'In Session':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-50 text-[#E6397A] border border-pink-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A] animate-pulse" />
            In Session
          </span>
        );
      case 'On Break':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Coffee className="w-3 h-3 text-amber-600" />
            On Break
          </span>
        );
      case 'Off Duty':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Off Duty
          </span>
        );
    }
  };

  return (
    <section className="py-24 bg-[#FAF9FB] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">STAFF & RESOURCE SCHEDULING</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Optimize Every Chair, Stylist & Station
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Eliminate double bookings, configure customized service specialties, manage shift rosters, and balance chair utilization automatically.
          </p>
        </div>

        {/* Dashboard Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Staff Roster List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Salon Team (4 Active Stylists)
              </span>
              <span className="text-xs font-semibold text-[#E6397A]">
                Average Utilization: 87%
              </span>
            </div>

            {STAFF_MEMBERS.map((staff) => {
              const isSelected = selectedStaff.id === staff.id;
              return (
                <motion.div
                  key={staff.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedStaff(staff)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? 'border-[#E6397A] ring-1 ring-[#E6397A] shadow-md shadow-pink-500/10'
                      : 'border-slate-200/80 hover:border-pink-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Stylist Profile & Role */}
                    <div className="flex items-center gap-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-pink-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{staff.name}</h4>
                          {getStatusBadge(staff.status)}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{staff.role}</p>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{staff.shifts}</span>
                        </div>
                      </div>
                    </div>

                    {/* Utilization Metric */}
                    <div className="sm:text-right shrink-0">
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                        <span className="text-xs font-medium text-slate-500">Utilization</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-gradient rounded-full"
                              style={{ width: `${staff.utilization}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            {staff.utilization}%
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {staff.hoursWorked} hrs booked this week
                      </span>
                    </div>
                  </div>

                  {/* Assigned Services Pills */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                      Assigned:
                    </span>
                    {staff.assignedServices.map((svc) => (
                      <span
                        key={svc}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Stylist Deep Dive & Leave Management (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedStaff.avatar}
                  alt={selectedStaff.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#E6397A]/20"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedStaff.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStaff.role}</p>
                </div>
              </div>
              {getStatusBadge(selectedStaff.status)}
            </div>

            {/* Weekly KPI Highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FAF9FB] p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Booked Hours
                </span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {selectedStaff.hoursWorked}h
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">96% target achieved</span>
              </div>

              <div className="bg-[#FAF9FB] p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Commission Rate
                </span>
                <div className="text-xl font-bold text-slate-900 mt-1">45%</div>
                <span className="text-[10px] text-pink-600 font-medium">+5% retail bonus</span>
              </div>
            </div>

            {/* Shift Breakdown for the Week */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Shift Schedule & Breaks
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Mon - Fri Working Shift</span>
                  <span className="text-slate-600">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Lunch Break Allocation</span>
                  <span className="text-amber-700 font-medium">01:30 PM - 02:15 PM</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Upcoming Approved Leave</span>
                  <span className="text-slate-500">Oct 12 - Oct 14 (Vacation)</span>
                </div>
              </div>
            </div>

            {/* Automated Roster AI Notice */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#E6397A] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">AI Shift Optimization</div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Aurevia automatically predicts rush hours on Friday & Saturday and suggests optimal chair assignments to maximize service turnover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
