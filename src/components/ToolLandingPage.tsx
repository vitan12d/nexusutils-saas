import { useState, useEffect, useRef } from 'react';
import { TOOLS, Tool } from '../types';
import { getSeoLander, SeoLander } from '../data/seoLandingData';
import { ArrowLeft, Play, ChevronDown, CheckCircle, Shield, Sparkles, HelpCircle, ArrowRight, ShieldAlert, FileSymlink, ExternalLink } from 'lucide-react';

// Reusable SEO Components
import ToolHero from './seo/ToolHero';
import ToolBenefits from './seo/ToolBenefits';
import ToolFAQ from './seo/ToolFAQ';
import ToolSchema from './seo/ToolSchema';
import ToolCTA from './seo/ToolCTA';
import RelatedTools from './seo/RelatedTools';
import RelatedArticles from './seo/RelatedArticles';
import AdSpace from './seo/AdSpace';

// Import actual tools containers
import PdfTools from './tools/PdfTools';
import ImageTools from './tools/ImageTools';
import TextTools from './tools/TextTools';
import FinanceTools from './tools/FinanceTools';
import DevTools from './tools/DevTools';
import SeoTools from './tools/SeoTools';
import AiTools from './tools/AiTools';

// The list of all 29 target routing slugs mapped directly to their physical Tool IDs
export const SEO_SLUGS: Record<string, string> = {
  'merge-pdf': 'merge-pdf',
  'compress-pdf': 'compress-pdf',
  'pdf-to-word': 'pdf-to-word',
  'compress-image': 'compress-image',
  'resize-image': 'resize-image',
  'convert-image': 'convert-image',
  'word-counter': 'word-counter',
  'character-counter': 'char-counter',
  'case-converter': 'case-converter',
  'lorem-ipsum-generator': 'lorem-ipsum',
  'invoice-generator': 'invoice-gen',
  'tax-calculator': 'tax-calc',
  'currency-converter': 'currency-converter',
  'json-formatter': 'json-formatter',
  'base64-encoder': 'base64-tool',
  'password-generator': 'password-gen',
  'color-picker': 'color-picker',
  'meta-tag-generator': 'meta-generator',
  'keyword-density-checker': 'keyword-density',
  'robots-generator': 'robots-generator',
  'ai-writing-assistant': 'ai-assistant',
  'json-to-go-java': 'json-to-go-java',
  'js-obfuscator': 'js-obfuscator',
  'sql-formatter': 'sql-formatter',
  'diff-checker': 'diff-checker',
  'regex-tester': 'regex-tester',
  'google-snippet-simulator': 'seo-preview',
  'image-to-base64': 'image-base64',
  'webp-converter': 'nextgen-converter',
  'ai-website-clone-planner': 'ai-clone-architect',
  'ai-cms-prompter': 'ai-cms-architect'
};

// Markdown renderer for guiding texts
function SimpleMarkdown({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split('\n');

  return (
    <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-sm sm:text-base font-normal">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // h3
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-[17px] sm:text-[20px] font-black text-slate-900 dark:text-white pt-6 pb-2 tracking-tight">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // h4
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-base font-extrabold text-slate-800 dark:text-slate-200 pt-4 pb-1">
              {trimmed.replace('#### ', '')}
            </h4>
          );
        }

        // List
        if (trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex gap-2 pl-3">
              <span className="text-blue-500 font-bold">•</span>
              <p>{parseBoldAndCode(trimmed.replace('* ', ''))}</p>
            </div>
          );
        }

        // Number List
        if (/^\d+\s*\.\s*/.test(trimmed)) {
          const content = trimmed.replace(/^\d+\s*\.\s+/, '');
          const num = trimmed.match(/^\d+/)?.[0];
          return (
            <div key={idx} className="flex gap-2 pl-3">
              <span className="text-blue-600 font-bold font-mono">{num}.</span>
              <p>{parseBoldAndCode(content)}</p>
            </div>
          );
        }

        return <p key={idx}>{parseBoldAndCode(trimmed)}</p>;
      })}
    </div>
  );
}

function parseBoldAndCode(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="bg-slate-100 dark:bg-slate-805 text-rose-500 rounded px-1.5 py-0.5 text-xs font-mono font-medium">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

interface ToolLandingPageProps {
  slug: string;
  onLaunchTool: (toolId: string) => void;
  onNavigateSlug: (newSlug: string) => void;
  onBackToMain: () => void;
}

export default function ToolLandingPage({
  slug,
  onLaunchTool,
  onNavigateSlug,
  onBackToMain
}: ToolLandingPageProps) {
  const toolId = SEO_SLUGS[slug];
  const tool = TOOLS.find((t) => t.id === toolId);
  const lander: SeoLander = getSeoLander(slug);

  const workstationRef = useRef<HTMLDivElement | null>(null);

  // Dynamic Metadata injector to conform to strict SEO rules
  useEffect(() => {
    if (lander) {
      // 1. Dynamic Title
      document.title = `${lander.metaTitle} | NexusUtils`;

      // 2. Head tag updates
      const updateMeta = (name: string, content: string, isProperty = false) => {
        const attribute = isProperty ? 'property' : 'name';
        let element = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      const updateLink = (rel: string, href: string) => {
        let element = document.querySelector(`link[rel="${rel}"]`);
        if (!element) {
          element = document.createElement('link');
          element.setAttribute('rel', rel);
          document.head.appendChild(element);
        }
        element.setAttribute('href', href);
      };

      const domain = window.location.origin;
      const url = `${domain}/tools/${slug}`;

      updateMeta('description', lander.metaDesc);
      updateLink('canonical', url);

      // Open Graph Tags
      updateMeta('og:title', lander.metaTitle, true);
      updateMeta('og:description', lander.metaDesc, true);
      updateMeta('og:url', url, true);
      updateMeta('og:type', 'website', true);
      updateMeta('og:image', `${domain}/og-image.png`, true);

      // Twitter Cards Tags
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', lander.metaTitle);
      updateMeta('twitter:description', lander.metaDesc);
      updateMeta('twitter:image', `${domain}/og-image.png`);
    }

    // Smooth scroll to top of page on active slug shift
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, lander]);

  if (!tool || !lander) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-black text-slate-850 dark:text-white">Workspace Not Available</h1>
        <p className="text-sm text-slate-400">The requested SEO platform index layout is currently loading or offline.</p>
        <button
          onClick={onBackToMain}
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
        >
          Return to Platform Home
        </button>
      </div>
    );
  }

  const handleScrollToTool = () => {
    if (workstationRef.current) {
      workstationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left select-text relative">
      {/* Dynamic SEO Meta Schema Injections */}
      <ToolSchema
        toolName={tool.name}
        toolDescription={lander.metaDesc}
        slug={slug}
        faqs={lander.faqs}
        category={lander.category}
      />

      {/* Breadcrumb Navigation row */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-bold select-none mb-4">
        <span className="hover:text-blue-500 cursor-pointer transition-colors" onClick={onBackToMain}>Home</span>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400">Tools</span>
        <span>/</span>
        <span className="text-blue-500 dark:text-blue-450 truncate max-w-[200px]">{tool.name}</span>
      </nav>

      {/* SECTION 1: Hero Area Component */}
      <ToolHero
        title={lander.h1}
        description={lander.introParagraph}
        toolName={tool.name}
        toolSummary={tool.summary}
        onLaunchClick={handleScrollToTool}
      />

      {/* AdSense Below Hero */}
      <AdSpace id="below-hero-unit" style={{ minHeight: '100px' }} />

      {/* SECTION 2: What Is This Tool */}
      <section className="bg-white dark:bg-slate-900/40 p-6 sm:p-10 border border-slate-205 dark:border-slate-800 rounded-3xl shadow-3xs space-y-4">
        <span className="text-[10px] font-black tracking-widest text-indigo-500 uppercase block">
          SECTION I — DETAILED RESEARCH ARCHIVE
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight pb-2 border-b border-slate-100 dark:border-slate-850">
          What is our specialized {tool.name} Tool?
        </h2>
        <div className="prose dark:prose-invert max-w-none text-slate-650 dark:text-slate-300">
          <SimpleMarkdown text={lander.whatIsArticle} />
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section className="p-6 sm:p-10 bg-white dark:bg-slate-905 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-3xs space-y-6">
        <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase block">
          SECTION II — LOGICAL PIPELINE FLOW
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How to use {tool.name} Step-by-Step
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lander.howItWorksSteps.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50/40 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800/80 flex gap-4">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Benefits Component */}
      <ToolBenefits benefits={lander.benefits} />

      {/* SECTION 5: Use Cases */}
      <section className="p-6 sm:p-10 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-6">
        <span className="text-[10px] font-black tracking-widest text-indigo-500 uppercase block">
          SECTION III — REAL-WORLD DEPLOYMENTS
        </span>
        <div className="space-y-1.5 text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Targeted Use Cases & Implementation Scenarios
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            How different users map this utility to unlock productivity advantages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lander.useCases.map((uc, idx) => (
            <div key={idx} className="p-5 bg-slate-50/20 dark:bg-slate-950/10 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between text-left">
              <div className="space-y-2">
                <span className="text-base">💼</span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-white leading-snug">
                  {uc.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  {uc.scenario}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Why Use NexusUtils (Comparison Table) */}
      <section className="p-6 sm:p-10 bg-white dark:bg-slate-901 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-6 overflow-hidden">
        <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase block">
          SECTION IV — CAPABILITIES AUDIT
        </span>
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Choose NexusUtils over Competitors?
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            A precise audit checklist highlighting our core local-system advantages
          </p>
        </div>

        {/* Table Frame */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs font-medium text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-205 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <th className="py-3.5 px-4 font-black">Audit Feature</th>
                <th className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-black">NexusUtils Hub</th>
                <th className="py-3.5 px-4 font-black">Average Online SaaS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80">
              {lander.comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-300">
                  <td className="py-3 px-4 font-bold">{row.feature}</td>
                  <td className="py-3 px-4 text-blue-600 dark:text-blue-450 font-bold flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{row.nexus}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-450 dark:text-slate-500">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AdSense Before Tool */}
      <AdSpace id="before-workspace-unit" style={{ minHeight: '90px' }} />

      {/* SECTION 7: Tool Workstation Component Component */}
      <div
        ref={workstationRef}
        id="tool-workstation"
        className="p-1 border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-951 rounded-[2.2rem] shadow-md relative group scroll-mt-24"
      >
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
        
        {/* Workstation Header Bar */}
        <div className="p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-950/60 rounded-[1.95rem] border-b border-slate-205 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[9px] font-black tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md uppercase font-mono">
              Live System Active Node
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>🎛️</span>
              <span>{tool.name} Integrated Workstation</span>
            </h3>
            <p className="text-[11.5px] leading-relaxed text-slate-450 dark:text-slate-500 font-semibold max-w-xl">
              Compile, calculate, convert, or beautify records without latency. Everything processes 100% locally in your secure client shell.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-3xs select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px]">GDPR SECURE LINK</span>
          </div>
        </div>

        {/* Embedded Core Tool Component */}
        <div className="p-5 sm:p-8 bg-white dark:bg-slate-900/60 rounded-[1.95rem] min-h-[400px]">
          {tool.category === 'pdf' && <PdfTools toolId={tool.id} />}
          {tool.category === 'image' && <ImageTools toolId={tool.id} />}
          {tool.category === 'text' && <TextTools toolId={tool.id} />}
          {tool.category === 'finance' && <FinanceTools toolId={tool.id} />}
          {tool.category === 'developer' && <DevTools toolId={tool.id} />}
          {tool.category === 'seo' && <SeoTools toolId={tool.id} />}
          {tool.category === 'ai' && <AiTools toolId={tool.id} />}
        </div>
      </div>

      {/* AdSense After Tool */}
      <AdSpace id="after-workspace-unit" style={{ minHeight: '90px' }} />

      {/* SECTION 6 CTA Re-trigger: Bookmark element */}
      <ToolCTA
        toolName={tool.name}
        onGoHome={onBackToMain}
        onScrollToTool={handleScrollToTool}
      />

      {/* AdSense Before FAQ */}
      <AdSpace id="before-faq-unit" style={{ minHeight: '90px' }} />

      {/* SECTION 8: Frequently Asked Questions */}
      <ToolFAQ faqs={lander.faqs} toolName={tool.name} />

      {/* SECTION 9: Related Tools Internal Links */}
      <RelatedTools
        currentToolId={tool.id}
        onNavigateSlug={onNavigateSlug}
        slugMapping={SEO_SLUGS}
      />

      {/* SECTION 10: Related Articles Blog Links */}
      <RelatedArticles category={tool.category} />

      {/* Core On-Page Internal Text Links Checklist Row */}
      <div className="p-6 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400 font-semibold space-y-3 select-none">
        <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase block border-b border-slate-150 dark:border-slate-850 pb-2">
          ⚙️ SYSTEM DIRECT LINKS PORTAL (ON-PAGE FOOTPRINT)
        </span>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5">
          <span className="text-slate-500">Site Navs:</span>
          <span className="hover:text-blue-500 cursor-pointer" onClick={onBackToMain}>Home Index</span>
          <span>•</span>
          <span className="hover:text-blue-500 cursor-pointer" onClick={() => onLaunchTool(tool.id)}>Dashboard Suite</span>
          <span>•</span>
          <span className="text-slate-300 dark:text-slate-800">|</span>
          <span className="text-slate-500">Pages:</span>
          <a href="#about" onClick={(e) => { e.preventDefault(); onBackToMain(); }} className="hover:text-blue-500">About Us</a>
          <span>•</span>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onBackToMain(); }} className="hover:text-blue-500">Contact Support</a>
          <span>•</span>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); onBackToMain(); }} className="hover:text-blue-500">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); onBackToMain(); }} className="hover:text-blue-500">Terms of Service</a>
        </div>
      </div>

    </div>
  );
}
