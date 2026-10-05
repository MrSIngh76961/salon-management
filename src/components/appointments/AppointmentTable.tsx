'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  Clock,
  Eye,
  Edit2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Play,
  UserCheck,
  XCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';

interface AppointmentTableProps {
  appointments: SalonAppointment[];
  onViewDetails: (apt: SalonAppointment) => void;
  onEditAppointment: (apt: SalonAppointment) => void;
  onReschedule: (apt: SalonAppointment) => void;
  onStatusChange: (apt: SalonAppointment, newStatus: AppointmentStatus) => void;
  onCancelClick: (apt: SalonAppointment) => void;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onViewDetails,
  onEditAppointment,
  onReschedule,
  onStatusChange,
  onCancelClick,
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

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-[#E6397A] border border-pink-200/80 shadow-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#E6397A] animate-pulse" />
            In Chair
          </span>
        );
      case 'Checked-in':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Checked-in
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Cancelled
          </span>
        );
      case 'No-show':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
            No-show
          </span>
        );
      case 'Rescheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
            Rescheduled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="px-5 py-4 min-w-[170px]">Date & Time</th>
              <th className="px-5 py-4 min-w-[220px]">Customer</th>
              <th className="px-5 py-4 min-w-[200px]">Service</th>
              <th className="px-5 py-4 min-w-[190px]">Stylist</th>
              <th className="px-5 py-4 min-w-[110px]">Duration</th>
              <th className="px-5 py-4 min-w-[120px]">Price</th>
              <th className="px-5 py-4 min-w-[130px]">Status</th>
              <th className="px-5 py-4 w-28 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-14 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-slate-300" />
                    <span>No appointments found matching your filters.</span>
                  </div>
                </td>
              </tr>
            ) : (
              appointments.map((apt) => {
                const isMenuOpen = activeMenuId === apt.id;

                return (
                  <tr
                    key={apt.id}
                    className="hover:bg-pink-50/20 transition-colors group cursor-pointer"
                    onClick={() => onViewDetails(apt)}
                  >
                    {/* Date & Time */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {apt.time}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          {apt.date} • {apt.reference}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={apt.customerAvatar}
                          alt={apt.customerName}
                          className="w-9 h-9 rounded-full object-cover border border-white shadow-xs shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm block truncate group-hover:text-brand-600 transition-colors">
                            {apt.customerName}
                          </span>
                          <span className="text-slate-400 text-[11px] block truncate">
                            {apt.customerPhone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800 text-xs block truncate">
                          {apt.serviceName}
                        </span>
                        <span className="inline-block text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mt-1">
                          {apt.serviceCategory}
                        </span>
                      </div>
                    </td>

                    {/* Stylist */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={apt.staffAvatar}
                          alt={apt.staffName}
                          className="w-8 h-8 rounded-full object-cover border border-white shadow-xs shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 text-xs block truncate">
                            {apt.staffName}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {apt.staffRole}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 text-slate-700 font-semibold text-xs">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.durationMinutes} min</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{apt.price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            apt.paymentStatus === 'Paid'
                              ? 'text-emerald-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {apt.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(apt.status)}
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="px-5 py-4 text-right whitespace-nowrap relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : apt.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          ref={menuRef}
                          className="absolute right-5 top-12 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewDetails(apt);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span>View Details</span>
                          </button>

                          {apt.status === 'Confirmed' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onStatusChange(apt, 'Checked-in');
                              }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                            >
                              <UserCheck className="w-4 h-4" />
                              <span>Check-In Guest</span>
                            </button>
                          )}

                          {apt.status === 'Checked-in' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onStatusChange(apt, 'In Progress');
                              }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-pink-600 hover:bg-pink-50"
                            >
                              <Play className="w-4 h-4" />
                              <span>Seat in Chair</span>
                            </button>
                          )}

                          {apt.status === 'In Progress' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onStatusChange(apt, 'Completed');
                              }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Complete Service</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onReschedule(apt);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>Reschedule</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditAppointment(apt);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Edit2 className="w-4 h-4 text-slate-400" />
                            <span>Edit Details</span>
                          </button>

                          <div className="my-1 border-t border-slate-100" />

                          {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onCancelClick(apt);
                              }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Cancel Booking</span>
                            </button>
                          )}
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
