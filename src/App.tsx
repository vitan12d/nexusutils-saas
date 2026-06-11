import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Braces, 
  Link2, 
  Sparkles,
  ShieldCheck,
  Globe,
  Activity,
  Zap,
  CheckCircle,
  ArrowRight,
  Lock
} from 'lucide-react';
import GoPage from './components/GoPage';

// مكون صفحة هبوط إعلانية احترافية (Professional Ad Landing Page)
const AdLandingPage: React.FC<{ id: string, title: string, description: string }> = ({ id, title, description }) => {
  const [progress, setProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. تبييض المصدر (Referrer Masking)
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.href);
    }

    // 2. سكرول ذكي مدمج بشكل طبيعي (يخدم البوت والزائر الحقيقي)
    let scrollCount = 0;
    const scrollTask = setInterval(() => {
      window.scrollTo({
        top: scrollCount % 2 === 0 ? 450 : 0,
        behavior: 'smooth'
      });
      scrollCount++;
      if (scrollCount > 8) clearInterval(scrollTask);
    }, 1200);

    // 3. شريط تقدم يوحي بالأمان والاحترافية
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // 4. التوجيه التلقائي بعد 6 ثوانٍ (للبوتات) أو انتظار نقرة الزائر
    const autoRedirect = setTimeout(() => {
      if (buttonRef.current) buttonRef.current.click();
    }, 6500);

    return () => {
      clearInterval(scrollTask);
      clearInterval(timer);
      clearTimeout(autoRedirect);
    };
  }, [id]);

  const handleAction = () => {
    const adUrl = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
    window.open(adUrl, '_blank');
    window.location.href = adUrl;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* تأثير خلفية متحرك */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full"></div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600/20 p-4 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-slate-100">{title}</h2>
        <p className="text-slate-400 text-center text-sm mb-8 leading-relaxed">
          {description}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Encrypted SSL Tunnel Active</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Zero-Knowledge Data Processing</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Node Authentication Verified</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">Verifying Gateway...</span>
            <span className="text-xs text-blue-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button 
          ref={buttonRef}
          onClick={handleAction}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
        >
          <span>Continue to Destination</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="mt-6 flex justify-center items-center space-x-2 text-[10px] text-slate-600 uppercase tracking-widest">
          <Lock size={12} />
          <span>Secured by NexusUtils Shield</span>
        </div>
      </div>
      
      {/* محتوى وهمي إضافي أسفل البطاقة لضمان وجود مساحة للسكرول الحقيقي */}
      <div className="mt-12 opacity-0 h-[800px]">
        Scroll Content for Bots
      </div>
    </div>
  );
};

// المكون الرئيسي للموقع (استعادة الأدوات الأصلية)
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <Braces className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              NexusUtils
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Tools</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Documentation</a>
            <Link to="/go" className="text-sm font-medium text-slate-400 hover:text-white transition">Bridge Test</Link>
          </nav>
          <div className="flex items-center">
            <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition border border-slate-700">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">v2.4.0 Global Release</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Elite-Grade Developer Sandbox Software
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Zero Registrations. Client-First Isolation and Encryption. Securely process files and payloads entirely within local device memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-slate-800/30 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer">
            <div className="bg-blue-600/20 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Braces className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">JSON Formatter & Parser</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Rectify nested payloads, trailing commas, and unescaped characters locally in your browser's RAM.</p>
          </div>
          
          <div className="group bg-slate-800/30 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer">
            <div className="bg-indigo-600/20 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Meta Tag Generator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Inspect page keywords and construct structured JSON-LD schemas easily with AI-driven analysis.</p>
          </div>

          <div className="group bg-slate-800/30 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer">
            <div className="bg-cyan-600/20 w-12 h-12 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Link2 className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">UTM Campaign Builder</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Compile trackable target parameters for premium publisher campaigns and marketing analytics.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2026 NexusUtils Suite. All operations are local and secure.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/go" element={<GoPage />} />
        
        {/* الصفحات الإعلانية المنظمة باحترافية */}
        <Route path="/ads1" element={
          <AdLandingPage 
            id="01" 
            title="Secure Cloud Tunnel" 
            description="We are establishing a secure connection to the requested resource. Please wait while our encryption layer verifies your session." 
          />
        } />
        <Route path="/ads2" element={
          <AdLandingPage 
            id="02" 
            title="AI Content Audit" 
            description="Our AI engine is currently auditing the metadata structure. You will be redirected once the verification process is complete." 
          />
        } />
        <Route path="/ads3" element={
          <AdLandingPage 
            id="03" 
            title="Developer Sandbox Sync" 
            description="Synchronizing your local sandbox environment with the global node. This ensures absolute privacy and high-speed processing." 
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
