import { useState, useEffect } from 'react';
import { Copy, Check, Binary, KeyRound, ArrowRightLeft, ShieldCheck } from 'lucide-react';

export default function HashConverter() {
  const [activeTab, setActiveTab] = useState<'b64' | 'crypto'>('b64');
  
  // Base64 State
  const [b64Input, setB64Input] = useState('NexusUtils: Premium Productivity');
  const [b64Output, setB64Output] = useState('');
  const [b64Mode, setB64Mode] = useState<'encode' | 'decode'>('encode');
  const [b64Error, setB64Error] = useState<string | null>(null);
  const [b64Copied, setB64Copied] = useState(false);

  // Cryptographic state
  const [cryptoInput, setCryptoInput] = useState('Verify this payload signature');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');
  const [copiedHash, setCopiedHash] = useState<'sha256' | 'sha1' | 'sha512' | null>(null);

  // 1. Base64 Process
  useEffect(() => {
    setB64Error(null);
    if (!b64Input) {
      setB64Output('');
      return;
    }

    try {
      if (b64Mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(b64Input)));
        setB64Output(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(b64Input)));
        setB64Output(decoded);
      }
    } catch (err: any) {
      setB64Error('Invalid Base64 sequence detected for decoding.');
      setB64Output('');
    }
  }, [b64Input, b64Mode]);

  // 2. Cryptographic native hashing process
  useEffect(() => {
    if (!cryptoInput) {
      setSha256Hash('');
      setSha1Hash('');
      setSha512Hash('');
      return;
    }

    const computeHashes = async () => {
      const msgBuffer = new TextEncoder().encode(cryptoInput);

      // SHA-256
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      setSha256Hash(hashArray256.map(b => b.toString(16).padStart(2, '0')).join(''));

      // SHA-1
      const hashBuffer1 = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      setSha1Hash(hashArray1.map(b => b.toString(16).padStart(2, '0')).join(''));

      // SHA-512
      const hashBuffer512 = await crypto.subtle.digest('SHA-512', msgBuffer);
      const hashArray552 = Array.from(new Uint8Array(hashBuffer512));
      setSha512Hash(hashArray552.map(b => b.toString(16).padStart(2, '0')).join(''));
    };

    computeHashes().catch(err => console.error(err));
  }, [cryptoInput]);

  const handleCopyB64 = () => {
    if (!b64Output) return;
    navigator.clipboard.writeText(b64Output);
    setB64Copied(true);
    setTimeout(() => setB64Copied(false), 2000);
  };

  const handleCopyHash = (hashText: string, key: 'sha256' | 'sha1' | 'sha512') => {
    if (!hashText) return;
    navigator.clipboard.writeText(hashText);
    setCopiedHash(key);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div id="hash-tool-layout" className="space-y-6">
      
      {/* Upper Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('b64')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider relative cursor-pointer border-b-2 transition-colors ${
            activeTab === 'b64' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Binary className="h-4 w-4" /> Base64 Transcoder
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider relative cursor-pointer border-b-2 transition-colors ${
            activeTab === 'crypto' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <KeyRound className="h-4 w-4" /> Cryptographic Signatures
        </button>
      </div>

      {/* Conditionally render screens */}
      {activeTab === 'b64' ? (
        
        /* 1. Base64 Screen layout */
        <div className="space-y-6" id="b64-subpanel">
          
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-4 py-3 border border-slate-200/80 dark:border-slate-800 rounded-xl">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Transaction direction:</span>
            <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 border border-slate-200/60 dark:border-slate-800 rounded-lg">
              <button
                onClick={() => setB64Mode('encode')}
                className={`text-xs px-3 py-1 rounded-md font-semibold cursor-pointer ${
                  b64Mode === 'encode' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                Encode Text
              </button>
              <button
                onClick={() => setB64Mode('decode')}
                className={`text-xs px-3 py-1 rounded-md font-semibold cursor-pointer ${
                  b64Mode === 'decode' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                Decode Base64
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input card */}
            <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 p-4 min-h-[220px]">
              <label htmlFor="b64-input-textarea" className="text-xs font-mono font-bold text-slate-450 uppercase block mb-2">Input Characters</label>
              <textarea
                id="b64-input-textarea"
                value={b64Input}
                onChange={(e) => setB64Input(e.target.value)}
                placeholder={b64Mode === 'encode' ? 'Type standard text string...' : 'Paste valid Base64 string...'}
                className="w-full flex-1 p-2 font-mono text-xs text-slate-800 dark:text-slate-200 bg-transparent border-none resize-none focus:outline-none"
              />
            </div>

            {/* Output card */}
            <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950 p-4 min-h-[220px] relative">
              <span className="text-xs font-mono font-bold text-slate-450 uppercase block mb-2">Converted Outcome</span>
              {b64Error ? (
                <div className="text-xs font-mono text-red-500 py-4">{b64Error}</div>
              ) : (
                <pre className="w-full flex-1 p-2 font-mono text-xs text-slate-800 dark:text-slate-150 overflow-auto select-all whitespace-pre-wrap word-break-all">
                  {b64Output}
                </pre>
              )}

              {b64Output && (
                <button
                  onClick={handleCopyB64}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-slate-650 cursor-pointer shadow-sm hover:bg-slate-50"
                  title="Copy transcoded output"
                >
                  {b64Copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              )}
            </div>

          </div>

        </div>

      ) : (

        /* 2. Cryptographic signature calculations panel */
        <div className="space-y-6" id="crypto-subpanel">
          
          <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 p-4 min-h-[140px]">
            <label htmlFor="crypto-input-textarea" className="text-xs font-mono font-bold text-slate-450 uppercase block mb-2">Payload to Hash</label>
            <textarea
              id="crypto-input-textarea"
              value={cryptoInput}
              onChange={(e) => setCryptoInput(e.target.value)}
              placeholder="Enter file structures, code blocks, or custom phrases..."
              className="w-full flex-1 p-2 font-mono text-xs text-slate-800 dark:text-slate-250 bg-transparent border-none resize-none focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide block">Generated Checksums</span>
            
            {/* SHA-256 row */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-6">
              <div className="space-y-1 truncate flex-1 md:pr-4">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">SHA-256 Digest</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 select-all font-semibold block truncate">
                  {sha256Hash || 'Calculations loading...'}
                </span>
              </div>
              <button
                onClick={() => handleCopyHash(sha256Hash, 'sha256')}
                className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-650 cursor-pointer hover:bg-slate-50 shrink-0"
              >
                {copiedHash === 'sha256' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* SHA-1 row */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-6">
              <div className="space-y-1 truncate flex-1 md:pr-4">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">SHA-1 Digest (Legacy index matching)</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 select-all block truncate">
                  {sha1Hash || 'Calculations loading...'}
                </span>
              </div>
              <button
                onClick={() => handleCopyHash(sha1Hash, 'sha1')}
                className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-650 cursor-pointer hover:bg-slate-50 shrink-0"
              >
                {copiedHash === 'sha1' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* SHA-512 row */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-6">
              <div className="space-y-1 truncate flex-1 md:pr-4">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">SHA-512 Digest (Max security level)</span>
                <span className="text-xs font-mono text-slate-8 text-slate-800 dark:text-slate-250 select-all block truncate">
                  {sha512Hash || 'Calculations loading...'}
                </span>
              </div>
              <button
                onClick={() => handleCopyHash(sha512Hash, 'sha512')}
                className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-650 cursor-pointer hover:bg-slate-50 shrink-0"
              >
                {copiedHash === 'sha512' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

          </div>

        </div>

      )}

      {/* Security notice footer */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>100% Cryptographic accuracy assured. Calculations execute natively inside your browser layer with no telemetry loops.</span>
      </div>

    </div>
  );
}
