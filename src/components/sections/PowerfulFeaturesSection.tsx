'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Users, BarChart3, ArrowRight } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { QUICK_FEATURES } from '@/data/mockData';

export const PowerfulFeaturesSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Calendar,
    Bell,
    Users,
    BarChart2: BarChart3,
  };

  return (
    <section id="features" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">POWERFUL FEATURES</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Everything You Need to Run Your Salon Smoothly
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Designed specifically for modern salons, spas, and independent beauty studios to streamline daily workflow.
          </p>
        </div>

        {/* 4 Feature Cards matching reference PNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Calendar;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-[#FCFCFD] hover:bg-white rounded-2xl p-7 border border-slate-100 hover:border-pink-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_-5px_rgba(230,57,122,0.12)] transition-all duration-300"
              >
                {/* Top Icon with soft pink backdrop */}
                <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100/80 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#E6397A] group-hover:border-[#E6397A] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#E6397A] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-5 pt-4 border-t border-slate-100/80 flex items-center text-xs font-semibold text-slate-400 group-hover:text-[#E6397A] transition-colors">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
