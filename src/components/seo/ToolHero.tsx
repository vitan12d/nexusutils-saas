import React from 'react';
import { Play, CheckCircle, Shield, Sparkles } from 'lucide-react';

interface ToolHeroProps {
  title: string;
  description: string;
  toolName: string;
  toolSummary: string;
  onLaunchClick: () => void;
}

export default function ToolHero({
  title,
  description,
  toolName,
  toolSummary,
  onLaunchClick
}: ToolHeroProps) {
  return (
    <header className="space-y-6">
      {/* Search-Engine Optimized Micro Heading */}
      <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider select-none animate-pulse">
        <Sparkles className="h-3 w-3 inline-block text-blue-500" />
        <span>SEO Verified Productivity Node</span>
      </div>

      {/* Target Keyword Optimized Main H1 Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight font-sans">
        {title}
      </h1>

      {/* Content-rich, readable first paragraph containing target keyword */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl font-medium">
        {description}
      </p>

      {/* Hero CTA Box */}
      <div className="relative rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950/60 overflow-hidden shadow-2xs group flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-[280px] h-[160px] bg-blue-505/10 dark:bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
        
        <div className="space-y-3.5 flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <span>🔥</span>
            <span>Launch {toolName} Workspace</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold max-w-lg">
            {toolSummary} This tool runs entirely within your browser for premium privacy.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[10px] text-slate-400 font-black select-none pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              100% FREE UTILITY
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-indigo-500" />
              GDPR & HIPAA SECURE
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              OFFLINE CLIENT-SIDE PROCESSING
            </span>
          </div>
        </div>

        <button
          onClick={onLaunchClick}
          className="w-full sm:w-auto py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-md transition duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Use Utility Online</span>
          <Play className="h-4 w-4 fill-white" />
        </button>
      </div>
    </header>
  );
}
