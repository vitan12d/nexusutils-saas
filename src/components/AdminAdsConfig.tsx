/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AdsConfig } from '../types';
import { Save, AlertTriangle, ShieldCheck, Code, Eye, Settings, HelpCircle, FileText } from 'lucide-react';

interface AdminAdsConfigProps {
  currentConfig: AdsConfig;
  onSave: (newConfig: AdsConfig) => void;
  onClose: () => void;
}

export default function AdminAdsConfig({ currentConfig, onSave, onClose }: AdminAdsConfigProps) {
  const [config, setConfig] = useState<AdsConfig>(currentConfig);
  const [statusMessage, setStatusMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'banners' | 'popunders' | 'instructions'>('banners');

  const handleFieldChange = (field: keyof AdsConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('جاري الحفظ...');

    try {
      const resp = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await resp.json();
      if (data.success) {
        onSave(config);
        setStatusMessage('✅ تم حفظ الإعدادات بنجاح وتفعيل الإعلانات المحدثة!');
        setTimeout(() => setStatusMessage(''), 4000);
      } else {
        setStatusMessage('❌ فشل حفظ الإعدادات بالسيرفر.');
      }
    } catch (err) {
      // Local fallback representation is saved
      onSave(config);
      setStatusMessage('⚠️ تم الحفظ محلياً في المتصفح! (لم يتم الاتصال بالسيرفر)');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  return (
    <div className="bg-[#0f111a] border border-[#1e2230] rounded-2xl p-6 shadow-2xl font-sans text-right max-w-4xl mx-auto" dir="rtl">
      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-[#1e2230] pb-3.5 mb-5">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '4s' }} />
          <h2 className="text-md font-bold text-white">إدارة الإعلانات وشفرات تسييل أرباح البث (Sponsor & Ad Managers)</h2>
        </div>
        <button
          onClick={onClose}
          className="text-red-400 bg-red-950/20 hover:bg-red-900 hover:text-white border border-red-900/30 transition-all font-bold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
        >
          إغلاق اللوحة ✕
        </button>
      </div>

      {statusMessage && (
        <div className="mb-4 p-3 bg-primary/10 border-r-4 border-primary text-xs text-primary font-bold rounded-lg shadow-sm">
          {statusMessage}
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex gap-2 border-b border-[#1e2230] mb-5 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer ${
            activeTab === 'banners' ? 'bg-primary text-black font-extrabold shadow-[0_-2px_10px_rgba(0,255,102,0.15)]' : 'bg-[#07080b] border border-b-0 border-[#1e2230] text-slate-300 hover:text-primary'
          }`}
        >
          🖼️ بنرات Google AdSense
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('popunders')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer ${
            activeTab === 'popunders' ? 'bg-primary text-black font-extrabold shadow-[0_-2px_10px_rgba(0,255,102,0.15)]' : 'bg-[#07080b] border border-b-0 border-[#1e2230] text-slate-300 hover:text-primary'
          }`}
        >
          💥 إعلانات Popunders (Adsterra)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('instructions')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer ${
            activeTab === 'instructions' ? 'bg-primary text-black font-extrabold shadow-[0_-2px_10px_rgba(0,255,102,0.15)]' : 'bg-[#07080b] border border-b-0 border-[#1e2230] text-slate-300 hover:text-primary'
          }`}
        >
          📖 تعليمات وحلول دمج الشفرات
        </button>
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-5 text-xs text-slate-200">
        
        {activeTab === 'banners' && (
          <div className="space-y-4">
            <div className="bg-[#0a1122]/60 border border-[#1e2e50] p-3.5 rounded-xl text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-bold text-white">مساحات الإعلان جاهزة ومتطابقة مع المعايير الدولية</p>
                <p className="text-[11px] opacity-80 mt-0.5 leading-relaxed">
                  ضع الشفرات البرمجية التي يوفرها لك حساب Google AdSense في الفراغات التالية. يقوم النظام بحقنها تلقائياً داخل الحاويات الإعلانية المعزولة بالصفحة لضمان بقاء هوامش الأمان الفاصلة (44px+) وتجنب النقرات غير المقصودة.
                </p>
              </div>
            </div>

            {/* Header banner */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-100 flex items-center gap-1">
                <span>1. كود البنر العلوي الرئيسي (728x90 Billboard):</span>
                <span className="text-slate-400 font-normal">(يعرض في أعلى كل صفحات موقع كووورة)</span>
              </label>
              <textarea
                value={config.headerAdCode}
                onChange={(e) => handleFieldChange('headerAdCode', e.target.value)}
                rows={4}
                dir="ltr"
                className="w-full text-xs font-mono p-3 bg-black text-emerald-400 rounded-xl border border-[#1e2230] focus:outline-none focus:ring-1 focus:ring-primary h-28"
                placeholder="<!-- Paste Google AdSense script here -->"
              />
            </div>

            {/* Sidebar banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-100 flex items-center gap-1">
                  <span>2. بنر العمود الجانبي (300x250 / 300x600):</span>
                </label>
                <textarea
                  value={config.sidebarAdCode}
                  onChange={(e) => handleFieldChange('sidebarAdCode', e.target.value)}
                  rows={4}
                  dir="ltr"
                  className="w-full text-xs font-mono p-3 bg-black text-emerald-400 rounded-xl border border-[#1e2230] focus:outline-none focus:ring-1 focus:ring-primary h-28"
                  placeholder="<!-- Paste Sidebar Ad Script here -->"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-100 flex items-center gap-1">
                  <span>3. بنر وسط جدول مباريات اليوم (Feed Ad):</span>
                </label>
                <textarea
                  value={config.midFeedAdCode}
                  onChange={(e) => handleFieldChange('midFeedAdCode', e.target.value)}
                  rows={4}
                  dir="ltr"
                  className="w-full text-xs font-mono p-3 bg-black text-emerald-400 rounded-xl border border-[#1e2230] focus:outline-none focus:ring-1 focus:ring-primary h-28"
                  placeholder="<!-- Paste In-Feed Ad code here -->"
                />
              </div>
            </div>

            {/* Sticky footer banner */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-100 flex items-center gap-1">
                <span>4. كود إعلان الشريط اللاصق السفلي (Sticky / Anchor Footer Ad):</span>
              </label>
              <textarea
                value={config.stickyFooterAdCode}
                onChange={(e) => handleFieldChange('stickyFooterAdCode', e.target.value)}
                rows={3}
                dir="ltr"
                className="w-full text-xs font-mono p-3 bg-black text-emerald-400 rounded-xl border border-[#1e2230] focus:outline-none focus:ring-1 focus:ring-primary h-24"
                placeholder="<!-- Paste Sticky Footer Ad Script / custom HTML here -->"
              />
            </div>
          </div>
        )}

        {activeTab === 'popunders' && (
          <div className="space-y-4">
            <div className="bg-[#1c1206]/60 border border-[#482e0e] p-3.5 rounded-xl text-slate-300 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <p className="font-bold text-amber-400">تجهيز شفرات الإعلانات المنبثقة (Popunders)</p>
                <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                  تتميز شبكات <strong>Adsterra</strong> و <strong>Clickadilla</strong> بعوائدها المادية المرتفعة لمواقع البث الرياضية من خلال الإعلانات الخلفية غير المزعجة التي تفتح فور نقر المستخدم في أي مكان بالصفحة. الصق شفرات الـ script التي يمنحها لك معلنك هنا وسيسري مفعولها مباشرة.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-100 flex items-center gap-1">
                <span>شفرة جافاسكريبت للـ Popunder النشط (Adsterra / Clickadilla script):</span>
              </label>
              <textarea
                value={config.popunderAdCode}
                onChange={(e) => handleFieldChange('popunderAdCode', e.target.value)}
                rows={6}
                dir="ltr"
                className="w-full text-xs font-mono p-3 bg-black text-yellow-400 rounded-xl border border-[#1e2230] focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="<!-- Paste Popunder / On-Click ad scripts here -->"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                ملاحظة: الشفرات الملصقة ستحقن بأمان في نهاية وسم &lt;body&gt; وتتفاعل مع نقرات الزوار لفتح الإعلان خلف صفحة البث.
              </span>
            </div>

            <div className="bg-[#07080b] border border-[#1e2230] p-4 rounded-xl flex items-center justify-between">
              <span className="font-bold text-slate-100">
                وضع المحاكاة التجريبي (تفعيل بنرات إرشادية بدلاً من شفرات فارغة):
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isDemoMode}
                  onChange={(e) => handleFieldChange('isDemoMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1a1d29] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#07080b] after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div className="space-y-4 text-xs font-sans text-right leading-relaxed text-slate-300">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 border-b border-[#1e2230] pb-2.5">
              <HelpCircle className="w-4 h-4 text-primary animate-pulse" />
              كيفية الربط الفعلي بحسابك وتحقيق العوائد المادية:
            </h3>

            <div className="space-y-3">
              <p>
                <strong>الخطوة الأولى (Google AdSense):</strong> سجل دخولك في أدسينس، انتقل إلى "الإعلانات حسب الوحدة الإعلانية" وأنشئ إعلاناً صورياً متجاوباً. انسخ الكود البرمجي والصقه في خانة <strong>البنر العلوي</strong> أو <strong>بنر العمود الجانبي</strong> أعلاه.
              </p>
              <p>
                <strong>الخطوة الثانية (Adsterra Ads):</strong> في لوحة ناشري Adsterra، أضف دومين موقع البث الخاص بك، واختر وحدة <strong>Popunder (Onclick)</strong> لتوليد الشفرة البرمجية. الصق الكود في قسم Popunder Drawers داخل هذه اللوحة لتبدأ الأرباح بالظهور حية.
              </p>
              <p>
                <strong>الخطوة الثالثة (حل مشاكل حظر الإعلانات AdBlock):</strong> يوفر معلنو البوب اندر شفرات مضادة لحظر الإعلانات (Anti-Adblock Code)، يمكنك لصقها مباشرة في مربع النص وستدمج تلقائياً دون الحاجة لتغيير كود ملفات المشروع والصفحات البرمجية.
              </p>
            </div>
          </div>
        )}

        {/* Form buttons */}
        <div className="flex gap-2.5 justify-end pt-4 border-t border-[#1e2230]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#07080b] text-slate-300 border border-[#1e2230] hover:bg-slate-900 font-bold rounded-xl transition cursor-pointer"
          >
            إلغاء التعديل
          </button>
          
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-[#00e056] text-black font-extrabold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            حفظ وتفعيل الشفرات الحالية
          </button>
        </div>

      </form>
    </div>
  );
}
