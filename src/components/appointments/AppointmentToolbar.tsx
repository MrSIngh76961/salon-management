'use client';

import React from 'react';
import { Search, X, ChevronDown, Filter, Calendar } from 'lucide-react';

interface AppointmentToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDateFilter: string;
  onDateFilterChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedStaff: string;
  staffList: { id: string; name: string }[];
  onStaffChange: (val: string) => void;
  onClearFilters: () => void;
  totalFiltered: number;
  totalCount: number;
}

export const AppointmentToolbar: React.FC<AppointmentToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDateFilter,
  onDateFilterChange,
  selectedStatus,
  onStatusChange,
  selectedStaff,
  staffList,
  onStaffChange,
  onClearFilters,
  totalFiltered,
  totalCount,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDateFilter !== 'all' ||
    selectedStatus !== 'All' ||
    selectedStaff !== 'All';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-4 mb-6">
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer, phone, stylist, or service..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 pl-10 pr-9 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Filter */}
          <div className="relative">
            <select
              value={selectedDateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="appearance-none text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="all">All Dates</option>
              <option value="today">Today (Sep 24)</option>
              <option value="tomorrow">Tomorrow (Sep 25)</option>
              <option value="past">Past Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked-in">Checked-in</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No-show">No-show</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Staff Filter */}
          <div className="relative">
            <select
              value={selectedStaff}
              onChange={(e) => onStaffChange(e.target.value)}
              className="appearance-none text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="All">All Stylists</option>
              {staffList.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Filter Feedback Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <div>
          Showing{' '}
          <span className="font-bold text-slate-900">{totalFiltered}</span> of{' '}
          <span className="font-bold text-slate-900">{totalCount}</span> appointments
        </div>

        {hasActiveFilters && (
          <div className="text-slate-400 hidden sm:block">
            Filter active • Auto-synced
          </div>
        )}
      </div>
    </div>
  );
};
