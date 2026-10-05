'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Bell,
  Users,
  BarChart3,
  ArrowRight,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Star,
  Clock,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

export const HeroSection: React.FC = () => {
  const trustFeatures = [
    { label: '24/7 Online Booking', icon: CalendarDays },
    { label: 'Automated Reminders', icon: Bell },
    { label: 'Staff Management', icon: Users },
    { label: 'Reports & Analytics', icon: BarChart3 },
  ];

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 overflow-hidden bg-[#0B0C11] text-white flex items-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#E6397A]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 space-y-6"
          >
            {/* Small SaaS Badge */}
            <div>
              <SectionBadge variant="pink" className="text-[10px] sm:text-xs">
                SMART SCHEDULING FOR BUSY SALON OWNERS
              </SectionBadge>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.12] text-white"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Manage Appointments. <br />
              Delight Clients. <br />
              <span className="text-gradient-pink font-semibold">
                Grow Your Salon.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              The all-in-one scheduling platform built for salons and beauty professionals.
              Eliminate phone tag, automate reminders, and fill your chairs on autopilot.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                href="#pricing"
                icon={<ArrowRight className="w-4 h-4 ml-0.5" />}
                className="shadow-xl shadow-pink-500/25 text-sm sm:text-base font-semibold"
              >
                Start Free Trial
              </Button>

              <Button
                variant="glass-dark"
                size="lg"
                href="#calendar"
                icon={<Calendar className="w-4 h-4 text-slate-300" />}
                iconPosition="left"
                className="text-sm sm:text-base text-slate-200 hover:text-white"
              >
                Book a Demo
              </Button>
            </div>

            {/* Trust / Benefit indicators row matching PNG */}
            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2">
                {trustFeatures.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 group cursor-default"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-pink-500/40 group-hover:bg-pink-500/10 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-3.5 h-3.5 text-[#FF659F]" />
                      </div>
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame with soft glow border and dark gradient vignette */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-[#12131C] aspect-[4/3] sm:aspect-[4/3] group transition-all duration-500 hover:border-pink-500/30">
                <Image
                  src="/images/hero_salon.jpg"
                  alt="Hairstylist consulting client at modern luxury salon"
                  fill
                  priority
                  className="object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 550px"
                />

                {/* Dark luxury gradient overlays for seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C11] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C11]/50 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none group-hover:ring-pink-500/20 transition-all duration-500" />
              </div>

              {/* Floating Element 1: New Booking Notification (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="absolute -top-6 -left-4 sm:-left-8 bg-[#141622]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-2xl shadow-black/70 max-w-[270px] z-20 animate-float-gentle cursor-pointer hover:border-pink-500/50 hover:shadow-pink-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                      alt="Sarah Jenkins"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E6397A]/40"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#141622]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-slate-200 truncate">
                        Sarah Jenkins
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      Balayage & Blowdry • 2:30 PM
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-[#FF659F]">
                      <Clock className="w-2.5 h-2.5" />
                      <span>Starts in 45 mins</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 2: Revenue & Stats Card (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="absolute -bottom-6 -right-3 sm:-right-6 bg-[#141622]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/80 max-w-[260px] z-20 animate-float-reverse cursor-pointer hover:border-pink-500/50 hover:shadow-pink-500/20 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Today&apos;s Revenue
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <TrendingUp className="w-3 h-3" />
                    +24.5%
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    <AnimatedCounter value="$4,820" />
                  </span>
                  <span className="text-xs text-slate-400">/ 28 clients</span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF659F]" />
                    <AnimatedCounter value="94%" /> Chair Utilization
                  </span>
                  <span className="text-slate-400">4 Stylists</span>
                </div>
              </motion.div>

              {/* Floating Element 3: Top Stylist Rating Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.08 }}
                className="hidden sm:flex absolute top-1/2 -right-8 -translate-y-1/2 bg-[#12131C]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-xl items-center gap-2 z-20 cursor-pointer hover:border-pink-500/40 hover:bg-[#181a26] transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Star className="w-3 h-3 text-[#FF659F] fill-current" />
                </div>
                <span className="text-xs font-semibold text-white">4.9/5.0</span>
                <span className="text-[11px] text-slate-400">Top Salon Rating</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
