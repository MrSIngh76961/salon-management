'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Scissors,
  CheckCircle2,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';

export const HomeValueProp: React.FC = () => {
  const valueProps = [
    {
      icon: CalendarDays,
      title: 'Eliminate Booking Friction',
      description:
        'Self-service 24/7 web booking captures clients anytime without front-desk interruptions or phone tag.',
      highlight: 'Zero double-bookings',
    },
    {
      icon: Users,
      title: 'Protect Stylist Schedules',
      description:
        'Custom shift rules, staggered breaks, and buffer times keep chairs operating smoothly without staff burnout.',
      highlight: '94% chair utilization',
    },
    {
      icon: Sparkles,
      title: 'Personalized VIP Care',
      description:
        'Store client formula histories, allergy records, and styling preferences for unforgettable bespoke service.',
      highlight: '38% higher retention',
    },
    {
      icon: TrendingUp,
      title: 'Predictable Revenue Growth',
      description:
        'Automated deposit collections, no-show fees, and point-of-sale reporting turn unpredictable weeks into stable cash flow.',
      highlight: '+24% average ticket',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9FB] text-slate-900 relative overflow-hidden border-b border-slate-200/60">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <SectionBadge variant="pink">VALUE PROPOSITION</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Engineered for High-End Salons. <br />
            <span className="text-gradient-pink font-semibold">
              Built for Effortless Scalability.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Aurevia replaces disconnected apps, paper appointment books, and clunky legacy software with one cohesive luxury operating system.
          </p>
        </motion.div>

        {/* 4 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-400/50 transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-pink-500/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#E6397A]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#E6397A] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#E6397A] group-hover:translate-x-1 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{card.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
