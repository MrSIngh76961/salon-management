'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Scissors,
  Clock,
  Check,
  AlertCircle,
  Sparkles,
  Camera,
} from 'lucide-react';
import { StaffMember, StaffRole, StaffStatus, StaffWorkingDay } from '@/types/staff';
import { SALON_SERVICES_LIST, ALL_STAFF_ROLES, createDefaultWorkingHours } from '@/data/staffManagement';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffData: Partial<StaffMember>) => void;
  staffToEdit?: StaffMember | null;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=140&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&auto=format&fit=crop&q=80',
];

export const StaffFormModal: React.FC<StaffFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  staffToEdit,
}) => {
  const isEditing = !!staffToEdit;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);
  const [role, setRole] = useState<StaffRole>('Senior Stylist');
  const [bio, setBio] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [status, setStatus] = useState<StaffStatus>('Active');
  const [assignedServices, setAssignedServices] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<StaffWorkingDay[]>(createDefaultWorkingHours());

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    if (staffToEdit) {
      setName(staffToEdit.name);
      setEmail(staffToEdit.email);
      setPhone(staffToEdit.phone);
      setAvatar(staffToEdit.avatar);
      setRole(staffToEdit.role);
      setBio(staffToEdit.bio || '');
      setExperienceYears(staffToEdit.experienceYears);
      setStatus(staffToEdit.status);
      setAssignedServices(staffToEdit.assignedServices || []);
      setWorkingHours(staffToEdit.workingHours || createDefaultWorkingHours());
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAvatar(PRESET_AVATARS[0]);
      setRole('Senior Stylist');
      setBio('');
      setExperienceYears(5);
      setStatus('Active');
      setAssignedServices(['Precision Haircut', 'Blowout & Silk Press']);
      setWorkingHours(createDefaultWorkingHours());
    }
    setErrors({});
  }, [staffToEdit, isOpen]);

  const toggleService = (svcName: string) => {
    if (assignedServices.includes(svcName)) {
      setAssignedServices(assignedServices.filter((s) => s !== svcName));
    } else {
      setAssignedServices([...assignedServices, svcName]);
    }
  };

  const toggleWorkingDay = (dayIndex: number) => {
    const updated = [...workingHours];
    updated[dayIndex].enabled = !updated[dayIndex].enabled;
    setWorkingHours(updated);
  };

  const updateWorkingHours = (dayIndex: number, field: keyof StaffWorkingDay, val: any) => {
    const updated = [...workingHours];
    updated[dayIndex] = { ...updated[dayIndex], [field]: val };
    setWorkingHours(updated);
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar,
      role,
      bio: bio.trim(),
      experienceYears: Number(experienceYears),
      status,
      assignedServices,
      workingHours,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl z-10 space-y-6 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {isEditing ? `Edit Staff Member` : `Add New Staff Member`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing
                  ? `Update personal info, roles, certified services, and shifts.`
                  : `Add a team stylist, specialist, or manager to your salon floor.`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs" noValidate>
            {/* 1. Avatar Preset Selection */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Profile Avatar Photo
              </label>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {PRESET_AVATARS.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(imgUrl)}
                    className={`relative rounded-2xl overflow-hidden shrink-0 transition-all ${
                      avatar === imgUrl
                        ? 'ring-3 ring-[#E6397A] scale-105 shadow-md'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt="Avatar" className="w-12 h-12 object-cover" />
                    {avatar === imgUrl && (
                      <div className="absolute inset-0 bg-[#E6397A]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Personal & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emily Johnson"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full rounded-xl border p-2.5 pl-9 outline-none text-slate-900 ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#E6397A]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="emily@salonpro.io"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full rounded-xl border p-2.5 pl-9 outline-none text-slate-900 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#E6397A]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full rounded-xl border p-2.5 pl-9 outline-none text-slate-900 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-[#E6397A]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Staff Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as StaffRole)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900 bg-white"
                >
                  {ALL_STAFF_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Employment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as StaffStatus)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900 bg-white"
                >
                  <option value="Active">Active Duty</option>
                  <option value="Inactive">Inactive / Suspended</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            {/* 3. Bio */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Professional Bio / Notes
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of styling specialties, certifications, and background..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#E6397A] text-slate-900"
              />
            </div>

            {/* 4. Assigned Services (Checkboxes) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Assigned Services & Treatments ({assignedServices.length} selected)
                </label>
                <span className="text-[11px] text-slate-400">Click to assign or remove</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-2xl bg-slate-50/50">
                {SALON_SERVICES_LIST.map((svc) => {
                  const isChecked = assignedServices.includes(svc.name);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.name)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-pink-50/80 border-pink-300 text-slate-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-[#E6397A] border-[#E6397A] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-semibold truncate text-xs">{svc.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">
                        ${svc.defaultPrice}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Working Days Quick Toggles */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Working Days Schedule (Mon - Sun)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {workingHours.map((wh, idx) => (
                  <button
                    key={wh.day}
                    type="button"
                    onClick={() => toggleWorkingDay(idx)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      wh.enabled
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs">{wh.day.slice(0, 3)}</span>
                    <span className="text-[10px] block mt-0.5">
                      {wh.enabled ? `${wh.startTime.split(' ')[0]} - ${wh.endTime.split(' ')[0]}` : 'Day Off'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-gradient hover:brightness-105 text-white font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer"
              >
                {isEditing ? 'Save Changes' : 'Confirm & Add Staff'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
