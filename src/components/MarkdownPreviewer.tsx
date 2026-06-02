import { useState } from 'react';
import { Eye, FileEdit, Copy, Check, Info } from 'lucide-react';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Markdown Sandbox Preview

Welcome to your **NexusUtils** Markdown draft space!

Write your technical content or readmes here, and preview them live in the compiled HTML pane adjacent.

## Standard Features List

- **Live sync drafting views**
- Standard bullet configurations
- Fast performance, lightweight parsing
- Click copying of compiled HTML tags!

### Dynamic Code Snippets
\`\`\`ts
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey });
\`\`\`

> "Good typography is the nervous system of clean layouts."

Happy documenting!
`);

  const [copiedHtml, setCopiedHtml] = useState(false);

  // A pristine custom regex Markdown to HTML translator
  const compileToHTML = (mdText: string): string => {
    let html = mdText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code Blocks (```ts ... ```)
    html = html.replace(/```([\s\S]*?)```/gm, (match, code) => {
      return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg my-3 overflow-x-auto text-xs font-mono"><code>${code.trim()}</code></pre>`;
    });

    // Inline Code (`code`)
    html = html.replace(/`([^`\n]+)`/g, '<code class="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 text-xs text-blue-600 dark:text-blue-400 font-mono">$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-1.5 mt-5 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">$1</h1>');

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900 py-2.5 px-4 rounded-r-lg my-4 text-xs italic text-slate-600 dark:text-slate-400">$1</blockquote>');

    // Bold (**text** or __text__)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Unordered Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-xs text-slate-700 dark:text-slate-350 py-0.5">$1</li>');

    // Paragraph blocks (avoiding lists and headers)
    const blocks = html.split('\n');
    const processed = blocks.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<pre') || trimmed.startsWith('</pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('</code')) {
        return line;
      }
      return `<p class="text-xs text-slate-650 dark:text-slate-350 leading-relaxed my-2">${line}</p>`;
    });

    return processed.filter(x => x !== '').join('\n');
  };

  const compiledHtml = compileToHTML(markdown);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(compiledHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div id="markdown-sandbox-container" className="space-y-6">
      
      {/* Editor & compilation view grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input box section */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl flex flex-col min-h-[460px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 rounded-t-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-2">
              <FileEdit className="h-4 w-4" /> Live Markdown Draft
            </span>
            <div className="text-[10px] font-mono text-slate-400">
              GFM Shortcodes active
            </div>
          </div>

          <textarea
            id="markdown-draft-textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown draft here..."
            className="w-full flex-1 p-4 font-mono text-xs bg-transparent border-none text-slate-800 dark:text-slate-150 placeholder-slate-400 resize-none focus:outline-none"
          />
        </div>

        {/* Compiled view output pane */}
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl flex flex-col min-h-[460px] relative">
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 rounded-t-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 flex items-center gap-2">
              <Eye className="h-4 w-4" /> compiled canvas HTML
            </span>
            <button
              onClick={handleCopyHtml}
              className="text-[11px] font-semibold bg-blue-50 dark:bg-blue-550/15 text-blue-600 px-2.5 py-1 rounded hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedHtml ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedHtml ? 'Copied HTML Code' : 'Copy HTML Output'}
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto max-h-[380px] prose dark:prose-invert">
            {markdown ? (
              <div 
                id="compiled-markdown-html"
                dangerouslySetInnerHTML={{ __html: compiledHtml }} 
                className="space-y-1.5"
              />
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs">
                Draft content above to preview layout instantly.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Helper guide */}
      <div className="flex gap-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block mb-0.5">Quick GFM Layout Cheat Sheet:</span>
          Use <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]"># Header</code> for main headings, <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]">**bold text**</code> for emphasis, and three backticks <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]">\`\`\`</code> for code block frames.
        </div>
      </div>

    </div>
  );
}
