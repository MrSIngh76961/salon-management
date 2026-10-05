'use client';

import React from 'react';
import { Plus, Download, Users } from 'lucide-react';

interface StaffHeaderProps {
  onAddStaff: () => void;
  onExport: () => void;
  totalCount: number;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({
  onAddStaff,
  onExport,
  totalCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)]">
      {/* Title & Description */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#E6397A] flex items-center justify-center font-bold text-xs shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Staff Management
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-[#E6397A]">
            {totalCount} Team Members
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
          Manage your team, weekly shift schedules, assigned salon treatments, and real-time floor availability.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={onAddStaff}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gradient hover:brightness-105 text-white text-xs font-bold shadow-md shadow-pink-500/25 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff</span>
        </button>
      </div>
    </div>
  );
};
