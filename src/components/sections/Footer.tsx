'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export const Footer: React.FC = () => {
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
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Online Booking', href: '#booking' },
    { label: 'Smart Calendar', href: '#calendar' },
    { label: 'Integrations', href: '#features' },
    { label: 'Changelog & Updates', href: '#features' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '#how-it-works' },
    { label: 'Blog & Advice', href: '#testimonials' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Contact Us', href: 'mailto:contact@salonpro.io' },
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '#faq' },
    { label: 'API Documentation', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security & Compliance', href: '#' },
  ];

  return (
    <footer className="bg-[#0B0C11] text-slate-400 border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6397A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The smart scheduling platform for salons and beauty professionals.
              Save time. Delight clients. Grow faster.
            </p>

            {/* Social Icons matching PNG */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Instagram', icon: 'M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-7.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' },
                { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
                { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.name.toLowerCase()}`}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links: Product (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Resources (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (2 Cols on lg) matching PNG */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Stay updated with tips and news for salon owners.
            </p>

            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full min-w-0 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#E6397A] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-9 h-8.5 rounded-xl bg-brand-gradient text-white flex items-center justify-center shrink-0 hover:brightness-110 transition-all shadow-md shadow-pink-500/25"
              >
                <Send className="w-3.5 h-3.5 transform -rotate-12" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright matching PNG */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Aurevia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
