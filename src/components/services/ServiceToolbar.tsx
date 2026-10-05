'use client';

import React from 'react';
import { Search, Filter, X, ArrowUpDown, ChevronDown } from 'lucide-react';

export type DurationFilterOption = 'all' | 'under-30' | '30-60' | '60-120' | '120-plus';
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'duration-asc'
  | 'duration-desc'
  | 'bookings-desc'
  | 'bookings-asc';

interface ServiceToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  categories: { id: string; name: string; slug: string }[];
  onCategoryChange: (slug: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedDuration: DurationFilterOption;
  onDurationChange: (val: DurationFilterOption) => void;
  selectedSort: SortOption;
  onSortChange: (val: SortOption) => void;
  onClearFilters: () => void;
  totalFiltered: number;
  totalCount: number;
}

export const ServiceToolbar: React.FC<ServiceToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedDuration,
  onDurationChange,
  selectedSort,
  onSortChange,
  onClearFilters,
  totalFiltered,
  totalCount,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    (selectedCategory !== 'all' && selectedCategory !== 'All Categories') ||
    selectedStatus !== 'All' ||
    selectedDuration !== 'all' ||
    selectedSort !== 'bookings-desc';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-4 mb-6">
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by service name, category, or staff..."
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
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Duration Filter */}
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => onDurationChange(e.target.value as DurationFilterOption)}
              className="appearance-none text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
            >
              <option value="all">All Durations</option>
              <option value="under-30">Under 30 min</option>
              <option value="30-60">30–60 min</option>
              <option value="60-120">60–120 min</option>
              <option value="120-plus">120+ min</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>

          {/* Sorting Dropdown */}
          <div className="relative">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-2xl py-2.5 pl-3.5 pr-8 hover:border-slate-300 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all cursor-pointer">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none text-xs sm:text-sm font-medium bg-transparent text-slate-700 focus:outline-none cursor-pointer pr-2"
              >
                <option value="bookings-desc">Sort by Most Booked</option>
                <option value="bookings-asc">Sort by Least Booked</option>
                <option value="price-asc">Sort by Price: Low to High</option>
                <option value="price-desc">Sort by Price: High to Low</option>
                <option value="duration-asc">Sort by Duration: Shortest</option>
                <option value="duration-desc">Sort by Duration: Longest</option>
                <option value="name-asc">Sort by Name (A-Z)</option>
                <option value="name-desc">Sort by Name (Z-A)</option>
              </select>
            </div>
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
          <span className="font-bold text-slate-900">{totalCount}</span> services
          {selectedCategory !== 'all' && (
            <span className="ml-1 text-brand-600 font-semibold">
              in category &quot;{selectedCategory}&quot;
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <div className="text-slate-400 hidden sm:block">
            Filters active • Auto-synced
          </div>
        )}
      </div>
    </div>
  );
};
