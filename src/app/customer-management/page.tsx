'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  Sparkles,
  Heart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  History,
  Tag,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Gift,
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

export default function CustomerManagementPublicPage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="LUXURY CLIENT RELATIONSHIP MANAGEMENT"
        title="Transform One-Time Visitors into"
        titleHighlight="Devoted Salon VIPs."
        description="Every client has unique tastes, allergies, and style goals. Aurevia CRM gives your stylists instant access to color histories, purchase records, and preferences right at the chair."
        imageSrc={PUBLIC_IMAGES.happyClientMirror}
        imageAlt="Happy Salon Client"
        primaryCtaText="Explore Customer CRM"
        primaryCtaHref="/customers"
        secondaryCtaText="Client Portal View"
        secondaryCtaHref="/customer"
        breadcrumbs={[{ label: 'Customer Management' }]}
        stats={[
          { label: 'Client Retention Rate', value: '88%' },
          { label: 'VIP Repeat Bookings', value: '4.6x' },
          { label: 'Color Formula Accuracy', value: '100%' },
          { label: 'Client Satisfaction', value: '4.9/5' },
        ]}
      />

      {/* 2. Customer CRM (Clean Section) */}
      <CleanSection id="crm-overview" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">360° CLIENT PROFILE</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            A Living Digital Record for Every Guest
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Capture contact info, birthday perks, scalp notes, past treatment photos, and lifetime spending velocity in one unified dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: History,
              title: 'Chronological Visit Timeline',
              desc: 'Every service, stylist assigned, retail product purchased, and check-in timestamp tracked in a searchable timeline.',
            },
            {
              icon: Tag,
              title: 'VIP & Segment Tagging',
              desc: 'Tag high-value guests, influencer ambassadors, brides, or color-correction cases for prioritized concierge care.',
            },
            {
              icon: ShieldCheck,
              title: 'Allergies & Scalp Sensitivities',
              desc: 'High-visibility safety flags ensure no stylist uses ammonia or irritants without checking mandatory patch-test records.',
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

      {/* 3. Customer Profiles & History (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.clientConsultation}
        imageAlt="Stylist and Client Reviewing Hair History"
        overlayOpacity="cinematic"
        id="profile-history"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">TECHNICAL FORMULA ARCHIVE</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Never Forget a Hair Formula Again
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            When your client loves their tone from three months ago, simply pull up their visit history. View exact shades, toner timings, and developer volumes with one click.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-1 group-hover:text-pink-300 transition-colors">Visit Archive: Sophia Martinez</div>
              <div className="text-sm font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">Balayage & Root Smudge (March 15, 2026)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formula: Redken Shades EQ 09P + 09V (equal parts) with Processing Solution. 20 Volume Blonding clay at mid-lengths.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
            >
              <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-1 group-hover:text-pink-300 transition-colors">Stylist Continuity</div>
              <div className="text-sm font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">Seamless Staff Hand-offs</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If Elena is on vacation, Julian can replicate the exact blonde formula with complete confidence. Zero guesswork.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Spending / Preferences / Notes (Clean Section) */}
      <CleanSection id="spending-preferences" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">LIFETIME VALUE METRICS</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Spot Your Most Profitable VIP Clients
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Aurevia calculates each client&apos;s total visits, average spend per ticket, cancellation history, and favorite retail products so you can reward loyalty with precision.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automatic VIP threshold tagging based on spend or visit frequency</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Birthday reward automations that drive bookings during birth months</span>
              </div>
            </div>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/customers">
                  Open Aurevia Customer Manager (/customers) →
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Client Profile: Sophia Martinez</span>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E6397A] text-[10px] font-bold">
                VIP Platinum Client
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-200 transition-colors">
                <div className="text-lg font-bold text-slate-900">₹48,200</div>
                <div className="text-[10px] text-slate-500">Lifetime Spend</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-200 transition-colors">
                <div className="text-lg font-bold text-slate-900">12 Visits</div>
                <div className="text-[10px] text-slate-500">Completed</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="text-lg font-bold text-emerald-600">₹4,016</div>
                <div className="text-[10px] text-slate-500">Avg Ticket</div>
              </div>
            </div>
            <div className="p-3 bg-[#FAF9FB] rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <div><strong>Preferences:</strong> Sparkling water with lemon, quiet treatment preferred.</div>
              <div><strong>Allergies:</strong> None reported. Sensitive to high heat blow dry.</div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 5. Retention & Customer Insights (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.colorBalayageWork}
        imageAlt="Salon Client Hair Color Results"
        overlayOpacity="cinematic"
        id="retention-insights"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">AUTOMATED RE-ENGAGEMENT</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Win Back Lapsed Clients on Autopilot
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Clients haven’t rebooked in 8 weeks? Aurevia sends a personalized SMS invitation to maintain their hair tone, keeping your booking pipeline full without awkward cold outreach.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Customer Communication (Clean Section) */}
      <CleanSection id="communication" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">TWO-WAY MESSAGING</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Professional SMS & WhatsApp Channels
          </h2>
          <p className="text-base text-slate-600">
            Send directions, parking tips, and policy updates directly to client phones with verified salon branding.
          </p>
        </motion.div>
      </CleanSection>

      {/* 7. Final CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
