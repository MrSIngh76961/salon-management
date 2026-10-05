'use client';

import React from 'react';
import { Star, Award, TrendingUp, UserCheck, Coffee } from 'lucide-react';
import { STAFF_PERFORMANCE_DATA } from '@/data/staff';
import { StaffPerformanceItem } from '@/types/dashboard';

export const StaffPerformance: React.FC = () => {
  const getStatusBadge = (status: StaffPerformanceItem['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'In Session':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E6397A] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A] animate-pulse" />
            In Session
          </span>
        );
      case 'On Break':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Coffee className="w-2.5 h-2.5 text-amber-600" />
            Break
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Off Duty
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Stylist Performance</h3>
          <p className="text-xs text-slate-500 mt-0.5">Team productivity, earnings, and completion metrics</p>
        </div>
        <span className="text-xs font-semibold text-slate-500">4 Active Today</span>
      </div>

      <div className="divide-y divide-slate-100">
        {STAFF_PERFORMANCE_DATA.map((staff) => (
          <div
            key={staff.id}
            className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            {/* Left: Stylist Profile */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-pink-100 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                  {getStatusBadge(staff.status)}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">
                    {staff.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-500">{staff.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5 font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{staff.rating}</span>
                  <span className="text-slate-400 font-normal">({staff.appointmentsCount} visits)</span>
                </div>
              </div>
            </div>

            {/* Right: Metrics */}
            <div className="flex items-center justify-between sm:justify-end gap-6 text-xs">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Revenue
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  ${staff.revenueGenerated.toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Completion
                </span>
                <span className="text-sm font-extrabold text-emerald-600 block">
                  {staff.completionRate}%
                </span>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  Utilization
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {staff.utilizationRate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
