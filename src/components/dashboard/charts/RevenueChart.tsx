'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';
import { REVENUE_TIMEFRAME_DATA } from '@/data/dashboard';

type TimeRange = '7D' | '30D' | '3M' | '12M';

export const RevenueChart: React.FC = () => {
  const [range, setRange] = useState<TimeRange>('7D');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const currentData = REVENUE_TIMEFRAME_DATA[range];
  const points = currentData.points;

  const maxRevenue = Math.max(...points.map((p) => p.revenue));
  const minRevenue = Math.min(...points.map((p) => p.revenue));

  // Chart dimensions
  const height = 220;
  const width = 640;
  const paddingX = 40;
  const paddingY = 30;

  // Generate SVG path points
  const svgPoints = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * (width - paddingX * 2);
    const normalizedY = (p.revenue - minRevenue * 0.8) / (maxRevenue * 1.15 - minRevenue * 0.8);
    const y = height - paddingY - normalizedY * (height - paddingY * 2);
    return { x, y, data: p };
  });

  const linePath = svgPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    // Smooth Bezier curve
    const prev = svgPoints[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${svgPoints[svgPoints.length - 1].x},${height - 15} L ${
    svgPoints[0].x
  },${height - 15} Z`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] space-y-6">
      {/* Header: Title, Metric, & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {currentData.growth}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentData.total}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentData.comparison}
            </span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 text-xs font-bold text-slate-600 self-start sm:self-auto">
          {(['7D', '30D', '3M', '12M'] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setRange(tab);
                setHoveredPoint(null);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                range === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              {tab === '7D'
                ? '7 Days'
                : tab === '30D'
                ? '30 Days'
                : tab === '3M'
                ? '3 Months'
                : '12 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Responsive Area Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 sm:h-64 overflow-visible"
        >
          <defs>
            {/* Pink brand gradient fill */}
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E6397A" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E6397A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#F1F5F9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#F1F5F9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - 20}
            x2={width - paddingX}
            y2={height - 20}
            stroke="#E2E8F0"
          />

          {/* Area fill */}
          <motion.path
            key={`area-${range}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            d={areaPath}
            fill="url(#revenueGradient)"
          />

          {/* Stroke Line */}
          <motion.path
            key={`line-${range}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            d={linePath}
            fill="none"
            stroke="#E6397A"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Interactive Data points */}
          {svgPoints.map((pt, i) => {
            const isHovered = hoveredPoint === i;
            return (
              <g
                key={i}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  className={`transition-all ${
                    isHovered
                      ? 'fill-[#E6397A] stroke-white stroke-4 shadow-lg'
                      : 'fill-white stroke-[#E6397A] stroke-2'
                  }`}
                />

                {/* X-axis label */}
                <text
                  x={pt.x}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-[11px] font-semibold fill-slate-400 select-none"
                >
                  {pt.data.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint !== null && (
          <div
            className="absolute -top-2 bg-[#12131D] text-white p-2.5 rounded-xl border border-white/10 shadow-xl text-xs z-10 pointer-events-none transform -translate-x-1/2"
            style={{
              left: `${
                ((svgPoints[hoveredPoint].x) / width) * 100
              }%`,
            }}
          >
            <div className="font-bold text-white text-sm">
              ${svgPoints[hoveredPoint].data.revenue.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-300">
              {svgPoints[hoveredPoint].data.appointments} appointments •{' '}
              {svgPoints[hoveredPoint].data.date}
            </div>
          </div>
        )}
      </div>

      {/* Bottom KPI Highlights Row */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600">
        <div>
          <span className="text-[11px] text-slate-400 block font-semibold">Average Ticket Size</span>
          <span className="text-base font-extrabold text-slate-900 mt-0.5 block">$118.40</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block font-semibold">Service Revenue</span>
          <span className="text-base font-extrabold text-slate-900 mt-0.5 block">82% ($16,268)</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-[11px] text-slate-400 block font-semibold">Retail Product Add-ons</span>
          <span className="text-base font-extrabold text-[#E6397A] mt-0.5 block">18% ($3,572)</span>
        </div>
      </div>
    </div>
  );
};
