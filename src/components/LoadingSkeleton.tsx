import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-pulse" id="loading-skeleton">
      {/* 1. Category Subheading / Ticker Mock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="h-4 bg-slate-800 rounded w-48" />
          <div className="h-3 bg-slate-800/60 rounded w-36" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 bg-slate-800 rounded w-24" />
          <div className="h-9 bg-slate-800 rounded w-24" />
          <div className="h-9 bg-slate-800 rounded w-24" />
        </div>
      </div>

      {/* 2. Interactive Matches Grid Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500/50 rounded-full" />
          <div className="h-4 bg-slate-800 rounded w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#16191E] border border-slate-800/80 rounded-2xl p-5 space-y-5">
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="h-3.5 bg-slate-800 rounded w-24" />
                <div className="h-5 bg-slate-800/80 rounded w-16" />
              </div>
              {/* Scoreline dynamic columns */}
              <div className="grid grid-cols-3 items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-slate-800 rounded-full" />
                  <div className="h-3 bg-slate-805 rounded w-16" />
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-6 bg-slate-800 rounded w-12" />
                  <div className="h-3 bg-slate-800/60 rounded w-8" />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-slate-800 rounded-full" />
                  <div className="h-3 bg-slate-805 rounded w-16" />
                </div>
              </div>
              {/* Footer info bars */}
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                <div className="h-3 bg-slate-80 w-28 rounded" />
                <div className="h-3 bg-slate-80 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. News Articles Feed Skeleton */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500/50 rounded-full" />
          <div className="h-4 bg-slate-800 rounded w-44" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-950/60 border border-slate-800/60 rounded-xl overflow-hidden space-y-4 pb-4">
              <div className="h-48 bg-slate-800/80" />
              <div className="px-4 space-y-3">
                <div className="h-3 bg-emerald-500/20 rounded w-20" />
                <div className="h-4.5 bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
                <div className="space-y-1.5 pt-2">
                  <div className="h-3 bg-slate-800/50 rounded w-full" />
                  <div className="h-3 bg-slate-800/50 rounded w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
