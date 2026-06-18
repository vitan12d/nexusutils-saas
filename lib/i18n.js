// نظام ترجمة بسيط بلغتين (عربي/إنجليزي)
export const LOCALES = ['ar', 'en'];
export const DEFAULT_LOCALE = 'ar';

export const DICT = {
  ar: {
    dir: 'rtl',
    home: 'الرئيسية',
    live: 'مباشر',
    matches: 'المباريات',
    standings: 'الترتيب',
    news: 'أخبار',
    articles: 'مقالات',
    videos: 'فيديو',
    entertainment: 'منوعات',
    worldcup: 'كأس العالم 2026',
    liveNow: 'مباريات مباشرة الآن',
    todayMatches: 'مباريات اليوم',
    latestNews: 'أحدث الأخبار',
    latestArticles: 'أحدث المقالات',
    readMore: 'اقرأ المزيد',
    noLive: 'لا توجد مباريات مباشرة حالياً.',
    noMatches: 'لا توجد مباريات.',
    about: 'من نحن',
    contact: 'اتصل بنا',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    brand: 'العلامة التجارية',
    help: 'مساعدة ودعم',
    rights: 'جميع الحقوق محفوظة',
    dataBy: 'البيانات مقدمة عبر API-Football'
  },
  en: {
    dir: 'ltr',
    home: 'Home',
    live: 'Live',
    matches: 'Matches',
    standings: 'Standings',
    news: 'News',
    articles: 'Articles',
    videos: 'Videos',
    entertainment: 'Extra',
    worldcup: 'World Cup 2026',
    liveNow: 'Live Now',
    todayMatches: "Today's Matches",
    latestNews: 'Latest News',
    latestArticles: 'Latest Articles',
    readMore: 'Read more',
    noLive: 'No live matches right now.',
    noMatches: 'No matches.',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    brand: 'Brand',
    help: 'Help & Support',
    rights: 'All rights reserved',
    dataBy: 'Data provided by API-Football'
  }
};

export function t(locale, key) {
  const l = DICT[locale] ? locale : DEFAULT_LOCALE;
  return DICT[l][key] ?? key;
}
