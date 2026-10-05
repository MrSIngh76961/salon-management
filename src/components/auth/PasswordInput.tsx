import React, { useState, forwardRef } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `password-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
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
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>

          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full text-sm rounded-xl border bg-white/80 transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400 py-3 pl-10 pr-11 ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20 bg-rose-50/20'
                : 'border-slate-200 hover:border-slate-300 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/25'
            } ${className}`}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-[#E6397A]" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
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

PasswordInput.displayName = 'PasswordInput';
