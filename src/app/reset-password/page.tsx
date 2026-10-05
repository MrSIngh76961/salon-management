'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { AuthButton } from '@/components/auth/AuthButton';
import { FormError, FormSuccess } from '@/components/auth/FormAlert';
import { PublicOnlyRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = 'Please enter a new password.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) return;

    setIsLoading(true);
    const result = await resetPassword(password);
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.error || 'Failed to update password. Please try again.');
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <PublicOnlyRoute>
      <AuthLayout
        heading="Reset your password"
        subheading="Create a new, strong password for your Aurevia account."
      >
        <AuthCard>
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900">
                  Password updated successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your account password has been updated. You can now sign in using your new credentials.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-gradient hover:brightness-105 text-white shadow-lg shadow-pink-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Continue to Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Reset Password Form */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <FormError message={formError} onClose={() => setFormError(null)} />

              <PasswordInput
                label="New Password"
                placeholder="Enter at least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                required
              />

              {/* Strength feedback */}
              <PasswordStrength password={password} />

              <PasswordInput
                label="Confirm New Password"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                error={errors.confirmPassword}
                required
              />

              <div className="pt-2">
                <AuthButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Updating password..."
                >
                  <span>Reset Password</span>
                  <ArrowRight className="w-4 h-4" />
                </AuthButton>
              </div>

              <div className="text-center pt-2 border-t border-slate-100">
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-600 hover:text-[#E6397A] transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </AuthCard>
      </AuthLayout>
    </PublicOnlyRoute>
  );
}
