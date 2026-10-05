'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  MessageSquare,
  Mail,
  Smartphone,
  Star,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { AUTOMATED_NOTIFICATIONS_DATA } from '@/data/mockData';

export const NotificationSection: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<string>('all');

  const filteredNotifs =
    activeChannel === 'all'
      ? AUTOMATED_NOTIFICATIONS_DATA
      : AUTOMATED_NOTIFICATIONS_DATA.filter((n) =>
          n.channel.toLowerCase().includes(activeChannel.toLowerCase())
        );

  return (
    <section className="py-24 bg-[#0E1018] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#E6397A]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">SMART AUTOMATION ENGINE</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Say Goodbye to Salon No-Shows Forever
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            Automated SMS, WhatsApp, and email reminders sent at the perfect moment. Clients confirm or reschedule with one tap.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#FF659F] mb-1">
              -65%
            </div>
            <div className="text-sm font-bold text-white">Reduction in No-Shows</div>
            <p className="text-xs text-slate-400 mt-1">Saves the average 4-chair salon $1,800/mo</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
              99.4%
            </div>
            <div className="text-sm font-bold text-white">Delivery & Open Rate</div>
            <p className="text-xs text-slate-400 mt-1">Instant carrier verification & two-way routing</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-md">
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
              Zero Effort
            </div>
            <div className="text-sm font-bold text-white">100% Autopilot Execution</div>
            <p className="text-xs text-slate-400 mt-1">Set your cadence once, runs seamlessly forever</p>
          </div>
        </div>

        {/* Notifications Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotifs.map((notif, index) => {
            const channelIcons: Record<string, React.ElementType> = {
              'SMS Reminder': MessageSquare,
              'Email Confirmation': Mail,
              'Push Notification': Smartphone,
              'Automated Review Request': Star,
            };
            const Icon = channelIcons[notif.channel] || Bell;

            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#151724]/90 border border-white/10 hover:border-pink-500/40 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-xl transition-all duration-300 relative group"
              >
                {/* Header: Channel & Timing Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[#FF659F]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {notif.channel}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Trigger: {notif.time}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${notif.badgeColor}`}>
                    {notif.status}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#FF659F] transition-colors">
                  {notif.title}
                </h4>

                {/* Message Body Simulation */}
                <div className="bg-[#0B0C11] rounded-2xl p-4 border border-white/5 text-xs text-slate-300 font-sans leading-relaxed">
                  <p className="italic text-slate-200">
                    &ldquo;{notif.preview}&rdquo;
                  </p>
                </div>

                {/* Interactive simulate reply bar */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Two-Way Live Sync to Master Calendar
                  </span>
                  <span className="text-slate-500">Automated</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
