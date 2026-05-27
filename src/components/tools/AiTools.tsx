import { useState } from 'react';
import { Sparkles, Clipboard, Check, Download, RefreshCw, AlertCircle, Volume2 } from 'lucide-react';

export default function AiTools() {
  const [text, setText] = useState('');
  const [action, setAction] = useState<'rewrite' | 'summarize' | 'expand' | 'improve'>('improve');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const response = await fetch('/api/ai/writing-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          action,
          tone,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      setResult(data.result || '');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to process your AI writing assistant request. Ensure GEMINI_API_KEY is configured in Settings > Secrets.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexusutils_ai_${action}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
          Intellectual AI Copywriting Assistant
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Input Copy</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content or rough bullet points here to refine..."
                className="w-full h-56 p-3 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Core Action</span>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="improve">Enhance Clarities & Fix Style</option>
                  <option value="rewrite">Rewrite from scratch</option>
                  <option value="summarize">Summarize to takeaways</option>
                  <option value="expand">Expand with technical details</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Adjust Tone</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="Professional">💼 Professional & Concise</option>
                  <option value="Casual">☕ Casual & Friendly</option>
                  <option value="Academic">🎓 Academic & Deep</option>
                  <option value="Exciting">🚀 Exciting & Persuasive</option>
                  <option value="Empathetic">🌸 Compassionate & Warm</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              className="w-full py-3 px-4 bg-indigo-650 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating via Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Refine Text with AI
                </>
              )}
            </button>
          </div>

          <div className="space-y-2.5 relative">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Output Assistant Copy</span>
            <div className="h-[318px] bg-slate-50/50 dark:bg-slate-950/15 border border-slate-150 dark:border-slate-850 rounded-lg p-4 text-xs overflow-y-auto leading-relaxed relative">
              {loading && (
                <div className="absolute inset-0 bg-slate-50/70 dark:bg-slate-950/70 flex flex-col items-center justify-center text-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold z-10 transition">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  Processing wording vectors...
                </div>
              )}

              {result ? (
                <p className="text-slate-750 dark:text-slate-250 select-text whitespace-pre-wrap font-sans">{result}</p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[11px] text-slate-450 dark:text-slate-650 text-center gap-1.5">
                  <Sparkles className="h-8 w-8 text-slate-350 dark:text-slate-800 animate-pulse" />
                  Generated AI content will display here
                </div>
              )}
            </div>

            {result && !loading && (
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-705 text-xs font-semibold text-slate-650 dark:text-slate-250 rounded shadow-xs"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={downloadTxt}
                  className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-705 text-xs font-semibold text-slate-650 dark:text-slate-250 rounded shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-750 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg flex items-center gap-2 text-xs">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
