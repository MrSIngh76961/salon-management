'use client';

import React from 'react';
import { Crown, Phone, Mail, Calendar, MoreVertical, Eye } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerMobileCardProps {
  customers: Customer[];
  onViewProfile: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onBookAppointment: (customer: Customer) => void;
}

export const CustomerMobileCard: React.FC<CustomerMobileCardProps> = ({
  customers,
  onViewProfile,
  onEditCustomer,
  onBookAppointment,
}) => {
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center text-slate-400 text-sm">
        No clients found matching your search.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {customers.map((cust) => (
        <div
          key={cust.id}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative transition-all active:bg-slate-50/50 cursor-pointer"
          onClick={() => onViewProfile(cust)}
        >
          {/* Top Row: Avatar + Info */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={cust.avatar}
                alt={cust.name}
                className="w-12 h-12 rounded-full object-cover border border-white shadow-xs shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{cust.name}</h3>
                  {cust.status === 'VIP' && (
                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                      VIP
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 block truncate">{cust.phone}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(cust);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Middle Row: Spend & Visits */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Total Spend</span>
              <div className="font-black text-slate-900 text-sm mt-0.5">
                ₹{cust.totalSpend.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Visits Count</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">
                {cust.totalVisits} sessions
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">Next Visit</span>
              <div className="font-semibold text-brand-600 text-xs mt-0.5 truncate max-w-[110px]">
                {cust.upcomingAppointment || 'None'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
