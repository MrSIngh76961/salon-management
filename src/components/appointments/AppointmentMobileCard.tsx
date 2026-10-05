'use client';

import React, { useState } from 'react';
import {
  Clock,
  MoreVertical,
  Eye,
  Edit2,
  Calendar,
  CheckCircle2,
  Play,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { SalonAppointment, AppointmentStatus } from '@/types/appointment';

interface AppointmentMobileCardProps {
  appointments: SalonAppointment[];
  onViewDetails: (apt: SalonAppointment) => void;
  onEditAppointment: (apt: SalonAppointment) => void;
  onReschedule: (apt: SalonAppointment) => void;
  onStatusChange: (apt: SalonAppointment, newStatus: AppointmentStatus) => void;
  onCancelClick: (apt: SalonAppointment) => void;
}

export const AppointmentMobileCard: React.FC<AppointmentMobileCardProps> = ({
  appointments,
  onViewDetails,
  onEditAppointment,
  onReschedule,
  onStatusChange,
  onCancelClick,
}) => {
  const [openCardMenuId, setOpenCardMenuId] = useState<string | null>(null);

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center text-slate-400 text-sm">
        No appointments found matching your filters.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {appointments.map((apt) => {
        const isMenuOpen = openCardMenuId === apt.id;

        return (
          <div
            key={apt.id}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative transition-all active:bg-slate-50/50"
            onClick={() => onViewDetails(apt)}
          >
            {/* Top row: Customer + Time + 3-dots */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={apt.customerAvatar}
                  alt={apt.customerName}
                  className="w-11 h-11 rounded-full object-cover border border-white shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">
                    {apt.customerName}
                  </h3>
                  <span className="text-xs font-semibold text-brand-600 block">
                    {apt.time} • {apt.date}
                  </span>
                </div>
              </div>

              {/* 3-dots menu */}
              <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setOpenCardMenuId(isMenuOpen ? null : apt.id)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-xl"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-8 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 text-left">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenCardMenuId(null);
                        onViewDetails(apt);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenCardMenuId(null);
                        onReschedule(apt);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reschedule</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenCardMenuId(null);
                        onEditAppointment(apt);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Details</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Middle row: Service & Stylist */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="min-w-0 pr-2">
                <span className="font-bold text-slate-800 block truncate">
                  {apt.serviceName}
                </span>
                <span className="text-[11px] text-slate-400">
                  Stylist: {apt.staffName}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="font-black text-slate-900 text-sm block">
                  ₹{apt.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">
                  {apt.durationMinutes} min
                </span>
              </div>
            </div>

            {/* Bottom row: Status & Quick action */}
            <div
              className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {apt.status}
              </span>

              {apt.status === 'Confirmed' && (
                <button
                  type="button"
                  onClick={() => onStatusChange(apt, 'Checked-in')}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200"
                >
                  Check-in
                </button>
              )}

              {apt.status === 'Checked-in' && (
                <button
                  type="button"
                  onClick={() => onStatusChange(apt, 'In Progress')}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-pink-50 text-[#E6397A] border border-pink-200"
                >
                  Start Service
                </button>
              )}

              {apt.status === 'In Progress' && (
                <button
                  type="button"
                  onClick={() => onStatusChange(apt, 'Completed')}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
