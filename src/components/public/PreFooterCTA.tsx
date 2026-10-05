'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { PUBLIC_IMAGES } from '@/data/publicImages';

interface PreFooterCTAProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
}

export const PreFooterCTA: React.FC<PreFooterCTAProps> = ({
  title = 'Ready to Elevate Your Salon Business?',
  subtitle = 'Join 1,200+ elite salons and independent studios operating on Aurevia. Start your 14-day risk-free trial today — zero setup fee, no credit card required.',
  imageSrc = PUBLIC_IMAGES.luxuriousLoungeCta,
}) => {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#0B0C11] text-white">
      {/* Full-width Background Image with Luxury Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={imageSrc}
          alt="Luxury Salon Interior"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.38] contrast-[1.2] transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C11] via-[#0B0C11]/85 to-[#0B0C11]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0C11_95%)] opacity-80" />

        {/* Ambient Brand Color Flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gradient opacity-15 rounded-full blur-[140px] animate-ambient-breathe" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Rating pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs text-slate-200 mb-6 cursor-default hover:border-pink-500/40 hover:bg-white/15 transition-all"
        >
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-white">4.9/5 Rating</span>
          <span className="text-slate-400">•</span>
          <span>Over 250,000+ Appointments Booked Monthly</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button
            variant="primary"
            size="lg"
            href="/register"
            icon={<ArrowRight className="w-4 h-4 ml-0.5" />}
            className="shadow-2xl shadow-pink-500/30 text-sm sm:text-base font-semibold px-8 hover:scale-105 active:scale-95 transition-transform"
          >
            Start Free 14-Day Trial
          </Button>

          <Button
            variant="glass-dark"
            size="lg"
            href="/login"
            className="text-sm sm:text-base text-slate-200 hover:text-white border-white/20 px-8 hover:scale-105 active:scale-95 transition-transform"
          >
            Explore Live Demo
          </Button>
        </motion.div>

        {/* Risk-free badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            15-minute quick migration
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Cancel anytime with 1-click
          </span>
        </div>
      </div>
    </section>
  );
};
