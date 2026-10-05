import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, helperText, icon, id, className = '', ...props }, ref) => {
    const inputId = id || `auth-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          {label} {props.required && <span className="text-[#E6397A]">*</span>}
        </label>

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full text-sm rounded-xl border bg-white/80 transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400 py-3 ${
              icon ? 'pl-10 pr-3.5' : 'px-3.5'
            } ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/25'
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p
            id={errorId}
            className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5"
            role="alert"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-[11px] text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
