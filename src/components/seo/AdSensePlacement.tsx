import { useState, useEffect } from 'react';

interface AdSenseProps {
  slotId: 'top-banner' | 'middle-inline' | 'bottom-footer' | 'faq-sidebar';
  adStyle?: any;
}

export default function AdSensePlacement({ slotId, adStyle }: AdSenseProps) {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Check if the current context is running production build or is live
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('ais-dev')) {
      setIsProduction(true);
    }
  }, []);

  const SLOT_CONFIGS = {
    'top-banner': {
      title: 'Premium Sponsored Leaderboard Banner',
      dims: 'w-full h-24 md:h-28',
      desc: 'Top of page high-CTR responsive responsive billboard format.'
    },
    'middle-inline': {
      title: 'Sponsored Native Content Banner',
      dims: 'w-full h-32 md:h-36',
      desc: 'In-article native content integration matching paragraph flows.'
    },
    'bottom-footer': {
      title: 'Sponsored Footer Board Banner',
      dims: 'w-full h-28 md:h-32',
      desc: 'Engagement-maximizing banner loaded beneath key content structures.'
    },
    'faq-sidebar': {
      title: 'Sponsored FAQ Responsive Square',
      dims: 'w-full h-48 md:h-52',
      desc: 'Contextual sidebar display optimized for frequently asked questions.'
    }
  };

  const config = SLOT_CONFIGS[slotId];

  // If in production, render real Google AdSense structural tags
  if (isProduction) {
    return (
      <div className="adsense-block my-8 max-w-full overflow-hidden flex justify-center text-center self-center" style={adStyle} id={`ad-wrapper-${slotId}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', margin: '0 auto', ...adStyle }}
          data-ad-client="ca-pub-PROD_ADSENSE_CLIENT_ID_PLACEHOLDER"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>
      </div>
    );
  }

  // Otherwise, render a beautifully styled, high-contrast placeholder
  return (
    <div 
      id={`mock-adsense-${slotId}`} 
      className={`${config.dims} my-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/45 p-4 flex flex-col justify-center items-center text-center select-none overflow-hidden hover:bg-slate-100/50 dark:hover:bg-slate-900/60 transition relative duration-200`}
    >
      <div className="absolute top-2 right-3 text-[8px] font-bold tracking-widest uppercase text-slate-450 dark:text-slate-500 font-mono bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
        Sponsor Ads
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        <h4 className="text-xs font-black text-slate-800 dark:text-slate-300 tracking-wide font-mono uppercase">
          {config.title}
        </h4>
      </div>
      <p className="text-[10px] text-slate-450 dark:text-slate-550 max-w-md font-semibold select-all font-sans leading-relaxed">
        {config.desc} <span className="text-zinc-400 dark:text-zinc-600">({slotId})</span>
      </p>
    </div>
  );
}
