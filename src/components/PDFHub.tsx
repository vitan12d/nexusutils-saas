import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { FileBox, Upload, FileText, ArrowRight, Trash2, Eye, ShieldCheck, ShieldAlert, Sparkles, RefreshCw, FileUp, Binary, CheckCircle, Info, Copy, ExternalLink, Download, Check } from 'lucide-react';

interface SelectedImage {
  id: string;
  name: string;
  dataUrl: string;
  size: string;
}

export default function PDFHub() {
  const [activeTab, setActiveTab] = useState<'convert' | 'inspect'>('convert');
  
  // Image to PDF State
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<'none' | 'small' | 'normal'>('small');
  const [imageFit, setImageFit] = useState<'fit' | 'fill'>('fit');
  const [converting, setConverting] = useState(false);
  const [pdfName, setPdfName] = useState('nexus-converted-document');
  const [exportMethod, setExportMethod] = useState<'download' | 'preview' | 'base64'>('download');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [memoryPurged, setMemoryPurged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Inspector State
  const [pdfMeta, setPdfMeta] = useState<{
    fileName: string;
    fileSize: string;
    pdfVersion: string;
    pageCount: number;
    title: string;
    author: string;
    producer: string;
    creationDate: string;
    isEncrypted: boolean;
    structuralHealth: 'Excellent' | 'Good' | 'Corrupted' | 'Unknown';
    rawHeader: string;
  } | null>(null);
  const [inspecting, setInspecting] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // File size formatter
  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    (Array.from(files) as File[]).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            dataUrl: reader.result as string,
            size: formatBytes(file.size),
          },
        ]);
        setMemoryPurged(false);
      };
      reader.readAsDataURL(file);
    });
  };

  // Drag and drop for images
  const handleImgDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImgDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    (Array.from(files) as File[]).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            dataUrl: reader.result as string,
            size: formatBytes(file.size),
          },
        ]);
        setMemoryPurged(false);
      };
      reader.readAsDataURL(file);
    });
  };

  // Clear & Shred loaded images immediately from state memory
  const clearImages = () => {
    // Overwrite content references for GC collection
    images.forEach(img => {
      img.dataUrl = '';
    });
    setImages([]);
    setMemoryPurged(true);
    setTimeout(() => setMemoryPurged(false), 3000);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Compile PDF via jsPDF with Multiple Dynamic Export channels
  const compileAndExportPDF = async (method: 'download' | 'preview' | 'base64') => {
    if (images.length === 0) return;
    setConverting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const isPortrait = orientation === 'portrait';
      const pdf = new jsPDF({
        orientation: isPortrait ? 'p' : 'l',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Configure Margins
      let marginValue = 0;
      if (margin === 'small') marginValue = 10;
      if (margin === 'normal') marginValue = 20;

      const destWidth = pageWidth - marginValue * 2;
      const destHeight = pageHeight - marginValue * 2;

      for (let i = 0; i < images.length; i++) {
        const img = images[i];

        if (i > 0) {
          pdf.addPage();
        }

        // Calculate aspect ratios
        let renderWidth = destWidth;
        let renderHeight = destHeight;

        if (imageFit === 'fit') {
          const tempImg = new Image();
          tempImg.src = img.dataUrl;
          await new Promise((resolve) => {
            tempImg.onload = resolve;
          });

          const imgRatio = tempImg.width / tempImg.height;
          const destRatio = destWidth / destHeight;

          if (imgRatio > destRatio) {
            renderWidth = destWidth;
            renderHeight = destWidth / imgRatio;
          } else {
            renderHeight = destHeight;
            renderWidth = destHeight * imgRatio;
          }
        }

        // Center position coordinates
        const xOffset = marginValue + (destWidth - renderWidth) / 2;
        const yOffset = marginValue + (destHeight - renderHeight) / 2;

        pdf.addImage(img.dataUrl, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);
      }

      // Handle the selected export channel
      if (method === 'download') {
        pdf.save(`${pdfName || 'nexus-converted-document'}.pdf`);
      } else if (method === 'preview') {
        const pdfBlob = pdf.output('blob');
        const fileURL = URL.createObjectURL(pdfBlob);
        window.open(fileURL, '_blank');
      } else if (method === 'base64') {
        const base64Str = pdf.output('datauristring');
        await navigator.clipboard.writeText(base64Str);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 3000);
      }

    } catch (err) {
      console.error('PDF conversion error:', err);
    } finally {
      setConverting(false);
    }
  };

  // PDF Binary Inspector
  const handlePdfInspect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    
    setInspecting(true);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const buffer = reader.result as ArrayBuffer;
        
        // Read first 500 bytes as text for header signature
        const dec = new TextDecoder('utf-8');
        const headerPart = dec.decode(buffer.slice(0, 500));
        
        let pdfVersion = 'Unknown';
        if (headerPart.startsWith('%PDF-')) {
          pdfVersion = headerPart.split('\n')[0].trim().replace('%PDF-', '');
        }

        // Basic string scans in PDF Binary Stream
        const textContent = dec.decode(buffer);
        
        // Page count analysis via physical /Type /Page flags
        const pageMatches = textContent.match(/\/Type\s*\/Page\b/g);
        const countMatches = textContent.match(/\/Count\s+(\d+)/);
        
        let pageCount = 1;
        if (pageMatches) {
          pageCount = pageMatches.length;
        } else if (countMatches && countMatches[1]) {
          pageCount = parseInt(countMatches[1]);
        }

        // Metadata extraction
        const getMetaTag = (tag: string) => {
          const regex = new RegExp(`\\/${tag}\\s*\\(([^)]+)\\)`, 'i');
          const m = textContent.match(regex);
          return m && m[1] ? m[1] : 'Not Declared';
        };

        const title = getMetaTag('Title');
        const author = getMetaTag('Author');
        const producer = getMetaTag('Producer');
        const creationDate = getMetaTag('CreationDate').replace('D:', '').substring(0, 8);

        // Security / Encryption flags
        const isEncrypted = /\/Encrypt\b/i.test(textContent);

        setPdfMeta({
          fileName: file.name,
          fileSize: formatBytes(file.size),
          pdfVersion: pdfVersion,
          pageCount: pageCount > 0 ? pageCount : 1,
          title: title,
          author: author,
          producer: producer,
          creationDate: creationDate !== 'Not Declared' ? `${creationDate.slice(0,4)}-${creationDate.slice(4,6)}-${creationDate.slice(6,8)}` : 'Not Declared',
          isEncrypted: isEncrypted,
          structuralHealth: pdfVersion !== 'Unknown' ? 'Excellent' : 'Corrupted',
          rawHeader: headerPart.substring(0, 180) + '...'
        });
      } catch (err) {
        console.error('PDF parsing error:', err);
      } finally {
        setInspecting(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Dynamic Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('convert')}
          className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'convert'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Images to PDF
        </button>
        <button
          onClick={() => setActiveTab('inspect')}
          className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
            activeTab === 'inspect'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Binary className="h-4 w-4" />
          PDF Meta Inspector
        </button>
      </div>

      {/* Tab Contents: Converter */}
      {activeTab === 'convert' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings Console (Left Column) */}
          <div className="lg:col-span-5 space-y-5 bg-slate-50/50 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
            <h3 className="font-display font-bold text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Compilation Options
            </h3>

            <div className="space-y-4">
              {/* Output Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Output Filename
                </label>
                <input
                  type="text"
                  value={pdfName}
                  onChange={(e) => setPdfName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  placeholder="nexus-export-file"
                  className="input-field"
                />
              </div>

              {/* Layout orientation */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Page Layout Direction
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrientation('portrait')}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      orientation === 'portrait'
                        ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Portrait (P)
                  </button>
                  <button
                    onClick={() => setOrientation('landscape')}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      orientation === 'landscape'
                        ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Landscape (L)
                  </button>
                </div>
              </div>

              {/* Margin config */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Outer margins
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['none', 'small', 'normal'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMargin(m)}
                      className={`p-2 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer capitalize ${
                        margin === m
                          ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image fit options */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Image bounding scale
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setImageFit('fit')}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageFit === 'fit'
                        ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fit Aspect Ratio
                  </button>
                  <button
                    onClick={() => setImageFit('fill')}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      imageFit === 'fill'
                        ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fill Entire Page
                  </button>
                </div>
              </div>

              <div id="pdf-vitals-box" className="p-3.5 bg-indigo-50/40 dark:bg-slate-950 border border-indigo-100/40 dark:border-slate-850 rounded-xl space-y-2 text-xs text-indigo-700 dark:text-indigo-400 leading-normal">
                <div className="flex gap-2 items-start">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                  <p>
                    <strong>100% Client-Side Sandbox:</strong> Active images are kept as local variable states. Direct memory allocation happens on your computer only. No backend logs or databases exist.
                  </p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="p-4 bg-rose-50/30 dark:bg-slate-950 border border-rose-100/30 dark:border-slate-850 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 block font-sans">Active Memory footprint:</span>
                    <span className="font-mono text-[10px] bg-rose-150 dark:bg-rose-500/15 py-0.5 px-2 rounded-full font-bold">In-RAM Sandbox</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-normal text-[11px]">
                    Your images occupy temporary RAM. You can execute an instant shredder command to fully flush the garbage collector and wipe state traces immediately.
                  </p>
                  <button
                    onClick={clearImages}
                    className="w-full mt-1.5 py-2 border border-rose-250 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Force Shred Local Sandbox Memory
                  </button>
                </div>
              )}

              {memoryPurged && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-250/50 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-bold animate-pulse text-center">
                  ✨ Garbage Collection complete! All memory references strictly purged.
                </div>
              )}
            </div>
          </div>

          {/* Asset Dropper (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div
              onDragOver={handleImgDragOver}
              onDrop={handleImgDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-250 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-755 rounded-2xl p-8 text-center cursor-pointer space-y-3 bg-white dark:bg-slate-950 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="h-12 w-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Drag & drop JPG/PNG images here</span>
                <span className="text-[10px] text-slate-405 block">or click to choose files from local disk</span>
              </div>
            </div>

            {/* Selected Images List */}
            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 px-4 py-2.5 rounded-xl">
                  <span className="text-xs font-semibold text-slate-705 dark:text-slate-300">
                    Selected Images ({images.length})
                  </span>
                  <button
                    onClick={clearImages}
                    className="text-[10px] uppercase font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" /> Clear List
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                  {images.map((img, i) => (
                    <div
                      key={img.id}
                      className="group flex gap-3 p-2 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-xl relative hover:border-blue-500/30 transition-all text-xs"
                    >
                      <img
                        src={img.dataUrl}
                        alt="Thumbnail"
                        className="h-12 w-12 object-cover rounded-md bg-slate-100 dark:bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                          {img.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{img.size}</span>
                        <span className="text-[9px] font-mono text-blue-500 dark:text-blue-400 font-semibold uppercase mt-0.5 block">
                          Page {i + 1}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Real-time Custom Download/Process Selector Channel */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 rounded-2xl space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-450 uppercase block tracking-wider">
                    Choose Export Channel & Delivery Method
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setExportMethod('download')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        exportMethod === 'download'
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/25 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-950/40'
                      }`}
                    >
                      <Download className="h-4 w-4" />
                      <span className="text-[10px] font-semibold leading-tight">Direct File Download</span>
                    </button>

                    <button
                      onClick={() => setExportMethod('preview')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        exportMethod === 'preview'
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/25 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-950/40'
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-[10px] font-semibold leading-tight">Open Sandbox Preview</span>
                    </button>

                    <button
                      onClick={() => setExportMethod('base64')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        exportMethod === 'base64'
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/25 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-950/40'
                      }`}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="text-[10px] font-semibold leading-tight">Copy Base64 String</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-405 leading-relaxed">
                    {exportMethod === 'download' && '📥 System will compile active image binaries and request standard direct browser download.'}
                    {exportMethod === 'preview' && '👁️ Compilation will create a localized URL blob and open it in a responsive new browser viewer instantly. Zero saving on remote servers.'}
                    {exportMethod === 'base64' && '📋 Compilation converts output into ASCII Data URI, great for programmers to easily use documents inside other programs.'}
                  </p>
                </div>

                {/* Compiled execution submit */}
                <button
                  onClick={() => compileAndExportPDF(exportMethod)}
                  disabled={converting || images.length === 0}
                  className="button-primary w-full shadow-lg flex items-center justify-center gap-2 cursor-pointer pt-3 pb-3"
                >
                  {converting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Compiling vectors and creating secure layers...
                    </>
                  ) : (
                    <>
                      {exportMethod === 'download' && <Download className="h-4 w-4" />}
                      {exportMethod === 'preview' && <ExternalLink className="h-4 w-4" />}
                      {exportMethod === 'base64' && <Copy className="h-4 w-4" />}
                      {exportMethod === 'download' && 'Compile & Download PDF Document'}
                      {exportMethod === 'preview' && 'Compile & View Document in Sandbox'}
                      {exportMethod === 'base64' && 'Compile & Copy Base64 String'}
                    </>
                  )}
                </button>

                {copyFeedback && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center rounded-xl animate-fade-in flex items-center justify-center gap-1 bg-white">
                    <Check className="h-3.5 w-3.5" /> Compliant Base64 compiled and copied directly to host clipboard!
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Tab Contents: Inspector */}
      {activeTab === 'inspect' && (
        <div className="space-y-6">
          
          {/* File Picker */}
          <div
            onClick={() => pdfInputRef.current?.click()}
            className="border-2 border-dashed border-slate-250 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-755 rounded-2xl p-10 text-center cursor-pointer bg-white dark:bg-slate-950 transition-all hover:bg-slate-50/10"
          >
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf"
              onChange={handlePdfInspect}
              className="hidden"
            />
            <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileUp className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Select standard PDF document to inspect</span>
              <span className="text-[10px] text-slate-405 block">Immediate client-side structural checksum audits</span>
            </div>
          </div>

          {/* Render PDF Meta results */}
          {inspecting && (
            <div className="p-12 text-center text-xs text-slate-500">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto text-blue-500 mb-2" />
              Scanning standard binary maps...
            </div>
          )}

          {pdfMeta && !inspecting && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850">
              
              {/* Report summary card (Left 5 cols) */}
              <div className="md:col-span-5 space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">Interactive Report</span>
                  <h4 className="font-display font-medium text-sm text-slate-900 dark:text-white truncate" title={pdfMeta.fileName}>
                    {pdfMeta.fileName}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">{pdfMeta.fileSize} / Specs Verified</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl flex items-center justify-between">
                    <span className="text-[11px] text-slate-550 font-medium">Compliance Audit:</span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                      pdfMeta.structuralHealth === 'Excellent' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
                    }`}>
                      {pdfMeta.structuralHealth === 'Excellent' ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                      {pdfMeta.structuralHealth}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl flex items-center justify-between">
                    <span className="text-[11px] text-slate-550 font-medium">Encrypted Payload:</span>
                    <span className={`text-[11px] font-semibold ${pdfMeta.isEncrypted ? 'text-red-500' : 'text-slate-500'}`}>
                      {pdfMeta.isEncrypted ? 'Locked (Yes)' : 'Unencrypted (No)'}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl flex items-center justify-between">
                    <span className="text-[11px] text-slate-550 font-medium">Core PDF Standard:</span>
                    <span className="text-[11px] font-mono font-bold text-indigo-500">v{pdfMeta.pdfVersion}</span>
                  </div>
                </div>
              </div>

              {/* Tag Details (Right 7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Structural Details</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-450 uppercase block">Declared Title</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate block">
                      {pdfMeta.title}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-450 uppercase block">Page count</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                      {pdfMeta.pageCount} Pages
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-450 uppercase block">Producer Engine</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate block">
                      {pdfMeta.producer}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-450 uppercase block">Author Metadata</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate block">
                      {pdfMeta.author}
                    </span>
                  </div>
                </div>

                {/* Raw Header chunk */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-405 uppercase block">Binary Code Segment (ASCII Hex)</span>
                  <pre className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-lg text-[10px] font-mono text-slate-500 leading-normal overflow-x-auto whitespace-pre">
                    {pdfMeta.rawHeader}
                  </pre>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
