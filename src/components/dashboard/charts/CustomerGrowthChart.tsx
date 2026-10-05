'use client';

import React from 'react';
import { Users, UserPlus, Heart, TrendingUp, Award } from 'lucide-react';
import { CUSTOMER_GROWTH_DATA, CUSTOMER_RETENTION_METRICS } from '@/data/customers';

export const CustomerGrowthChart: React.FC = () => {
  const data = CUSTOMER_GROWTH_DATA;
  const maxTotal = Math.max(...data.map((d) => d.totalCustomers));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Customer Growth & Loyalty</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Client retention and acquisition trajectory over 6 months
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{CUSTOMER_RETENTION_METRICS.retentionRate}% Retention</span>
        </div>
      </div>

      {/* Bar Comparison Chart */}
      <div className="h-44 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-100 pb-2 px-2">
        {data.map((item) => {
          const heightPct = (item.totalCustomers / (maxTotal * 1.15)) * 100;
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                {item.totalCustomers}
              </span>

              {/* Stacked Bar: Returning (Purple) + New (Pink) */}
              <div
                className="w-full rounded-t-xl overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover:brightness-105"
                style={{ height: `${heightPct}%` }}
              >
                <div
                  className="w-full bg-[#E6397A] rounded-t-lg"
                  style={{
                    height: `${(item.newCustomers / item.totalCustomers) * 100}%`,
                  }}
                  title={`New: ${item.newCustomers}`}
                />
                <div
                  className="w-full bg-slate-800"
                  style={{
                    height: `${(item.returningCustomers / item.totalCustomers) * 100}%`,
                  }}
                  title={`Returning: ${item.returningCustomers}`}
                />
              </div>

              <span className="text-xs font-bold text-slate-600 mt-1">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend & Retention Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="text-slate-500 font-semibold text-[11px]">Returning Clients</span>
          </div>
          <div className="text-lg font-extrabold text-slate-900">410 Active</div>
        </div>

        <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6397A]" />
            <span className="text-[#E6397A] font-semibold text-[11px]">New Clients</span>
          </div>
          <div className="text-lg font-extrabold text-slate-900">+142 this mo</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="text-slate-500 font-semibold text-[11px] mb-1">Avg Visits / Year</div>
          <div className="text-lg font-extrabold text-slate-900">
            {CUSTOMER_RETENTION_METRICS.avgVisitsPerYear} visits
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="text-slate-500 font-semibold text-[11px] mb-1">Avg Lifetime Value</div>
          <div className="text-lg font-extrabold text-emerald-600">
            {CUSTOMER_RETENTION_METRICS.avgLifetimeValue}
          </div>
        </div>
      </div>
    </div>
  );
};
