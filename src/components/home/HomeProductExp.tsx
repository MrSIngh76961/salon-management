'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Users,
  BarChart3,
  Scissors,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

export const HomeProductExp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'appointments' | 'staff' | 'analytics'>('calendar');

  const tabs = [
    { id: 'calendar', label: 'Multi-Staff Calendar', icon: CalendarDays },
    { id: 'appointments', label: 'Appointment Center', icon: Scissors },
    { id: 'staff', label: 'Stylist Roster & Shifts', icon: Users },
    { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <SectionBadge variant="pink">PRODUCT EXPERIENCE</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            The Interface Salon Teams <br />
            <span className="text-gradient-pink font-semibold">
              Actually Love Using Every Day.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Engineered with zero clutter, high aesthetic polish, and lightning-fast responsiveness for high-volume front desks and mobile stylists on the move.
          </p>
        </motion.div>

        {/* Tab Switcher Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/25 ring-2 ring-pink-500/40'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF659F]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Showcase Card */}
        <div className="rounded-3xl border border-slate-200 bg-[#FAF9FB] p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-50 text-[#E6397A] border border-pink-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Drag & Drop
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Day, Week & Multi-Stylist Visual Columns
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    View all 8 salon chairs side-by-side. Spot open slots instantly, manage processing buffers, and reschedule with a simple mouse drag.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Color-coded appointment statuses with VIP markers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Automatic break time and cleaning buffer guards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Filter by specialist, service category, or room</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Button variant="primary" size="sm" href="/appointment-management">
                      Explore Calendar Tools →
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#E6397A]" />
                      Today&apos;s Floor Schedule (Thursday, 8 Chairs Active)
                    </span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      10 Appointments Confirmed
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { time: '10:00 AM', client: 'Sophia Martinez (VIP)', service: 'Balayage & Toner', stylist: 'Elena Rostova', status: 'In Progress', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                      { time: '11:15 AM', client: 'Alexander Wright', service: 'Precision Fade & Beard', stylist: 'Julian Reed', status: 'Checked-in', statusColor: 'bg-blue-50 text-blue-700 border-blue-200' },
                      { time: '01:00 PM', client: 'Isabella Gomez (VIP)', service: 'Hydrafacial Deluxe', stylist: 'Ava Taylor', status: 'Confirmed', statusColor: 'bg-pink-50 text-pink-700 border-pink-200' },
                      { time: '02:30 PM', client: 'Marcus Sterling', service: 'Deep Conditioning & Cut', stylist: 'Lucas Vance', status: 'Confirmed', statusColor: 'bg-purple-50 text-purple-700 border-purple-200' },
                    ].map((row) => (
                      <div
                        key={row.client}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-2 hover:bg-pink-50/60 hover:border-pink-200 hover:shadow-xs transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-500 w-16 text-[11px] group-hover:text-[#E6397A] transition-colors">{row.time}</span>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-[#E6397A] transition-colors">{row.client}</div>
                            <div className="text-[11px] text-slate-500">{row.service} • with {row.stylist}</div>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border self-start sm:self-auto ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments' && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                    <Scissors className="w-3.5 h-3.5" />
                    Lifecycle Engine
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Complete Control of Every Client Booking
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Check-in arriving clients with a single tap. Send automated SMS status updates to pending arrivals, mark no-shows, and process POS checkouts without switching screens.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>One-click Check-in, In Progress, and Completed states</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Instant reschedule modal with dynamic conflict detection</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Button variant="primary" size="sm" href="/appointment-management">
                      See Appointment Flow →
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Active Treatment in Chair #3</div>
                      <div className="text-[11px] text-slate-600">Sophia Martinez • Hair Balayage & Glossing (120 mins)</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
                      Chair In Progress
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-lg font-bold text-slate-900"><AnimatedCounter value="100%" /></div>
                      <div className="text-[10px] text-slate-500 uppercase">On-Time Starts</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-lg font-bold text-emerald-600"><AnimatedCounter value="0.0%" /></div>
                      <div className="text-[10px] text-slate-500 uppercase">No-Show Rate Today</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'staff' && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-100">
                    <Users className="w-3.5 h-3.5" />
                    Team Orchestration
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Empower Stylists, Balance Chair Rotations
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Set customized service menus per stylist, allocate working hours, approve leave requests, and calculate commission tiers transparently.
                  </p>
                  <div className="pt-4">
                    <Button variant="primary" size="sm" href="/staff-management">
                      Staff Management Suite →
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                  {[
                    { name: 'Elena Rostova', role: 'Master Colorist', appointments: '5 Today', rating: '5.0 ★', status: 'Available' },
                    { name: 'Julian Reed', role: 'Senior Stylist', appointments: '4 Today', rating: '4.9 ★', status: 'In Service' },
                    { name: 'Ava Taylor', role: 'Esthetician Specialist', appointments: '3 Today', rating: '4.8 ★', status: 'Available' },
                  ].map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:bg-purple-50/60 hover:border-purple-200 hover:shadow-xs transition-all duration-200 cursor-pointer group"
                    >
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.role} • {s.appointments}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-500">{s.rating}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold group-hover:bg-purple-100 group-hover:text-purple-800 transition-colors">{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Business Intelligence
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    Real-Time Revenue, Average Ticket & Chair Yield
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Make confident salon decisions backed by data. Track daily sales velocity, highest margin hair treatments, and one-click PDF tax exports.
                  </p>
                  <div className="pt-4">
                    <Button variant="primary" size="sm" href="/analytics">
                      Explore Analytics Engine →
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-100 hover:border-pink-300 hover:shadow-xs transition-all cursor-default">
                      <div className="text-xl font-extrabold text-[#E6397A]"><AnimatedCounter value="₹1,96,650" /></div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Revenue</div>
                    </div>
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-xs transition-all cursor-default">
                      <div className="text-xl font-extrabold text-emerald-600"><AnimatedCounter value="89.9%" /></div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Completion Rate</div>
                    </div>
                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-xs transition-all cursor-default">
                      <div className="text-xl font-extrabold text-purple-600"><AnimatedCounter value="+24.5%" /></div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">MoM Growth</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between hover:bg-slate-100/80 transition-colors">
                    <span className="font-semibold text-slate-700">Top Service: Balayage & Color Gloss</span>
                    <span className="font-bold text-slate-900">₹68,500 (34.8% of sales)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
