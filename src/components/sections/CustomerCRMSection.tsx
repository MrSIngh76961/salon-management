'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Heart,
  FileText,
  AlertTriangle,
  Sparkles,
  Coffee,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { SAMPLE_CUSTOMER_CRM } from '@/data/mockData';

export const CustomerCRMSection: React.FC = () => {
  const client = SAMPLE_CUSTOMER_CRM;

  return (
    <section className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">INTELLIGENT SALON CRM</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Turn First-Time Visitors into Loyal Lifetime Clients
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every client formula, beverage preference, patch test record, and appointment history securely stored in one unified profile.
          </p>
        </div>

        {/* CRM Showcase Layout: Split between Image Highlight and Full SaaS CRM Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Salon Experience Image + Quick Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] bg-slate-900">
              <Image
                src="/images/salon_spa.jpg"
                alt="Client receiving luxury salon botanical hair spa treatment"
                fill
                className="object-cover filter contrast-[1.03]"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-2.5 py-1 rounded-full border border-pink-400/30">
                  Client Experience First
                </span>
                <h3 className="text-xl font-serif font-bold leading-snug">
                  Personalized care that keeps chairs full.
                </h3>
                <p className="text-xs text-slate-300">
                  Clients feel recognized the second they walk through the door.
                </p>
              </div>
            </div>

            {/* Retention stat banner */}
            <div className="bg-[#FAF9FB] p-5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Salon Client Retention</span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">92.4%</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E6397A] font-extrabold text-sm">
                +18%
              </div>
            </div>
          </div>

          {/* Right Column: Complete SaaS Client Profile CRM Card (8 cols) */}
          <div className="lg:col-span-8 bg-[#FAF9FB] rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            {/* Header: Profile, Contact, VIP Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-pink-100 shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-brand-gradient text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                    VIP
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{client.name}</h3>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active Member
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {client.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {client.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-gradient hover:brightness-105 transition-all shadow-md shadow-pink-500/20"
                >
                  Book New Visit
                </button>
              </div>
            </div>

            {/* Metric KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Total Spend
                </span>
                <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                  ${client.totalSpent}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Top 5% Spender</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Visits Count
                </span>
                <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {client.visitsCount}
                </div>
                <span className="text-[10px] text-slate-500">Every 4.5 weeks</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Next Booking
                </span>
                <div className="text-sm font-extrabold text-[#E6397A] mt-1 truncate">
                  Today, 9:30 AM
                </div>
                <span className="text-[10px] text-slate-500 truncate">Elena Rostova</span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  No-Show Rate
                </span>
                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">0%</div>
                <span className="text-[10px] text-emerald-600 font-semibold">100% Reliable</span>
              </div>
            </div>

            {/* Hair Color Formula Card & Allergies */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E6397A]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Technical Color Formula History
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Updated: Aug 14, 2026</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed">
                {client.formulaNotes}
              </div>

              {/* Allergy Warning */}
              <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200/80 px-3 py-2 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>
                  <strong>Allergy Warning:</strong> Allergic to synthetic fragrance oils. Use only organic tea tree backbar.
                </span>
              </div>
            </div>

            {/* Client Hospitality Preferences */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#E6397A]" />
                Hospitality & Service Preferences
              </h4>
              <div className="flex flex-wrap gap-2">
                {client.preferences.map((pref, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-pink-50 hover:text-[#E6397A] px-3 py-1 rounded-full transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#E6397A]" />
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
