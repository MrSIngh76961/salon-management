'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { SectionBadge } from '@/components/common/SectionBadge';
import { FAQ_ITEMS } from '@/data/mockData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <SectionBadge variant="pink">FREQUENTLY ASKED QUESTIONS</SectionBadge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-slate-900"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Everything you need to know about switching your salon workflow to Aurevia.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#E6397A]/40 bg-pink-50/20 shadow-xs'
                    : 'border-slate-200/80 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#E6397A] text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-pink-100/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-3xl bg-[#FAF9FB] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-[#E6397A] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Have a custom inquiry or special requirements?</h4>
              <p className="text-xs text-slate-500">Our salon onboarding specialists are available 24/7 on live chat.</p>
            </div>
          </div>
          <a
            href="mailto:concierge@aurevia.com"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:border-pink-300 transition-colors shrink-0 shadow-xs"
          >
            Chat with a Specialist
          </a>
        </div>
      </div>
    </section>
  );
};
