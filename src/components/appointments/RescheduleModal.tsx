'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { SalonAppointment } from '@/types/appointment';
import { MOCK_SLOTS_SAMPLE } from '@/data/mockAppointments';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: SalonAppointment | null;
  onConfirmReschedule: (aptId: string, newDate: string, newTime: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmReschedule,
}) => {
  const [newDate, setNewDate] = useState('2026-09-25');
  const [newTime, setNewTime] = useState('11:15 AM');

  useEffect(() => {
    if (appointment) {
      setNewDate(appointment.date);
      setNewTime(appointment.time);
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleSave = () => {
    onConfirmReschedule(appointment.id, newDate, newTime);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Reschedule Booking
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {appointment.customerName}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current schedule info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div>
              <strong>Current:</strong> {appointment.date} at {appointment.time}
            </div>
            <div>
              <strong>Service:</strong> {appointment.serviceName} ({appointment.staffName})
            </div>
          </div>

          {/* New Date & Time Pickers */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select New Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select New Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                {MOCK_SLOTS_SAMPLE.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available && slot.time !== appointment.time}
                    onClick={() => setNewTime(slot.time)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      newTime === slot.time
                        ? 'bg-brand-500 text-white border-brand-500 shadow-xs'
                        : slot.available
                        ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        : 'bg-slate-100 text-slate-300 border-transparent cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
            >
              Confirm Reschedule
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
