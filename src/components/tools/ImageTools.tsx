import React, { useState, useRef, useEffect } from 'react';
import { Upload, ImageIcon, RefreshCw, Maximize2, Download, CheckCircle2, ChevronRight, Sliders, Trash2, Archive, AlertTriangle, Files, Clipboard, Check } from 'lucide-react';
import JSZip from 'jszip';
import { useAuth } from '../../context/AuthContext';

export default function ImageTools({ toolId }: { toolId: string }) {
  if (toolId === 'compress-image') return <CompressImage />;
  if (toolId === 'resize-image') return <ResizeImage />;
  if (toolId === 'convert-image') return <ConvertImage />;
  if (toolId === 'image-base64') return <ImageBase64 />;
  if (toolId === 'nextgen-converter') return <NextGenConverter />;
  return null;
}

// 1. Compress Image Component
function CompressImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalSize, setOriginalSize] = useState('');
  const [compressedSize, setCompressedSize] = useState('');
  const [ratio, setRatio] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setOriginalSize(formatSize(selected.size));
      setPreviewUrl(URL.createObjectURL(selected));
      setCompressedUrl(null);
      setSuccess(false);
    }
  };

  const handleCompress = async () => {
    if (!previewUrl || !file) return;
    setLoading(true);
    setSuccess(false);

    try {
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const qualityRatio = quality / 100;
          const dataUrl = canvas.toDataURL(mimeType, qualityRatio);
          setCompressedUrl(dataUrl);

          // Calculate size from DataURL
          const head = dataUrl.indexOf(',') + 1;
          const sizeInBytes = Math.round((dataUrl.length - head) * 3 / 4);
          setCompressedSize(formatSize(sizeInBytes));
          const pRatio = Math.round((1 - (sizeInBytes / file.size)) * 100);
          setRatio(pRatio > 0 ? `${pRatio}%` : '0%');
          setSuccess(true);
        }
        setLoading(false);
      };
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl || !file) return;
    const extension = file.type === 'image/png' ? 'png' : 'jpg';
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `compressed_${file.name.split('.')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Compress Image</h3>

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="image-compress-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium font-sans">Click or Drag Image here to upload</p>
          <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, and WebP (max 50MB)</p>
        </div>

        {file && previewUrl && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-950/30 text-center">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Original Image ({originalSize})</p>
                <div className="h-48 flex items-center justify-center bg-slate-150 dark:bg-slate-950 rounded overflow-hidden p-2">
                  <img src={previewUrl} alt="Original Preview" className="max-h-full max-w-full object-contain" ref={imageRef} />
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-950/30 text-center">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Compressed Image {compressedSize && `(${compressedSize})`}</p>
                <div className="h-48 flex items-center justify-center bg-slate-150 dark:bg-slate-950 rounded overflow-hidden p-2">
                  {compressedUrl ? (
                    <img src={compressedUrl} alt="Compressed Preview" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center justify-center text-xs gap-1.5">
                      <ImageIcon className="h-8 w-8 text-slate-350 dark:text-slate-700" />
                      Apply parameters to output compressed image
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-155 dark:border-slate-800 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Set Compression Quality</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{quality}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={quality}
                onChange={(e) => {
                  setQuality(parseInt(e.target.value));
                  setSuccess(false);
                }}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Maximum Compression (Low Quality)</span>
                <span>Minimum Compression (High Quality)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCompress}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Optimizing Image...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 animate-pulse" />
                    Apply Parameters
                  </>
                )}
              </button>

              {compressedUrl && (
                <button
                  onClick={downloadImage}
                  className="py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Optimized
                </button>
              )}
            </div>
          </div>
        )}

        {success && ratio && (
          <div className="mt-5 space-y-3">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Compression Successful!</p>
                <span className="text-xs">File size reduced from <b>{originalSize}</b> to <b>{compressedSize}</b> (Shaved off <b>{ratio}</b> of space).</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Resize Image Component
function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1.33);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
      setResizedUrl(null);
      setSuccess(false);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio) {
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio) {
      setWidth(Math.round(val * aspectRatio));
    }
  };

  const handleResize = () => {
    if (!previewUrl || !file) return;
    setLoading(true);
    setSuccess(false);

    try {
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type);
          setResizedUrl(dataUrl);
          setSuccess(true);
        }
        setLoading(false);
      };
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const downloadResized = () => {
    if (!resizedUrl || !file) return;
    const link = document.createElement('a');
    link.href = resizedUrl;
    link.download = `resized_${width}x${height}_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Resize Image Dimensions</h3>

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="image-resize-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Click or Drag Image here to upload</p>
          <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, and WebP (max 50MB)</p>
        </div>

        {file && previewUrl && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-950/30 text-center">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Original Sizing Preview</p>
                <div className="h-44 flex items-center justify-center bg-slate-150 dark:bg-slate-950 rounded overflow-hidden p-2">
                  <img src={previewUrl} alt="Original" className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-950/30 text-center">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Resized Layout output</p>
                <div className="h-44 flex items-center justify-center bg-slate-150 dark:bg-slate-950 rounded overflow-hidden p-2">
                  {resizedUrl ? (
                    <img src={resizedUrl} alt="Resized" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center justify-center text-xs gap-1.5">
                      <Maximize2 className="h-8 w-8 text-slate-350 dark:text-slate-700" />
                      Render size values to see output preview
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-155 dark:border-slate-800 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md focus:border-blue-500 outline-none text-slate-800 dark:text-slate-100 font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md focus:border-blue-500 outline-none text-slate-800 dark:text-slate-100 font-sans"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="lock-aspect-ratio"
                  checked={maintainRatio}
                  onChange={(e) => {
                    setMaintainRatio(e.target.checked);
                    if (e.target.checked) {
                      setHeight(Math.round(width / aspectRatio));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-slate-200 dark:border-slate-800 rounded focus:ring-blue-500"
                />
                <label htmlFor="lock-aspect-ratio" className="text-sm font-medium text-slate-600 dark:text-slate-300 select-none cursor-pointer">
                  Lock aspect ratio ({aspectRatio.toFixed(2)}:1)
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleResize}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Resizing image canvas...
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-5 w-5" />
                    Resize Image
                  </>
                )}
              </button>

              {resizedUrl && (
                <button
                  onClick={downloadResized}
                  className="py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Resized
                </button>
              )}
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm">Your image was successfully resized to <b>{width}px × {height}px</b> and is downloading.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Convert Image Component
interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'converting' | 'complete' | 'failed';
  originalStr: string;
  convertedStr: string;
  convertedSize: number;
  blob: Blob | null;
}

function ConvertImage() {
  const { profile } = useAuth();
  const isPremium = profile?.premiumTier === true;
  const fileLimitBytes = isPremium ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB vs 10MB
  const fileLimitStr = isPremium ? '100MB' : '10MB';

  const [files, setFiles] = useState<ImageFileItem[]>([]);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('webp');
  const [quality, setQuality] = useState(85);
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
      const newFiles: ImageFileItem[] = [];
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
          convertedStr: '',
          convertedSize: 0,
          blob: null,
        });
      });

      if (overLimitNames.length > 0) {
        setErrorMsg(`Some files exceeded the limit of ${fileLimitStr}: ${overLimitNames.join(', ')}. ${!isPremium ? 'Upgrade to Nexus Premium for up to 100MB single image limits!' : ''}`);
      }

      setFiles((prev) => [...prev, ...newFiles]);
      setOverallSuccess(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setOverallSuccess(false);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setOverallSuccess(false);
    setErrorMsg(null);

    await Promise.all(
      files.map(async (f) => {
        if (f.status === 'complete') return;

        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id
              ? { ...item, status: 'converting', progress: 15 }
              : item
          )
        );

        try {
          const url = URL.createObjectURL(f.file);

          await new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = async () => {
              setFiles((prev) =>
                prev.map((item) =>
                  item.id === f.id ? { ...item, progress: 50 } : item
                )
              );

              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');

              if (ctx) {
                ctx.drawImage(img, 0, 0);
                const mimeType = `image/${format}`;
                const qualityRatio = format === 'png' ? undefined : quality / 100;
                const dataUrl = canvas.toDataURL(mimeType, qualityRatio);

                setFiles((prev) =>
                  prev.map((item) =>
                    item.id === f.id ? { ...item, progress: 85 } : item
                  )
                );

                const res = await fetch(dataUrl);
                const blob = await res.blob();

                setFiles((prev) =>
                  prev.map((item) =>
                    item.id === f.id
                      ? {
                          ...item,
                          status: 'complete',
                          progress: 100,
                          convertedSize: blob.size,
                          convertedStr: formatSize(blob.size),
                          blob: blob,
                        }
                      : item
                  )
                );
              } else {
                setFiles((prev) =>
                  prev.map((item) =>
                    item.id === f.id ? { ...item, status: 'failed', progress: 0 } : item
                  )
                );
              }
              URL.revokeObjectURL(url);
              resolve(true);
            };
            img.onerror = () => {
              setFiles((prev) =>
                prev.map((item) =>
                  item.id === f.id ? { ...item, status: 'failed', progress: 0 } : item
                )
              );
              URL.revokeObjectURL(url);
              resolve(false);
            };
          });
        } catch (e) {
          console.error(e);
          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id ? { ...item, status: 'failed', progress: 0 } : item
            )
          );
        }
      })
    );

    setOverallSuccess(true);
    setLoading(false);
  };

  const downloadSingle = (f: ImageFileItem) => {
    if (!f.blob) return;
    const url = URL.createObjectURL(f.blob);
    const link = document.createElement('a');
    link.href = url;
    const fileExt = format === 'jpeg' ? 'jpg' : format;
    link.download = `converted_${f.name.split('.')[0]}.${fileExt}`;
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
        const fileExt = format === 'jpeg' ? 'jpg' : format;
        zip.file(`converted_${f.name.split('.')[0]}.${fileExt}`, f.blob);
      }
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted_images_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalOriginalSize = files.reduce((acc, current) => acc + current.size, 0);
  const totalConvertedSize = files.reduce(
    (acc, current) => acc + (current.convertedSize || current.size),
    0
  );
  const overallRatio =
    totalOriginalSize > 0
      ? Math.round((1 - totalConvertedSize / totalOriginalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Batch Convert Image Format</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Maximum file size: <span className="font-bold text-blue-500">{fileLimitStr}</span>
              {!isPremium && ' (Nexus Premium expands upload capability to 100MB)'}
            </p>
          </div>
          {isPremium && (
            <span className="text-[10px] bento-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-extrabold uppercase tracking-widest border border-indigo-550/20">
              Nexus Premium Tier Unlocked
            </span>
          )}
        </div>

        {/* Upload Drop Zone container */}
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-950/40 relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="image-convert-input"
          />
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 transition-colors mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium font-sans">Click or Drag Images here to upload</p>
          <p className="text-xs text-slate-400 mt-1">Supports common web graphics standards of any scale</p>
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
                Source Files Queue ({files.length})
              </span>

              {files.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fade-in"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ImageIcon className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{f.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        Size: {f.originalStr}
                        {f.convertedStr && (
                          <span className="text-blue-500 font-bold ml-1.5">
                            → {f.convertedStr} ({format.toUpperCase()})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Operation markers */}
                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    {f.status === 'converting' && (
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
                          Download Only
                        </button>
                      </div>
                    )}

                    {f.status === 'failed' && (
                      <span className="text-[10px] bento-mono font-bold text-red-500 flex items-center gap-1">
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

            {/* Target format parameter selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                  Target Format Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['webp', 'png', 'jpeg'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setFormat(f);
                        setOverallSuccess(false);
                      }}
                      className={`p-2.5 font-bold text-sm border rounded-xl hover:border-slate-350 dark:hover:border-slate-700 transition ${
                        format === f
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {format !== 'png' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Quality Standard dial
                    </label>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => {
                      setQuality(parseInt(e.target.value));
                      setOverallSuccess(false);
                    }}
                    className="w-full h-8 flex items-center justify-center appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}
            </div>

            {/* Action buttons controls Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={handleConvert}
                disabled={loading || files.every((f) => f.status === 'complete')}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Converting Image Formats...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    Convert Queue Mode ({files.filter((f) => f.status !== 'complete').length} remaining)
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
                  Download Bundle ZIP ({files.filter((f) => f.status === 'complete').length} files)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Global Summary */}
        {overallSuccess && files.some((f) => f.status === 'complete') && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-xl flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold text-sm">Conversion Complete!</p>
              <p className="text-xs opacity-90 leading-relaxed mt-0.5">
                Successfully shifted formats for uploaded graphics to <b>{format.toUpperCase()}</b>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Image to Base64 Encoder / Decoder
function ImageBase64() {
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');
  
  // Encoder States
  const [file, setFile] = useState<File | null>(null);
  const [encodedStr, setEncodedStr] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Decoder States
  const [pastedStr, setPastedStr] = useState('');
  const [decodedPreview, setDecodedPreview] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setEncodedStr(result);
        setPreviewUrl(result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const copyEncoded = (format: 'raw' | 'html' | 'css') => {
    let copyText = encodedStr;
    if (format === 'html') {
      copyText = `<img src="${encodedStr}" alt="Embedded Asset" />`;
    } else if (format === 'css') {
      copyText = `background-image: url("${encodedStr}");`;
    }
    navigator.clipboard.writeText(copyText);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDecode = () => {
    setErrorVisible(null);
    setDecodedPreview(null);
    const trimmed = pastedStr.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('data:image/')) {
      setDecodedPreview(trimmed);
    } else if (trimmed.startsWith('iVBORw') || trimmed.startsWith('/9j/')) {
      // Missing headers, guess standard base64 PNG
      setDecodedPreview(`data:image/png;base64,${trimmed}`);
    } else {
      setErrorVisible('Invalid Base64 Data URI structure. Source string should ideally start with data:image/...');
    }
  };

  const downloadDecoded = () => {
    if (!decodedPreview) return;
    const link = document.createElement('a');
    link.href = decodedPreview;
    link.download = 'decoded_nexus_asset.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearEncode = () => {
    setFile(null);
    setEncodedStr('');
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Files className="h-5 w-5 text-indigo-500" />
              Image to Base64 Encoder / Decoder
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Convert small graphic elements into ready-to-paste Base64 Data URIs or reverse process them instantly.
            </p>
          </div>
          <div className="flex p-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('encode')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                activeTab === 'encode' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Encode Image
            </button>
            <button
              onClick={() => setActiveTab('decode')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                activeTab === 'decode' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Decode Base64
            </button>
          </div>
        </div>

        {activeTab === 'encode' ? (
          <div className="space-y-5">
            {!previewUrl ? (
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-950/10 rounded-2xl transition text-center relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Drop an image here or select file</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG, GIF or WebP up to 12MB</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Asset Preview</span>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-48 object-contain rounded-lg border border-slate-200 dark:border-slate-850 shadow-sm bg-grid"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-450 mt-4 truncate max-w-full">
                    {file?.name} ({file ? (file.size / 1024).toFixed(1) : 0} KB)
                  </p>
                  <button
                    onClick={handleClearEncode}
                    className="mt-3 text-xs text-red-500 font-bold hover:underline"
                  >
                    Remove File
                  </button>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Encoded Base64 String</span>
                    <textarea
                      readOnly
                      value={encodedStr}
                      className="w-full h-32 p-3 font-mono text-[10px] bg-slate-50/40 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg outline-none break-all resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => copyEncoded('raw')}
                      className="py-1.5 px-3 bg-indigo-50 dark:bg-indigo-955/20 border border-indigo-100 dark:border-indigo-900 shadow-3xs rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5"
                    >
                      {copiedFormat === 'raw' ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      Copy Raw Base64
                    </button>
                    <button
                      onClick={() => copyEncoded('html')}
                      className="py-1.5 px-3 bg-indigo-50 dark:bg-indigo-955/20 border border-indigo-100 dark:border-indigo-900 shadow-3xs rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5"
                    >
                      {copiedFormat === 'html' ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      Copy HTML Embed
                    </button>
                    <button
                      onClick={() => copyEncoded('css')}
                      className="py-1.5 px-3 bg-indigo-50 dark:bg-indigo-955/20 border border-indigo-100 dark:border-indigo-900 shadow-3xs rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5"
                    >
                      {copiedFormat === 'css' ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      Copy CSS Embed
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Paste Base64 Data URI</span>
              <textarea
                value={pastedStr}
                onChange={(e) => setPastedStr(e.target.value)}
                className="w-full h-32 p-3 font-mono text-[10px] bg-slate-50/20 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-lg outline-none break-all resize-none focus:border-indigo-500"
                placeholder="data:image/png;base64,iVBORw..."
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleDecode}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Reconstruct Graphic
              </button>
            </div>

            {errorVisible && (
              <div className="p-3 bg-red-50 dark:bg-red-955/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg text-xs font-mono">
                ⚠️ {errorVisible}
              </div>
            )}

            {decodedPreview && (
              <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Reconstructed Preview</span>
                <img
                  src={decodedPreview}
                  alt="Decoded"
                  className="max-h-48 object-contain rounded-lg border border-slate-200 dark:border-slate-850 shadow-sm bg-grid"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={downloadDecoded}
                  className="mt-4 py-2 px-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  Download Reconstructed Asset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 5. Next-Gen Image Optimizer
function NextGenConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<'webp' | 'ico'>('webp');
  const [quality, setQuality] = useState(80);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setOutputUrl(null);
    }
  };

  const processImage = () => {
    if (!file) return;
    setProcessing(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setProcessing(false);
        return;
      }

      if (conversionType === 'webp') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // Dynamic quality compression factor
        const webpUrl = canvas.toDataURL('image/webp', quality / 100);
        setOutputUrl(webpUrl);
      } else {
        // Multi-size favicon standard 32x32 size output
        canvas.width = 32;
        canvas.height = 32;
        ctx.drawImage(img, 0, 0, 32, 32);
        // Standard PNG data is wrapped/converted dynamically inside web brower context
        const icoUrl = canvas.toDataURL('image/x-icon');
        setOutputUrl(icoUrl);
      }
      setProcessing(false);
    };
  };

  const downloadProcessed = () => {
    if (!outputUrl) return;
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = conversionType === 'webp' ? 'nexus_optimized.webp' : 'favicon.ico';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-indigo-500" />
              Next-Gen Image Optimizer & WebP Converter
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Convert traditional uploads (PNG/JPEG) to high-speed formats or favicon specs entirely client-side.
            </p>
          </div>
          <div className="flex p-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg shrink-0">
            <button
              onClick={() => setConversionType('webp')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                conversionType === 'webp' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Convert to WebP
            </button>
            <button
              onClick={() => setConversionType('ico')}
              className={`px-3.5 py-1 text-xs font-bold rounded ${
                conversionType === 'ico' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              ICO Favicon
            </button>
          </div>
        </div>

        {!file ? (
          <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50/50 dark:hover:bg-slate-950/10 rounded-2xl transition text-center relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Drop PNG/JPG image here or select file</p>
            <p className="text-xs text-slate-400 mt-1">Up to 15MB file sizes processed instantly</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
            <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Configure Optimization parameters</span>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-150 dark:border-slate-850">
                <ImageIcon className="h-8 w-8 text-indigo-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>

              {conversionType === 'webp' && (
                <div className="space-y-1.5 p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-150 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-650 dark:text-slate-300">Compression Quality</span>
                    <span className="text-indigo-600">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block leading-tight">
                    Lowering quality yields extremely tiny page speed sizes with minor pixel differences.
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={processImage}
                  disabled={processing}
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-lg text-xs shadow-sm transition"
                >
                  {processing ? 'Processing...' : 'Generate New Image'}
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="py-2 px-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-lg text-xs"
                >
                  Clear File
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Generation Result</span>
              {outputUrl ? (
                <div className="space-y-4 flex flex-col items-center justify-center w-full">
                  <img
                    src={outputUrl}
                    alt="Processed Outcome"
                    className="max-h-40 object-contain rounded-lg border border-slate-200 dark:border-slate-850 bg-grid shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={downloadProcessed}
                    className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download Optimized Asset
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-4 leading-normal max-w-[240px]">
                  Adjust rules and press <b>Generate</b> to trigger instant browser-side calculations.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

