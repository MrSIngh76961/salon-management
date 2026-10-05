'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Scissors,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Heart,
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

export default function StylistsSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="FOR STYLISTS & SPECIALISTS"
        title="Focus on Your Hair Artistry. Let Technology Handle"
        titleHighlight="the Administration."
        description="A private, mobile-optimized workspace designed exclusively for stylists, colorists, and estheticians. View your chair queue, review color formulas, and track daily tips with complete privacy."
        imageSrc={PUBLIC_IMAGES.colorBalayageWork}
        imageAlt="Master Hair Stylist at Work"
        primaryCtaText="Open My Stylist Workspace"
        primaryCtaHref="/staff/dashboard"
        secondaryCtaText="Start Free Trial"
        secondaryCtaHref="/register"
        breadcrumbs={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'Stylists & Artists' },
        ]}
        stats={[
          { label: 'Stylist Happiness Index', value: '98%' },
          { label: 'Formula Recall Speed', value: 'Instant' },
          { label: 'Tip Payout Accuracy', value: '100%' },
          { label: 'Schedule Autonomy', value: 'Full' },
        ]}
      />

      {/* 2. Private Stylist Mobile Cockpit (Clean Section) */}
      <CleanSection id="private-cockpit" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">ARTIST AUTONOMY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Your Appointments. Your Notes. Zero Disruption.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Stylists love Aurevia because they can see their upcoming day at a glance on their phone before heading into the salon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: 'Personal Day Radar',
              desc: 'See exactly who is in your chair today, their desired styling outcome, and processing time buffers.',
            },
            {
              icon: Sparkles,
              title: 'One-Tap Lifecycle Control',
              desc: 'Tap "Start Service" when your guest sits down, and tap "Mark Completed" when styling is finished.',
            },
            {
              icon: ShieldCheck,
              title: 'Total Earnings Privacy',
              desc: 'Other stylists can never view your client formulas or commission totals. Your data is strictly private to your account.',
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

      {/* 3. Chemical Color Formulas Archive (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.clientConsultation}
        imageAlt="Stylist Reviewing Color Formulation"
        overlayOpacity="cinematic"
        id="formula-archive"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">COLOR BAR CONFIDENCE</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Accurate Formulations Saved Forever
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Never second-guess whether you used 20 volume or 30 volume, or which toner brand delivered that viral blonde. Aurevia date-stamps every single mixture right in your chair profile.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/staff/dashboard">
                Test Stylist Formula Vault (/staff/dashboard) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Personal Earnings, Commissions & Tips (Clean Section) */}
      <CleanSection id="earnings" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">TRANSPARENT REWARDS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Watch Your Earnings Grow with Every Service
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Know exactly what you earned at the end of each shift. Transparent commission tracking and instant tip logging give you total peace of mind on payday.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300 space-y-3"
          >
            <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>My Shift Snapshot (Elena Rostova)</span>
              <span className="text-emerald-600 font-bold">Today: 5 Clients</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-200 transition-colors">
                <div className="text-xl font-bold text-slate-900">₹6,800</div>
                <div className="text-[10px] text-slate-500">Service Commission</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-xl font-bold text-emerald-600">₹1,850</div>
                <div className="text-[10px] text-slate-500">Earned Tips (Direct)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Self-Service Availability & Leave Requests (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Stylist Team Culture & Leaves"
        overlayOpacity="cinematic"
        id="leaves"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">WORK-LIFE HARMONY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Request Time Off in Seconds
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Need next Saturday off for a wedding? Submit leave requests straight from your phone. Receive manager approval notifications instantly without awkward text messages.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
