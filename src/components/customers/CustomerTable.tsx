'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Eye,
  Edit2,
  CalendarPlus,
  StickyNote,
  Crown,
  Phone,
  Mail,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerTableProps {
  customers: Customer[];
  onViewProfile: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onBookAppointment: (customer: Customer) => void;
  onAddNote: (customer: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onViewProfile,
  onEditCustomer,
  onBookAppointment,
  onAddNote,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="px-5 py-4 min-w-[240px]">Customer</th>
              <th className="px-5 py-4 min-w-[170px]">Contact Info</th>
              <th className="px-5 py-4 min-w-[110px]">Visits</th>
              <th className="px-5 py-4 min-w-[140px]">Total Spend</th>
              <th className="px-5 py-4 min-w-[130px]">Last Visit</th>
              <th className="px-5 py-4 min-w-[180px]">Upcoming Booking</th>
              <th className="px-5 py-4 min-w-[110px]">Tier Status</th>
              <th className="px-5 py-4 w-24 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-14 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-slate-300" />
                    <span>No clients found matching your search.</span>
                  </div>
                </td>
              </tr>
            ) : (
              customers.map((cust) => {
                const isMenuOpen = activeMenuId === cust.id;

                return (
                  <tr
                    key={cust.id}
                    className="hover:bg-pink-50/20 transition-colors group cursor-pointer"
                    onClick={() => onViewProfile(cust)}
                  >
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-10 h-10 rounded-full object-cover border border-white shadow-xs shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm block truncate group-hover:text-brand-600 transition-colors">
                            {cust.name}
                          </span>
                          <span className="text-slate-400 text-[11px] block truncate">
                            Joined {cust.dateJoined}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="text-xs space-y-0.5">
                        <div className="text-slate-800 font-semibold truncate">{cust.phone}</div>
                        <div className="text-slate-400 text-[11px] truncate">{cust.email}</div>
                      </div>
                    </td>

                    {/* Visits */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {cust.totalVisits} sessions
                      </span>
                    </td>

                    {/* Total Spend */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{cust.totalSpend.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ₹{cust.avgBookingValue.toLocaleString('en-IN')} avg
                        </span>
                      </div>
                    </td>

                    {/* Last Visit */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-600 font-semibold">
                      {cust.lastVisit || 'First visit pending'}
                    </td>

                    {/* Upcoming Appointment */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {cust.upcomingAppointment ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-pink-50 text-brand-700 border border-pink-200">
                          <Calendar className="w-3.5 h-3.5 text-brand-500" />
                          <span>{cust.upcomingAppointment}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">None scheduled</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {cust.status === 'VIP' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          VIP Member
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          {cust.status}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-5 py-4 text-right whitespace-nowrap relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : cust.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute right-5 top-12 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewProfile(cust);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span>View CRM Profile</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onBookAppointment(cust);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-50"
                          >
                            <CalendarPlus className="w-4 h-4" />
                            <span>Book Appointment</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onAddNote(cust);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <StickyNote className="w-4 h-4 text-slate-400" />
                            <span>Add Consultation Note</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditCustomer(cust);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Edit2 className="w-4 h-4 text-slate-400" />
                            <span>Edit Client</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
