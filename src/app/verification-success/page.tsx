'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, Building, Calendar, Users } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { ROLE_REDIRECTS } from '@/types/auth';

export default function VerificationSuccessPage() {
  const { user, role } = useAuth();
  const targetDashboard = role ? ROLE_REDIRECTS[role] : '/dashboard';

  return (
    <AuthLayout
      heading="Welcome to Aurevia!"
      subheading="Your email address has been verified and your account is active."
    >
      <AuthCard>
        <div className="text-center py-4 space-y-6">
          {/* Animated Success Badge */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25 relative"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-emerald-400"
            />
          </motion.div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Account Activated
            </span>

            <h3 className="text-2xl font-bold text-slate-900">
              Email verified successfully
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your Aurevia account is ready. You now have full access to your salon scheduling and operations workspace.
            </p>
          </div>

          {/* Quick checklist of what is unlocked */}
          <div className="bg-[#FAF9FB] rounded-2xl p-4 border border-slate-200/80 text-left space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              What you can do next:
            </span>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Calendar className="w-4 h-4 text-[#E6397A] shrink-0" />
              <span>Configure your services menu and pricing</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Users className="w-4 h-4 text-[#E6397A] shrink-0" />
              <span>Invite your stylists and configure their schedules</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Building className="w-4 h-4 text-[#E6397A] shrink-0" />
              <span>Share your customized 24/7 online booking link</span>
            </div>
          </div>

          {/* Continue CTA */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              href={targetDashboard}
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
              className="w-full justify-center text-sm font-bold py-3.5 shadow-xl shadow-pink-500/25"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
