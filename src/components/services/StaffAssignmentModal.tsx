'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Users,
  Search,
  Check,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SalonServiceItem, ServiceAssignedStaff } from '@/types/service';

interface StaffAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: SalonServiceItem | null;
  allStaff: ServiceAssignedStaff[];
  onSaveAssignments: (serviceId: string, assignedStaff: ServiceAssignedStaff[]) => void;
}

export const StaffAssignmentModal: React.FC<StaffAssignmentModalProps> = ({
  isOpen,
  onClose,
  service,
  allStaff,
  onSaveAssignments,
}) => {
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen && service) {
      setSelectedStaffIds(service.assignedStaff?.map((s) => s.id) || []);
      setSearchQuery('');
    }
  }, [isOpen, service]);

  if (!isOpen || !service) return null;

  const handleToggleStaff = (staffId: string) => {
    setSelectedStaffIds((prev) =>
      prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStaffIds.length === allStaff.length) {
      setSelectedStaffIds([]);
    } else {
      setSelectedStaffIds(allStaff.map((s) => s.id));
    }
  };

  const handleSave = () => {
    const assignedObjects = allStaff.filter((s) => selectedStaffIds.includes(s.id));
    onSaveAssignments(service.id, assignedObjects);
    onClose();
  };

  const filteredStaff = allStaff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Busy':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-[#E6397A] border border-pink-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A] animate-pulse" />
            In Session
          </span>
        );
      case 'On Break':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Break
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
            {availability}
          </span>
        );
    }
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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600 border border-pink-100">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Assign Stylists & Staff
                </h2>
                <p className="text-xs text-slate-500">
                  Select qualified staff permitted to perform &ldquo;{service.name}&rdquo;.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Selection Controls */}
          <div className="p-5 border-b border-slate-100 space-y-3 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search staff by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 pl-10 pr-4 outline-none text-slate-900 focus:bg-white focus:border-[#E6397A] transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                <span className="font-bold text-slate-900">{selectedStaffIds.length}</span> of{' '}
                <span className="font-bold text-slate-900">{allStaff.length}</span> staff assigned
              </span>

              <button
                type="button"
                onClick={handleSelectAll}
                className="font-bold text-brand-600 hover:underline"
              >
                {selectedStaffIds.length === allStaff.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>

          {/* Staff Roster List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
            {filteredStaff.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-8">
                No staff found matching &quot;{searchQuery}&quot;.
              </p>
            ) : (
              filteredStaff.map((staff) => {
                const isSelected = selectedStaffIds.includes(staff.id);

                return (
                  <div
                    key={staff.id}
                    onClick={() => handleToggleStaff(staff.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'bg-pink-50/40 border-brand-200 shadow-xs'
                        : 'bg-white border-slate-200/70 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#E6397A] border-[#E6397A] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-10 h-10 rounded-full object-cover shadow-xs border border-white"
                      />

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {staff.name}
                        </h4>
                        <span className="text-[11px] text-slate-500">{staff.role}</span>
                      </div>
                    </div>

                    <div className="shrink-0">{getAvailabilityBadge(staff.availability)}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Used by Appointment Engine to calculate booking slots.
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-md shadow-brand-500/25 transition-all transform active:scale-95"
              >
                Save Assignments
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
