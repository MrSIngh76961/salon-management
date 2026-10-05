'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';

export const HomePricingPreview: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter Studio',
      description: 'Ideal for boutique salons & solo master stylists.',
      priceMonthly: '₹2,499',
      priceAnnual: '₹1,999',
      badge: null,
      highlight: false,
      features: [
        'Up to 3 Stylist Accounts',
        '24/7 Client Online Booking',
        'Multi-Column Day Calendar',
        'Automated Email Confirmations',
        'Client CRM & Notes Archive',
        'Standard Business Analytics',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/register',
    },
    {
      name: 'Professional Salon',
      description: 'Our most popular tier for growing 4–10 chair salons.',
      priceMonthly: '₹4,999',
      priceAnnual: '₹3,999',
      badge: 'MOST POPULAR',
      highlight: true,
      features: [
        'Up to 10 Stylist Accounts',
        'Unlimited Online Bookings',
        'SMS & WhatsApp Automated Reminders',
        'Custom Color Formula Vault',
        'Staff Commission & Tip Tracker',
        'Online Deposit & No-Show Protection',
        'Advanced Revenue & Tax BI',
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/register',
    },
    {
      name: 'Multi-Location Enterprise',
      description: 'Complete centralized governance for multi-branch salons.',
      priceMonthly: '₹9,999',
      priceAnnual: '₹7,999',
      badge: 'MULTI-BRANCH',
      highlight: false,
      features: [
        'Unlimited Stylists & Locations',
        'Floor Manager & Receptionist Roles',
        'Centralized Cross-Branch Inventory',
        'Multi-Tenant Revenue Dashboards',
        'Dedicated Concierge Support',
        'Custom Domain & Brand Theming',
        'Custom Data Migration Service',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#FAF9FB] text-slate-900 relative overflow-hidden border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <SectionBadge variant="pink">TRANSPARENT PRICING</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Predictable Plans. <br />
            <span className="text-gradient-pink font-semibold">
              Zero Hidden Booking Surcharges.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Unlike legacy booking platforms, Aurevia never takes a percentage cut of your salon’s hard-earned client revenue.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 bg-slate-200 rounded-full p-0.5 transition-colors relative cursor-pointer hover:bg-slate-300"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#E6397A] shadow-md transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
              <span>Annual</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative cursor-default ${
                  plan.highlight
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-[#E6397A] hover:shadow-[0_25px_60px_rgba(230,57,122,0.25)] hover:ring-pink-400'
                    : 'bg-white text-slate-900 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-pink-500/15 hover:border-pink-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gradient text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-200/30">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {price}
                    </span>
                    <span className={`text-xs ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                      / month {billingCycle === 'annual' ? '(billed yearly)' : ''}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-bold uppercase tracking-wider ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>
                      Included capabilities:
                    </div>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          plan.highlight ? 'bg-pink-500/20 text-[#FF659F]' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={plan.highlight ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
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

        {/* View Full Feature Comparison link */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6397A] hover:underline"
          >
            <span>Compare all 40+ enterprise features & add-ons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
