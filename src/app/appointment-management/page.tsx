'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Users,
  AlertCircle,
  RefreshCw,
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

export default function AppointmentManagementPage() {
  const statuses = [
    { label: 'Confirmed', desc: 'Deposit received or client confirmed via SMS.', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Checked-in', desc: 'Client has arrived at reception lounge.', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'In Progress', desc: 'Stylist has started treatment at assigned chair.', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { label: 'Completed', desc: 'Service finished, payment processed, formula saved.', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Rescheduled', desc: 'Client or salon shifted appointment slot.', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Cancelled / No-show', desc: 'Tracked for automated deposit fee forfeiture.', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ];

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="PRECISION APPOINTMENT ENGINE"
        title="High-Velocity Salon Scheduling with"
        titleHighlight="Zero Chaos."
        description="The heart of your salon operations. Monitor live chair occupancy, drag-and-drop bookings across multi-stylist columns, and check-in clients with one tap."
        imageSrc={PUBLIC_IMAGES.marbleStylingStation}
        imageAlt="Salon Appointment Scheduling Stations"
        primaryCtaText="Explore Live Appointments"
        primaryCtaHref="/appointments"
        secondaryCtaText="View Calendar Matrix"
        secondaryCtaHref="/calendar"
        breadcrumbs={[{ label: 'Appointment Management' }]}
        stats={[
          { label: 'Daily Appointments Tracked', value: '15,000+' },
          { label: 'Check-In Velocity', value: '<2 sec' },
          { label: 'Reschedule Accuracy', value: '100%' },
          { label: 'Chair Utilization', value: '94%' },
        ]}
      />

      {/* 2. Centralized Appointment Management (Clean Section) */}
      <CleanSection id="centralized-overview" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">CENTRALIZED ROSTER</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Complete Visibility of Every Client Visit
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Filter in real time by specialist, service category, date, or appointment status with lightning-fast instant search.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CalendarDays,
              title: 'Rich Appointment Data Cards',
              desc: 'Client contact details, VIP badges, requested services, assigned stylists, duration buffers, and payment totals at a glance.',
            },
            {
              icon: RefreshCw,
              title: 'Frictionless Rescheduling',
              desc: 'Move an appointment to a new date, time, or specialist in two clicks. Clients automatically receive updated SMS notices.',
            },
            {
              icon: ShieldCheck,
              title: 'No-Show & Walk-in Handlers',
              desc: 'Record walk-ins instantly from the front desk and log no-shows to trigger cancellation deposit retention automatically.',
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

      {/* 3. Calendar & Scheduling (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.heroInterior}
        imageAlt="Modern Multi-Stylist Salon Calendar"
        overlayOpacity="cinematic"
        id="calendar-views"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center mb-14 space-y-4"
        >
          <SectionBadge variant="pink">MULTI-VIEW CALENDAR</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
            Day, Week & Month Perspectives Built for Salons
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Switch effortlessly between multi-column stylist views for today’s floor or month-wide booking density heatmaps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              view: 'Day View (Stylist Columns)',
              title: 'Chair-by-Chair Floor Radar',
              desc: 'Showcases each stylist’s schedule side-by-side with color-coded service blocks, breaks, and buffer periods.',
            },
            {
              view: 'Week View (7-Day Matrix)',
              title: 'Multi-Day Roster Balance',
              desc: 'Spot weekly peak hours, balance shift loads across staff, and anticipate busy weekend rushes well in advance.',
            },
            {
              view: 'Month View (Density Map)',
              title: 'Macro Growth Overview',
              desc: 'Analyze seasonal spikes, recurring holiday bookings, and monthly chair utilization trends at 30,000 feet.',
            },
          ].map((v, i) => (
            <motion.div
              key={v.view}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-7 shadow-xl space-y-3 hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider group-hover:text-pink-300 transition-colors">{v.view}</div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-100 transition-colors">{v.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button variant="primary" size="md" href="/calendar">
              Open Interactive Calendar Engine →
            </Button>
          </motion.div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Rescheduling / Cancellation / Status (Clean Section) */}
      <CleanSection id="status-management" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">LIFECYCLE MANAGEMENT</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            6 Connected Appointment Lifecycle States
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Every appointment transitions cleanly through verified operational stages with real-time notifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statuses.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all duration-300 space-y-2 cursor-pointer"
            >
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border inline-block ${st.color}`}>
                {st.label}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </motion.div>
          ))}
        </div>
      </CleanSection>

      {/* 5. Staff Availability & Conflict Prevention (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Staff Meeting & Availability"
        overlayOpacity="cinematic"
        id="conflict-prevention"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">CONFLICT PREVENTION</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Built-in Intelligence That Prevents Floor Collisions
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Aurevia automatically verifies specialist working hours, room capacities, approved leaves, and service buffer times before confirming any appointment.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white text-sm font-bold shadow-xl shadow-pink-500/25 hover:opacity-95 transition-opacity"
              >
                <span>Explore Appointment Dashboard (/appointments)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Daily Operations (Clean Section) */}
      <CleanSection id="daily-ops" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">FRONT DESK PRODUCTIVITY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Speed That Keeps Front-Desk Lines Moving
          </h2>
          <p className="text-base text-slate-600">
            Fast keyboard shortcuts, global customer search, and instant drawer sliding mean receptionists never keep arriving clients waiting.
          </p>
        </motion.div>
      </CleanSection>

      {/* 7. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
