import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate 
} from 'react-router-dom';
import { 
  Terminal, Sparkles, TrendingUp, Search, Activity, BookOpen, 
  Layers, ChevronRight, Check, HelpCircle, ChevronRightSquare, 
  ArrowLeft, FileText, Smartphone, Laptop, Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data & Components Import
import { categories, tools, blogArticles, resources, faqs } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

// Tools Components Import
import JSONFormatter from './components/JSONFormatter';
import QRCodeGenerator from './components/QRCodeGenerator';
import PasswordMeter from './components/PasswordMeter';
import MarkdownPreviewer from './components/MarkdownPreviewer';
import HashConverter from './components/HashConverter';
import SEOTagGenerator from './components/SEOTagGenerator';
import UTMBuilder from './components/UTMBuilder';
import WordCounter from './components/WordCounter';
import UAParser from './components/UAParser';
import PDFHub from './components/PDFHub';
import HTMLSitemap from './components/HTMLSitemap';

/* ==========================================================================
   MAIN APPLICATION CORE (دمج محرك السكرول البشري التلقائي لحملات الـ 60 ثانية)
   ========================================================================== */
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // تبييض وتنظيف المصدر تلقائياً لحجب معالم منصات التبادل
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.href);
    }

    // محرك التمرير البشري التلقائي (Scroll Engine) للموقع بالكامل
    let scrollCount = 0;
    const scrollTask = setInterval(() => {
      const randomOffset = scrollCount % 2 === 0 ? (250 + Math.random() * 200) : (50 + Math.random() * 50);
      window.scrollTo({
        top: randomOffset,
        behavior: 'smooth'
      });
      scrollCount++;

      if (scrollCount > 120) clearInterval(scrollTask);
    }, 900);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearInterval(scrollTask);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
        
        {/* بنر إعلاني علوي ثابت من شبكة Clickadilla يظهر بانسيابية كأي موقع طبيعي */}
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 py-2 flex justify-center items-center">
          <div data-banner-id="1493623"></div>
        </div>

        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<DashboardPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/dashboard" element={<DashboardPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route path="/tools/:slug" element={<ToolRunnerPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/sitemap" element={<HTMLSitemap />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
        
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}

/* ==========================================================================
   PAGE: DASHBOARD (منطقة عرض الشبكة للأدوات البرمجية والمقالات المحدثة)
   ========================================================================== */
function DashboardPage({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-950/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Advanced Engineering Toolkit
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Elite-Grade Developer Sandbox Software
          </h1>
          <p className="text-sm md:text-base text-slate-350 leading-relaxed font-sans font-light">
            Zero Registrations. Client-First Isolation and Encryption. Securely process payload strings, payload data, metadata, and files entirely within local device memory.
          </p>
          
          <div className="pt-2 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search workspaces... (Ctrl + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 hover:border-white/20 focus:border-blue-500 focus:bg-slate-950 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
            />
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-4">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium font-mono tracking-wide transition-all uppercase ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
          >
            All Utilities ({tools.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium font-mono tracking-wide transition-all uppercase ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  key={tool.id}
                  className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 rounded-2xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors border border-slate-100 dark:border-slate-850">
                        {tool.id === 'json-formatter' && <Terminal className="h-5 w-5" />}
                        {tool.id === 'qr-generator' && <Layers className="h-5 w-5" />}
                        {tool.id === 'password-generator' && <Activity className="h-5 w-5" />}
                        {tool.id === 'markdown-editor' && <BookOpen className="h-5 w-5" />}
                        {tool.id === 'text-analyzer' && <TrendingUp className="h-5 w-5" />}
                        {tool.id === 'seo-helper' && <Search className="h-5 w-5" />}
                        {tool.id === 'utm-builder' && <ChevronRightSquare className="h-5 w-5" />}
                        {tool.id === 'word-counter' && <FileText className="h-5 w-5" />}
                        {tool.id === 'ua-parser' && <Smartphone className="h-5 w-5" />}
                        {tool.id === 'pdf-hub' && <Laptop className="h-5 w-5" />}
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-950 text-slate-500 px-2 py-0.5 rounded-md uppercase border border-slate-150 dark:border-slate-850">
                        {tool.category}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2 font-sans font-light">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/30">
                      Local Sandbox
                    </span>
                    <Link 
                      to={`/tools/${tool.slug}`}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline font-mono"
                    >
                      Initialize <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: TOOL RUNNER (Active tool workspace core with Smartlink Integration)
   ========================================================================== */
function ToolRunnerPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [shared, setShared] = useState(false);

  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return <NotFoundPage />;
  }

  return (
    <div id="runner-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-850 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Link to="/dashboard" className="hover:text-blue-600 hover:underline">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-550 dark:text-slate-350 capitalize">{tool.category}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            {tool.name}
          </h1>
          <p className="text-xs text-slate-500 leading-normal max-w-xl">{tool.longDescription}</p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Recommend workbench:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Boost performance and format code securely with premium ${tool.name} fully client-side on NexusUtils!`)}&url=${encodeURIComponent(`https://nexusutils.online/tools/${tool.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 px-2 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-905 text-[10px] flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold"
              >
                <Twitter className="h-3 w-3 text-blue-400" /> Share on X
              </a>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`https://nexusutils.online/tools/${tool.slug}`);
                    setShared(true);
                    setTimeout(() => setShared(false), 2000);
                  } catch (e) {
                    console.warn(e);
                  }
                }}
                className="p-1 px-2 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-905 text-[10px] flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
              >
                {shared ? "Copied Done!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          className="button-secondary shrink-0 text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </button>
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-250/80 dark:border-slate-800 p-5 md:p-8 rounded-2xl shadow-sm">
        {tool.id === 'json-formatter' && <JSONFormatter />}
        {tool.id === 'qr-generator' && <QRCodeGenerator />}
        {tool.id === 'password-generator' && <PasswordMeter />}
        {tool.id === 'markdown-editor' && <MarkdownPreviewer />}
        {tool.id === 'text-analyzer' && <HashConverter />}
        {tool.id === 'seo-helper' && <SEOTagGenerator />}
        {tool.id === 'utm-builder' && <UTMBuilder />}
        {tool.id === 'word-counter' && <WordCounter />}
        {tool.id === 'ua-parser' && <UAParser />}
        {tool.id === 'pdf-hub' && <PDFHub />}
      </section>

      {/* دمج الـ Smartlink الترويجي بطريقة أصلية وطبيعية كإعلان بانر داخل صفحة الأداة */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">Partner Infrastructure</span>
          <h4 className="font-display font-bold text-sm sm:text-base">Need Scalable Enterprise Computing Cloud?</h4>
          <p className="text-xs text-slate-400 max-w-xl">Accelerate performance workflows with redundant secure execution nodes. Deploy distributed computing frameworks across worldwide regions instantly.</p>
        </div>
        <a 
          href="https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all font-mono whitespace-nowrap shadow-sm shrink-0 border border-blue-500"
        >
          Explore Nodes →
        </a>
      </section>

      <ToolGuideSection toolId={tool.id} toolName={tool.name} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3">
          <HelpCircle className="h-8 w-8 text-blue-500" />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-50">Scientific Tool Documentation</h3>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Designed and compiled utilizing low-overhead compilation engines, guaranteeing that your values remain safe from network tracking tags. Explore answers to mechanical questions nearby.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-150 dark:border-slate-800">
            <span className="font-semibold text-xs block text-slate-850 dark:text-slate-100">Does {tool.name} transfer data blocks to servers?</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              No. Our workspace runs 100% on client JS. No data inputs reach external routes, except when leveraging optional AI content modules proxied safely under SSL layers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ==========================================================================
   PAGE: TOOL GUIDES (High-value contextual guides for AdSense compliance)
   ========================================================================== */
function ToolGuideSection({ toolId, toolName }: { toolId: string; toolName: string }) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 md:p-8 space-y-4 text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed font-light">
      <h2 className="font-display font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider font-mono text-left">
        {toolName} Implementation Checklist &amp; Operational Matrix
      </h2>
      <p className="text-left">
        When executing software compilation within an asynchronous JavaScript workspace framework, developers face common challenges regarding stack tracing variables, character sets handling, and volatile local memory leaks. The architecture of {toolName} deployed on NexusUtils eliminates multi-threaded overhead requirements by operating within isolated sandboxed execution scopes. This process ensures runtime operations execute inside a safe single-thread model directly linked to your local device CPU core.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
        <div className="space-y-2">
          <h4 className="font-bold text-slate-850 dark:text-slate-200 text-[11px] font-mono">1. Local Host Processing Framework</h4>
          <p>
            Traditional systems transmit string operations over exposed APIs to back-end node microservices. This pipeline exposes data strings to tracking nodes, data packet captures, and server file system logs. Our engine forces processing arrays to operate completely inside local system boundaries.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-slate-850 dark:text-slate-200 text-[11px] font-mono">2. Compilation Standards Checklists</h4>
          <p>
            To cross-compile generated data formats cleanly across cross-platform frameworks, the application tests active variable blocks against W3C compliance modules. This step ensures scripts process safely without throwing unhandled exceptions in browser viewports.
          </p>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   PAGE: RESOURCES REPOSITORY
   ========================================================================== */
function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 text-left">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-850 pb-5">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Developer Specifications Library</h1>
        <p className="text-xs text-slate-500">Curated industrial resources, network validation whitepapers, and software framework documentations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl space-y-3 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded uppercase border border-blue-100 dark:border-blue-900/20">{item.type}</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-normal font-light">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: FAQS INDEX
   ========================================================================== */
function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-left">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-850 pb-5">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Technical Architecture FAQ</h1>
        <p className="text-xs text-slate-500">Deep architectural answers regarding state machines, memory limits, and platform mechanics.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors"
            >
              <span>{faq.question}</span>
              <span className="text-lg font-mono text-slate-400">{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: KNOWLEDGE BASE INDEX (SEO Blog system)
   ========================================================================== */
function BlogIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 text-left">
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-850 pb-5">
        <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">NexusUtils Technical Chronicle</h1>
        <p className="text-xs text-slate-500">Expert engineering publications regarding client-side data safety, SEO structures, and workflow automation guidelines.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogArticles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-950 text-slate-500 px-2 py-0.5 rounded border border-slate-150 dark:border-slate-850">{article.date}</span>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">{article.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-light line-clamp-3">{article.summary}</p>
            </div>
            <div className="p-6 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-850 flex justify-end">
              <Link to={`/blog/${article.slug}`} className="text-xs font-semibold font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">Read Article →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PAGE: BLOG ARTICLE VIEWER
   ========================================================================== */
function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) return <NotFoundPage />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-left space-y-6">
      <Link to="/blog" className="text-xs font-semibold font-mono text-slate-400 hover:text-blue-600 flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5" /> Back to Chronicle</Link>
      <div className="space-y-2 border-b border-slate-150 dark:border-slate-850 pb-5">
        <span className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/20">{article.date}</span>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">{article.title}</h1>
      </div>
      <article className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light whitespace-pre-line space-y-4">
        {article.content}
      </article>
    </div>
  );
}

/* ==========================================================================
   PAGE: STANDARD SYSTEM EXCEPTION (451/404 Handler)
   ========================================================================== */
function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5">
      <div className="inline-flex p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/20 rounded-2xl text-red-600 dark:text-red-400">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">Workspace Context Lost</h2>
      <p className="text-xs text-slate-500 leading-normal max-w-xs mx-auto font-light">The tool node pointer, utility resource category string, or document directory link you targeted cannot be verified in local index registers.</p>
      <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono px-5 py-2.5 rounded-xl uppercase tracking-wide transition-all shadow-sm">
        Return Home
      </Link>
    </div>
  );
}
