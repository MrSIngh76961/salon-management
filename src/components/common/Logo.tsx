'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  compactOnMobile?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Height sizing tailored for crisp, uncluttered display of the uploaded logo
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12 md:h-13',
    lg: 'h-14 sm:h-16 md:h-18',
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none shrink-0 ${className}`}
      aria-label="Aurevia - Salon Management"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative flex items-center"
      >
        <Image
          src="/logo.png"
          alt="Aurevia - Salon Management"
          width={220}
          height={110}
          priority
          className={`${heightClasses} w-auto object-contain transition-all duration-300 drop-shadow-sm group-hover:brightness-105`}
        />
      </motion.div>
    </Link>
  );
};

