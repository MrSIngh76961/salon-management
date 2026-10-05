'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  CalendarPlus,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { INITIAL_SERVICES } from '@/data/servicesData';
import { AVAILABLE_STAFF_ROSTER } from '@/data/servicesData';
import { MOCK_SLOTS_SAMPLE } from '@/data/mockAppointments';

export default function BookingEnginePage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(INITIAL_SERVICES[0].id);
  const [selectedStaffId, setSelectedStaffId] = useState<string>(AVAILABLE_STAFF_ROSTER[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-25');
  const [selectedTime, setSelectedTime] = useState<string>('11:15 AM');

  // Customer Details Form
  const [customerName, setCustomerName] = useState('Sophia Martinez');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 392-8841');
  const [customerEmail, setCustomerEmail] = useState('customer@salonpro.io');
  const [specialNotes, setSpecialNotes] = useState('');

  // Generated Booking Reference
  const [bookingReference, setBookingReference] = useState('SP-2026-00482');

  const selectedService =
    INITIAL_SERVICES.find((s) => s.id === selectedServiceId) || INITIAL_SERVICES[0];
  const selectedStaff =
    AVAILABLE_STAFF_ROSTER.find((st) => st.id === selectedStaffId) || AVAILABLE_STAFF_ROSTER[0];

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirmBooking = () => {
    const randomRef = `SP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingReference(randomRef);
    setCurrentStep(5); // Confirmation Screen
  };

  const datesOptions = [
    { label: 'Today', date: '2026-09-24', day: 'Thu' },
    { label: 'Tomorrow', date: '2026-09-25', day: 'Fri' },
    { label: 'Sat, Sep 26', date: '2026-09-26', day: 'Sat' },
    { label: 'Sun, Sep 27', date: '2026-09-27', day: 'Sun' },
    { label: 'Mon, Sep 28', date: '2026-09-28', day: 'Mon' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9FB] flex flex-col justify-between selection:bg-pink-100 selection:text-pink-900">
      {/* Top Luxury Client Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo variant="light" />
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Luxe Hair & Spa Studio
            </span>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-700 hover:text-brand-600 bg-slate-100 px-3.5 py-1.5 rounded-full transition-colors"
            >
              Owner Portal →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Step Indicator */}
        {currentStep < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Step {currentStep} of 4: {['Select Service', 'Select Stylist', 'Choose Date & Time', 'Your Details'][currentStep - 1]}
              </span>
              <span className="text-xs font-black text-brand-600">
                {currentStep * 25}% Complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <motion.div
                initial={{ width: '25%' }}
                animate={{ width: `${currentStep * 25}%` }}
                className="h-full bg-gradient-to-r from-brand-500 to-purple-600 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-black text-slate-900">Choose a Salon Service</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore our curated menu of hair styling, skincare rituals, nail art, and grooming.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INITIAL_SERVICES.slice(0, 10).map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <motion.div
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-3xl border cursor-pointer select-none transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? 'bg-pink-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-lg shadow-pink-500/10'
                        : 'bg-white border-slate-200/80 hover:border-pink-300 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                          {service.category}
                        </span>
                        <span className="font-extrabold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
                          ₹{service.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5 truncate group-hover:text-brand-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {service.description}
                      </p>
                      <div className="mt-2 text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{service.durationMinutes} min session</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Stylist */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-black text-slate-900">Select Your Specialist</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Choose from our verified stylists qualified to perform {selectedService.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AVAILABLE_STAFF_ROSTER.slice(0, 6).map((staff) => {
                const isSelected = selectedStaffId === staff.id;
                return (
                  <motion.div
                    key={staff.id}
                    onClick={() => setSelectedStaffId(staff.id)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-3xl border cursor-pointer select-none transition-all flex items-center gap-4 group ${
                      isSelected
                        ? 'bg-pink-50/70 border-brand-500 ring-2 ring-brand-500/20 shadow-lg shadow-pink-500/10'
                        : 'bg-white border-slate-200/80 hover:border-pink-300 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-xs border border-white group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                          {staff.name}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {staff.availability}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {staff.role}
                      </span>
                      <span className="text-[11px] text-brand-600 font-semibold block mt-1">
                        4.9 ★ (150+ reviews)
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Choose Date & Available Time Slots */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-black text-slate-900">Select Date & Time</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time booking slots for {selectedStaff.name} on {selectedService.name}.
              </p>
            </div>

            {/* Date Pill Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Select Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {datesOptions.map((item) => {
                  const isSelected = selectedDate === item.date;
                  return (
                    <motion.button
                      key={item.date}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedDate(item.date)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:border-pink-300 hover:shadow-xs'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold block opacity-80">
                        {item.day}
                      </span>
                      <span className="text-sm font-black block mt-0.5">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Available Appointment Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {MOCK_SLOTS_SAMPLE.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <motion.button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      whileHover={slot.available ? { scale: 1.03 } : {}}
                      whileTap={slot.available ? { scale: 0.97 } : {}}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-2xl border font-bold text-xs text-center transition-all ${
                        isSelected
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                          : slot.available
                          ? 'bg-white text-slate-800 border-slate-200 hover:border-pink-300 hover:shadow-xs cursor-pointer'
                          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <div>{slot.time}</div>
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          isSelected
                            ? 'text-white/80'
                            : slot.available
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }`}
                      >
                        {slot.available ? 'Available' : slot.reason}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Customer Details & Confirmation */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-2xl font-black text-slate-900">Confirm Your Booking</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Provide contact details for automated SMS and calendar reminders.
              </p>
            </div>

            {/* Summary Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-pink-300 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Summary
                </span>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                  Confirmed Slot
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Treatment</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedService.name}</div>
                </div>
                <div>
                  <span className="text-slate-400">Stylist</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedStaff.name}</div>
                </div>
                <div>
                  <span className="text-slate-400">Date & Time</span>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedDate} at {selectedTime}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Total Price</span>
                  <div className="font-black text-emerald-600 text-base mt-0.5">
                    ₹{selectedService.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Input Details */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A] focus:bg-white transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A] focus:bg-white transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Requests or Allergies
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Sensitive skin, preferred drink, etc."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 py-2.5 px-3.5 outline-none focus:border-[#E6397A] focus:bg-white resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Booking Confirmation Receipt Screen */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto text-center space-y-6 py-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce-subtle">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider border border-brand-100">
                Booking Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                We Can’t Wait to See You!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your appointment reference is <strong className="text-slate-900">{bookingReference}</strong>.
              </p>
            </div>

            {/* Receipt Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:border-pink-300 hover:shadow-md text-left space-y-4 transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-500" />
                  <span className="text-xs font-bold text-slate-900">Luxe Hair & Spa Studio</span>
                </div>
                <span className="text-xs font-extrabold text-slate-900">
                  ₹{selectedService.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Client</span>
                  <div className="font-bold text-slate-900 mt-0.5">{customerName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Specialist</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedStaff.name}</div>
                </div>
                <div>
                  <span className="text-slate-400">Date</span>
                  <div className="font-bold text-slate-900 mt-0.5">{selectedDate}</div>
                </div>
                <div>
                  <span className="text-slate-400">Time</span>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {selectedTime} ({selectedService.durationMinutes} min)
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Confirmation CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => alert(`Event "${selectedService.name} at Luxe Salon" downloaded to calendar.`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-800 border border-slate-200/80 shadow-xs hover:bg-slate-50 cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-slate-500" />
                <span>Add to Calendar</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-800 border border-slate-200/80 shadow-xs hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Reschedule</span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/customer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20"
                >
                  <span>View My Appointments</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Navigation Step Buttons */}
        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
            {currentStep > 1 ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </motion.button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/20 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirmBooking}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-500 via-pink-500 to-purple-600 hover:from-brand-600 shadow-md shadow-brand-500/25 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm & Book Now</span>
              </motion.button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/80 text-center text-xs text-slate-400 bg-white">
        © 2026 Aurevia Inc. Verified Luxury Salon Scheduling Engine.
      </footer>
    </div>
  );
}
