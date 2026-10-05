'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  CreditCard,
  Check,
  TrendingUp,
  Sparkles,
  Building2,
  DollarSign,
} from 'lucide-react';
import { PLATFORM_SUBSCRIPTIONS } from '@/data/mockSubscriptions';
import { SUPER_ADMIN_STATS } from '@/data/mockSalons';

export default function AdminSubscriptionsPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminSubscriptionsContent />
    </ProtectedRoute>
  );
}

function AdminSubscriptionsContent() {
  const plans = PLATFORM_SUBSCRIPTIONS;

  return (
    <DashboardLayout title="Subscription Governance" breadcrumb="Subscriptions">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              SaaS Subscription Plans & MRR
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Recurring ARR Engine
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage multi-tenant billing tiers, pricing thresholds, active salon seats, and recurring revenue run rates.
          </p>
        </div>
      </div>

      {/* MRR Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Monthly Recurring Revenue
          </span>
          <div className="text-3xl font-black text-emerald-600 mt-2">
            ${SUPER_ADMIN_STATS.platformMRR.toLocaleString('en-US')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Across 142 subscription tenants
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Annual Recurring Run Rate (ARR)
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            ${(SUPER_ADMIN_STATS.platformMRR * 12).toLocaleString('en-US')}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +18.4% projection trajectory
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Trial Conversions
          </span>
          <div className="text-3xl font-black text-purple-600 mt-2">
            22 Studios
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Average 82% conversion rate
          </span>
        </div>
      </div>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-3xl p-6 border flex flex-col justify-between shadow-xs ${
              plan.tier === 'Professional'
                ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                : 'border-slate-200/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-lg">{plan.name}</h3>
                {plan.tier === 'Professional' && (
                  <span className="text-[10px] font-black uppercase text-brand-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">${plan.monthlyPrice}</span>
                <span className="text-xs text-slate-400 font-semibold">/ month</span>
              </div>

              <div className="mt-2 text-xs font-bold text-slate-500">
                {plan.activeCount} Salons Active • {plan.trialCount} on Trial
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => alert(`Configuring ${plan.name} plan parameters...`)}
                className="w-full py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200"
              >
                Edit Tier Features
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
