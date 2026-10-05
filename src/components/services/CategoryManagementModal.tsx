'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  FolderTree,
  Check,
  AlertCircle,
  Power,
  Layers,
} from 'lucide-react';
import { ServiceCategory } from '@/types/service';

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ServiceCategory[];
  onAddCategory: (category: Omit<ServiceCategory, 'id' | 'serviceCount'>) => void;
  onUpdateCategory: (id: string, updates: Partial<ServiceCategory>) => void;
  onDeleteCategory: (id: string) => void;
  serviceCountsByCategory: Record<string, number>;
}

const PRESET_COLORS = [
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#F43F5E', // Rose
  '#6366F1', // Indigo
  '#3B82F6', // Blue
];

export const CategoryManagementModal: React.FC<CategoryManagementModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  serviceCountsByCategory,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  // Form fields
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catColor, setCatColor] = useState(PRESET_COLORS[0]);
  const [catStatus, setCatStatus] = useState<'Active' | 'Inactive'>('Active');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const validCategories = categories.filter((c) => c.slug !== 'all');

  const startEdit = (cat: ServiceCategory) => {
    setIsAdding(false);
    setEditingCategoryId(cat.id);
    setCatName(cat.name);
    setCatDescription(cat.description || '');
    setCatColor(cat.color || PRESET_COLORS[0]);
    setCatStatus(cat.status);
    setErrorMsg('');
  };

  const startAdd = () => {
    setEditingCategoryId(null);
    setIsAdding(true);
    setCatName('');
    setCatDescription('');
    setCatColor(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
    setCatStatus('Active');
    setErrorMsg('');
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingCategoryId(null);
    setErrorMsg('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      setErrorMsg('Category name is required');
      return;
    }

    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategoryId) {
      onUpdateCategory(editingCategoryId, {
        name: catName.trim(),
        slug,
        description: catDescription.trim(),
        color: catColor,
        status: catStatus,
      });
      cancelForm();
    } else {
      onAddCategory({
        name: catName.trim(),
        slug,
        description: catDescription.trim(),
        color: catColor,
        status: catStatus,
      });
      cancelForm();
    }
  };

  const handleDelete = (id: string, count: number) => {
    if (count > 0) {
      alert(`Cannot delete this category because it contains ${count} active services. Please reassign or delete the services first.`);
      return;
    }
    onDeleteCategory(id);
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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600 border border-pink-100">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Manage Service Categories</h2>
                <p className="text-xs text-slate-500">
                  Organize treatments into distinct salon departments and booking menus.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Inline Add/Edit Form */}
            {(isAdding || editingCategoryId) && (
              <form
                onSubmit={handleSave}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 shadow-xs animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {editingCategoryId ? 'Edit Category' : 'Create New Category'}
                  </h3>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Category Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eyebrows & Lashes"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      className="w-full text-xs rounded-xl bg-white border border-slate-200 py-2 px-3 outline-none text-slate-900 focus:border-[#E6397A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={catStatus}
                      onChange={(e) => setCatStatus(e.target.value as 'Active' | 'Inactive')}
                      className="w-full text-xs rounded-xl bg-white border border-slate-200 py-2 px-3 outline-none text-slate-900 focus:border-[#E6397A]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Brief category summary..."
                      value={catDescription}
                      onChange={(e) => setCatDescription(e.target.value)}
                      className="w-full text-xs rounded-xl bg-white border border-slate-200 py-2 px-3 outline-none text-slate-900 focus:border-[#E6397A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-2">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCatColor(c)}
                          className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center"
                          style={{
                            backgroundColor: c,
                            borderColor: catColor === c ? '#0f172a' : 'transparent',
                          }}
                        >
                          {catColor === c && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {errorMsg && <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-xs"
                  >
                    {editingCategoryId ? 'Update' : 'Add Category'}
                  </button>
                </div>
              </form>
            )}

            {/* List of Categories */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Existing Categories ({validCategories.length})
                </span>

                {!isAdding && !editingCategoryId && (
                  <button
                    type="button"
                    onClick={startAdd}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add New Category</span>
                  </button>
                )}
              </div>

              {validCategories.map((cat) => {
                const count = serviceCountsByCategory[cat.slug] ?? serviceCountsByCategory[cat.name] ?? cat.serviceCount;

                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: cat.color || '#E6397A' }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {cat.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cat.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {cat.status}
                          </span>
                        </div>
                        {cat.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-sm mt-0.5">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                        {count} services
                      </span>

                      <button
                        type="button"
                        onClick={() => startEdit(cat)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                        title="Edit category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateCategory(cat.id, {
                            status: cat.status === 'Active' ? 'Inactive' : 'Active',
                          })
                        }
                        className={`p-1.5 rounded-lg transition-colors ${
                          cat.status === 'Active'
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-emerald-500 hover:bg-emerald-50'
                        }`}
                        title={cat.status === 'Active' ? 'Deactivate category' : 'Activate category'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id, count)}
                        disabled={count > 0}
                        className={`p-1.5 rounded-lg transition-colors ${
                          count > 0
                            ? 'text-slate-200 cursor-not-allowed'
                            : 'text-rose-500 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title={
                          count > 0
                            ? 'Cannot delete category with services'
                            : 'Delete category'
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
            <span className="text-xs text-slate-400">
              Changes update your service filters instantly.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
