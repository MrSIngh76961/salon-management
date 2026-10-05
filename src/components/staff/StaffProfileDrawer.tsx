'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  Calendar,
  Clock,
  Briefcase,
  Star,
  Scissors,
  Palmtree,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Power,
  Plus,
  ArrowRight,
  Coffee,
  UserCheck,
} from 'lucide-react';
import { StaffMember } from '@/types/staff';
import { SALON_SERVICES_LIST } from '@/data/staffManagement';

interface StaffProfileDrawerProps {
  staff: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (staff: StaffMember) => void;
  onToggleStatus: (staff: StaffMember) => void;
  onOpenAddLeave: (staff: StaffMember) => void;
  onOpenEditServices: (staff: StaffMember) => void;
}

type TabType = 'overview' | 'services' | 'schedule' | 'leave' | 'history';

export const StaffProfileDrawer: React.FC<StaffProfileDrawerProps> = ({
  staff,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onOpenAddLeave,
  onOpenEditServices,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!isOpen || !staff) return null;

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

        {/* Sliding Drawer Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-xl bg-white shadow-2xl z-10 flex flex-col h-full border-l border-slate-200 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/5 p-6 border-b border-slate-100 relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-xs transition-all"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-md"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    staff.availability === 'Available'
                      ? 'bg-emerald-500'
                      : staff.availability === 'Busy'
                      ? 'bg-[#E6397A]'
                      : staff.availability === 'On Break'
                      ? 'bg-amber-500'
                      : staff.availability === 'On Leave'
                      ? 'bg-purple-500'
                      : 'bg-slate-400'
                  }`}
                />
              </div>

              <div className="min-w-0 pr-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 truncate">{staff.name}</h2>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      staff.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : staff.status === 'On Leave'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {staff.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800 bg-white/80 px-2 py-0.5 rounded-lg border border-slate-200/60">
                    {staff.role}
                  </span>
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                    <span>{staff.rating}</span>
                    <span className="text-slate-400 font-normal ml-1">({staff.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/40 text-xs">
              <button
                type="button"
                onClick={() => onEdit(staff)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#E6397A] hover:border-pink-200 font-semibold shadow-xs transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleStatus(staff)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border shadow-xs transition-colors ${
                  staff.status === 'Active'
                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{staff.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 border-b border-slate-100 overflow-x-auto text-xs bg-slate-50/50">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: `Services (${staff.assignedServices.length})` },
              { id: 'schedule', label: 'Working Hours' },
              { id: 'leave', label: `Leave (${staff.leaveRecords.length})` },
              { id: 'history', label: 'Appointments' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-3 px-3 font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#E6397A] text-[#E6397A] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-600">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Contact & General Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                      Email Address
                    </span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold truncate">
                      <Mail className="w-3.5 h-3.5 text-[#E6397A] shrink-0" />
                      <span className="truncate">{staff.email}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                      Phone Number
                    </span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-[#E6397A] shrink-0" />
                      <span>{staff.phone}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                      Experience
                    </span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Briefcase className="w-3.5 h-3.5 text-[#E6397A] shrink-0" />
                      <span>{staff.experienceYears} Years Professional</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                      Member Since
                    </span>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#E6397A] shrink-0" />
                      <span>{staff.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Stylist Bio & Philosophy
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {staff.bio || 'Dedicated beauty professional committed to top client satisfaction.'}
                  </p>
                </div>

                {/* Today's Availability Card */}
                <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-pink-600 font-bold uppercase block">
                      Live Operational Status
                    </span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {staff.availability === 'Available'
                        ? 'Ready for Walk-ins & Appointments'
                        : staff.availability === 'Busy'
                        ? 'Currently In Session with Client'
                        : staff.availability === 'On Break'
                        ? 'On Scheduled Meal Break'
                        : 'Unavailable Today'}
                    </div>
                  </div>
                  <span className="font-extrabold text-[#E6397A] text-lg">
                    {staff.todayAppointmentsCount} Visits
                  </span>
                </div>
              </div>
            )}

            {/* 2. ASSIGNED SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Services this stylist is certified to perform and book:
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenEditServices(staff)}
                    className="text-xs font-bold text-[#E6397A] hover:underline"
                  >
                    Edit Services
                  </button>
                </div>

                {staff.assignedServices.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                    No services assigned. (Administrative or non-treatment role)
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {staff.assignedServices.map((svcName) => {
                      const detail = SALON_SERVICES_LIST.find((s) => s.name === svcName);
                      return (
                        <div
                          key={svcName}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{svcName}</div>
                            <span className="text-[10px] text-slate-400">
                              {detail ? `${detail.category} • ${detail.duration}` : 'Custom Treatment'}
                            </span>
                          </div>
                          {detail && (
                            <span className="font-extrabold text-slate-900 text-xs">
                              ${detail.defaultPrice}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 3. WORKING HOURS TAB */}
            {activeTab === 'schedule' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs text-slate-500">Standard weekly shift timetable:</span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    42 Hours / Week
                  </span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
                  {staff.workingHours.map((wh) => (
                    <div
                      key={wh.day}
                      className="p-3 px-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="font-bold text-slate-800 text-xs w-28">{wh.day}</span>

                      {wh.enabled ? (
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-medium text-slate-900">
                            {wh.startTime} - {wh.endTime}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            Break: {wh.breakStart} - {wh.breakEnd}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 italic">
                          Scheduled Day Off
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. LEAVE TAB */}
            {activeTab === 'leave' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Vacations, personal days & medical leave:</span>
                  <button
                    type="button"
                    onClick={() => onOpenAddLeave(staff)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-gradient text-white font-bold text-xs shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Leave</span>
                  </button>
                </div>

                {staff.leaveRecords.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                    No active or upcoming leave on record.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {staff.leaveRecords.map((lv) => (
                      <div
                        key={lv.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{lv.leaveType}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              lv.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : lv.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {lv.status}
                          </span>
                        </div>
                        <div className="text-slate-600 text-[11px] font-medium">
                          Period: <strong>{lv.startDate}</strong> — <strong>{lv.endDate}</strong>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">&ldquo;{lv.reason}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. APPOINTMENTS TAB */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                {/* Today's Schedule Preview */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">Today&apos;s Appointments</span>
                    <Link
                      href="/calendar"
                      className="text-xs font-bold text-[#E6397A] hover:underline flex items-center gap-1"
                    >
                      <span>View Full Calendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {staff.todaySchedule.length === 0 ? (
                    <div className="p-4 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                      No appointments booked for today.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {staff.todaySchedule.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-slate-900 text-xs">
                              {slot.clientName}
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {slot.serviceName} ({slot.duration})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-900 text-xs block">
                              {slot.time}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                slot.status === 'Completed'
                                  ? 'bg-slate-200 text-slate-700'
                                  : slot.status === 'In Progress'
                                  ? 'bg-pink-100 text-[#E6397A]'
                                  : slot.status === 'Break'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {slot.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Historical Appointments */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">Recent Visit History</span>
                    <Link
                      href="/appointments"
                      className="text-xs font-bold text-[#E6397A] hover:underline flex items-center gap-1"
                    >
                      <span>View All Appointments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {staff.appointmentHistory.length === 0 ? (
                    <div className="p-4 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400">
                      No past records found for this period.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden bg-white">
                      {staff.appointmentHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{item.customerName}</div>
                            <span className="text-[11px] text-slate-400">
                              {item.serviceName} • {item.date}
                            </span>
                          </div>
                          <span className="font-extrabold text-slate-900 text-sm">
                            ${item.revenue}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
