'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  UserCheck,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { BackgroundImageSection } from '@/components/public/BackgroundImageSection';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { PUBLIC_IMAGES } from '@/data/publicImages';

export const HomeSmartOps: React.FC = () => {
  const pillars = [
    {
      icon: CalendarDays,
      title: 'Smart Appointment Matrix',
      description:
        'Live multi-stylist columns, color-coded statuses (In-Chair, Checked-In, Confirmed), and instant drag-and-drop rescheduling.',
      linkText: 'Explore Calendar System',
      href: '/appointment-management',
    },
    {
      icon: UserCheck,
      title: 'Floor & Staff Orchestration',
      description:
        'Coordinate stylist shifts, processing times, and commission rates. Never double-book a specialist or leave a chair vacant.',
      linkText: 'View Staff Tools',
      href: '/staff-management',
    },
    {
      icon: Users,
      title: 'Bespoke Client CRM',
      description:
        'Detailed client profiles, visit timelines, spending metrics, and custom color formula archives at your fingertips.',
      linkText: 'Discover CRM Features',
      href: '/customer-management',
    },
  ];

  return (
    <BackgroundImageSection
      imageSrc={PUBLIC_IMAGES.luxurySohoChairs}
      imageAlt="Luxury Salon Interior Stations"
      overlayOpacity="cinematic"
      id="smart-operations"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center mb-16 space-y-4"
      >
        <SectionBadge variant="pink">SMART SALON OPERATIONS</SectionBadge>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          Total Synchronized Control <br />
          <span className="text-gradient-pink font-semibold">
            From Front Desk to Styling Chair.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Say goodbye to fragmented notes, missed appointment confirmations, and lost color formulas. Aurevia connects every touchpoint of your salon workflow in real time.
        </p>
      </motion.div>

      {/* 3 Pillars Glass Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
              className="bg-[#141624]/85 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl flex flex-col justify-between group hover:border-pink-500/60 hover:shadow-[0_20px_50px_rgba(230,57,122,0.2)] transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#FF659F]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-pink-100 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF659F] group-hover:text-white transition-colors"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BackgroundImageSection>
  );
};
