'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BackgroundImageSectionProps {
  imageSrc: string;
  imageAlt: string;
  overlayOpacity?: 'dark' | 'cinematic' | 'heavy';
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Opacity (0-1) of the background image itself. When below 1, the dark overlays are skipped. */
  imageOpacity?: number;
}

export const BackgroundImageSection: React.FC<BackgroundImageSectionProps> = ({
  imageSrc,
  imageAlt,
  overlayOpacity = 'cinematic',
  children,
  className = '',
  id,
  imageOpacity = 1,
}) => {
  const overlayClasses = {
    dark: 'from-[#0B0C11]/92 via-[#0B0C11]/85 to-[#0B0C11]/94',
    cinematic: 'from-[#0B0C11]/95 via-[#0E1019]/80 to-[#0B0C11]/95',
    heavy: 'from-[#0B0C11]/97 via-[#0B0C11]/90 to-[#0B0C11]/98',
  };

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden py-24 sm:py-32 text-white bg-[#0B0C11] ${className}`}
    >
      {/* Background Image Container with intelligent scale & parallax animation */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.85 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className={`object-cover object-center filter ${
            imageOpacity < 1 ? '' : 'brightness-[0.72] contrast-[1.1]'
          }`}
          style={{ opacity: imageOpacity }}
          priority={false}
        />

        {/* Cinematic gradient overlays for 100% text readability and brand aesthetic */}
        <div className={`absolute inset-0 z-10 ${imageOpacity < 1 ? 'hidden' : ''}`}>
          <div
            className={`absolute inset-0 bg-gradient-to-b ${overlayClasses[overlayOpacity]}`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0C11_95%)] opacity-70" />
        </div>

        {/* Ambient brand color flares */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#E6397A]/15 rounded-full blur-[120px] z-10" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] z-10" />
      </motion.div>

      {/* Foreground Content with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

