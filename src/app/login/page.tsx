'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, Sparkles, CheckCircle2, UserCheck, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput } from '@/components/auth/AuthInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { FormError, FormSuccess } from '@/components/auth/FormAlert';
import { PublicOnlyRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { DEMO_PRESETS } from '@/data/mockUsers';
import { ROLE_REDIRECTS } from '@/types/auth';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@salon.com).';
    }

    if (!password) {
      newErrors.password = 'Please enter your password.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!validate()) return;

    setIsLoading(true);
    const result = await login({ email, password, rememberMe });
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.error || 'Authentication failed. Please check your credentials.');
    } else {
      setFormSuccess('Credentials verified. Redirecting to your workspace...');
      const destination = redirectParam
        ? decodeURIComponent(redirectParam)
        : result.role
        ? ROLE_REDIRECTS[result.role]
        : '/dashboard';

      setTimeout(() => {
        router.push(destination);
      }, 500);
    }
  };

  const handleSelectDemo = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('SalonPro2026!');
    setFormError(null);
    setErrors({});
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to manage your salon smarter."
      imageSrc="/images/hero_salon.jpg"
      quote={{
        text: 'Aurevia cut our daily receptionist stress in half. The online booking and live calendar keep all 12 chairs booked with zero overlap.',
        author: 'Elena Rostova',
        role: 'Master Creative Director',
        salon: 'Luxe Hair & Spa Studio',
      }}
    >
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Form Error Banner */}
          <FormError message={formError} onClose={() => setFormError(null)} />
          <FormSuccess message={formSuccess} />

          {/* Email Field */}
          <AuthInput
            label="Work Email"
            type="email"
            autoComplete="email"
            placeholder="owner@your-salon.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          {/* Password Field */}
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={errors.password}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#E6397A] border-slate-300 focus:ring-[#E6397A]/30 accent-[#E6397A]"
              />
              <span>Remember this device</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-bold text-[#E6397A] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <AuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </AuthButton>
          </div>

          {/* Register Link */}
          <p className="text-center text-xs text-slate-600 pt-2">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/register"
              className="font-bold text-[#E6397A] hover:underline"
            >
              Start 14-day free trial
            </Link>
          </p>

          <AuthDivider label="Instant Demo Accounts (Click to Fill)" />

          {/* Demo Quick Login Presets for all 6 roles */}
          <div className="space-y-1.5">
            <div className="text-[11px] text-slate-500 font-medium text-center mb-1">
              Select any role to test authentication & authorization:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectDemo(preset.email)}
                  className="p-2 rounded-xl text-left bg-slate-50 hover:bg-pink-50/80 hover:border-pink-300 border border-slate-200 transition-all duration-200 text-xs cursor-pointer group hover:scale-[1.02] active:scale-[0.98] shadow-2xs hover:shadow-sm hover:shadow-pink-500/10"
                >
                  <div className="font-bold text-slate-800 group-hover:text-[#E6397A] truncate transition-colors">
                    {preset.label}
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-600 truncate transition-colors">
                    {preset.email.split('@')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <PublicOnlyRoute>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FAF9FB] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#E6397A]" />
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </PublicOnlyRoute>
  );
}
