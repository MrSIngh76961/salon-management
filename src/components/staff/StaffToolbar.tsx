'use client';

import React from 'react';
import { Search, Filter, X, ChevronDown, Check } from 'lucide-react';
import { StaffRole, StaffStatus, StaffAvailability } from '@/types/staff';
import { ALL_STAFF_ROLES } from '@/data/staffManagement';

interface StaffToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedRole: string;
  onRoleChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (val: string) => void;
  onClearFilters: () => void;
  totalFiltered: number;
  totalCount: number;
}

export const StaffToolbar: React.FC<StaffToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  selectedAvailability,
  onAvailabilityChange,
  onClearFilters,
  totalFiltered,
  totalCount,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedRole !== 'All' ||
    selectedStatus !== 'All' ||
    selectedAvailability !== 'All';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-4">
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, phone, role..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 pl-10 pr-9 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Role Filter */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-[#E6397A] cursor-pointer transition-colors"
            >
              <option value="All">All Roles</option>
              {ALL_STAFF_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-[#E6397A] cursor-pointer transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
          </div>

          {/* Availability Filter */}
          <div className="relative">
            <select
              value={selectedAvailability}
              onChange={(e) => onAvailabilityChange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-[#E6397A] cursor-pointer transition-colors"
            >
              <option value="All">All Availability</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy (In Session)</option>
              <option value="On Break">On Break</option>
              <option value="On Leave">On Leave</option>
              <option value="Offline">Offline</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold text-[#E6397A] hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Indicator & Active Badges Row */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-slate-500 font-medium">
          Showing <strong className="text-slate-800 font-bold">{totalFiltered}</strong> of{' '}
          <strong className="text-slate-800 font-bold">{totalCount}</strong> team members
        </span>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Active filters:</span>
            {selectedRole !== 'All' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-pink-50 text-[#E6397A] border border-pink-100 px-2 py-0.5 rounded-lg">
                Role: {selectedRole}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-pink-900"
                  onClick={() => onRoleChange('All')}
                />
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg">
                Status: {selectedStatus}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-slate-900"
                  onClick={() => onStatusChange('All')}
                />
              </span>
            )}
            {selectedAvailability !== 'All' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-lg">
                Availability: {selectedAvailability}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-emerald-900"
                  onClick={() => onAvailabilityChange('All')}
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
