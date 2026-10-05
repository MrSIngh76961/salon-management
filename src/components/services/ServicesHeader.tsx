'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, FolderTree, Sparkles } from 'lucide-react';

interface ServicesHeaderProps {
  totalCount: number;
  activeCount: number;
  onAddService: () => void;
  onManageCategories: () => void;
  onExport: () => void;
}

export const ServicesHeader: React.FC<ServicesHeaderProps> = ({
  totalCount,
  activeCount,
  onAddService,
  onManageCategories,
  onExport,
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
            Services
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>{totalCount} Total Catalog</span>
          </span>
        </div>
        <p className="mt-1.5 text-sm text-slate-500 max-w-xl">
          Manage your salon services, pricing, duration and staff assignments.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center gap-2.5 sm:gap-3"
      >
        {/* Export CSV */}
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200 active:scale-95"
          title="Export Services to CSV spreadsheet"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Manage Categories */}
        <button
          onClick={onManageCategories}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:border-brand-200 hover:text-brand-600 transition-all duration-200 active:scale-95"
        >
          <FolderTree className="w-4 h-4 text-slate-500 group-hover:text-brand-600" />
          <span>Categories</span>
        </button>

        {/* + Add Service */}
        <button
          onClick={onAddService}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:via-pink-600 hover:to-purple-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Service</span>
        </button>
      </motion.div>
    </div>
  );
};
