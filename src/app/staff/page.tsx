'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { RoleDashboardShell } from '@/components/auth/RoleDashboardShell';
import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffStats } from '@/components/staff/StaffStats';
import { StaffToolbar } from '@/components/staff/StaffToolbar';
import { StaffTable } from '@/components/staff/StaffTable';
import { StaffMobileCard } from '@/components/staff/StaffMobileCard';
import { StaffProfileDrawer } from '@/components/staff/StaffProfileDrawer';
import { StaffFormModal } from '@/components/staff/StaffFormModal';
import { StaffLeaveModal } from '@/components/staff/StaffLeaveModal';
import { ConfirmDialog } from '@/components/staff/ConfirmDialog';
import { INITIAL_STAFF_LIST } from '@/data/staffManagement';
import { StaffMember, StaffStatsData, StaffLeaveRecord } from '@/types/staff';

export default function StaffManagementPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER']}>
      <StaffManagementContent />
    </ProtectedRoute>
  );
}

function StaffManagementContent() {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF_LIST);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Modals & Drawer State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState<StaffMember | null>(null);

  const [profileDrawerStaff, setProfileDrawerStaff] = useState<StaffMember | null>(null);

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [staffForLeave, setStaffForLeave] = useState<StaffMember | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    staff: StaffMember | null;
  }>({
    isOpen: false,
    staff: null,
  });

  // Calculate live KPI statistics
  const stats: StaffStatsData = useMemo(() => {
    return {
      totalStaff: staffList.length,
      activeStaff: staffList.filter((s) => s.status === 'Active').length,
      onLeave: staffList.filter((s) => s.status === 'On Leave').length,
      availableToday: staffList.filter((s) => s.availability === 'Available').length,
    };
  }, [staffList]);

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        staff.name.toLowerCase().includes(q) ||
        staff.email.toLowerCase().includes(q) ||
        staff.phone.includes(q) ||
        staff.role.toLowerCase().includes(q);

      const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
      const matchesStatus = selectedStatus === 'All' || staff.status === selectedStatus;
      const matchesAvailability =
        selectedAvailability === 'All' || staff.availability === selectedAvailability;

      return matchesSearch && matchesRole && matchesStatus && matchesAvailability;
    });
  }, [staffList, searchQuery, selectedRole, selectedStatus, selectedAvailability]);

  // Handlers
  const handleOpenAddStaff = () => {
    setStaffToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditStaff = (staff: StaffMember) => {
    setStaffToEdit(staff);
    setIsFormModalOpen(true);
  };

  const handleSaveStaff = (staffData: Partial<StaffMember>) => {
    if (staffToEdit) {
      // Update existing
      setStaffList((prev) =>
        prev.map((s) => (s.id === staffToEdit.id ? ({ ...s, ...staffData } as StaffMember) : s))
      );
      if (profileDrawerStaff && profileDrawerStaff.id === staffToEdit.id) {
        setProfileDrawerStaff((prev) => (prev ? ({ ...prev, ...staffData } as StaffMember) : null));
      }
    } else {
      // Create new
      const newStaff: StaffMember = {
        id: `staff-${Date.now()}`,
        name: staffData.name || 'New Staff Member',
        email: staffData.email || '',
        phone: staffData.phone || '',
        avatar:
          staffData.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80',
        role: staffData.role || 'Stylist',
        bio: staffData.bio || '',
        experienceYears: staffData.experienceYears || 1,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: staffData.status || 'Active',
        availability: staffData.status === 'Active' ? 'Available' : 'Offline',
        assignedServices: staffData.assignedServices || [],
        workingHours: staffData.workingHours || [],
        todayAppointmentsCount: 0,
        rating: 5.0,
        reviewCount: 0,
        leaveRecords: [],
        todaySchedule: [],
        appointmentHistory: [],
      };
      setStaffList([newStaff, ...staffList]);
    }
  };

  const handleToggleStatusClick = (staff: StaffMember) => {
    if (staff.status === 'Active') {
      // Prompt confirmation before deactivating
      setConfirmDialog({
        isOpen: true,
        staff,
      });
    } else {
      // Reactivate immediately
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === staff.id ? { ...s, status: 'Active', availability: 'Available' } : s
        )
      );
    }
  };

  const handleConfirmDeactivate = () => {
    if (confirmDialog.staff) {
      const targetId = confirmDialog.staff.id;
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === targetId ? { ...s, status: 'Inactive', availability: 'Offline' } : s
        )
      );
      if (profileDrawerStaff && profileDrawerStaff.id === targetId) {
        setProfileDrawerStaff((prev) => (prev ? { ...prev, status: 'Inactive', availability: 'Offline' } : null));
      }
    }
    setConfirmDialog({ isOpen: false, staff: null });
  };

  const handleOpenAddLeave = (staff: StaffMember) => {
    setStaffForLeave(staff);
    setIsLeaveModalOpen(true);
  };

  const handleAddLeave = (staffId: string, leaveRecord: StaffLeaveRecord) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          return {
            ...s,
            leaveRecords: [leaveRecord, ...s.leaveRecords],
          };
        }
        return s;
      })
    );
    if (profileDrawerStaff && profileDrawerStaff.id === staffId) {
      setProfileDrawerStaff((prev) =>
        prev
          ? {
              ...prev,
              leaveRecords: [leaveRecord, ...prev.leaveRecords],
            }
          : null
      );
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Email', 'Phone', 'Status', 'Availability', 'Experience', 'Appointments Today'];
    const rows = staffList.map((s) => [
      s.id,
      `"${s.name}"`,
      `"${s.role}"`,
      s.email,
      `"${s.phone}"`,
      s.status,
      s.availability,
      `${s.experienceYears} yrs`,
      s.todayAppointmentsCount,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SalonPro_Staff_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedStatus('All');
    setSelectedAvailability('All');
  };

  return (
    <DashboardLayout title="Staff Management" breadcrumb="Staff">
      {/* 1. Page Header with Title, Team Count, and Primary CTAs */}
      <StaffHeader
        totalCount={staffList.length}
        onAddStaff={handleOpenAddStaff}
        onExport={handleExportCSV}
      />

      {/* 2. Top 4 Summary Metric Cards */}
      <StaffStats stats={stats} />

      {/* 3. Search & Multi-filter Controls Toolbar */}
      <StaffToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedAvailability={selectedAvailability}
        onAvailabilityChange={setSelectedAvailability}
        onClearFilters={handleClearFilters}
        totalFiltered={filteredStaff.length}
        totalCount={staffList.length}
      />

      {/* 4. Desktop Staff Table (Full-width, zero overlap, padded) */}
      <div className="hidden md:block">
        <StaffTable
          staffList={filteredStaff}
          onViewProfile={(staff) => setProfileDrawerStaff(staff)}
          onEditStaff={handleOpenEditStaff}
          onManageServices={handleOpenEditStaff}
          onManageSchedule={(staff) => setProfileDrawerStaff(staff)}
          onManageLeave={handleOpenAddLeave}
          onToggleStatus={handleToggleStatusClick}
        />
      </div>

      {/* 5. Mobile Staff Cards View */}
      <div className="block md:hidden">
        <StaffMobileCard
          staffList={filteredStaff}
          onViewProfile={(staff) => setProfileDrawerStaff(staff)}
          onEditStaff={handleOpenEditStaff}
          onManageServices={handleOpenEditStaff}
          onManageSchedule={(staff) => setProfileDrawerStaff(staff)}
          onManageLeave={handleOpenAddLeave}
          onToggleStatus={handleToggleStatusClick}
        />
      </div>

      {/* 6. Sliding Profile Drawer */}
      <StaffProfileDrawer
        staff={profileDrawerStaff}
        isOpen={!!profileDrawerStaff}
        onClose={() => setProfileDrawerStaff(null)}
        onEdit={handleOpenEditStaff}
        onToggleStatus={handleToggleStatusClick}
        onOpenAddLeave={handleOpenAddLeave}
        onOpenEditServices={handleOpenEditStaff}
      />

      {/* 7. Add / Edit Staff Form Modal */}
      <StaffFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveStaff}
        staffToEdit={staffToEdit}
      />

      {/* 8. Add Leave Request Modal */}
      <StaffLeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        staff={staffForLeave}
        onAddLeave={handleAddLeave}
      />

      {/* 9. Deactivation Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={`Deactivate ${confirmDialog.staff?.name}?`}
        message="This staff member will be marked as inactive and removed from public booking slots. You can reactivate them at any time."
        confirmText="Confirm Deactivation"
        cancelText="Keep Active"
        variant="danger"
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setConfirmDialog({ isOpen: false, staff: null })}
      />
    </DashboardLayout>
  );
}
