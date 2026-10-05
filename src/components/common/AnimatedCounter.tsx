'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.4,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value string for numbers, prefixes, and suffixes
    const strVal = String(value);
    // Find numeric part (e.g., "1,200+", "₹1,96,650", "+28%", "99.99%")
    const match = strVal.match(/([^\d.]*)([\d,.]+)([^\d.]*)/);

    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNumber = parseFloat(rawNumberStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(strVal);
      return;
    }

    const hasDecimals = rawNumberStr.includes('.');
    const decimalPlaces = hasDecimals ? (rawNumberStr.split('.')[1] || '').length : 0;
    const hasCommas = match[2].includes(',');

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease-out cubic for luxurious deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = targetNumber * easeOut;

      let formattedNum = hasDecimals
        ? current.toFixed(decimalPlaces)
        : Math.floor(current).toString();

      if (hasCommas) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(strVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : '0'}
    </span>
  );
};
