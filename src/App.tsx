import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, Routes, Route, Link, useLocation
} from 'react-router-dom';
import { 
  Terminal, Sparkles, Activity, BookOpen, Layers, ChevronRight, 
  Check, ShieldAlert, CheckCircle2, Bot, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// استيراد البيانات والمكونات الأساسية لموقعك
import { categories, tools, blogArticles, resources } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

// استيراد صفحة التوجيه الجديدة التي أنشأناها في الخطوة الأولى
import GoPage from './components/GoPage';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus-pref-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showCookie, setShowCookie] = useState(() => !localStorage.getItem('nexus-cookie-accept'));

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('nexus-pref-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nexus-pref-theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppShell 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        paletteOpen={paletteOpen} 
        setPaletteOpen={setPaletteOpen} 
        showCookie={showCookie} 
        setShowCookie={setShowCookie} 
      />
    </BrowserRouter>
  );
}

// هنا نقوم بفحص المسار الحالي: إذا كان الرابط هو /go نقوم بإخفاء العناصر الثابتة كلياً
function AppShell({ darkMode, setDarkMode, paletteOpen, setPaletteOpen, showCookie, setShowCookie }: any) {
  const location = useLocation();
  const isBridgePage = location.pathname === '/go'; // شرط فحص صفحة التوجيه

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. عرض الـ Navbar فقط إذا لم نكن في صفحة التوجيه */}
      {!isBridgePage && (
        <Navbar 
          onSearchClick={() => setPaletteOpen(true)} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}

      <main className="flex-1 outline-none">
        <Routes>
          {/* الرابط الجديد لصفحة التوجيه المعزولة */}
          <Route path="/go" element={<GoPage />} />

          {/* المسار الأساسي للموقع (الصفحة الرئيسية) */}
          <Route path="/" element={<HomePage />} />
          
          {/* باقي مسارات موقعك الفرعية تضعها هنا كما هي */}
          <Route path="*" element={<div className="p-10 text-center">Module Active</div>} />
        </Routes>
      </main>

      {/* 2. عرض الـ Footer فقط إذا لم نكن في صفحة التوجيه */}
      {!isBridgePage && <Footer />}

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* 3. إخفاء إشعار الكوكيز في صفحة التوجيه حتى لا يغطي على الإعلانات */}
      <AnimatePresence>
        {showCookie && !isBridgePage && (
          <motion.div className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-slate-900 border p-4 rounded-xl shadow-xl z-50 space-y-3">
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 text-blue-500 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                We use localized state to configure visual preferences. No tracking templates are injected.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => { localStorage.setItem('nexus-cookie-accept', 'true'); setShowCookie(false); }}
                className="bg-blue-600 text-white font-semibold text-[10px] uppercase px-3 py-1.5 rounded cursor-pointer"
              >
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================================================
   المكون الخاص بالصفحة الرئيسية للموقع (مبسط ومتوافق مع بياناتك الحالية)
   ========================================================================== */
function HomePage() {
  return (
    <div className="space-y-24 pb-20 pt-20 text-center max-w-7xl mx-auto px-4">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-xs text-blue-600 px-3 py-1 rounded-full font-mono font-bold uppercase">
          <Sparkles className="h-3.5 w-3.5" /> NexusUtils Platform
        </div>
        <h1 className="font-display font-extrabold text-slate-900 dark:text-slate-50 tracking-tight text-4xl sm:text-6xl max-w-4xl mx-auto">
          Free Online Tools for Developers & Creators
        </h1>
        <p className="text-slate-500 dark:text-slate-405 max-w-2xl mx-auto text-sm sm:text-base">
          Powerful privacy-first utilities that work instantly in your browser. Complete offline data processing logic.
        </p>
      </div>

      {/* عرض شبكة الأدوات المتاحة في موقعك */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-10">
        {tools.map(tool => (
          <div key={tool.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-blue-600 w-fit mb-4"><Terminal className="h-5 w-5" /></div>
            <span className="text-sm font-bold block text-slate-900 dark:text-slate-50">{tool.name}</span>
            <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
