import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;

  const checks = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number or symbol (0-9, !@#$)', met: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const passedCount = checks.filter((c) => c.met).length;

  const getStrengthInfo = (count: number) => {
    switch (count) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600', width: '25%' };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600', width: '50%' };
      case 3:
        return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-600', width: '75%' };
      case 4:
      default:
        return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', width: '100%' };
    }
  };

  const strength = getStrengthInfo(passedCount);

  return (
    <div className="space-y-2 pt-1">
      {/* Strength Bar */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-500 text-[11px]">Password Strength</span>
        <span className={strength.text}>{strength.label}</span>
      </div>

      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${strength.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: strength.width }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {checks.map((check, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-[11px] transition-colors ${
              check.met ? 'text-emerald-600 font-medium' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                check.met ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {check.met ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <span className="w-1 h-1 rounded-full bg-slate-400" />}
            </div>
            <span>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
