'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  User,
  Scissors,
  Check,
  Sparkles,
  AlertCircle,
  IndianRupee,
} from 'lucide-react';
import { SalonAppointment, TimeSlot } from '@/types/appointment';
import { Customer } from '@/types/customer';
import { SalonServiceItem, ServiceAssignedStaff } from '@/types/service';
import { MOCK_SLOTS_SAMPLE } from '@/data/mockAppointments';

interface AppointmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointmentData: Partial<SalonAppointment>) => void;
  appointmentToEdit?: SalonAppointment | null;
  customers: Customer[];
  services: SalonServiceItem[];
  staff: ServiceAssignedStaff[];
}

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  appointmentToEdit,
  customers,
  services,
  staff,
}) => {
  const isEditing = Boolean(appointmentToEdit);

  // Form states
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [date, setDate] = useState('2026-09-24');
  const [time, setTime] = useState('10:30 AM');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<SalonAppointment['status']>('Confirmed');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (appointmentToEdit) {
        setSelectedCustomerId(appointmentToEdit.customerId);
        setSelectedServiceId(appointmentToEdit.serviceId);
        setSelectedStaffId(appointmentToEdit.staffId);
        setDate(appointmentToEdit.date);
        setTime(appointmentToEdit.time);
        setNotes(appointmentToEdit.notes || '');
        setStatus(appointmentToEdit.status);
      } else {
        setSelectedCustomerId(customers[0]?.id || '');
        setSelectedServiceId(services[0]?.id || '');
        setSelectedStaffId(staff[0]?.id || '');
        setDate('2026-09-24');
        setTime('10:30 AM');
        setNotes('');
        setStatus('Confirmed');
      }
      setErrorMsg('');
    }
  }, [isOpen, appointmentToEdit, customers, services, staff]);

  if (!isOpen) return null;

  // Selected entities
  const currentCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentStaff = staff.find((s) => s.id === selectedStaffId) || staff[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !selectedServiceId || !selectedStaffId || !time) {
      setErrorMsg('Please complete all booking steps.');
      return;
    }

    const payload: Partial<SalonAppointment> = {
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      customerEmail: currentCustomer.email,
      customerAvatar: currentCustomer.avatar,
      serviceId: currentService.id,
      serviceName: currentService.name,
      serviceCategory: currentService.category,
      price: currentService.price,
      durationMinutes: currentService.durationMinutes,
      staffId: currentStaff.id,
      staffName: currentStaff.name,
      staffAvatar: currentStaff.avatar,
      staffRole: currentStaff.role,
      date,
      time,
      endTime: '11:30 AM',
      status,
      notes: notes.trim(),
    };

    onSave(payload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Appointment' : 'Create New Appointment'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign a client to an available salon specialist and booking time slot.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Step 1: Customer Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                1. Select Client
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone}) - {c.status} Client
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2 & 3: Service & Stylist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  2. Select Treatment / Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (₹{s.price.toLocaleString('en-IN')}, {s.durationMinutes}m)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  3. Select Assigned Stylist
                </label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                >
                  {staff.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Date & Available Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  4. Appointment Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  5. Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                >
                  {MOCK_SLOTS_SAMPLE.map((slot) => (
                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={!slot.available && !isEditing}
                    >
                      {slot.time} {slot.available ? '• Available' : `• (${slot.reason})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 6: Notes & Status */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Client Request or Color Formula Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Special client requests, allergies, products used..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all resize-none"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">
                    {currentService?.name} with {currentStaff?.name}
                  </span>
                  <span className="text-slate-500">
                    {date} at {time} ({currentService?.durationMinutes} min)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-base text-slate-900 block">
                    ₹{currentService?.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Standard Fee</span>
                </div>
              </div>
            </div>

            {errorMsg && <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>}
          </form>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:via-pink-600 hover:to-purple-700 shadow-md shadow-brand-500/25 transition-all transform active:scale-95"
            >
              {isEditing ? 'Save Changes' : 'Confirm & Book Appointment'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
