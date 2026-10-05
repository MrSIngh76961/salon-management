'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sparkles, Check, Crown, CreditCard, ShieldCheck } from 'lucide-react';
import { PLATFORM_SUBSCRIPTIONS } from '@/data/mockSubscriptions';
import { SALON_BUSINESS_PROFILE } from '@/data/navigation';

export default function SubscriptionPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN']}>
      <SubscriptionContent />
    </ProtectedRoute>
  );
}

function SubscriptionContent() {
  return (
    <DashboardLayout title="Subscription & Billing" breadcrumb="Subscription">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              SalonPro Subscription Plan
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-brand-600 border border-pink-200">
              {SALON_BUSINESS_PROFILE.tier}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Current billing cycle renews on Oct 15, 2026 • 8 Active Styling Chairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {PLATFORM_SUBSCRIPTIONS.map((plan) => {
          const isCurrent = plan.tier === 'Professional';

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between shadow-xs relative ${
                isCurrent
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-lg">{plan.name}</h3>
                  {isCurrent && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                      Current Plan
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">${plan.monthlyPrice}</span>
                  <span className="text-xs text-slate-400 font-semibold">/ month</span>
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
                  disabled={isCurrent}
                  onClick={() => alert(`Upgraded to ${plan.name}!`)}
                  className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-gradient-to-r from-brand-500 to-purple-600 text-white shadow-md shadow-brand-500/20 hover:from-brand-600'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : 'Upgrade Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
