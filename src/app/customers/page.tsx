'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  CustomerHeader,
  CustomerStats,
  CustomerToolbar,
  CustomerTable,
  CustomerMobileCard,
  CustomerProfileDrawer,
  CustomerFormModal,
} from '@/components/customers';
import { INITIAL_CUSTOMERS } from '@/data/mockCustomers';
import { Customer } from '@/types/customer';

export default function CustomersPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST']}>
      <CustomersContent />
    </ProtectedRoute>
  );
}

function CustomersContent() {
  const router = useRouter();
  const [customersList, setCustomersList] = useState<Customer[]>(INITIAL_CUSTOMERS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSort, setSelectedSort] = useState('spend-desc');

  // Drawers and Modals
  const [profileDrawerCustomer, setProfileDrawerCustomer] = useState<Customer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);

  // Filtered and Sorted
  const filteredCustomers = useMemo(() => {
    return customersList
      .filter((cust) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = cust.name.toLowerCase().includes(q);
          const matchPhone = cust.phone.includes(q);
          const matchEmail = cust.email.toLowerCase().includes(q);
          if (!matchName && !matchPhone && !matchEmail) return false;
        }

        if (selectedStatus !== 'All' && cust.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case 'spend-desc':
            return b.totalSpend - a.totalSpend;
          case 'visits-desc':
            return b.totalVisits - a.totalVisits;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          default:
            return b.totalSpend - a.totalSpend;
        }
      });
  }, [customersList, searchQuery, selectedStatus, selectedSort]);

  // Live Stats
  const vipCount = customersList.filter((c) => c.status === 'VIP').length;
  const avgSpend = Math.round(
    customersList.reduce((acc, c) => acc + c.totalSpend, 0) / (customersList.length || 1)
  );

  const handleOpenAddCustomer = () => {
    setCustomerToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditCustomer = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsFormOpen(true);
    if (profileDrawerCustomer?.id === customer.id) {
      setProfileDrawerCustomer(null);
    }
  };

  const handleSaveCustomer = (data: Partial<Customer>) => {
    if (customerToEdit) {
      setCustomersList((prev) =>
        prev.map((c) => (c.id === customerToEdit.id ? ({ ...c, ...data } as Customer) : c))
      );
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: data.name || 'New Client',
        phone: data.phone || '+1 (555) 000-0000',
        email: data.email || 'guest@domain.com',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        dateJoined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        birthday: data.birthday,
        totalVisits: 0,
        totalSpend: 0,
        avgBookingValue: 0,
        status: data.status || 'Active',
        notes: data.notes || [],
        preferences: ['Sparkling Water'],
        history: [],
      };
      setCustomersList((prev) => [newCust, ...prev]);
    }
    setIsFormOpen(false);
    setCustomerToEdit(null);
  };

  const handleAddNote = (customer: Customer) => {
    const noteText = prompt('Enter consultation note:');
    if (noteText && noteText.trim()) {
      setCustomersList((prev) =>
        prev.map((c) =>
          c.id === customer.id
            ? { ...c, notes: [noteText.trim(), ...(c.notes || [])] }
            : c
        )
      );
      if (profileDrawerCustomer?.id === customer.id) {
        setProfileDrawerCustomer((prev) =>
          prev ? { ...prev, notes: [noteText.trim(), ...(prev.notes || [])] } : null
        );
      }
    }
  };

  const handleBookAppointment = (customer: Customer) => {
    setProfileDrawerCustomer(null);
    router.push('/appointments');
  };

  const handleExportCSV = () => {
    const headers = [
      'Customer ID',
      'Full Name',
      'Phone',
      'Email',
      'Joined Date',
      'Total Visits',
      'Total Spend (INR)',
      'Tier Status',
      'Last Visit',
    ];

    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      c.dateJoined,
      c.totalVisits,
      c.totalSpend,
      c.status,
      `"${c.lastVisit || 'None'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SalonPro_Customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedSort('spend-desc');
  };

  return (
    <DashboardLayout title="Customer CRM" breadcrumb="Clients">
      {/* 1. Header with Title & CTAs */}
      <CustomerHeader
        totalCount={customersList.length}
        vipCount={vipCount}
        onAddCustomer={handleOpenAddCustomer}
        onExport={handleExportCSV}
      />

      {/* 2. Top Summary KPI Cards */}
      <CustomerStats
        totalCount={customersList.length}
        vipCount={vipCount}
        avgSpend={avgSpend}
      />

      {/* 3. Search and Filter Toolbar */}
      <CustomerToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onClearFilters={handleClearFilters}
        totalFiltered={filteredCustomers.length}
        totalCount={customersList.length}
      />

      {/* 4. Desktop View */}
      <div className="hidden md:block mb-8">
        <CustomerTable
          customers={filteredCustomers}
          onViewProfile={(cust) => setProfileDrawerCustomer(cust)}
          onEditCustomer={handleOpenEditCustomer}
          onBookAppointment={handleBookAppointment}
          onAddNote={handleAddNote}
        />
      </div>

      {/* 5. Mobile Cards View */}
      <div className="block md:hidden mb-8">
        <CustomerMobileCard
          customers={filteredCustomers}
          onViewProfile={(cust) => setProfileDrawerCustomer(cust)}
          onEditCustomer={handleOpenEditCustomer}
          onBookAppointment={handleBookAppointment}
        />
      </div>

      {/* 6. Customer Profile Drawer */}
      <CustomerProfileDrawer
        customer={profileDrawerCustomer}
        isOpen={Boolean(profileDrawerCustomer)}
        onClose={() => setProfileDrawerCustomer(null)}
        onEdit={handleOpenEditCustomer}
        onBookAppointment={handleBookAppointment}
        onAddNote={handleAddNote}
      />

      {/* 7. Add & Edit Customer Modal */}
      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCustomerToEdit(null);
        }}
        onSave={handleSaveCustomer}
        customerToEdit={customerToEdit}
      />
    </DashboardLayout>
  );
}
