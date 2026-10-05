'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Building2,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Plus,
  ArrowRight,
  ShieldCheck,
  Power,
} from 'lucide-react';
import { INITIAL_SALONS } from '@/data/mockSalons';
import { SalonOrganization, SalonOrgStatus } from '@/types/admin';

export default function AdminSalonsPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminSalonsContent />
    </ProtectedRoute>
  );
}

function AdminSalonsContent() {
  const [salons, setSalons] = useState<SalonOrganization[]>(INITIAL_SALONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredSalons = salons.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.ownerName.toLowerCase().includes(q) && !s.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedStatus !== 'All' && s.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  const handleUpdateStatus = (id: string, status: SalonOrgStatus) => {
    setSalons((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <DashboardLayout title="Salons Directory" breadcrumb="Salons">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Salon Organizations & Onboarding
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              Multi-Tenant Network
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Approve onboarding applications, monitor tenant subscriptions, manage staff allocations, and enforce platform security.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search salon name, owner, or city location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-[#E6397A]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3.5 text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Tenants</option>
            <option value="Pending">Pending Review</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Salons Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-5 py-4">Salon Name</th>
                <th className="px-5 py-4">Owner & Contact</th>
                <th className="px-5 py-4">Studio Location</th>
                <th className="px-5 py-4">Staff / Clients</th>
                <th className="px-5 py-4">Subscription</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSalons.map((salon) => (
                <tr key={salon.id} className="hover:bg-pink-50/20">
                  <td className="px-5 py-4 font-bold text-slate-900 text-sm">
                    {salon.name}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{salon.ownerName}</div>
                    <span className="text-[11px] text-slate-400">{salon.ownerEmail}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{salon.location}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-800">{salon.staffCount} staff</span> •{' '}
                    <span className="text-slate-400">{salon.customerCount} clients</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                      {salon.subscriptionTier}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        salon.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : salon.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {salon.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    {salon.status === 'Pending' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(salon.id, 'Active')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mr-2"
                      >
                        Approve Salon
                      </button>
                    )}

                    {salon.status === 'Active' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(salon.id, 'Suspended')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 mr-2"
                      >
                        Suspend
                      </button>
                    )}

                    {salon.status === 'Suspended' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(salon.id, 'Active')}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mr-2"
                      >
                        Re-Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
