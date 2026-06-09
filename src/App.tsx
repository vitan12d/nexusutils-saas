import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Braces, 
  Link2, 
  Sparkles
} from 'lucide-react';
import GoPage from './components/GoPage';

// مكون التحويل الهجومي المطور لإجبار البوتات على التفاعل والـ Scroll
const AdsterraRedirect: React.FC = () => {
  useEffect(() => {
    // 1. محاكاة نقرة وهمية لرفع الـ User Engagement فوراً
    const fakeClick = () => {
      const event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
      document.body.dispatchEvent(event);
    };
    setTimeout(fakeClick, 100);

    // 2. تفعيل التمرير التلقائي المتكرر صعوداً ونزولاً لكسر جمود البوت
    let scrollCount = 0;
    const scrollInterval = setInterval(() => {
      if (scrollCount % 2 === 0) {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 10, behavior: 'smooth' });
      }
      scrollCount++;
      if (scrollCount > 6) clearInterval(scrollInterval);
    }, 150);

    // 3. التوجيه النهائي الفوري باستخدام أسرع وسيلة حظر ومسح للتاريخ الإعلاني
    const redirectTimer = setTimeout(() => {
      window.location.replace("https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338");
    }, 1800);

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div style={{ background: '#0f172a', color: 'white', height: '300vh', position: 'relative', fontFamily: 'system-ui, sans-serif' }}>
      {/* تضمين iframe مخفي للـ Smartlink لإجبار السيرفر على تحميل الإعلان مسبقاً قبل التحويل */}
      <iframe 
        src="https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338" 
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, top: 0, left: 0, border: 'none' }}
        title="Secure Background Sync"
      />
      
      <div style={{ textAlign: 'center', position: 'fixed', top: '45%', width: '100%', zIndex: 9999 }}>
        <p style={{ fontSize: '18px', marginBottom: '12px', color: '#94a3b8' }}>Establishing secure connection...</p>
        <div style={{ width: '35px', height: '35px', border: '3px solid #38bdf8', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }}></div>
        <p style={{ fontSize: '11px', marginTop: '15px', color: '#475569' }}>Optimization protocol active</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// المكون الرئيسي للموقع (الصفحة الرئيسية الفعالة لحماية الدومين)
const MainLayout: React.FC = () => {
  return (
    <div className="min-height-screen bg-slate-900 text-white font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Braces className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              NexusUtils
            </span>
          </div>
          <nav className="flex space-x-4">
            <Link to="/go" className="text-sm font-medium text-slate-400 hover:text-white transition">Bridge Test</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Elite-Grade Developer Sandbox Software
          </h1>
          <p className="text-lg text-slate-400">
            Zero Registrations. Client-First Isolation and Encryption. Securely process files and payloads entirely within local device memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <Braces className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">JSON Formatter & Parser</h3>
            <p className="text-slate-400 text-sm">Rectify nested payloads, trailing commas, and unescaped characters locally.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:border-indigo-500/50 transition">
            <Sparkles className="h-8 w-8 text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Meta Tag Generator</h3>
            <p className="text-slate-400 text-sm">Inspect page keywords and construct structured JSON-LD schemas easily.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:border-cyan-500/50 transition">
            <Link2 className="h-8 w-8 text-cyan-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">UTM Campaign Link Builder</h3>
            <p className="text-slate-400 text-sm">Compile trackable target parameters for premium publisher campaigns.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/go" element={<GoPage />} />
        <Route path="/ads1" element={<AdsterraRedirect />} />
        <Route path="/ads2" element={<AdsterraRedirect />} />
        <Route path="/ads3" element={<AdsterraRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
