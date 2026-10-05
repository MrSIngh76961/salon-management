'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter Studio',
      subtitle: 'For independent stylists and boutique 1–3 chair studios.',
      monthlyPrice: '₹2,499',
      annualPrice: '₹1,999',
      stylists: 'Up to 3 Stylists',
      highlight: false,
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/register',
      features: [
        '24/7 Client Online Booking Engine',
        'Multi-Column Day & Week Calendar',
        'Automated Email Booking Confirmations',
        'Customer Profile & Notes Archive',
        'Standard Sales Reporting (PDF)',
        'Zero Booking Commission Surcharges',
      ],
    },
    {
      name: 'Professional Salon',
      subtitle: 'The gold standard for established 4–10 chair salons.',
      monthlyPrice: '₹4,999',
      annualPrice: '₹3,999',
      stylists: 'Up to 10 Stylists',
      badge: 'MOST POPULAR',
      highlight: true,
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/register',
      features: [
        'Everything in Starter Studio',
        'Unlimited Online Appointments',
        'Two-Way SMS & WhatsApp Reminders',
        'Color Formula Technical Vault',
        'Deposit Protection & No-Show Fees',
        'Stylist Tip & Commission Engine',
        'Live Chair Utilization Analytics',
        'Priority Concierge Support (Phone & Chat)',
      ],
    },
    {
      name: 'Franchise Enterprise',
      subtitle: 'Multi-branch operations and high-volume salon networks.',
      monthlyPrice: '₹9,999',
      annualPrice: '₹7,999',
      stylists: 'Unlimited Stylists & Locations',
      badge: 'MULTI-LOCATION',
      highlight: false,
      ctaText: 'Contact Enterprise Sales',
      ctaHref: '/contact',
      features: [
        'Everything in Professional Salon',
        'Centralized Multi-Tenant HQ Dashboard',
        'Cross-Branch Client Portability',
        'Universal Gift Cards & VIP Points',
        'Dedicated Solutions Architect & Onboarding',
        'Custom Domain & Luxury Brand Theme',
        'Automated Database Backups & 99.99% SLA',
      ],
    },
  ];

  const comparisonRows = [
    { feature: 'Online Client Self-Booking', starter: true, pro: true, enterprise: true },
    { feature: 'Multi-Column Day & Week Calendar', starter: true, pro: true, enterprise: true },
    { feature: 'Client CRM & Visit History', starter: true, pro: true, enterprise: true },
    { feature: 'Stylist Accounts Included', starter: 'Up to 3', pro: 'Up to 10', enterprise: 'Unlimited' },
    { feature: 'Automated SMS & WhatsApp Reminders', starter: false, pro: true, enterprise: true },
    { feature: 'Deposit Collection & Card-on-File', starter: false, pro: true, enterprise: true },
    { feature: 'Technical Color Formula Vault', starter: false, pro: true, enterprise: true },
    { feature: 'Staff Commission & Tip Tracker', starter: false, pro: true, enterprise: true },
    { feature: 'Advanced Revenue & Tax Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Enterprise BI' },
    { feature: 'Multi-Location HQ Rollup', starter: false, pro: false, enterprise: true },
    { feature: 'Custom Domain & Whitelabel Theme', starter: false, pro: false, enterprise: true },
    { feature: 'Dedicated Onboarding Concierge', starter: 'Self-Serve', pro: 'Live Chat', enterprise: 'Dedicated Lead' },
  ];

  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      <PublicNavbar />

      {/* 1. Pricing Hero (Background Image) */}
      <PublicPageHero
        badge="SIMPLE & HONEST PRICING"
        title="Invest in Your Salon’s Growth. Never Pay"
        titleHighlight="a Booking Commission."
        description="Predictable flat-rate software subscription. Keep 100% of your service sales and client tips. Zero surprise fees, zero setup costs, and cancel anytime with 1-click."
        imageSrc={PUBLIC_IMAGES.goldAestheticSalon}
        imageAlt="Luxury Salon Pro Pricing"
        imageOpacity={0.4}
        primaryCtaText="Start 14-Day Free Trial"
        primaryCtaHref="/register"
        secondaryCtaText="Compare Features Below"
        secondaryCtaHref="#comparison"
        breadcrumbs={[{ label: 'Pricing' }]}
        stats={[
          { label: 'Booking Commission', value: '0.0%' },
          { label: 'Setup Fees', value: '₹0' },
          { label: 'Trial Period', value: '14 Days Free' },
          { label: 'Annual Discount', value: '20% Off' },
        ]}
      />

      {/* 2. Pricing Plans (Clean Section) */}
      <CleanSection id="plans" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <SectionBadge variant="pink">FLEXIBLE BILLING</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Choose the Tier Tailored to Your Floor
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every plan includes our core scheduling matrix, zero commission policy, and unlimited client records.
          </p>

          {/* Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Billed Monthly
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 bg-slate-200 rounded-full p-0.5 transition-colors relative cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#E6397A] shadow-md transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
              <span>Billed Annually</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative cursor-pointer ${
                  plan.highlight
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-[#E6397A] hover:shadow-[0_20px_50px_rgba(230,57,122,0.3)]'
                    : 'bg-white text-slate-900 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gradient text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">{plan.name}</h3>
                  <div className="text-xs font-semibold text-[#E6397A] mb-2">{plan.stylists}</div>
                  <p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-200/30">
                    <span className="text-4xl font-extrabold tracking-tight">{price}</span>
                    <span className={`text-xs ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                      / month {billingCycle === 'annual' ? '(paid annually)' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          plan.highlight ? 'bg-pink-500/20 text-[#FF659F]' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={plan.highlight ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Button
                    variant={plan.highlight ? 'primary' : 'outline'}
                    size="lg"
                    href={plan.ctaHref}
                    className="w-full text-xs font-bold py-3"
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CleanSection>

      {/* 3. Feature Comparison (Clean Section) */}
      <CleanSection id="comparison" variant="light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <SectionBadge variant="pink">IN-DEPTH AUDIT</SectionBadge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900">
            Compare Features Side-by-Side
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every plan includes bank-grade security, mobile portal access, and free historical data migration.
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                  <th className="py-4 px-6 font-bold">Platform Feature</th>
                  <th className="py-4 px-6 font-bold text-center">Starter</th>
                  <th className="py-4 px-6 font-bold text-center text-[#E6397A]">Professional</th>
                  <th className="py-4 px-6 font-bold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-pink-50/40 transition-colors duration-200 cursor-pointer">
                    <td className="py-3.5 px-6 font-medium text-slate-800">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-600 font-semibold">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center bg-pink-50/20">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-4 h-4 text-[#E6397A] mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-[#E6397A] font-bold">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-900 font-bold">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CleanSection>

      {/* 4. What's Included (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
        imageAlt="What is Included in Aurevia Subscription"
        overlayOpacity="cinematic"
        imageOpacity={0.4}
        id="included"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">ALL PLANS INCLUDE</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            The Foundation of Salon Excellence
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No matter which tier you choose, you receive enterprise reliability, free software updates, and unlimited customer records.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6">
            {[
              {
                title: 'Free Data Migration',
                desc: 'Switching from Vagaro, Fresha, or paper? Our white-glove team imports your clients and formulas in 24 hours for free.',
              },
              {
                title: 'Unlimited Client Profiles',
                desc: 'Never pay more as your contact database grows. Store 500 or 50,000 clients without tier penalties.',
              },
              {
                title: 'Zero Payment Markups',
                desc: 'Connect your existing card processor directly or use our standard rates. Zero hidden interchange surcharges.',
              },
            ].map((inc, i) => (
              <motion.div
                key={inc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xs font-bold text-[#FF659F] uppercase tracking-wider mb-2 group-hover:text-pink-300 transition-colors">{inc.title}</div>
                <p className="text-xs text-slate-300">
                  {inc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 5. Billing / Upgrade Explanation (Clean Section) */}
      <CleanSection id="upgrade-terms" variant="light">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionBadge variant="pink">FAIR SUBSCRIPTION POLICIES</SectionBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Upgrade or Scale Down Anytime
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Salon seasons fluctuate. Add extra stylist seats during wedding and holiday rush seasons, and adjust your plan as your team evolves with prorated billing.
            </p>
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Prorated billing on seat upgrades</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1-click self-serve subscription cancellation with zero lock-in</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
            className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300 space-y-3"
          >
            <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
              14-Day Free Trial Guarantee
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test Aurevia with your actual staff, clients, and services. If you don&apos;t experience immediate time savings and positive client feedback, simply walk away without paying a single rupee.
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="primary" size="md" href="/register">
                  Start Risk-Free Trial Today →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CleanSection>

      {/* 6. Pricing FAQ (Background Image Section) */}
      <BackgroundImageSection
        imageSrc={PUBLIC_IMAGES.warmLightingSalon}
        imageAlt="Salon Warm Ambience FAQ"
        overlayOpacity="cinematic"
        imageOpacity={0.4}
        id="pricing-faq"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <SectionBadge variant="pink">PRICING CLARITY</SectionBadge>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Frequently Asked Billing Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left pt-6">
            {[
              {
                q: 'Do you charge a percentage per booking?',
                a: 'Never. We charge a flat monthly subscription. Whether you book 100 or 5,000 appointments, your price remains identical.',
              },
              {
                q: 'Can I keep my existing client data?',
                a: 'Yes! Our support team handles historical client migration, contact lists, and color formula archives completely free.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-xl hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-sm font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">{faq.q}</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BackgroundImageSection>

      {/* 7. PreFooterCTA & Footer */}
      <PreFooterCTA />
      <PublicFooter />
    </main>
  );
}
