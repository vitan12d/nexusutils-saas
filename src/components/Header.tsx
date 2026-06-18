/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Menu, ChevronDown, Bell, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeMainTab: string;
  setActiveMainTab: (tab: string) => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  isAdmin: boolean;
  adminEmail: string | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  apiSeason?: string;
  setApiSeason?: (season: string) => void;
}

export default function Header({ 
  activeMainTab, 
  setActiveMainTab, 
  activeSubTab, 
  setActiveSubTab, 
  isAdmin, 
  adminEmail, 
  onLogout, 
  onOpenLogin,
  apiSeason = '2026',
  setApiSeason
}: HeaderProps) {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [language]);

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [logoClicks, setLogoClicks] = useState(0);

  const handleBrandClick = () => {
    const nextClicks = logoClicks + 1;
    if (nextClicks >= 5) {
      setLogoClicks(0);
      onOpenLogin();
    } else {
      setLogoClicks(nextClicks);
      // Auto-reset after 3 seconds
      const timer = setTimeout(() => setLogoClicks(0), 3000);
      return () => clearTimeout(timer);
    }
  };

  const topCategories = [
    { id: 'home', l: t('nav.home') },
    { id: 'news', l: t('nav.news') },
    { id: 'sports', l: t('nav.sports') },
    { id: 'entertainment', l: t('nav.entertainment') },
    { id: 'video', l: t('nav.video') },
    ...(isAdmin ? [{ id: 'manager', l: language === 'ar' ? 'لوحة التحكم ⚙️' : 'Manager Panel ⚙️' }] : [])
  ];

  const sportsTabs = [
    { id: 'news', label: t('tab.news') },
    { id: 'fixtures', label: t('tab.fixtures') },
    { id: 'standings', label: t('tab.standings') },
    { id: 'scorers', label: t('tab.scorers') },
    { id: 'bracket', label: t('tab.bracket') },
    { id: 'fanzone', label: t('tab.fanzone') },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs" id="msn-sports-header">
      {/* 1. Top MSN Bar */}
      <div className="w-full bg-[#004b91] text-white text-xs py-2 px-4 border-b border-[#003d75]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Right Side: brand */}
          <div 
            onClick={handleBrandClick}
            onDoubleClick={onOpenLogin}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-sm font-black tracking-normal text-white">{t('app.brand')}</span>
            {isAdmin && (
              <span className="bg-amber-500 text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-xs animate-pulse">
                {language === 'ar' ? 'وضع المدير نشط' : 'MANAGER ACTIVE'}
              </span>
            )}
          </div>

          {/* Center: Search input */}
          <div className="hidden md:flex items-center w-full max-w-sm lg:max-w-md mx-6">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder={t('app.search')} 
                className="w-full bg-white/15 pl-10 pr-4 py-1.5 border border-blue-400/30 rounded-full text-xs text-white placeholder-blue-200/75 focus:outline-hidden focus:ring-1 focus:ring-white focus:bg-white focus:text-slate-800 focus:placeholder-gray-400 shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-blue-200 absolute left-3.5 top-2.5" />
            </div>
          </div>

          {/* Left Side: Language, Time, Sign In */}
          <div className="flex items-center gap-4">
            {/* Simulated Time */}
            <div className="hidden sm:inline-flex items-center text-[11px] text-blue-200 mr-2 font-mono" dir="ltr">
              {currentTime || "18:46"}
            </div>

            {/* Profile Sign-in or Logout */}
            {isAdmin ? (
              <div 
                onClick={onLogout}
                className="flex items-center gap-1.5 text-amber-200 font-bold cursor-pointer hover:text-white"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="hidden sm:inline text-[11px]" title={adminEmail || ''}>
                  {language === 'ar' ? 'خروج (حسني)' : 'Sign Out (Hasni)'}
                </span>
                <span className="sm:hidden text-[11px] font-black">×</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 2. Primary Portal Nav Categories */}
      <div className="w-full bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          {/* Main Topics */}
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar scroll-smooth">
            <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-5 h-5" />
            </button>
            {topCategories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => {
                  setActiveMainTab(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-[13px] font-bold whitespace-nowrap py-1 px-1.5 relative transition-colors cursor-pointer ${
                  activeMainTab === cat.id ? 'text-blue-700 font-black' : 'text-gray-700 hover:text-blue-700'
                }`}
              >
                {cat.l}
                {activeMainTab === cat.id && (
                  <motion.div 
                    layoutId="top-nav-indicator" 
                    className="absolute bottom-[-14px] left-0 right-0 h-1 bg-blue-700 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Left accessories: notifications & language */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => setActiveMainTab('manager')}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-slate-900 rounded-xs hover:bg-amber-600 text-xs font-black cursor-pointer"
              >
                <span>⚙️ {language === 'ar' ? 'التحكم' : 'Console'}</span>
              </button>
            )}
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            
            {/* Fully Interactive Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-sm cursor-pointer transition-colors select-none"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">{t('app.langName')}</span>
                <ChevronDown className="w-3 h-3 text-gray-400 transition-transform duration-200" style={{ transform: langDropdownOpen ? 'rotate(180deg)' : 'none' }} />
              </div>
              
              {langDropdownOpen && (
                <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-1.5 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-[100] animate-fade-in`}>
                  <button 
                    onClick={() => {
                      setLanguage('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-right px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${language === 'ar' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span>العربية (AR)</span>
                    {language === 'ar' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                  </button>
                  <button 
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    dir="ltr"
                  >
                    <span>English (EN)</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sports Sub-Header & Special Tournament Branding Line (Only show for sports tab!) */}
      {activeMainTab === 'sports' && (
        <>
          <div className="w-full bg-[#011e41] text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#dc2626] text-white text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-xs">{t('app.exclusive')}</span>
                    <span className="text-blue-200/80 text-xs font-semibold">{t('app.portal')}</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-1">
                    {t('app.subbrand')} <span className="text-blue-400 font-black">FIFA 2026</span>
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-[#042d5e]/80 p-1 rounded-lg border border-[#0d4485] self-start md:self-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => setApiSeason && setApiSeason('2026')}
                  className={`px-3 py-1.5 rounded-md text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                    apiSeason === '2026'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{language === 'ar' ? 'كأس العالم 2026 (مباشر)' : 'World Cup 2026 (Live!)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setApiSeason && setApiSeason('2022')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer select-none ${
                    apiSeason === '2022'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{language === 'ar' ? 'مونديال قطر 2022' : 'World Cup 2022'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* 4. Sub-Navigation Tabs */}
          <div className="w-full bg-[#011e41] border-b border-[#0d4485] overflow-x-auto no-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto px-4 flex items-center h-11">
              <div className="flex items-center gap-1 h-full w-full">
                {sportsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`h-full text-xs md:text-sm font-bold px-3.5 md:px-5 border-b-2 transition-all duration-200 flex items-center justify-center whitespace-nowrap cursor-pointer ${
                      activeSubTab === tab.id
                        ? 'border-blue-400 text-blue-400 font-black bg-[#042d5e]/50'
                        : 'border-transparent text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-72 bg-white h-full p-5 flex flex-col gap-4 shadow-xl text-right animate-slide-left" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="font-extrabold text-[#111827]">{t('app.sections')}</span>
              <button className="text-gray-500 font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>×</button>
            </div>
            {topCategories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => {
                  setActiveMainTab(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right py-2 px-3 font-semibold text-sm rounded-lg transition-colors cursor-pointer ${
                  activeMainTab === cat.id ? 'bg-blue-50 text-blue-600 font-black' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
