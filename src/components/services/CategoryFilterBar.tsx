'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/types/service';
import { Settings2, Plus, Sparkles } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: ServiceCategory[];
  selectedCategory: string; // 'all' or category slug or name
  onSelectCategory: (categorySlug: string) => void;
  onManageCategories: () => void;
  serviceCounts: Record<string, number>;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onManageCategories,
  serviceCounts,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none -mx-1 px-1">
        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
            (cat.slug === 'all' && selectedCategory === 'all') ||
            selectedCategory.toLowerCase() === cat.name.toLowerCase();

          const count = serviceCounts[cat.slug] ?? serviceCounts[cat.name] ?? cat.serviceCount;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`relative group shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              {/* Category Color Dot */}
              {cat.slug !== 'all' && (
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#ffffff' : cat.color || '#E6397A' }}
                />
              )}

              {cat.slug === 'all' && (
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-white' : 'text-brand-500'
                  }`}
                />
              )}

              <span>{cat.name}</span>

              {/* Count badge */}
              <span
                className={`ml-0.5 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/70'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Category Manager Action */}
      <div className="shrink-0 flex items-center justify-end">
        <button
          onClick={onManageCategories}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-brand-600 hover:bg-white border border-transparent hover:border-slate-200/70 transition-all duration-150"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Edit Categories</span>
        </button>
      </div>
    </div>
  );
};
