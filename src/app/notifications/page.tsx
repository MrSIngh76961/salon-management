'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Bell,
  CheckCheck,
  Calendar,
  CreditCard,
  UserCheck,
  Settings,
  Sparkles,
  Mail,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import {
  INITIAL_NOTIFICATIONS,
  INITIAL_NOTIFICATION_SETTINGS,
} from '@/data/mockNotifications';
import { SalonNotification, NotificationCategory, NotificationChannelSettings } from '@/types/notification';

export default function NotificationsPage() {
  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER', 'RECEPTIONIST', 'STAFF', 'CUSTOMER']}>
      <NotificationsContent />
    </ProtectedRoute>
  );
}

function NotificationsContent() {
  const [notifications, setNotifications] = useState<SalonNotification[]>(INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = useState<NotificationChannelSettings>(INITIAL_NOTIFICATION_SETTINGS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'inbox' | 'settings'>('inbox');

  const categories = ['All', 'Booking', 'Appointment', 'Customer', 'Staff', 'Billing', 'System'];

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedCategory === 'All') return true;
    return notif.category === selectedCategory;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleSetting = (
    channel: 'email' | 'sms' | 'push',
    key: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [key]: !((prev[channel] as any)[key]),
      },
    }));
  };

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'Booking':
      case 'Appointment':
        return <Calendar className="w-4 h-4 text-brand-500" />;
      case 'Billing':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'Customer':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'Staff':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <DashboardLayout title="Notification Center" breadcrumb="Notifications">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-[#E6397A] border border-pink-200">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time salon activity updates, appointment changes, customer check-ins, and automated alerts.
          </p>
        </div>

        {/* View Switcher: Inbox vs Settings */}
        <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inbox'
                ? 'bg-brand-50 text-brand-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Inbox & Alerts
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-brand-50 text-brand-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Channel Preferences
          </button>
        </div>
      </div>

      {activeTab === 'inbox' ? (
        <div className="space-y-5">
          {/* Category Filter Pills & Mark All Read */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline shrink-0"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark All as Read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200/80">
                <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold">No notifications in this category.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
                    !notif.read
                      ? 'bg-white border-brand-200 shadow-sm ring-1 ring-brand-500/10'
                      : 'bg-white/70 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70 shrink-0">
                      {getCategoryIcon(notif.category)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-pink-50 px-2 py-0.5 rounded-full">
                          {notif.category}
                        </span>
                        <span className="text-xs text-slate-400">• {notif.timestamp}</span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-brand-500" />
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mt-1">
                        {notif.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>

                      {notif.link && (
                        <Link
                          href={notif.link}
                          className="inline-block mt-2 text-xs font-bold text-brand-600 hover:underline"
                        >
                          View Details →
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleRead(notif.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
                      title={notif.read ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(notif.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl"
                      title="Dismiss"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Channel Preferences UI */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Settings */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Email Notifications</h3>
                <span className="text-xs text-slate-400">Owner & Client emails</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Booking Confirmations</span>
                <input
                  type="checkbox"
                  checked={settings.email.bookingConfirmation}
                  onChange={() => handleToggleSetting('email', 'bookingConfirmation')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Appointment Reminders</span>
                <input
                  type="checkbox"
                  checked={settings.email.appointmentReminder}
                  onChange={() => handleToggleSetting('email', 'appointmentReminder')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Cancellation Notices</span>
                <input
                  type="checkbox"
                  checked={settings.email.cancellation}
                  onChange={() => handleToggleSetting('email', 'cancellation')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Payment Receipts</span>
                <input
                  type="checkbox"
                  checked={settings.email.paymentReceipt}
                  onChange={() => handleToggleSetting('email', 'paymentReceipt')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* SMS Settings */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">SMS Reminders</h3>
                <span className="text-xs text-slate-400">Twilio / Telephony channel</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Booking SMS Confirmation</span>
                <input
                  type="checkbox"
                  checked={settings.sms.bookingConfirmation}
                  onChange={() => handleToggleSetting('sms', 'bookingConfirmation')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>2-Hour Prior Reminder</span>
                <input
                  type="checkbox"
                  checked={settings.sms.reminder2HoursBefore}
                  onChange={() => handleToggleSetting('sms', 'reminder2HoursBefore')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Instant Cancellation SMS</span>
                <input
                  type="checkbox"
                  checked={settings.sms.cancellation}
                  onChange={() => handleToggleSetting('sms', 'cancellation')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Push & Staff Mobile Alerts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Push Notifications</h3>
                <span className="text-xs text-slate-400">Stylist & Manager apps</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <label className="flex items-center justify-between cursor-pointer">
                <span>New Online Bookings</span>
                <input
                  type="checkbox"
                  checked={settings.push.newBooking}
                  onChange={() => handleToggleSetting('push', 'newBooking')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Staff Leave Alert Escalation</span>
                <input
                  type="checkbox"
                  checked={settings.push.staffLeaveAlerts}
                  onChange={() => handleToggleSetting('push', 'staffLeaveAlerts')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Schedule & Chair Changes</span>
                <input
                  type="checkbox"
                  checked={settings.push.appointmentChanges}
                  onChange={() => handleToggleSetting('push', 'appointmentChanges')}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
