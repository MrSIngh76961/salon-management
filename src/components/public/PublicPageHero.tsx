'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SectionBadge } from '@/components/common/SectionBadge';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

interface PublicPageHeroProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  stats?: Array<{ label: string; value: string }>;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  /** Opacity (0-1) of the background image itself. When below 1, the dark overlays are skipped. */
  imageOpacity?: number;
}

export const PublicPageHero: React.FC<PublicPageHeroProps> = ({
  badge,
  title,
  titleHighlight,
  description,
  imageSrc,
  imageAlt,
  primaryCtaText = 'Start 14-Day Free Trial',
  primaryCtaHref = '/register',
  secondaryCtaText = 'Explore Live Demo',
  secondaryCtaHref = '/login',
  stats,
  breadcrumbs,
  imageOpacity = 1,
}) => {
  return (
    <section className="relative min-h-[62vh] pt-36 pb-20 overflow-hidden bg-[#0B0C11] text-white flex items-center">
      {/* Background Image Container with Cinematic Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center filter transform scale-105 ${
            imageOpacity < 1 ? '' : 'brightness-[0.45] contrast-[1.15]'
          }`}
          style={{ opacity: imageOpacity }}
        />
        <div className={`absolute inset-0 ${imageOpacity < 1 ? 'hidden' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C11] via-[#0B0C11]/80 to-[#0B0C11]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0B0C11_90%)] opacity-80" />
        </div>

        {/* Ambient brand color flares */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#E6397A]/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Breadcrumb Navigation if provided */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={bc.label}>
                <span className="text-slate-600">/</span>
                {bc.href ? (
                  <Link href={bc.href} className="hover:text-white transition-colors">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-[#FF659F]">{bc.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <SectionBadge variant="pink" className="text-[11px] sm:text-xs">
            {badge}
          </SectionBadge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.15] text-white max-w-4xl mx-auto"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          {title}{' '}
          {titleHighlight && (
            <span className="text-gradient-pink font-semibold">
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button
            variant="primary"
            size="lg"
            href={primaryCtaHref}
            icon={<ArrowRight className="w-4 h-4 ml-0.5" />}
            className="shadow-xl shadow-pink-500/25 text-sm sm:text-base font-semibold"
          >
            {primaryCtaText}
          </Button>

          <Button
            variant="glass-dark"
            size="lg"
            href={secondaryCtaHref}
            className="text-sm sm:text-base text-slate-200 hover:text-white border-white/20"
          >
            {secondaryCtaText}
          </Button>
        </motion.div>

        {/* Metrics Row if provided */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-white/10 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

