import { Variants } from 'framer-motion';

/**
 * Aurevia Luxury Animation & Interaction System
 * Consistent, hardware-accelerated Framer Motion variants and transitions.
 */

export const transitions = {
  springGentle: { type: 'spring', damping: 25, stiffness: 200 },
  springSnappy: { type: 'spring', damping: 30, stiffness: 350 },
  smoothEase: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  fastEase: { duration: 0.25, ease: 'easeOut' },
  mediumEase: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  revealEase: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: custom, ease: 'easeOut' },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: custom, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: custom, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: custom, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const dropdownAnimation: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
};

export const cardHoverMotion = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.25, ease: 'easeOut' } },
};

export const buttonHoverMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.025, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.975 },
};
