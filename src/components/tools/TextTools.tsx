import { useState } from 'react';
import { Clipboard, Check, Hash, Baseline, ArrowUpDown, AlignLeft, RefreshCw } from 'lucide-react';

export default function TextTools({ toolId }: { toolId: string }) {
  if (toolId === 'word-counter') return <WordCounter />;
  if (toolId === 'char-counter') return <CharacterCounter />;
  if (toolId === 'case-converter') return <CaseConverter />;
  if (toolId === 'lorem-ipsum') return <LoremIpsumGenerator />;
  return null;
}

// 1. Word Counter Component
function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const getStats = () => {
    const trimmed = text.trim();
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed === '' ? 0 : trimmed.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n+/).filter(Boolean).length;
    // Standard 200 WPM
    const readingTime = Math.ceil(words / 200);

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Word and Reading Time Counter</h3>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your content here..."
            className="w-full h-64 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 font-sans text-sm resize-none"
          />
          {text && (
            <button
              onClick={copyToClipboard}
              className="absolute bottom-3 right-3 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition flex items-center gap-1.5 text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  Copy Input
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6">
          {[
            { label: 'Words', value: stats.words, icon: Hash, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/25' },
            { label: 'Characters', value: stats.characters, icon: Baseline, color: 'text-green-500 bg-green-50 dark:bg-green-950/25' },
            { label: 'No Spaces', value: stats.charactersNoSpaces, icon: Baseline, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/25' },
            { label: 'Sentences', value: stats.sentences, icon: AlignLeft, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/25' },
            { label: 'Paragraphs', value: stats.paragraphs, icon: AlignLeft, color: 'text-red-500 bg-red-50 dark:bg-red-950/25' },
            { label: 'Read Time', value: `${stats.readingTime} min`, icon: Hash, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/25' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950/30 rounded-lg border border-slate-150 dark:border-slate-850 flex flex-col items-center justify-center text-center">
                <div className={`p-2 rounded-full ${stat.color} mb-1.5`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 2. Character Counter Component
function CharacterCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const getStats = () => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const spaces = chars - charsNoSpaces;

    // Word distribution tracking unique characters
    const charMap: Record<string, number> = {};
    for (const c of text) {
      charMap[c] = (charMap[c] || 0) + 1;
    }
    const uniqueChars = Object.keys(charMap).length;

    // Filter top occurring characters
    const topChars = Object.entries(charMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([char, count]) => ({
        char: char === ' ' ? 'Space' : char === '\n' ? '↵ Line' : char,
        count,
        percent: chars > 0 ? Math.round((count / chars) * 100) : 0,
      }));

    return { chars, charsNoSpaces, spaces, uniqueChars, topChars };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Character Frequency & Density</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text for character analysis..."
              className="w-full h-80 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 font-sans text-sm resize-none"
            />
            {text && (
              <button
                onClick={copyToClipboard}
                className="absolute bottom-3 right-3 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition flex items-center gap-1.5 text-xs font-semibold"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                Copy text
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-lg border border-slate-150 dark:border-slate-850 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Detailed Metrics</h4>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bytes Sizing (Total)</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-mono">{stats.chars}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Characters (Pure text)</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-mono">{stats.charsNoSpaces}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Whitespace & Spaces</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-mono">{stats.spaces}</span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Unique Characters mapped</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-mono">{stats.uniqueChars}</span>
              </div>
            </div>

            {text && (
              <div className="p-4 bg-slate-100/50 dark:bg-slate-950/10 rounded-lg border border-slate-150 dark:border-slate-850 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Top Character Shares</h4>
                {stats.topChars.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="font-mono text-slate-600 dark:text-slate-350">"{item.char}"</span>
                      <span className="text-slate-400 font-mono">{item.count} times ({item.percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Case Converter Component
function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const convertTo = (type: string) => {
    if (!text) return;
    let result = '';

    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (char) => char.toUpperCase());
        break;
      case 'camel':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case 'snake':
        result = text
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '');
        break;
      case 'kebab':
        result = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        break;
      case 'pascal':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^\w/, (char) => char.toUpperCase());
        break;
      case 'toggle':
        result = text
          .split('')
          .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
          .join('');
        break;
      case 'alternate':
        result = text
          .split('')
          .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
          .join('');
        break;
    }

    setText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const caseTypes = [
    { label: 'UPPERCASE', type: 'upper' },
    { label: 'lowercase', type: 'lower' },
    { label: 'Title Case', type: 'title' },
    { label: 'Sentence case', type: 'sentence' },
    { label: 'camelCase', type: 'camel' },
    { label: 'snake_case', type: 'snake' },
    { label: 'kebab-case', type: 'kebab' },
    { label: 'PascalCase', type: 'pascal' },
    { label: 'tOgGlE cAsE', type: 'toggle' },
    { label: 'aLtErNaTiNg CaSe', type: 'alternate' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Instantly Transform Text Style Cases</h3>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to convert formatting..."
            className="w-full h-56 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 font-sans text-sm resize-none"
          />
          {text && (
            <button
              onClick={copyToClipboard}
              className="absolute bottom-3 right-3 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  Copied Output!
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  Copy Output
                </>
              )}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
          {caseTypes.map((item) => (
            <button
              key={item.type}
              onClick={() => convertTo(item.type)}
              disabled={!text}
              className="p-2.5 bg-slate-50 dark:bg-slate-950/30 font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-500 transition disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200 text-xs text-center truncate"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Lorem Ipsum Generator Component
function LoremIpsumGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris',
    'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
    'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
    'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
    'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
    'est', 'laborum'
  ];

  const generateWords = (num: number) => {
    let output = [];
    for (let i = 0; i < num; i++) {
      const idx = Math.floor(Math.random() * LOREM_WORDS.length);
      output.push(LOREM_WORDS[idx]);
    }
    // Capitalize first letter
    const str = output.join(' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 8) + 6; // 6-14 words
    return generateWords(length) + '.';
  };

  const generateParagraph = () => {
    const sents = Math.floor(Math.random() * 3) + 3; // 3-5 sentences
    const output = [];
    for (let i = 0; i < sents; i++) {
      output.push(generateSentence());
    }
    return output.join(' ');
  };

  const handleGenerate = () => {
    const items = [];
    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        items.push(generateParagraph());
      }
      setResult(items.join('\n\n'));
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) {
        items.push(generateSentence());
      }
      setResult(items.join(' '));
    } else {
      setResult(generateWords(count) + '.');
    }
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Lorem Ipsum Placeholder Text Generator</h3>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-155 dark:border-slate-800 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Output Type</span>
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-10 rounded overflow-hidden">
              {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 text-center font-bold text-xs select-none uppercase tracking-wider outline-none transition ${
                    type === t
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/55'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Quantity Amount</span>
            <input
              type="number"
              min="1"
              max="150"
              value={count}
              onChange={(e) => setCount(Math.min(150, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full h-10 border border-slate-200 dark:border-slate-800 rounded px-3 outline-none bg-white dark:bg-slate-900 focus:border-blue-500 text-slate-800 dark:text-slate-100 font-sans font-bold text-sm"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full h-10 rounded font-semibold text-white bg-blue-600 hover:bg-blue-500 transition shadow-sm mt-4 md:mt-0 flex items-center justify-center gap-1.5 self-end"
          >
            <RefreshCw className="h-4 w-4" />
            Generate Placeholder
          </button>
        </div>

        {result && (
          <div className="mt-5 relative">
            <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-lg max-h-80 overflow-y-auto text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {result}
            </div>
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition shadow-xs flex items-center gap-1 text-xs font-bold"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
