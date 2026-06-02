import { useState, useEffect } from 'react';
import { Copy, Check, ShieldCheck, RefreshCw, KeyRound } from 'lucide-react';

export default function PasswordMeter() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      lower = lower.replace(/[il]/g, '');
      upper = upper.replace(/[IO]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      symbols = symbols.replace(/[|]/g, '');
    }

    if (includeLower) charset += lower;
    if (includeUpper) charset += upper;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPassword('');
      return;
    }

    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    setPassword(generated);
  };

  // Auto regenerate when configs change
  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  // Calculate Shannon Entropy bits
  const getEntropyInfo = () => {
    if (!password) return { bits: 0, label: 'Null', color: 'bg-slate-300' };
    
    let poolSize = 0;
    if (includeLower) poolSize += excludeAmbiguous ? 24 : 26;
    if (includeUpper) poolSize += excludeAmbiguous ? 24 : 26;
    if (includeNumbers) poolSize += excludeAmbiguous ? 8 : 10;
    if (includeSymbols) poolSize += excludeAmbiguous ? 25 : 26;

    if (poolSize === 0) return { bits: 0, label: 'Null', color: 'bg-slate-300' };

    const bits = Math.round(password.length * Math.log2(poolSize));
    
    if (bits < 40) return { bits, label: 'Weak (Vulnerable)', color: 'bg-red-500' };
    if (bits < 60) return { bits, label: 'Medium (Adequate)', color: 'bg-amber-500' };
    if (bits < 85) return { bits, label: 'Strong (Secure)', color: 'bg-emerald-500' };
    return { bits, label: 'Military-Grade (Unbreakable)', color: 'bg-blue-600' };
  };

  const entropy = getEntropyInfo();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="password-meter-tool" className="grid grid-cols-1 md:grid-cols-5 gap-8">
      
      {/* Configuration column (3 cols) */}
      <div className="md:col-span-3 space-y-6">
        
        {/* Output field element */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-450 uppercase block">CRYPTOGRAPHICAL OUTPUT STRING</span>
          <div className="relative flex items-center">
            <input
              id="password-output-box"
              type="text"
              readOnly
              value={password}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-24 py-3 text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none"
            />
            <div className="absolute left-3 text-slate-400">
              <KeyRound className="h-4 w-4" />
            </div>

            <div className="absolute right-2 flex items-center gap-1">
              <button 
                onClick={generatePassword}
                aria-label="Regenerate credentials string"
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 rounded cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button 
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs select-none bg-blue-600 hover:bg-blue-700 text-white font-medium px-2.5 py-1.5 rounded-md cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Entropy rating info bar */}
        {password && (
          <div className="space-y-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Entropy Rating:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{entropy.bits} Bits</span>
            </div>

            {/* Visual slider progress bar */}
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${entropy.color} transition-all duration-300`} 
                style={{ width: `${Math.min(100, (entropy.bits / 128) * 100)}%` }} 
              />
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono mt-1">
              <span className="text-slate-400">0 Bits</span>
              <span className="font-bold text-slate-700 dark:text-slate-350">{entropy.label}</span>
              <span className="text-slate-400">128+ Bits</span>
            </div>
          </div>
        )}

      </div>

      {/* Constraints column inputs (2 cols) */}
      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 p-5 rounded-xl space-y-4">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">Config options</span>

        {/* Dynamic length slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <label htmlFor="length-slider">Length (Characters):</label>
            <span className="font-mono text-blue-600 font-bold">{length}</span>
          </div>
          <input
            id="length-slider"
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Character sets mapping option lists */}
        <div className="space-y-2.5 pt-2">
          
          <label className="flex items-center gap-2.5 text-xs text-slate-705 dark:text-slate-300 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={includeUpper} 
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-white dark:bg-slate-950" 
            />
            <span>Include Uppercase [A-Z]</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-705 dark:text-slate-300 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={includeLower} 
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-white dark:bg-slate-950" 
            />
            <span>Include Lowercase [a-z]</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-705 dark:text-slate-300 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={includeNumbers} 
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-white dark:bg-slate-950" 
            />
            <span>Include Numbers [0-9]</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-705 dark:text-slate-300 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={includeSymbols} 
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-white dark:bg-slate-950" 
            />
            <span>Include Symbols [!@#$%]</span>
          </label>

          <div className="border-t border-slate-200/40 dark:border-slate-800/40 pt-2.5">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-400 cursor-pointer select-none" title='Filters out complex characters like 0, l, I, O and |'>
              <input 
                type="checkbox" 
                checked={excludeAmbiguous} 
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-white dark:bg-slate-950" 
              />
              <span className="font-semibold text-[11px]">Avoid Ambiguous (i, l, O, 0, |)</span>
            </label>
          </div>

        </div>

      </div>

    </div>
  );
}
