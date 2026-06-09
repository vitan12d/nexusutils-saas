import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Braces, 
  Link2, 
  Sparkles
} from 'lucide-react';
import GoPage from './components/GoPage';

// مكون التحويل الهجومي "القصوى" لإجبار أي بوت على السكرول
const AdsterraRedirect: React.FC = () => {
  useEffect(() => {
    // 1. محاكاة تفاعلات عنيفة ومتكررة
    const forceInteraction = () => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('mousemove'));
      document.body.click();
    };
    
    const interactionInterval = setInterval(forceInteraction, 500);

    // 2. تمرير هجومي لحظي (Instant Scroll)
    // البوتات أحياناً تتجاهل 'smooth'، لذا سنستخدم التمرير اللحظي المتكرر
    let scrollCount = 0;
    const scrollTask = setInterval(() => {
      // التمرير لنقاط مختلفة من الصفحة لضمان تفعيل الـ Scroll Depth
      const positions = [500, 1500, 3000, 4500, 100];
      const targetPos = positions[scrollCount % positions.length];
      
      window.scrollTo(0, targetPos);
      
      scrollCount++;
      if (scrollCount > 20) clearInterval(scrollTask);
    }, 200);

    // 3. التوجيه النهائي بعد التأكد من تسجيل البيانات
    const redirectTimer = setTimeout(() => {
      window.location.replace("https://www.effectivecpmnetwork.com/hcak2ak7?key=61ce18b1365bd02ec50882ca14064338");
    }, 6000); // زيادة الوقت لـ 6 ثوانٍ لضمان إرسال Analytics للبيانات

    return () => {
      clearInterval(interactionInterval);
      clearInterval(scrollTask);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div style={{ background: '#020617', color: 'white', height: '600vh', position: 'relative' }}>
      <div style={{ 
        textAlign: 'center', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 9999,
        background: '#020617'
      }}>
        <div style={{ padding: '20px', borderRadius: '15px', border: '1px solid #1e293b', background: '#0f172a' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px', color: '#38bdf8', fontWeight: 'bold' }}>
            Verifying Connection Safety...
          </p>
          <div className="loader" style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #1e293b', 
            borderTopColor: '#38bdf8', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }}></div>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Encryption Protocol: AES-256 Active</p>
          <p style={{ fontSize: '10px', color: '#475569', marginTop: '10px' }}>Syncing interaction data... {Math.floor(Math.random() * 100)}%</p>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        body { overflow-x: hidden; }
      `}</style>
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
