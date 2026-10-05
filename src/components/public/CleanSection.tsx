'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CleanSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'light' | 'dark' | 'glass';
}

export const CleanSection: React.FC<CleanSectionProps> = ({
  children,
  className = '',
  id,
  variant = 'light',
}) => {
  const variantStyles = {
    // Premium soft light SaaS surface
    light: 'bg-[#FAF9FB] text-slate-900 border-y border-slate-200/60',
    // Elegant deep slate dark surface
    dark: 'bg-[#0E1019] text-white border-y border-white/[0.06]',
    // Translucent glass on deep background
    glass: 'bg-[#121422]/90 backdrop-blur-xl text-white border-y border-white/10',
  };

  return (
    <section
      id={id}
      className={`relative w-full py-24 sm:py-32 overflow-hidden transition-colors ${variantStyles[variant]} ${className}`}
    >
      {/* Subtle background ambient mesh */}
      {variant === 'light' ? (
        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] pointer-events-none" />
      )}

      {/* Content wrapper with scroll reveal */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};
