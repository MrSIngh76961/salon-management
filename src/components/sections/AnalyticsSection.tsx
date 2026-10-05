'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Users,
  CalendarCheck,
  Percent,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Scissors,
  Award,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';

export const AnalyticsSection: React.FC = () => {
  const kpis = [
    {
      title: "Today's Appointments",
      value: '34',
      subtext: '4 in progress • 2 remaining',
      trend: '+12%',
      isPositive: true,
    },
    {
      title: 'Monthly Net Revenue',
      value: '$42,850',
      subtext: '$8,420 retail sales included',
      trend: '+18.4%',
      isPositive: true,
    },
    {
      title: 'Completion Rate',
      value: '98.2%',
      subtext: 'Only 3 reschedules this month',
      trend: '+2.1%',
      isPositive: true,
    },
    {
      title: 'Active Clients',
      value: '1,420',
      subtext: '142 new first-time clients',
      trend: '+24%',
      isPositive: true,
    },
  ];

  const topServices = [
    { name: 'Balayage & Color Gloss', count: 184, revenue: '$35,880', pct: 85 },
    { name: 'Precision Cut & Blowout', count: 320, revenue: '$20,800', pct: 65 },
    { name: 'Botanical Hydrafacial', count: 96, revenue: '$9,120', pct: 45 },
    { name: 'Deluxe Gel Spa Pedicure', count: 110, revenue: '$7,700', pct: 35 },
  ];

  return (
    <section className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">SALON INTELLIGENCE & ANALYTICS</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Clear Financial Visibility for Maximum Profitability
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Actionable data that reveals your highest-earning stylists, most profitable services, and chair occupancy bottlenecks.
          </p>
        </div>

        {/* 4 KPI Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#FAF9FB] rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-pink-300 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>{kpi.title}</span>
                <span className="flex items-center text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {kpi.trend}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {kpi.value}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{kpi.subtext}</div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Visual Representation Container */}
        <div className="bg-[#FAF9FB] rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8">
          {/* Main Visual: Revenue Trend Chart & Top Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Revenue Trend Simulation (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Weekly Revenue & Booking Trajectory
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mon - Sun Performance compared to previous week
                  </p>
                </div>
                <span className="text-xs font-bold text-[#E6397A] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                  +$6,400 Target Exceeded
                </span>
              </div>

              {/* Bar / Column Chart Visual */}
              <div className="pt-6 pb-2">
                <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-100 px-2">
                  {[
                    { day: 'Mon', h: '45%', val: '$3.8k' },
                    { day: 'Tue', h: '60%', val: '$5.2k' },
                    { day: 'Wed', h: '75%', val: '$6.5k' },
                    { day: 'Thu', h: '85%', val: '$7.8k' },
                    { day: 'Fri', h: '98%', val: '$9.4k', highlight: true },
                    { day: 'Sat', h: '100%', val: '$10.2k', highlight: true },
                    { day: 'Sun', h: '40%', val: '$3.4k' },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                        {bar.val}
                      </span>
                      <div
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          bar.highlight
                            ? 'bg-brand-gradient shadow-md shadow-pink-500/20'
                            : 'bg-slate-200 group-hover:bg-slate-300'
                        }`}
                        style={{ height: bar.h }}
                      />
                      <span className="text-xs font-semibold text-slate-600 mt-1">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-gradient" />
                  <span>Peak Salon Days (Fri & Sat)</span>
                </div>
                <span>Average ticket: $128.50</span>
              </div>
            </div>

            {/* Right: Top Performing Services (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Highest Revenue Services
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Ranked by gross monthly turnover</p>
                </div>
                <Award className="w-4 h-4 text-[#E6397A]" />
              </div>

              <div className="space-y-4 pt-2">
                {topServices.map((svc) => (
                  <div key={svc.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{svc.name}</span>
                      <span className="font-extrabold text-slate-900">{svc.revenue}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gradient rounded-full"
                        style={{ width: `${svc.pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{svc.count} appointments completed</span>
                      <span>{svc.pct}% of capacity</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
