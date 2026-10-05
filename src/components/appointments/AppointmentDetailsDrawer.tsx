'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  AlertCircle,
  Play,
  UserCheck,
  XCircle,
  Phone,
  Mail,
  DollarSign,
  FileText,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';

interface AppointmentDetailsDrawerProps {
  appointment: SalonAppointment | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (apt: SalonAppointment) => void;
  onReschedule: (apt: SalonAppointment) => void;
  onStatusChange: (apt: SalonAppointment, newStatus: AppointmentStatus) => void;
  onCancelClick: (apt: SalonAppointment) => void;
}

export const AppointmentDetailsDrawer: React.FC<AppointmentDetailsDrawerProps> = ({
  appointment,
  isOpen,
  onClose,
  onEdit,
  onReschedule,
  onStatusChange,
  onCancelClick,
}) => {
  if (!isOpen || !appointment) return null;

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
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                  {appointment.reference}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {appointment.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">Appointment Details</h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. Date, Time & Location Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-100/70 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">Scheduled Time</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {appointment.time} – {appointment.endTime}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-500" />
                  <span>{appointment.date}</span>
                  <span>•</span>
                  <span>{appointment.durationMinutes} min session</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onReschedule(appointment)}
                className="px-3 py-1.5 rounded-xl bg-white border border-brand-200 text-brand-600 font-bold text-xs shadow-xs hover:bg-brand-50 transition-all"
              >
                Change Time
              </button>
            </div>

            {/* 2. Customer Profile Card */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Client Information
              </h3>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={appointment.customerAvatar}
                    alt={appointment.customerName}
                    className="w-12 h-12 rounded-full object-cover border border-white shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {appointment.customerName}
                    </h4>
                    <div className="flex flex-col text-xs text-slate-500 mt-0.5 gap-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {appointment.customerPhone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {appointment.customerEmail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Service & Stylist */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Booked Service
                </span>
                <h5 className="font-bold text-slate-900 text-sm mt-1 truncate">
                  {appointment.serviceName}
                </h5>
                <span className="text-xs text-brand-600 font-semibold block mt-0.5">
                  {appointment.serviceCategory}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Assigned Stylist
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={appointment.staffAvatar}
                    alt={appointment.staffName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-900 text-xs truncate">
                      {appointment.staffName}
                    </h5>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {appointment.staffRole}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Financial Summary */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Financial Summary
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Service Fee</span>
                  <span className="font-semibold text-slate-900">
                    ₹{appointment.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated GST (18%)</span>
                  <span className="font-semibold text-slate-900">
                    ₹{Math.round(appointment.price * 0.18).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-600 font-black">
                    ₹{Math.round(appointment.price * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Payment Status: <strong className="text-slate-700">{appointment.paymentStatus}</strong></span>
                  <span>Method: {appointment.paymentMethod || 'Pay at Counter'}</span>
                </div>
              </div>
            </div>

            {/* 5. Appointment Notes */}
            {appointment.notes && (
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Client & Service Notes
                </h3>
                <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed">
                  {appointment.notes}
                </p>
              </div>
            )}
          </div>

          {/* Sticky Drawer Footer with Status Transition Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-wrap gap-2.5">
            {appointment.status === 'Confirmed' && (
              <button
                type="button"
                onClick={() => onStatusChange(appointment, 'Checked-in')}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Check-in Client</span>
              </button>
            )}

            {appointment.status === 'Checked-in' && (
              <button
                type="button"
                onClick={() => onStatusChange(appointment, 'In Progress')}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-pink-50 text-brand-600 hover:bg-pink-100 flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4" />
                <span>Seat in Chair</span>
              </button>
            )}

            {appointment.status === 'In Progress' && (
              <button
                type="button"
                onClick={() => onStatusChange(appointment, 'Completed')}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Service</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onEdit(appointment)}
              className="py-2.5 px-3.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
              <button
                type="button"
                onClick={() => onCancelClick(appointment)}
                className="py-2.5 px-3 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 border border-rose-200"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
