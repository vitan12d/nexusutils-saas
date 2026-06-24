import { useState, useEffect } from 'react';
import { PSEOItem } from '../../content/pseoTypes';
import { compileExpandedPSEOContent, getRelatedPSEOItems } from '../../content/loader';
import AdSensePlacement from './AdSensePlacement';
import SEOHead from './SEOHead';
import { 
  ArrowLeft, CheckCircle, HelpCircle, AlertTriangle, 
  ExternalLink, Copy, Check, FileText, ChevronRight, 
  Sparkles, BookOpen
} from 'lucide-react';

interface PSEOTemplateViewProps {
  item: PSEOItem;
  onGoBack: () => void;
  onNavigateSlug: (category: 'guide' | 'checklist' | 'template' | 'example' | 'compare', slug: string) => void;
  onNavigateStaticPage: (pageId: string) => void;
  onLaunchTool: (toolId: string) => void;
}

export default function PSEOTemplateView({
  item,
  onGoBack,
  onNavigateSlug,
  onNavigateStaticPage,
  onLaunchTool
}: PSEOTemplateViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  // Compile long-form rich content essay (2000 words target!)
  const content = compileExpandedPSEOContent(item);
  const relatedArticles = getRelatedPSEOItems(item, 4);

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-200 py-6">
      {/* 1. Dynamic Meta head injection */}
      <SEOHead item={item} />

      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 font-mono select-none">
          <span className="hover:text-blue-500 cursor-pointer" onClick={onGoBack}>Portal</span>
          <ChevronRight className="h-3 w-3" />
          <span className="capitalize">{item.category}s</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-700 dark:text-slate-300 truncate">{item.slug}</span>
        </div>

        {/* AdSense Top Placement */}
        <AdSensePlacement slotId="top-banner" />

        {/* ---- HERO SECTION ---- */}
        <header id="pseo-hero" className="relative mb-10 text-center space-y-4 pt-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider font-mono">
            <Sparkles className="h-3 w-3" />
            <span>{item.badge}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {item.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-3 text-xs select-none">
            {item.relatedTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => onLaunchTool(tool.id)}
                className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-lg shadow-xs hover:-translate-y-0.5 transition duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{tool.actionLabel}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            ))}
            <button
              onClick={onGoBack}
              className="py-2.5 px-5 bg-white dark:bg-slate-900 hover:bg-slate-50 hover:dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-705 dark:text-slate-305 font-extrabold rounded-lg transition"
            >
              Back to Catalog
            </button>
          </div>
        </header>

        {/* ---- OVERVIEW ---- */}
        <section id="pseo-overview" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.overviewHeading}
          </h2>
          
          <p className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border-l-4 border-blue-600 text-slate-655 dark:text-slate-305 font-medium leading-relaxed">
            {item.overviewSummary}
          </p>

          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            {item.overviewContent.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-605 dark:text-slate-305 leading-relaxed font-semibold">
            {content.introductionEssay.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* AdSense Middle Placement */}
        <AdSensePlacement slotId="middle-inline" />

        {/* ---- ARCHITECTURAL DEEP DIVE WITH DIAGNOSTICS TABLE ---- */}
        <section id="pseo-deep-dive" className="space-y-6 mb-10 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-3xs">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            {content.architecturalDeepDive.title}
          </h3>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm font-semibold leading-relaxed">
            {content.architecturalDeepDive.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Diagnostic Comparison Table */}
          {content.architecturalDeepDive.tableHeaders && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-semibold border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    {content.architecturalDeepDive.tableHeaders.map((header, i) => (
                      <th key={i} className="p-3 font-mono">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                  {content.architecturalDeepDive.tableRows?.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition text-slate-600 dark:text-slate-400">
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className="p-3 leading-relaxed">
                          {cIdx === 0 ? <strong className="text-slate-900 dark:text-white font-mono">{val}</strong> : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ---- BENEFITS SECTION ---- */}
        <section id="pseo-benefits" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.benefitsHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.expandedBenefits.map((benefit, bIdx) => (
              <div 
                key={bIdx} 
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-3xs hover:border-blue-500/30 transition duration-150"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-1.5 leading-tight">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit.title}</span>
                </h4>
                <p className="text-xs text-slate-550 dark:text-slate-450 leading-relaxed font-semibold">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- STEP BY STEP ---- */}
        <section id="pseo-steps" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.stepByStepHeading}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">
            {item.stepByStepIntro}
          </p>

          <div className="space-y-4">
            {content.expandedStepsList.map((step) => (
              <div 
                key={step.stepNumber} 
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-3xs flex gap-4"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-mono font-black text-xs text-blue-600 dark:text-blue-400 shrink-0 select-none">
                  {step.stepNumber}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                    {step.docText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- EXAMPLES ---- */}
        <section id="pseo-examples" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.exampleHeading}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">
            {item.exampleIntro}
          </p>

          <div className="space-y-6">
            {item.examplesList.map((block, bIdx) => (
              <div key={bIdx} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-3xs">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3.5 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wide font-mono uppercase">
                    {block.title}
                  </span>
                  {block.code && (
                    <button
                      onClick={() => copyCode(block.code!, bIdx)}
                      className="text-slate-405 hover:text-blue-500 transition p-1 cursor-pointer flex items-center gap-1.5 text-[10px] font-bold font-mono"
                    >
                      {copiedIndex === bIdx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy code</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/10 text-xs text-slate-550 dark:text-slate-405 font-medium leading-relaxed border-b border-slate-200 dark:border-slate-800">
                  {block.description}
                </div>
                {block.code && (
                  <pre className="p-4 text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-slate-950 dark:bg-[#090D16] overflow-x-auto text-left leading-relaxed">
                    <code>{block.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---- COMMON MISTAKES ---- */}
        <section id="pseo-mistakes" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.mistakesHeading}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider font-mono">
            {item.mistakesIntro}
          </p>

          <div className="space-y-6">
            {content.commonMistakesDeep.map((mistake, mIdx) => (
              <div 
                key={mIdx} 
                className="rounded-2xl border border-slate-150 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-3xs"
              >
                <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-150 dark:border-slate-800 font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                  <span>{mistake.title}</span>
                </div>
                <div className="p-4 text-xs text-slate-550 dark:text-slate-400 border-b border-slate-150 dark:border-slate-800 leading-relaxed font-semibold">
                  {mistake.analysis}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-150 dark:divide-slate-800">
                  {/* Incorrect block */}
                  <div className="p-4 bg-red-500/5 hover:bg-red-500/[0.08] transition">
                    <span className="text-[9px] font-black uppercase bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-mono">
                      Incorrect Approach
                    </span>
                    <pre className="mt-3 text-xs font-mono text-red-500 overflow-x-auto text-left leading-relaxed">
                      <code>{mistake.badCode}</code>
                    </pre>
                  </div>
                  {/* Correct block */}
                  <div className="p-4 bg-emerald-500/5 hover:bg-emerald-500/[0.08] transition">
                    <span className="text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">
                      Correct Approach
                    </span>
                    <pre className="mt-3 text-xs font-mono text-emerald-600 dark:text-emerald-400 overflow-x-auto text-left leading-relaxed">
                      <code>{mistake.goodCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- TECHNICAL GLOSSARY (ADDITIONAL WORDS ACCUMULATION) ---- */}
        <section id="pseo-glossary" className="space-y-6 mb-10 p-6 rounded-xl bg-slate-100 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-widest uppercase font-mono">
            Technical Resource Glossary
          </h4>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.technicalGlossary.map((gloss, idx) => (
              <div key={idx} className="space-y-1">
                <dt className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {gloss.term}
                </dt>
                <dd className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                  {gloss.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- FAQs (FAQ Schema-Optimized accordion) ---- */}
        <section id="pseo-faq" className="space-y-6 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200/50 dark:border-slate-800">
            {item.faqHeading}
          </h2>

          <div className="space-y-3.5">
            {item.faqsList.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-3xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex justify-between items-center bg-slate-100/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                    {faq.question}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {faqOpen[idx] ? 'Close' : 'Query'}
                  </span>
                </button>
                {faqOpen[idx] && (
                  <div className="p-4 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold">
                    {faq.answer} This resolution operates client side instantly using high-performance algorithms inside NexusUtils sandbox interfaces, fully compliant with modern technical privacy standards.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* AdSense FAQ/Sidebar Board placement */}
        <AdSensePlacement slotId="faq-sidebar" />

        {/* ---- CTA SECTION (HIGH-CONVERSION CONSOLE LAUNCHER) ---- */}
        <section 
          id="pseo-cta" 
          className="my-10 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-900 dark:from-blue-900 dark:via-indigo-950 dark:to-slate-950 border border-blue-600/30 text-white text-center shadow-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 to-transparent opacity-80" />
          <div className="relative space-y-4 max-w-2xl mx-auto z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {item.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto font-medium leading-relaxed">
              {item.ctaText} Access all 20+ utilities instantly with zero installations and zero cloud databases.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              {item.relatedTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => onLaunchTool(tool.id)}
                  className="py-3 px-6 bg-white hover:bg-slate-100 text-indigo-705 text-xs font-black rounded-xl transition shadow-sm hover:-translate-y-0.5 cursor-pointer"
                >
                  Open {tool.name} Now
                </button>
              ))}
              <button
                onClick={onGoBack}
                className="py-3 px-6 bg-transparent hover:bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl transition"
              >
                Explore Tool Directory
              </button>
            </div>
          </div>
        </section>

        {/* ---- INTERNAL LINKING CENTER (SEO POWERHOUSE) ---- */}
        <section id="pseo-internal-linking" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">
            Programmatic SEO Hub & Related Resources
          </h4>

          {/* Related Articles Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onNavigateSlug(rel.category, rel.slug)}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-805/60 hover:border-blue-500/50 hover:-translate-y-0.5 transition duration-150 cursor-pointer shadow-3xs flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[8px] font-black uppercase tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono">
                      {rel.category}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 text-[10px] font-extrabold opacity-0 group-hover:opacity-100 transition duration-150">
                      Read →
                    </span>
                  </div>
                  <h5 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-405 transition-colors line-clamp-1">
                    {rel.title}
                  </h5>
                  <p className="text-[10px] text-slate-550 dark:text-slate-450 leading-relaxed font-semibold line-clamp-2">
                    {rel.metaDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs font-bold text-slate-500 select-none">
            <span className="hover:text-blue-500 cursor-pointer" onClick={onGoBack}>Homepage</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => onNavigateStaticPage('about')}>About</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => onNavigateStaticPage('contact')}>Contact</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => onNavigateStaticPage('privacy')}>Privacy</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => onNavigateStaticPage('terms')}>Terms</span>
          </div>
        </section>

        {/* AdSense Bottomboard banner */}
        <AdSensePlacement slotId="bottom-footer" />
      </div>
    </div>
  );
}
