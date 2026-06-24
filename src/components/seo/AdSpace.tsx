import React, { useEffect, useRef } from 'react';

interface AdSpaceProps {
  id: string; // Slot ID for AdSense
  style?: React.CSSProperties;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

export default function AdSpace({ id, style, className = '', format = 'auto' }: AdSpaceProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // Attempt to load adsbygoogle on mount for production AdSense integration
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (e) {
      // Quiet fail if AdSense script is blocked or missing in development
      console.warn('AdSense load triggered but script not available:', e);
    }
  }, [id]);

  return (
    <div className={`my-8 select-none py-6 px-8 rounded-2xl border border-dashed border-slate-250 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center relative overflow-hidden transition-all hover:bg-slate-50 dark:hover:bg-slate-950/40 group ${className}`}>
      {/* Background ambient mesh */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      
      {/* Visual shine */}
      <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 animate-shine pointer-events-none" />

      {/* Real AdSense HTML structures */}
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={style || { display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-9923849500055246" // Injected production client ID
        data-ad-slot={id}
        data-ad-format={format}
        data-full-width-responsive="true"
      />

      {/* Elegant developer/visitor fallback notice */}
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[9px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-md shadow-3xs mb-2">
          ADVERTISEMENT • إعلان معتمد
        </span>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          NexusUtils High-Performance Responsive Ad Unit
        </p>
        <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 opacity-60 tracking-wider mt-1">
          slot_id_{id}_responsive_active
        </span>
      </div>
    </div>
  );
}
