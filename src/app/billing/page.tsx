'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  CreditCard,
  Download,
  Search,
  Filter,
  Eye,
  Printer,
  Share2,
  CheckCircle2,
  Clock,
  RotateCcw,
  XCircle,
  Building2,
  TrendingUp,
  X,
  Sparkles,
} from 'lucide-react';
import { INITIAL_INVOICES, INITIAL_BILLING_OVERVIEW } from '@/data/mockBilling';
import { InvoiceTransaction } from '@/types/billing';

export default function BillingPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST']}>
      <BillingContent />
    </ProtectedRoute>
  );
}

function BillingContent() {
  const [invoices, setInvoices] = useState<InvoiceTransaction[]>(INITIAL_INVOICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceTransaction | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNum = inv.invoiceNumber.toLowerCase().includes(q);
        const matchCust = inv.customerName.toLowerCase().includes(q);
        const matchSvc = inv.serviceName.toLowerCase().includes(q);
        if (!matchNum && !matchCust && !matchSvc) return false;
      }
      if (selectedStatus !== 'All' && inv.paymentStatus !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [invoices, searchQuery, selectedStatus]);

  const stats = INITIAL_BILLING_OVERVIEW;

  const getStatusBadge = (status: InvoiceTransaction['paymentStatus']) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Paid
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500" />
            Pending
          </span>
        );
      case 'Partially Paid':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Deposit Paid
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <RotateCcw className="w-3 h-3 text-purple-500" />
            Refunded
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700">
            {status}
          </span>
        );
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Invoice #',
      'Client',
      'Treatment',
      'Specialist',
      'Subtotal',
      'Tax',
      'Total (INR)',
      'Method',
      'Status',
      'Date',
    ];
    const rows = filteredInvoices.map((inv) => [
      inv.invoiceNumber,
      `"${inv.customerName}"`,
      `"${inv.serviceName}"`,
      `"${inv.staffName}"`,
      inv.amount,
      inv.tax,
      inv.totalAmount,
      inv.paymentMethod,
      inv.paymentStatus,
      inv.date,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SalonPro_Billing_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout title="Billing & Invoices" breadcrumb="Billing">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Billing & Payments
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              POS Synced
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track salon service invoices, credit card transactions, client deposit balances, and automated tax accounting.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Transactions</span>
        </button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            +18.4% vs last period
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Settled / Paid
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            ₹{stats.paidAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Card, UPI & Cash
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pending Collection
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">
            ₹{stats.pendingAmount.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-1 block">
            {stats.outstandingCount} outstanding tickets
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Refunds & Adjustments
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-2">
            ₹{stats.refunds.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            2 adjustments handled
          </span>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by invoice #, client, service..."
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
            <option value="All">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* 4. Desktop Invoices Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-5 py-4 min-w-[160px]">Invoice #</th>
                <th className="px-5 py-4 min-w-[200px]">Client</th>
                <th className="px-5 py-4 min-w-[220px]">Treatment</th>
                <th className="px-5 py-4 min-w-[130px]">Amount</th>
                <th className="px-5 py-4 min-w-[120px]">Method</th>
                <th className="px-5 py-4 min-w-[130px]">Status</th>
                <th className="px-5 py-4 min-w-[120px]">Date</th>
                <th className="px-5 py-4 w-24 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-pink-50/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedInvoice(inv)}
                >
                  <td className="px-5 py-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{inv.customerName}</div>
                    <span className="text-[11px] text-slate-400">{inv.customerEmail}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-800">{inv.serviceName}</div>
                    <span className="text-[11px] text-slate-400">Stylist: {inv.staffName}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-extrabold text-sm text-slate-900">
                      ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      tax incl. ₹{inv.tax}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-700">
                    {inv.paymentMethod}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {getStatusBadge(inv.paymentStatus)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-slate-500">
                    {inv.date}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(inv);
                      }}
                      className="p-1.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                      title="View Invoice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Mobile Cards View */}
      <div className="block md:hidden space-y-3 mb-8">
        {filteredInvoices.map((inv) => (
          <div
            key={inv.id}
            onClick={() => setSelectedInvoice(inv)}
            className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="font-mono text-brand-600">{inv.invoiceNumber}</span>
              {getStatusBadge(inv.paymentStatus)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{inv.customerName}</h3>
              <p className="text-xs text-slate-400">{inv.serviceName}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{inv.date} • {inv.paymentMethod}</span>
              <span className="font-black text-sm text-slate-900">
                ₹{inv.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Professional Invoice Viewer Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 z-10 space-y-6"
            >
              {/* Invoice Top Header */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-500" />
                    <span className="font-extrabold text-base text-slate-900">
                      Luxe Hair & Spa Studio
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    SoHo Flagship, New York • GSTIN: 27AABCL1234F1Z5
                  </p>
                </div>

                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Invoice Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Billed To</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {selectedInvoice.customerName}
                  </div>
                  <div className="text-slate-500">{selectedInvoice.customerEmail}</div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Invoice Reference</span>
                  <div className="font-mono font-bold text-brand-600 text-sm mt-0.5">
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div className="text-slate-500">Issued: {selectedInvoice.date}</div>
                </div>
              </div>

              {/* Line items table */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden text-xs">
                <div className="bg-slate-50 p-3 font-bold text-slate-500 flex justify-between">
                  <span>Treatment / Service</span>
                  <span>Amount</span>
                </div>
                <div className="p-3.5 flex justify-between items-center border-t border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900">{selectedInvoice.serviceName}</div>
                    <span className="text-[11px] text-slate-400">Stylist: {selectedInvoice.staffName}</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{selectedInvoice.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Summary Totals */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-₹{selectedInvoice.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST / Tax (18%)</span>
                  <span>₹{selectedInvoice.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-base text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Paid</span>
                  <span className="text-emerald-600">
                    ₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => alert(`Printing invoice ${selectedInvoice.invoiceNumber}...`)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Downloaded ${selectedInvoice.invoiceNumber}.pdf`)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
