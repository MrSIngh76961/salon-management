'use client';

import React, { useState } from 'react';
import {
  MoreVertical,
  Star,
  Eye,
  Edit2,
  Calendar,
  Clock,
  Scissors,
  Coffee,
  CheckCircle2,
  AlertCircle,
  Power,
  Palmtree,
} from 'lucide-react';
import { StaffMember, StaffAvailability, StaffStatus } from '@/types/staff';

interface StaffMobileCardProps {
  staffList: StaffMember[];
  onViewProfile: (staff: StaffMember) => void;
  onEditStaff: (staff: StaffMember) => void;
  onManageServices: (staff: StaffMember) => void;
  onManageSchedule: (staff: StaffMember) => void;
  onManageLeave: (staff: StaffMember) => void;
  onToggleStatus: (staff: StaffMember) => void;
}

export const StaffMobileCard: React.FC<StaffMobileCardProps> = ({
  staffList,
  onViewProfile,
  onEditStaff,
  onManageServices,
  onManageSchedule,
  onManageLeave,
  onToggleStatus,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getAvailabilityBadge = (availability: StaffAvailability) => {
    switch (availability) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Busy':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-50 text-[#E6397A] border border-pink-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A] animate-pulse" />
            Busy
          </span>
        );
      case 'On Break':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Coffee className="w-3 h-3 text-amber-600" />
            Break
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Palmtree className="w-3 h-3 text-purple-600" />
            Leave
          </span>
        );
      case 'Offline':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            Offline
          </span>
        );
    }
  };

  if (staffList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-slate-400 text-xs border border-slate-200/80">
        No staff members found matching this filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {staffList.map((staff) => (
        <div
          key={staff.id}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-4"
        >
          {/* Top Row: Avatar, Name, Role, Menu */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0" onClick={() => onViewProfile(staff)}>
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
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

              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-sm truncate">
                  {staff.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {staff.role}
                  </span>
                  <div className="flex items-center text-[10px] text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current mr-0.5" />
                    <span>{staff.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Actions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMenuId(activeMenuId === staff.id ? null : staff.id)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {activeMenuId === staff.id && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl border border-slate-200 shadow-2xl p-1.5 z-40 text-slate-900 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuId(null);
                      onViewProfile(staff);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuId(null);
                      onEditStaff(staff);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuId(null);
                      onManageServices(staff);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#E6397A]" />
                    <span>Services</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuId(null);
                      onManageLeave(staff);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Palmtree className="w-3.5 h-3.5 text-amber-500" />
                    <span>Leave</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuId(null);
                      onToggleStatus(staff);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${
                      staff.status === 'Active'
                        ? 'text-rose-600 hover:bg-rose-50'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{staff.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Middle Row: Status & Today's Appointments */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Floor Status
              </span>
              <div>{getAvailabilityBadge(staff.availability)}</div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Appointments
              </span>
              <span className="font-extrabold text-slate-900 text-xs block">
                {staff.todayAppointmentsCount} booked today
              </span>
            </div>
          </div>

          {/* Assigned Services Pills */}
          {staff.assignedServices.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {staff.assignedServices.slice(0, 3).map((svc) => (
                <span
                  key={svc}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-50 text-[#E6397A] border border-pink-100"
                >
                  {svc}
                </span>
              ))}
              {staff.assignedServices.length > 3 && (
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  +{staff.assignedServices.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Bottom Action Button */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewProfile(staff)}
              className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Profile</span>
            </button>

            <button
              type="button"
              onClick={() => onEditStaff(staff)}
              className="flex-1 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200/80 text-[#E6397A] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
