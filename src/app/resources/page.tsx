'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  Sparkles,
  ArrowRight,
  Download,
  Calendar,
  Users,
  Search,
  CheckCircle2,
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

export default function ResourcesPage() {
  const articles = [
    {
      category: 'OPERATIONS',
      title: 'How to Eliminate Salon No-Shows: The Modern Deposit Playbook',
      readTime: '6 min read',
      date: 'March 18, 2026',
      desc: 'Proven SMS reminder cadences and low-friction deposit rules that reduce cancellation losses by over 80%.',
    },
    {
      category: 'GROWTH & REVENUE',
      title: 'Pricing Luxury Hair Balayage: Margin Calculation Blueprint',
      readTime: '8 min read',
      date: 'March 10, 2026',
      desc: 'How to accurately factor in developer volumes, toner glossing, and chair processing time into profitable pricing.',
    },
    {
      category: 'TALENT & CULTURE',
      title: 'Retaining Top Stylists: The Commission vs Booth Rental Debate',
      readTime: '5 min read',
      date: 'February 24, 2026',
      desc: 'Why leading boutique salons are moving toward transparent tiered commissions and automated daily tip disbursements.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Resources Hero (Background Image) */}
      <PublicPageHero
        badge="AUREVIA KNOWLEDGE ECOSYSTEM"
        title="Playbooks, Guides & Insights to Scale Your"
        titleHighlight="Salon Business."
        description="Explore in-depth operational guides, technical tutorials, staff commission blueprints, and video walkthroughs curated by salon veterans and software engineers."
        imageSrc={PUBLIC_IMAGES.teamHuddle}
        imageAlt="Salon Team Knowledge Center"
        primaryCtaText="Explore Help Center"
        primaryCtaHref="#help"
        secondaryCtaText="Read Blog Articles"
        secondaryCtaHref="#blog"
        breadcrumbs={[{ label: 'Resources' }]}
        stats={[
          { label: 'Published Guides', value: '45+' },
          { label: 'Video Walkthroughs', value: '30+ hrs' },
          { label: 'Community Members', value: '4,500+' },
          { label: 'Average Read Time', value: '5 mins' },
        ]}
      />

      {/* 2. Featured Resources (Clean Section) */}
      <CleanSection id="featured" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">FEATURED PLAYBOOKS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Free Masterclasses for Salon Owners
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Download our battle-tested operational templates, pricing spreadsheets, and client intake waivers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Download,
              badge: 'PDF TEMPLATE',
              title: 'The 2026 Salon Service Menu Pricing Calculator',
              desc: 'An Excel & PDF model to benchmark your haircuts, color, and spa treatments against local market medians.',
            },
            {
              icon: Video,
              badge: 'VIDEO MASTERCLASS',
              title: 'Optimizing Saturday Floor Capacity in Under 15 Mins',
              desc: 'Learn how to configure staggered processing buffers so your stylists can manage secondary blowouts seamlessly.',
            },
            {
              icon: FileText,
              badge: 'LEGAL GUIDE',
              title: 'Chemical Color Allergy Intake & Patch-Test Waiver',
              desc: 'Compliant client consultation templates designed to protect your salon against liability claims.',
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
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E6397A] transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <a href="#download" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6397A] group-hover:underline">
                    <span>Access Resource Free</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. FAQ / Knowledge Base (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.clientConsultation}
        imageAlt="Salon Knowledge Base"
        overlayOpacity="cinematic"
        id="kb"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">QUICK ANSWERS</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Have Questions About Setup or Migration?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our comprehensive FAQ library addresses hardware compatibility, receipt printing, multi-branch setup, and client data export.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/faq">
                Visit Full FAQ Accordion (/faq) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 4. Blog / Insights (Clean Section) */}
      <CleanSection id="blog" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">SALON INDUSTRY INSIGHTS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Latest Playbooks from the Field
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Written for salon entrepreneurs who care deeply about client experience and team retention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.article
              key={art.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3">
                  <span className="text-[#E6397A] font-extrabold">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E6397A] transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {art.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{art.date}</span>
                <span className="font-bold text-[#E6397A] group-hover:underline inline-flex items-center gap-1">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </CleanSection>

      {/* 5. Help Center (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.receptionDesk}
        imageAlt="Aurevia Concierge Help Center"
        overlayOpacity="cinematic"
        id="help"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">24/7 CONCIERGE SUPPORT</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            We’re By Your Side Every Step of the Way
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Need assistance setting up custom commission tiers or integrating your Instagram booking link? Our salon architects respond in under 3 minutes via live in-app chat.
          </p>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/contact">
                Contact Concierge Support (/contact) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 6. Useful Guides (Clean Section) */}
      <CleanSection id="useful-guides" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">DOCUMENTATION</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Step-by-Step Interactive Walkthroughs
          </h2>
          <p className="text-base text-slate-600">
            Detailed guides on hardware barcode scanners, thermal receipt printers, Google Calendar sync, and staff leave approvals.
          </p>
        </motion.div>
      </CleanSection>

      {/* 7. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
