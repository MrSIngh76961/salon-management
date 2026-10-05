'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bell,
  Heart,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { BackgroundImageSection } from '@/components/public/BackgroundImageSection';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { PUBLIC_IMAGES } from '@/data/publicImages';

export const HomeAutomationGrowth: React.FC = () => {
  const automations = [
    {
      icon: Bell,
      badge: 'Zero No-Shows',
      title: 'Automated Multi-Channel Reminders',
      description:
        'Deliver timely SMS, WhatsApp, and email alerts 24h & 2h before appointments. Clients confirm or reschedule with 1-click.',
      stat: '98% on-time arrival rate',
    },
    {
      icon: CreditCard,
      badge: 'Protected Revenue',
      title: 'Upfront Deposits & Card-on-File',
      description:
        'Require customizable security deposits for high-value services (extensions, keratin, balayage) to permanently deter no-shows.',
      stat: '₹0 lost on late cancellations',
    },
    {
      icon: Heart,
      badge: 'High Lifetime Value',
      title: 'Client Re-Engagement Sequences',
      description:
        'Trigger automatic reminders when a client is due for their 6-week root touch-up or seasonal conditioning session.',
      stat: '+34% returning booking rate',
    },
    {
      icon: TrendingUp,
      badge: 'Smart Yield',
      title: 'Dynamic Chair Optimization',
      description:
        'Fill slower Tuesday mornings automatically with targeted VIP perks, loyalty promotions, and last-minute cancellation fills.',
      stat: '+18% weekly utilization',
    },
  ];

  return (
    <BackgroundImageSection
      imageSrc={PUBLIC_IMAGES.warmLightingSalon}
      imageAlt="Warm Ambient Salon Lighting"
      overlayOpacity="cinematic"
      id="growth-automation"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center mb-16 space-y-4"
      >
        <SectionBadge variant="pink">AUTOMATION & RETENTION ENGINE</SectionBadge>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          Put Salon Growth on Autopilot. <br />
          <span className="text-gradient-pink font-semibold">
            Protect Revenue Around the Clock.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          While your stylists concentrate on hair artistry and client care, Aurevia’s background automation engine handles confirmation pings, deposit security, and retention touchpoints.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {automations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl flex flex-col justify-between group hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.22)] transition-all duration-300 cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#FF659F]" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-pink-500/10 text-pink-300 border border-pink-500/20 group-hover:bg-pink-500/20 group-hover:border-pink-500/40 transition-colors">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-pink-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Proven Impact:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.stat}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BackgroundImageSection>
  );
};
