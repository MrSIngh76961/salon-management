'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  imageSrc?: string;
  quote?: {
    text: string;
    author: string;
    role: string;
    salon: string;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  heading,
  subheading,
  imageSrc = '/images/hero_salon.jpg',
  quote = {
    text: 'Aurevia reduced our salon no-shows by 65% and streamlined our 12 stylists’ schedules effortlessly. It’s an indispensable platform for modern salons.',
    author: 'Isabella Fontaine',
    role: 'Founder & Creative Director',
    salon: 'Maison de Beauté NYC',
  },
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9FB] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="py-4 px-4 sm:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <Logo variant="light" />

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#E6397A] transition-all py-1.5 px-3 rounded-full hover:bg-pink-50 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Form Column (6 or 7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center max-w-lg mx-auto w-full">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 space-y-2 text-center sm:text-left"
            >
              <h1
                className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                {heading}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {subheading}
              </p>
            </motion.div>

            {/* Injected Form Card */}
            {children}
          </div>

          {/* Right Visual Composition Column (Hidden on Mobile/Tablet, Visible on lg) */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6 pl-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[32px] overflow-hidden bg-[#0F1019] border border-slate-800 p-8 shadow-2xl text-white min-h-[620px] flex flex-col justify-between group hover:border-pink-500/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(230,57,122,0.15)]"
            >
              {/* Background ambient radial gradients */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6397A]/20 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

              {/* Top Tag & Trust Banner */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-pink-300 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF659F]" />
                  Trusted by 500+ Salons
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-white ml-1.5 font-bold">4.9/5.0</span>
                </div>
              </div>

              {/* Salon Visual Frame */}
              <div className="relative z-10 my-6 rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-xl bg-black/40 group-hover:scale-[1.01] transition-transform duration-500">
                <Image
                  src={imageSrc}
                  alt="Modern salon interior"
                  fill
                  className="object-cover filter contrast-[1.05] brightness-[0.9] transition-transform duration-700 group-hover:scale-105"
                  sizes="500px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1019] via-transparent to-transparent opacity-80" />

                {/* Floating Metric Badge */}
                <div className="absolute bottom-3 left-3 bg-[#12131D]/90 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg animate-float-gentle">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-white">+30% Bookings</span>
                  <span className="text-[10px] text-slate-400">in first 60 days</span>
                </div>
              </div>

              {/* Testimonial Quote Card */}
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/10 transition-colors duration-300">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{quote.text}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <div>
                    <div className="font-bold text-white">{quote.author}</div>
                    <div className="text-[11px] text-slate-400">{quote.role} • {quote.salon}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>

              {/* Bottom Security Assurance */}
              <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF659F]" />
                  256-Bit SSL Bank-Grade Encryption
                </span>
                <span>PCI-DSS Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-8 border-t border-slate-200/80 text-center text-xs text-slate-500 bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Aurevia B2B Platform. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Security</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
