'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CalendarDays,
  Calendar,
  Users,
  UserCheck,
  BarChart3,
  Bell,
  CreditCard,
  Scissors,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
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

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Features Hero (Background Image) */}
      <PublicPageHero
        badge="PLATFORM CAPABILITIES"
        title="Everything You Need to Run an Exceptional"
        titleHighlight="Salon & Spa Enterprise."
        description="A unified, cloud-native suite built specifically for modern salons. Eliminate disconnected apps and gain real-time visibility across front desk, styling floor, and financial operations."
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Modern Salon Interior"
        breadcrumbs={[{ label: 'Features' }]}
        stats={[
          { label: 'Core Modules', value: '12+' },
          { label: 'Time Saved Weekly', value: '14 hrs' },
          { label: 'Booking Speed', value: '<45 sec' },
          { label: 'Client Satisfaction', value: '99.4%' },
        ]}
      />

      {/* 2. Complete Salon Management (Clean Section) */}
      <CleanSection id="complete-overview" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">ALL-IN-ONE ARCHITECTURE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            One Platform. Zero Software Chaos.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every feature works together seamlessly so your team spends less time clicking and more time caring for clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CalendarDays,
              title: 'Online Client Self-Booking',
              desc: 'Branded 24/7 web scheduling with real-time stylist availability, deposit payments, and immediate calendar sync.',
              link: '/online-booking',
            },
            {
              icon: Calendar,
              title: 'Multi-Staff Scheduling',
              desc: 'High-density Day, Week, and Month calendars with drag-and-drop rescheduling and buffer-time management.',
              link: '/appointment-management',
            },
            {
              icon: UserCheck,
              title: 'Staff & Shift Rosters',
              desc: 'Custom stylist service menus, working hours, break automation, and transparent tip & commission tracking.',
              link: '/staff-management',
            },
            {
              icon: Users,
              title: 'Customer CRM & Formulas',
              desc: 'Client visit history, past service logs, allergy records, lifetime spending metrics, and custom color formula vaults.',
              link: '/customer-management',
            },
            {
              icon: BarChart3,
              title: 'Revenue Analytics & BI',
              desc: 'Real-time sales velocity, chair utilization metrics, top treatment rankings, and automated GST/tax exports.',
              link: '/analytics',
            },
            {
              icon: Bell,
              title: 'Multi-Channel Reminders',
              desc: 'Automated 2-way SMS, WhatsApp, and email alerts that reduce costly client no-shows down to under 1.5%.',
              link: '/features#reminders',
            },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-pink-100/80 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#E6397A]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6">
                  <Link
                    href={f.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6397A] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. Booking & Appointment Management (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.hairStylingSession}
        imageAlt="Hairstyling in action"
        overlayOpacity="cinematic"
        id="booking-appointments"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionBadge variant="pink">APPOINTMENT ENGINE</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
              Flawless Scheduling. Zero Double-Bookings.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Aurevia conceptually accounts for specialist working hours, assigned service durations, processing buffers, and room availability to ensure conflict-free bookings every single time.
            </p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF659F] shrink-0" />
                <span>Interactive Day, Week, and Month multi-column floor matrix</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF659F] shrink-0" />
                <span>One-tap check-in, in-chair treatment tracking, and walk-in flows</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF659F] shrink-0" />
                <span>Automated client reschedule modal with smart conflict resolution</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button variant="primary" size="md" href="/appointment-management">
                Deep Dive: Appointment System →
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#141624]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 hover:border-pink-500/30 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-bold text-white">
              <span>Smart Booking Intelligence</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Availability Active
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { time: '09:00 AM', status: 'Available', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { time: '10:30 AM', status: 'Booked: Sophia M. (Balayage)', color: 'text-slate-300 bg-white/5 border-white/10' },
                { time: '12:00 PM', status: 'Scheduled Break / Disinfection', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { time: '01:00 PM', status: 'Available', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
              ].map((s) => (
                <div
                  key={s.time}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-pink-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="font-mono text-slate-300 group-hover:text-pink-300 transition-colors">{s.time}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${s.color}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundImageSection>

      {/* 4. Staff & Schedule Management (Clean Section) */}
      <CleanSection id="staff-management" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-4 hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Stylist Rostering & Permissions</span>
                <span className="text-xs font-bold text-[#E6397A]">8 Active Chairs</span>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'Elena Rostova', role: 'Master Colorist', exp: '8 yrs', comp: '55% + Tips', chairs: 'Chair #1' },
                  { name: 'Julian Reed', role: 'Senior Stylist', exp: '5 yrs', comp: '50% + Tips', chairs: 'Chair #2' },
                  { name: 'Ava Taylor', role: 'Esthetician', exp: '6 yrs', comp: '50% + Tips', chairs: 'Spa Suite B' },
                ].map((st) => (
                  <div
                    key={st.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-pink-50/60 hover:border-pink-200 transition-all duration-200 cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">{st.name}</div>
                      <div className="text-[11px] text-slate-500">{st.role} • {st.exp} exp</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{st.comp}</div>
                      <div className="text-[10px] text-slate-400">{st.chairs}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <SectionBadge variant="pink">TEAM EMPOWERMENT</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              Manage Rosters, Leaves & Commissions Transparently
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Keep your stylists motivated with clear performance visibility, private mobile portals, and automatic tip calculations.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Custom working hours, recurring shift templates, and break buffers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dedicated Stylist Workspace (/staff/dashboard) with zero privacy bleed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant leave request submission and floor manager approvals</span>
              </li>
            </ul>
            <div className="pt-2">
              <Button variant="primary" size="md" href="/staff-management">
                Explore Staff Suite →
              </Button>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. CRM & Customer Management (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.clientConsultation}
        imageAlt="Client consultation in salon"
        overlayOpacity="cinematic"
        id="crm-features"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">BESPOKE CLIENT CARE</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Remember Every Formula, Preference, and Milestone
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Salon clients expect personalized attention. Aurevia’s CRM stores technical color formulation notes, patch-test dates, allergy warnings, and visit timelines so any specialist can deliver perfection.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/50 hover:shadow-[0_15px_30px_rgba(230,57,122,0.2)] transition-all cursor-default"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-2">Color Formulas</div>
              <p className="text-xs text-slate-300">
                Log exact developer volumes, balayage clay ratios, and toner blends with date-stamped records.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/50 hover:shadow-[0_15px_30px_rgba(230,57,122,0.2)] transition-all cursor-default"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-2">Lifetime Value</div>
              <p className="text-xs text-slate-300">
                Track total visits, average ticket spend, and automatically tag VIP clients for premium care.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/50 hover:shadow-[0_15px_30px_rgba(230,57,122,0.2)] transition-all cursor-default"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-2">Private Notes</div>
              <p className="text-xs text-slate-300">
                Record beverage preferences, birthday perks, and scalp sensitivities accessible right from the chair.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Analytics & Reporting (Clean Section) */}
      <CleanSection id="analytics-reporting" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">BUSINESS INTELLIGENCE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Real-Time Visibility into Salon Health
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Take the guesswork out of salon expansion with instantaneous revenue, staff ranking, and service yield dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue Velocity', value: '₹1,96,650', note: '+24.5% vs last month', icon: BarChart3 },
            { label: 'Booking Completion', value: '89.9%', note: '0.0% no-shows today', icon: CheckCircle2 },
            { label: 'Top Stylist Revenue', value: '₹68,500', note: 'Elena Rostova (Master)', icon: UserCheck },
            { label: 'Average Ticket Value', value: '₹3,450', note: 'Balayage packages leading', icon: CreditCard },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-pink-100/80 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#E6397A]" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">{stat.label}</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">{stat.note}</div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 7. Automation & Notifications (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Modern Salon Reception Desk"
        overlayOpacity="cinematic"
        id="reminders"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <SectionBadge variant="pink">MULTI-CHANNEL NOTIFICATIONS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Keep Clients Informed, Keep Chairs Full
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Configure automated booking confirmations, 24-hour reminder texts, instant rescheduling links, and post-service feedback collection without lifting a finger.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white text-sm font-bold shadow-xl shadow-pink-500/25 hover:opacity-95 transition-opacity"
            >
              <span>Activate Automated Reminders — Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </BackgroundImageSection>

      {/* 8. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
