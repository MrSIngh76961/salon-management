'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { PRICING_PLANS } from '@/data/mockData';

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#FAF9FB] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <SectionBadge variant="pink">TRANSPARENT PRICING</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Invest in Your Salon&apos;s Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            No surprise fees. No hidden payment markups. Every plan includes a 14-day free trial with zero risk.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span
              className={`text-xs sm:text-sm font-semibold cursor-pointer ${
                !isAnnual ? 'text-slate-900' : 'text-slate-500'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle annual pricing"
            >
              <motion.div
                className="w-5 h-5 bg-[#E6397A] rounded-full shadow-md"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-sm font-semibold cursor-pointer ${
                  isAnnual ? 'text-slate-900' : 'text-slate-500'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual Billing
              </span>
              <span className="text-[11px] font-bold text-[#E6397A] bg-pink-100/80 border border-pink-200 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#E6397A] shadow-2xl shadow-pink-500/15 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular Highlight Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D81B60] via-[#E6397A] to-[#FF659F] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[34px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / month {isAnnual ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What&apos;s included:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.popular
                              ? 'bg-pink-100 text-[#E6397A]'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    href="#final-cta"
                    className="w-full justify-center text-xs sm:text-sm font-semibold py-3"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.ctaText}
                  </Button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    14-day free trial • Cancel anytime
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise & Security reassurance */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#E6397A]" />
            SOC2 Type II & PCI-DSS Level 1 Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            Zero Setup or Hidden Platform Fees
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-500" />
            Free Concierge Client Data Migration
          </span>
        </div>
      </div>
    </section>
  );
};
