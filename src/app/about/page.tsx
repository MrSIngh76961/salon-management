'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Compass,
  Cpu,
  Target,
} from 'lucide-react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { BackgroundImageSection } from '@/components/public/BackgroundImageSection';
import { CleanSection } from '@/components/public/CleanSection';
import { SectionBadge } from '@/components/common/SectionBadge';
import { PreFooterCTA } from '@/components/public/PreFooterCTA';
import { PublicFooter } from '@/components/public/PublicFooter';
import { PUBLIC_IMAGES } from '@/data/publicImages';

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: 'Craftsmanship First',
      description:
        'We build software that honors the artistry of stylists and estheticians. Technology should elevate human touch, never commoditize it.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Surcharge Ethics',
      description:
        'Unlike legacy directories that tax your recurring clients, we never charge booking fees or commissions on your hard-won revenue.',
    },
    {
      icon: Cpu,
      title: 'Speed & Reliability',
      description:
        'High-velocity Saturday afternoon rush? Aurevia handles hundreds of simultaneous client bookings with 99.99% uptime guarantee.',
    },
    {
      icon: Heart,
      title: 'Radical Simplicity',
      description:
        'Powerful multi-chair scheduling without a manual. If your front desk or newest apprentice can’t master it in 15 minutes, we redesign it.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Hero Section (Background Image) */}
      <PublicPageHero
        badge="OUR STORY & MISSION"
        title="We’re Building the Operating System for"
        titleHighlight="Modern Luxury Salons."
        description="Born out of frustration with clunky 2000s booking tools, Aurevia gives salon owners, managers, and stylists the technology they deserve to build thriving, scalable businesses."
        imageSrc={PUBLIC_IMAGES.heroInterior}
        imageAlt="Modern High-End Salon Interior"
        imageOpacity={0.35}
        breadcrumbs={[{ label: 'About Us' }]}
        stats={[
          { label: 'Active Salons', value: '1,200+' },
          { label: 'Appointments Booked', value: '3.8M+' },
          { label: 'Average Revenue Boost', value: '+28%' },
          { label: 'Platform Uptime', value: '99.99%' },
        ]}
      />

      {/* 2. Our Story / Why Aurevia (Clean Section) */}
      {/* 2. Our Story / Why Aurevia (Clean Section) */}
      <CleanSection id="story" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">THE ORIGIN STORY</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              From a Frustrated SoHo Studio to a Global SaaS Platform
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              In 2023, our founders spent three months working alongside salon managers in New York and London. We watched front desk coordinators juggle five different apps, endure unending phone tag, and panic when paper appointment books were misplaced.
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Existing software was either built in 2004 with dinosaur interfaces or charged exorbitant transaction percentages on every haircut. We set out to change that with Aurevia — combining consumer-grade luxury aesthetics with enterprise reliability.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#E6397A]" />
                <span>Founded by Salon Tech Veterans</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#E6397A]" />
                <span>Privately Funded & Customer-Centric</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl aspect-[4/3] group">
              <Image
                src={PUBLIC_IMAGES.marbleStylingStation}
                alt="Luxury Salon Styling Station"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-slate-900 border border-white/40 shadow-lg group-hover:border-pink-300 transition-colors">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E6397A]">
                  Guiding Philosophy
                </div>
                <p className="text-xs text-slate-700 mt-1">
                  &ldquo;Software should quietly disappear into the background so client connection and salon artistry take center stage.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 3. The Problem We Solve (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Team Strategy Meeting"
        overlayOpacity="cinematic"
        imageOpacity={0.35}
        id="problem"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-4"
        >
          <SectionBadge variant="pink">SOLVING REAL FRUSTRATIONS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
            The Three Hidden Drains on Salon Profitability
          </h2>
          <p className="text-base text-slate-300">
            Independent salons lose an estimated 20% to 35% of potential revenue each month due to administrative drag and unmanaged booking gaps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              stat: '15-20%',
              label: 'Average No-Show Rate',
              impact: 'Unconfirmed phone bookings leave expensive chairs empty without deposit protection.',
              solution: 'Aurevia automated deposits & 2-way SMS confirmation slash no-shows to under 1.5%.',
            },
            {
              stat: '12 hrs/wk',
              label: 'Wasted on Phone & Admin',
              impact: 'Front desk staff answering repetitive calls while in-salon clients wait to check out.',
              solution: 'Self-service 24/7 client booking captures appointments while you sleep.',
            },
            {
              stat: '30% Loss',
              label: 'Client Churn After 1st Visit',
              impact: 'Lack of personalized follow-up and forgotten color formulas cause clients to drift away.',
              solution: 'Color formula vaults and automated 6-week recall sequences guarantee retention.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl space-y-4 hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 cursor-default"
            >
              <div className="text-4xl font-extrabold text-[#FF659F] tracking-tight">
                {item.stat}
              </div>
              <h3 className="text-lg font-bold text-white">{item.label}</h3>
              <p className="text-xs text-rose-300/90 leading-relaxed pb-3 border-b border-white/10">
                <strong>The Drain:</strong> {item.impact}
              </p>
              <p className="text-xs text-emerald-300 leading-relaxed">
                <strong>The Aurevia Fix:</strong> {item.solution}
              </p>
            </motion.div>
          ))}
        </div>
      </BackgroundImageSection>

      {/* 4. Our Approach / Product Philosophy (Clean Section) */}
      <CleanSection id="philosophy" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">PRODUCT PHILOSOPHY</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            How We Architect Every Feature
          </h2>
          <p className="text-base text-slate-600 font-normal">
            We hold ourselves to the highest standards of software craftsmanship, data privacy, and visual elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Floor-Tested First',
              desc: 'Every modal, calendar drag action, and receipt layout is tested inside real salons with active clients before release.',
            },
            {
              step: '02',
              title: 'Role-Based Harmony',
              desc: 'Owners get macro revenue BI. Managers get floor supervision. Stylists get private tips & chair schedules. Zero permission overlap.',
            },
            {
              step: '03',
              title: 'Zero Vendor Lock-in',
              desc: 'Your client data and customer history belong to you. One-click CSV and JSON exports ensure you always own your salon’s assets.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 cursor-default"
            >
              <span className="text-3xl font-extrabold text-pink-400 font-mono mb-3 block">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </CleanSection>

      {/* 5. Aurevia Values (Clean Section / Cards) */}
      <CleanSection id="values" variant="dark">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">OUR CORE VALUES</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white">
            Principles That Direct Our Journey
          </h2>
          <p className="text-base text-slate-300">
            We are dedicated to building a sustainable, trustworthy software company that champions small and growing beauty businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624] border border-white/10 rounded-3xl p-7 hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(230,57,122,0.18)] transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#FF659F]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 6. Vision / Future (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.modernHairStudio}
        imageAlt="Future of Salon Technology"
        overlayOpacity="cinematic"
        imageOpacity={0.35}
        id="vision"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <SectionBadge variant="pink">THE VISION</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Empowering 50,000 Salons to Flourish Independently
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We envision a beauty industry where creative entrepreneurs can launch, scale, and manage multi-chair salons without sacrificing their work-life balance or paying predatory commission taxes.
          </p>
          <div className="pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-gradient text-white text-sm font-bold shadow-xl shadow-pink-500/25 hover:opacity-95 transition-opacity"
            >
              <span>Join the Movement — Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </BackgroundImageSection>

      {/* 7. Final Pre-Footer CTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}

