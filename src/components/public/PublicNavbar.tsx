'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Scissors,
  CalendarDays,
  Calendar,
  Users,
  UserCheck,
  BarChart3,
  Building2,
  Crown,
  Briefcase,
  HelpCircle,
  BookOpen,
  Mail,
  FileQuestion,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { dropdownAnimation } from '@/utils/animations';

export const PublicNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const productItems = [
    {
      title: 'Features',
      description: 'Comprehensive salon management suite overview',
      href: '/features',
      icon: Sparkles,
      badge: 'All-in-One',
    },
    {
      title: 'Online Booking',
      description: '24/7 client self-scheduling & deposit protection',
      href: '/online-booking',
      icon: CalendarDays,
      badge: 'Zero No-Shows',
    },
    {
      title: 'Appointment Management',
      description: 'Multi-stylist floor calendar & instant check-ins',
      href: '/appointment-management',
      icon: Calendar,
    },
    {
      title: 'Staff Management',
      description: 'Shift rosters, chair allocation & commission tracking',
      href: '/staff-management',
      icon: UserCheck,
    },
    {
      title: 'Customer Management',
      description: 'Client CRM, technical formulas & VIP loyalty perks',
      href: '/customer-management',
      icon: Users,
    },
    {
      title: 'Analytics & Reports',
      description: 'Real-time revenue metrics, peak hours & tax exports',
      href: '/analytics',
      icon: BarChart3,
    },
  ];

  const solutionItems = [
    {
      title: 'For Salon Owners',
      description: 'Full revenue visibility, branch multi-tenancy & growth tools',
      href: '/solutions/salon-owners',
      icon: Crown,
      badge: 'Full Command',
    },
    {
      title: 'For Managers',
      description: 'Floor supervision, shift coverage & inventory reorders',
      href: '/solutions/managers',
      icon: Briefcase,
    },
    {
      title: 'For Receptionists',
      description: 'Quick check-ins, lounge queue & lightning POS checkouts',
      href: '/solutions/receptionists',
      icon: Building2,
    },
    {
      title: 'For Stylists',
      description: 'Personalized chair schedule, formulas & tip tracking',
      href: '/solutions/stylists',
      icon: Scissors,
    },
    {
      title: 'For Growing Salons',
      description: 'Scale from single boutique to multi-chair franchises',
      href: '/solutions/growing-salons',
      icon: TrendingUp,
      badge: 'Multi-Location',
    },
  ];

  const resourceItems = [
    {
      title: 'FAQ',
      description: 'Answers to onboarding, migration & pricing questions',
      href: '/faq',
      icon: FileQuestion,
    },
    {
      title: 'Blog / Insights',
      description: 'Industry playbooks, chair utilization tips & marketing',
      href: '/resources#blog',
      icon: BookOpen,
      badge: 'Weekly',
    },
    {
      title: 'Help Center',
      description: 'Step-by-step setup tutorials, video guides & documentation',
      href: '/resources#help',
      icon: HelpCircle,
    },
    {
      title: 'Contact Us',
      description: 'Speak with our salon solutions architects & live concierge',
      href: '/contact',
      icon: Mail,
    },
  ];

  const toggleMobileAccordion = (name: string) => {
    setMobileAccordion(mobileAccordion === name ? null : name);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-2.5 sm:py-3 px-3 sm:px-6'
            : 'py-4 sm:py-5 px-3 sm:px-6'
        }`}
      >
        <div
          ref={dropdownRef}
          className="relative max-w-7xl mx-auto rounded-full transition-all duration-500 ease-out group"
        >
          {/* 1. Luminous Ambient Lighting Aura (Glow radiating outward from navbar border) */}
          <div
            className={`absolute -inset-[3px] rounded-full pointer-events-none transition-all duration-500 ${
              isScrolled
                ? 'opacity-90 blur-xl bg-gradient-to-r from-[#E6397A]/45 via-[#FF659F]/35 to-[#F59E0B]/30'
                : 'opacity-75 blur-xl bg-gradient-to-r from-[#E6397A]/40 via-[#FF659F]/30 to-[#9333EA]/30'
            }`}
          />

          {/* 2. Fiber-Optic Border Light Beam (Rotating luminous conic gradient along the rim) */}
          <div className="absolute inset-0 rounded-full p-[1.5px] overflow-hidden pointer-events-none shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
            <div
              className="absolute -inset-[200%] animate-navbar-beam opacity-95"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.12) 0deg, rgba(230,57,122,1) 45deg, rgba(255,101,159,1) 90deg, rgba(251,191,36,0.95) 135deg, rgba(230,57,122,0.45) 180deg, rgba(168,85,247,0.9) 240deg, rgba(230,57,122,1) 300deg, rgba(255,255,255,0.12) 360deg)',
              }}
            />
            {/* Inner dark glass mask that leaves only the 1.5px glowing border rim visible */}
            <div
              className={`w-full h-full rounded-full transition-colors duration-500 ${
                isScrolled
                  ? 'bg-[#0B0C11]/92 backdrop-blur-2xl'
                  : 'bg-[#0B0C11]/82 backdrop-blur-xl'
              }`}
            />
          </div>

          {/* 3. Specular Glass Highlight along top rim */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-pink-300/80 to-transparent pointer-events-none z-10" />

          {/* 4. Navbar Contents (Unclipped for dropdowns) */}
          <div
            className={`relative z-10 flex items-center justify-between px-5 sm:px-7 transition-all duration-500 ${
              isScrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-3.5'
            }`}
          >
            {/* LEFT: Aurevia Logo */}
            <Logo variant="dark" size={isScrolled ? 'sm' : 'md'} />

            {/* CENTER: Navigation Links with Animated Underline Indicators */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 relative">
              {/* Home */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav('home')}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  href="/"
                  className={`px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 relative block ${
                    pathname === '/' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Home
                  {/* Active / Hover Animated Accent Line */}
                  {(pathname === '/' || hoveredNav === 'home') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* About */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav('about')}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  href="/about"
                  className={`px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 relative block ${
                    pathname === '/about' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  About
                  {(pathname === '/about' || hoveredNav === 'about') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* Product Dropdown (Rich Split Layout) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('product');
                  setHoveredNav('product');
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredNav(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 cursor-pointer relative ${
                    pathname.startsWith('/features') ||
                    pathname.startsWith('/online-booking') ||
                    pathname.startsWith('/appointment-management') ||
                    pathname.startsWith('/staff-management') ||
                    pathname.startsWith('/customer-management') ||
                    pathname.startsWith('/analytics')
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      activeDropdown === 'product' ? 'rotate-180 text-amber-300' : 'text-slate-400'
                    }`}
                  />
                  {(pathname.startsWith('/features') ||
                    pathname.startsWith('/online-booking') ||
                    pathname.startsWith('/appointment-management') ||
                    pathname.startsWith('/staff-management') ||
                    pathname.startsWith('/customer-management') ||
                    pathname.startsWith('/analytics') ||
                    hoveredNav === 'product') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'product' && (
                    <motion.div
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] z-50 pointer-events-auto"
                    >
                      <div className="bg-[#10121C]/96 backdrop-blur-2xl border border-pink-500/30 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(230,57,122,0.3)] ring-1 ring-pink-500/20 grid grid-cols-12 gap-5 relative">
                        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent pointer-events-none" />
                        {/* Left Highlight Spotlight Card */}
                        <div className="col-span-4 rounded-2xl bg-gradient-to-b from-[#181B2B] to-[#121422] p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                          <div>
                            <div className="flex items-center gap-1 text-amber-400 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                              Aurevia OS
                            </span>
                            <h4 className="text-sm font-serif font-bold text-white leading-snug">
                              Salon Management, Reimagined
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                              6 synchronized modules designed for luxury salons and ambitious beauty entrepreneurs.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/10 mt-3">
                            <Link
                              href="/book"
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FF659F] hover:text-white transition-colors"
                            >
                              <span>Test Live Booking Flow</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Right: 6 Feature Modules */}
                        <div className="col-span-8 grid grid-cols-2 gap-1.5">
                          {productItems.map((item, idx) => {
                            const Icon = item.icon;
                            const isCurrent = pathname === item.href;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className={`p-2.5 rounded-2xl transition-all duration-200 group flex flex-col justify-between ${
                                  isCurrent
                                    ? 'bg-pink-500/15 border border-pink-500/30'
                                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 group-hover:scale-105 transition-all duration-200">
                                    <Icon className="w-3.5 h-3.5 text-amber-300 group-hover:text-amber-200" />
                                  </div>
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-xs font-bold text-white truncate group-hover:text-amber-200 transition-colors">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug group-hover:text-slate-300 transition-colors">
                                  {item.description}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('solutions');
                  setHoveredNav('solutions');
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredNav(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 cursor-pointer relative ${
                    pathname.startsWith('/solutions') ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      activeDropdown === 'solutions' ? 'rotate-180 text-amber-300' : 'text-slate-400'
                    }`}
                  />
                  {(pathname.startsWith('/solutions') || hoveredNav === 'solutions') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px] z-50 pointer-events-auto"
                    >
                      <div className="bg-[#10121C]/96 backdrop-blur-2xl border border-pink-500/30 rounded-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(230,57,122,0.25)] ring-1 ring-pink-500/20 relative">
                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent pointer-events-none" />
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2.5 border-b border-white/10 flex items-center justify-between">
                          <span>Tailored by Salon Persona</span>
                          <Link href="/solutions" className="text-amber-300 text-[10px] font-semibold hover:underline">
                            View All Personas →
                          </Link>
                        </div>
                        <div className="space-y-1 pt-2">
                          {solutionItems.map((item) => {
                            const Icon = item.icon;
                            const isCurrent = pathname === item.href;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className={`p-2.5 rounded-2xl transition-all duration-200 group flex items-center justify-between ${
                                  isCurrent
                                    ? 'bg-pink-500/15 border border-pink-500/30'
                                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-colors">
                                    <Icon className="w-4 h-4 text-amber-300 group-hover:text-amber-200" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 line-clamp-1 transition-colors">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav('pricing')}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  href="/pricing"
                  className={`px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 relative block ${
                    pathname === '/pricing' ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Pricing
                  {(pathname === '/pricing' || hoveredNav === 'pricing') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setActiveDropdown('resources');
                  setHoveredNav('resources');
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredNav(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 cursor-pointer relative ${
                    pathname.startsWith('/resources') || pathname === '/faq' || pathname === '/contact'
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      activeDropdown === 'resources' ? 'rotate-180 text-amber-300' : 'text-slate-400'
                    }`}
                  />
                  {(pathname.startsWith('/resources') ||
                    pathname === '/faq' ||
                    pathname === '/contact' ||
                    hoveredNav === 'resources') && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#E6397A] via-pink-400 to-amber-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      variants={dropdownAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 pt-3 w-[440px] z-50 pointer-events-auto"
                    >
                      <div className="bg-[#10121C]/96 backdrop-blur-2xl border border-pink-500/30 rounded-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(230,57,122,0.25)] ring-1 ring-pink-500/20 relative">
                        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent pointer-events-none" />
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2.5 border-b border-white/10 flex items-center justify-between">
                          <span>Knowledge & Support</span>
                          <Link href="/resources" className="text-amber-300 text-[10px] font-semibold hover:underline">
                            Resource Hub →
                          </Link>
                        </div>
                        <div className="space-y-1 pt-2">
                          {resourceItems.map((item) => {
                            const Icon = item.icon;
                            const isCurrent = pathname === item.href;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className={`p-2.5 rounded-2xl transition-all duration-200 group flex items-center justify-between ${
                                  isCurrent
                                    ? 'bg-pink-500/15 border border-pink-500/30'
                                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-colors">
                                    <Icon className="w-4 h-4 text-amber-300 group-hover:text-amber-200" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 line-clamp-1 transition-colors">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* RIGHT: Log In & Get Started CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Secondary Minimal Login Button */}
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/10 transition-all duration-200"
              >
                Log In
              </Link>

              {/* Primary Luxury Get Started Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/register"
                  className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D81B60] via-[#E6397A] to-amber-500 text-white text-xs font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:brightness-105 transition-all duration-300"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                Log In
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-2xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN / EXPANDABLE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 bg-[#0B0C11]/98 backdrop-blur-2xl z-40 lg:hidden overflow-y-auto px-5 py-6 flex flex-col justify-between border-t border-pink-500/40 shadow-[0_-6px_30px_rgba(230,57,122,0.35)]"
          >
            <div className="space-y-2.5">
              <Link
                href="/"
                className="block px-4 py-3 rounded-2xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="block px-4 py-3 rounded-2xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                About
              </Link>

              {/* Mobile Accordion: Product */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('product')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-250 ${
                      mobileAccordion === 'product' ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'product' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-3 space-y-1.5 border-t border-white/5 pt-2"
                    >
                      {productItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center justify-between py-2 text-xs text-slate-300 hover:text-white"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Accordion: Solutions */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('solutions')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-250 ${
                      mobileAccordion === 'solutions' ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-3 space-y-1.5 border-t border-white/5 pt-2"
                    >
                      {solutionItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center justify-between py-2 text-xs text-slate-300 hover:text-white"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/pricing"
                className="block px-4 py-3 rounded-2xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Pricing
              </Link>

              {/* Mobile Accordion: Resources */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('resources')}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-250 ${
                      mobileAccordion === 'resources' ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-3 space-y-1.5 border-t border-white/5 pt-2"
                    >
                      {resourceItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center justify-between py-2 text-xs text-slate-300 hover:text-white"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3 pb-8">
              <Link
                href="/register"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D81B60] via-[#E6397A] to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/login"
                className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center hover:text-white"
              >
                Log In to Workspace
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
