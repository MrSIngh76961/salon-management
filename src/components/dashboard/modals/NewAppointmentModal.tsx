'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Scissors, DollarSign, CheckCircle2 } from 'lucide-react';
import { DashboardAppointment } from '@/types/dashboard';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: DashboardAppointment) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [serviceName, setServiceName] = useState('Precision Haircut & Style');
  const [staffName, setStaffName] = useState('Elena Rostova');
  const [time, setTime] = useState('03:30 PM');
  const [price, setPrice] = useState(65);
  const [duration, setDuration] = useState('45m');

  const services = [
    { name: 'Precision Haircut & Style', price: 65, duration: '45m' },
    { name: 'Balayage & Glaze Treatment', price: 195, duration: '2h 15m' },
    { name: 'Botanical Hydrafacial Spa', price: 110, duration: '1h 00m' },
    { name: 'Deluxe Gel Spa Pedicure', price: 85, duration: '1h 15m' },
  ];

  const stylists = [
    { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Chloe Dubois', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
    { name: 'Julian Reed', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const matchedStylist = stylists.find((s) => s.name === staffName) || stylists[0];

    const newApt: DashboardAppointment = {
      id: `apt-${Date.now()}`,
      time,
      date: 'Today',
      customerName: customerName.trim(),
      customerAvatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      serviceName,
      serviceCategory: 'Hair',
      staffName,
      staffAvatar: matchedStylist.avatar,
      duration,
      price,
      status: 'Confirmed',
    };

    onAddAppointment(newApt);
    onClose();
    setCustomerName('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl z-10 space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add New Appointment</h3>
              <p className="text-xs text-slate-500">Schedule a direct salon visit for today.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Client Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Sterling"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 pl-9 outline-none focus:border-[#E6397A] text-slate-900"
                />
              </div>
            </div>

            {/* Service & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Select Service
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => {
                    const sel = services.find((s) => s.name === e.target.value);
                    if (sel) {
                      setServiceName(sel.name);
                      setPrice(sel.price);
                      setDuration(sel.duration);
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900 bg-white"
                >
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Assigned Stylist
                </label>
                <select
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900 bg-white"
                >
                  {stylists.map((st) => (
                    <option key={st.name} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Appointment Time
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Estimated Total
                </label>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 text-sm">
                  ${price}.00 ({duration})
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-gradient hover:brightness-105 text-white font-bold shadow-md shadow-pink-500/20"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
