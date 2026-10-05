'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  MoreVertical,
  Clock,
  Eye,
  Edit2,
  Users,
  Power,
  Trash2,
  Sparkles,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { SalonServiceItem, ServiceStatus } from '@/types/service';

interface ServiceTableProps {
  services: SalonServiceItem[];
  onViewDetails: (service: SalonServiceItem) => void;
  onEditService: (service: SalonServiceItem) => void;
  onManageStaff: (service: SalonServiceItem) => void;
  onToggleStatus: (service: SalonServiceItem) => void;
  onDeleteService?: (service: SalonServiceItem) => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onViewDetails,
  onEditService,
  onManageStaff,
  onToggleStatus,
  onDeleteService,
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

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Hair':
        return { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200/80', dot: '#EC4899' };
      case 'Hair Color':
        return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200/80', dot: '#8B5CF6' };
      case 'Skin & Facial':
        return { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200/80', dot: '#06B6D4' };
      case 'Nails':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/80', dot: '#10B981' };
      case 'Spa':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/80', dot: '#F59E0B' };
      case 'Makeup':
        return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200/80', dot: '#F43F5E' };
      case 'Grooming':
        return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200/80', dot: '#6366F1' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200/80', dot: '#64748B' };
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="px-5 py-4 min-w-[280px]">Service</th>
              <th className="px-5 py-4 min-w-[140px]">Category</th>
              <th className="px-5 py-4 min-w-[130px]">Price</th>
              <th className="px-5 py-4 min-w-[120px]">Duration</th>
              <th className="px-5 py-4 min-w-[180px]">Assigned Staff</th>
              <th className="px-5 py-4 min-w-[130px]">Bookings</th>
              <th className="px-5 py-4 min-w-[110px]">Status</th>
              <th className="px-5 py-4 w-24 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {services.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-14 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-slate-300" />
                    <span>No services found matching your criteria.</span>
                  </div>
                </td>
              </tr>
            ) : (
              services.map((service) => {
                const catStyle = getCategoryColor(service.category);
                const isMenuOpen = activeMenuId === service.id;

                return (
                  <tr
                    key={service.id}
                    className="hover:bg-pink-50/20 transition-colors group cursor-pointer"
                    onClick={() => onViewDetails(service)}
                  >
                    {/* Service Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-xs">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-600 font-bold text-sm">
                              {service.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm truncate max-w-[200px] group-hover:text-brand-600 transition-colors">
                              {service.name}
                            </span>
                            {service.isPopular && (
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-pink-100 text-[#E6397A] border border-pink-200">
                                HOT
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs truncate max-w-[220px] mt-0.5">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text} border ${catStyle.border} whitespace-nowrap`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: catStyle.dot }}
                        />
                        {service.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-slate-900 text-sm">
                            ₹{service.price.toLocaleString('en-IN')}
                          </span>
                          {service.discountPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{service.discountPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-normal">
                          taxes included
                        </span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 text-slate-700 text-xs font-semibold border border-slate-200/60">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{service.durationMinutes} min</span>
                      </div>
                    </td>

                    {/* Assigned Staff */}
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {service.assignedStaff && service.assignedStaff.length > 0 ? (
                          <div className="flex items-center -space-x-2">
                            {service.assignedStaff.slice(0, 3).map((staff, sIdx) => (
                              <div
                                key={staff.id || sIdx}
                                className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-xs"
                                title={`${staff.name} (${staff.role})`}
                              >
                                <img
                                  src={staff.avatar}
                                  alt={staff.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {service.assignedStaff.length > 3 && (
                              <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-xs">
                                +{service.assignedStaff.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Unassigned</span>
                        )}

                        <button
                          type="button"
                          onClick={() => onManageStaff(service)}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-semibold text-brand-600 hover:bg-brand-50 hover:underline transition-colors"
                          title="Assign or modify stylists"
                        >
                          {service.assignedStaff?.length || 0} staff
                        </button>
                      </div>
                    </td>

                    {/* Bookings */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-xs flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          {service.totalBookings} bookings
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ₹{(service.totalRevenue || 0).toLocaleString('en-IN')} rev
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onToggleStatus(service)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 ${
                          service.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200/80 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Active / Inactive"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            service.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {service.status}
                      </button>
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="px-5 py-4 text-right whitespace-nowrap relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMenuId(isMenuOpen ? null : service.id)}
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
                              onViewDetails(service);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span>View Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditService(service);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-slate-400" />
                            <span>Edit Service</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onManageStaff(service);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                          >
                            <Users className="w-4 h-4 text-slate-400" />
                            <span>Assign Staff</span>
                          </button>

                          <div className="my-1 border-t border-slate-100" />

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onToggleStatus(service);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold transition-colors ${
                              service.status === 'Active'
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                          >
                            <Power className="w-4 h-4" />
                            <span>
                              {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </span>
                          </button>

                          {onDeleteService && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null);
                                onDeleteService(service);
                              }}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete Service</span>
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
