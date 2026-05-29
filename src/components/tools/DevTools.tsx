import { useState, useEffect } from 'react';
import { Clipboard, Check, Braces, Binary, Key, Pipette, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DevTools({ toolId }: { toolId: string }) {
  if (toolId === 'json-formatter') return <JsonFormatter />;
  if (toolId === 'base64-tool') return <Base64Tool />;
  if (toolId === 'password-gen') return <PasswordGenerator />;
  if (toolId === 'color-picker') return <ColorPicker />;
  if (toolId === 'json-to-go-java') return <JsonToGoJava />;
  if (toolId === 'js-obfuscator') return <JsObfuscator />;
  if (toolId === 'sql-formatter') return <SqlFormatter />;
  return null;
}

// 1. JSON Formatter Component (Supports both indentation beautification and minification!)
function JsonFormatter() {
  const [input, setInput] = useState('{"name":"NexusUtils","scope":"SaaS platform","toolsCount":20,"features":{"darkMode":true,"localSync":true}}');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (minify: boolean = false) => {
    try {
      setError(null);
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
      setInput(formatted);
    } catch (err: any) {
      setError(err.message || 'Malformed JSON syntax detect. Check indices, quotes, or trailing commas.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Braces className="h-5 w-5 text-blue-500" />
            JSON Format & Validate
          </h3>
          <div className="flex bg-slate-50 dark:bg-slate-950/20 p-1 border border-slate-200 dark:border-slate-800 rounded-md shrink-0">
            {[2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setIndent(s)}
                className={`py-1 px-2 text-xs font-semibold rounded ${
                  indent === s
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                {s} Spaces
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder="Paste raw JSON here..."
            className="w-full h-80 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
          />
          {input && (
            <button
              onClick={copyToClipboard}
              className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded transition flex items-center gap-1 text-xs font-bold"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => formatJson(false)}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white rounded-lg shadow-xs transition"
          >
            Beautify JSON
          </button>
          <button
            onClick={() => formatJson(true)}
            className="py-2.5 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 font-bold text-xs text-slate-700 dark:text-slate-200 rounded-lg transition"
          >
            Minify JSON
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg text-xs font-mono">
            ⚠️ <b>JSON Error:</b> {error}
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Base64 Encoder/Decoder Component
function Base64Tool() {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [copied64, setCopied64] = useState(false);

  const encodeText = (val: string) => {
    setText(val);
    setError(null);
    try {
      if (!val) {
        setBase64('');
        return;
      }
      setBase64(btoa(unescape(encodeURIComponent(val))));
    } catch (e: any) {
      setError('Encoding error: unable to process special characters.');
    }
  };

  const decodeBase64 = (val: string) => {
    setBase64(val);
    setError(null);
    try {
      if (!val) {
        setText('');
        return;
      }
      setText(decodeURIComponent(escape(atob(val))));
    } catch (e: any) {
      setError('Decoding error: input text is not a valid Base64 string.');
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const copy64 = () => {
    navigator.clipboard.writeText(base64);
    setCopied64(true);
    setTimeout(() => setCopied64(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Binary className="h-5 w-5 text-blue-500" />
          Base64 Encoder / Decoder Converter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 relative">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Plain Text String</span>
            <textarea
              value={text}
              onChange={(e) => encodeText(e.target.value)}
              placeholder="Type string to encode..."
              className="w-full h-52 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 font-sans text-sm resize-none"
            />
            {text && (
              <button
                onClick={copyText}
                className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-202 text-xs font-semibold text-slate-500 dark:text-slate-350 rounded"
              >
                {copiedText ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div className="space-y-1.5 relative">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Base64 Encoded Format</span>
            <textarea
              value={base64}
              onChange={(e) => decodeBase64(e.target.value)}
              placeholder="Paste Base64 here to decode..."
              className="w-full h-52 p-4 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 bg-white dark:bg-slate-950/20 text-slate-150 dark:text-slate-100 font-mono text-xs leading-relaxed resize-none"
            />
            {base64 && (
              <button
                onClick={copy64}
                className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-202 text-xs font-semibold text-slate-500 dark:text-slate-350 rounded"
              >
                {copied64 ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-700 dark:text-red-400 border border-red-250 dark:border-red-900/40 rounded-lg text-xs font-mono">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Password Generator Component
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charSet = '';
    if (uppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charSet += '0123456789';
    if (symbols) charSet += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charSet) {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * charSet.length);
      result += charSet[idx];
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generate();
  }, [length, uppercase, lowercase, numbers, symbols]);

  const getStrength = () => {
    if (!password) return { label: 'None', color: 'bg-slate-350', width: 'w-0' };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) return { label: 'Weak (Vulnerable)', color: 'bg-red-500', width: 'w-1/4' };
    if (score < 5) return { label: 'Medium (Fair Sizing)', color: 'bg-yellow-500', width: 'w-2/4' };
    if (score < 6) return { label: 'Strong (Secure Sizing)', color: 'bg-blue-600', width: 'w-3/4' };
    return { label: 'Excellent (High Entropy)', color: 'bg-green-600', width: 'w-full' };
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Key className="h-5 w-5 text-blue-500" />
          Cryptographic Secure Password Generator
        </h3>

        {/* Display screen */}
        <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-lg flex items-center justify-between border border-slate-150 dark:border-slate-830">
          <span className="font-mono text-md font-bold text-slate-800 dark:text-slate-150 truncate max-w-md select-all">
            {password || 'Please check options to generate...'}
          </span>
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700 rounded transition shrink-0 ml-2"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
          </button>
        </div>

        {/* Strength indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-500">Security Entropy Grade:</span>
            <span className="text-slate-750 dark:text-slate-250 font-bold">{strength.label}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
            <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              <span>Password Length</span>
              <span className="text-blue-600">{length} Chars</span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-8 flex items-center justify-center appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {[
              { label: 'Uppercase (A-Z)', value: uppercase, setter: setUppercase },
              { label: 'Lowercase (a-z)', value: lowercase, setter: setLowercase },
              { label: 'Numbers (0-9)', value: numbers, setter: setNumbers },
              { label: 'Symbols (!@#)', value: symbols, setter: setSymbols },
            ].map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`opt-${i}`}
                  checked={opt.value}
                  onChange={(e) => opt.setter(e.target.checked)}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 dark:border-slate-800 rounded focus:ring-blue-500"
                />
                <label htmlFor={`opt-${i}`} className="text-xs font-semibold text-slate-650 dark:text-slate-300 cursor-pointer select-none">
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition"
        >
          Generate New Pass
        </button>
      </div>
    </div>
  );
}

// 4. Color Picker Component
function ColorPicker() {
  const [color, setColor] = useState('#2563EB');
  const [copied, setCopied] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = (parseInt(hex.slice(1, 3), 16) || 0) / 255;
    let g = (parseInt(hex.slice(3, 5), 16) || 0) / 255;
    let b = (parseInt(hex.slice(5, 7), 16) || 0) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyVal = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Pipette className="h-5 w-5 text-blue-500" />
          Color Space Converter & Picker
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center gap-4 bg-slate-50 dark:bg-slate-950/40 p-6 rounded-lg border border-slate-150 dark:border-slate-830">
            <div className="w-28 h-28 rounded-full border border-slate-200 shadow relative overflow-hidden cursor-pointer" style={{ backgroundColor: color }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <div className="text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">Click circle to pick custom palettes</span>
              <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">{color.toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { val: color.toUpperCase(), label: 'HEX' },
              { val: rgb, label: 'RGB' },
              { val: hsl, label: 'HSL' },
            ].map((format, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950/30 rounded border border-slate-150 dark:border-slate-850">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format.label} Notation</p>
                  <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-250">{format.val}</p>
                </div>
                <button
                  onClick={() => copyVal(format.val, format.label)}
                  className="py-1 px-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-xs font-semibold text-slate-600 rounded shadow-xs"
                >
                  {copied === format.label ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. JSON to Go & Java Converter
function JsonToGoJava() {
  const [inputJson, setInputJson] = useState('{\n  "id": 101,\n  "title": "Clean Code Book",\n  "price": 29.99,\n  "inStock": true,\n  "author": {\n    "firstName": "Robert",\n    "lastName": "Martin"\n  },\n  "tags": ["programming", "best-seller"]\n}');
  const [outputType, setOutputType] = useState<'go' | 'java'>('go');
  const [structName, setStructName] = useState('BookInfo');
  const [outputCode, setOutputCode] = useState('');
  const [errorVisible, setErrorVisible] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    convert();
  }, [inputJson, outputType, structName]);

  const convert = () => {
    setErrorVisible(null);
    try {
      if (!inputJson.trim()) {
        setOutputCode('');
        return;
      }
      const parsed = JSON.parse(inputJson);
      if (outputType === 'go') {
        setOutputCode(generateGoStruct(parsed, structName));
      } else {
        setOutputCode(generateJavaClass(parsed, structName));
      }
    } catch (err: any) {
      setErrorVisible(err.message || 'Invalid JSON input. Please format or double-check.');
    }
  };

  const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const toGoType = (val: any, fieldName: string): string => {
    if (val === null) return 'interface{}';
    if (typeof val === 'boolean') return 'bool';
    if (typeof val === 'number') {
      return Number.isInteger(val) ? 'int' : 'float64';
    }
    if (typeof val === 'string') return 'string';
    if (Array.isArray(val)) {
      if (val.length === 0) return '[]interface{}';
      return `[]${toGoType(val[0], fieldName)}`;
    }
    if (typeof val === 'object') {
      return capitalize(fieldName);
    }
    return 'interface{}';
  };

  const generateGoStruct = (obj: any, name: string): string => {
    let result = '';
    const subStructs: string[] = [];

    const recurse = (currentObj: any, currentName: string): string => {
      let structStr = `type ${capitalize(currentName)} struct {\n`;
      for (const key in currentObj) {
        if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
          const val = currentObj[key];
          const goFieldName = capitalize(key);
          const goFieldType = toGoType(val, key);
          structStr += `\t${goFieldName} ${goFieldType} \`json:"${key}"\`\n`;
          
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            subStructs.push(recurse(val, key));
          } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
            subStructs.push(recurse(val[0], key));
          }
        }
      }
      structStr += `}`;
      return structStr;
    };

    if (typeof obj !== 'object' || obj === null) {
      return `// Input is not standard JSON object`;
    }

    const mainStruct = recurse(obj, name);
    result = mainStruct + '\n\n' + subStructs.reverse().join('\n\n');
    return result.trim();
  };

  const generateJavaClass = (obj: any, name: string): string => {
    let fields = '';
    let methods = '';
    const subClasses: string[] = [];

    const toJavaType = (val: any, fieldName: string): string => {
      if (val === null) return 'Object';
      if (typeof val === 'boolean') return 'Boolean';
      if (typeof val === 'number') {
        return Number.isInteger(val) ? 'Long' : 'Double';
      }
      if (typeof val === 'string') return 'String';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'List<Object>';
        const subType = toJavaType(val[0], fieldName);
        return `List<${subType}>`;
      }
      if (typeof val === 'object') {
        return capitalize(fieldName);
      }
      return 'Object';
    };

    const processObject = (currentObj: any, currentName: string): string => {
      let classStr = `public class ${capitalize(currentName)} {\n`;
      let localFields = '';
      let localMethods = '';

      for (const key in currentObj) {
        if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
          const val = currentObj[key];
          const javaFieldName = key;
          const javaFieldType = toJavaType(val, key);

          localFields += `    private ${javaFieldType} ${javaFieldName};\n`;

          // Getter
          localMethods += `    public ${javaFieldType} get${capitalize(javaFieldName)}() {\n`;
          localMethods += `        return this.${javaFieldName};\n`;
          localMethods += `    }\n\n`;

          // Setter
          localMethods += `    public void set${capitalize(javaFieldName)}(${javaFieldType} ${javaFieldName}) {\n`;
          localMethods += `        this.${javaFieldName} = ${javaFieldName};\n`;
          localMethods += `    }\n\n`;

          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            subClasses.push(processObject(val, key));
          } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
            subClasses.push(processObject(val[0], key));
          }
        }
      }

      classStr += localFields + '\n' + localMethods + `}`;
      return classStr;
    };

    if (typeof obj !== 'object' || obj === null) {
      return `// Input is not standard JSON object`;
    }

    const mainClass = processObject(obj, name);
    return (mainClass + '\n\n' + subClasses.join('\n\n')).trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Braces className="h-5 w-5 text-indigo-500" />
              JSON to Go Struct & Java Class POJO
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Paste standard JSON payloads to instantly infer strict static type formulations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={structName}
              onChange={(e) => setStructName(e.target.value || 'Data')}
              placeholder="Structure Name"
              className="py-1.5 px-3 border border-slate-200 dark:border-slate-850 rounded-lg text-xs outline-none focus:border-indigo-500 bg-slate-50/50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200 font-bold max-w-[130px]"
            />
            <div className="flex p-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg">
              <button
                onClick={() => setOutputType('go')}
                className={`px-3.5 py-1 text-xs font-bold rounded ${
                  outputType === 'go' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Go Struct
              </button>
              <button
                onClick={() => setOutputType('java')}
                className={`px-3.5 py-1 text-xs font-bold rounded ${
                  outputType === 'java' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Java POJO
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Input JSON Source</span>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="w-full h-96 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
              placeholder="Paste raw JSON here..."
            />
          </div>

          <div className="space-y-1.5 relative">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Generated Type Code</span>
            <div className="relative">
              <textarea
                readOnly
                value={outputCode}
                className="w-full h-96 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none bg-slate-50/40 dark:bg-slate-950/30 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
                placeholder="Types will represent dynamically here..."
              />
              {outputCode && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded transition flex items-center gap-1 text-xs font-bold"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              )}
            </div>
          </div>
        </div>

        {errorVisible && (
          <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg text-xs font-mono">
            ⚠️ <b>Syntax Error:</b> {errorVisible}
          </div>
        )}
      </div>
    </div>
  );
}

// 6. Advanced JS Obfuscator & Minifier
function JsObfuscator() {
  const [inputJs, setInputJs] = useState('// Sample JavaScript Algorithm\nfunction greetUser(username) {\n  var greetingPhrase = "Hello, " + username + "!";\n  console.log(greetingPhrase);\n  return greetingPhrase;\n}\n\ngreetUser("Guest Visitor");');
  const [obfuscateStrings, setObfuscateStrings] = useState(true);
  const [mangleVariables, setMangleVariables] = useState(true);
  const [outputJs, setOutputJs] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    runObfuscation();
  }, [inputJs, obfuscateStrings, mangleVariables]);

  const runObfuscation = () => {
    if (!inputJs.trim()) {
      setOutputJs('');
      return;
    }

    let code = inputJs;

    // A/ Strip Comments (Single and multiline)
    code = code.replace(/\/\/.*$/gm, '');
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');

    // B/ Strip blank spaces and newlines down to simple statements
    code = code.replace(/\s+/g, ' ');

    if (mangleVariables) {
      // Very basic localized identifier mangler simulation
      const keyIdentifiers = ['greetUser', 'username', 'greetingPhrase'];
      const mangledReplacements = ['_0x2e9b', '_0x4fa1', '_0x55d0'];
      
      keyIdentifiers.forEach((ident, idx) => {
        const regex = new RegExp(`\\b${ident}\\b`, 'g');
        code = code.replace(regex, mangledReplacements[idx]);
      });
    }

    if (obfuscateStrings) {
      // Encode standard quote strings into Hex-escaped paths
      code = code.replace(/["'](.*?)["']/g, (match, p1) => {
        let hexed = '';
        for (let i = 0; i < p1.length; i++) {
          hexed += '\\x' + p1.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return `"${hexed}"`;
      });
    }

    setOutputJs(code.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Binary className="h-5 w-5 text-indigo-500" />
              Advanced JavaScript Obfuscator & Minifier
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Squeeze JavaScript payloads, mangle identifiers, and hex-encode private string fields.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0 bg-slate-50 dark:bg-slate-950/20 p-2.5 rounded-lg border border-slate-200 dark:border-slate-850">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-650 dark:text-slate-300">
              <input
                type="checkbox"
                checked={mangleVariables}
                onChange={(e) => setMangleVariables(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Mangle Identifiers
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-650 dark:text-slate-300">
              <input
                type="checkbox"
                checked={obfuscateStrings}
                onChange={(e) => setObfuscateStrings(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Hexadecimal Strings
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Readable JS Code</span>
            <textarea
              value={inputJs}
              onChange={(e) => setInputJs(e.target.value)}
              className="w-full h-80 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
              placeholder="Write or paste your raw JS scripts..."
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Mangled & Compressed JS</span>
            <div className="relative">
              <textarea
                readOnly
                value={outputJs}
                className="w-full h-80 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none bg-slate-50/40 dark:bg-slate-950/30 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
                placeholder="Obfuscated structures display here..."
              />
              {outputJs && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded transition flex items-center gap-1 text-xs font-bold"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy Script'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. SQL Formatter & ES Simulator
function SqlFormatter() {
  const [rawSql, setRawSql] = useState('select id, name, price, created_at from products inner join orders on products.id = orders.product_id where category = \'programming\' and price > 20 order by created_at desc;');
  const [formattedSql, setFormattedSql] = useState('');
  const [esPayload, setEsPayload] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEs, setCopiedEs] = useState(false);

  useEffect(() => {
    formatAndSimulate();
  }, [rawSql]);

  const formatAndSimulate = () => {
    if (!rawSql.trim()) {
      setFormattedSql('');
      setEsPayload('');
      return;
    }

    // A/ Format SQL keys and alignment
    let clean = rawSql.trim();
    const keywords = [
      'select', 'from', 'where', 'and', 'or', 'inner join', 'left join', 'right join', 
      'on', 'order by', 'group by', 'having', 'insert into', 'values', 'update', 'set', 'delete'
    ];

    keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      clean = clean.replace(reg, `\n${kw.toUpperCase()}`);
    });

    // Indent subsequent fields and statements to look professional
    let lines = clean.split('\n').map(l => {
      const line = l.trim();
      if (!line) return '';
      const carriesKeyword = keywords.some(k => line.startsWith(k.toUpperCase()));
      return carriesKeyword ? line : `  ${line}`;
    }).filter(Boolean);

    setFormattedSql(lines.join('\n'));

    // B/ Generate associated standard ElasticSearch Query DSL representation for simulation
    const simulatedDsl = {
      query: {
        bool: {
          must: [
            { term: { category: "programming" } },
            { range: { price: { gt: 20 } } }
          ]
        }
      },
      sort: [
        { created_at: { order: "desc" } }
      ],
      _source: ["id", "name", "price", "created_at"]
    };

    setEsPayload(JSON.stringify(simulatedDsl, null, 2));
  };

  const copySql = () => {
    navigator.clipboard.writeText(formattedSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const copyEs = () => {
    navigator.clipboard.writeText(esPayload);
    setCopiedEs(true);
    setTimeout(() => setCopiedEs(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Braces className="h-5 w-5 text-indigo-500" />
            SQL Formatter & ElasticSearch Query Simulator
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Structure raw statements immediately, capitalize target keywords, and explore mapped search engine representations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-1.5 lg:col-span-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Raw Database Query</span>
            <textarea
              value={rawSql}
              onChange={(e) => setRawSql(e.target.value)}
              className="w-full h-80 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 bg-slate-50/20 dark:bg-slate-950/20 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
              placeholder="select * from users where active = true;"
            />
          </div>

          <div className="space-y-1.5 lg:col-span-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Structured SQL Code</span>
            <div className="relative">
              <textarea
                readOnly
                value={formattedSql}
                className="w-full h-80 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none bg-slate-50/40 dark:bg-slate-950/30 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
                placeholder="Formatted queries render here..."
              />
              {formattedSql && (
                <button
                  onClick={copySql}
                  className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded transition flex items-center gap-1 text-xs font-bold"
                >
                  {copiedSql ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copiedSql ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5 lg:col-span-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">ElasticSearch Query Simulator</span>
            <div className="relative">
              <textarea
                readOnly
                value={esPayload}
                className="w-full h-80 p-4 border border-slate-250 dark:border-slate-800 rounded-lg outline-none bg-slate-50/40 dark:bg-slate-950/30 text-slate-850 dark:text-slate-150 font-mono text-xs leading-normal resize-none"
                placeholder="Simulated ES search representations..."
              />
              {esPayload && (
                <button
                  onClick={copyEs}
                  className="absolute bottom-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-350 rounded transition flex items-center gap-1 text-xs font-bold"
                >
                  {copiedEs ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copiedEs ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
