'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { TodayAppointments } from '@/components/dashboard/TodayAppointments';
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments';
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart';
import { BookingChart } from '@/components/dashboard/charts/BookingChart';
import { CustomerGrowthChart } from '@/components/dashboard/charts/CustomerGrowthChart';
import { PopularServices } from '@/components/dashboard/PopularServices';
import { StaffPerformance } from '@/components/dashboard/StaffPerformance';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { SalonInsights } from '@/components/dashboard/SalonInsights';
import { NewAppointmentModal } from '@/components/dashboard/modals/NewAppointmentModal';
import { DASHBOARD_KPIS } from '@/data/dashboard';
import { TODAY_APPOINTMENTS } from '@/data/appointments';
import { DashboardAppointment } from '@/types/dashboard';

export default function SalonOwnerDashboard() {
  const [appointments, setAppointments] = useState<DashboardAppointment[]>(TODAY_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAppointment = (newApt: DashboardAppointment) => {
    setAppointments([newApt, ...appointments]);
  };

  return (
    <DashboardLayout title="Salon Overview" breadcrumb="Dashboard">
      {/* 1. Welcome & Quick Action Header */}
      <WelcomeSection onOpenNewAppointment={() => setIsModalOpen(true)} />

      {/* 2. Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DASHBOARD_KPIS.map((kpi, index) => (
          <KpiCard key={kpi.id} kpi={kpi} index={index} />
        ))}
      </div>

      {/* 3. Today's Appointments - Central Operational Command Center (Full Width) */}
      <TodayAppointments
        appointments={appointments}
        onOpenNewAppointment={() => setIsModalOpen(true)}
      />

      {/* 4. Financial & Booking Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>
        <div className="lg:col-span-4">
          <BookingChart />
        </div>
      </div>

      {/* 5. Customer Growth & Popular Services Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <CustomerGrowthChart />
        </div>
        <div className="lg:col-span-5">
          <PopularServices />
        </div>
      </div>

      {/* 6. Staff Roster & Upcoming Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7">
          <StaffPerformance />
        </div>
        <div className="lg:col-span-5">
          <UpcomingAppointments />
        </div>
      </div>

      {/* 7. Live Activity Feed & Smart Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-7">
          <SalonInsights />
        </div>
      </div>

      {/* New Appointment Modal */}
      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAppointment={handleAddAppointment}
      />
    </DashboardLayout>
  );
}
