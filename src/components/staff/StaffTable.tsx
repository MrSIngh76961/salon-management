'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  ShieldAlert,
  Power,
  Palmtree,
  UserX,
} from 'lucide-react';
import { StaffMember, StaffAvailability, StaffStatus } from '@/types/staff';

interface StaffTableProps {
  staffList: StaffMember[];
  onViewProfile: (staff: StaffMember) => void;
  onEditStaff: (staff: StaffMember) => void;
  onManageServices: (staff: StaffMember) => void;
  onManageSchedule: (staff: StaffMember) => void;
  onManageLeave: (staff: StaffMember) => void;
  onToggleStatus: (staff: StaffMember) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  staffList,
  onViewProfile,
  onEditStaff,
  onManageServices,
  onManageSchedule,
  onManageLeave,
  onToggleStatus,
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

  const getAvailabilityBadge = (availability: StaffAvailability) => {
    switch (availability) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Busy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-[#E6397A] border border-pink-200/80 shadow-xs whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#E6397A] animate-pulse" />
            Busy (In Session)
          </span>
        );
      case 'On Break':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 whitespace-nowrap">
            <Coffee className="w-3 h-3 text-amber-600" />
            On Break
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 whitespace-nowrap">
            <Palmtree className="w-3 h-3 text-purple-600" />
            On Leave
          </span>
        );
      case 'Offline':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Offline
          </span>
        );
    }
  };

  const getStatusBadge = (status: StaffStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            Active
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap">
            On Leave
          </span>
        );
      case 'Inactive':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="px-5 py-4 min-w-[240px]">Staff Member</th>
              <th className="px-5 py-4 min-w-[150px]">Role</th>
              <th className="px-5 py-4 min-w-[220px]">Assigned Services</th>
              <th className="px-5 py-4 w-36 whitespace-nowrap">Working Hours</th>
              <th className="px-5 py-4 min-w-[160px] whitespace-nowrap">Today&apos;s Status</th>
              <th className="px-5 py-4 w-32 whitespace-nowrap">Appointments</th>
              <th className="px-5 py-4 w-28 whitespace-nowrap">Status</th>
              <th className="px-5 py-4 w-20 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staffList.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                  No staff members match the selected criteria.
                </td>
              </tr>
            ) : (
              staffList.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-pink-50/20 transition-colors group cursor-pointer"
                  onClick={() => onViewProfile(staff)}
                >
                  {/* Staff Info (Avatar + Name + Contact) */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
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
                        <div className="font-bold text-slate-900 text-sm hover:text-[#E6397A] transition-colors truncate">
                          {staff.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {staff.email}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {staff.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                      {staff.role}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{staff.rating}</span>
                      <span className="text-slate-400 font-normal">({staff.reviewCount})</span>
                    </div>
                  </td>

                  {/* Services */}
                  <td className="px-5 py-4">
                    {staff.assignedServices.length === 0 ? (
                      <span className="text-slate-400 text-xs italic">No services (Administrative)</span>
                    ) : (
                      <div className="flex flex-wrap items-center gap-1 max-w-[240px]">
                        {staff.assignedServices.slice(0, 2).map((svc) => (
                          <span
                            key={svc}
                            className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-50 text-[#E6397A] border border-pink-100 whitespace-nowrap truncate max-w-[120px]"
                          >
                            {svc}
                          </span>
                        ))}
                        {staff.assignedServices.length > 2 && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            +{staff.assignedServices.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Working Hours */}
                  <td className="px-5 py-4 whitespace-nowrap text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs">09:00 AM - 06:00 PM</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Mon - Sat (Sun Off)</span>
                  </td>

                  {/* Today's Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getAvailabilityBadge(staff.availability)}
                  </td>

                  {/* Appointments Count */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {staff.todayAppointmentsCount} visits
                    </div>
                    <span className="text-[10px] text-slate-400">Scheduled today</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getStatusBadge(staff.status)}
                  </td>

                  {/* Actions Dropdown */}
                  <td
                    className="px-5 py-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative inline-block text-left" ref={activeMenuId === staff.id ? menuRef : null}>
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === staff.id ? null : staff.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-label="Staff actions menu"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === staff.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl border border-slate-200 shadow-2xl p-1.5 z-40 text-slate-900 text-left animate-in fade-in zoom-in-95 duration-100">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onViewProfile(staff);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span>View Profile</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditStaff(staff);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4 text-slate-400" />
                            <span>Edit Staff</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onManageServices(staff);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Scissors className="w-4 h-4 text-[#E6397A]" />
                            <span>Manage Services</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onManageSchedule(staff);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>Manage Schedule</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onManageLeave(staff);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            <Palmtree className="w-4 h-4 text-amber-500" />
                            <span>Manage Leave</span>
                          </button>

                          <div className="pt-1 mt-1 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onToggleStatus(staff);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                                staff.status === 'Active'
                                  ? 'text-rose-600 hover:bg-rose-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              <Power className="w-4 h-4" />
                              <span>
                                {staff.status === 'Active' ? 'Deactivate Staff' : 'Activate Staff'}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
