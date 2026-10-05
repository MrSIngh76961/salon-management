'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Award,
  DollarSign,
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

export default function StaffManagementPublicPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="TALENT & ROSTER MANAGEMENT"
        title="Empower Your Stylists. Optimize Floor Productivity."
        titleHighlight="Retain Top Talent."
        description="A modern staff management suite that celebrates your artists. Handle custom schedules, assigned service menus, leaves, and commission splits without administrative friction."
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Stylist Team Roster"
        primaryCtaText="Explore Staff Workspace"
        primaryCtaHref="/staff/dashboard"
        secondaryCtaText="Owner Staff Roster"
        secondaryCtaHref="/staff"
        breadcrumbs={[{ label: 'Staff Management' }]}
        stats={[
          { label: 'Stylist Retention', value: '92%' },
          { label: 'Roster Speed', value: '<5 mins' },
          { label: 'Commission Clarity', value: '100%' },
          { label: 'Tip Transparency', value: 'Instant' },
        ]}
      />

      {/* 2. Staff Profiles & Roles (Clean Section) */}
      <CleanSection id="staff-profiles" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">ROLE-BASED GOVERNANCE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Granular Permissions for Every Salon Member
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Each role gets the exact tools they need to shine without exposing sensitive financial balance sheets or other staff’s client histories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              role: 'Master Stylists',
              desc: 'Dedicated chair schedules, personal formula archives, private earnings & tips, and client allergy alerts.',
            },
            {
              role: 'Floor Managers',
              desc: 'Real-time shift coverage, chair occupancy supervision, service reassignments, and emergency coverage.',
            },
            {
              role: 'Reception Desk',
              desc: 'One-click check-ins, lounge queue management, appointment book editing, and POS payment collection.',
            },
            {
              role: 'Salon Owners',
              desc: 'Macro revenue visibility, multi-branch performance analytics, staff commission approvals, and hiring rosters.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 space-y-3 group cursor-pointer"
            >
              <div className="text-xs font-bold text-[#E6397A] uppercase tracking-wider group-hover:text-[#FF659F] transition-colors">Role Profile</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">{item.role}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </CleanSection>

      {/* 3. Working Hours / Breaks / Leave (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Salon Lighting & Schedule Balance"
        overlayOpacity="cinematic"
        id="shifts-leave"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">SHIFTS & LEAVE APPROVAL</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Balanced Schedules. Zero Burnout.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Configure default working hours, lunch pauses, and custom break rules per day. Stylists can submit leave requests from their mobile portal, and managers can approve with 1-tap.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
            {[
              {
                title: 'Automated Pauses',
                desc: 'Guaranteed lunch breaks automatically block public slots from booking over staff rest periods.',
              },
              {
                title: 'Leave Request Portal',
                desc: 'Staff submit vacation or medical leaves with reason tags; managers approve with dynamic conflict alerts.',
              },
              {
                title: 'Shift Swapping',
                desc: 'Easily reassign chairs or substitute stylists on sick days without cancelling existing client bookings.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-2 group-hover:text-pink-300 transition-colors">{card.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Staff Calendar & Availability (Clean Section) */}
      <CleanSection id="availability" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">INDIVIDUAL WORKSPACES</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              A Personal Mobile Cockpit for Every Stylist
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Stylists love Aurevia because they can log in on their phone to see their upcoming clients, check color history formulas before the client sits down, and watch their daily commission grow.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Private view of today’s appointments with client formula notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>One-tap &quot;Start Treatment&quot; and &quot;Mark Completed&quot; chair tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant toggle between Available, Busy, and On Break</span>
              </li>
            </ul>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/staff/dashboard">
                  Preview Stylist Workspace (/staff/dashboard) →
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-900">
              <span>Stylist: Julian Reed (Chair #2)</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[10px]">
                Active Chair
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Next Client: Alexander Wright</span>
                <span className="text-xs font-mono font-bold text-[#E6397A]">Starts in 25m</span>
              </div>
              <p className="text-xs text-slate-600">Precision Fade & Beard Sculpt (45 mins) • Notes: Sensitive skin on neck</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-pink-200 transition-colors">
                <div className="text-lg font-bold text-slate-900">₹8,400</div>
                <div className="text-[10px] text-slate-500">Today&apos;s Booked Services</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-lg font-bold text-emerald-600">₹4,200</div>
                <div className="text-[10px] text-slate-500">Earned Commission</div>
              </div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Performance & Productivity (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="Salon Performance and Chair Occupancy"
        overlayOpacity="cinematic"
        id="productivity"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">TRANSPARENT METRICS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Fair Commissions, Transparent Rewards
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminate end-of-month payroll disputes. Aurevia accurately calculates tiered service commissions, product sales bonuses, and tips with one-click export for accounting.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Staff Experience (Clean Section) */}
      <CleanSection id="experience" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">BUILT FOR ARTISTS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Keep Your Best Specialists Happy and Engaged
          </h2>
          <p className="text-base text-slate-600">
            Salons using Aurevia report a 40% reduction in staff turnover thanks to transparent earnings, balanced workloads, and zero booking friction.
          </p>
        </motion.div>
      </CleanSection>

      {/* 7. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
