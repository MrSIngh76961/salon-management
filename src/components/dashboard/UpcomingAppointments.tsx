'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { UPCOMING_APPOINTMENTS } from '@/data/appointments';

export const UpcomingAppointments: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
          <p className="text-xs text-slate-500 mt-0.5">Next 72 hours booked schedule</p>
        </div>
        <Link
          href="/calendar"
          className="text-xs font-bold text-[#E6397A] hover:underline flex items-center gap-1"
        >
          <span>Calendar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {UPCOMING_APPOINTMENTS.map((apt) => (
          <div
            key={apt.id}
            className="p-3.5 rounded-2xl bg-[#FAF9FB] hover:bg-white border border-slate-200/70 hover:border-pink-200 transition-all flex items-center justify-between gap-3 text-xs"
          >
            {/* Customer & Service */}
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={apt.customerAvatar}
                alt={apt.customerName}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="font-bold text-slate-900 truncate">
                  {apt.customerName}
                </div>
                <div className="text-[11px] text-slate-600 truncate">
                  {apt.serviceName}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  with {apt.staffName}
                </div>
              </div>
            </div>

            {/* Date & Time pill */}
            <div className="text-right shrink-0">
              <span className="font-bold text-slate-900 block">{apt.time}</span>
              <span className="text-[10px] font-semibold text-[#E6397A] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100 block mt-1">
                {apt.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
