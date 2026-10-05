'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  Calendar,
  Crown,
  Clock,
  Scissors,
  CheckCircle2,
  TrendingUp,
  Tag,
  StickyNote,
  Plus,
  Edit2,
  CalendarPlus,
} from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerProfileDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onBookAppointment: (customer: Customer) => void;
  onAddNote: (customer: Customer) => void;
}

export const CustomerProfileDrawer: React.FC<CustomerProfileDrawerProps> = ({
  customer,
  isOpen,
  onClose,
  onEdit,
  onBookAppointment,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'notes' | 'preferences'>('timeline');

  if (!isOpen || !customer) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-pink-50 via-purple-50 to-slate-50 border-b border-slate-100 shrink-0 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-pink-100"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900">{customer.name}</h2>
                  {customer.status === 'VIP' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                      <Crown className="w-3 h-3 text-amber-600" />
                      VIP
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1 flex flex-col gap-0.5">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {customer.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {customer.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/60 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Spend</span>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  ₹{customer.totalSpend.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/60 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Visits</span>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  {customer.totalVisits} sessions
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/60 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Ticket</span>
                <div className="text-sm font-black text-emerald-600 mt-0.5">
                  ₹{customer.avgBookingValue.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 px-6 shrink-0 bg-white">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'timeline'
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Visit Timeline
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'preferences'
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Beauty Preferences
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'notes'
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Consultation Notes ({customer.notes?.length || 0})
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Tab 1: Visit Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Client History Timeline
                </h3>
                {customer.history && customer.history.length > 0 ? (
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {customer.history.map((item) => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow-xs" />
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">{item.title}</span>
                            <span className="text-[10px] text-slate-400">{item.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                          {item.amount && (
                            <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600">
                              +₹{item.amount.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4 italic">
                    No past service history recorded yet.
                  </p>
                )}
              </div>
            )}

            {/* Tab 2: Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Client Preferences & Profile
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Preferred Drink & Reading</span>
                  <div className="flex flex-wrap gap-2">
                    {(customer.preferences || ['Iced Latte', 'Vogue']).map((pref, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-xs"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Preferred Specialist</span>
                  <div className="font-bold text-slate-900 text-sm">
                    {customer.preferredStylistName || 'Any Qualified Senior Stylist'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Birthday Notification</span>
                  <div className="font-bold text-slate-900 text-sm">
                    {customer.birthday || 'Not specified'}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Consultation Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Stylist Consultation Notes
                  </h3>
                  <button
                    type="button"
                    onClick={() => onAddNote(customer)}
                    className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(customer.notes || []).map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-amber-900 leading-relaxed"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center gap-3">
            <button
              type="button"
              onClick={() => onBookAppointment(customer)}
              className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <button
              type="button"
              onClick={() => onEdit(customer)}
              className="py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-1.5"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
