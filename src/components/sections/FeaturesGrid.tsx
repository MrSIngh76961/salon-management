'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck2,
  CalendarDays,
  Users,
  UserCheck,
  BellRing,
  CreditCard,
  BarChart4,
  Building2,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { FEATURES_GRID_ITEMS } from '@/data/mockData';

export const FeaturesGrid: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    CalendarCheck2,
    CalendarDays,
    Users,
    UserCheck,
    BellRing,
    CreditCard,
    BarChart4,
    Building2,
    PackageCheck,
    ShieldCheck,
  };

  return (
    <section className="py-24 bg-[#FAF9FB] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">COMPREHENSIVE CAPABILITIES</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Built for Modern Salons, Barbershops & Spas
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every operational tool required to scale from a single boutique chair to an enterprise multi-location beauty franchise.
          </p>
        </div>

        {/* 10 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_GRID_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-pink-300 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(230,57,122,0.18)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] group-hover:bg-[#E6397A] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 transition-transform group-hover:rotate-6 duration-300" />
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6397A] bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-[#E6397A] transition-colors">
                  <span>Learn more</span>
                  <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
