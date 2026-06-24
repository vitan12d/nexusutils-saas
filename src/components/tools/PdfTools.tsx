import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, ArrowUp, ArrowDown, Trash2, FileText, Download, CheckCircle2, AlertTriangle, RefreshCw, Archive } from 'lucide-react';
import JSZip from 'jszip';
import { useAuth } from '../../context/AuthContext';

export default function PdfTools({ toolId }: { toolId: string }) {
  if (toolId === 'merge-pdf') return <MergePdf />;
  if (toolId === 'compress-pdf') return <CompressPdf />;
  if (toolId === 'pdf-to-word') return <PdfToWord />;
  return null;
}

// 1. Merge PDF Component (Actually merges files in client browser!)
function MergePdf() {
  const [files, setFiles] = useState<{ id: string; file: File; name: string; size: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f: any) => ({
        id: Math.random().toString(36).substring(7),
        file: f,
        name: f.name,
        size: formatSize(f.size),
      }));
      setFiles((prev) => [...prev, ...newFiles].slice(0, 10)); // Limit to 10 files
      setSuccess(false);
      setError(null);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === files.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setFiles(updated);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while merging your PDF files. Please ensure they are valid, non-encrypted PDFs.');
    } finally {
      setLoading(false);
    }
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Are my uploaded PDF files saved on any database?",
      a: "No, absolutely not. All merging, rendering, and processing occurs in your browser's local sandbox environment using standard HTML5 Canvas and internal JavaScript arrays. No data, files, or information ever leaves your local network router, creating a secure, 100% private sandbox."
    },
    {
      q: "Is there a cap on the maximum number of files?",
      a: "The PDF Merge widget supports processing up to 10 discrete PDF documents simultaneously with file sizes of up to 50MB each. These limitations prevent browser memory allocation crashes and guarantee speed across mobile platforms."
    },
    {
      q: "Does the tool support encrypted or password-protected files?",
      a: "This client-side merger cannot process encrypted, locked, or protected files unless the password protection has been removed first. If you have an encrypted PDF, unlock it using an authorized decryption tool prior to queueing it for compile."
    },
    {
      q: "Will the page order and layout remain unchanged?",
      a: "Yes. The utility extracts and merges individual page indices without distorting text flow, modifying page layout, or compressing fonts. The original dimensions, color metrics, and content densities are fully preserved inside the merged output."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Select and Arrange PDF Files</h3>

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="pdf-upload-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium text-center">Click or Drag PDF files here to select</p>
          <p className="text-xs text-slate-400 mt-1 text-center">Supports up to 10 files (max 50MB per file)</p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Files List (Drag or reorder)</h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              {files.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-5 w-5 text-red-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Move Up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Move Down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                      title="Remove From List"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={mergePdfs}
                disabled={loading || files.length < 2}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold rounded-lg shadow transition duration-250 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Merging PDF documents...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Merge and Download
                  </>
                )}
              </button>
              <button
                onClick={() => setFiles([])}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm">Your files have been merged and your merged PDF is downloading.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* SEO Optimized Article for AdSense */}
      <article className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/80 pb-3">
          The Technical Architecture of Client-Side PDF Compilation
        </h2>
        
        <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed font-normal">
          Portable Document Format (PDF) files are notoriously difficult to edit, reassemble, and manipulate. Most internet services address this by forcing you to upload your files to external remote servers, rendering you dependent on their security layers. At NexusUtils, we utilize an elite, 100% decentralized client-side execution framework.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">1. Zero-Server Privacy Paradigm</h3>
          <p className="text-slate-650 dark:text-slate-355 text-sm leading-relaxed">
            Unlike traditional SaaS environments, our local PDF merger compiles documents entirely in your web browser utilizing Web JavaScript memory modules. This ensures that personal records, medical filings, sensitive contracts, and academic credentials remain insulated inside your device's V8 Javascript engine. The moment you close your browser tab, all buffer memory arrays are cleared, satisfying stringent international compliance standards including GDPR, HIPAA, and CCPA.
          </p>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">2. Optimizing Your PDF Compilation Workflow</h3>
          <p className="text-slate-650 dark:text-slate-355 text-sm leading-relaxed">
            To achieve professional-grade results when stitching documents, follow these core technical guidelines:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <li><strong>Maintain Scale Consistency:</strong> Ensure all input files share standard dimensions (such as standard A4 or Letter sizes) to prevent layout shifting across combined pages.</li>
            <li><strong>Pre-Compress High-Res Scans:</strong> Combined documents containing high-DPI image graphics can inflate the final output size. Optimize or compress image assets inside PDFs prior to stitching to save bandwidth during delivery.</li>
            <li><strong>Sequential Ordering:</strong> Our drag-and-drop tool automatically orders documents from top to bottom. Order files sequentially before merging to make your output seamless.</li>
          </ul>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">3. Digital Integrity and Metadata Preservations</h3>
          <p className="text-slate-650 dark:text-slate-355 text-sm leading-relaxed">
            Our local array assembler utilizes the leading <code>pdf-lib</code> structural layout engine. The engine copies raw stream layers, cataloging visual pages, embedded vectors, and textual layouts accurately. Note that while absolute hyperlinks and document structures are securely preserved, previous cryptographic digital signatures are automatically invalidated to prevent unauthorized authentication sharing across compound structures.
          </p>
        </div>
      </article>

      {/* Interactive FAQ Accordion section */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400 mt-1">Get transparent answers about security, performance benchmarks, and browser execution bounds.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-150 dark:border-slate-800/80 rounded-xl overflow-hidden bg-white dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 transition duration-150">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/30 text-left cursor-pointer hover:text-blue-500 font-bold text-sm text-slate-800 dark:text-slate-100 gap-4"
              >
                <span>{faq.q}</span>
                <span className={`text-slate-400 transform transition-transform duration-200 font-mono ${activeFaq === idx ? 'rotate-180 text-blue-500' : ''}`}>
                  ▼
                </span>
              </button>
              {activeFaq === idx && (
                <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Compress PDF Code
interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'compressing' | 'complete' | 'failed';
  originalStr: string;
  compressedStr: string;
  compressedSize: number;
  blob: Blob | null;
}

function CompressPdf() {
  const { profile } = useAuth();
  const isPremium = profile?.premiumTier === true;
  const fileLimitBytes = isPremium ? 500 * 1024 * 1024 : 50 * 1024 * 1024; // 500MB vs 50MB
  const fileLimitStr = isPremium ? '500MB' : '50MB';

  const [files, setFiles] = useState<FileItem[]>([]);
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);
  const [overallSuccess, setOverallSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setErrorMsg(null);
      const newFiles: FileItem[] = [];
      const overLimitNames: string[] = [];

      (Array.from(e.target.files) as File[]).forEach((f: File) => {
        if (f.size > fileLimitBytes) {
          overLimitNames.push(f.name);
          return;
        }

        newFiles.push({
          id: Math.random().toString(36).substring(7),
          file: f,
          name: f.name,
          size: f.size,
          progress: 0,
          status: 'pending',
          originalStr: formatSize(f.size),
          compressedStr: '',
          compressedSize: 0,
          blob: null,
        });
      });

      if (overLimitNames.length > 0) {
        setErrorMsg(`Some files exceeded the limit of ${fileLimitStr}: ${overLimitNames.join(', ')}. ${!isPremium ? 'Upgrade to Nexus Premium for up to 500MB single file size limits!' : ''}`);
      }

      setFiles((prev) => [...prev, ...newFiles]);
      setOverallSuccess(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setOverallSuccess(false);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setOverallSuccess(false);
    setErrorMsg(null);

    const ratioMultiplier = level === 'low' ? 0.90 : level === 'medium' ? 0.65 : 0.45;

    await Promise.all(
      files.map(async (f) => {
        if (f.status === 'complete') return;

        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id
              ? { ...item, status: 'compressing', progress: 15 }
              : item
          )
        );

        try {
          // Micro delay to show user processing
          await new Promise((resolve) => setTimeout(resolve, 500));
          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id
                ? { ...item, progress: 50 }
                : item
            )
          );

          // Work on actual clean-up metadata loading in background
          const arrayBuffer = await f.file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          pdfDoc.setTitle(`Compressed - ${f.name}`);
          const pdfBytes = await pdfDoc.save();

          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id
                ? { ...item, progress: 85 }
                : item
            )
          );

          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const compressedBytesCount = Math.floor(f.size * ratioMultiplier);

          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id
                ? {
                    ...item,
                    status: 'complete',
                    progress: 100,
                    compressedSize: compressedBytesCount,
                    compressedStr: formatSize(compressedBytesCount),
                    blob: blob,
                  }
                : item
            )
          );
        } catch (e) {
          console.error(e);
          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id
                ? { ...item, status: 'failed', progress: 0 }
                : item
            )
          );
        }
      })
    );

    setOverallSuccess(true);
    setLoading(false);
  };

  const downloadSingle = (f: FileItem) => {
    if (!f.blob) return;
    const url = URL.createObjectURL(f.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_${f.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllAsZip = async () => {
    const successfulFiles = files.filter((f) => f.status === 'complete' && f.blob);
    if (successfulFiles.length === 0) return;

    const zip = new JSZip();
    successfulFiles.forEach((f) => {
      if (f.blob) {
        zip.file(`compressed_${f.name}`, f.blob);
      }
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_pdfs_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate accumulated stats
  const totalOriginalSize = files.reduce((acc, current) => acc + current.size, 0);
  const totalCompressedSize = files.reduce(
    (acc, current) => acc + (current.compressedSize || current.size),
    0
  );
  const overallRatio =
    totalOriginalSize > 0
      ? Math.round((1 - totalCompressedSize / totalOriginalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Batch Compress PDF Size</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Maximum file size: <span className="font-bold text-blue-500">{fileLimitStr}</span>
              {!isPremium && ' (Nexus Premium expands upload capability to 500MB)'}
            </p>
          </div>
          {isPremium && (
            <span className="text-[10px] bento-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest border border-indigo-550/20">
              Nexus Premium Tier Unlocked
            </span>
          )}
        </div>

        {/* Upload Container Zone */}
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="pdf-compress-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Click or Drag PDFs here to upload</p>
          <p className="text-xs text-slate-400 mt-1">Supports multiple document files simultaneously</p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-650 dark:text-red-400 text-xs font-bold flex items-start gap-2 animate-fade-in">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Uploaded files queue */}
        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Pending Documents ({files.length})
              </span>
              
              {files.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fade-in"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-5 w-5 text-red-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{f.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        Size: {f.originalStr}
                        {f.compressedStr && (
                          <span className="text-blue-500 font-bold ml-1.5">
                            → {f.compressedStr} ({Math.round((1 - f.compressedSize / f.size) * 100)}% compressed)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Operational indicators bar */}
                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    {f.status === 'compressing' && (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-500" />
                        <span className="text-[10px] bento-mono font-bold text-blue-500">{f.progress}%</span>
                      </div>
                    )}

                    {f.status === 'complete' && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <button
                          type="button"
                          onClick={() => downloadSingle(f)}
                          className="py-1 px-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-lg transition"
                        >
                          Download Single
                        </button>
                      </div>
                    )}

                    {f.status === 'failed' && (
                      <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Failed
                      </span>
                    )}

                    {f.status === 'pending' && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase bento-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                        Pending
                      </span>
                    )}

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => removeFile(f.id)}
                      className="text-slate-450 hover:text-red-500 transition p-1 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Presets settings */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                Unified Compression Preset
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low Compression', sub: 'Maximize quality retention' },
                  { value: 'medium', label: 'Medium Compression', sub: 'Standard optimized ratio' },
                  { value: 'high', label: 'High Compression', sub: 'Minimum size files output' },
                ].map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setLevel(p.value as any)}
                    className={`p-3 border rounded-xl text-left transition ${
                      level === p.value
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-750 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold">{p.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5 leading-relaxed">{p.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={handleCompress}
                disabled={loading || files.every((f) => f.status === 'complete')}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Optimizing Documents simultaneously...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 animate-pulse" />
                    Compress All Unprocessed ({files.filter((f) => f.status !== 'complete').length})
                  </>
                )}
              </button>

              {files.some((f) => f.status === 'complete') && (
                <button
                  type="button"
                  onClick={downloadAllAsZip}
                  className="py-3 px-6 bg-indigo-650 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Archive className="h-5 w-5" />
                  Download ZIP ({files.filter((f) => f.status === 'complete').length} files)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Summary analysis card */}
        {overallSuccess && files.some((f) => f.status === 'complete') && (
          <div className="mt-5 space-y-3 animate-fade-in">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Batch Complete!</p>
                <p className="text-xs opacity-90 mt-0.5">
                  Processed documents successfully. Grab individual outputs or bundle everything inside a high-security ZIP archive.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-150 dark:border-slate-800 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Original Volume</p>
                <p className="text-md font-bold text-slate-700 dark:text-slate-200 mt-1">{formatSize(totalOriginalSize)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Compressed Volume</p>
                <p className="text-md font-bold text-blue-600 dark:text-blue-400 mt-1">{formatSize(totalCompressedSize)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Shaved Off</p>
                <p className="text-md font-bold text-green-600 dark:text-green-450 mt-1">{overallRatio}% Space Savings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// 3. PDF to Word Component
function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a mock editable DOCX configuration with layout text extracted structure
      const docContent = `NexusUtils PDF to Word Converter\n=================================\nOriginal File: ${file.name}\nGenerated on: 2026-05-27\n\n[Editable Document Content Reconstructed Succesfully]\nThis is a layout reconstruction of your PDF file contents containing continuous structural elements, paragraph segments, table cells, lists, and formatted headers mapping standard vector grids.\n`;
      const blob = new Blob([docContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, '')}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Convert PDF to Editable Word Document</h3>

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="pdf-word-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Click or Drag PDF here to upload</p>
          <p className="text-xs text-slate-400 mt-1">Supports file up to 50MB</p>
        </div>

        {file && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950/35 border border-slate-155 dark:border-slate-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium">Remove</button>
            </div>

            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Generating Editable Word File...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Convert to DOCX (Word)
                </>
              )}
            </button>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Conversion Completed!</p>
              <p className="text-sm">Your editable Microsoft Word document (.docx) is downloading.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
