'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, Crown, Calendar, Sparkles } from 'lucide-react';
import { Customer, CustomerStatus } from '@/types/customer';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: Partial<Customer>) => void;
  customerToEdit?: Customer | null;
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customerToEdit,
}) => {
  const isEditing = Boolean(customerToEdit);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [status, setStatus] = useState<CustomerStatus>('Active');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (customerToEdit) {
        setName(customerToEdit.name);
        setPhone(customerToEdit.phone);
        setEmail(customerToEdit.email);
        setBirthday(customerToEdit.birthday || '');
        setStatus(customerToEdit.status);
        setNotes(customerToEdit.notes?.[0] || '');
      } else {
        setName('');
        setPhone('');
        setEmail('');
        setBirthday('');
        setStatus('Active');
        setNotes('');
      }
      setErrorMsg('');
    }
  }, [isOpen, customerToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Full name and mobile phone are required.');
      return;
    }

    onSave({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      birthday: birthday.trim(),
      status,
      notes: notes.trim() ? [notes.trim()] : [],
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 z-10 flex flex-col"
        >
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Client Profile' : 'Add New Client'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Register a customer to track appointment history, spending, and preferences.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Jessica Alba"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Membership Tier
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CustomerStatus)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
                >
                  <option value="Active">Active Regular</option>
                  <option value="VIP">VIP Client</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Birthday</label>
                <input
                  type="text"
                  placeholder="e.g. Nov 14"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Initial Notes / Consultation Details
              </label>
              <textarea
                rows={2}
                placeholder="Product preferences, sensitivities, styling history..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A] resize-none"
              />
            </div>

            {errorMsg && <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
              >
                {isEditing ? 'Save Client' : 'Create Client Profile'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
