import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import StaticPages from './components/StaticPages';
import { ArrowLeft, Moon, Sun, ShieldAlert } from 'lucide-react';

type AppView = 'landing' | 'dashboard' | 'static';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [activeStaticPage, setActiveStaticPage] = useState<string>('about');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const triggerCategory = (catId: string) => {
    setSelectedCategory(catId);
    setView('dashboard');
  };

  const showStaticPage = (pageId: string) => {
    setActiveStaticPage(pageId);
    setView('static');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedCategory(undefined);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreAll = () => {
    setSelectedCategory(undefined);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-200">
      {/* 1. Show Landing View */}
      {view === 'landing' && (
        <>
          {/* Landing Mini Top Header */}
          <nav className="h-16 border-b border-slate-200/60 dark:border-white/5 px-4 flex items-center justify-between bg-white dark:bg-[#0F172A] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 cursor-pointer font-extrabold text-base select-none" onClick={handleGoHome}>
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-black">N</div>
                <span className="text-slate-900 dark:text-white">Nexus<span className="text-blue-500">Utils</span></span>
              </div>
              <button
                onClick={handleExploreAll}
                className="py-1.5 px-4 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-2xs hover:bg-blue-500 transition cursor-pointer"
              >
                Launch Dashboard
              </button>
            </div>
          </nav>

          <LandingPage onExplore={handleExploreAll} onSelectCategory={triggerCategory} />

          {/* Simple footer on landing */}
          <footer className="py-12 bg-white dark:bg-[#0F172A] border-t border-slate-150 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Infinite Utilities, zero server data storage.</p>
              <div className="flex gap-4">
                {[
                  { id: 'about', label: 'About Us / من نحن' },
                  { id: 'privacy', label: 'Privacy Policy / سياسة الخصوصية' },
                  { id: 'terms', label: 'Terms of Service / شروط الاستخدام' },
                  { id: 'contact', label: 'Contact Us / اتصل بنا' },
                  { id: 'faq', label: 'FAQs / الأسئلة الشائعة' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-blue-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </>
      )}

      {/* 2. Show Main Tools Workspace Dashboard */}
      {view === 'dashboard' && (
        <Dashboard
          initialCategoryId={selectedCategory}
          onGoHome={handleGoHome}
          onGoStaticPage={showStaticPage}
        />
      )}

      {/* 3. Show Static Content View */}
      {view === 'static' && (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-250">
          {/* Static View Navigation Header */}
          <header className="sticky top-0 bg-white/85 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-35 py-3.5 px-4">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 py-1.5 px-3.5 rounded-lg transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go Back Dashboard
              </button>
              <div onClick={handleGoHome} className="flex items-center gap-2 cursor-pointer font-black text-sm select-none">
                <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white text-[12px]">N</div>
                <span className="text-slate-805 dark:text-white">NexusUtils</span>
              </div>
            </div>
          </header>

          <main className="flex-1 py-10 px-4">
            <StaticPages pageId={activeStaticPage} />
          </main>

          <footer className="py-8 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-400">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-semibold">
              <p>© 2026 NexusUtils • جميع الحقوق محفوظة. Certified AdSense-ready network portal.</p>
              <div className="flex gap-4">
                {[
                  { id: 'about', label: 'About Us / من نحن' },
                  { id: 'privacy', label: 'Privacy Policy / سياسة الخصوصية' },
                  { id: 'terms', label: 'Terms of Service / شروط الاستخدام' },
                  { id: 'contact', label: 'Contact Us / اتصل بنا' },
                  { id: 'faq', label: 'FAQs / الأسئلة الشائعة' }
                ].map((p) => (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      showStaticPage(p.id);
                    }}
                    className="hover:text-blue-500 hover:underline transition cursor-pointer px-1"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
