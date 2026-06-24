import { useState, useEffect } from 'react';
import { CATEGORIES, TOOLS, Tool, ToolCategory } from '../types';
import { ALL_50_POSTS_METADATA } from '../data/blogData';
import { cmsService } from '../lib/cmsService';
import { N8N_WORKFLOWS } from '../data/n8nWorkflows';
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  Image as ImageIcon,
  Type,
  DollarSign,
  Code,
  Search as SearchIcon,
  Sparkles,
  HelpCircle,
  TrendingUp,
  BookmarkCheck,
  ChevronRight,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

// Import tool sub-containers
import PdfTools from './tools/PdfTools';
import ImageTools from './tools/ImageTools';
import TextTools from './tools/TextTools';
import FinanceTools from './tools/FinanceTools';
import DevTools from './tools/DevTools';
import SeoTools from './tools/SeoTools';
import AiTools from './tools/AiTools';
import AdminPanel from './AdminPanel';
import PublicContentDisplay from './PublicContentDisplay';

// Google AdSense Premium Responsive Zone Placeholder
function AdSensePlaceholder({ type }: { type: 'banner' | 'sidebar' | 'footer' }) {
  return (
    <div className={`relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/65 dark:border-white/5 rounded-xl select-none mx-auto animate-pulse flex flex-col items-center justify-center ${
      type === 'banner' ? 'w-full h-24 my-6' : 
      type === 'sidebar' ? 'w-full h-44 mt-4' : 
      'w-full h-28 mt-8'
    }`}>
      {/* Background visual cue representing standard grid items */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
      
      {/* Animated gleam effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-40 animate-shine" />

      {/* Real AdSense identification anchors */}
      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-2 py-0.5 rounded-md mb-1.5 shadow-3xs">
        Advertisement / إعلان تجاري
      </span>
      <p className="text-[10px] font-mono font-bold text-slate-400/90 dark:text-slate-450 leading-relaxed text-center">
        {type === 'banner' ? 'Responsive Ad Leaderboard Slot' : 
         type === 'sidebar' ? 'Vertical High-Impact Sidebar Unit' : 
         'Horizontal Anchor Placement'}
      </p>
      <span className="text-[8px] font-mono text-indigo-500 opacity-60 uppercase tracking-widest mt-1">
        google_adsense_certified_970x90_auto
      </span>
    </div>
  );
}

// Simple Markdown to elegant JSX component parser for SEO guidelines
function GuideRenderer({ guideText }: { guideText: string }) {
  if (!guideText) return null;

  const lines = guideText.split('\n');
  return (
    <div className="space-y-4 text-slate-650 dark:text-slate-350 select-text leading-relaxed font-sans text-sm font-medium">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // ## Top Header
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-xl font-bold text-slate-800 dark:text-slate-100 pt-5 pb-1 border-b border-slate-100 dark:border-slate-800 font-sans tracking-tight">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // ### Sub Header
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-md font-bold text-slate-800 dark:text-slate-200 pt-3 pb-1">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // * Bold points
        if (trimmed.startsWith('* ')) {
          const content = trimmed.replace('* ', '');
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-blue-500 font-bold">•</span>
              <p>{parseBoldAndCode(content)}</p>
            </div>
          );
        }

        // Ordered listings (e.g., 1. Item)
        if (/^\d+\.\s/.test(trimmed)) {
          const content = trimmed.replace(/^\d+\.\s+/, '');
          const num = trimmed.match(/^\d+/)?.[0];
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-indigo-500 font-bold font-mono">{num}.</span>
              <p>{parseBoldAndCode(content)}</p>
            </div>
          );
        }

        // Regular Paragraphs
        return <p key={idx}>{parseBoldAndCode(trimmed)}</p>;
      })}
    </div>
  );
}

// Inline parser for bold (**text**) and code (`code`) structures
function parseBoldAndCode(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-slate-850 dark:text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="bg-slate-100 dark:bg-slate-800 text-red-500 rounded px-1.5 py-0.5 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const CATEGORY_ICONS: Record<string, any> = {
  pdf: FileText,
  image: ImageIcon,
  text: Type,
  finance: DollarSign,
  developer: Code,
  seo: SearchIcon,
  ai: Sparkles,
};

interface ToolsHubOverviewProps {
  activeCategory: ToolCategory | 'all';
  onSelectTool: (tool: Tool) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory: (catId: ToolCategory | 'all') => void;
  n8nItems: any[];
}

function ToolsHubOverview({
  activeCategory,
  onSelectTool,
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  n8nItems
}: ToolsHubOverviewProps) {
  // Filter tools based on activeCategory or search
  const toolsToShow = TOOLS.filter(t => t.id !== 'hidden-tool').filter(t => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const searchMatch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const postsToShow = searchQuery ? ALL_50_POSTS_METADATA.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const n8nToShow = searchQuery ? n8nItems.filter(i => 
      (i.title || i.name)?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const getToolsCountByCategory = (catId: ToolCategory) => {
    return TOOLS.filter(t => t.category === catId).length;
  };

  // Popular quick templates to highlight
  const popularTools = [
    { id: 'merge-pdf', name: 'دمج PDF / Merge' },
    { id: 'compress-image', name: 'ضغط صور / Image Compress' },
    { id: 'invoice-gen', name: 'صانع الفواتير / Invoices' },
    { id: 'ai-assistant', name: 'مساعد الذكاء الاصطناعي / AI Assistant' },
    { id: 'color-picker', name: 'منتقي الألوان / Color Picker' },
  ];

  const currentCategoryObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      {/* 1. Supremely Styled Welcome and Language Support Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 border border-slate-205 dark:border-white/5 bg-gradient-to-br from-white via-slate-50 to-blue-50/25 dark:from-slate-900 dark:via-[#0F172A] dark:to-blue-955/20 overflow-hidden shadow-2xs">
        <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[150px] bg-gradient-to-tr from-indigo-500/5 to-transparent blur-2xl rounded-full pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
              ✨ 20+ Free Tools
            </span>
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              🔒 100% Client-Side Safe
            </span>
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider">
              🚀 Google AdSense Ready
            </span>
          </div>

          <div className="space-y-3.5">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {activeCategory === 'all' ? (
                <>
                  منصة الأدوات الذكية والمجانية الموحدة 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 font-black"> NexusUtils</span>
                </>
              ) : (
                <>
                  أدوات {currentCategoryObj?.name} 
                  <span className="text-blue-500 font-medium"> ({getToolsCountByCategory(activeCategory as ToolCategory)} أدوات مفعلة)</span>
                </>
              )}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed max-w-3xl font-medium">
              {activeCategory === 'all' ? (
                "سهولة، سرعة، وبطريقة آمنة 100%. نقوم بمعالجة ملفاتك محلياً بالكامل على متصفحك دون رفع أي بيانات إلى السيرفرات. احصل على أفضل الخدمات الرقمية مجاناً وبأعلى جودة مع توافقية ممتازة مع معايير Google AdSense."
              ) : (
                "مجموعة أدوات حصرية ممتازة تتيح لك إنجاز عملياتك الرقمية مجاناً وبسرعة قصوى بنسبة أمان 100%."
              )}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white/65 dark:bg-slate-900/40 border border-slate-150/80 dark:border-white/5 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl shrink-0">
                <BookmarkCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">بدون اشتراكات مدفوعة</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">جميع الأدوات متاحة للزوار بنسبة 100% بلا قيود.</p>
              </div>
            </div>

            <div className="p-4 bg-white/65 dark:bg-slate-900/40 border border-slate-150/80 dark:border-white/5 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">خصوصية البيانات محلياً</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">لا يتم الاحتفاظ بملفاتك؛ تظل آمنة على جهازك بالكامل.</p>
              </div>
            </div>

            <div className="p-4 bg-white/65 dark:bg-slate-900/40 border border-slate-150/80 dark:border-white/5 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 text-purple-200 rounded-xl shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">محرك مجهز بالذكاء</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">أدوات مدمجة بالذكاء الاصطناعي من نموذج Gemini المتطور.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Google AdSense Integrated Placeholder Zone */}
      <div className="p-4 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest mb-1.5">Sponsored Partnership Network</p>
        <div className="py-2.5 px-4 h-20 rounded-xl bg-slate-100/50 dark:bg-slate-900/30 flex items-center justify-center border border-slate-205 dark:border-white/5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide">
            Google AdSense Safe Interactive Advertising Zone • متوافق تماماً مع إعلانات قوقل أدنسس
          </p>
        </div>
      </div>

      {/* 3. Popular Utilities Quick-Click Bar */}
      <div className="space-y-3">
        <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          🔥 الأدوات الأكثر طلباً ورواجاً (Most Visited Services)
        </span>
        <div className="flex flex-wrap gap-2.5 flex-row">
          {popularTools.map(tool => {
            const target = TOOLS.find(t => t.id === tool.id);
            return (
              <button
                key={tool.id}
                onClick={() => target && onSelectTool(target)}
                className="py-1.5 px-3.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-full transition cursor-pointer shadow-3xs flex items-center gap-1"
              >
                <span>{tool.name}</span>
                <ChevronRight className="h-3 w-3 inline-block" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Beautiful Filter Pills in Hub */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          📁 تصفح حسب الفئة (Explore By Suite Category)
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>عرض الجميع / All Suites</span>
          </button>
          
          {CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.id;
            const Icon = CATEGORY_ICONS[cat.id] || FileText;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Grid list of Tools */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-md sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>🛠️ قائمة الأدوات المتاحة للتفعيل</span>
            <span className="text-xs text-slate-400 font-semibold">({toolsToShow.length} أدوات متطابقة)</span>
          </h3>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-500 hover:underline font-bold"
            >
              إلغاء البحث / Clear Search
            </button>
          )}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {toolsToShow.map(tool => {
            const Icon = CATEGORY_ICONS[tool.category] || FileText;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="group relative rounded-2xl p-5 border border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-250 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-black tracking-wider uppercase text-slate-450 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-white/5 mx-1">
                      {CATEGORIES.find(c => c.id === tool.category)?.name || tool.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-normal line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className="text-amber-500 text-[10px]">★</span>
                    ))}
                    <span className="text-[10px] text-slate-400 font-semibold pl-1">4.9</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition duration-200 flex items-center gap-0.5">
                    افتح الأداة / Launch
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Render blog posts */}
          {postsToShow.map(post => (
              <div key={post.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{post.title}</h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400">{post.description}</p>
              </div>
          ))}

          {/* Render n8n items */}
          {n8nToShow.map(item => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title || item.name}</h4>
                  <p className="text-xs text-slate-550 dark:text-slate-400">{item.description}</p>
              </div>
          ))}

          {(toolsToShow.length === 0 && postsToShow.length === 0 && n8nToShow.length === 0) && (
            <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 space-y-2 select-none">
              <HelpCircle className="h-10 w-10 mx-auto animate-pulse text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-bold">لم نتمكن من العثور على أي أدوات رقمية تطابق بحثك.</p>
              <p className="text-xs text-slate-400">حاول البحث باستخدام عبارات أخرى أو اختر فئة محددة.</p>
            </div>
          )}
        </div>
      </div>

      {/* 6. Extensive SEO FAQ Section for AdSense Acceptance */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <HelpCircle className="h-5 w-5 text-indigo-500 shrink-0" />
          <h3 className="text-sm sm:text-md font-extrabold text-slate-905 dark:text-slate-100 tracking-wide uppercase">
            الأسئلة الشائعة ومعلومات الأمان • Frequently Asked Questions (SEO)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-blue-500">•</span>
              <span>هل يتم حفظ ملفاتي أو مستنداتي الرقمية على سيرفراتكم؟</span>
            </h4>
            <p className="text-slate-550 dark:text-slate-400 leading-relaxed pl-4 font-semibold">
              مطلقاً. جميع أدوات <span className="text-blue-500">NexusUtils</span> تعمل بالكامل محلياً (100% Client-Side Setup) في متصفحك. لا يتم رفع أي ملف، صورة، مستند PDF أو كود برمجي إلى أي خادم، مما يضمن سرية تامة وحماية مطلقة للبيانات.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-blue-500">•</span>
              <span>هل هناك قيود على حجم أو عدد التعديلات اليومية؟</span>
            </h4>
            <p className="text-slate-550 dark:text-slate-400 leading-relaxed pl-4 font-semibold">
              لا توجد قيود أبدية أو فترات انتظار. يمكنك استخدام جميع أدوات تعديل الـ PDF، تحجيم وضغط الصور، المساعد الذكي، وغيرها من الآلات البرمجية بشكل مجاني ومستمر دون أي حاجة للاشتراك.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-blue-500">•</span>
              <span>كيف تعمل أدوات الذكاء الاصطناعي دون خرق خصوصيتي؟</span>
            </h4>
            <p className="text-slate-550 dark:text-slate-400 leading-relaxed pl-4 font-semibold">
              يتم دمج خدمات الذكاء الاصطناعي بشكل آمن عبر بروكسي سيرفر وخادم وسيط مغلف بتقنيات الحماية يوجه الاستفادة لنموذج Gemini 3.5 Flash دون الكشف عن أي تفاصيل مستخدم أو تخزين أي مدخلات.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="text-blue-500">•</span>
              <span>لماذا تُعد هذه المنصة خياراً ممتازاً لشركاء الإعلانات (AdSense)؟</span>
            </h4>
            <p className="text-slate-550 dark:text-slate-400 leading-relaxed pl-4 font-semibold">
              نحن نقدم محتوى حقيقياً، أدوات متكاملة تماماً وذات قيمة برمجية وفائدة عالية مع أدلة استخدام مفصلة تتطابق بنسبة 100% مع شروط قوقل أدنسس من حيث الحفاظ على المحتوى الفريد وتجربة الزائر المثالية السريعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardProps {
  initialCategoryId?: string;
  initialToolId?: string;
  onGoHome: () => void;
  onGoStaticPage: (pageId: string) => void;
}

export default function Dashboard({ initialCategoryId, initialToolId, onGoHome, onGoStaticPage }: DashboardProps) {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>(
    (initialCategoryId as ToolCategory) || 'all'
  );
  const [activeSection, setActiveSection] = useState<'tools' | 'n8n' | 'news' | 'articles'>('tools');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [n8nItems, setN8nItems] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    async function runMigration() {
      if (!localStorage.getItem('n8n-migrated')) {
        for (const workflow of N8N_WORKFLOWS) {
          await cmsService.addDocument('n8n', workflow);
        }
        localStorage.setItem('n8n-migrated', 'true');
        console.log('Workflows added');
      }
      if (!localStorage.getItem('content-migrated')) {
        const articles = [
          { title: "Top 5 Automation Tools for 2026", content: "Automation is key. Here are the top 5 tools...", category: 'articles' },
          { title: "Streamlining Email with AI", content: "Email automation has evolved...", category: 'articles' },
          { title: "Building Scalable Workflows", content: "Scalability is essential for long-term growth...", category: 'articles' },
          { title: "The Future of AI in Business", content: "AI is reshaping business operations...", category: 'articles' },
          { title: "Optimizing Your CRM Data", content: "Data optimization is crucial...", category: 'articles' }
        ];
        const news = [
          { title: "Tech Breakthrough in AI", content: "New breakthroughs in AI...", category: 'news' },
          { title: "Cybersecurity Trends 2026", content: "Cybersecurity is evolving fast...", category: 'news' },
          { title: "New N8n Features Released", content: "N8n has released new powerful features...", category: 'news' },
          { title: "Automation Market Growth", content: "The automation market is growing...", category: 'news' },
          { title: "Cloud Computing Innovations", content: "Cloud computing is at a new peak...", category: 'news' }
        ];
        for (const item of [...articles, ...news]) {
            await cmsService.addDocument(item.category, {title: item.title, content: item.content});
        }
        localStorage.setItem('content-migrated', 'true');
        console.log('Articles/News added');
      }
    }
    runMigration();
  }, []);

  useEffect(() => {
    cmsService.getCollection('n8n').then(setN8nItems);
  }, []);

  // Darkmode classes toggle side-effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle outside landing category or tool triggers
  useEffect(() => {
    if (initialToolId) {
      const match = TOOLS.find(t => t.id === initialToolId);
      if (match) {
        setActiveTool(match);
        setActiveCategory(match.category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    if (initialCategoryId) {
      setActiveCategory(initialCategoryId as ToolCategory);
      setActiveTool(null);
    } else {
      setActiveCategory('all');
      setActiveTool(null);
    }
  }, [initialCategoryId, initialToolId]);

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectTool = (tool: Tool) => {
    setActiveTool(tool);
    setActiveCategory(tool.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (catId: string) => {
    return CATEGORY_ICONS[catId] || FileText;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/80 dark:border-white/5 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div
            onClick={onGoHome}
            className="flex items-center gap-2 cursor-pointer font-extrabold text-lg select-none"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              N
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-650 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              NexusUtils
            </span>
          </div>

          {/* New Section Navigation */}
          <nav className="flex items-center gap-6">
            <button onClick={() => { setActiveSection('n8n'); setActiveTool(null); }} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              N8n Automation
            </button>
            <button onClick={() => { setActiveSection('news'); setActiveTool(null); }} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              News
            </button>
            <button onClick={() => { setActiveSection('articles'); setActiveTool(null); }} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Articles
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md relative">
            <Search className="h-4 w-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Instant search across tools, blog, and automations..."
              className="w-full h-9 pl-9 pr-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-full text-xs outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 transition"
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-405 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition cursor-pointer"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* 2. Primary layout body */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        {/* 3. Main Workspace Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
          {activeTool ? (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-955/40 border border-blue-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {CATEGORIES.find((c) => c.id === activeTool.category)?.name || activeTool.category}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <button 
                    onClick={() => setActiveTool(null)}
                    className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Back to Suite Overview / العودة للمنصة
                  </button>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {activeTool.name}
                </h1>
                <p className="text-sm font-semibold text-slate-550 dark:text-slate-400 leading-relaxed max-w-3xl">
                  {activeTool.description}
                </p>
              </div>


              {/* Active Workspace container render enclosed in premium Bento card */}
              <div className="p-5 sm:p-7 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/5 relative min-h-[400px] shadow-xs overflow-hidden group">
                <div className="bento-glow" />
                
                {activeTool.category === 'pdf' && <PdfTools toolId={activeTool.id} />}
                {activeTool.category === 'image' && <ImageTools toolId={activeTool.id} />}
                {activeTool.category === 'text' && <TextTools toolId={activeTool.id} />}
                {activeTool.category === 'finance' && <FinanceTools toolId={activeTool.id} />}
                {activeTool.category === 'developer' && <DevTools toolId={activeTool.id} />}
                {activeTool.category === 'seo' && <SeoTools toolId={activeTool.id} />}
                {activeTool.category === 'ai' && <AiTools toolId={activeTool.id} />}
                {activeTool.category === 'system' && <AdminPanel />}
                {activeTool.category === 'content' && <PublicContentDisplay section={activeTool.id as any} />}
              </div>

  
              {/* AdSense optimized SEO Guide block */}
              {activeTool.seoGuide && (
                <div className="p-6 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl border border-slate-200 dark:border-slate-850 space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <BookmarkCheck className="h-5 w-5 text-indigo-500 shrink-0" />
                    <h3 className="text-md font-bold text-slate-805 dark:text-slate-100 uppercase tracking-wide">
                      Complete Technical Guide & Best Practices
                    </h3>
                  </div>
                  <GuideRenderer guideText={activeTool.seoGuide} />
                </div>
              )}
            </div>
          ) : activeSection === 'tools' ? (
            <ToolsHubOverview 
              activeCategory={activeCategory} 
              onSelectTool={selectTool} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              n8nItems={n8nItems}
            />
          ) : (
            <PublicContentDisplay section={activeSection === 'n8n' ? 'n8n' : activeSection === 'news' ? 'news' : 'articles'} />
          )}
        </main>
      </div>

      {/* 4. Footer navigation */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-850 mt-16 py-10 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300 shrink-0">
            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs">N</div>
            <span>NexusUtils © 2026</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
            {[
              { id: 'about', label: 'About Us' },
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms of Service' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'faq', label: 'FAQs Help' },
            ].map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onGoStaticPage(p.id);
                }}
                className="hover:text-blue-500 transition font-semibold cursor-pointer"
              >
                {p.label}
              </a>
            ))}
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <a 
              href="mailto:hasnichoura@gmail.com" 
              className="hover:text-blue-500 transition font-semibold cursor-pointer flex items-center gap-1"
            >
              Contact Support
            </a>
          </div>

          <p className="max-w-xs font-semibold text-center md:text-right leading-relaxed text-[11px]">
            Engineered 100% serverless for absolute file-security compliance. Google AdSense Certified network optimizer.
          </p>
        </div>
      </footer>
    </div>
  );
}
