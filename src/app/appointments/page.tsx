'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  AppointmentHeader,
  AppointmentStats,
  AppointmentToolbar,
  AppointmentTable,
  AppointmentMobileCard,
  AppointmentDetailsDrawer,
  AppointmentFormModal,
  RescheduleModal,
} from '@/components/appointments';
import { ConfirmDialog } from '@/components/services/ConfirmDialog';
import { INITIAL_APPOINTMENTS } from '@/data/mockAppointments';
import { INITIAL_CUSTOMERS } from '@/data/mockCustomers';
import { INITIAL_SERVICES } from '@/data/servicesData';
import { AVAILABLE_STAFF_ROSTER } from '@/data/servicesData';
import { SalonAppointment, AppointmentStatus, AppointmentStatsData } from '@/types/appointment';

export default function AppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST', 'STAFF']}>
      <AppointmentsContent />
    </ProtectedRoute>
  );
}

function AppointmentsContent() {
  const [appointmentsList, setAppointmentsList] = useState<SalonAppointment[]>(INITIAL_APPOINTMENTS);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [services] = useState(INITIAL_SERVICES);
  const [staff] = useState(AVAILABLE_STAFF_ROSTER);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modals & Drawers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<SalonAppointment | null>(null);

  const [detailsAppointment, setDetailsAppointment] = useState<SalonAppointment | null>(null);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<SalonAppointment | null>(null);

  const [confirmCancelAppointment, setConfirmCancelAppointment] = useState<SalonAppointment | null>(null);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointmentsList.filter((apt) => {
      // 1. Search (Customer name, phone, service, stylist)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCustomer = apt.customerName.toLowerCase().includes(q);
        const matchesPhone = apt.customerPhone.includes(q);
        const matchesService = apt.serviceName.toLowerCase().includes(q);
        const matchesStaff = apt.staffName.toLowerCase().includes(q);
        if (!matchesCustomer && !matchesPhone && !matchesService && !matchesStaff) {
          return false;
        }
      }

      // 2. Date Filter
      if (selectedDateFilter === 'today' && apt.date !== '2026-09-24') return false;
      if (selectedDateFilter === 'tomorrow' && apt.date !== '2026-09-25') return false;
      if (selectedDateFilter === 'past' && apt.date >= '2026-09-24') return false;

      // 3. Status Filter
      if (selectedStatus !== 'All' && apt.status !== selectedStatus) {
        return false;
      }

      // 4. Staff Filter
      if (selectedStaff !== 'All' && apt.staffName !== selectedStaff) {
        return false;
      }

      return true;
    });
  }, [appointmentsList, searchQuery, selectedDateFilter, selectedStatus, selectedStaff]);

  // Live KPI statistics
  const stats: AppointmentStatsData = useMemo(() => {
    const todayApts = appointmentsList.filter((a) => a.date === '2026-09-24');
    const confirmedCount = todayApts.filter(
      (a) => a.status === 'Confirmed' || a.status === 'Checked-in'
    ).length;
    const inProgressCount = todayApts.filter((a) => a.status === 'In Progress').length;
    const completedCount = todayApts.filter((a) => a.status === 'Completed').length;
    const revToday = todayApts.reduce((acc, curr) => acc + curr.price, 0);

    return {
      totalToday: todayApts.length,
      confirmed: confirmedCount,
      inProgress: inProgressCount,
      completed: completedCount,
      revenueToday: revToday,
    };
  }, [appointmentsList]);

  // Handlers
  const handleOpenNewAppointment = () => {
    setAppointmentToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditAppointment = (apt: SalonAppointment) => {
    setAppointmentToEdit(apt);
    setIsFormOpen(true);
    if (detailsAppointment?.id === apt.id) {
      setDetailsAppointment(null);
    }
  };

  const handleSaveAppointment = (data: Partial<SalonAppointment>) => {
    if (appointmentToEdit) {
      setAppointmentsList((prev) =>
        prev.map((a) => (a.id === appointmentToEdit.id ? ({ ...a, ...data } as SalonAppointment) : a))
      );
    } else {
      const newApt: SalonAppointment = {
        id: `apt-${Date.now()}`,
        reference: `SP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        customerId: data.customerId || 'cust-1',
        customerName: data.customerName || 'Walk-in Guest',
        customerPhone: data.customerPhone || '+1 (555) 000-0000',
        customerEmail: data.customerEmail || 'guest@salonpro.io',
        customerAvatar:
          data.customerAvatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        serviceId: data.serviceId || 'srv-1',
        serviceName: data.serviceName || 'Precision Haircut',
        serviceCategory: data.serviceCategory || 'Hair',
        price: data.price || 500,
        durationMinutes: data.durationMinutes || 45,
        staffId: data.staffId || 'staff-1',
        staffName: data.staffName || 'Emily Johnson',
        staffAvatar:
          data.staffAvatar ||
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        staffRole: data.staffRole || 'Senior Stylist',
        date: data.date || '2026-09-24',
        time: data.time || '10:00 AM',
        endTime: data.endTime || '10:45 AM',
        status: data.status || 'Confirmed',
        paymentStatus: 'Pending',
        notes: data.notes || '',
        createdDate: new Date().toISOString().slice(0, 10),
      };
      setAppointmentsList((prev) => [newApt, ...prev]);
    }

    setIsFormOpen(false);
    setAppointmentToEdit(null);
  };

  const handleStatusChange = (apt: SalonAppointment, newStatus: AppointmentStatus) => {
    setAppointmentsList((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: newStatus } : a))
    );
    if (detailsAppointment?.id === apt.id) {
      setDetailsAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleConfirmReschedule = (aptId: string, newDate: string, newTime: string) => {
    setAppointmentsList((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' }
          : a
      )
    );
    if (detailsAppointment?.id === aptId) {
      setDetailsAppointment((prev) =>
        prev ? { ...prev, date: newDate, time: newTime, status: 'Rescheduled' } : null
      );
    }
  };

  const handleConfirmCancelAppointment = () => {
    if (!confirmCancelAppointment) return;
    handleStatusChange(confirmCancelAppointment, 'Cancelled');
    setConfirmCancelAppointment(null);
  };

  const handleExportCSV = () => {
    const headers = [
      'Reference',
      'Client Name',
      'Client Phone',
      'Service',
      'Stylist',
      'Date',
      'Time',
      'Duration (min)',
      'Price (INR)',
      'Payment Status',
      'Status',
    ];

    const rows = filteredAppointments.map((a) => [
      a.reference,
      `"${a.customerName}"`,
      `"${a.customerPhone}"`,
      `"${a.serviceName}"`,
      `"${a.staffName}"`,
      a.date,
      a.time,
      a.durationMinutes,
      a.price,
      a.paymentStatus,
      a.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SalonPro_Appointments_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDateFilter('all');
    setSelectedStatus('All');
    setSelectedStaff('All');
  };

  return (
    <DashboardLayout title="Appointments" breadcrumb="Schedule">
      {/* 1. Header with CTAs and View Toggle */}
      <AppointmentHeader
        totalCount={appointmentsList.length}
        onNewAppointment={handleOpenNewAppointment}
        onExport={handleExportCSV}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 2. Top Summary KPI Cards */}
      <AppointmentStats stats={stats} />

      {/* 3. Search and Multi-filter Toolbar */}
      <AppointmentToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDateFilter={selectedDateFilter}
        onDateFilterChange={setSelectedDateFilter}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedStaff={selectedStaff}
        staffList={staff}
        onStaffChange={setSelectedStaff}
        onClearFilters={handleClearFilters}
        totalFiltered={filteredAppointments.length}
        totalCount={appointmentsList.length}
      />

      {/* 4. Desktop View */}
      <div className="hidden md:block mb-8">
        {viewMode === 'table' ? (
          <AppointmentTable
            appointments={filteredAppointments}
            onViewDetails={(apt) => setDetailsAppointment(apt)}
            onEditAppointment={handleOpenEditAppointment}
            onReschedule={(apt) => setRescheduleAppointment(apt)}
            onStatusChange={handleStatusChange}
            onCancelClick={(apt) => setConfirmCancelAppointment(apt)}
          />
        ) : (
          <AppointmentMobileCard
            appointments={filteredAppointments}
            onViewDetails={(apt) => setDetailsAppointment(apt)}
            onEditAppointment={handleOpenEditAppointment}
            onReschedule={(apt) => setRescheduleAppointment(apt)}
            onStatusChange={handleStatusChange}
            onCancelClick={(apt) => setConfirmCancelAppointment(apt)}
          />
        )}
      </div>

      {/* 5. Mobile Cards View */}
      <div className="block md:hidden mb-8">
        <AppointmentMobileCard
          appointments={filteredAppointments}
          onViewDetails={(apt) => setDetailsAppointment(apt)}
          onEditAppointment={handleOpenEditAppointment}
          onReschedule={(apt) => setRescheduleAppointment(apt)}
          onStatusChange={handleStatusChange}
          onCancelClick={(apt) => setConfirmCancelAppointment(apt)}
        />
      </div>

      {/* 6. Slide-in Details Drawer */}
      <AppointmentDetailsDrawer
        appointment={detailsAppointment}
        isOpen={Boolean(detailsAppointment)}
        onClose={() => setDetailsAppointment(null)}
        onEdit={handleOpenEditAppointment}
        onReschedule={(apt) => setRescheduleAppointment(apt)}
        onStatusChange={handleStatusChange}
        onCancelClick={(apt) => setConfirmCancelAppointment(apt)}
      />

      {/* 7. New & Edit Appointment Modal */}
      <AppointmentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setAppointmentToEdit(null);
        }}
        onSave={handleSaveAppointment}
        appointmentToEdit={appointmentToEdit}
        customers={customers}
        services={services}
        staff={staff}
      />

      {/* 8. Reschedule Modal */}
      <RescheduleModal
        isOpen={Boolean(rescheduleAppointment)}
        onClose={() => setRescheduleAppointment(null)}
        appointment={rescheduleAppointment}
        onConfirmReschedule={handleConfirmReschedule}
      />

      {/* 9. Cancellation Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(confirmCancelAppointment)}
        title={`Cancel booking for ${confirmCancelAppointment?.customerName}?`}
        message="This appointment will be marked as Cancelled and the time slot will be reopened for other clients."
        confirmText="Confirm Cancellation"
        cancelText="Keep Booking"
        variant="danger"
        onConfirm={handleConfirmCancelAppointment}
        onCancel={() => setConfirmCancelAppointment(null)}
      />
    </DashboardLayout>
  );
}
