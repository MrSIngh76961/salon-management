'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Scissors,
  Users,
  Bell,
  Star,
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

export default function OnlineBookingPage() {
  const steps = [
    {
      num: '01',
      title: 'Select Luxury Service',
      desc: 'Browse categorized treatments with transparent pricing and time duration estimates.',
    },
    {
      num: '02',
      title: 'Choose Preferred Stylist',
      desc: 'Pick your regular specialist or select "Any Available Stylist" for maximum slot flexibility.',
    },
    {
      num: '03',
      title: 'Real-Time Slot Picker',
      desc: 'Select from calculated open slots that automatically account for shift hours and cleaning breaks.',
    },
    {
      num: '04',
      title: 'Deposit & Instant Confirmation',
      desc: 'Secure with an optional booking deposit and receive calendar invites plus SMS references.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Booking Hero (Background Image) */}
      <PublicPageHero
        badge="24/7 CLIENT RESERVATION ENGINE"
        title="Frictionless Self-Booking That Fills Your Chairs"
        titleHighlight="Day and Night."
        description="Empower your clients to schedule their dream haircuts, balayage, and aesthetic treatments in under 45 seconds from Instagram, Google Maps, or your branded salon website."
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Online Salon Booking Experience"
        primaryCtaText="Test Live Booking Flow"
        primaryCtaHref="/book"
        secondaryCtaText="Schedule Demo"
        secondaryCtaHref="/login"
        breadcrumbs={[{ label: 'Online Booking' }]}
        stats={[
          { label: 'After-Hours Bookings', value: '42%' },
          { label: 'Booking Completion', value: '96.8%' },
          { label: 'Deposit Protection', value: '100%' },
          { label: 'Phone Call Reduction', value: '-75%' },
        ]}
      />

      {/* 2. Easy Online Booking (Clean Section) */}
      <CleanSection id="easy-booking" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">ZERO BARRIERS TO ENTRY</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Designed for Mobile Clients on the Move
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Today’s salon clientele doesn’t want to wait on hold during busy salon hours or play telephone tag. With Aurevia’s mobile-first booking experience, reserving a luxury session feels as smooth as hailing an Uber.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Zero account creation required — clients confirm via phone OTP or email',
                'Embedded Instagram "Book Now" action button compatibility',
                'Customizable service add-ons (Glossing, Olaplex, Scalp Massage) at checkout',
                'Automated "Add to Google Calendar" and "Apple iCal" integration',
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#E6397A] shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" href="/book">
                Launch Interactive Booking Demo →
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#E6397A]" />
                Client Self-Checkout Flow
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[10px]">
                Instant Sync with Floor
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF9FB] border border-slate-100 space-y-3 hover:bg-pink-50/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Balayage & Hair Glossing</div>
                  <div className="text-[11px] text-slate-500">120 mins • with Elena Rostova (Master)</div>
                </div>
                <div className="text-xs font-extrabold text-[#E6397A]">₹4,500</div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <span>Selected Slot: Tomorrow at 10:00 AM</span>
                <span className="text-emerald-600 font-bold">Slot Held (10m)</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Deposit Policy: ₹500 refundable up to 24 hours prior to visit.</span>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 3. Booking Flow (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.colorBalayageWork}
        imageAlt="Master Balayage Stylist at Work"
        overlayOpacity="cinematic"
        id="flow"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16 space-y-4"
        >
          <SectionBadge variant="pink">SEAMLESS 4-STEP CONVERSION</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
            From Social Discovery to Chair in Under a Minute
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Our booking engine has been iteratively refined across 3.8 million appointments to maximize checkout conversion and eliminate abandonment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-pink-500/60 hover:shadow-[0_20px_40px_rgba(230,57,122,0.22)] transition-all duration-300 cursor-default"
            >
              <div>
                <span className="text-3xl font-extrabold text-[#FF659F] font-mono mb-3 block">
                  {st.num}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </BackgroundImageSection>

      {/* 4. Real-Time Availability / Calendar (Clean Section) */}
      <CleanSection id="availability" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">INTELLIGENT SLOTTING</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Slots That Respect Staff Hours & Floor Realities
          </h2>
          <p className="text-base text-slate-600 font-normal">
            No more accidental bookings during stylist lunch breaks or impossible turnaround times between chemical services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: 'Automated Processing Buffers',
              desc: 'Allow color treatments to sit for 35 minutes while stylists start a secondary haircut in their rotation.',
            },
            {
              icon: Users,
              title: 'Staff Service Specializations',
              desc: 'Stylists only appear as options for treatments they are certified in. Nail techs never get booked for balayage.',
            },
            {
              icon: ShieldCheck,
              title: 'Dynamic Double-Booking Lock',
              desc: 'Slots are locked the moment a client enters the checkout drawer, completely preventing race conditions.',
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
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Icon className="w-6 h-6 text-[#E6397A]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 5. Customer Booking Experience (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.happyClientMirror}
        imageAlt="Happy Salon Client Looking in Mirror"
        overlayOpacity="cinematic"
        id="experience"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionBadge variant="pink">CLIENT CENTRICITY</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            A Luxury Salon Experience Before They Even Step Inside
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From sleek aesthetics to transparent service timelines, Aurevia sets the tone for five-star service before the appointment even begins.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/book">
              Experience the Customer Portal (/customer) →
            </Button>
          </div>
        </div>
      </BackgroundImageSection>

      {/* 6. Automated Confirmation & Reminders (Clean Section) */}
      <CleanSection id="reminders" variant="light">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <SectionBadge variant="pink">ZERO NO-SHOW GUARANTEE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Automated SMS & WhatsApp Booking Receipts
          </h2>
          <p className="text-base text-slate-600">
            Clients immediately receive booking references like <strong>SP-2026-00482</strong> with directions, cancellation rules, and 1-click calendar sync.
          </p>
        </div>
      </CleanSection>

      {/* 7. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
