'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
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

export default function ManagersSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="FOR FLOOR MANAGERS"
        title="Flawless Daily Operations. Shift Equilibrium."
        titleHighlight="Zero Floor Surprises."
        description="The operational cockpit for salon floor managers. Balance stylist chair loads, manage emergency call-outs, monitor wait times in the arrival lounge, and maintain impeccable service standards."
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Floor Manager Team Coordination"
        primaryCtaText="Launch Manager Floor Radar"
        primaryCtaHref="/manager"
        secondaryCtaText="See Staff Roster"
        secondaryCtaHref="/staff"
        breadcrumbs={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'Floor Managers' },
        ]}
        stats={[
          { label: 'Shift Resolution Speed', value: '<2 mins' },
          { label: 'Chair Idle Reduction', value: '-35%' },
          { label: 'Lounge Wait Time', value: '<4 mins' },
          { label: 'Team Morale Index', value: '96%' },
        ]}
      />

      {/* 2. Shift Balancing & Coverage (Clean Section) */}
      <CleanSection id="shift-balancing" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">STAFF EQUILIBRIUM</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Keep Chairs Moving Without Burnout
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Distribute new walk-ins and web bookings evenly across available specialists. Automatic break protection guarantees stylists get their designated lunch and rest periods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Emergency Shift Swapping',
              desc: 'Stylist calls in sick on Saturday? Reassign their chair bookings to available specialists in two taps without cancelling client appointments.',
            },
            {
              title: 'Dynamic Break Enforcement',
              desc: 'The booking engine automatically protects 30-minute meals and 10-minute sanitation buffers between chemical treatments.',
            },
            {
              title: 'Real-Time Floor Radar',
              desc: 'See exactly who is In-Chair, who is running behind schedule, and who has an opening for an arriving walk-in guest.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 space-y-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </CleanSection>

      {/* 3. Chair Occupancy Radar (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Salon Chair Occupancy Floor"
        overlayOpacity="cinematic"
        id="chair-radar"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">REAL-TIME FLOOR SUPERVISION</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            See Every Chair’s Status from One Tablet
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Monitor floor activity live. Spot bottlenecks before they happen, ensure stylists aren’t trapped past closing time, and keep the salon running like a Swiss watch.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/manager">
                Open Live Floor Manager Cockpit (/manager) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Operational Speed & Reception Support (Clean Section) */}
      <CleanSection id="reception-support" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">FRONT DESK HARMONY</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Bridge the Gap Between Reception and Chairs
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              When front desk checks a client in, the assigned stylist immediately receives a silent notification on their watch or chair tablet. Zero shouting across the salon floor.
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
              <span>Arrival Lounge Queue (Live)</span>
              <span className="text-emerald-600 font-bold">3 Arrived</span>
            </div>
            {[
              { client: 'Sophia Martinez (VIP)', status: 'Chair #1 Ready (Elena)', wait: '1m wait' },
              { client: 'Alexander Wright', status: 'Pre-Wash Basin #2', wait: '3m wait' },
              { client: 'Isabella Gomez', status: 'Reception Lounge (Beverage served)', wait: '4m wait' },
            ].map((row) => (
              <div
                key={row.client}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:bg-pink-50/50 hover:border-pink-200 transition-all duration-200 cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900">{row.client}</div>
                  <div className="text-[11px] text-slate-500">{row.status}</div>
                </div>
                <span className="font-mono text-slate-400">{row.wait}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Inventory & Reorder Management (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Salon Inventory & Product Management"
        overlayOpacity="cinematic"
        id="inventory"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">BACKBAR INVENTORY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Never Run Out of Essential Developer or Foils
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Aurevia alerts managers when critical backbar supplies hit low stock levels, keeping your stylists fully equipped for every appointment.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
