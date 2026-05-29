import { useState } from 'react';
import { Clipboard, Check, Hash, Baseline, ArrowUpDown, AlignLeft, RefreshCw, Split, Search } from 'lucide-react';

export default function TextTools({ toolId }: { toolId: string }) {
  if (toolId === 'word-counter') return <WordCounter />;
  if (toolId === 'char-counter') return <CharacterCounter />;
  if (toolId === 'case-converter') return <CaseConverter />;
  if (toolId === 'lorem-ipsum') return <LoremIpsumGenerator />;
  if (toolId === 'diff-checker') return <DiffChecker />;
  if (toolId === 'regex-tester') return <RegexTester />;
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

// 5. Bilingual Text Diff Checker
function DiffChecker() {
  const [textA, setTextA] = useState('Welcome to NexusUtils.\nThis is the first draft of our software architecture manual.\nAll tools operate 100% locally client-side.');
  const [textB, setTextB] = useState('Welcome to NexusUtils Suite!\nThis is the final draft of our high-performance SaaS manual.\nAll utilities operate 100% locally on your browser.');
  const [diffResult, setDiffResult] = useState<Array<{ type: 'added' | 'removed' | 'equal'; value: string }>>([]);

  const runDiff = () => {
    // Elegant word-by-word diffing representation
    const wordsA = textA.split(/(\s+)/);
    const wordsB = textB.split(/(\s+)/);

    const result: Array<{ type: 'added' | 'removed' | 'equal'; value: string }> = [];
    let i = 0;
    let j = 0;

    // Use a basic LCS / Levenshtein greedy alignment preview for text words
    while (i < wordsA.length || j < wordsB.length) {
      if (i < wordsA.length && j < wordsB.length && wordsA[i] === wordsB[j]) {
        result.push({ type: 'equal', value: wordsA[i] });
        i++;
        j++;
      } else if (j < wordsB.length && (i >= wordsA.length || !wordsA.slice(i).includes(wordsB[j]))) {
        result.push({ type: 'added', value: wordsB[j] });
        j++;
      } else {
        result.push({ type: 'removed', value: wordsA[i] });
        i++;
      }
    }

    setDiffResult(result);
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setDiffResult([]);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Split className="h-5 w-5 text-indigo-500" />
              Bilingual Side-by-Side Diff Checker
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Analyze word insertions, modifications, and deletions between two document versions instantly.
            </p>
          </div>
          <button
            onClick={handleClear}
            className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/20 dark:hover:bg-slate-950/40 text-slate-650 dark:text-slate-350 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-850"
          >
            Clear Inputs
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Original Version (Document A)</span>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full h-52 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-sm leading-normal resize-none"
              placeholder="Paste original source text..."
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Modified Version (Document B)</span>
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full h-52 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-sm leading-normal resize-none"
              placeholder="Paste updated document iteration..."
            />
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={runDiff}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Compare Documents
          </button>
        </div>

        {diffResult.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Visual Difference Analysis</span>
            <div className="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 rounded-lg min-h-24 max-h-80 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {diffResult.map((part, index) => {
                let cls = 'text-slate-700 dark:text-slate-300';
                if (part.type === 'added') {
                  cls = 'bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 px-1 rounded mx-0.5 line-through decoration-transparent';
                } else if (part.type === 'removed') {
                  cls = 'bg-red-100 dark:bg-red-955/40 text-red-800 dark:text-red-400 px-1 rounded mx-0.5 line-through decoration-red-500/70';
                }
                return (
                  <span key={index} className={cls}>
                    {part.value}
                  </span>
                );
              })}
            </div>
            <div className="flex gap-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-955/40 border border-red-300 dark:border-red-900 inline-block"></span>
                Removed Words
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-green-100 dark:bg-green-950/50 border border-green-300 dark:border-green-900 inline-block"></span>
                Inserted Words
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 6. Interactive Regex Tester
function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('Contact support@nexusutils.online, sales@nexusutils.online or webmaster@google.com for more info.');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(0);

  const getHighlights = () => {
    if (!pattern.trim()) return <span>{testText}</span>;
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testText.matchAll(regex));
      setMatchCount(matches.length);
      setErrorText(null);

      if (matches.length === 0) {
        return <span>{testText}</span>;
      }

      const elements: any[] = [];
      let lastIndex = 0;

      // Slice the text up and inject custom badges for each trigger index
      matches.forEach((match: any, index) => {
        const start = match.index ?? 0;
        const end = start + match[0].length;

        if (start > lastIndex) {
          elements.push(<span key={`text-${lastIndex}`}>{testText.substring(lastIndex, start)}</span>);
        }

        elements.push(
          <span
            key={`match-${index}`}
            className="bg-indigo-100 dark:bg-indigo-950/75 border-b border-indigo-500 text-indigo-900 dark:text-indigo-200 px-1 rounded-sm font-bold relative group"
          >
            {match[0]}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none mb-1 z-10 shadow-lg">
              Match #{index + 1}
            </span>
          </span>
        );

        lastIndex = end;
      });

      if (lastIndex < testText.length) {
        elements.push(<span key={`text-${lastIndex}`}>{testText.substring(lastIndex)}</span>);
      }

      return elements;
    } catch (err: any) {
      setErrorText(err.message || 'Invalid Regular Expression syntax');
      setMatchCount(0);
      return <span>{testText}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Search className="h-5 w-5 text-indigo-500" />
            Interactive Regex Tester & Highlight Engine
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Validate regex queries instantly, check capturing thresholds, and debug matches in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regular Expression Pattern</span>
                <div className="flex bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg p-1">
                  <span className="px-3.5 py-1.5 text-xs font-mono text-slate-450 select-none">/</span>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-mono text-sm text-slate-850 dark:text-slate-150 leading-none py-1.5"
                    placeholder="[a-z]+"
                  />
                  <span className="px-3.5 py-1.5 text-xs font-mono text-slate-450 select-none">/</span>
                </div>
              </div>
              <div className="col-span-1 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modifiers</span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="w-full h-11 p-3 border border-slate-200 dark:border-slate-850 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/40 text-slate-850 dark:text-slate-150 font-mono text-xs"
                  placeholder="gim"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Test Document target</span>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full h-44 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-sans text-sm leading-normal resize-none"
                placeholder="Type or paste sample text to test matches against..."
              />
            </div>

            {errorText ? (
              <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg text-xs font-mono">
                ⚠️ <b>Regex Schema Error:</b> {errorText}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Result Highlighting Map</span>
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-850 px-2.5 py-1 rounded text-indigo-750 font-bold">
                    Matches Found: {matchCount}
                  </span>
                </div>
                <div className="p-4 border border-slate-250 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 rounded-lg min-h-24 max-h-48 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {getHighlights()}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 border border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/10 rounded-xl p-5 space-y-4 shrink-0">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250 uppercase tracking-wider">Quick Regex Cheat Sheet</h4>
            <div className="space-y-3">
              {[
                { exp: '.', desc: 'Matches any single character except newline' },
                { exp: '\\d', desc: 'Any numerical digit character (0-9)' },
                { exp: '\\w', desc: 'Alphanumeric word character plus underscore' },
                { exp: '\\s', desc: 'Any spacing, tab, or newline coordinate' },
                { exp: '*', desc: 'Repeats matching criteria zero or more times' },
                { exp: '+', desc: 'Repeats matching criteria one or more times' },
                { exp: '?', desc: 'Renders previous parameter optional' },
                { exp: '[A-z]', desc: 'Finds matching range elements' }
              ].map((item, index) => (
                <div key={index} className="flex gap-2 text-xs">
                  <span className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 font-bold rounded border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-350 min-w-[40px] text-center">
                    {item.exp}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight flex items-center">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

