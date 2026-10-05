'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palmtree, Calendar, AlertCircle } from 'lucide-react';
import { StaffMember, LeaveType, StaffLeaveRecord } from '@/types/staff';

interface StaffLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffMember | null;
  onAddLeave: (staffId: string, leaveRecord: StaffLeaveRecord) => void;
}

export const StaffLeaveModal: React.FC<StaffLeaveModalProps> = ({
  isOpen,
  onClose,
  staff,
  onAddLeave,
}) => {
  const [leaveType, setLeaveType] = useState<LeaveType>('Annual Leave');
  const [startDate, setStartDate] = useState('Oct 15, 2026');
  const [endDate, setEndDate] = useState('Oct 20, 2026');
  const [reason, setReason] = useState('');

  if (!isOpen || !staff) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const newLeave: StaffLeaveRecord = {
      id: `lv-${Date.now()}`,
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
      status: 'Approved',
      appliedOn: 'Today',
    };

    onAddLeave(staff.id, newLeave);
    onClose();
    setReason('');
  };

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
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl z-10 space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Palmtree className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add Staff Leave</h3>
                <p className="text-xs text-slate-500">Record scheduled time off for {staff.name}.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Leave Type */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Leave Category
              </label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900 bg-white"
              >
                <option value="Annual Leave">Annual Paid Holiday</option>
                <option value="Sick Leave">Medical / Sick Leave</option>
                <option value="Personal Leave">Personal / Family Leave</option>
                <option value="Unpaid Leave">Unpaid Leave of Absence</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Start Date
                </label>
                <input
                  type="text"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  End Date
                </label>
                <input
                  type="text"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Reason / Note *
              </label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Attending European beauty conference in Milan"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
              />
            </div>

            {/* Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
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
                Approve & Record Leave
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
