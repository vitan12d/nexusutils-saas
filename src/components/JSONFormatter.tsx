import React, { useState, useRef } from 'react';
import { Play, Copy, Check, Upload, Trash2, Eye, ShieldCheck, FileJson } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormat = (minify = false) => {
    setErrorHeader(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const parsedObj = JSON.parse(input);
      if (minify) {
        setOutput(JSON.stringify(parsedObj));
      } else {
        setOutput(JSON.stringify(parsedObj, null, indentSize));
      }
    } catch (err: any) {
      setErrorHeader(`Syntax Error: ${err.message}`);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setErrorHeader(null);
  };

  // Support Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      parseFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      parseFile(files[0]);
    }
  };

  const parseFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setErrorHeader('Error: Invalid file type. Please upload a .json file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInput(text);
      setErrorHeader(null);
    };
    reader.readAsText(file);
  };

  const loadSample = () => {
    const sample = {
      platform: "NexusUtils",
      workspace: "Master Hub",
      version: 4.0,
      active: true,
      technologies: ["React 19", "Vite", "Tailwind 4"],
      features: {
        seoReady: true,
        privacyCured: true,
        localHashing: "enabled",
        speedRating: 100
      },
      toolsAvailable: 6
    };
    setInput(JSON.stringify(sample, null, 2));
    setErrorHeader(null);
  };

  return (
    <div id="json-formatter-container" className="space-y-6">
      
      {/* Configuration bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <label htmlFor="indent-size-select" className="text-xs font-medium text-slate-500 dark:text-slate-400">Indentation Config:</label>
          <select 
            id="indent-size-select"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={2}>2 Spaces (Clean)</option>
            <option value={4}>4 Spaces (Classic)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={loadSample}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Load Sample JSON
          </button>
          <button 
            onClick={handleClear}
            className="text-xs font-semibold text-slate-500 hover:text-red-500 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input area */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl relative group flex flex-col min-h-[460px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-900">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              <Upload className="h-4 w-4" /> Raw Payload Input
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-mono hover:text-blue-600 text-slate-500 dark:text-slate-400 flex items-center gap-1 cursor-pointer bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded"
            >
              Upload file
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".json" 
              onChange={handleFileChange}
              className="hidden" 
            />
          </div>

          <textarea
            id="json-raw-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste JSON strings here or drag & drop a file... &#10;&#10;{"payload": "formatted here", "active": true}'
            className="w-full flex-1 p-4 font-mono text-sm bg-transparent border-none text-slate-800 dark:text-slate-150 placeholder-slate-400 resize-none focus:outline-none"
          />

          {/* Draggable indicator overlay */}
          {input.trim() === '' && (
            <div className="absolute inset-x-4 bottom-4 border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 rounded-lg text-center pointer-events-none group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors">
              <span className="text-xs font-mono text-slate-400 block mb-1">Drag and drop file to load</span>
              <span className="text-[10px] text-slate-400">Local processing only • Secure transmission</span>
            </div>
          )}
        </div>

        {/* Output area */}
        <div className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 rounded-xl flex flex-col min-h-[460px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 rounded-t-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-2">
              <Eye className="h-4 w-4" /> Prettified Tree Result
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => handleFormat(false)}
                className="text-[11px] font-semibold bg-blue-50 dark:bg-blue-550/15 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Prettify
              </button>
              <button 
                onClick={() => handleFormat(true)}
                className="text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-550/15 text-emerald-600 px-2 py-1 rounded hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Minify JSON
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 relative font-mono text-sm overflow-auto">
            {output ? (
              <pre className="text-slate-800 dark:text-slate-200 max-h-[380px] overflow-auto select-text whitespace-pre-wrap word-break-all">
                {output}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <FileJson className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                <span className="text-xs text-slate-400 block mb-1">Awaiting payload</span>
                <span className="text-[10px] text-slate-400">Click Formatter buttons to analyze syntax</span>
              </div>
            )}

            {/* Float Copy action */}
            {output && (
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-350 shadow-sm cursor-pointer"
                title="Copy result payload"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Error alert box */}
      {errorHeader && (
        <div id="json-error-banner" className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-800 p-4 rounded-xl text-xs font-mono text-red-650 dark:text-red-400">
          <span className="font-bold">Formatting Failed!</span>
          <p className="mt-1 leading-relaxed">{errorHeader}</p>
        </div>
      )}

      {/* Security notice */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
        <ShieldCheck className="h-4 w-4 text-slate-500" />
        <span>Strict Privacy: No text entries ever contact Nexus servers. Processing concludes purely in local JS memory space.</span>
      </div>

    </div>
  );
}
