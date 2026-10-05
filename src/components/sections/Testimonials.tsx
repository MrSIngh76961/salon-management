'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { TESTIMONIALS_DATA } from '@/data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <SectionBadge variant="pink">SALON STORIES</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Loved by <AnimatedCounter value="500+" /> Salon Owners & Beauty Entrepreneurs
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Real salon businesses scaling revenue, protecting their stylists’ time, and giving clients exceptional care.
          </p>
        </motion.div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#FAF9FB] hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-pink-400/50 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 group-hover:scale-105 transition-transform origin-left">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-pink-200 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal group-hover:text-slate-900 transition-colors">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div>
                {/* Metric pill */}
                <div className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#E6397A] bg-pink-50 border border-pink-100 px-3 py-1 rounded-full group-hover:bg-pink-100 group-hover:border-pink-200 transition-colors">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.metrics}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-100 group-hover:ring-pink-400 group-hover:scale-105 transition-all duration-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 group-hover:text-[#E6397A] transition-colors">
                      {t.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                    <p className="text-[11px] text-slate-400">{t.salonName} • {t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
