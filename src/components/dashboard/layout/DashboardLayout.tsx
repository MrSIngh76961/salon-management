'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumb?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Salon Dashboard',
  breadcrumb = 'Overview',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={['SALON_OWNER', 'SUPER_ADMIN', 'MANAGER']}>
      <div className="min-h-screen bg-[#FAF9FB] flex antialiased text-slate-900">
        {/* Desktop Sidebar (Fixed) */}
        <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 shadow-xs">
          <Sidebar />
        </div>

        {/* Mobile Slide-Out Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
              />

              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
              >
                <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <TopNavbar
            onToggleMobileMenu={() => setMobileMenuOpen(true)}
            title={title}
            breadcrumb={breadcrumb}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
