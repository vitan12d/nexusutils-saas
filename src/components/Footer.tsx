/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectPolicy?: (policyKey: string) => void;
}

export default function Footer({ onSelectPolicy }: FooterProps) {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const handleLinkClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    if (onSelectPolicy) {
      onSelectPolicy(key);
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-300 mt-12 py-8 px-4 text-gray-500 text-xs text-right" id="msn-corporate-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: nexus utils brand copyright */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <span className="text-blue-700 tracking-tight text-sm font-black">{t('footer.brand')}</span>
          </div>
          <p className="text-[10px] text-gray-400 font-bold">
            {t('footer.copyright')}
          </p>
        </div>

        {/* Center: Legal / Policy Links */}
        <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 font-bold">
          <a href="#privacy" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-blue-600 hover:underline transition-all">
            {isEn ? "Privacy & Cookies" : "الخصوصية وبيان كوكيز"}
          </a>
          <a href="#terms" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-blue-600 hover:underline transition-all">
            {isEn ? "Terms of Use" : "شروط الاستخدام والخدمة"}
          </a>
          <a href="#trademarks" onClick={(e) => handleLinkClick(e, 'trademarks')} className="hover:text-blue-600 hover:underline transition-all">
            {isEn ? "Trademarks" : "العلامات التجارية"}
          </a>
          <a href="#ads" onClick={(e) => handleLinkClick(e, 'ads')} className="hover:text-blue-600 hover:underline transition-all">
            {isEn ? "About our ads" : "عن إعلاناتنا الخاصة"}
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-blue-600 hover:underline transition-all">
            {isEn ? "Contact & Feedback" : "اتصل بنا وإرسال تعليقات"}
          </a>
          <a href="#help" onClick={(e) => handleLinkClick(e, 'help')} className="hover:text-blue-600 hover:underline transition-all flex items-center gap-1">
            <span>{isEn ? "Help & Support" : "مساعدة ودعم"}</span>
            <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>

        {/* Right Side: Language select mirror */}
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>{isEn ? "English - United States" : "العربية - مصر (تحضيرات المونديال)"}</span>
        </div>

      </div>
    </footer>
  );
}
