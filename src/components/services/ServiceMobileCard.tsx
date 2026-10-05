'use client';

import React, { useState } from 'react';
import {
  Clock,
  MoreVertical,
  Eye,
  Edit2,
  Users,
  Power,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { SalonServiceItem } from '@/types/service';

interface ServiceMobileCardProps {
  services: SalonServiceItem[];
  onViewDetails: (service: SalonServiceItem) => void;
  onEditService: (service: SalonServiceItem) => void;
  onManageStaff: (service: SalonServiceItem) => void;
  onToggleStatus: (service: SalonServiceItem) => void;
  onDeleteService?: (service: SalonServiceItem) => void;
}

export const ServiceMobileCard: React.FC<ServiceMobileCardProps> = ({
  services,
  onViewDetails,
  onEditService,
  onManageStaff,
  onToggleStatus,
  onDeleteService,
}) => {
  const [openCardMenuId, setOpenCardMenuId] = useState<string | null>(null);

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Hair':
        return 'bg-pink-50 text-pink-700 border-pink-200/80';
      case 'Hair Color':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Skin & Facial':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200/80';
      case 'Nails':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Spa':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Makeup':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'Grooming':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  if (services.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center text-slate-400 text-sm">
        No services found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {services.map((service) => {
        const isMenuOpen = openCardMenuId === service.id;
        const categoryStyle = getCategoryColor(service.category);

        return (
          <div
            key={service.id}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative transition-all active:bg-slate-50/50"
            onClick={() => onViewDetails(service)}
          >
            {/* Top row: Image + Info + Action dots */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-600 font-bold">
                      {service.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${categoryStyle}`}
                    >
                      {service.category}
                    </span>
                    {service.isPopular && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-pink-100 text-[#E6397A] border border-pink-200">
                        HOT
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action 3-dots */}
              <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setOpenCardMenuId(isMenuOpen ? null : service.id)}
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
                        onViewDetails(service);
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
                        onEditService(service);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Service</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenCardMenuId(null);
                        onManageStaff(service);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assign Staff</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenCardMenuId(null);
                        onToggleStatus(service);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{service.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Middle metrics row: Price & Duration */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-slate-900 text-base">
                  ₹{service.price.toLocaleString('en-IN')}
                </span>
                {service.discountPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{service.discountPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100/80 text-slate-700 font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{service.durationMinutes} min</span>
              </div>
            </div>

            {/* Bottom row: Assigned staff avatars + Status badge */}
            <div
              className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Staff avatars */}
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1.5">
                  {(service.assignedStaff || []).slice(0, 3).map((st, i) => (
                    <img
                      key={st.id || i}
                      src={st.avatar}
                      alt={st.name}
                      className="w-6 h-6 rounded-full border border-white object-cover shadow-xs"
                      title={st.name}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onManageStaff(service)}
                  className="text-[11px] font-semibold text-brand-600 hover:underline"
                >
                  {service.assignedStaff?.length || 0} stylists
                </button>
              </div>

              {/* Status pill button */}
              <button
                type="button"
                onClick={() => onToggleStatus(service)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  service.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                    : 'bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    service.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
                {service.status}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
