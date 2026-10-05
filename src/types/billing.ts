import { PaymentMethod, PaymentStatus } from './appointment';

export interface InvoiceTransaction {
  id: string;
  invoiceNumber: string; // e.g. "INV-2026-0891"
  customerId: string;
  customerName: string;
  customerEmail: string;
  appointmentId: string;
  serviceName: string;
  staffName: string;
  amount: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  date: string;
  dueDate: string;
}

export interface BillingOverviewData {
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
  refunds: number;
  outstandingCount: number;
}
