'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Users,
  Calendar,
  Smile,
  TrendingUp,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { SOCIAL_PROOF_STATS, WHY_CHOOSE_US_POINTS } from '@/data/mockData';

export const IntroSection: React.FC = () => {
  const statIcons: Record<string, React.ElementType> = {
    Users,
    Calendar,
    Smile,
    TrendingUp,
  };

  return (
    <section className="py-24 bg-[#0B0C11] text-white relative overflow-hidden">
      {/* Soft gradient glows in background */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Checklist matching PNG */}
          <div className="lg:col-span-6 space-y-6">
            <SectionBadge variant="pink">WHY SALON OWNERS LOVE SALONPRO</SectionBadge>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Built for Salons. <br />
              <span className="text-gradient-pink">Designed for Growth.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              We engineered Aurevia alongside top salon directors and independent stylists to eliminate everyday administrative chaos and let you focus on your craft.
            </p>

            {/* Checklist with pink circular checkmarks */}
            <div className="space-y-4 pt-2">
              {WHY_CHOOSE_US_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF659F]" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Stat Cards matching PNG */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {SOCIAL_PROOF_STATS.map((stat, i) => {
                const Icon = statIcons[stat.icon] || Users;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4, borderColor: 'rgba(230, 57, 122, 0.4)' }}
                    className="bg-[#141623]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-pink-500/40 shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center group"
                  >
                    {/* Pink Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#FF659F]" />
                    </div>

                    {/* Stat Number */}
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                      {stat.value}
                    </div>

                    {/* Stat Label */}
                    <div className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                      {stat.label}
                    </div>

                    {/* Trend Pill */}
                    {stat.trend && (
                      <span className="mt-3 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {stat.trend}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
