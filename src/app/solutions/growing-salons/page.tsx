'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Building2,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Layers,
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

export default function GrowingSalonsSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="FOR GROWING SALONS & FRANCHISES"
        title="Scale from One Flagship Boutique to a"
        titleHighlight="Nationwide Salon Empire."
        description="Growing from 1 to 5 or 20 locations requires centralized governance. Aurevia delivers enterprise multi-tenancy, cross-branch client profiles, unified gift cards, and franchise revenue benchmarking."
        imageSrc={PUBLIC_IMAGES.modernHairStudio}
        imageAlt="Multi-Location Salon Franchise Flagship"
        primaryCtaText="Explore Franchise Architecture"
        primaryCtaHref="/register"
        secondaryCtaText="Speak with Solutions Architect"
        secondaryCtaHref="/contact"
        breadcrumbs={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'Growing Salons & Franchises' },
        ]}
        stats={[
          { label: 'Branches Supported', value: 'Unlimited' },
          { label: 'HQ Rollup Speed', value: 'Real-Time' },
          { label: 'Cross-Branch Sync', value: '<100ms' },
          { label: 'Franchise SLA', value: '99.99%' },
        ]}
      />

      {/* 2. Centralized Multi-Branch Governance (Clean Section) */}
      <CleanSection id="centralized-governance" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">MULTI-TENANT GOVERNANCE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            One Master Account. Complete Branch Independence.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Maintain strict brand consistency across all locations while allowing branch managers to control their local chair schedules, pricing tiers, and shift rosters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: 'Location Switching with 1-Click',
              desc: 'Franchise executives can switch between SoHo, Brooklyn, London, or Mumbai studios in milliseconds from a single login.',
            },
            {
              icon: Layers,
              title: 'Standardized Service Menus',
              desc: 'Push signature haircut names, service durations, and brand policies across all branches simultaneously.',
            },
            {
              icon: ShieldCheck,
              title: 'Isolated Staff Permissions',
              desc: 'Stylists and receptionists only see data for their home branch, preventing cross-branch data confusion.',
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

      {/* 3. Shared Client Profiles & Universal Gift Cards (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Cross Branch Salon Studio Stations"
        overlayOpacity="cinematic"
        id="shared-profiles"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">GLOBAL CLIENT PORTABILITY</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Seamless Continuity Wherever Clients Travel
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            When a VIP client visits your uptown branch instead of downtown, their formula archive, allergy notes, and loyalty point balances are instantly accessible.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/contact">
                Discuss Enterprise Rollout with Concierge →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Global HQ Analytics & Franchise Benchmarks (Clean Section) */}
      <CleanSection id="hq-analytics" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">FRANCHISE BENCHMARKS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Compare Studio Performance Across Cities
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Which location has the highest chair utilization? Which studio leads in retail product upsells? Benchmark your branches and replicate best practices across the network.
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
              <span>Franchise Multi-Tenant Rollup (Live)</span>
              <span className="text-emerald-600 font-bold">5 Studios Online</span>
            </div>
            {[
              { name: 'Flagship SoHo Studio (NY)', chairs: '8 Chairs', rev: '₹1,96,650', util: '94%' },
              { name: 'Upper East Side Suite (NY)', chairs: '6 Chairs', rev: '₹1,48,200', util: '89%' },
              { name: 'Beverly Hills Studio (LA)', chairs: '10 Chairs', rev: '₹2,64,000', util: '96%' },
            ].map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:bg-pink-50/50 hover:border-pink-200 transition-all duration-200 cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900">{b.name}</div>
                  <div className="text-[11px] text-slate-500">{b.chairs} • {b.util} utilization</div>
                </div>
                <div className="font-bold text-slate-900">{b.rev}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Scalable Cloud Architecture (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Scalable Salon Cloud Architecture"
        overlayOpacity="cinematic"
        id="cloud-architecture"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">ENTERPRISE CLOUD</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Enterprise Grade Security with SOC2 & 99.99% Uptime
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Automatic multi-region database backups, end-to-end encryption for credit card data, and dedicated enterprise support guarantees seamless performance during peak holiday rush hours.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
