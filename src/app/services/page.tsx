'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  ServicesHeader,
  ServiceStats,
  CategoryFilterBar,
  ServiceToolbar,
  ServiceTable,
  ServiceMobileCard,
  ServiceDetailsDrawer,
  ServiceFormModal,
  StaffAssignmentModal,
  CategoryManagementModal,
  ServiceAnalyticsSection,
  ConfirmDialog,
  DurationFilterOption,
  SortOption,
} from '@/components/services';
import {
  INITIAL_SERVICES,
  INITIAL_CATEGORIES,
  AVAILABLE_STAFF_ROSTER,
} from '@/data/services';
import {
  SalonServiceItem,
  ServiceCategory,
  ServiceAssignedStaff,
} from '@/types/service';

export default function ServicesPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'STAFF', 'RECEPTIONIST']}>
      <ServicesManagementContent />
    </ProtectedRoute>
  );
}

function ServicesManagementContent() {
  // Master state
  const [servicesList, setServicesList] = useState<SalonServiceItem[]>(INITIAL_SERVICES);
  const [categoriesList, setCategoriesList] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [staffRoster] = useState<ServiceAssignedStaff[]>(AVAILABLE_STAFF_ROSTER);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilterOption>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('bookings-desc');

  // Modals & Drawers state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<SalonServiceItem | null>(null);

  const [detailsDrawerService, setDetailsDrawerService] = useState<SalonServiceItem | null>(null);

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [serviceForStaff, setServiceForStaff] = useState<SalonServiceItem | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    service: SalonServiceItem | null;
    action: 'deactivate' | 'delete';
  }>({
    isOpen: false,
    service: null,
    action: 'deactivate',
  });

  // Calculate dynamic service counts per category
  const serviceCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {
      all: servicesList.length,
      'All Categories': servicesList.length,
    };

    servicesList.forEach((s) => {
      // By category name
      counts[s.category] = (counts[s.category] || 0) + 1;
      // By category id or slug
      if (s.categoryId) {
        counts[s.categoryId] = (counts[s.categoryId] || 0) + 1;
      }
    });

    return counts;
  }, [servicesList]);

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    return servicesList
      .filter((service) => {
        // 1. Search Query (Name, Category, or Assigned Staff)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = service.name.toLowerCase().includes(q);
          const matchesCategory = service.category.toLowerCase().includes(q);
          const matchesStaff = (service.assignedStaff || []).some((st) =>
            st.name.toLowerCase().includes(q)
          );
          if (!matchesName && !matchesCategory && !matchesStaff) {
            return false;
          }
        }

        // 2. Category Filter
        if (selectedCategory !== 'all' && selectedCategory !== 'All Categories') {
          const catMatches =
            service.category.toLowerCase() === selectedCategory.toLowerCase() ||
            service.categoryId?.toLowerCase() === selectedCategory.toLowerCase() ||
            service.categoryId === `cat-${selectedCategory.toLowerCase()}`;
          if (!catMatches) return false;
        }

        // 3. Status Filter
        if (selectedStatus !== 'All') {
          if (service.status !== selectedStatus) return false;
        }

        // 4. Duration Filter
        if (selectedDuration !== 'all') {
          const dur = service.durationMinutes;
          if (selectedDuration === 'under-30' && dur >= 30) return false;
          if (selectedDuration === '30-60' && (dur < 30 || dur > 60)) return false;
          if (selectedDuration === '60-120' && (dur < 60 || dur > 120)) return false;
          if (selectedDuration === '120-plus' && dur < 120) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'duration-asc':
            return a.durationMinutes - b.durationMinutes;
          case 'duration-desc':
            return b.durationMinutes - a.durationMinutes;
          case 'bookings-asc':
            return a.totalBookings - b.totalBookings;
          case 'bookings-desc':
          default:
            return b.totalBookings - a.totalBookings;
        }
      });
  }, [servicesList, searchQuery, selectedCategory, selectedStatus, selectedDuration, selectedSort]);

  // Live KPI Summary
  const stats = useMemo(() => {
    const total = servicesList.length;
    const active = servicesList.filter((s) => s.status === 'Active').length;
    const categoriesCount = categoriesList.filter((c) => c.slug !== 'all').length;

    // Find most booked service
    let mostBooked = servicesList[0];
    servicesList.forEach((s) => {
      if (!mostBooked || s.totalBookings > mostBooked.totalBookings) {
        mostBooked = s;
      }
    });

    return {
      totalServices: total,
      activeServices: active,
      totalCategories: categoriesCount,
      mostBookedName: mostBooked?.name || 'Hair Color & Balayage',
      mostBookedCount: mostBooked?.totalBookings || 184,
    };
  }, [servicesList, categoriesList]);

  // Handlers for Add/Edit Service
  const handleOpenAddService = () => {
    setServiceToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditService = (service: SalonServiceItem) => {
    setServiceToEdit(service);
    setIsFormModalOpen(true);
    // If details drawer is open, keep it or close it
    if (detailsDrawerService?.id === service.id) {
      setDetailsDrawerService(null);
    }
  };

  const handleSaveService = (serviceData: Partial<SalonServiceItem>) => {
    if (serviceToEdit) {
      // Update existing
      setServicesList((prev) =>
        prev.map((s) => (s.id === serviceToEdit.id ? ({ ...s, ...serviceData } as SalonServiceItem) : s))
      );
    } else {
      // Create new
      const newService: SalonServiceItem = {
        id: `srv-${Date.now()}`,
        name: serviceData.name || 'New Treatment',
        category: serviceData.category || 'Hair',
        categoryId: serviceData.categoryId || 'cat-hair',
        description: serviceData.description || '',
        price: serviceData.price || 500,
        discountPrice: serviceData.discountPrice,
        taxRatePercent: serviceData.taxRatePercent || 18,
        durationMinutes: serviceData.durationMinutes || 45,
        durationLabel: `${serviceData.durationMinutes || 45} min`,
        image:
          serviceData.image ||
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
        assignedStaff: serviceData.assignedStaff || [],
        totalBookings: 0,
        totalRevenue: 0,
        status: serviceData.status || 'Active',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      };
      setServicesList((prev) => [newService, ...prev]);
    }
    setIsFormModalOpen(false);
    setServiceToEdit(null);
  };

  // Handlers for Staff Assignment Modal
  const handleOpenManageStaff = (service: SalonServiceItem) => {
    setServiceForStaff(service);
    setIsStaffModalOpen(true);
  };

  const handleSaveStaffAssignments = (serviceId: string, assignedStaff: ServiceAssignedStaff[]) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, assignedStaff } : s))
    );
    // Also update detail drawer if open
    if (detailsDrawerService?.id === serviceId) {
      setDetailsDrawerService((prev) => (prev ? { ...prev, assignedStaff } : null));
    }
  };

  // Handlers for Status Toggle & Confirmation
  const handleToggleStatusClick = (service: SalonServiceItem) => {
    if (service.status === 'Active') {
      // Deactivating requires confirmation
      setConfirmDialog({
        isOpen: true,
        service,
        action: 'deactivate',
      });
    } else {
      // Activating immediately
      setServicesList((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, status: 'Active' } : s))
      );
      if (detailsDrawerService?.id === service.id) {
        setDetailsDrawerService((prev) => (prev ? { ...prev, status: 'Active' } : null));
      }
    }
  };

  const handleDeleteServiceClick = (service: SalonServiceItem) => {
    setConfirmDialog({
      isOpen: true,
      service,
      action: 'delete',
    });
  };

  const handleConfirmDialogAction = () => {
    if (!confirmDialog.service) return;

    if (confirmDialog.action === 'deactivate') {
      setServicesList((prev) =>
        prev.map((s) => (s.id === confirmDialog.service!.id ? { ...s, status: 'Inactive' } : s))
      );
      if (detailsDrawerService?.id === confirmDialog.service.id) {
        setDetailsDrawerService((prev) => (prev ? { ...prev, status: 'Inactive' } : null));
      }
    } else if (confirmDialog.action === 'delete') {
      setServicesList((prev) => prev.filter((s) => s.id !== confirmDialog.service!.id));
      if (detailsDrawerService?.id === confirmDialog.service.id) {
        setDetailsDrawerService(null);
      }
    }

    setConfirmDialog({ isOpen: false, service: null, action: 'deactivate' });
  };

  // Handlers for Categories Management
  const handleAddCategory = (newCat: Omit<ServiceCategory, 'id' | 'serviceCount'>) => {
    const created: ServiceCategory = {
      ...newCat,
      id: `cat-${Date.now()}`,
      serviceCount: 0,
    };
    setCategoriesList((prev) => [...prev, created]);
  };

  const handleUpdateCategory = (id: string, updates: Partial<ServiceCategory>) => {
    setCategoriesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleDeleteCategory = (id: string) => {
    setCategoriesList((prev) => prev.filter((c) => c.id !== id));
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Service ID',
      'Service Name',
      'Category',
      'Price (INR)',
      'Duration (min)',
      'Assigned Staff Count',
      'Assigned Staff Names',
      'Total Bookings',
      'Total Revenue (INR)',
      'Status',
      'Created Date',
    ];

    const rows = filteredServices.map((s) => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.category}"`,
      s.price,
      s.durationMinutes,
      s.assignedStaff?.length || 0,
      `"${(s.assignedStaff || []).map((st) => st.name).join('; ')}"`,
      s.totalBookings,
      s.totalRevenue || 0,
      s.status,
      `"${s.createdAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SalonPro_Services_Catalog_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('All');
    setSelectedDuration('all');
    setSelectedSort('bookings-desc');
  };

  return (
    <DashboardLayout title="Services" breadcrumb="Services">
      {/* 1. Page Header with Title, Description, and Action CTAs */}
      <ServicesHeader
        totalCount={servicesList.length}
        activeCount={stats.activeServices}
        onAddService={handleOpenAddService}
        onManageCategories={() => setIsCategoryModalOpen(true)}
        onExport={handleExportCSV}
      />

      {/* 2. Top Summary KPI Cards (Total Services, Active Services, Categories, Most Booked) */}
      <ServiceStats
        totalServices={stats.totalServices}
        activeServices={stats.activeServices}
        totalCategories={stats.totalCategories}
        mostBookedName={stats.mostBookedName}
        mostBookedCount={stats.mostBookedCount}
      />

      {/* 3. Category Navigation Pills */}
      <CategoryFilterBar
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onManageCategories={() => setIsCategoryModalOpen(true)}
        serviceCounts={serviceCountsByCategory}
      />

      {/* 4. Search, Duration Filter, Status Filter, Sorting Toolbar */}
      <ServiceToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        categories={categoriesList}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onClearFilters={handleClearFilters}
        totalFiltered={filteredServices.length}
        totalCount={servicesList.length}
      />

      {/* 5. Desktop Service Table (Zero overlap, generous padding px-5 py-4, min-w-[1050px]) */}
      <div className="hidden md:block mb-8">
        <ServiceTable
          services={filteredServices}
          onViewDetails={(service) => setDetailsDrawerService(service)}
          onEditService={handleOpenEditService}
          onManageStaff={handleOpenManageStaff}
          onToggleStatus={handleToggleStatusClick}
          onDeleteService={handleDeleteServiceClick}
        />
      </div>

      {/* 6. Mobile Service Cards View (Touch-friendly, responsive) */}
      <div className="block md:hidden mb-8">
        <ServiceMobileCard
          services={filteredServices}
          onViewDetails={(service) => setDetailsDrawerService(service)}
          onEditService={handleOpenEditService}
          onManageStaff={handleOpenManageStaff}
          onToggleStatus={handleToggleStatusClick}
          onDeleteService={handleDeleteServiceClick}
        />
      </div>

      {/* 7. Popular Services & Service Analytics Performance Section */}
      <ServiceAnalyticsSection />

      {/* 8. Slide-in Service Details Drawer */}
      <ServiceDetailsDrawer
        service={detailsDrawerService}
        isOpen={Boolean(detailsDrawerService)}
        onClose={() => setDetailsDrawerService(null)}
        onEdit={handleOpenEditService}
        onToggleStatus={handleToggleStatusClick}
        onManageStaff={handleOpenManageStaff}
      />

      {/* 9. Reusable Add / Edit Service Form Modal */}
      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setServiceToEdit(null);
        }}
        onSave={handleSaveService}
        serviceToEdit={serviceToEdit}
        categories={categoriesList}
        availableStaff={staffRoster}
      />

      {/* 10. Dedicated Staff Assignment Modal */}
      <StaffAssignmentModal
        isOpen={isStaffModalOpen}
        onClose={() => {
          setIsStaffModalOpen(false);
          setServiceForStaff(null);
        }}
        service={serviceForStaff}
        allStaff={staffRoster}
        onSaveAssignments={handleSaveStaffAssignments}
      />

      {/* 11. Category Management Modal */}
      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categoriesList}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        serviceCountsByCategory={serviceCountsByCategory}
      />

      {/* 12. Deactivation / Deletion Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.action === 'deactivate'
            ? `Deactivate ${confirmDialog.service?.name}?`
            : `Delete ${confirmDialog.service?.name}?`
        }
        message={
          confirmDialog.action === 'deactivate'
            ? 'This service will be marked as Inactive and removed from public booking slots. You can reactivate it at any time.'
            : 'Are you sure you want to permanently delete this service from your catalog? This action cannot be undone.'
        }
        confirmText={
          confirmDialog.action === 'deactivate' ? 'Confirm Deactivation' : 'Confirm Delete'
        }
        cancelText="Cancel"
        variant={confirmDialog.action === 'delete' ? 'danger' : 'warning'}
        onConfirm={handleConfirmDialogAction}
        onCancel={() => setConfirmDialog({ isOpen: false, service: null, action: 'deactivate' })}
      />
    </DashboardLayout>
  );
}
