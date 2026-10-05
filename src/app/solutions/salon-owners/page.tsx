'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Crown,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { BackgroundImageSection } from '@/components/public/BackgroundImageSection';
import { CleanSection } from '@/components/public/CleanSection';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { PreFooterCTA } from '@/components/public/PreFooterCTA';
import { PublicFooter } from '@/components/public/PublicFooter';
import { PUBLIC_IMAGES } from '@/data/publicImages';

export default function SalonOwnersSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="FOR SALON OWNERS"
        title="Complete Command of Your Revenue, Staff &"
        titleHighlight="Brand Reputation."
        description="Transform from a stressed studio manager into a strategic salon entrepreneur. Get high-level cash flow metrics, chair yield analytics, and multi-branch governance from any device."
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Salon Owner Strategic Management"
        primaryCtaText="Explore Owner Cockpit"
        primaryCtaHref="/dashboard"
        secondaryCtaText="Start Free Trial"
        secondaryCtaHref="/register"
        breadcrumbs={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'Salon Owners' },
        ]}
        stats={[
          { label: 'Owner Time Saved', value: '18 hrs/wk' },
          { label: 'Revenue Growth', value: '+28%' },
          { label: 'Payroll Speed', value: '<10 mins' },
          { label: 'No-Show Rate', value: '<1.2%' },
        ]}
      />

      {/* 2. Executive Revenue Snapshot (Clean Section) */}
      <CleanSection id="executive-snapshot" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">FINANCIAL VISIBILITY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Real-Time Cash Flow at Your Fingertips
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            No more waiting until the end of the month to understand whether your salon is profitable. Track daily sales velocity, unpaid invoices, and chair margins instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: DollarSign,
              title: 'Real-Time Revenue Ticker',
              desc: 'Monitor gross sales, POS card settlements, and digital deposits as they clear throughout the day.',
            },
            {
              icon: BarChart3,
              title: 'Treatment Margin Analysis',
              desc: 'Identify which services yield the highest return after factoring in backbar product and specialist commissions.',
            },
            {
              icon: ShieldCheck,
              title: 'GST & Tax Export Ready',
              desc: 'One-click tax documentation export designed for your accountants and financial compliance.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#E6397A]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. Chair Yield & Overhead Optimization (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Salon Styling Chairs and Overhead Efficiency"
        overlayOpacity="cinematic"
        id="chair-yield"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">CHAIR EFFICIENCY</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Turn Idle Floor Space into High-Yield Revenue
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every unoccupied chair represents lost gross margin. Aurevia optimizes schedule density and fills mid-week lulls automatically with targeted VIP re-engagement sequences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
            {[
              { label: 'Chair Utilization', val: '94% Average', desc: 'Up from 68% industry benchmark.' },
              { label: 'Average Ticket', val: '+24.5% Lift', desc: 'Through automated service add-on suggestions.' },
              { label: 'Deposit Security', val: '100% Protected', desc: 'Zero loss from last-minute cancellations.' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-1 group-hover:text-pink-300 transition-colors">{stat.label}</div>
                <div className="text-2xl font-bold text-white group-hover:text-pink-100 transition-colors">{stat.val}</div>
                <p className="text-xs text-slate-300 mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Staff Payroll & Commission Controls (Clean Section) */}
      <CleanSection id="staff-payroll" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">PAYROLL ACCURACY</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Transparent Commissions That Motivate Artists
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Say goodbye to end-of-month calculator marathons and commission disputes. Aurevia computes tiered commission rates, product bonuses, and tips automatically with complete auditability.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Tiered percentage splits based on monthly revenue milestones</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Deduction of backbar product costs prior to commission split</span>
              </div>
            </div>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/staff">
                  View Staff Management Suite (/staff) →
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300 space-y-4"
          >
            <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Owner Payroll Preview (March Roster)</span>
              <span className="text-emerald-600 font-bold">Audit Clean</span>
            </div>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Elena Rostova', role: 'Master Stylist', sales: '₹1,24,000', comp: '₹68,200', tips: '₹14,500' },
                { name: 'Julian Reed', role: 'Senior Stylist', sales: '₹98,500', comp: '₹49,250', tips: '₹11,200' },
                { name: 'Ava Taylor', role: 'Esthetician', sales: '₹76,000', comp: '₹38,000', tips: '₹8,400' },
              ].map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-pink-50/50 hover:border-pink-200 transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-[11px] text-slate-500">Gross: {s.sales} • Tips: {s.tips}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{s.comp}</div>
                    <div className="text-[10px] text-slate-400">Total Net Payout</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Autonomous Operations & Peace of Mind (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.modernHairStudio}
        imageAlt="Modern Autonomous Salon Operations"
        overlayOpacity="cinematic"
        id="autonomy"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">PEACE OF MIND</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Take a Vacation While Your Salon Thrives
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Aurevia’s enterprise security, role isolation, and cloud reliability keep your business running smoothly whether you’re on the styling floor or on an overseas holiday.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white text-sm font-bold shadow-xl shadow-pink-500/25 hover:opacity-95 transition-opacity"
              >
                <span>Start 14-Day Owner Trial — No Credit Card</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
