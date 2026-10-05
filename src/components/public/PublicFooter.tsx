'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export const PublicFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const productLinks = [
    { label: 'Platform Features', href: '/features' },
    { label: 'Online 24/7 Booking', href: '/online-booking' },
    { label: 'Appointment Management', href: '/appointment-management' },
    { label: 'Staff & Shift Rosters', href: '/staff-management' },
    { label: 'Customer CRM & Formulas', href: '/customer-management' },
    { label: 'Analytics & Revenue BI', href: '/analytics' },
    { label: 'Enterprise Pricing', href: '/pricing' },
  ];

  const solutionLinks = [
    { label: 'For Salon Owners', href: '/solutions/salon-owners' },
    { label: 'For Floor Managers', href: '/solutions/managers' },
    { label: 'For Receptionists', href: '/solutions/receptionists' },
    { label: 'For Stylists & Artists', href: '/solutions/stylists' },
    { label: 'For Growing Franchises', href: '/solutions/growing-salons' },
    { label: 'Solutions Overview', href: '/solutions' },
  ];

  const resourceLinks = [
    { label: 'Knowledge Base & FAQ', href: '/faq' },
    { label: 'Industry Blog & Trends', href: '/resources#blog' },
    { label: 'Help Center & Tutorials', href: '/resources#help' },
    { label: 'Contact Concierge', href: '/contact' },
    { label: 'Customer Portal', href: '/customer' },
    { label: 'Security & SLA Architecture', href: '/about#security' },
  ];

  const companyLinks = [
    { label: 'About Aurevia', href: '/about' },
    { label: 'Why Salons Choose Us', href: '/about#story' },
    { label: 'Transparent Pricing', href: '/pricing' },
    { label: 'Platform Status', href: '/resources' },
    { label: 'Get Started Trial', href: '/register' },
    { label: 'Sign In to Workspace', href: '/login' },
  ];

  return (
    <footer className="bg-[#0B0C11] text-slate-400 border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#E6397A]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Links Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The high-performance operating system for modern luxury salons, boutique aesthetic studios, and multi-chair beauty enterprises.
            </p>

            {/* Direct Contact info */}
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>SoHo Flagship Studio & Tech HQ, New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:concierge@aurevia.io" className="hover:text-white transition-colors">
                  concierge@aurevia.io
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+1 (800) 584-LUXE (Mon–Sat, 8am–9pm EST)</span>
              </div>
            </div>

            {/* Social Icons with luxury hover */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { name: 'Instagram', icon: 'M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-7.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' },
                { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
                { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={`#${social.name.toLowerCase()}`}
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-200 text-slate-400 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Product Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Product</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources & Company (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter & Guarantee (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Salon Growth Digest
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated salon management playbooks, pricing blueprints, and staff retention insights.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="salon@aurevia.io"
                className="w-full min-w-0 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                aria-label="Subscribe"
                className="w-9 h-8.5 rounded-xl bg-gradient-to-r from-[#D81B60] via-[#E6397A] to-amber-500 text-white flex items-center justify-center shrink-0 hover:brightness-110 transition-all shadow-md shadow-pink-500/25 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 transform -rotate-12" />
              </motion.button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                Welcome! Look out for our weekly edition.
              </p>
            )}

            <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>SOC2 Type II & GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Quick Nav */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aurevia Inc. Salon Management, Reimagined. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Cookie Settings</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Security Architecture</Link>
            <Link href="/login" className="hover:text-amber-300 text-slate-400 font-semibold transition-colors">
              Staff & Client Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
