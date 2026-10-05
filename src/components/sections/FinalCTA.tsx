'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section id="final-cta" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container matching PNG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#C2185B] via-[#E6397A] to-[#F06292] p-8 sm:p-12 lg:p-14 shadow-2xl shadow-pink-600/30 text-white"
        >
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Salon Owner Image on Left (4 cols) matching PNG */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 bg-black/20">
                <Image
                  src="/images/cta_salon.jpg"
                  alt="Proud salon owner smiling in her modern salon"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Headline, Subtext, & CTA on Right (8 cols) matching PNG */}
            <div className="lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-3 h-3 text-pink-100" />
                  <span>Start Growing Today</span>
                </div>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  Ready to Transform Your Salon Business?
                </h2>

                <p className="text-base sm:text-lg text-pink-50 leading-relaxed font-normal">
                  Join hundreds of salon owners who save time, reduce no-shows and grow their business with Aurevia.
                </p>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex flex-col items-start md:items-end gap-2.5">
                <Button
                  variant="dark-solid"
                  size="lg"
                  href="/register"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  className="text-sm sm:text-base font-bold px-8 py-4 bg-[#12131C] hover:bg-[#1A1C28] text-white shadow-xl hover:scale-105"
                >
                  Start Free Trial
                </Button>

                <div className="flex items-center gap-1.5 text-xs text-pink-100 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
