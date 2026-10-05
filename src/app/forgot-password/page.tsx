'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Inbox } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { FormError } from '@/components/auth/FormAlert';
import { PublicOnlyRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your account email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    await forgotPassword(email);
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <PublicOnlyRoute>
      <AuthLayout
        heading="Forgot your password?"
        subheading="Enter your verified email to receive instructions to reset your password."
      >
        <AuthCard>
          {submitted ? (
            /* Success State after sending reset email */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-200/80 text-[#E6397A] flex items-center justify-center mx-auto shadow-sm">
                <Inbox className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900">Check your inbox</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  If an account exists for <strong className="text-slate-900">{email}</strong>, you will receive instructions to reset your password shortly.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 leading-relaxed text-left">
                Did not receive the email? Check your spam folder or ensure you entered the exact email associated with your salon.
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href={`/reset-password?email=${encodeURIComponent(email)}`}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-brand-gradient hover:brightness-105 transition-all text-center"
                >
                  Continue to Set New Password (Demo Shortcut)
                </Link>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#E6397A] hover:underline py-2"
                >
                  Try another email address
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Forgot Password Input Form */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormError message={error} onClose={() => setError(null)} />

              <p className="text-xs text-slate-600 leading-relaxed">
                Enter the email address associated with your Aurevia team. We will send a secure password reset link to your inbox.
              </p>

              <AuthInput
                label="Registered Email"
                type="email"
                placeholder="owner@your-salon.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="pt-2">
                <AuthButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Sending reset link..."
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </AuthButton>
              </div>

              <div className="text-center pt-2 border-t border-slate-100">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#E6397A] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </AuthCard>
      </AuthLayout>
    </PublicOnlyRoute>
  );
}
