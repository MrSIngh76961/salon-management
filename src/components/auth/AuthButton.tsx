import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'demo';
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  isLoading = false,
  loadingText = 'Please wait...',
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const base =
    'w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6397A]/40 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100';

  const variants = {
    primary:
      'bg-brand-gradient hover:brightness-105 text-white shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 border border-pink-400/20',
    secondary:
      'bg-[#12131C] hover:bg-[#1C1F2E] text-white shadow-md border border-white/10',
    outline:
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 shadow-xs',
    demo:
      'bg-pink-50 hover:bg-pink-100/80 text-[#E6397A] border border-pink-200/80 shadow-xs text-xs py-2.5',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
