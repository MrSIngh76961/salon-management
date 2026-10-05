'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Crown,
  Briefcase,
  Building2,
  Scissors,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
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

export default function SolutionsOverviewPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="TAILORED OPERATIONAL ARCHITECTURE"
        title="Purpose-Built Solutions for Every Role in Your"
        titleHighlight="Salon Enterprise."
        description="Whether you own a luxury flagship, oversee daily chair rotation as floor manager, welcome arriving guests at reception, or style hair at the station — Aurevia delivers the exact tools you need."
        imageSrc={PUBLIC_IMAGES.heroInterior}
        imageAlt="Salon Solutions Overview"
        primaryCtaText="Get Started with Aurevia"
        primaryCtaHref="/register"
        secondaryCtaText="Explore Personas"
        secondaryCtaHref="#overview"
        breadcrumbs={[{ label: 'Solutions' }]}
        stats={[
          { label: 'Specialized Roles', value: '5 Persona Suites' },
          { label: 'Role Security', value: 'Strict RBAC' },
          { label: 'Floor Speed', value: '+40% Faster' },
          { label: 'Multi-Location Support', value: 'Unlimited' },
        ]}
      />

      {/* 2. Solutions Overview (Clean Section) */}
      <CleanSection id="overview" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">PERSONA-DRIVEN WORKFLOWS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Select Your Role to See Your Tailored Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            No bloated screens or unnecessary clutter. Each member of your salon ecosystem gets a specialized cockpit designed for their exact day-to-day responsibilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              role: 'Salon Owners',
              icon: Crown,
              desc: 'Macro revenue visibility, multi-branch growth, subscription management, and complete payroll control.',
              href: '/solutions/salon-owners',
            },
            {
              role: 'Floor Managers',
              icon: Briefcase,
              desc: 'Chair occupancy oversight, shift coverage balance, emergency schedule substitutions, and inventory.',
              href: '/solutions/managers',
            },
            {
              role: 'Receptionists',
              icon: Building2,
              desc: 'High-speed check-ins, walk-in appointment creation, POS payment processing, and arrival lounge queues.',
              href: '/solutions/receptionists',
            },
            {
              role: 'Stylists & Specialists',
              icon: Scissors,
              desc: 'Private daily appointment feeds, color formula archives, tip counters, and personal leave requests.',
              href: '/solutions/stylists',
            },
            {
              role: 'Growing Franchises',
              icon: TrendingUp,
              desc: 'Centralized brand standards, cross-location gift card balances, and multi-tenant reporting.',
              href: '/solutions/growing-salons',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#E6397A]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">{item.role}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6397A] group-hover:underline"
                  >
                    <span>View {item.role} Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. For Salon Owners (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Salon Owner Strategic Management"
        overlayOpacity="cinematic"
        id="owners"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionBadge variant="pink">FOR SALON OWNERS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
              Lead with Financial Clarity and Complete Peace of Mind
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Step away from micromanaging the front desk. Aurevia gives owners real-time cash flow metrics, chair yield analyses, and staff commission approvals from anywhere in the world.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/solutions/salon-owners">
                  Explore Owner Cockpit (/dashboard) →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </BackgroundImageSection>

      {/* 4. For Managers (Clean Section) */}
      <CleanSection id="managers" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionBadge variant="pink">FOR FLOOR MANAGERS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Maintain Floor Equilibrium During Saturday Rushes
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Supervise chair availability, shift handovers, and emergency room bookings without touching sensitive salon financial settings or owner-only subscriptions.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/solutions/managers">
                  Explore Manager Suite (/manager) →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. For Receptionists (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Salon Front Desk Receptionist"
        overlayOpacity="cinematic"
        id="reception"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionBadge variant="pink">FOR RECEPTIONISTS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
              Lightning Check-ins and Stress-Free Checkouts
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Welcome guests warmly, notify assigned stylists in one tap, and generate itemized GST receipts with multiple split-payment options.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/solutions/receptionists">
                  Explore Reception Desk (/reception) →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </BackgroundImageSection>

      {/* 6. For Stylists (Clean Section) */}
      <CleanSection id="stylists" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionBadge variant="pink">FOR STYLISTS & SPECIALISTS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Personal Schedules, Formulas & Private Tips
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Give your artists a dedicated mobile space to review client formulas, track their earnings, and manage leaves with complete privacy.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/solutions/stylists">
                  Explore Stylist Workspace (/staff/dashboard) →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 7. For Growing Salons (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.modernHairStudio}
        imageAlt="Growing Multi-Location Salon Studios"
        overlayOpacity="cinematic"
        id="growing-salons"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">FOR GROWING FRANCHISES</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Scale from 1 Chair to 10 Flagship Branches
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Aurevia’s multi-tenant architecture lets you expand seamlessly with unified client profiles, shared gift vouchers, and centralized headquarters reporting.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/solutions/growing-salons">
                Explore Franchise Multi-Tenancy →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 8. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
