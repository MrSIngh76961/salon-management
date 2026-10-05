import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'dark' | 'outline';
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  children,
  variant = 'pink',
  className = '',
}) => {
  if (variant === 'dark') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 backdrop-blur-sm ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#E6397A] border border-[#E6397A]/30 bg-[#E6397A]/5 ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#E6397A] bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A] animate-pulse" />
      {children}
    </span>
  );
};
