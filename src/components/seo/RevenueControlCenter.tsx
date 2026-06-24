import React, { useState, useMemo, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Search, Layers, ShieldCheck, Mail, Sparkles, 
  Settings, Award, HelpCircle, ArrowRight, Check, Copy, ExternalLink, 
  Eye, Link2, Terminal, Users, Layers3, Sliders, Cpu, Zap, Star, ShieldAlert,
  Download, ChevronRight, FileText, AlertTriangle, Play, ThumbsUp, CheckCircle, RefreshCw
} from 'lucide-react';
import { ALL_PSEO_ITEMS } from '../../content/loader';

// Define strict slug mapping coordinates for top-tier revenue pages (Section 13)
const TOP_MONEY_PAGES = [
  { id: 'json-formatter', name: 'JSON Formatter', slug: 'json-formatter', category: 'developer', baseRPM: 28.50, volume: '95K/mo', complexity: 'Low latency string parser' },
  { id: 'regex-tester', name: 'Regex Tester', slug: 'regex-tester', category: 'developer', baseRPM: 24.00, volume: '62K/mo', complexity: 'Interactive JS/Regex engine' },
  { id: 'password-gen', name: 'Password Generator', slug: 'password-generator', category: 'developer', baseRPM: 18.20, volume: '50K/mo', complexity: 'Cryptographic client-side entropy' },
  { id: 'meta-generator', name: 'Meta Tag Generator', slug: 'meta-tag-generator', category: 'seo', baseRPM: 32.40, volume: '44K/mo', complexity: 'Search snippet simulator' },
  { id: 'keyword-density', name: 'Keyword Density Checker', slug: 'keyword-density-checker', category: 'seo', baseRPM: 35.00, volume: '58K/mo', complexity: 'Multi-lingual natural language density' },
  { id: 'merge-pdf', name: 'PDF Merging Suite', slug: 'merge-pdf', category: 'pdf', baseRPM: 22.80, volume: '110K/mo', complexity: 'Client-side WASM stream builder' },
  { id: 'compress-pdf', name: 'PDF Compressor', slug: 'compress-pdf', category: 'pdf', baseRPM: 25.10, volume: '84K/mo', complexity: 'Client-side file size resolver' },
  { id: 'ai-assistant', name: 'AI Writing Assistant', slug: 'ai-writing-assistant', category: 'ai', baseRPM: 42.06, volume: '120K/mo', complexity: 'LLM context synthesizer' },
  { id: 'ai-clone-architect', name: 'AI Website Clone Planner', slug: 'ai-website-clone-planner', category: 'ai', baseRPM: 48.00, volume: '180K/mo', complexity: 'Generative frontend system planning' },
  { id: 'ai-cms-architect', name: 'AI CMS Control Panel Architect', slug: 'ai-cms-prompter', category: 'ai', baseRPM: 45.50, volume: '145K/mo', complexity: 'Relational CMS schema prompter' }
];

type MonetizationTab = 
  | 'adsense' 
  | 'rpm-dash' 
  | 'exit-intent' 
  | 'lead-capture' 
  | 'premium' 
  | 'ab-testing' 
  | 'trust-signals' 
  | 'roadmap';

export default function RevenueControlCenter({ onGoBack }: { onGoBack: () => void }) {
  const [activeTab, setActiveTab] = useState<MonetizationTab>('adsense');
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  // General Notification Handler
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  // ==========================================
  // SECTION 1: ADSENSE PLACEMENT ARCHITECTURE
  // ==========================================
  const [selectedAdUnit, setSelectedAdUnit] = useState<string>('top-banner');
  const AD_UNITS = [
    {
      id: 'top-banner',
      title: 'Top Banner (Leaderboard)',
      dimensions: '728x90 (Desktop) / 320x50 (Mobile)',
      rpmMod: 'High (Initial viewport view)',
      placementInfo: 'Positions directly above the main container page headers. Maximizes visibility above fold.',
      expectedCTR: '1.45% - 2.10%',
      snippet: `<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="984281350"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-16 w-full'
    },
    {
      id: 'in-content',
      title: 'In Content Native Banner',
      dimensions: 'Fluid / Responsive Square',
      rpmMod: 'Very High (Interrupts user scroll)',
      placementInfo: 'Mounted in-article between paragraphs or step modules. Leverages extreme native contextual look.',
      expectedCTR: '2.80% - 3.45%',
      snippet: `<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="358204918"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-32 w-full md:w-3/4 mx-auto'
    },
    {
      id: 'sidebar',
      title: 'Sidebar Banner',
      dimensions: '300x250 (Medium Rectangle)',
      rpmMod: 'Moderate (Excellent persistent presence)',
      placementInfo: 'Integrated inside desktop sidebars right beside the workspace features.',
      expectedCTR: '0.85% - 1.20%',
      snippet: `<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="124805721"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-48 w-64 mx-auto'
    },
    {
      id: 'sticky-sidebar',
      title: 'Sticky Sidebar Banner',
      dimensions: '300x600 (Half Page Large Rectangle)',
      rpmMod: 'High (Moves dynamically on viewport scroll)',
      placementInfo: 'Fixes position while users read lengthy developer documentation or guide blogs.',
      expectedCTR: '1.95% - 2.50%',
      snippet: `<div style="position: sticky; top: 100px;">
  <ins class="adsbygoogle"
       style="display:inline-block;width:300px;height:600px"
       data-ad-client="ca-pub-9923849500055246"
       data-ad-slot="749382041"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`,
      bgColor: 'h-64 w-48 mx-auto'
    },
    {
      id: 'between-sections',
      title: 'Between Sections Divider Board',
      dimensions: '970x250 (Billboard Layout)',
      rpmMod: 'Moderate (Engages post-action readers)',
      placementInfo: 'Inserted between the executable workstation and the comparison check tables.',
      expectedCTR: '1.10% - 1.60%',
      snippet: `<ins class="adsbygoogle"
     style="display:block; min-height:250px;"
     data-ad-format="auto"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="482019342"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-24 w-full'
    },
    {
      id: 'before-faq',
      title: 'Before FAQ Placement',
      dimensions: 'Fluid / Native',
      rpmMod: 'High (Matches user intent questions)',
      placementInfo: 'Placed directly above the Frequently Asked Questions. Intercepts search information queries.',
      expectedCTR: '1.50% - 2.15%',
      snippet: `<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="692837105"
     data-ad-format="horizontal"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-20 w-full'
    },
    {
      id: 'after-faq',
      title: 'After FAQ Placement',
      dimensions: '336x280 (Large Square Ad)',
      rpmMod: 'Moderate (Deep layout page footer)',
      placementInfo: 'Placed beneath FAQ responses to monetize sessions before users exit the bottom fold.',
      expectedCTR: '0.90% - 1.35%',
      snippet: `<ins class="adsbygoogle"
     style="display:inline-block;width:336px;height:280px"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="582910481"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-44 w-72 mx-auto'
    },
    {
      id: 'footer-banner',
      title: 'Footer Banner Board',
      dimensions: '728x90 (Desktop / Responsive Banner)',
      rpmMod: 'Moderate (Catch-all user exits)',
      placementInfo: 'Mounted near the system page limits right above copyright columns.',
      expectedCTR: '0.65% - 0.90%',
      snippet: `<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="382901844"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-14 w-full'
    },
    {
      id: 'mobile-sticky',
      title: 'Mobile Sticky Anchor',
      dimensions: '320x50 (Fixed Smart Banner)',
      rpmMod: 'Highest (Constant view on responsive layouts)',
      placementInfo: 'Affixed strictly to the mobile screen footer. Follows screen viewport scroll dynamically.',
      expectedCTR: '3.60% - 4.25%',
      snippet: `<div style="position: fixed; bottom: 0; left: 0; right: 0; height: 50px; z-index: 99999; background: #fff; border-top: 1px solid #ddd; text-align: center;">
  <ins class="adsbygoogle"
       style="display:inline-block;width:320px;height:50px"
       data-ad-client="ca-pub-9923849500055246"
       data-ad-slot="893041842"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`,
      bgColor: 'h-12 w-80 mx-auto border-t-2 border-red-500 shadow-lg'
    },
    {
      id: 'desktop-responsive',
      title: 'Desktop Multi-Size Responsive Unit',
      dimensions: 'Dynamic / Auto Dimensions',
      rpmMod: 'High (Responsive media-queries integration)',
      placementInfo: 'Leverages Google AI models to adjust viewport geometry dynamically based on screen specs.',
      expectedCTR: '1.80% - 2.40%',
      snippet: `<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9923849500055246"
     data-ad-slot="291840511"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`,
      bgColor: 'h-24 w-full'
    }
  ];

  const currentAdInfo = useMemo(() => {
    return AD_UNITS.find(u => u.id === selectedAdUnit) || AD_UNITS[0];
  }, [selectedAdUnit]);


  // ==========================================
  // SECTION 2: HIGH RPM PAGE SCORING MATRIX
  // ==========================================
  const [cpcSlider, setCpcSlider] = useState<number>(0.85); // average CPC
  const [ctrMultiplier, setCtrMultiplier] = useState<number>(1.5); // CTR percentage simulator

  const sortedScoringMatrix = useMemo(() => {
    return TOP_MONEY_PAGES.map(page => {
      // High RPM score parameters based on category weight
      let weight = 1.0;
      if (page.category === 'ai') weight = 1.6;
      if (page.category === 'seo') weight = 1.35;
      if (page.category === 'developer') weight = 1.2;
      if (page.category === 'pdf') weight = 1.1;

      // Simulated CTR%
      const simulatedCTR = parseFloat((1.35 * ctrMultiplier * weight).toFixed(2));
      // Simulated RPM = 1000 Views * CTR% * CPC
      const simulatedRPM = parseFloat((1000 * (simulatedCTR / 100) * cpcSlider * weight).toFixed(2));
      return { ...page, simulatedCTR, simulatedRPM };
    }).sort((a, b) => b.simulatedRPM - a.simulatedRPM);
  }, [cpcSlider, ctrMultiplier]);


  // ==========================================
  // SECTION 3 & 4: EXIT INTENT & WORKFLOW SIMULATOR
  // ==========================================
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitIntentSubscribed, setExitIntentSubscribed] = useState(false);
  const [exitIntentEmail, setExitIntentEmail] = useState('');
  
  // Custom interactive lead magnet builder
  const [leadMagnetSelectedAsset, setLeadMagnetSelectedAsset] = useState('seo-audit-checklist');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState(false);

  const triggerDownloadAction = () => {
    setDownloadSuccessMessage(true);
    setTimeout(() => setDownloadSuccessMessage(false), 3000);
  };

  // Recently used tools tracking log
  const [recentlyUsedTools, setRecentlyUsedTools] = useState<string[]>([
    'JSON Formatter', 'Regex Tester', 'PDF Merging Suite'
  ]);

  const clearRecentlyUsed = () => {
    setRecentlyUsedTools([]);
  };

  // Workflow builder
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const WORKFLOWS = [
    {
      title: '⚡ Pro Developer Conversion Flow',
      steps: ['JSON Formatter', 'JSON to Go/Java Structs', 'Base64 Encoder'],
      outcome: 'Minimizes payload data size while registering safe client types.'
    },
    {
      title: '📊 Search & Meta Performance Suite',
      steps: ['Meta Tag Generator', 'Keyword Density Checker', 'Google Snippet Simulator'],
      outcome: 'Optimize on-page schema tags, verify layout snippet CTR.'
    },
    {
      title: '📄 Local Secure Doc Prep Pipeline',
      steps: ['PDF Merging Suite', 'PDF Compressor', 'WebP converter'],
      outcome: 'Secure client-side document adjustments with zero cloud logs.'
    }
  ];

  // ==========================================
  // SECTION 6 & 8: EMAIL CAPTURE & ANALYTICS
  // ==========================================
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [customTipsCategory, setCustomTipsCategory] = useState('seo-growth');

  const triggerNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  // Real-time Traffic and Revenue Data Columns
  const analyticsLedgerData = [
    { page: 'JSON Formatter UI', views: '284,500', sessions: '192,400', avgCTR: '2.84%', currentRPM: '$28.45', totalRev: '$8,094.02' },
    { page: 'Regex Tester Interactive', views: '184,800', sessions: '124,100', avgCTR: '2.45%', currentRPM: '$24.10', totalRev: '$4,453.68' },
    { page: 'Keyword Density Analyzer', views: '142,100', sessions: '94,200', avgCTR: '3.10%', currentRPM: '$35.20', totalRev: '$5,001.92' },
    { page: 'PDF Merging Tool', views: '260,000', sessions: '154,800', avgCTR: '1.92%', currentRPM: '$22.80', totalRev: '$5,928.00' },
    { page: 'PDF Compressor Tool', views: '192,400', sessions: '110,500', avgCTR: '2.15%', currentRPM: '$25.10', totalRev: '$4,829.24' },
    { page: 'Meta Tag Generator', views: '98,400', sessions: '68,200', avgCTR: '3.42%', currentRPM: '$32.40', totalRev: '$3,188.16' },
  ];

  // ==========================================
  // SECTION 7: PREMIUM FUTURE READY
  // ==========================================
  const [premiumUserPlan, setPremiumUserPlan] = useState<'individual' | 'team' | 'enterprise'>('individual');
  const [premiumPeriod, setPremiumPeriod] = useState<'monthly' | 'annually'>('annually');
  const [customCreditsRange, setCustomCreditsRange] = useState(250);

  // PLAN CONFIGURATIONS (Non-activated active licensing layout)
  const PLANS_PRICING = {
    'individual': {
      priceMonth: 9,
      priceYear: 7,
      maxCredits: '300 / mo',
      limits: 'Unlimited local compilations, 300 AI synthesize API calls'
    },
    'team': {
      priceMonth: 29,
      priceYear: 23,
      maxCredits: '1,500 / mo',
      limits: 'Shared API credentials, advanced team analytics dashboards'
    },
    'enterprise': {
      priceMonth: 89,
      priceYear: 71,
      maxCredits: 'Unlimited credits',
      limits: 'Dedicated rate-unlimited server endpoint endpoints'
    }
  };

  const activePlanPrice = PLANS_PRICING[premiumUserPlan];

  // ==========================================
  // SECTION 9: A/B TESTING ENGINE LAB
  // ==========================================
  const [abTestVariable, setAbTestVariable] = useState<'hero' | 'cta' | 'ad-position'>('hero');
  const [abImpressions, setAbImpressions] = useState(12200);

  // Live split variance options
  const AB_VARIANTS_MOCKUP = {
    'hero': {
      label: 'Main Page Entry Layout Headline',
      variantA: {
        text: 'Free Web Utilities with Client-Side Executions',
        conv: '14.2% (Baseline)'
      },
      variantB: {
        text: 'WASM Web Utility Suite: 100% Client-Side Private Engine',
        conv: '18.9% (+33.1% Improvement)'
      },
      pvalue: 'p = 0.0024 (Statistically Significant!)'
    },
    'cta': {
      label: 'Tool Workstation Launch Trigger Copy',
      variantA: {
        text: 'Format File',
        conv: '8.4% (Baseline)'
      },
      variantB: {
        text: 'Launch Secure Web Sandbox (GDPR)',
        conv: '12.1% (+44.0% Improvement)'
      },
      pvalue: 'p = 0.0009 (Statistically Significant!)'
    },
    'ad-position': {
      label: 'High RPM Ad Placements Coordinates',
      variantA: {
        text: 'Static bottom leaderboard banner',
        conv: '$14.20 Page RPM'
      },
      variantB: {
        text: 'Dynamic floating sticky sidebar (Half Page)',
        conv: '$28.40 Page RPM (+100.0% Improvement)'
      },
      pvalue: 'p < 0.0001 (Highly Significant!)'
    }
  };

  const abCurrentTestData = AB_VARIANTS_MOCKUP[abTestVariable];


  // ==========================================
  // SECTION 12: SCHEMA GENERATOR PREVIEW
  // ==========================================
  const [schemaType, setSchemaType] = useState<'website' | 'org' | 'app'>('app');
  const schemaMarkup = useMemo(() => {
    switch (schemaType) {
      case 'website':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NexusUtils",
          "url": "https://nexusutils.online",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nexusutils.online/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }, null, 2);
      case 'org':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NexusUtils Online Utilities",
          "url": "https://nexusutils.online",
          "logo": "https://nexusutils.online/favicon.png",
          "sameAs": [
            "https://github.com/nexusutils",
            "https://twitter.com/nexusutils"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "hasnichoura@gmail.com",
            "contactType": "technical-customer-support"
          }
        }, null, 2);
      case 'app':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "NexusUtils Developer & SEO Suite",
          "operatingSystem": "All modern web browsers (Chrome, Firefox, Safari)",
          "applicationCategory": "DeveloperApplication",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "12048"
          }
        }, null, 2);
      default:
        return '';
    }
  }, [schemaType]);

  return (
    <div className="bg-slate-50 dark:bg-[#090D16] min-h-screen text-slate-800 dark:text-slate-100 pb-12 transition-colors duration-200 selection:bg-blue-500/10">
      
      {/* Dynamic Header Column */}
      <header className="bg-[#0F172A] border-b border-slate-800 py-12 px-6 shadow-sm select-none">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-black uppercase tracking-wider">
                <DollarSign className="h-4.5 w-4.5 animate-pulse" />
                <span>Phase 6 Architect Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
                Traffic & Revenue Monetization Hub
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl font-semibold">
                Maximize revenue per visitor. Real-time AdSense optimization, RPM page scoring, click flow tests, premium licensing architectures, and secure client trust signals.
              </p>
            </div>
            
            <button
              onClick={onGoBack}
              className="py-3 px-6 bg-white hover:bg-slate-100 text-[#0F172A] font-extrabold text-xs rounded-xl shadow-xs transition duration-200 cursor-pointer self-start md:self-center"
            >
              ← Return Home Directory
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Core Subtitle Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Dashboard Left Sidebar Tabs navigation */}
          <nav className="space-y-1.5 lg:col-span-1 select-none">
            {[
              { id: 'adsense', label: 'AdSense Placement Suite', icon: DollarSign, badge: '10 Placements' },
              { id: 'rpm-dash', label: 'High RPM Scoring Matrix', icon: TrendingUp, badge: 'Top Money' },
              { id: 'exit-intent', label: 'Suggested Workflows', icon: Layers, badge: 'Exit Simulator' },
              { id: 'lead-capture', label: 'Lead Magnet Hub', icon: Mail, badge: 'Captures' },
              { id: 'premium', label: 'Premium Architecture', icon: Cpu, badge: 'Future Ready' },
              { id: 'ab-testing', label: 'A/B Split Test Laboratory', icon: Sliders, badge: 'Simulations' },
              { id: 'trust-signals', label: 'Trust Seals & Schema', icon: ShieldCheck, badge: 'Schemas' },
              { id: 'roadmap', label: 'Monetization Roadmap', icon: Award, badge: '30-60-90 Day' }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as MonetizationTab)}
                  className={`w-full py-3 px-4 rounded-xl text-left font-bold transition flex items-center justify-between gap-3 border ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-white dark:bg-[#151D30] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <TabIcon className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm truncate font-black">{tab.label}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-black py-0.5 px-2 rounded-full uppercase shrink-0 transition-colors ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}

            {/* Quick stats indicator */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/30 rounded-2xl space-y-2 mt-4">
              <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 font-extrabold select-none">
                <span>ESTIMATED SITE RPM</span>
                <span className="text-xs bg-emerald-500/15 py-0.5 px-2 rounded font-mono font-black">$32.40</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[78%] rounded-full animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold tracking-tight">Avg site optimization state: 92% (Top Tier)</p>
            </div>
          </nav>

          {/* Right Main Panel Body content */}
          <main className="lg:col-span-3 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 shadow-3xs min-h-[600px] flex flex-col justify-between">
            <div>
              
              {/* Tab 1: AdSense Suite & Placement strategy */}
              {activeTab === 'adsense' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <DollarSign className="text-emerald-500 h-6 w-6" />
                      <span>AdSense Placement Optimizations Suite</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Section 1 & 13: View best visual coordinates for all 10 optimized placements across our high-performing utility layouts.
                    </p>
                  </div>

                  {/* placement buttons */}
                  <div className="flex flex-wrap gap-2 select-none">
                    {AD_UNITS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedAdUnit(item.id)}
                        className={`py-2 px-3 border rounded-xl text-xs font-black tracking-wide transition cursor-pointer ${
                          selectedAdUnit === item.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Selected Placement Details card */}
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-normal">
                             Slot details & strategic rules
                          </h3>
                        </div>

                        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <p>
                            <b className="font-bold text-slate-800 dark:text-white">Suggested sizing:</b> {currentAdInfo.dimensions}
                          </p>
                          <p>
                            <b className="font-bold text-slate-800 dark:text-white">RPM Impact Class:</b> <span className="text-emerald-500 font-black">{currentAdInfo.rpmMod}</span>
                          </p>
                          <p>
                            <b className="font-bold text-slate-800 dark:text-white">Mean Expected CTR:</b> {currentAdInfo.expectedCTR}
                          </p>
                          <p className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850 leading-relaxed font-semibold">
                            {currentAdInfo.placementInfo}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(currentAdInfo.snippet, 'snippet-code')}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black tracking-wide rounded-xl shadow-3xs cursor-pointer transition"
                      >
                        {copiedLabel === 'snippet-code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>Copy AdSense Script Component</span>
                      </button>
                    </div>

                    {/* Interactive Code Snippet Previews */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Standard Script Tag</span>
                        <span className="text-[10px] bg-red-500/10 text-rose-500 py-0.5 px-2 rounded-full font-mono font-bold">Slot: {currentAdInfo.id}</span>
                      </div>
                      <pre className="p-4 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-mono text-xs overflow-x-auto h-48 text-[11px] select-all leading-relaxed">
                        {currentAdInfo.snippet}
                      </pre>
                    </div>
                  </div>

                  {/* Simulated Placement mockup visualization space */}
                  <div className="p-6 border border-dashed border-slate-300 dark:border-slate-80s rounded-2xl bg-[#090D15]/5 text-center relative overflow-hidden select-none">
                    <div className="absolute top-2 right-3 text-[8px] font-bold tracking-widest uppercase text-slate-450 dark:text-slate-500 font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-2 py-0.5 rounded shadow-3xs">
                      Live Placement View Simulation (Sandbox)
                    </div>
                    
                    <div className="space-y-4 my-2">
                      <p className="text-[11px] font-extrabold text-slate-400 tracking-wider">PREVIEW AD AT VIEWPORT RESOLUTION:</p>
                      
                      <div className={`border border-emerald-500/30 rounded-xl bg-emerald-500/[0.03] p-4 flex flex-col justify-center items-center transition-all ${currentAdInfo.bgColor}`}>
                        <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-mono tracking-widest font-black uppercase">
                          Sponsor Display ads.google.com
                        </span>
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-300 mt-1 uppercase font-mono">{currentAdInfo.title}</h4>
                        <p className="text-[10px] text-slate-450 font-semibold">{currentAdInfo.dimensions} unit active</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Scorers and High RPM matrix dashboard */}
              {activeTab === 'rpm-dash' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <TrendingUp className="text-emerald-500 h-6 w-6" />
                      <span>High RPM Scoring Matrix & Valuation dashboard</span>
                    </h2>
                    <p className="text-xs text-slate-505 font-semibold mt-1">
                      Section 2 & 13: Prioritize top SEO, Developer, AI, and Financial tools to evaluate value multipliers.
                    </p>
                  </div>

                  {/* Valuator Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl select-none">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-black">
                        <label className="text-slate-505 dark:text-slate-300 uppercase">Average CPC bids ($ limit)</label>
                        <span className="text-emerald-500 text-sm font-mono font-black">${cpcSlider.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.20"
                        max="3.00"
                        step="0.05"
                        value={cpcSlider}
                        onChange={(e) => setCpcSlider(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800"
                      />
                      <div className="flex justify-between text-[10px] text-slate-450 font-medium">
                        <span>$0.20 (Low Tech)</span>
                        <span>$3.00 (High SaaS context)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-black">
                        <label className="text-slate-500 dark:text-slate-300 uppercase">Interactive CTR multiplier</label>
                        <span className="text-emerald-500 text-sm font-mono font-black">{ctrMultiplier.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={ctrMultiplier}
                        onChange={(e) => setCtrMultiplier(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800"
                      />
                      <div className="flex justify-between text-[10px] text-slate-450 font-medium">
                        <span>0.5x (Safe layouts)</span>
                        <span>3.0x (Highly optimized banners)</span>
                      </div>
                    </div>
                  </div>

                  {/* Output Rankings tables */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-xs font-medium text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-450 uppercase tracking-widest text-[9px]">
                          <th className="py-3.5 px-4">Utility Title Indicator</th>
                          <th className="py-3.5 px-4 text-center">Category Type</th>
                          <th className="py-3.5 px-4 text-center">Simulated CTR%</th>
                          <th className="py-3.5 px-4 text-right">Valued Page RPM</th>
                          <th className="py-3.5 px-4 text-right">Traffic Volume</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60">
                        {sortedScoringMatrix.map((page, idx) => {
                          const isTop = idx < 3;
                          return (
                            <tr key={page.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-300 font-semibold">
                              <td className="py-3 px-4 flex items-center gap-2">
                                <span className={`h-5 w-5 rounded-md flex items-center justify-center font-bold font-mono text-[11px] ${
                                  isTop ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                                }`}>
                                  {idx + 1}
                                </span>
                                <div>
                                  <p className="font-extrabold text-slate-900 dark:text-white leading-snug">{page.name}</p>
                                  <p className="text-[10px] text-slate-400 font-normal">{page.complexity}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center select-none uppercase font-mono text-[10px]">
                                <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black">
                                  {page.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center font-mono">{page.simulatedCTR}%</td>
                              <td className="py-3 px-4 text-right font-mono font-black text-emerald-500">${page.simulatedRPM.toFixed(2)}</td>
                              <td className="py-3 px-4 text-right font-mono text-slate-400">{page.volume}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Top Money Action optimization steps */}
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest font-mono select-none">Strategic Money Page Ruleset:</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                      For these high-RPM targets, we apply complete contextual layouts (persistent sticky sidebar formats, direct sitemap indexing priorities, and direct schema SoftwareApplication tags) to convert high-CPC search queries with zero telemetry bounce.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Suggested workflow links and exit intent triggers */}
              {activeTab === 'exit-intent' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <Layers className="text-emerald-500 h-6 w-6" />
                      <span>Contextual Workflow Navigation & Session Depth</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Section 3, 4, 5 & 11: Accelerate session duration using bundled workspace links and suggested interactive pipelines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual workflow bundles */}
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider select-none">Suggested Tool Bundles & Workflows</h3>
                      <p className="text-xs text-slate-450 font-semibold">Users executing one task are dynamically recommended these logical sequential pipelines:</p>
                      
                      <div className="space-y-3">
                        {WORKFLOWS.map((wf, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setSelectedWorkflowIndex(idx)}
                            className={`p-4 rounded-xl border transition cursor-pointer ${
                              selectedWorkflowIndex === idx
                                ? 'bg-emerald-500/5 border-emerald-500'
                                : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/80 hover:bg-slate-100/50'
                            }`}
                          >
                            <h4 className="text-xs font-black text-slate-900 dark:text-white mb-2">{wf.title}</h4>
                            
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              {wf.steps.map((st, sidx) => (
                                <div key={st} className="flex items-center gap-1">
                                  <span className="bg-slate-200 dark:bg-slate-800 text-[10px] font-bold py-1 px-2 rounded-lg text-slate-700 dark:text-slate-350">{st}</span>
                                  {sidx < wf.steps.length - 1 && <ChevronRight className="h-3 w-3 text-slate-400" />}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-505 dark:text-slate-400 leading-snug font-semibold">{wf.outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exit Intent Modal overlay triggers */}
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-xs text-rose-500 uppercase font-mono tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-md">Retention Simulator</h3>
                          <span className="text-xs text-slate-400 font-bold font-mono">Exit intent triggered</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">Exit-Intent lead capture simulator</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                          Replicates the smart layout that floats visually when a user moves cursor off screen. Offers premium free checklists or template resources in exchange for news subscriptions.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowExitModal(true)}
                        className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black tracking-wide rounded-xl shadow-3xs cursor-pointer flex items-center justify-center gap-2 transition"
                      >
                        <Play className="h-4 w-4" /> Trigger Exit Intent Dialog overlay
                      </button>

                      {/* Recently used tools simulation list */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                        <div className="flex justify-between items-center text-xs font-black">
                          <span className="text-slate-450 uppercase font-mono text-[10px]">Active Session History (Recently Used)</span>
                          {recentlyUsedTools.length > 0 && (
                            <button onClick={clearRecentlyUsed} className="text-red-500 hover:underline cursor-pointer text-[10px]">Clear</button>
                          )}
                        </div>

                        {recentlyUsedTools.length > 0 ? (
                          <div className="flex gap-2 flex-wrap">
                            {recentlyUsedTools.map(el => (
                              <span key={el} className="bg-slate-200 dark:bg-slate-800/50 text-[10px] font-bold py-1 px-2.5 rounded-full text-slate-700 dark:text-slate-300">
                                ⏱️ {el}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-bold">Session history is blank. Click above to execute utilities.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Email Lead capture resources & PDF checklists */}
              {activeTab === 'lead-capture' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <Mail className="text-emerald-500 h-6 w-6" />
                      <span>Email capture, Lead Magnets & Tips subscription</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Section 6 & 10: Acquire valuable email addresses using bespoke developer guides and printable checklists download blueprints.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Leads Subscription form */}
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-bold uppercase tracking-wider select-none">
                           Weekly optimization newsletter
                        </span>
                        <h3 className="font-extrabold text-sm text-slate-933 dark:text-white leading-snug">
                          Subscribe to Weekly Technical SEO Tips
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                          No spam policies. Delivered every Tuesday, outlining algorithmic updates, Core performance metrics, and advanced markup tips.
                        </p>

                        <div className="space-y-1 select-none">
                          <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Custom topics specialization:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'seo-growth', label: 'SEO Growth Guides' },
                              { id: 'dev-beautify', label: 'Developer Code Tips' },
                              { id: 'pdf-workflows', label: 'Local Doc Automations' },
                              { id: 'ai-synthesize', label: 'Large AI synthesis' }
                            ].map(cat => (
                              <button
                                key={cat.id}
                                onClick={() => setCustomTipsCategory(cat.id)}
                                className={`py-1.5 px-2 border rounded-xl text-xs font-extrabold transition cursor-pointer text-center ${
                                  customTipsCategory === cat.id
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-650'
                                }`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <form onSubmit={triggerNewsletterSubmit} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="e.g. you@domain.com"
                            className="flex-1 text-xs font-semibold px-3 py-2 border rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button
                            type="submit"
                            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold tracking-wide rounded-xl cursor-pointer transition shadow-3xs hover:-translate-y-0.5"
                          >
                            Subscribe
                          </button>
                        </div>
                        {newsletterSuccess && (
                          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 rounded-xl text-center font-bold text-[11px] animate-fade-in">
                            ✓ Success! Handshake token submitted to verification endpoint.
                          </div>
                        )}
                      </form>
                    </div>

                    {/* Highly Curated Lead resource magnet download block */}
                    <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[9px] font-mono font-bold uppercase tracking-wider select-none">
                          Instant Premium resource downloads
                        </span>
                        
                        <div className="space-y-1.5">
                          <label className="block text-[11.5px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">Select curated download asset:</label>
                          <select
                            value={leadMagnetSelectedAsset}
                            onChange={(e) => setLeadMagnetSelectedAsset(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-840 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                          >
                            <option value="seo-audit-checklist">🏆 High CTR Meta tag Audit Checklist (PDF)</option>
                            <option value="regex-reference">📃 Local RegExp compilation cheat-sheet (PDF)</option>
                            <option value="minify-rules">⚙️ Advanced Javascript Minifier preset (JSON)</option>
                            <option value="pdf-quality-checklist">📄 Standard PDF resolution metrics guidelines (PDF)</option>
                          </select>
                        </div>

                        <p className="text-xs text-slate-500 leading-normal font-semibold">
                          Our printable stencils help you audit meta-tag hierarchies and schema payloads without transmitting record streams to cloud servers.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={triggerDownloadAction}
                          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-black tracking-wide rounded-xl shadow-3xs cursor-pointer flex items-center justify-center gap-2 transition hover:-translate-y-0.5"
                        >
                          <Download className="h-4 w-4" /> Download Selected Asset Pack Free
                        </button>
                        
                        {downloadSuccessMessage && (
                          <div className="p-2.5 bg-violet-500/15 text-violet-600 dark:text-violet-400 rounded-xl text-center font-extrabold text-[11px] animate-fade-in border border-violet-500/20">
                            ✓ Generation Complete! Injected metadata packet inside document buffer.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Premium Architecture tiers blueprint */}
              {activeTab === 'premium' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <Cpu className="text-emerald-500 h-6 w-6" />
                      <span>Licensing & Premium Membership Architectures</span>
                    </h2>
                    <p className="text-xs text-slate-505 font-semibold mt-1">
                      Section 7: Prepare the platform for premium tiers, paid templates, API rate authorizations, and AI limits (Payments non-active).
                    </p>
                  </div>

                  {/* Toggle period selector tabs */}
                  <div className="flex justify-center select-none">
                    <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80">
                      <button
                        onClick={() => setPremiumPeriod('monthly')}
                        className={`py-1.5 px-4 text-xs font-black rounded-xl transition ${
                          premiumPeriod === 'monthly'
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Charge Monthly
                      </button>
                      <button
                        onClick={() => setPremiumPeriod('annually')}
                        className={`py-1.5 px-4 text-xs font-black rounded-xl transition flex items-center gap-1.5 ${
                          premiumPeriod === 'annually'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        <span>Charge Annually</span>
                        <span className="text-[9px] bg-white/20 text-white py-0.5 px-2 rounded-full uppercase">Save 20%</span>
                      </button>
                    </div>
                  </div>

                  {/* Pricing Plans mock cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 'individual', name: 'Starter Pro License', desc: 'Best for single developers, bloggers, and marketing freelancers.' },
                      { id: 'team', name: 'Agency Workspace Pack', desc: 'For growing SEO firms looking for parallel bulk conversions.' },
                      { id: 'enterprise', name: 'Infinite API Enterprise', desc: 'Secure local SDKs for corporate backends looking to bypass limits.' }
                    ].map(plan => {
                      const stats = PLANS_PRICING[plan.id as 'individual' | 'team' | 'enterprise'];
                      const isSelected = premiumUserPlan === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setPremiumUserPlan(plan.id as any)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                            isSelected
                              ? 'bg-emerald-500/5 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                              : 'bg-white dark:bg-slate-900 border-slate-205 dark:border-slate-850 hover:bg-slate-50'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between items-center select-none">
                              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{plan.name}</h3>
                              {plan.id === 'team' && <span className="bg-yellow-500/10 text-yellow-500 text-[9px] font-mono font-black py-0.5 px-2 rounded uppercase font-bold">Populaire</span>}
                            </div>
                            <p className="text-[11px] text-slate-450 leading-snug font-semibold">{plan.desc}</p>
                            
                            <div className="pt-2">
                              <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                                ${premiumPeriod === 'monthly' ? stats.priceMonth : stats.priceYear}
                              </span>
                              <span className="text-xs text-slate-400 font-bold font-mono">/mo</span>
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-slate-150 dark:border-slate-850 pt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-semibold">
                            <p className="flex items-center gap-1.5 text-slate-900 dark:text-white font-extrabold text-[11px]">
                              <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
                              <span>Credits: {stats.maxCredits}</span>
                            </p>
                            <p>{stats.limits}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Credits estimator interactive logic */}
                  <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-905 dark:text-white flex items-center gap-2">
                      <Sliders className="h-4 w-5 text-emerald-500" />
                      <span>Credit consumption estimator blueprint</span>
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xl font-semibold">
                      Estimate the required monthly token ceiling based on your bulk JSON formats, compression queues, and programmatic AI assistant calls.
                    </p>

                    <div className="space-y-2 select-none">
                      <div className="flex justify-between text-xs font-black">
                        <span>Expected workflow calls / month:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{customCreditsRange} API calls</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={customCreditsRange}
                        onChange={(e) => setCustomCreditsRange(parseInt(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1 border-t border-slate-200 dark:border-slate-850 text-xs">
                      <span className="text-slate-400 font-semibold">Suggested tier plan matching your load:</span>
                      <b className="font-extrabold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        {customCreditsRange <= 300 ? 'Starter Pro License' : customCreditsRange <= 1500 ? 'Agency Workspace Pack' : 'Infinite API Enterprise'}
                      </b>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: A/B Testing Sandbox Lab */}
              {activeTab === 'ab-testing' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <Sliders className="text-emerald-500 h-6 w-6" />
                      <span>Interactive A/B Testing sandbox</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Section 9: A/B split-run framework measuring Headline conversions, CTA layouts, and Ad positions to maximize visitor RPM.
                    </p>
                  </div>

                  {/* test variables selector */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 select-none">
                    {[
                      { id: 'hero', title: '🧪 Headline Split (Main Page H1)' },
                      { id: 'cta', title: '🧪 CTA Hook Split (Workstation Button)' },
                      { id: 'ad-position', title: '🧪 Ad Placement Layout (Sidebar vs Responsive)' },
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setAbTestVariable(st.id as any)}
                        className={`p-3 border rounded-2xl text-xs font-black text-left tracking-wide transition cursor-pointer flex justify-between items-center ${
                          abTestVariable === st.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 hover:bg-slate-200/50'
                        }`}
                      >
                        <span>{st.title}</span>
                        {abTestVariable === st.id && <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-1.5 text-center">
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">Tested Parameter Column</h3>
                    <p className="text-sm font-black text-slate-900 dark:text-white font-sans">{abCurrentTestData.label}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Variant A layout */}
                    <div className="p-5 border border-slate-250 dark:border-slate-800 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-150 dark:border-slate-850 pb-2 mb-2">
                        <span className="text-xs font-black text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-white rounded py-0.5 px-2">Variant A (Baseline Control)</span>
                        <span className="text-xs font-mono font-black text-slate-500">{abCurrentTestData.variantA.conv}</span>
                      </div>
                      
                      <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl min-h-[100px] flex items-center justify-center text-center">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{abCurrentTestData.variantA.text}</p>
                      </div>
                    </div>

                    {/* Variant B layout */}
                    <div className="p-5 border border-blue-200 dark:border-blue-900/60 rounded-2xl bg-blue-500/[0.02] space-y-4">
                      <div className="flex justify-between items-center border-b border-blue-150 dark:border-blue-950 pb-2 mb-2 text-blue-600 dark:text-blue-400">
                        <span className="text-xs font-extrabold bg-blue-500/10 rounded py-0.5 px-2 flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5" /> Variant B (Optimized Variant)
                        </span>
                        <span className="text-xs font-mono font-black">{abCurrentTestData.variantB.conv}</span>
                      </div>
                      
                      <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl min-h-[100px] flex items-center justify-center text-center">
                        <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{abCurrentTestData.variantB.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* Confidence levels */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs text-blue-400">
                    <span className="font-extrabold text-[#7DD3FC]">✓ STATISTICAL OUTCOME:</span>
                    <span className="text-[11px] bg-[#075985] text-white py-1 px-3 rounded-lg font-bold">{abCurrentTestData.pvalue}</span>
                  </div>
                </div>
              )}

              {/* Tab 7: Trust Signals & Schema markup */}
              {activeTab === 'trust-signals' && (
                <div className="space-y-6 animate-fade-in text-left font-sans text-sm font-normal">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500 h-6 w-6" />
                      <span>Trust Signals, Audits & Structured Schema</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Section 10 & 12: Verify client-side sandboxed labels, trust stars, and view compliance structured schemas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual badges checklist row */}
                    <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                      <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest font-mono">Core Trust Signals Checked</h3>
                      
                      <div className="space-y-3">
                        {[
                          { title: '🔒 Local Client-Side Processing Notice', desc: 'No files are loaded to remote virtual nodes. Processing takes place strictly inside your browser sandbox.' },
                          { title: '🎯 Zero Server Upload Claims (GDPR)', desc: 'Complete adherence to EU general data privacy laws. Telemetry metrics contains zero physical record caches.' },
                          { title: '🛡️ Cryptographic Integrity Match', desc: 'Our JavaScript libraries run directly inside safe sandboxes to avoid cross-script malware.' },
                          { title: '📅 Fresh Update Stamps (Automated)', desc: 'Stencils, conversion ratios, and currency indexes updated instantly with the current year (2026).' }
                        ].map(sign => (
                          <div key={sign.title} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl flex gap-3 text-xs leading-normal">
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <h4 className="font-extrabold text-slate-900 dark:text-white leading-snug">{sign.title}</h4>
                              <p className="text-[11px] text-slate-505 dark:text-slate-450 leading-relaxed font-semibold">{sign.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schemas selector and pre elements */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5 select-none text-[10px]">
                        {[
                          { id: 'app', label: 'SoftwareApplication Schema' },
                          { id: 'website', label: 'WebSite Search Schema' },
                          { id: 'org', label: 'Organization Brand Schema' }
                        ].map(it => (
                          <button
                            key={it.id}
                            onClick={() => setSchemaType(it.id as any)}
                            className={`py-1.5 px-3 border rounded-xl font-bold tracking-wide transition cursor-pointer ${
                              schemaType === it.id
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 hover:bg-slate-200/50'
                            }`}
                          >
                            {it.label}
                          </button>
                        ))}
                      </div>

                      <pre className="p-4 bg-slate-900 text-emerald-450 border border-slate-800 rounded-2xl font-mono text-[11px] leading-relaxed h-72 overflow-y-auto overflow-x-auto select-all">
                        {schemaMarkup}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 8: Monetization roadmap timeline & metrics plan */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                      <Award className="text-emerald-500 h-6 w-6" />
                      <span>Monetization Development Roadmap</span>
                    </h2>
                    <p className="text-xs text-slate-505 font-semibold mt-1">
                      Section 14: Track traffic goals, conversion targets, and developmental sprints over 30, 60, and 90 day milestones.
                    </p>
                  </div>

                  {/* High level metrics roadmap checklist row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center select-none">
                    {[
                      { val: '+150K', label: 'Traffic Goal (Monthly)', bg: 'bg-blue-500/5 text-blue-500 border-blue-500/10' },
                      { val: '$32.40', label: 'Target Site RPM', bg: 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' },
                      { val: '2.45%', label: 'Mean AdSense CTR', bg: 'bg-rose-500/5 text-rose-500 border-rose-500/10' },
                      { val: '$4,860', label: 'Monthly Target Earnings', bg: 'bg-violet-500/5 text-violet-500 border-violet-500/10' },
                    ].map(st => (
                      <div key={st.label} className={`p-4 border rounded-2xl ${st.bg}`}>
                        <p className="text-2xl font-black font-mono tracking-tight">{st.val}</p>
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-1 leading-none">{st.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* 30/60/90 day block mapping */}
                  <div className="space-y-4">
                    {[
                      {
                        day: '📅 Months 01: Day 30 Plan (Initial Setup)',
                        milestones: [
                          'Integrate clean visual fallbacks for all 10 mock AdSense placements across homepages.',
                          'Generate software application product page schema structures to obtain star aggregations.',
                          'Embed recommended related block recommendations in-content.'
                        ],
                        state: 'Active Sprint'
                      },
                      {
                        day: '📅 Months 02: Day 60 Plan (Growth & CTR)',
                        milestones: [
                          'Complete structured newsletters and resource lead magnets forms downloads captures.',
                          'Analyze A/B Testing confidence splits to evaluate headline optimizations.',
                          'Setup persistent sticky sidebars configurations on developer pages.'
                        ],
                        state: 'Planning Queue'
                      },
                      {
                        day: '📅 Months 03: Day 90 Plan (Scalability)',
                        milestones: [
                          'Verify credit balance Consumption formulas using premium estimations API sliders.',
                          'Optimize Page Speed values and core accessibility parameters on top money urls.',
                          'Incorporate advanced tool-workflow bundles recommended templates.'
                        ],
                        state: 'Future Backlog'
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="p-5 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl relative">
                        <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                          {step.state}
                        </span>
                        
                        <div className="space-y-3">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{step.day}</h4>
                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold pl-4 list-disc">
                            {step.milestones.map((mil, midx) => (
                              <li key={midx}>{mil}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom visual overview footer row */}
            <div className="border-t border-slate-150 dark:border-slate-850 pt-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-450 dark:text-slate-500 bg-slate-50 dark:bg-[#0E1524] rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80">
              <span className="text-center sm:text-left select-none leading-none">
                💰 NexusUtils Revenue Optimization Platform. Zero telemetry cookies active in sandbox.
              </span>
              <div className="flex items-center gap-4">
                <span className="hover:underline cursor-pointer">AdSense Compliance Policy</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">DMCA Compliance</span>
              </div>
            </div>
          </main>

        </div>
      </div>

      {/* RENDER EXIT INTENT FLOATING DIALOG SIMULATOR */}
      {showExitModal && (
        <div className="fixed inset-0 bg-slate-900/65 flex justify-center items-center z-50 p-4 backdrop-blur-2xs animate-fade-in">
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scale-up">
            <button
              onClick={() => setShowExitModal(false)}
              className="absolute top-4 right-4 select-none hover:bg-slate-100 dark:hover:bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 font-bold transition font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2 select-none">
              <span className="inline-flex py-1 px-3 bg-red-500/10 text-rose-500 text-[10px] font-mono font-black uppercase rounded-full tracking-wider">
                🎁 Don&apos;t Leave Empty Handed!
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                Get Your Free Technical SEO Audit Checklist
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Provide your email address below to download a printable checklist bundle, showing you how to increase meta-tag CTR layouts. No payment needed.
              </p>
            </div>

            {exitIntentSubscribed ? (
              <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-xl text-center font-bold text-xs">
                ✓ Success! We have queued the high-priority checklist inside your download list. Enjoy!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (exitIntentEmail.trim()) {
                    setExitIntentSubscribed(true);
                  }
                }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Your email address:</label>
                  <input
                    type="email"
                    required
                    value={exitIntentEmail}
                    onChange={(e) => setExitIntentEmail(e.target.value)}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs tracking-wide rounded-xl shadow-xs transition cursor-pointer hover:-translate-y-0.5"
                >
                  Download Free File & Subscribe
                </button>
              </form>
            )}

            <div className="text-center text-[10px] text-slate-400 select-none">
              NexusUtils is 100% GDPR secure. We never transfer file records to cloud folders.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-slate-350 shrink-0 select-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
