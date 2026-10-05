'use client';

import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { SALON_INSIGHTS } from '@/data/dashboard';

export const SalonInsights: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-pink-100 text-[#E6397A] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Salon Intelligence & Insights</h3>
            <p className="text-xs text-slate-500">Automated performance observations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SALON_INSIGHTS.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#FAF9FB] hover:bg-white border border-slate-200/80 hover:border-pink-200 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {item.title}
                </span>
                {item.metric && (
                  <span className="text-[10px] font-bold text-[#E6397A] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    {item.metric}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center text-[11px] font-semibold text-[#E6397A] hover:underline cursor-pointer pt-1">
              <span>Explore insight</span>
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
