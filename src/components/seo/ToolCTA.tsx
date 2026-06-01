import React from 'react';
import { Bookmark, ShieldCheck, Heart, RefreshCw } from 'lucide-react';

interface ToolCTAProps {
  toolName: string;
  onGoHome: () => void;
  onScrollToTool: () => void;
}

export default function ToolCTA({ toolName, onGoHome, onScrollToTool }: ToolCTAProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-linear-to-b from-blue-600 to-indigo-700 text-white shadow-lg text-center font-sans">
      {/* Background visual graphics */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      
      <div className="relative space-y-6 max-w-2xl mx-auto flex flex-col items-center">
        <div className="p-3 bg-white/10 text-white rounded-full">
          <Bookmark className="h-6 w-6 stroke-[2.5]" />
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Adore Using {toolName}? Bookmark Us Now!
        </h2>
        
        <p className="text-sm text-blue-100 leading-relaxed font-semibold max-w-lg">
          Press <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs">Ctrl + D</kbd> or <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs">Cmd + D</kbd> to save this high-utility tool. All operations compile locally in sub-seconds — completely private, completely serverless.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
          <button
            onClick={onScrollToTool}
            className="w-full sm:w-auto py-3 px-8 bg-white text-blue-700 font-extrabold text-sm rounded-xl hover:bg-blue-50 transition cursor-pointer shadow-xs active:translate-y-0"
          >
            Go Directly to Utility Workstation ↑
          </button>
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto py-3 px-8 bg-transparent border border-white/30 hover:border-white/60 text-white font-extrabold text-sm rounded-xl transition cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold text-blue-150 border-t border-white/10 pt-6 w-full mt-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            GDPR COMPLIANT LOCAL SANDBOX
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4 text-indigo-200 animate-spin-slow" />
            ZERO COMPUTATION SERVER LAG
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-rose-300 fill-rose-300" />
            100% FREE DIGITAL SUITE
          </span>
        </div>
      </div>
    </div>
  );
}
