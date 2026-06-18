/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Advanced static Translation Dictionary for all interface text, team names, stadiums, tabs, categories, etc.
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Top bar & Header
    'app.brand': 'nexus live koora',
    'app.search': 'البحث في ويب وسياق المونديال...',
    'app.weather': 'القاهرة، ٢٨°م',
    'app.signin': 'تسجيل الدخول',
    'app.exclusive': 'حصري',
    'app.portal': 'بوابة nexus رياضة',
    'app.subbrand': 'كأس العالم',
    'app.liveupdate': 'التحديث المباشر:',
    'app.liveupdate.text': 'المجموعة أ، ب في منافسات نارية ومصيرية',
    'app.sections': 'أقسام nexus',
    'app.langName': 'مصر (العربية)',

    // Navigation Tabs
    'nav.home': 'الرئيسية',
    'nav.news': 'الأخبار',
    'nav.sports': 'الرياضة',
    'nav.entertainment': 'الترفيه',
    'nav.video': 'الفيديو',

    // Sports Sub Navigation
    'tab.news': 'الرئيسية والأخبار',
    'tab.fixtures': 'المباريات والجدول',
    'tab.standings': 'ترتيب المجموعات',
    'tab.scorers': 'الهدافون',
    'tab.bracket': 'شجرة التصفيات',
    'tab.fanzone': 'منطقة المشجعين',

    // Home / Hero Section & Interactive Toast
    'toast.title': 'شاشة الأهداف وهدير الجماهير!',
    'sidebar.alert': 'تنبيه حقيقي',
    'sidebar.title': 'محطة الأخبار المباشرة والمحاكي اللحظي',
    'sidebar.desc': 'انقر فوق أي من بطاقات المباريات المتحركة في الشريط العلوي لعرض الإحصائيات الفورية أو الضغط على زر "بث الأهداف المباشر" بالأقسام لمشاهدة ديناميكية كأس العالم في بث حي ومباشر!',
    'sidebar.point1': 'تأهيل الفرق يتكيف مع إحراز أهداف المحاكاة فورا!',
    'sidebar.point2': 'يمكن حفظ توقعات أدوار الإقصاء بشجرتك الخاصة.',
    'sidebar.brandfooter': 'بوابة كأس العالم nexus',

    // Match states
    'match.live': 'مباشر',
    'match.finished': 'انتهت',
    'match.upcoming': 'قادم',
    'match.vs': 'ضد',
    'match.minute': 'دق',
    'match.possession': 'الاستحواذ',
    'match.shots': 'التسديدات',
    'match.goalsScroll': 'بث الأهداف المباشر',
    'match.simulator': 'تحديث حركي لحظي',

    // Fixtures View
    'fixtures.title': 'جدول مواعيد جميع الأدوار واللقاءات',
    'fixtures.subtitle': 'ترتيب زمني للمواجهات بمختلف الملاعب الأمريكية',
    'fixtures.stadium': 'الملعب',

    // Standings Widget
    'standings.title': 'ترتيب المجموعات ونقاط المونديال',
    'standings.subtitle': 'ترتيب مستمر ومحدث فورا بعد كل تغيير بالأهداف والمباريات المباشرة',
    'standings.th.team': 'الفريق',
    'standings.th.played': 'لعب',
    'standings.th.won': 'فاز',
    'standings.th.drawn': 'تعادل',
    'standings.th.lost': 'خسر',
    'standings.th.gf': 'له',
    'standings.th.ga': 'عليه',
    'standings.th.diff': 'الفارق',
    'standings.th.points': 'نقاط',

    // Scorers Widget
    'scorers.title': 'ترتيب الهدافين والسباق الفضائي',
    'scorers.subtitle': 'إحصائيات الهدافين الأكثر حسماً في بطولة كأس العالم ٢٠٢٦',
    'scorers.th.rank': 'الترتيب',
    'scorers.th.player': 'اللاعب والمنتخب',
    'scorers.th.played': 'المباريات',
    'scorers.th.goals': 'شريط الأهداف',
    'scorers.th.assists': 'التمريرات الحاسمة',
    'scorers.th.accuracy': 'دقة التسديد (%)',
    'scorers.goalsCount': 'أهداف',
    'scorers.assistsCount': 'حاسم',

    // Bracket Page
    'bracket.title': 'شجرة التصفيات النهائية وتوقع المونديال',
    'bracket.subtitle': 'توقع المنتخب المتأهل عبر النقر المباشر وحفظ مسار التصفية',
    'bracket.intro': 'توقع الفائز من خلال الضغط على المنتخب المتأهل',
    'bracket.r16': 'دور الـ 16',
    'bracket.qf': 'ربع النهائي',
    'bracket.sf': 'نصف النهائي',
    'bracket.f': 'النهائي',
    'bracket.champion': 'البطل المنتظر',
    'bracket.save': 'حفظ التوقعات في جهازك',
    'bracket.saved': 'تم حفظ التوقعات بنجاح!',
    'bracket.reset': 'إعادة ضبط الشجرة',

    // Fan Zone & Polls
    'fanzone.title': 'منطقة تفاعل جماهير المونديال',
    'fanzone.subtitle': 'بث مباشر لآراء وتوقعات الجماهير مع نظام تصويت فوري',
    'fanzone.poll.title': 'شارك في استطلاع الرأي العام',
    'fanzone.poll.q': 'من تتوقع أن يقتنص لقب كأس العالم 2026 ويرفع الكأس الغالية؟',
    'fanzone.poll.btn': 'تصويت تفاعلي',
    'fanzone.poll.voted': 'تم تسجيل صوتك الكروي!',
    'fanzone.poll.votes': 'صوت',
    'fanzone.comments.title': 'تعليقات المشجعين وبث نبض الشارع',
    'fanzone.comments.desc': 'انضم إلى الحوار وسجل تعليقك بحرية مع آلاف الجماهير',
    'fanzone.form.name': 'اسم الشهرة الخاص بك',
    'fanzone.form.content': 'اكتب تعليقك بخصوص المونديال المتفجر هنا...',
    'fanzone.form.submit': 'إرسال التعليق للمدرجات',
    'fanzone.form.error': 'يرجى كتابة الاسم والتعليق أولاً!',

    // Footer
    'footer.brand': 'nexus utils',
    'footer.copyright': 'كل الحقوق محفوظة وبراءات النشر محفوظة nexus utils © ٢٠٢٦',

    // Teams Translation Mapping
    'المغرب': 'المغرب',
    'الأرجنتين': 'الأرجنتين',
    'بولندا': 'بولندا',
    'كندا': 'كندا',
    'مصر': 'مصر',
    'الأوروغواي': 'الأوروغواي',
    'كوريا الجنوبية': 'كوريا الجنوبية',
    'نيجيريا': 'نيجيريا',
    'ألمانيا': 'ألمانيا',
    'السعودية': 'السعودية',
    'سويسرا': 'سويسرا',
    'الكاميرون': 'الكاميرون',
    'فرنسا': 'فرنسا',
    'اليابان': 'اليابان',
    'أستراليا': 'أستراليا',
    'الإكوادور': 'الإكوادور',
    'البرازيل': 'البرازيل',
    'كرواتيا': 'كرواتيا',
    'تونس': 'تونس',
    'كوستاريكا': 'كوستاريكا',
    'بلجيكا': 'بلجيكا',
    'إسبانيا': 'إسبانيا',
    'الولايات المتحدة': 'الولايات المتحدة',
    'البرتغال': 'البرتغال',
    'الجزائر': 'الجزائر',
    'إنجلترا': 'إنجلترا',
    'السنغال': 'السنغال',
    'المغرب (ب)': 'المغرب (ب)',

    // Stadiums/Locations
    'ملعب ميتلايف، نيويورك': 'ملعب ميتلايف، نيويورك',
    'ملعب روز بول، لوس أنجلوس': 'ملعب روز بول، لوس أنجلوس',
    'ملعب هارد روك، ميامي': 'ملعب هارد روك، ميامي',
    'ملعب مرسيدس بنز، أتلانتا': 'ملعب مرسيدس بنز، أتلانتا',
    'ملعب إنفيسكو، دنفر': 'ملعب إنفيسكو، دنفر',
    'ملعب ستيت فارم، فينيكس': 'ملعب ستيت فارم، فينيكس',
    'ملعب ليفايس، سان فرانسيسكو': 'ملعب ليفايس، سان فرانسيسكو',
    'ملعب إن آر جي، هيوستن': 'ملعب إن آر جي، هيوستن',

    // Groups
    'المجموعة الأولى': 'المجموعة الأولى',
    'المجموعة الأولى (A)': 'المجموعة الأولى (A)',
    'المجموعة الثانية': 'المجموعة الثانية',
    'المجموعة الثانية (B)': 'المجموعة الثانية (B)',
    'المجموعة الثالثة': 'المجموعة الثالثة',
    'المجموعة الثالثة (C)': 'المجموعة الثالثة (C)',
    'المجموعة الرابعة': 'المجموعة الرابعة',
    'المجموعة الرابعة (D)': 'المجموعة الرابعة (D)',
    'المجموعة الخامسة': 'المجموعة الخامسة',
    'المجموعة الخامسة (E)': 'المجموعة الخامسة (E)',
    'المجموعة السادسة': 'المجموعة السادسة',
    'المجموعة السادسة (F)': 'المجموعة السادسة (F)',
    'المجموعة السابعة': 'المجموعة السابعة',
    'المجموعة الثامنة': 'المجموعة الثامنة',

    // News/Categories
    'أخبار كأس العالم': 'أخبار كأس العالم',
    'تحليلات رياضية': 'تحليلات رياضية',
    'أخبار السامبا': 'أخبار السامبا',
    'أرقام وإحصائيات': 'أرقام وإحصائيات',
    'تقارير خاصة': 'تقارير خاصة',
    'تغطية المشاهير': 'تغطية المشاهير',

    // elapsed translations
    'منذ ساعتين': 'منذ ساعتين',
    'منذ 3 ساعات': 'منذ 3 ساعات',
    'منذ 4 ساعات': 'منذ 4 ساعات',
    'منذ 5 ساعات': 'منذ 5 ساعات',
    'منذ يوم واحد': 'منذ يوم واحد',
    'منذ يومين': 'منذ يومين',
  },
  en: {
    // Top bar & Header
    'app.brand': 'nexus live koora',
    'app.search': 'Search web and World Cup context...',
    'app.weather': 'Cairo, 28°C',
    'app.signin': 'Sign In',
    'app.exclusive': 'Exclusive',
    'app.portal': 'nexus sports portal',
    'app.subbrand': 'FIFA World Cup',
    'app.liveupdate': 'Live Update:',
    'app.liveupdate.text': 'Groups A and B in intense & fate-deciding matches',
    'app.sections': 'nexus Directories',
    'app.langName': 'US (English)',

    // Navigation Tabs
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.sports': 'Sports',
    'nav.entertainment': 'Entertainment',
    'nav.video': 'Video',

    // Sports Sub Navigation
    'tab.news': 'Main & News',
    'tab.fixtures': 'Fixtures & Schedule',
    'tab.standings': 'Groups Standings',
    'tab.scorers': 'Top Scorers',
    'tab.bracket': 'Playoff Bracket',
    'tab.fanzone': 'Fan Zone',

    // Home / Hero Section & Interactive Toast
    'toast.title': 'Live Goals & Match Celebration!',
    'sidebar.alert': 'REAL ALERTS',
    'sidebar.title': 'Live News Terminal & Real-Time Simulator',
    'sidebar.desc': 'Click any active match card in the top bar to view immediate live stats, or click "Dynamic Live Match Updater" inside navigation to trigger real-time updates and live goals simulation!',
    'sidebar.point1': 'Team standings update automatically as goals are scored.',
    'sidebar.point2': 'Interact and save playoff projections in your local tree.',
    'sidebar.brandfooter': 'nexus World Cup Hub',

    // Match states
    'match.live': 'LIVE',
    'match.finished': 'FT',
    'match.upcoming': 'Upcoming',
    'match.vs': 'VS',
    'match.minute': 'min',
    'match.possession': 'Possession',
    'match.shots': 'Shots',
    'match.goalsScroll': 'Live Goals Event Stream',
    'match.simulator': 'Update Live Matches',

    // Fixtures View
    'fixtures.title': 'Full Match Fixtures & Timetable',
    'fixtures.subtitle': 'Chronological order of all matches across USA host stadiums',
    'fixtures.stadium': 'Stadium',

    // Standings Widget
    'standings.title': 'Groups Standings & WC Table',
    'standings.subtitle': 'Live calculation based on simulation goals scored dynamically',
    'standings.th.team': 'Team',
    'standings.th.played': 'P',
    'standings.th.won': 'W',
    'standings.th.drawn': 'D',
    'standings.th.lost': 'L',
    'standings.th.gf': 'GF',
    'standings.th.ga': 'GA',
    'standings.th.diff': 'GD',
    'standings.th.points': 'Pts',

    // Scorers Widget
    'scorers.title': 'Top Scorers & Golden Boot Standings',
    'scorers.subtitle': 'Statistics of the most clinical players of the FIFA World Cup 2026',
    'scorers.th.rank': 'Rank',
    'scorers.th.player': 'Player & Team',
    'scorers.th.played': 'Matches',
    'scorers.th.goals': 'Goals',
    'scorers.th.assists': 'Assists',
    'scorers.th.accuracy': 'Shot Accuracy',
    'scorers.goalsCount': 'goals',
    'scorers.assistsCount': 'assists',

    // Bracket Page
    'bracket.title': 'Playoff Bracket & World Cup Predictions',
    'bracket.subtitle': 'Map out the road to the final by clicking the winning teams directly',
    'bracket.intro': 'Click on a team to predict them as the winner in the bracket',
    'bracket.r16': 'Round of 16',
    'bracket.qf': 'Quarter-Finals',
    'bracket.sf': 'Semi-Finals',
    'bracket.f': 'Final',
    'bracket.champion': 'Predicted Champion',
    'bracket.save': 'Save predictions to device',
    'bracket.saved': 'Your predictions were saved successfully!',
    'bracket.reset': 'Reset Bracket',

    // Fan Zone & Polls
    'fanzone.title': 'World Cup Fan Interactive Zone',
    'fanzone.subtitle': 'Live comments stream & real-time polling with instant response',
    'fanzone.poll.title': 'Participate in World Cup Polls',
    'fanzone.poll.q': 'Who will claim the ultimate glory of lifting the 2026 FIFA World Cup?',
    'fanzone.poll.btn': 'Cast Interactive Vote',
    'fanzone.poll.voted': 'Your vote has been counted!',
    'fanzone.poll.votes': 'votes',
    'fanzone.comments.title': 'Fans Live Comments Stream',
    'fanzone.comments.desc': 'Join the live discussion and share comments alongside thousands of fans',
    'fanzone.form.name': 'Your Nickname',
    'fanzone.form.content': 'Type your comment about the tournament here...',
    'fanzone.form.submit': 'Broadcast Comment to Stadium',
    'fanzone.form.error': 'Please enter your name and comment first!',

    // Footer
    'footer.brand': 'nexus utils',
    'footer.copyright': 'All rights reserved & Patent copyright owned by nexus utils © 2026',

    // Teams Translation Mapping
    'المغرب': 'Morocco',
    'الأرجنتين': 'Argentina',
    'بولندا': 'Poland',
    'كندا': 'Canada',
    'مصر': 'Egypt',
    'الأوروغواي': 'Uruguay',
    'كوريا الجنوبية': 'South Korea',
    'نيجيريا': 'Nigeria',
    'ألمانيا': 'Germany',
    'السعودية': 'Saudi Arabia',
    'سويسرا': 'Switzerland',
    'الكاميرون': 'Cameroon',
    'فرنسا': 'France',
    'اليابان': 'Japan',
    'أستراليا': 'Australia',
    'الإكوادور': 'Ecuador',
    'البرازيل': 'Brazil',
    'كرواتيا': 'Croatia',
    'تونس': 'Tunisia',
    'كوستاريكا': 'Costa Rica',
    'بلجيكا': 'Belgium',
    'إسبانيا': 'Spain',
    'الولايات المتحدة': 'USA',
    'البرتغال': 'Portugal',
    'الجزائر': 'Algeria',
    'إنجلترا': 'England',
    'السنغال': 'Senegal',
    'المغرب (ب)': 'Morocco (B)',

    // Stadiums/Locations
    'ملعب ميتلايف، نيويورك': 'MetLife Stadium, New York',
    'ملعب روز بول، لوس أنجلوس': 'Rose Bowl, Los Angeles',
    'ملعب هارد روك، ميامي': 'Hard Rock Stadium, Miami',
    'ملعب مرسيدس بنز، أتلانتا': 'Mercedes-Benz Stadium, Atlanta',
    'ملعب إنفيسكو، دنفر': 'Invesco Field, Denver',
    'ملعب ستيت فارم، فينيكس': 'State Farm Stadium, Phoenix',
    'ملعب ليفايس، سان فرانسيسكو': 'Levi\'s Stadium, San Francisco',
    'ملعب إن آر جي، هيوستن': 'NRG Stadium, Houston',

    // Groups
    'المجموعة الأولى': 'Group A',
    'المجموعة الأولى (A)': 'Group A (A)',
    'المجموعة الثانية': 'Group B',
    'المجموعة الثانية (B)': 'Group B (B)',
    'المجموعة الثالثة': 'Group C',
    'المجموعة الثالثة (C)': 'Group C (C)',
    'المجموعة الرابعة': 'Group D',
    'المجموعة الرابعة (D)': 'Group D (D)',
    'المجموعة الخامسة': 'Group E',
    'المجموعة الخامسة (E)': 'Group E (E)',
    'المجموعة السادسة': 'Group F',
    'المجموعة السادسة (F)': 'Group F (F)',
    'المجموعة السابعة': 'Group G',
    'المجموعة الثامنة': 'Group H',

    // News/Categories
    'أخبار كأس العالم': 'World Cup News',
    'تحليلات رياضية': 'Tactical analysis',
    'أخبار السامبا': 'Samba News',
    'أرقام وإحصائيات': 'Stats & Numbers',
    'تقارير خاصة': 'Special reports',
    'تغطية المشاهير': 'Celebrity coverage',

    // elapsed translations
    'منذ ساعتين': '2 hours ago',
    'منذ 3 ساعات': '3 hours ago',
    'منذ 4 ساعات': '4 hours ago',
    'منذ 5 ساعات': '5 hours ago',
    'منذ يوم واحد': '1 day ago',
    'منذ يومين': '2 days ago',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to read from localStorage or default to Arabic
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nexus_lang');
    return (saved === 'en' ? 'en' : 'ar') as Language;
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nexus_lang', lang);
  };

  const t = (key: string): string => {
    if (!key) return '';
    return translations[language][key] || key;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isRtl }}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-sans' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
