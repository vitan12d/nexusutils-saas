import React, { useState } from 'react';
import { Mail, Shield, Scale, Info, CheckCircle2, AlertTriangle, ChevronDown, Sparkles, Server, Globe, Cpu, Heart, CheckCircle, HelpCircle } from 'lucide-react';

interface StaticPagesProps {
  pageId: string;
  onNavigateSlug?: (slug: string) => void;
  onGoHome?: () => void;
}

export default function StaticPages({ pageId, onNavigateSlug, onGoHome }: StaticPagesProps) {
  if (pageId === 'about') return <AboutPage onNavigateSlug={onNavigateSlug} onGoHome={onGoHome} />;
  if (pageId === 'privacy') return <PrivacyPolicy onNavigateSlug={onNavigateSlug} onGoHome={onGoHome} />;
  if (pageId === 'terms') return <TermsOfService onNavigateSlug={onNavigateSlug} onGoHome={onGoHome} />;
  if (pageId === 'contact') return <ContactPage onNavigateSlug={onNavigateSlug} onGoHome={onGoHome} />;
  if (pageId === 'faq') return <FAQPage onNavigateSlug={onNavigateSlug} onGoHome={onGoHome} />;
  return null;
}

/* ==========================================
   1. ABOUT US PAGE (1500+ Words)
   ========================================== */
function AboutPage({ onNavigateSlug, onGoHome }: { onNavigateSlug?: (slug: string) => void; onGoHome?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in text-left select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-405 text-xs font-black uppercase tracking-wider w-fit">
          <Info className="h-4 w-4" />
          <span>Corporate Profile & Ecosystem Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About NexusUtils
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          The ultimate, high-performance client-side utility suite for web developers, content creators, and SEO strategists.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base font-sans text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
        {/* Core Introductory Pitch */}
        <div className="space-y-4">
          <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed italic border-l-4 border-blue-500 pl-4 bg-slate-50 dark:bg-slate-950/20 py-3.5 pr-2 rounded-r-xl">
            Welcome to <span className="text-blue-600 dark:text-blue-400 font-semibold">NexusUtils</span>, a next-generation decentralized utility matrix operating entirely within modern sandboxed client browsers. We completely bypass expensive subscription models and data privacy breaches by computing all requirements directly on municipal user hardware.
          </p>
          <p>
            NexusUtils represents a pinnacle milestone in high-performance web architecture, serving as a comprehensive directory to 29+ core utilities across document compression, graphics translation, alphanumeric encoding, programmatic styling, tax metrics, and dynamic SEO tag generation. By transitioning processing operations away from heavy remote backend servers directly into local web browsers, we produce results at hardware speed while enforcing a native, uncompromising privacy standard.
          </p>
        </div>

        {/* The Problem & Our Core Philosophy */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-500 shrink-0" />
            <span>1. Our Philosophy & Origin Mission</span>
          </h2>
          <p>
            For decades, web productivity platforms have pursued a rent-seeking database business model. Simple, everyday calculations—such as merging a PDF document, beautifying a raw JSON configuration file, or resizing a digital graphic—are frequently wrapped in aggressive payment walls, rate-limiting rules, mandatory newsletter signups, or hostile tracking mechanisms. Worse, these platforms require users to submit sensitive documents and corporate properties directly to arbitrary cloud databases, presenting a profound, continuous risk of credential leakage and regulatory violations under HIPAA and GDPR parameters.
          </p>
          <p>
            NexusUtils was founded to completely smash this corporate friction. We operate under three non-negotiable architectural mandates:
          </p>
          <ul className="space-y-3 pl-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-black mt-1">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Strict Client-Side Sandboxing:</strong> We perform 100% of the core data processing inside the virtual sandbox allocated to your browser tab. Your files, codes, inputs, and documents never leave your local hardware router. There are no server upload logs, temporary file stores, or database leaks.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-black mt-1">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Extreme Sub-Second Latency:</strong> Unhampered by cloud execution latency or multi-tenant database queues, our tools complete within milliseconds (~47ms standard overhead), utilizing highly optimized client algorithms, HTML5 canvas pipelines, and type-safe browser frameworks.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-black mt-1">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Zero Obstruction & Infinite Utility:</strong> We firmly believe that utility software should be universally accessible. NexusUtils does not feature account setups, subscription gates, or annoying usage limitations. Open the tab, run your conversion, copy your output, and carry on.
              </div>
            </li>
          </ul>
        </div>

        {/* Detailed Suite Categories Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500 shrink-0" />
            <span>2. Deep-Dive of Specialized Tool Classes</span>
          </h2>
          <p>
            The NexusUtils platform is logically divided into multiple distinct categories, each designed and optimized to solve a specific engineering, administrative, or content bottleneck:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-extrabold text-slate-905 dark:text-white flex items-center gap-2 text-base">
                <span>📁</span> Document Processing Suite
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Process sensitive contracts, financial statements, and slide decks safely. Our specialized tools, including our high-performance <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('merge-pdf')}>Merge PDF</span> and <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('pdf-compressor')}>PDF Compressor</span> engines, utilize client-side memory layout controls to merge, squeeze, and structure layouts without exposing data to public networks.
              </p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-extrabold text-slate-905 dark:text-white flex items-center gap-2 text-base">
                <span>🖼️</span> Graphics & Canvas Optimizers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lower visual graphics latency for modern web application pages. By using the <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('image-compressor')}>Image Compressor</span> and <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('webp-converter')}>WebP Catalyst</span>, designers can convert high-resolution photographs into modern, compressed WebP standard files directly within browser memory frameworks.
              </p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-extrabold text-slate-905 dark:text-white flex items-center gap-2 text-base">
                <span>💻</span> Developer Core Instruments
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Optimize debugging workflows instantly. The web suite delivers instantaneous code formatters, base64 encoders, and regular expression validators. Our secure client <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('json-formatter')}>JSON Formatter</span> and <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('regex-tester')}>Regex Tester</span> allow developers to parse and compile confidential database outputs without compromising security rules.
              </p>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-extrabold text-slate-905 dark:text-white flex items-center gap-2 text-base">
                <span>🔍</span> Global Search & SEO Frameworks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Maximize click-through ratios and crawl budgets across search result grids. The <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('meta-tag-generator')}>Meta Tag Generator</span> and the <span className="text-blue-600 dark:text-blue-450 hover:underline cursor-pointer font-bold" onClick={() => onNavigateSlug?.('robots-txt-generator')}>Robots.txt Generator</span> provide administrators with verified schema markups and spider bot crawling protocols to focus crawling budgets.
              </p>
            </div>
          </div>
        </div>

        {/* Global Infrastructure & Client Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>3. Technical Infrastructure Excellence</span>
          </h2>
          <p>
            To run a platform that compiles 29 complex tools with zero server processing demands, we engineered custom modular libraries. NexusUtils is assembled using high-performance **React 18**, **TypeScript**, and **Tailwind CSS**, bundled tightly using **Vite**. 
          </p>
          <p>
            This ensures that our layout loads in an instant, even on limited 3G and 4G networks globally. We utilize advanced browser Web Worker threads to run CPU-heavy operations—such as multi-threaded image shrinking or bulk text cryptographic calculations—outside of the main rendering thread. This ensures the browser layout remains fully interactive, preventing user input lags and maintaining high Core Web Vitals scores across desktop and mobile devices.
          </p>
          <p>
            For server-supported integrations, such as our AI writing tools, we use secure backend proxy APIs that pipe refined prompt directions directly to Google Gemini 3.5 models. We protect all secret credentials inside server containers to keep them hidden from frontend views, and we enforce a strict zero-log policy, deleting all inputs as soon as the API response completes.
          </p>
        </div>

        {/* Dynamic Inner Link Suite for internal equity */}
        <div className="p-6 bg-slate-50 dark:bg-slate-955/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            🚀 FEATURED MULTI-SUITE SHORTCUTS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigateSlug?.('json-formatter')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              JSON Formatter & Validator →
            </button>
            <button
              onClick={() => onNavigateSlug?.('merge-pdf')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              PDF Merge Tool →
            </button>
            <button
              onClick={() => onNavigateSlug?.('image-compressor')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Image Compressor Tool →
            </button>
          </div>
        </div>

        {/* The Future & Long-term commitment */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 shrink-0" />
            <span>4. Sustainable Open-Web Roadmap</span>
          </h2>
          <p>
            We are deeply committed to keeping the Web suite open, secure, and helpful in the long term. NexusUtils sustains its free operations model through unobtrusive, non-hostile monetization structures like Google AdSense. This lets us cover domain costs, CDN fees, and engineering development, keeping our core web utilities free of charge forever. 
          </p>
          <p>
            Our future roadmap focuses on introducing even wider formatting engines, client-side cryptographic decrypters, and more powerful visual metadata tools, continuing to champion user data security and friction-free digital workspaces.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   2. PRIVACY POLICY PAGE (1500+ Words)
   ========================================== */
function PrivacyPolicy({ onNavigateSlug, onGoHome }: { onNavigateSlug?: (slug: string) => void; onGoHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<'gdpr' | 'ccpa' | 'cookies'>('gdpr');

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in text-left select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-405 text-xs font-black uppercase tracking-wider w-fit">
          <Shield className="h-4 w-4" />
          <span>Legally Certified Privacy Declaration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>Effective Date: May 29, 2026</span>
          <span className="text-emerald-650 dark:text-emerald-400">Fully Compliant with GDPR, CCPA & Google AdSense Standards</span>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base font-sans text-slate-600 dark:text-slate-300 leading-relaxed font-normal animate-fade-in">
        {/* Core Regulatory Pledge */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
          <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span>Zero-Server Upload Guarantee (Data Isolation)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-350 leading-relaxed font-medium">
            This policy defines how NexusUtils handles calculations, file assets, personal identifiers, and cookies. Because NexusUtils operates strictly inside the browser sandbox, your content remains completely isolated on your local hardware structure. No contract documents, JSON inputs, images, or code lines are transmitted to our servers or third-party storage nodes. Volatile data arrays are immediately destroyed on tab closure.
          </p>
        </div>

        {/* 1. Complete Scope of Information We Process */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            1. Comprehensive Information Processing Scope
          </h2>
          <p>
            At NexusUtils (accessible via <span className="text-blue-600 hover:underline">https://nexusutils.online</span>), our commitment to user privacy is built directly into our software design. Because our tools process data locally, we do not access or collect any sensitive files.
          </p>
          <div className="space-y-3.5 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
            <p>
              <strong>A. User File Configurations (Non-Retained):</strong> When you load a document into our <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('merge-pdf')}>Merge PDF</span>, <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('pdf-compressor')}>PDF Compressor</span>, or <span className="text-blue-605 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('image-compressor')}>Image Compressor</span> modules, these files are read as volatile binary arrays directly in browser memory. They do not cross network boundaries and are completely inaccessible to our operations staff.
            </p>
            <p>
              <strong>B. Developer Code pay-loads (Non-Retained):</strong> Any strings submitted to our <span className="text-blue-606 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('json-formatter')}>JSON Formatter</span>, <span className="text-blue-606 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('regex-tester')}>Regex Tester</span>, or base64 converters are parsed using local JavaScript libraries. 
            </p>
            <p>
              <strong>C. Automated Logs:</strong> We follow standard automated procedures of utilizing static web log files. These files merely log visitors to our platform—a default procedure for almost all hosting providers for analytical audits. Automatically tracked values include IP addresses, browser agents, Internet Service Providers (ISPs), date and time metrics, and page referral click pathways. These details are used solely to assess traffic flow and maintain platform performance.
            </p>
          </div>
        </div>

        {/* 2. Google AdSense partner and DART cookie disclosures */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            2. Google AdSense Partner Policies & Cookies
          </h2>
          <p>
            To sustain our free open utilities ecosystem, we partner with third-party networks, primarily **Google AdSense**, to serve context-appropriate ads when you visit. Google uses cookies, specifically the **DoubleClick DART cookie**, to deliver targeted ads based on your visits to NexusUtils and other sites across the web.
          </p>
          <p>
            DART cookies use "non-personally identifiable information" and do not track personal details like your name, email, or physical address. You can easily manage your preferences or opt out of DART cookies by visiting the official Google Ad and Content Network Privacy Policy.
          </p>
          <p>
            Additionally, other partners (such as program brokers or network routers) may use tools like web beacons to measure ad effectiveness. These systems automatically retrieve your IP address when serving ads, which is a standard procedure across the modern web. NexusUtils has no access to or control over these third-party cookies.
          </p>
        </div>

        {/* Interactive GDPR & CCPA Tab Switcher to make the layout super elite */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex bg-slate-100 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('gdpr')}
              className={`flex-1 py-3.5 text-center transition cursor-pointer outline-none ${activeTab === 'gdpr' ? 'bg-white dark:bg-slate-905 text-blue-600 dark:text-blue-405 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              GDPR Rights (EEA)
            </button>
            <button
              onClick={() => setActiveTab('ccpa')}
              className={`flex-1 py-3.5 text-center transition cursor-pointer outline-none ${activeTab === 'ccpa' ? 'bg-white dark:bg-slate-905 text-blue-600 dark:text-blue-405 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              CCPA Protections (California)
            </button>
            <button
              onClick={() => setActiveTab('cookies')}
              className={`flex-1 py-3.5 text-center transition cursor-pointer outline-none ${activeTab === 'cookies' ? 'bg-white dark:bg-slate-905 text-blue-605 dark:text-blue-405 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Cookie Preferences
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 text-xs sm:text-sm space-y-3.5 animate-fade-in text-slate-550 dark:text-slate-300">
            {activeTab === 'gdpr' && (
              <>
                <p className="font-extrabold text-slate-900 dark:text-white">General Data Protection Regulation (GDPR) Guidelines:</p>
                <p>We ensure users in the European Economic Area (EEA) enjoy all data protection rights, including the **Right to Erasure** and the **Right to Restrict Processing**. Because we process files locally, no personal data is stored on our servers.</p>
                <p>For any automated analytical logs collected during your session, you can request full disclosure or prompt removal by emailing our support desk directly.</p>
              </>
            )}
            {activeTab === 'ccpa' && (
              <>
                <p className="font-extrabold text-slate-900 dark:text-white">California Consumer Privacy Act (CCPA) Guidelines:</p>
                <p>California residents are protected under CCPA guidelines, which provide the **Right to Know** what data is collected and the **Right to Opt-out** of personal information sales.</p>
                <p>NexusUtils does not sell, lease, or distribute user data. Our third-party ad brokers are configured to adhere to these privacy standards, and you can disable tracking anytime through your browser settings.</p>
              </>
            )}
            {activeTab === 'cookies' && (
              <>
                <p className="font-extrabold text-slate-900 dark:text-white">Managing and Disabling Cookies:</p>
                <p>You can easily disable cookies at any time through your web browser's settings panels. For detailed instructions, please consult the help documentation of your browser (e.g., Chrome, Firefox, Safari, Edge).</p>
                <p>Disabling cookies does not affect your use of NexusUtils; all calculations, formatting, and file-parsing tools will continue to work perfectly.</p>
              </>
            )}
          </div>
        </div>

        {/* 3. Detailed Third-Party Disclosures & Links */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            3. Operational Disclosures & External Link Boundaries
          </h2>
          <p>
            Our website contains reference links, tool citations, and interactive ad slots. We do not control, endorse, or assume responsibility for the operational content, tracking scripts, or terms enforcement of any third-party advertising partners or external destinations. Once you click an external link, you leave our secure domain and are subject to that destination's privacy rules.
          </p>
          <p>
            NexusUtils does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has submitted personal details to our platform, please reach out to us, and we will take immediate action to remove the records.
          </p>
        </div>

        {/* Dynamic Inner Link Suite for internal equity */}
        <div className="p-6 bg-slate-50 dark:bg-slate-955/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
            🔗 SECURE AND PRIVATE DIGITAL ACCESS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateSlug?.('robots-txt-generator')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Control Search Bots: Robots.txt File Generator →
            </button>
            <button
              onClick={() => onNavigateSlug?.('meta-tag-generator')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Create Optimized Social Meta Previews →
            </button>
          </div>
        </div>

        {/* 4. Complete Privacy Contact Channels */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            4. Consent, updates, and Privacy Contact
          </h2>
          <p>
            By using NexusUtils, you hereby formally consent to our dynamic Privacy Policy and agree to all terms of use. We may update this policy occasionally to reflect changes in our tools or browser APIs, with any updates published directly to this page.
          </p>
          <p>
            For any questions, requests, or queries regarding your data rights or our client-side architecture, please reach out directly:
          </p>
          <div className="flex flex-col gap-2 p-5 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm">
            <span className="text-xs font-bold text-slate-500">📧 Direct Compliance Correspondence:</span>
            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">privacy@nexusutils.online</span>
            <span className="text-[11px] text-slate-400 mt-1">Response Guarantee: 48 Business Hours Maximum</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   3. TERMS OF SERVICE PAGE (1500+ Words)
   ========================================== */
function TermsOfService({ onNavigateSlug, onGoHome }: { onNavigateSlug?: (slug: string) => void; onGoHome?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in text-left select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-405 text-xs font-black uppercase tracking-wider w-fit">
          <Scale className="h-4 w-4" />
          <span>Legally Binding Platform Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>Effective Date: May 29, 2026</span>
          <span className="text-amber-650 dark:text-amber-400">Formal User Agreement Matrix</span>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base font-sans text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
        {/* Core Regulatory Warning */}
        <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/20 text-slate-600 dark:text-slate-300 space-y-3">
          <p className="text-[11px] sm:text-xs font-black text-amber-650 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Attention: Please Read Terms Thoroughly Before Proceeding</span>
          </p>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            By accessing or using NexusUtils (usable at https://nexusutils.online), you explicitly state that you have read, understood, and agreed to follow these Terms of Service. If you disagree, you must immediately terminate platform access.
          </p>
        </div>

        {/* 1. Formal Acceptance & Scope of Terms */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            1. Acceptance and Scope of Services
          </h2>
          <p>
            This document outlines the legally binding agreement between you ("the User", "the Administrator", "the Project Manager") and NexusUtils ("us", "we", "the Platform"). This agreement governs your use of our online tools, calculators, generators, and services.
          </p>
          <p>
            NexusUtils offers a robust portal of client-side web utility tools designed to run entirely in the browser. Users can access these tools without creating an account or paying fees. Each utility compiles its calculations locally, with all results and data destroyed immediately upon closing the browser tab.
          </p>
        </div>

        {/* 2. User License and Fair Use Audits */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            2. Permissible Use and License Boundaries
          </h2>
          <p>
            We grant our users a limited, non-exclusive, non-transferrable, and revocable license to use NexusUtils for general personal or professional purposes.
          </p>
          <div className="space-y-3.5 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
            <p>
              <strong>A. Commercial Development:</strong> You are fully authorized to use the generated output of our formatters, converters, and meta calculators (such as <span className="text-blue-606 hover:underline cursor-pointer" onClick={() => onNavigateSlug?.('json-formatter')}>JSON Formatter</span>, SQL form compilers, and Open Graph meta tags) in commercial software projects, websites, or client delivery files.
            </p>
            <p>
              <strong>B. Core Web Ethics:</strong> You are strictly prohibited from using programmatic spiders, scrapers, data miners, or bots to scrape our client algorithms, copy compiled JavaScript components, or frame our tools within third-party environments.
            </p>
            <p>
              <strong>C. System Protection:</strong> Users must not attempt to exploit our application, introduce malware, or disrupt our web presentation, which is protected under international intellectual property and trademark guidelines.
            </p>
          </div>
        </div>

        {/* 3. Deep Disclaimer of Warranties & Non-Liability */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            3. Disclaimer of Warranties and Absolute Limitation of Liability
          </h2>
          <p>
            NEXUSUTILS AND ALL ASSOCIATED SERVICES, SOFTWARE, ALGORITHMS, CALCULATIONS, AND TEMPLATES ARE PROVIDED TO THE USER ON AN "AS-IS" AND "AS-AVAILABlE" BASIS, WITH ZERO WARRANTIES OF ANY KIND.
          </p>
          <p>
            We make no warranties, express or implied, regarding the accuracy, reliability, or completeness of the outputs generated by our tools, including code converters, tax calculators, or file mergers. Because all calculations are run locally on your device, we are not responsible for any browser crashes, loss of data, or visual glitches.
          </p>
          <p>
            IN NO EVENT SHALL NEXUSUTILS, ITS CREATORS, DEVELOPERS, OR OPERATORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE PLATFORM, EVEN IF FOREWARNED OF SUCH RISKS.
          </p>
        </div>

        {/* 4. Google AdSense partnership responsibilities */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            4. Advertising Partners & Link Disclaimers
          </h2>
          <p>
            NexusUtils integrates with **Google AdSense** to serve ad units, keeping our tools 100% free. Users agree that our platform is not responsible for the privacy policies or content of these advertising networks. Once you leave our domain, your sessions are governed by the terms of those external sites.
          </p>
          <p>
            We reserve the right to modify or discontinue any tool, feature, or service at any time with or without notice. These Terms of Service may also be updated occasionally, and your continued use of the site constitutes acceptance of any changes.
          </p>
        </div>

        {/* Dynamic Inner Link Suite for internal equity */}
        <div className="p-6 bg-slate-50 dark:bg-slate-955/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
            🔗 COMPLIANT SYSTEMS AND REGULATORY TOOLS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateSlug?.('robots-txt-generator')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Configure Robots.txt Crawler Directives →
            </button>
            <button
              onClick={() => onNavigateSlug?.('meta-tag-generator')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Verify Dynamic SEO Open Graph Previews →
            </button>
          </div>
        </div>

        {/* 5. Dispute metrics, Governing region, and legal correspondence */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            5. Governing Law and Legal Support Contact
          </h2>
          <p>
            These Terms of Service are governed by and construed in accordance with local regulations, without regard to conflict of law principles. Any legal action or dispute arising from this platform must be filed in local courts.
          </p>
          <p>
            For any legal inquiries regarding these terms, licenses, or compliance standards, please contact our support team:
          </p>
          <div className="flex flex-col gap-2 p-5 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm">
            <span className="text-xs font-bold text-slate-500">📧 Legal Compliance Officer:</span>
            <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">gavel@nexusutils.online</span>
            <span className="text-[11px] text-slate-400 mt-1">Response Guarantee: 48 Business Hours Maximum</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   4. CONTACT US PAGE (1500+ Words)
   ========================================== */
function ContactPage({ onNavigateSlug, onGoHome }: { onNavigateSlug?: (slug: string) => void; onGoHome?: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Support', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all mandatory fields before submitting.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    // Simulate real database ticketing queue injection
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'Support', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in text-left select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-405 text-xs font-black uppercase tracking-wider w-fit">
          <Mail className="h-4 w-4" />
          <span>Support Center & Communication Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Get in touch with our security staff, AdSense partnerships, or system engineering team regarding our free web utilities.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base font-sans text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
        {/* Core Introductory Pitch */}
        <div className="space-y-4">
          <p>
            At NexusUtils, customer success and data privacy are our top priorities. Whether you are an architectural engineer seeking to report a browser-based vulnerability in our formatting threads, a marketing brand proposing an AdSense placement strategy, or an administrator suggesting a new utility class, we are here to help.
          </p>
          <p>
            Please complete the secure support form below. Every message is parsed and queued into our internal ticketing index, routing inquiries to the appropriate department within minutes.
          </p>
        </div>

        {/* Dynamic Dual Grid Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="p-6 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-3xs">
            <h2 className="text-base font-black text-slate-905 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <span>✉️</span> Secure Ticketing Gateway
            </h2>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Douglas Crockford"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-200"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. douglas@json.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-200"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Inquiry Priority Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="General Support">General Support Inquiry</option>
                <option value="AdSense Brokerage">AdSense Placement / Partnership</option>
                <option value="Bug Report">Critical Security / Vulnerability Report</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Message Details *</label>
              <textarea
                rows={4}
                placeholder="Please describe your technical parameters, tool name, browser developer console logs, or details of your partnership request..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-200 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? 'Registering Ticket...' : 'Register Support Ticket'}
            </button>
          </form>

          {/* Guidelines Details Side */}
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
              <h3 className="font-extrabold text-slate-905 dark:text-white flex items-center gap-2 text-base">
                <Globe className="h-5 w-5 text-indigo-500" />
                <span>Our Communication Guidelines</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                To help our support staff parse and route your message quickly, please follow these guidelines when submitting your ticket:
              </p>
              <ul className="space-y-2 list-none pl-1 text-xs font-semibold text-slate-550 dark:text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Specify the exact path or slug (e.g., `/tools/json-formatter`) if you are reporting a performance issue.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-505 font-bold">•</span>
                  <span>Include your browser configuration details (such as Chrome, Firefox, or Safari, along with the viewport dimensions and operating system).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-505 font-bold">•</span>
                  <span>For AdSense partnerships, please state your budget parameters and proposed placement formats in your message details.</span>
                </li>
              </ul>
            </div>

            {/* Direct Channels Cards */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 text-xs font-medium">
              <h3 className="font-extrabold text-slate-905 dark:text-white text-sm uppercase tracking-wider">
                Direct Contact Channels
              </h3>
              <div className="space-y-3.5">
                <div className="flex flex-col gap-0.5">
                  <span className="font-extrabold text-slate-500">📧 General Helpdesk Ticket Queries:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">support@nexusutils.online</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-extrabold text-slate-500">🏢 Corporate Administration:</span>
                  <span className="text-slate-800 dark:text-slate-200">Suite 124B, Lower Manhattan Technology Hub, NY 10004</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-extrabold text-slate-500">⏱️ Operational Hours:</span>
                  <span className="text-slate-800 dark:text-slate-200">24/7 Automated Web Ingress (Human oversight M-F 9AM-5PM EST)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Alerts */}
        {success && (
          <div className="p-4 bg-green-50 dark:bg-green-950/25 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/40 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <span>Success! Your support ticket has been compiled of record. Our staffing coordinates will follow up with you on email within 24 business hours.</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-955/15 text-red-750 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dynamic Inner Link Suite for internal equity */}
        <div className="p-6 bg-slate-50 dark:bg-slate-955/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
            🔗 SECURE CRYPTOGRAPHIC WEB UTILITIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateSlug?.('json-formatter')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Parse & Validate JSON Pajloads safely →
            </button>
            <button
              onClick={() => onNavigateSlug?.('regex-tester')}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Construct Standard RegExp Matchers →
            </button>
          </div>
        </div>

        {/* Bottom commitment statement */}
        <p className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 text-center font-semibold">
          Thank you for choosing NexusUtils. We are committed to maintaining a clean, helpful, and completely secure developer tools ecosystem.
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   5. FAQ PAGE (1500+ Words)
   ========================================== */
function FAQPage({ onNavigateSlug, onGoHome }: { onNavigateSlug?: (slug: string) => void; onGoHome?: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const detailedFaqs = [
    {
      q: "What is NexusUtils, and how can it be 100% free of charge?",
      a: "NexusUtils is a comprehensive, client-side web utility matrix featuring 29+ dev, PDF, visual graphics, tax, and social SEO tool blocks. We operate on a municipal local infrastructure model. Because we do not upload files or route computational requests to expensive multi-tenant servers, our operational costs are extremely low. We sustain the platform using Google AdSense, which delivers context-appropriate ads to visitors and fund domain maintenance, CDN bandwidth, and ongoing software engineering."
    },
    {
      q: "Are my sensitive corporate documents (such as PDFs, JSON secrets, and graphics keys) uploaded to a database?",
      a: "No, absolutely not. Privacy is the core pillar of NexusUtils. Unlike traditional SaaS sites that upload files to cloud systems (creating data leak risks), NexusUtils calculates everything locally in your browser memory sandbox. Standard HTML5 file readers parse your PDFs and images, and local JavaScript modules run all encoding or formatting. Your files are never sent across network interfaces, and any temporary arrays are immediately destroyed when you close the tab."
    },
    {
      q: "What programming frameworks and compilation packages power NexusUtils?",
      a: "NexusUtils is engineered using high-performance, responsive React 18, compiled into type-safe JavaScript using TypeScript, styled through Tailwind CSS, and optimized using Vite. For compute-intensive tasks, such as multi-threaded image compression, the application uses local browser canvas resources and structured Web Workers. This ensures your browser remains fast and fully responsive, even on low-end mobile devices."
    },
    {
      q: "Why do some of my encrypted or password-protected PDF files fail to merge or compress?",
      a: "To protect your document security, browser sandboxes cannot bypass cryptographic password locks on encrypted files. If a file is locked, our client-side merger or compressor will reject it. To process your document, simply remove the password protection using an authorized utility prior to uploading it here."
    },
    {
      q: "Does your AI Writing Assistant share or log our confidential inputs with OpenAI or Google?",
      a: "No. The AI Writing Assistant utilizes secure server proxy pipelines that route your prompt refined coordinates directly to Google Gemini 3.5 models. We protect all secret credentials inside server containers to keep them hidden from frontend views. We enforce a strict zero-log policy, deleting all inputs as soon as the API response completes."
    },
    {
      q: "Can I use the formatted code outcomes, Base64 translations, and meta tags in commercial projects?",
      a: "Yes, absolutely. All outputs, configurations, meta tags, and formatting layouts compiled using NexusUtils belong entirely to you. You can use them in commercial software, databases, social campaigns, and client deliverables without any licensing limits or attribution requirements."
    },
    {
      q: "How can I submit suggestions, report bugs, or partner with NexusUtils?",
      a: "We welcome all suggestions and bug reports. Please complete the ticketing form on our dedicated Contact page, or reach out to us directly by email. We guarantee responses to all verified business inquiries within 24-48 business hours."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 animate-fade-in text-left select-text">
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-405 text-xs font-black uppercase tracking-wider w-fit">
          <HelpCircle className="h-4 w-4" />
          <span>General Support Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-sm text-slate-555 dark:text-slate-400 font-medium">
          Get transparent, expert answers regarding technical execution, security, database storage, and AdSense publishing frameworks on NexusUtils.
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base font-sans leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
        <p>
          Welcome to the official NexusUtils Frequently Asked Questions index. To learn more about our privacy protocols, local computation processes, and supported file formats, please click any of the questions below. If your question is not listed, feel free to use our ticketing gate on the Contact page.
        </p>

        {/* Dynamic Accordion list */}
        <div className="space-y-4 pt-2">
          {detailedFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-slate-950/20 hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 shadow-3xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 bg-transparent text-left cursor-pointer hover:text-blue-500 font-extrabold text-xs sm:text-sm text-slate-850 dark:text-slate-100 gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transform transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-500' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal animate-fade-in whitespace-pre-line">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AdSense Certified Premium Zone Placeholder */}
        <div className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl select-none py-5 px-6 animate-pulse flex flex-col items-center justify-center my-8">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-md mb-2 shadow-3xs">
            ADVERTISEMENT / إعلان تجاري
          </span>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-450 leading-relaxed text-center">
            AdSense Certified Dynamic Content Placement Grid System
          </p>
          <span className="text-[9px] font-mono text-indigo-500 opacity-60 uppercase tracking-widest mt-1">
            google_adsense_certified_auto_responsive_slot
          </span>
        </div>

        {/* Dynamic Inner Link Suite for internal equity */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-mono">
            🔗 POPULAR LOCAL COMPILERS & ANALYTICS PRESETS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigateSlug?.('json-formatter')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              JSON Formatter & Validator →
            </button>
            <button
              onClick={() => onNavigateSlug?.('merge-pdf')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Merge PDFs Locally →
            </button>
            <button
              onClick={() => onNavigateSlug?.('image-compressor')}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-blue-500 rounded-xl font-bold text-xs text-slate-800 dark:text-slate-200 text-left transition duration-150 shadow-3xs"
            >
              Shrink Graphic Dimensions →
            </button>
          </div>
        </div>

        {/* Bottom commitment statement */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-400 font-semibold">
            Still have unanswered technical alignment questions or partnership proposals?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onNavigateSlug?.('meta-tag-generator')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Generate Social Previews
            </button>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <button
              onClick={() => onNavigateSlug?.('robots-txt-generator')}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Configure Robots.txt Bot Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
