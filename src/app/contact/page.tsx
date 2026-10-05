'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
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

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salonName: '',
    phone: '',
    chairCount: 'Solo Specialist / Studio Suite',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Contact Hero (Background Image) */}
      <PublicPageHero
        badge="SALON CONCIERGE & ENTERPRISE SALES"
        title="We’re Here to Help Your Salon"
        titleHighlight="Flourish."
        description="Have a question about multi-location rollout, data migration from legacy software, or custom salon hardware? Speak directly with our dedicated salon solutions architects."
        imageSrc={PUBLIC_IMAGES.luxuriousLoungeCta}
        imageAlt="Luxury Salon Reception Concierge"
        primaryCtaText="Submit an Inquiry"
        primaryCtaHref="#form"
        secondaryCtaText="Explore FAQ"
        secondaryCtaHref="/faq"
        breadcrumbs={[{ label: 'Contact Us' }]}
        stats={[
          { label: 'Chat Response', value: '<3 mins' },
          { label: 'Concierge Availability', value: 'Mon-Sat' },
          { label: 'Migration SLA', value: '<24 hrs' },
          { label: 'Customer Satisfaction', value: '99.2%' },
        ]}
      />

      {/* 2. Contact Options (Clean Section) */}
      <CleanSection id="contact-options" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">DIRECT CHANNELS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            How Would You Prefer to Connect?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Choose the channel most convenient for your busy salon schedule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: 'Direct Phone & Concierge',
              val: '+1 (800) 584-LUXE',
              desc: 'Available Monday through Saturday, 8:00 AM – 9:00 PM EST for urgent front desk assistance.',
              action: 'tel:+18005845893',
              actionText: 'Call Live Concierge',
            },
            {
              icon: Mail,
              title: 'Email & Technical Inquiries',
              val: 'concierge@aurevia.com',
              desc: 'Send custom feature requests, data migration files, or enterprise RFP documents.',
              action: 'mailto:concierge@aurevia.com',
              actionText: 'Send Direct Email',
            },
            {
              icon: MapPin,
              title: 'SoHo Flagship Studio & HQ',
              val: 'SoHo Design District, NY',
              desc: 'Book a VIP in-person demonstration with our product design team at our New York showroom.',
              action: '#form',
              actionText: 'Request Studio Visit',
            },
          ].map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#E6397A] transition-colors">{ch.title}</h3>
                  <div className="text-base font-extrabold text-[#E6397A] mb-3">{ch.val}</div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{ch.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <a href={ch.action} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">
                    <span>{ch.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. Contact Form */}
      <CleanSection id="form" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto grid overflow-hidden rounded-[2rem] border border-white shadow-[0_32px_100px_-35px_rgba(35,16,35,0.35)] lg:grid-cols-[0.82fr_1.18fr]"
        >
          <aside className="relative flex flex-col justify-between overflow-hidden bg-[#17111D] p-8 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full bg-[#E6397A]/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px]" />
            <div className="relative">
              <SectionBadge variant="pink">YOUR SALON, OUR PRIORITY</SectionBadge>
              <h2 className="mt-7 max-w-md font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                A more thoughtful way to grow your salon.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                Tell us where you want to go. A salon solutions specialist will help you find the right next step — no pressure, just a useful conversation.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-pink-300">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">A real person, quickly</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">Usually back in touch within 15 minutes during studio hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-pink-300">
                    <Building className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Advice for your kind of salon</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">From a solo studio to a growing, multi-location team.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 border-t border-white/10 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Prefer to reach us directly?</p>
              <a href="mailto:concierge@aurevia.com" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-pink-300">
                <Mail className="h-4 w-4 text-pink-300" />
                concierge@aurevia.com
              </a>
            </div>
          </aside>

          <div className="bg-white p-7 sm:p-10 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E6397A]">
                <Sparkles className="h-3.5 w-3.5" />
                Concierge request
              </div>
              <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Let&apos;s start a conversation.
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share a little about your salon and what you&apos;re looking for.
              </p>
            </div>

            {formSubmitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">Your inquiry is with our team.</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
                  Thank you, {formData.name}. A salon solutions specialist will reach you at <strong className="text-slate-800">{formData.email}</strong> shortly.
                </p>
                <Button variant="primary" size="sm" className="mt-6" onClick={() => setFormSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold text-slate-700">Full name <span className="text-[#E6397A]">*</span></label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="e.g. Elena Rostova" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold text-slate-700">Work email <span className="text-[#E6397A]">*</span></label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@your-salon.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10" />
                  </div>
                  <div>
                    <label htmlFor="contact-salon" className="mb-2 block text-xs font-semibold text-slate-700">Salon name <span className="text-[#E6397A]">*</span></label>
                    <input id="contact-salon" name="salonName" type="text" autoComplete="organization" required placeholder="Your salon or studio" value={formData.salonName} onChange={(e) => setFormData({ ...formData, salonName: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-xs font-semibold text-slate-700">Phone <span className="font-normal text-slate-400">(optional)</span></label>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-chair-count" className="mb-2 block text-xs font-semibold text-slate-700">How large is your salon?</label>
                  <select id="contact-chair-count" name="chairCount" value={formData.chairCount} onChange={(e) => setFormData({ ...formData, chairCount: e.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10">
                    <option>Solo Specialist / Studio Suite</option>
                    <option>1–3 Chairs</option>
                    <option>4–10 Chairs (Most Common)</option>
                    <option>11–25 Chairs</option>
                    <option>Multi-Location Franchise (25+ Chairs)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold text-slate-700">What can we help with? <span className="text-[#E6397A]">*</span></label>
                  <textarea id="contact-message" name="message" rows={4} required placeholder="Tell us about your goals, current setup, or anything you&apos;d like to ask..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full resize-y rounded-xl border border-slate-200 bg-[#FAF9FB] px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#E6397A] focus:bg-white focus:ring-4 focus:ring-[#E6397A]/10" />
                </div>

                <div className="pt-1">
                  <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }} type="submit" className="flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-shadow hover:shadow-xl hover:shadow-pink-500/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E6397A]/25">
                    <span>Send inquiry to our concierge</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Your details stay private and are only used to respond to your request.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </CleanSection>

      {/* 4. Business / Support Information (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Salon Support & SLA"
        overlayOpacity="cinematic"
        id="business-hours"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">CONCIERGE SLA</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            White-Glove Support for Busy Salon Teams
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We understand that a busy salon cannot afford downtime during Saturday morning rushes. That’s why all Aurevia accounts include priority phone and live screen-share support.
          </p>
        </motion.div>
      </BackgroundImageSection>

      {/* 5. FAQ / Support CTA (Clean Section) */}
      <CleanSection id="faq-cta" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <SectionBadge variant="pink">INSTANT ANSWERS</SectionBadge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Looking for Immediate Answers?
          </h2>
          <p className="text-base text-slate-600">
            Check our comprehensive FAQ directory for answers to questions about hardware, card processing rates, and staff permissions.
          </p>
          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Button variant="primary" size="md" href="/faq">
                Explore 40+ Answers in FAQ (/faq) →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </CleanSection>

      {/* 6. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
