'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, UserCheck, Check, ArrowRight } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { HOW_IT_WORKS_STEPS } from '@/data/mockData';

export const HowItWorks: React.FC = () => {
  const stepIcons = [Calendar, Bell, UserCheck, Check];

  return (
    <section id="how-it-works" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-3"
        >
          <SectionBadge variant="pink">HOW IT WORKS</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Simple Steps. Powerful Results.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Effortless setup for salon owners, intuitive booking for your clients.
          </p>
        </motion.div>

        {/* 4 Connected Steps Flow matching PNG */}
        <div className="relative">
          {/* Grid of Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = stepIcons[index];
              const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

              return (
                <motion.div
                  key={step.stepNumber}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex flex-col items-center text-center group p-4 rounded-3xl hover:bg-slate-50/60 transition-colors"
                >
                  {/* Step Icon Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D81B60] via-[#E6397A] to-[#FF659F] flex items-center justify-center text-white shadow-lg shadow-pink-500/25 mb-6 relative z-10 group-hover:shadow-pink-500/40 group-hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>

                  {/* Title: e.g. "1. Book" */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">
                    {step.stepNumber}. {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 max-w-xs leading-relaxed px-2">
                    {step.description}
                  </p>

                  {/* Connecting Dashed Arrow for Desktop between steps */}
                  {!isLast && (
                    <div className="hidden lg:flex items-center absolute top-12 left-[60%] w-[80%] pointer-events-none z-0">
                      <div className="flex-1 border-t-2 border-dashed border-pink-200" />
                      <div className="w-2 h-2 border-t-2 border-r-2 border-pink-300 rotate-45 -ml-1" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
