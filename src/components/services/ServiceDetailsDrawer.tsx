'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Tag,
  Users,
  TrendingUp,
  Sparkles,
  Edit2,
  Power,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Percent,
} from 'lucide-react';
import { SalonServiceItem } from '@/types/service';

interface ServiceDetailsDrawerProps {
  service: SalonServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (service: SalonServiceItem) => void;
  onToggleStatus: (service: SalonServiceItem) => void;
  onManageStaff: (service: SalonServiceItem) => void;
}

export const ServiceDetailsDrawer: React.FC<ServiceDetailsDrawerProps> = ({
  service,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onManageStaff,
}) => {
  if (!isOpen || !service) return null;

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
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          {/* Header Image & Close Button */}
          <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden shrink-0">
            {service.image ? (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-600/20 text-slate-400">
                <Sparkles className="w-12 h-12 text-brand-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category and Status Floating Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-800 backdrop-blur-md shadow-xs">
                {service.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                  service.status === 'Active'
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-slate-500/90 text-white'
                }`}
              >
                {service.status}
              </span>
            </div>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
                {service.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-white/90">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-pink-300" />
                  {service.durationMinutes} minutes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-pink-200">
                  ₹{service.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Drawer Body Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Service Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {service.description || 'No detailed description provided for this service.'}
              </p>
            </div>

            {/* Pricing & Duration KPI Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                <span className="text-xs font-semibold text-slate-500">Service Price</span>
                <div className="text-xl font-black text-slate-900 mt-1">
                  ₹{service.price.toLocaleString('en-IN')}
                </div>
                {service.discountPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    Standard: ₹{service.discountPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                <span className="text-xs font-semibold text-slate-500">Treatment Time</span>
                <div className="text-xl font-black text-slate-900 mt-1">
                  {service.durationMinutes} min
                </div>
                <span className="text-[11px] text-purple-600 font-semibold">
                  +10m turnover buffer
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Lifetime Booking Performance
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Completed Bookings</span>
                  <div className="text-lg font-black text-slate-900 mt-1 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    {service.totalBookings}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Total Revenue</span>
                  <div className="text-lg font-black text-emerald-600 mt-1">
                    ₹{(service.totalRevenue || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Stylists Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Assigned Stylists ({service.assignedStaff?.length || 0})
                </h3>
                <button
                  type="button"
                  onClick={() => onManageStaff(service)}
                  className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5" />
                  Manage Staff
                </button>
              </div>

              {service.assignedStaff && service.assignedStaff.length > 0 ? (
                <div className="space-y-2.5">
                  {service.assignedStaff.map((staff) => (
                    <div
                      key={staff.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {staff.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">{staff.role}</span>
                        </div>
                      </div>

                      <div>{getAvailabilityBadge(staff.availability)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center">
                  <p className="text-xs text-amber-800 font-medium">
                    No staff members currently assigned to this service.
                  </p>
                  <button
                    type="button"
                    onClick={() => onManageStaff(service)}
                    className="mt-2 text-xs font-bold text-brand-600 hover:underline"
                  >
                    Assign Stylists Now
                  </button>
                </div>
              )}
            </div>

            {/* Audit info */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Created: {service.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Online Booking Ready
              </span>
            </div>
          </div>

          {/* Sticky Drawer Footer with Actions */}
          <div className="p-4 sm:p-5 border-t border-slate-200/80 bg-white flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleStatus(service)}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                service.status === 'Active'
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{service.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
            </button>

            <button
              type="button"
              onClick={() => onEdit(service)}
              className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Service</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
