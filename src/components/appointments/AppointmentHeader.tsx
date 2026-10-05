'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, CalendarDays, Sparkles, LayoutGrid, List } from 'lucide-react';

interface AppointmentHeaderProps {
  totalCount: number;
  onNewAppointment: () => void;
  onExport: () => void;
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  totalCount,
  onNewAppointment,
  onExport,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      {/* Title & Badge */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Appointments
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>{totalCount} Total Bookings</span>
          </span>
        </div>
        <p className="mt-1.5 text-sm text-slate-500 max-w-xl">
          Coordinate client bookings, stylist assignments, check-ins, and service status lifecycles.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center gap-2.5 sm:gap-3"
      >
        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
          <button
            onClick={() => onViewModeChange('table')}
            className={`p-1.5 rounded-xl transition-all ${
              viewMode === 'table'
                ? 'bg-brand-50 text-brand-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('cards')}
            className={`p-1.5 rounded-xl transition-all ${
              viewMode === 'cards'
                ? 'bg-brand-50 text-brand-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Export CSV */}
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200 active:scale-95"
          title="Export Appointments CSV"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* + New Appointment */}
        <button
          onClick={onNewAppointment}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:via-pink-600 hover:to-purple-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Appointment</span>
        </button>
      </motion.div>
    </div>
  );
};
