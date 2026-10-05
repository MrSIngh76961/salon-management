import React from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomeValueProp } from '@/components/home/HomeValueProp';
import { HomeSmartOps } from '@/components/home/HomeSmartOps';
import { HomeProductExp } from '@/components/home/HomeProductExp';
import { HomeAutomationGrowth } from '@/components/home/HomeAutomationGrowth';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { HomePricingPreview } from '@/components/home/HomePricingPreview';
import { PreFooterCTA } from '@/components/public/PreFooterCTA';
import { PublicFooter } from '@/components/public/PublicFooter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0C11] text-slate-900 selection:bg-[#E6397A] selection:text-white">
      {/* 1. Global Public Navbar with exact dropdown specifications */}
      <PublicNavbar />

      {/* 2. Existing Hero Section (Preserved design & visual direction as requested) */}
      <HeroSection />

      {/* 3. Aurevia Introduction / Value Proposition (Clean section, 4 cards, NO background image) */}
      <HomeValueProp />

      {/* 4. Smart Salon Operations (Full-width salon background image, overlay content) */}
      <HomeSmartOps />

      {/* 5. Product Experience (Clean section, interactive dashboard UI showcase) */}
      <HomeProductExp />

      {/* 6. Automation & Growth (Full-width background image, reminders & retention) */}
      <HomeAutomationGrowth />

      {/* 7. How Aurevia Works (Clean section, 4 connected steps) */}
      <HowItWorks />

      {/* 8. Testimonials & Social Proof (Clean premium cards) */}
      <Testimonials />

      {/* 9. Pricing Preview (Clean premium pricing cards) */}
      <HomePricingPreview />

      {/* 10. Final Pre-Footer CTA (Full-width background image, strong conversion CTA) */}
      <PreFooterCTA />

      {/* 11. Reusable Luxury Footer */}
      <PublicFooter />
    </main>
  );
}
