'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Clock,
  PieChart,
  Users,
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

export default function AnalyticsReportsPublicPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Analytics Hero (Background Image) */}
      <PublicPageHero
        badge="INTELLIGENCE & REPORTING SUITE"
        title="Clarity Over Every Rupee, Chair, and Service."
        titleHighlight="Grow Predictably."
        description="Stop guessing about your salon’s financial health. Track real-time revenue, top stylist contributions, high-margin treatments, and chair utilization with live interactive BI dashboards."
        imageSrc={PUBLIC_IMAGES.businessAnalyticsDesk}
        imageAlt="Salon Business Financial Analytics"
        primaryCtaText="Open Reports Dashboard"
        primaryCtaHref="/reports"
        secondaryCtaText="Explore Billing Suite"
        secondaryCtaHref="/billing"
        breadcrumbs={[{ label: 'Analytics & Reports' }]}
        stats={[
          { label: 'Revenue Accuracy', value: '100%' },
          { label: 'Export Formats', value: 'CSV / PDF' },
          { label: 'Chair Yield Tracking', value: 'Real-Time' },
          { label: 'Average Growth', value: '+24.5%' },
        ]}
      />

      {/* 2. Business Dashboard (Clean Section) */}
      <CleanSection id="business-dashboard" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">FINANCIAL VITALS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            A Live Pulse on Salon Performance
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Understand daily takings, unpaid deposits, refunds, and POS payment methods in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Gross Revenue', val: '₹1,96,650', trend: '+24.5% MoM', icon: DollarSign, color: 'text-[#E6397A] bg-pink-50' },
            { label: 'Booking Completion', val: '89.9%', trend: '98 of 109 completed', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Peak Chair Occupancy', val: '94%', trend: 'Saturday 11am-4pm', icon: Clock, color: 'text-blue-600 bg-blue-50' },
            { label: 'Average Ticket Value', val: '₹3,450', trend: '+14% retail attached', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 space-y-2 group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#E6397A] transition-colors">{item.val}</div>
                <div className="text-xs font-bold text-slate-800">{item.label}</div>
                <div className="text-[11px] text-slate-500">{item.trend}</div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. Revenue & Booking Analytics (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Salon Revenue and Chair Yield"
        overlayOpacity="cinematic"
        id="revenue-analytics"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">TREATMENT MARGIN RADAR</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Identify Your Most Profitable Services
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Which service drives the highest net margin per chair-hour? Aurevia breaks down revenue by category — Balayage, Facials, Cuts, and Extensions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
            {[
              {
                tag: 'Top Earner',
                title: 'Balayage & Coloring',
                desc: '₹68,500 monthly (34.8% of gross revenue). 120m average duration.',
              },
              {
                tag: 'Fastest Turnover',
                title: 'Precision Haircuts',
                desc: '₹42,800 monthly. 45m duration with 92% rebooking rate.',
              },
              {
                tag: 'High Margin Add-on',
                title: 'Hydrafacial Deluxe',
                desc: '₹32,000 monthly. 78% net profit margin after product cost.',
              },
            ].map((tm, idx) => (
              <motion.div
                key={tm.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-1 group-hover:text-pink-300 transition-colors">{tm.tag}</div>
                <div className="text-base font-bold text-white group-hover:text-pink-100 transition-colors">{tm.title}</div>
                <p className="text-xs text-slate-300 mt-2">{tm.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Staff & Service Performance (Clean Section) */}
      <CleanSection id="staff-performance" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">TALENT BENCHMARKING</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Reward High-Performing Specialists Fairly
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Compare completion rates, average client review scores, retail attachment percentages, and gross revenue generated per specialist.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/reports">
                  Open Full Reports & Analytics (/reports) →
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
            className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300 space-y-3"
          >
            <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Top Stylist Rankings (This Month)</span>
              <span className="text-[#E6397A]">Live Ranks</span>
            </div>
            {[
              { rank: '#1', name: 'Elena Rostova', rev: '₹68,500', count: '48 clients', rating: '5.0 ★' },
              { rank: '#2', name: 'Julian Reed', rev: '₹54,200', count: '42 clients', rating: '4.9 ★' },
              { rank: '#3', name: 'Ava Taylor', rev: '₹41,950', count: '31 clients', rating: '4.8 ★' },
            ].map((st) => (
              <div
                key={st.name}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:bg-pink-50/50 hover:border-pink-200 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#E6397A] font-mono">{st.rank}</span>
                  <div>
                    <div className="font-bold text-slate-900">{st.name}</div>
                    <div className="text-[11px] text-slate-500">{st.count} • {st.rating}</div>
                  </div>
                </div>
                <div className="font-bold text-slate-900 text-right">{st.rev}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Customer Growth & Retention (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Salon Client Growth Trends"
        overlayOpacity="cinematic"
        id="growth-trends"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">COHORT RETENTION</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Track New vs Returning Client Acquisition
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Monitor whether marketing campaigns bring in lasting repeat guests or high-churn one-time discounts. Optimize your promotional spend with hard data.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Reports & Export (Clean Section) */}
      <CleanSection id="exports" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">ONE-CLICK EXPORT</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Export to CSV, Excel, and Audit-Ready PDF
          </h2>
          <p className="text-base text-slate-600">
            Give your accountant exactly what they need. Export date-filtered sales sheets with tax breakdowns, POS reconciliation, and tip disbursement records in seconds.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: FileSpreadsheet, label: 'CSV Financial Roster', color: 'text-emerald-600' },
              { icon: FileSpreadsheet, label: 'Excel Staff Commissions', color: 'text-emerald-600' },
              { icon: FileText, label: 'PDF Tax Summary', color: 'text-rose-600' },
            ].map((pill) => {
              const PIcon = pill.icon;
              return (
                <motion.span
                  key={pill.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-white hover:border-pink-200 border border-transparent shadow-xs hover:shadow-md text-xs font-bold text-slate-800 transition-all cursor-pointer"
                >
                  <PIcon className={`w-4 h-4 ${pill.color}`} />
                  {pill.label}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </CleanSection>

      {/* 7. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
