'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Users,
  Search,
  CheckCircle2,
  ShieldAlert,
  Power,
  KeyRound,
} from 'lucide-react';
import { INITIAL_ADMIN_USERS } from '@/data/mockSalons';
import { AdminUserRecord } from '@/types/admin';

export default function AdminUsersPage() {
  return (
    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'SALON_OWNER']}>
      <AdminUsersContent />
    </ProtectedRoute>
  );
}

function AdminUsersContent() {
  const [users, setUsers] = useState<AdminUserRecord[]>(INITIAL_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredUsers = users.filter((u) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q) && !u.salonName.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedRole !== 'All' && u.role !== selectedRole) {
      return false;
    }
    return true;
  });

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    );
  };

  return (
    <DashboardLayout title="Global User Management" breadcrumb="Users">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Cross-Platform User Accounts
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Identity Management
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Governance over owners, managers, front-desk staff, stylists, and authenticated client accounts.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by user name, email, or salon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-[#E6397A]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3.5 text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All User Roles</option>
            <option value="SALON_OWNER">Salon Owners</option>
            <option value="MANAGER">Floor Managers</option>
            <option value="RECEPTIONIST">Receptionists</option>
            <option value="STAFF">Stylists & Staff</option>
            <option value="CUSTOMER">Client Accounts</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-5 py-4">User Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role Designation</th>
                <th className="px-5 py-4">Associated Salon</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Last Active</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-pink-50/20">
                  <td className="px-5 py-4 font-bold text-slate-900 text-sm">{u.name}</td>
                  <td className="px-5 py-4 text-slate-500 font-mono text-xs">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-50 text-brand-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{u.salonName}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        u.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{u.lastActive}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(u.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        u.status === 'Active'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
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
