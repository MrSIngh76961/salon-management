'use client';

import React from 'react';
import { Scissors, Sparkles, TrendingUp } from 'lucide-react';
import { POPULAR_SERVICES_DATA } from '@/data/services';

export const PopularServices: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Popular Services</h3>
          <p className="text-xs text-slate-500 mt-0.5">Top performing treatments by booking volume</p>
        </div>
        <span className="text-xs font-semibold text-[#E6397A] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          5 Core Categories
        </span>
      </div>

      <div className="space-y-4">
        {POPULAR_SERVICES_DATA.map((svc) => (
          <div key={svc.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: svc.color }}
                />
                <span className="font-bold text-slate-800">{svc.name}</span>
                <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded-md">
                  {svc.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px] font-medium">
                  {svc.appointmentCount} bookings
                </span>
                <span className="font-extrabold text-slate-900">
                  ${svc.revenue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${svc.percentage}%`,
                  backgroundColor: svc.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Combined turnover: <strong className="text-slate-900 font-bold">$85,280/mo</strong></span>
        <span className="text-emerald-600 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          +16.4% growth
        </span>
      </div>
    </div>
  );
};
