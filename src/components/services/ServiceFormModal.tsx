'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Check,
  Sparkles,
  Clock,
  IndianRupee,
  Users,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';
import { SalonServiceItem, ServiceCategory, ServiceAssignedStaff } from '@/types/service';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: Partial<SalonServiceItem>) => void;
  serviceToEdit?: SalonServiceItem | null;
  categories: ServiceCategory[];
  availableStaff: ServiceAssignedStaff[];
}

const PRESET_IMAGES = [
  {
    name: 'Precision Cut',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hair Balayage',
    url: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Hydrafacial',
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Gel Nails',
    url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Spa Aromatherapy',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Bridal Makeup',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=80',
  },
  {
    name: 'Men Grooming',
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80',
  },
];

const DURATION_PRESETS = [15, 30, 45, 60, 90, 120];

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  serviceToEdit,
  categories,
  availableStaff,
}) => {
  const isEditing = Boolean(serviceToEdit);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState<number | ''>(500);
  const [discountPrice, setDiscountPrice] = useState<number | ''>('');
  const [taxRatePercent, setTaxRatePercent] = useState<number | ''>(18);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [customDuration, setCustomDuration] = useState<string>('');
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate form on open
  useEffect(() => {
    if (isOpen) {
      if (serviceToEdit) {
        setName(serviceToEdit.name);
        setCategory(serviceToEdit.category);
        setDescription(serviceToEdit.description || '');
        setImage(serviceToEdit.image || '');
        setPrice(serviceToEdit.price);
        setDiscountPrice(serviceToEdit.discountPrice || '');
        setTaxRatePercent(serviceToEdit.taxRatePercent || 18);

        const isPreset = DURATION_PRESETS.includes(serviceToEdit.durationMinutes);
        if (isPreset) {
          setDurationMinutes(serviceToEdit.durationMinutes);
          setIsCustomDuration(false);
          setCustomDuration('');
        } else {
          setIsCustomDuration(true);
          setCustomDuration(String(serviceToEdit.durationMinutes));
          setDurationMinutes(serviceToEdit.durationMinutes);
        }

        setSelectedStaffIds(serviceToEdit.assignedStaff?.map((s) => s.id) || []);
        setStatus(serviceToEdit.status);
      } else {
        // Defaults for Add Service
        setName('');
        const firstValidCat = categories.find((c) => c.slug !== 'all')?.name || 'Hair';
        setCategory(firstValidCat);
        setDescription('');
        setImage(PRESET_IMAGES[0].url);
        setPrice(500);
        setDiscountPrice('');
        setTaxRatePercent(18);
        setDurationMinutes(45);
        setIsCustomDuration(false);
        setCustomDuration('');
        setSelectedStaffIds(availableStaff.slice(0, 2).map((s) => s.id));
        setStatus('Active');
      }
      setErrors({});
    }
  }, [isOpen, serviceToEdit, categories, availableStaff]);

  if (!isOpen) return null;

  const handleToggleStaff = (staffId: string) => {
    setSelectedStaffIds((prev) =>
      prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]
    );
  };

  const handleSelectAllStaff = () => {
    if (selectedStaffIds.length === availableStaff.length) {
      setSelectedStaffIds([]);
    } else {
      setSelectedStaffIds(availableStaff.map((s) => s.id));
    }
  };

  const handleDurationPresetClick = (mins: number) => {
    setIsCustomDuration(false);
    setDurationMinutes(mins);
    setCustomDuration('');
  };

  const handleCustomDurationChange = (val: string) => {
    setCustomDuration(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setDurationMinutes(num);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Service name is required';
    if (!category.trim()) errs.category = 'Category is required';
    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = 'Valid price is required';
    }
    if (durationMinutes <= 0) {
      errs.durationMinutes = 'Duration must be greater than 0';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedCat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    const assignedStaffObjects = availableStaff.filter((s) => selectedStaffIds.includes(s.id));

    const payload: Partial<SalonServiceItem> = {
      name: name.trim(),
      category: category.trim(),
      categoryId: matchedCat?.id || 'cat-hair',
      description: description.trim(),
      image: image.trim() || PRESET_IMAGES[0].url,
      price: Number(price),
      discountPrice: discountPrice !== '' ? Number(discountPrice) : undefined,
      taxRatePercent: taxRatePercent !== '' ? Number(taxRatePercent) : 18,
      durationMinutes: Number(durationMinutes),
      durationLabel: `${durationMinutes} min`,
      assignedStaff: assignedStaffObjects,
      status: status,
    };

    onSave(payload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing
                  ? 'Update service pricing, duration, and assigned stylists.'
                  : 'Create a new salon service with custom duration and staff assignments.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                1. Basic Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Precision Haircut & Blowdry"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border ${
                      errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200/80 focus:border-[#E6397A] focus:ring-[#E6397A]/20'
                    } py-2.5 px-3.5 outline-none text-slate-900 transition-all`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all cursor-pointer"
                  >
                    {categories
                      .filter((c) => c.slug !== 'all')
                      .map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all cursor-pointer"
                  >
                    <option value="Active">Active (Bookable)</option>
                    <option value="Inactive">Inactive (Hidden from booking)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description of the treatment, technique, and client benefits..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all resize-none"
                  />
                </div>

                {/* Service Image URL & Presets */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Service Image
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                      {image ? (
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 m-3 text-slate-400" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Paste image URL or pick preset below"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="flex-1 text-xs rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                    />
                  </div>

                  {/* Preset quick selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                      Presets:
                    </span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                          image === preset.url
                            ? 'bg-brand-50 text-brand-600 border-brand-200 shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Pricing */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Pricing & Taxes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Price (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="e.g. 500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] focus:ring-2 focus:ring-[#E6397A]/20 transition-all font-semibold"
                  />
                  {errors.price && (
                    <span className="text-[11px] text-rose-500 mt-1 block">
                      {errors.price}
                    </span>
                  )}
                </div>

                {/* Optional Discount */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Original Price (Optional Strike)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="e.g. 700"
                    value={discountPrice}
                    onChange={(e) =>
                      setDiscountPrice(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                  />
                </div>

                {/* Tax Rate */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tax / GST Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="18"
                    value={taxRatePercent}
                    onChange={(e) =>
                      setTaxRatePercent(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2.5 px-3.5 outline-none text-slate-900 focus:border-[#E6397A] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Duration */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                3. Treatment Duration
              </h3>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {DURATION_PRESETS.map((mins) => {
                    const isSelected = !isCustomDuration && durationMinutes === mins;
                    return (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => handleDurationPresetClick(mins)}
                        className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white border-transparent shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {mins} min
                      </button>
                    );
                  })}

                  {/* Custom Option */}
                  <button
                    type="button"
                    onClick={() => setIsCustomDuration(true)}
                    className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                      isCustomDuration
                        ? 'bg-gradient-to-r from-brand-500 to-purple-600 text-white border-transparent shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Custom...
                  </button>
                </div>

                {isCustomDuration && (
                  <div className="flex items-center gap-3 max-w-xs">
                    <input
                      type="number"
                      min="5"
                      max="480"
                      placeholder="Minutes (e.g. 75)"
                      value={customDuration}
                      onChange={(e) => handleCustomDurationChange(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200/80 py-2 px-3 outline-none text-slate-900 focus:border-[#E6397A] font-bold"
                    />
                    <span className="text-xs font-bold text-slate-600 shrink-0">minutes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Staff Assignment */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    4. Staff Assignment
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Only assigned stylists will be offered during online booking for this service.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAllStaff}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  {selectedStaffIds.length === availableStaff.length
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1">
                {availableStaff.map((staff) => {
                  const isChecked = selectedStaffIds.includes(staff.id);
                  return (
                    <label
                      key={staff.id}
                      onClick={() => handleToggleStaff(staff.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'bg-pink-50/50 border-brand-200 shadow-xs'
                          : 'bg-white border-slate-200/70 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-[#E6397A] border-[#E6397A] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {staff.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {staff.role}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 hover:via-pink-600 hover:to-purple-700 shadow-md shadow-brand-500/25 transition-all transform active:scale-95"
            >
              {isEditing ? 'Save Changes' : 'Create Service'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
