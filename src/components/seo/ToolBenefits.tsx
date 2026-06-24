import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, EyeOff } from 'lucide-react';

export interface Benefit {
  title: string;
  description: string;
  iconName: 'privacy' | 'speed' | 'fidelity' | 'free';
}

interface ToolBenefitsProps {
  benefits?: Benefit[];
}

const DEFAULT_BENEFITS: Benefit[] = [
  {
    iconName: 'privacy',
    title: 'Absolute Privacy Sandbox',
    description: 'We process your files exclusively inside your browser’s local cache memory. No data is ever uploaded, cached, or transferred across our web servers.'
  },
  {
    iconName: 'speed',
    title: 'Instant Execution Rates',
    description: 'By bypassing server request loops and networks entirely, calculations execute on your CPU instantly with sub-millisecond return timelines.'
  },
  {
    iconName: 'fidelity',
    title: 'Preserved Formatting Quality',
    description: 'Our proprietary parsing engines read and export files, code, or image matrices with high-fidelity, preventing any blurred edges or broken layers.'
  },
  {
    iconName: 'free',
    title: '100% Free Forever',
    description: 'Get deep access to high-tier utility code without subscribing, experiencing credit limitations, or dealing with intrusive popup paywalls.'
  }
];

const ICON_MAP = {
  privacy: EyeOff,
  speed: Zap,
  fidelity: ShieldCheck,
  free: HeartHandshake
};

export default function ToolBenefits({ benefits = DEFAULT_BENEFITS }: ToolBenefitsProps) {
  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pristine System Advantages & Quality Benchmarks
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          What makes NexusUtils the ultimate hub for modern developers and publishers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((b, idx) => {
          const IconComponent = ICON_MAP[b.iconName] || ShieldCheck;
          return (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-3xs flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 group"
            >
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 text-left">
                <h3 className="text-sm font-extrabold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-405 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed font-semibold">
                  {b.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
