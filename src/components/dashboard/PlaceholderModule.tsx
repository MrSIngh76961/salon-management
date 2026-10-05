'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Button } from '@/components/common/Button';

interface PlaceholderModuleProps {
  moduleTitle: string;
  moduleCategory: string;
  description: string;
  features: string[];
}

export const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({
  moduleTitle,
  moduleCategory,
  description,
  features,
}) => {
  return (
    <DashboardLayout title={moduleTitle} breadcrumb={moduleCategory}>
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-pink-50 border border-pink-200/80 text-[#E6397A] flex items-center justify-center mx-auto shadow-md shadow-pink-500/10">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-50 text-[#E6397A] border border-pink-100">
            <Sparkles className="w-3.5 h-3.5" />
            Upcoming Phase Module
          </span>

          <h2 className="text-2xl font-bold text-slate-900">{moduleTitle}</h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        <div className="bg-[#FAF9FB] rounded-2xl p-5 border border-slate-200/80 text-left space-y-2.5 text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
            Module Architecture Capabilities:
          </span>
          {features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6397A]" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            href="/dashboard"
            icon={<ArrowLeft className="w-4 h-4 mr-1" />}
            iconPosition="left"
          >
            Return to Dashboard Overview
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
