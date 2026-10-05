import React from 'react';

export const AuthDivider: React.FC<{ label?: string }> = ({ label = 'OR' }) => {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
  );
};
