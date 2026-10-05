'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, TrendingUp, Sparkles, ArrowUpRight, HeartHandshake } from 'lucide-react';

interface CustomerStatsProps {
  totalCount: number;
  vipCount: number;
  avgSpend: number;
}

export const CustomerStats: React.FC<CustomerStatsProps> = ({
  totalCount,
  vipCount,
  avgSpend,
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Client Roster',
      value: totalCount,
      subtext: '+38 new this month',
      indicator: 'Active Database',
      icon: Users,
      color: 'text-[#E6397A]',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      gradient: 'from-pink-500/10 to-transparent',
    },
    {
      id: 'vip',
      title: 'VIP Loyalty Tier',
      value: vipCount,
      subtext: 'High LTV accounts',
      indicator: 'Top 15%',
      icon: Crown,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      id: 'avg-spend',
      title: 'Avg Customer Spend',
      value: `₹${avgSpend.toLocaleString('en-IN')}`,
      subtext: 'Per lifetime profile',
      indicator: 'Ticket Average',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      id: 'retention',
      title: 'Re-booking Rate',
      value: '78.5%',
      subtext: 'Clients visiting 3+ times',
      indicator: 'Retention',
      icon: HeartHandshake,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      gradient: 'from-purple-500/10 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-3xl bg-white p-5 sm:p-6 border ${card.border} shadow-sm shadow-slate-100/80 hover:shadow-md transition-all duration-200`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} rounded-bl-full pointer-events-none opacity-40`}
            />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  {card.title}
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {card.value}
                  </h3>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl ${card.bg} ${card.color} border ${card.border} shadow-xs shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium truncate max-w-[170px]">
                {card.subtext}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60 shrink-0">
                <span>{card.indicator}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
