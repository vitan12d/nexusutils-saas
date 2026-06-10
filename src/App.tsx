import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Braces, 
  Link2, 
  Sparkles,
  ShieldCheck,
  Globe,
  Activity
} from 'lucide-react';
import GoPage from './components/GoPage';

// نسخة "The Profit Cleaner": تبييض الترافيك + كسر الإطار + رفع الـ CPM
const ProfitCleaner: React.FC = () => {
  const [status, setStatus] = useState("Initializing Global Node...");
  const [dots, setDots] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. تبييض المصدر (Referrer Cleaning)
    // محاولة مسح أثر Klixion من سجل المتصفح لجعل الزيارة تبدو "مباشرة"
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.href);
    }

    // 2. تحميل كود الـ Popunder فوراً
    const script = document.createElement('script');
    script.src = "https://pl29684705.effectivecpmnetwork.com/d1/23/53/d123535d26ad8b7ef4da67e0a3bc536f.js";
    script.async = true;
    document.head.appendChild(script);

    // 3. تأثيرات بصرية للبوتات المتقدمة (تفاعل الجلسة)
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length > 3 ? "" : prev + ".");
    }, 500);

    // 4. سكرول ذكي وسريع لتفعيل Analytics
    let scrollCount = 0;
    const scrollTask = setInterval(() => {
      window.scrollTo(0, scrollCount % 2 === 0 ? 400 : 0);
      scrollCount++;
      if (scrollCount > 12) clearInterval(scrollTask);
    }, 400);

    // 5. التوجيه النهائي (6 ثوانٍ) - مع محاولة فتح نافذة جديدة (Target Blank)
    // الفتح في نافذة جديدة يرفع الـ CPM لأن الإعلان يظهر بوضوح خارج الإطار
    const finalRedirect = setTimeout(() => {
      setStatus("Bypassing Gateway...");
      if (buttonRef.current) {
        buttonRef.current.click();
      } else {
        // محاولة كسر الإطار إذا فشلت النقرة
        try {
          window.top!.location.href = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
        } catch (e) {
          window.location.href = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
        }
      }
    }, 6500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(scrollTask);
      clearTimeout(finalRedirect);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleAction = () => {
    // محاولة فتح الإعلان في نافذة جديدة أولاً لرفع الأرباح
    const adUrl = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
    window.open(adUrl, '_blank'); // الربح من النافذة الجديدة
    window.location.href = adUrl; // التحويل في الصفحة الحالية لضمان التحويل 100%
  };

  return (
    <div style={{ background: '#020617', color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ width: '90%', maxWidth: '420px', background: '#0f172a', padding: '35px', borderRadius: '24px', border: '1px solid #1e293b', boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <Globe style={{ color: '#38bdf8' }} size={24} />
          <Activity style={{ color: '#38bdf8' }} size={24} />
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '5px' }}>GLOBAL NODE ACCESS</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Status: {status}{dots}</p>
        </div>

        <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #1e293b' }}>
          <div style={{ fontSize: '10px', color: '#38bdf8', marginBottom: '5px' }}>CONNECTION_LOG:</div>
          <div style={{ fontSize: '10px', color: '#475569' }}>{`> REQ_IP: ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.***.***`}</div>
          <div style={{ fontSize: '10px', color: '#475569' }}>{`> BYPASS_FRAME: SUCCESS`}</div>
          <div style={{ fontSize: '10px', color: '#475569' }}>{`> CPM_OPTIMIZER: ACTIVE`}</div>
        </div>

        <button 
          ref={buttonRef}
          onClick={handleAction}
          style={{ 
            width: '100%', padding: '15px', borderRadius: '12px', background: '#38bdf8', color: '#020617', 
            fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase'
          }}
        >
          Enter Secure Zone
        </button>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <ShieldCheck size={14} color="#475569" />
          <span style={{ fontSize: '10px', color: '#475569' }}>ENCRYPTED SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

// المكون الرئيسي للموقع
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
        <Route path="/ads1" element={<ProfitCleaner />} />
        <Route path="/ads2" element={<ProfitCleaner />} />
        <Route path="/ads3" element={<ProfitCleaner />} />
      </Routes>
    </Router>
  );
};

export default App;
