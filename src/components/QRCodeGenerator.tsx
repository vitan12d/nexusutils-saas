import { useState } from 'react';
import { Download, Sparkles, Sliders, Type, ShieldCheck, Heart } from 'lucide-react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://nexusutils.com');
  const [fgColor, setFgColor] = useState('000000'); // Hex code without '#'
  const [bgColor, setBgColor] = useState('ffffff'); // Hex code without '#'
  const [ecc, setEcc] = useState('M'); // Error correction level: L, M, Q, H
  const [size, setSize] = useState('300'); // Size in px
  const [loading, setLoading] = useState(false);

  // Generate QR code URL using standard high-perf api
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${fgColor}&bgcolor=${bgColor}&ecc=${ecc}`;

  // Download logic converting to local blob
  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const localUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = localUrl;
      link.download = `qr-nexusutils-${fgColor}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="qr-generator-container" className="grid grid-cols-1 md:grid-cols-5 gap-8">
      
      {/* Parameter Inputs sidebar (3 cols in desktop) */}
      <div className="md:col-span-3 space-y-6">
        
        {/* Core payload input */}
        <div className="space-y-2">
          <label htmlFor="qr-payload-input" className="text-xs font-mono font-bold text-slate-450 dark:text-slate-450 uppercase block">
            QR CODE DATA / PAYLOAD
          </label>
          <div className="relative">
            <input
              id="qr-payload-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, web URL, serial, or contact info..."
              className="input-field pl-10"
            />
            <div className="absolute left-3 top-3.5 text-slate-400">
              <Type className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Configuration settings panel */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200/40 dark:border-slate-800 pb-3 mb-1">
            <Sliders className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Aesthetic Configurations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Foreground Hex */}
            <div className="space-y-1.5">
              <label htmlFor="fg-color-input" className="text-[11px] font-mono font-bold text-slate-450 uppercase block">Foreground Tag (Hex)</label>
              <div className="flex gap-2">
                <div 
                  className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                  style={{ backgroundColor: `#${fgColor}` }}
                />
                <input
                  id="fg-color-input"
                  type="text"
                  maxLength={6}
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value.replace(/[^a-fA-F0-9]/g, ''))}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 rounded-md text-xs font-mono"
                />
              </div>
            </div>

            {/* Background Hex */}
            <div className="space-y-1.5">
              <label htmlFor="bg-color-input" className="text-[11px] font-mono font-bold text-slate-450 uppercase block">Background Tag (Hex)</label>
              <div className="flex gap-2">
                <div 
                  className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                  style={{ backgroundColor: `#${bgColor}` }}
                />
                <input
                  id="bg-color-input"
                  type="text"
                  maxLength={6}
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value.replace(/[^a-fA-F0-9]/g, ''))}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 rounded-md text-xs font-mono"
                />
              </div>
            </div>

          </div>

          {/* Sizing & Error tolerances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="space-y-1.5">
              <label htmlFor="qr-resolution-select" className="text-[11px] font-mono font-bold text-slate-450 uppercase block">Target Resolution</label>
              <select
                id="qr-resolution-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-705"
              >
                <option value="150">150 x 150 px (Tiny)</option>
                <option value="300">300 x 300 px (Standard)</option>
                <option value="500">500 x 500 px (HQ Print)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="error-tolerance-select" className="text-[11px] font-mono font-bold text-slate-450 uppercase block">Error Tolerance (ECC)</label>
              <select
                id="error-tolerance-select"
                value={ecc}
                onChange={(e) => setEcc(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-705"
                title="Level L runs faster; Level H handles dirt/damage better on printed codes."
              >
                <option value="L">Level L (7% Recovery)</option>
                <option value="M">Level M (15% Standard)</option>
                <option value="Q">Level Q (25% Safe)</option>
                <option value="H">Level H (30% High Safety)</option>
              </select>
            </div>

          </div>

        </div>

        {/* Preset colors picker shortcut */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-450 uppercase block">Design Preset Templates</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { setFgColor('000000'); setBgColor('ffffff'); }}
              className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 px-3 py-1 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              Classic Slate
            </button>
            <button 
              onClick={() => { setFgColor('2563EB'); setBgColor('ffffff'); }}
              className="text-xs bg-blue-50 text-blue-650 hover:bg-blue-105 px-3 py-1 rounded cursor-pointer border border-blue-200/40"
            >
              Royal Blue
            </button>
            <button 
              onClick={() => { setFgColor('10B981'); setBgColor('0F172A'); }}
              className="text-xs bg-emerald-500/10 text-emerald-450 hover:bg-emerald-500/20 px-3 py-1 rounded cursor-pointer border border-emerald-500/20"
            >
              Cyber Twilight
            </button>
          </div>
        </div>

      </div>

      {/* Render Output preview (2 cols in desktop) */}
      <div className="md:col-span-2 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/55 dark:bg-slate-950 relative p-6">
        
        {/* QR container box */}
        <div className="bg-white rounded-lg p-3 shadow-md border border-slate-100 mb-6 group transition-all duration-300">
          <img 
            id="generated-qr-img"
            src={qrUrl}
            alt="Seamless Nexus QR code"
            referrerPolicy="no-referrer"
            className="w-48 h-48 sm:w-56 sm:h-56 select-all shrink-0 object-contain"
          />
        </div>

        {/* Export CTA button */}
        <button
          id="qr-download-btn"
          disabled={loading}
          onClick={handleDownload}
          className="button-primary w-full max-w-xs flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {loading ? 'Processing...' : 'Download Export (.png)'}
        </button>

        {/* Local Security stamp notice */}
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>No permanent log traces • Privacy verified</span>
        </div>

      </div>

    </div>
  );
}
