'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Building, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput } from '@/components/auth/AuthInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { AuthButton } from '@/components/auth/AuthButton';
import { FormError, FormSuccess } from '@/components/auth/FormAlert';
import { PublicOnlyRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    salonName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.salonName.trim()) {
      newErrors.salonName = 'Please enter your salon or business name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    }

    if (!formData.password) {
      newErrors.password = 'Please create a secure password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service to proceed.';
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
    const result = await register(formData);
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.error || 'Failed to create account. Please try again.');
    } else {
      setFormSuccess('Account created successfully! Preparing your verification code...');
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 700);
    }
  };

  return (
    <PublicOnlyRoute>
      <AuthLayout
        heading="Create your Aurevia account"
        subheading="Start your 14-day free trial. No credit card required."
        imageSrc="/images/cta_salon.jpg"
        quote={{
          text: 'Within 30 days of signing up for Aurevia, our booking volume went up 34% and chair turnover became totally seamless.',
          author: 'Camila Rodriguez',
          role: 'Owner & Master Esthetician',
          salon: 'Lumière Skin & Lash Bar',
        }}
      >
        <AuthCard>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormError message={formError} onClose={() => setFormError(null)} />
            <FormSuccess message={formSuccess} />

            {/* Full Name & Salon Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <AuthInput
                label="Full Name"
                placeholder="Elena Rostova"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                error={errors.fullName}
                icon={<User className="w-4 h-4" />}
                required
              />

              <AuthInput
                label="Salon / Business Name"
                placeholder="Luxe Beauty Studio"
                value={formData.salonName}
                onChange={(e) => {
                  setFormData({ ...formData, salonName: e.target.value });
                  if (errors.salonName) setErrors((prev) => ({ ...prev, salonName: '' }));
                }}
                error={errors.salonName}
                icon={<Building className="w-4 h-4" />}
                required
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <AuthInput
                label="Work Email"
                type="email"
                placeholder="elena@luxestudio.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <AuthInput
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 234-8901"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                error={errors.phone}
                icon={<Phone className="w-4 h-4" />}
                required
              />
            </div>

            {/* Password Field */}
            <PasswordInput
              label="Password"
              placeholder="Create a strong password (min 8 chars)"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={errors.password}
              required
            />

            {/* Live Password Strength Feedback */}
            <PasswordStrength password={formData.password} />

            {/* Confirm Password Field */}
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              error={errors.confirmPassword}
              required
            />

            {/* Terms of Service Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-snug select-none">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, acceptTerms: e.target.checked });
                    if (errors.acceptTerms) setErrors((prev) => ({ ...prev, acceptTerms: '' }));
                  }}
                  className="w-4 h-4 mt-0.5 rounded text-[#E6397A] border-slate-300 focus:ring-[#E6397A]/30 accent-[#E6397A] shrink-0"
                />
                <span>
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-[#E6397A] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-semibold text-[#E6397A] hover:underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <AuthButton
                type="submit"
                isLoading={isLoading}
                loadingText="Setting up your salon workspace..."
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </AuthButton>
            </div>

            {/* Sign in link */}
            <p className="text-center text-xs text-slate-600 pt-2">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#E6397A] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </AuthCard>
      </AuthLayout>
    </PublicOnlyRoute>
  );
}
