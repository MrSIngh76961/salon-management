import React from 'react';
import { motion } from 'framer-motion';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] relative ${className}`}
    >
      {children}
    </motion.div>
  );
};
