'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { BOOKING_TRENDS_DATA } from '@/data/dashboard';

export const BookingChart: React.FC = () => {
  const data = BOOKING_TRENDS_DATA;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Booking Performance</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Attendance & retention metrics for the past 30 days
          </p>
        </div>
        <span className="self-start sm:self-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 whitespace-nowrap shrink-0">
          95.9% Show-Up Rate
        </span>
      </div>

      {/* Multi-segment Bar */}
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${data.completedPct}%` }}
            title={`Completed: ${data.completedPct}%`}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${data.cancelledPct}%` }}
            title={`Cancelled: ${data.cancelledPct}%`}
          />
          <div
            className="bg-rose-500 h-full transition-all duration-500"
            style={{ width: `${data.noShowPct}%` }}
            title={`No-show: ${data.noShowPct}%`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
          <span>0%</span>
          <span>50%</span>
          <span>100% ({data.total} Bookings)</span>
        </div>
      </div>

      {/* Detailed Legend Grid */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{data.completed}</div>
          <div className="text-[11px] text-slate-500">{data.completedPct}% of total</div>
        </div>

        <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{data.cancelled}</div>
          <div className="text-[11px] text-slate-500">{data.cancelledPct}% rescheduled</div>
        </div>

        <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>No-Show</span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{data.noShow}</div>
          <div className="text-[11px] text-slate-500">{data.noShowPct}% (down 65%)</div>
        </div>
      </div>
    </div>
  );
};
