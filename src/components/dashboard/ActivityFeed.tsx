'use client';

import React from 'react';
import {
  DollarSign,
  CalendarCheck,
  UserPlus,
  UserCheck,
  Clock,
  Scissors,
  ArrowRight,
} from 'lucide-react';
import { SALON_ACTIVITIES } from '@/data/activities';
import { SalonActivityItem } from '@/types/dashboard';

export const ActivityFeed: React.FC = () => {
  const getIcon = (type: SalonActivityItem['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
      case 'booking':
        return <CalendarCheck className="w-3.5 h-3.5 text-[#E6397A]" />;
      case 'customer':
        return <UserPlus className="w-3.5 h-3.5 text-blue-600" />;
      case 'staff':
        return <UserCheck className="w-3.5 h-3.5 text-purple-600" />;
      case 'cancellation':
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      case 'service':
        return <Scissors className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Salon Activity</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live operational event stream</p>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">Live Updates</span>
      </div>

      <div className="space-y-3.5">
        {SALON_ACTIVITIES.map((act) => (
          <div key={act.id} className="flex items-start gap-3 text-xs">
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5">
              {getIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-slate-900 truncate">{act.title}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
