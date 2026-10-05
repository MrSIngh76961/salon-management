'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
  Users,
  CreditCard,
  Lock,
  Phone,
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

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('General');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    'General',
    'Product',
    'Booking',
    'Staff',
    'Customers',
    'Billing',
    'Security',
  ];

  const faqData: Record<string, Array<{ q: string; a: string }>> = {
    General: [
      {
        q: 'What is Aurevia and who is it designed for?',
        a: 'Aurevia is an all-in-one luxury B2B SaaS platform specifically engineered for luxury hair salons, boutique spas, barbershops, and aesthetic studios. It replaces fragmented tools with synchronized appointment scheduling, staff commission tracking, customer CRM with color formulas, POS billing, and multi-tenant franchise reporting.',
      },
      {
        q: 'How long does it take to get our salon up and running?',
        a: 'Most boutique salons are fully live within 20 minutes. Simply add your service menu, configure stylist shift hours, and publish your booking link. If you have existing client data, our concierge team migrates it for free within 24 hours.',
      },
      {
        q: 'Does Aurevia work on iPads, tablets, and smartphones?',
        a: 'Yes! Aurevia is 100% responsive and cloud-native. It runs smoothly on iPads at the front desk, desktop PCs, and smartphones used by mobile stylists on the floor.',
      },
    ],
    Product: [
      {
        q: 'Can stylists access their own schedules on their personal phones?',
        a: 'Yes. Stylists log in to their private Stylist Workspace (/staff/dashboard) where they can view their assigned chairs, client formula notes, and daily tip earnings without seeing other staff members’ private information or owner-level finances.',
      },
      {
        q: 'Does the calendar support multi-column drag-and-drop rescheduling?',
        a: 'Absolutely. You can drag an appointment block from one specialist column to another or shift time slots in real time. The engine automatically checks for specialist capability, break buffers, and double-booking conflicts.',
      },
      {
        q: 'Can we manage multiple salon locations under one account?',
        a: 'Yes. Our Franchise Enterprise tier provides complete multi-tenancy. You can switch between branches in one click, share client formulas across locations, and view aggregated headquarter revenue reports.',
      },
    ],
    Booking: [
      {
        q: 'How does online self-booking prevent double bookings?',
        a: 'When a client enters the checkout drawer, that specific time slot is locked in real time. The system calculates available slots based on stylist shifts, service durations, processing buffers, and approved leaves.',
      },
      {
        q: 'Can we require booking deposits for high-ticket services?',
        a: 'Yes! You can require custom partial deposits or full prepayments for services like Balayage, Keratin, or Extensions. In the event of an unexcused no-show, the deposit is automatically forfeited according to your salon policy.',
      },
      {
        q: 'Can clients book appointments directly from our Instagram page?',
        a: 'Yes. Aurevia integrates seamlessly with the Instagram & Facebook "Book Now" action buttons, funneling social media followers directly into your high-converting checkout flow.',
      },
    ],
    Staff: [
      {
        q: 'How are stylist commissions and tips calculated?',
        a: 'You can configure custom commission percentages per stylist or per service tier. Tips can be collected digitally at checkout and disbursed transparently with itemized shift receipts.',
      },
      {
        q: 'How do staff members request vacation or medical leave?',
        a: 'Stylists can submit leave requests directly from their portal. Floor managers and owners receive approval alerts with conflict detection warnings to ensure adequate shift coverage.',
      },
    ],
    Customers: [
      {
        q: 'Where are chemical hair color formulas stored?',
        a: 'Each client profile includes a dedicated Technical Formula Archive. Stylists log exact developer volumes, balayage clay ratios, and toner timings with date-stamped records accessible directly from the chair.',
      },
      {
        q: 'Can we send automated reminders to clients before their visit?',
        a: 'Yes. Aurevia delivers automated two-way SMS, WhatsApp, and email reminders 24 hours and 2 hours before the visit with 1-click confirmation or rescheduling links.',
      },
    ],
    Billing: [
      {
        q: 'Do you charge a percentage fee on our client bookings?',
        a: 'Never. Aurevia operates on a transparent, flat monthly subscription model. We never take a percentage cut of your salon’s hard-earned services, retail sales, or staff tips.',
      },
      {
        q: 'Can we cancel our subscription at any time?',
        a: 'Yes, with zero penalties or lock-in contracts. You can upgrade, downgrade, or cancel your subscription with a single click from your settings portal.',
      },
    ],
    Security: [
      {
        q: 'Is our client contact and credit card data secure?',
        a: 'Yes. All data is encrypted in transit and at rest using bank-grade AES-256 and TLS 1.3 standards. Payment card details are tokenized via PCI-DSS Level 1 certified processors.',
      },
      {
        q: 'Do we own our customer data if we ever decide to leave?',
        a: '100%. You can export your full customer database, visit history, and revenue records to CSV or Excel at any moment with one click. We believe in earning your business every day, not holding your data hostage.',
      },
    ],
  };

  const currentQuestions = faqData[activeCategory] || faqData.General;

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. FAQ Hero (Background Image) */}
      <PublicPageHero
        badge="ANSWERS & GUIDANCE"
        title="Frequently Asked Questions About"
        titleHighlight="Aurevia."
        description="Everything you need to know about our scheduling engine, migration, transparent pricing, staff permissions, and multi-tenant security."
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Aurevia Frequently Asked Questions"
        primaryCtaText="Start 14-Day Free Trial"
        primaryCtaHref="/register"
        secondaryCtaText="Contact Concierge"
        secondaryCtaHref="/contact"
        breadcrumbs={[{ label: 'FAQ' }]}
        stats={[
          { label: 'Answered Questions', value: '40+' },
          { label: 'Support Response', value: '<3 mins' },
          { label: 'Free Migration', value: '100% Free' },
          { label: 'Data Ownership', value: 'Yours Forever' },
        ]}
      />

      {/* 2. Interactive Category Tabs & Accordions (Clean Section) */}
      <CleanSection id="accordions" variant="light">
        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {currentQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`rounded-3xl border bg-white overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-[#E6397A]/40 shadow-lg shadow-pink-500/10' : 'border-slate-200/80 shadow-xs hover:border-pink-300 hover:shadow-md'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4 group"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#E6397A] transition-colors">
                      {item.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-pink-50 text-[#E6397A] rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-pink-50 group-hover:text-[#E6397A]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CleanSection>

      {/* 3. Migration & Onboarding Guide (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Migration & Onboarding Team"
        overlayOpacity="cinematic"
        id="migration"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">CONCIERGE ONBOARDING</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Switching from Another Software? We Do the Heavy Lifting.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Don’t let the fear of migration hold you back from modernizing. Our migration team will securely transfer your client lists, past visit formulas, and future bookings into Aurevia at zero cost.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/contact">
                Request Free Data Migration →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Security & Compliance SLA (Clean Section) */}
      <CleanSection id="security" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">ENTERPRISE GRADE SECURITY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Bank-Level Encryption & 99.99% Uptime SLA
          </h2>
          <p className="text-base text-slate-600">
            Automated multi-region backups, strict role-based access control, and GDPR/CCPA compliance protect your salon’s reputation.
          </p>
        </motion.div>
      </CleanSection>

      {/* 5. Live Concierge & Training (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Salon Concierge Support"
        overlayOpacity="cinematic"
        id="concierge"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">HUMAN SUPPORT</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Still Have a Question? Talk to a Real Human.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Our salon specialists are based in New York and London and have real floor operational experience. We’re available 6 days a week via phone, email, and live chat.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/contact">
                Contact Aurevia Concierge (/contact) →
              </Button>
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
