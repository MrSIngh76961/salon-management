'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, RefreshCw, ArrowRight, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthButton } from '@/components/auth/AuthButton';
import { FormError, FormSuccess } from '@/components/auth/FormAlert';
import { useAuth } from '@/context/AuthContext';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get('email');

  const { user, resendVerificationEmail, verifyEmail } = useAuth();
  const displayEmail = queryEmail || user?.email || 'owner@luxestudio.com';

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setError(null);
    setMessage(null);

    const result = await resendVerificationEmail(displayEmail);
    setResendLoading(false);

    if (result.success) {
      setMessage('A fresh verification link has been dispatched to your inbox.');
      setCountdown(30);
      setCanResend(false);
    } else {
      setError(result.error || 'Failed to resend verification email.');
    }
  };

  const handleSimulateVerification = async () => {
    setVerifyLoading(true);
    await verifyEmail();
    setVerifyLoading(false);
    router.push('/verification-success');
  };

  return (
    <AuthLayout
      heading="Verify your email"
      subheading="We've sent a verification link to your email address."
    >
      <AuthCard>
        <div className="text-center py-2 space-y-5">
          {/* Animated Mail Icon */}
          <div className="relative mx-auto w-16 h-16 rounded-3xl bg-pink-50 border border-pink-200/80 text-[#E6397A] flex items-center justify-center shadow-md shadow-pink-500/10">
            <Mail className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              Confirm your salon address
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Click the link inside the confirmation email sent to:
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-bold border border-slate-200 max-w-full truncate">
              <Mail className="w-3.5 h-3.5 text-[#E6397A] shrink-0" />
              <span className="truncate">{displayEmail}</span>
            </div>
          </div>

          <FormSuccess message={message} onClose={() => setMessage(null)} />
          <FormError message={error} onClose={() => setError(null)} />

          {/* Action: Simulate instant email verification (Demo Testing) */}
          <div className="space-y-3 pt-2">
            <AuthButton
              onClick={handleSimulateVerification}
              isLoading={verifyLoading}
              loadingText="Verifying email token..."
              variant="primary"
            >
              <span>Verify & Continue (Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </AuthButton>

            {/* Resend button with countdown */}
            <button
              type="button"
              disabled={!canResend || resendLoading}
              onClick={handleResend}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                canResend
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                  : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resendLoading ? 'animate-spin' : ''}`} />
              <span>
                {canResend ? 'Resend verification link' : `Resend available in ${countdown}s`}
              </span>
            </button>
          </div>

          {/* Change email or back to login */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              href="/register"
              className="hover:text-[#E6397A] transition-colors"
            >
              Wrong email address? Change email
            </Link>

            <Link
              href="/login"
              className="font-bold text-slate-700 hover:text-slate-900"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9FB] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#E6397A]" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
