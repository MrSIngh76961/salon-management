'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Search,
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

export default function ReceptionistsSolutionPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="FOR FRONT DESK & RECEPTION"
        title="Speed, Hospitality & Stress-Free Client"
        titleHighlight="Check-ins."
        description="The front desk is the heartbeat of your salon’s hospitality. Aurevia gives receptionists lightning-fast search, one-tap arrival check-ins, walk-in creation, and split-payment POS receipts."
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Salon Front Desk Reception"
        primaryCtaText="Launch Reception Desk"
        primaryCtaHref="/reception"
        secondaryCtaText="Interactive Booking Engine"
        secondaryCtaHref="/book"
        breadcrumbs={[
          { label: 'Solutions', href: '/solutions' },
          { label: 'Receptionists' },
        ]}
        stats={[
          { label: 'Check-In Speed', value: '<2 secs' },
          { label: 'Checkout Time', value: '<30 secs' },
          { label: 'Front Desk Errors', value: '0.0%' },
          { label: 'Walk-In Capture', value: '+30%' },
        ]}
      />

      {/* 2. Frictionless Front-Desk Check-in (Clean Section) */}
      <CleanSection id="check-in" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">WARM ARRIVALS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Never Keep Arriving Guests Waiting
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Type two letters of a guest’s name or phone number and pull up their profile immediately. Greet them by name, note their coat check, and mark them checked in with one click.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Global Instant Search',
              desc: 'Find any client across 50,000 records in 50 milliseconds using name, phone, or booking reference.',
            },
            {
              title: 'One-Tap Arrival Flags',
              desc: 'Marking a client Checked-in instantly updates the floor calendar and alerts the stylist on their station tablet.',
            },
            {
              title: 'Walk-In Fast Track',
              desc: 'Walk-in guest without a reservation? Pick an available chair, assign a service, and print a ticket in 20 seconds.',
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
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </CleanSection>

      {/* 3. Lounge Queue & Stylist Pings (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Salon Styling Floor and Lounge Queue"
        overlayOpacity="cinematic"
        id="lounge-queue"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">HOSPITALITY PROTOCOL</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Coordinated Hospitality from Welcome to Goodbye
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Aurevia tracks how long each guest has been waiting in the arrival lounge. If a stylist is running behind, receptionists get early warnings to offer a complimentary beverage.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/reception">
                Open Reception Desk Portal (/reception) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Point of Sale & Split Invoicing (Clean Section) */}
      <CleanSection id="pos-billing" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">LIGHTNING POS CHECKOUT</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Split Bills, Apply VIP Credits, Print GST Invoices
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Checkouts happen in seconds. Add retail shampoo bottles, apply loyalty points, split bills between card and cash, and email digital receipts with zero friction.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>One-click deposit deduction from final bill</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automatic tip calculation suggestions (15%, 20%, 25%)</span>
              </div>
            </div>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/billing">
                  View Billing & Invoicing Suite (/billing) →
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
              <span>Checkout Preview: Sophia Martinez</span>
              <span className="text-[#E6397A] font-bold">INV-2026-00482</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Balayage & Toner (120 mins)</span>
                <span className="font-bold">₹4,500</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kérastase Nutritive Serum (Retail)</span>
                <span>₹1,800</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Online Booking Deposit Paid</span>
                <span>-₹500</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Due at Counter</span>
                <span>₹5,800</span>
              </div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Walk-In Capture & Emergency Rebooking (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Salon Waiting Area and Walk-ins"
        overlayOpacity="cinematic"
        id="walk-ins"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">EFFORTLESS REBOOKING</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Book Their Next Appointment Before They Walk Out
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Receptionists can lock in the client&apos;s 6-week maintenance appointment with a single tap during checkout, boosting salon retention by 35%.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
