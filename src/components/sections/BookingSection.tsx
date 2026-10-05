'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Smile,
  Heart,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Star,
} from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { Button } from '@/components/common/Button';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  popular?: boolean;
}

const SERVICES_LIST: ServiceOption[] = [
  { id: 'cut', name: 'Precision Haircut & Blowdry', category: 'Hair Styling', duration: '45 min', price: 65, popular: true },
  { id: 'color', name: 'Balayage & Gloss Treatment', category: 'Hair Color', duration: '120 min', price: 185, popular: true },
  { id: 'facial', name: 'Botanical Hydrafacial Spa', category: 'Skincare', duration: '60 min', price: 95 },
  { id: 'mani', name: 'Deluxe Gel Manicure', category: 'Nail Studio', duration: '50 min', price: 55 },
  { id: 'pedi', name: 'Aroma Spa Pedicure', category: 'Nail Studio', duration: '60 min', price: 70 },
  { id: 'makeup', name: 'Bridal & Editorial Makeup', category: 'Glamour', duration: '90 min', price: 140 },
];

const STYLISTS = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    title: 'Master Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    title: 'Color & Texture Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    id: 'chloe',
    name: 'Chloe Dubois',
    title: 'Senior Esthetician',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    rating: 5.0,
  },
];

const DATES = [
  { day: 'Wed', date: '24 Sep', active: true },
  { day: 'Thu', date: '25 Sep', active: true },
  { day: 'Fri', date: '26 Sep', active: true },
  { day: 'Sat', date: '27 Sep', active: true },
  { day: 'Sun', date: '28 Sep', active: false },
];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

export const BookingSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceOption>(SERVICES_LIST[1]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[2]);
  const [isBooked, setIsBooked] = useState(false);

  return (
    <section id="booking" className="py-24 bg-[#FAF9FB] text-slate-900 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">ONLINE BOOKING EXPERIENCE</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Frictionless 24/7 Client Self-Booking
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Give your clients a 5-star digital booking journey. Embed into your website, Instagram bio, or share via direct link.
          </p>
        </div>

        {/* Interactive Booking Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Booking Steps (8 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.05)]">
            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#E6397A] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base font-bold text-slate-900">Select Desired Service</h3>
                </div>
                <span className="text-xs font-medium text-slate-500">6 Popular Services</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.map((service) => {
                  const isSelected = selectedService.id === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service);
                        setIsBooked(false);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#E6397A] bg-pink-50/50 shadow-sm ring-1 ring-[#E6397A]'
                          : 'border-slate-200 hover:border-pink-200 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-[#E6397A]">
                            {service.category}
                          </div>
                          <div className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                            {service.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base font-extrabold text-slate-900">
                            ${service.price}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Stylist */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#E6397A] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900">Choose Specialist</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STYLISTS.map((stylist) => {
                  const isSelected = selectedStylist.id === stylist.id;
                  return (
                    <button
                      key={stylist.id}
                      type="button"
                      onClick={() => {
                        setSelectedStylist(stylist);
                        setIsBooked(false);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#E6397A] bg-pink-50/50 ring-1 ring-[#E6397A]'
                          : 'border-slate-200 hover:border-pink-200 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stylist.avatar}
                        alt={stylist.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {stylist.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {stylist.title}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-500 mt-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>{stylist.rating}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Date & Time */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#E6397A] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">Pick Date & Time Slot</h3>
              </div>

              {/* Dates row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {DATES.map((item) => {
                  const isSelected = selectedDate.date === item.date;
                  return (
                    <button
                      key={item.date}
                      type="button"
                      disabled={!item.active}
                      onClick={() => setSelectedDate(item)}
                      className={`px-4 py-2.5 rounded-xl border text-center transition-all min-w-[76px] cursor-pointer ${
                        isSelected
                          ? 'bg-[#12131C] text-white border-[#12131C] shadow-md'
                          : item.active
                          ? 'border-slate-200 hover:border-pink-300 text-slate-700 bg-white'
                          : 'opacity-40 cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-medium uppercase tracking-wider">{item.day}</div>
                      <div className="text-xs font-bold mt-0.5">{item.date}</div>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="flex flex-wrap gap-2 pt-3">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E6397A] text-white shadow-md shadow-pink-500/25'
                          : 'bg-slate-100 text-slate-700 hover:bg-pink-50 hover:text-[#E6397A]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Mobile Phone Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-[#0E1018] rounded-[42px] p-4.5 border-4 border-slate-800 shadow-2xl shadow-slate-900/30 text-white overflow-hidden">
                {/* Phone Speaker Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                  <div className="w-8 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Mobile Screen Header */}
                <div className="pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF659F]">
                      Aurevia Booking
                    </span>
                    <h4 className="text-sm font-bold text-white">Luxe Beauty Studio</h4>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Mobile Screen Content */}
                <div className="py-4 space-y-4">
                  {/* Summary Card */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Appointment Summary
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">{selectedService.name}</div>
                      <div className="text-base font-extrabold text-[#FF659F]">
                        ${selectedService.price}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{selectedService.duration} Duration</span>
                    </div>

                    {/* Stylist Mini Card */}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedStylist.avatar}
                        alt={selectedStylist.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-200">
                          {selectedStylist.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {selectedStylist.title}
                        </div>
                      </div>
                    </div>

                    {/* Date & Time pill */}
                    <div className="bg-white/5 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF659F]" />
                        <span>{selectedDate.date} 2026</span>
                      </div>
                      <div className="font-bold text-white">{selectedTime}</div>
                    </div>
                  </div>

                  {/* Customer Deposit & Protection Note */}
                  <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>

                  {/* Booking Action */}
                  <AnimatePresence mode="wait">
                    {isBooked ? (
                      <motion.div
                        key="booked"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-1.5"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="text-sm font-bold text-white">Booking Confirmed!</div>
                        <p className="text-[11px] text-emerald-200">
                          Confirmation SMS & Calendar Invite sent.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div key="action">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setIsBooked(true)}
                          className="w-full justify-center text-xs py-3"
                          icon={<ChevronRight className="w-4 h-4" />}
                        >
                          Confirm & Book Appointment
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-500">
                      Powered by <strong className="text-slate-400">Aurevia</strong> Cloud
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative phone floating tag */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-3 border border-slate-200 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-[#E6397A] flex items-center justify-center font-bold text-xs">
                  24/7
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Zero Missed Bookings</div>
                  <div className="text-[10px] text-slate-500">Bookings while you sleep</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
