'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Booking', href: '#booking' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0B0C11]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
            : 'py-5 bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant="dark" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-full transition-colors hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="glass-dark"
                size="sm"
                href="/login"
                className="text-xs px-4"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                href="/register"
                className="text-xs px-4.5"
              >
                Get Started Free
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <Button
                variant="primary"
                size="sm"
                href="/register"
                className="text-xs px-3 py-1.5"
              >
                Free Trial
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#0E1018]/95 backdrop-blur-2xl border-b border-white/10 p-6 sm:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <Button
                  variant="glass-dark"
                  size="md"
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center"
                >
                  Login to Portal
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
