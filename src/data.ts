/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, NewsItem, AdsConfig } from './types';

// Helper to get formatted date stringrelative to today
export function getRelativeDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// Sample Teams Logos using stable public SVG icons or beautiful abstract patterns
export const LEAGUE_LOGOS = {
  laliga: '🇪🇸',
  premier: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  champions: '🇪🇺',
  saudi: '🇸🇦',
  egypt: '🇪🇬',
};

export const MOCK_MATCHES = (): Match[] => [
  // --- TODAY MATCHES ---
  {
    id: 'm1',
    competition: 'دوري أبطال أوروبا - نصف النهائي',
    homeTeam: 'ريال مدريد',
    homeLogo: '⚪',
    awayTeam: 'مانشستر سيتي',
    awayLogo: '🩵',
    status: 'live',
    time: '22:00',
    date: getRelativeDate(0),
    score: { home: 2, away: 1 },
    currentMinute: 72,
    channel: 'beIN Sports HD 1',
    commentator: 'حفيظ دراجي',
    streamServers: [
      { name: 'سيرفر المباشر الرئيسي (Full HD)', url: 'https://sample.vodny.tv/live/premium/index.m3u8', quality: '1080p' },
      { name: 'سيرفر متعدد الجودات (بث سريع)', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '720p / 480p' },
      { name: 'بث يوتيوب احتياطي', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', quality: 'SD' },
    ],
  },
  {
    id: 'm2',
    competition: 'الدوري السعودي للمحترفين - الجولة 28',
    homeTeam: 'الهلال',
    homeLogo: '💙',
    awayTeam: 'النصر',
    awayLogo: '💛',
    status: 'live',
    time: '21:00',
    date: getRelativeDate(0),
    score: { home: 3, away: 2 },
    currentMinute: 88,
    channel: 'SSC1 HD',
    commentator: 'فهد العتيبي',
    streamServers: [
      { name: 'سيرفر SSC المباشر 1', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '1080p' },
      { name: 'سيرفر الجوال الضعيف', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '360p' },
    ],
  },
  {
    id: 'm3',
    competition: 'الدوري المصري الممتاز',
    homeTeam: 'الأهلي',
    homeLogo: '❤️',
    awayTeam: 'الزمالك',
    awayLogo: '⚪',
    status: 'upcoming',
    time: '20:30',
    date: getRelativeDate(0),
    channel: 'OnTime Sports 1 HD',
    commentator: 'مدحت شلبي',
    streamServers: [
      { name: 'البث الرئيسي ON TIME', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '720p' },
    ],
  },
  {
    id: 'm4',
    competition: 'الدوري الإنجليزي الممتاز - الجولة 35',
    homeTeam: 'ليفربول',
    homeLogo: '🔴',
    awayTeam: 'أرسنال',
    awayLogo: '⚪',
    status: 'upcoming',
    time: '23:30',
    date: getRelativeDate(0),
    channel: 'beIN Sports Premium 1',
    commentator: 'خليل البلوشي',
    streamServers: [
      { name: 'سيرفر أولاد ليفربول VIP', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '1080p' },
    ],
  },

  // --- YESTERDAY MATCHES ---
  {
    id: 'm5',
    competition: 'الدوري الإسباني - الجولة 34',
    homeTeam: 'برشلونة',
    homeLogo: '🔵🔴',
    awayTeam: 'أتلتيكو مدريد',
    awayLogo: '🔴⚪',
    status: 'finished',
    time: '19:00',
    date: getRelativeDate(-1),
    score: { home: 3, away: 0 },
    channel: 'beIN Sports HD 3',
    commentator: 'عصام الشوالي',
    streamServers: [],
  },
  {
    id: 'm6',
    competition: 'دوري أبطال أوروبا - نصف النهائي',
    homeTeam: 'بايرن ميونخ',
    homeLogo: '🔴',
    awayTeam: 'باريس سان جيرمان',
    awayLogo: '🔵',
    status: 'finished',
    time: '22:00',
    date: getRelativeDate(-1),
    score: { home: 1, away: 1 },
    channel: 'beIN Sports HD 1',
    commentator: 'حسن العيدروس',
    streamServers: [],
  },

  // --- TOMORROW MATCHES ---
  {
    id: 'm7',
    competition: 'الدوري الإنجليزي الممتاز - الجولة 35',
    homeTeam: 'تشيلسي',
    homeLogo: '🔵',
    awayTeam: 'مانشستر يونايتد',
    awayLogo: '🔴',
    status: 'upcoming',
    time: '18:00',
    date: getRelativeDate(1),
    channel: 'beIN Sports HD 2',
    commentator: 'رؤوف خليف',
    streamServers: [
      { name: 'جودة فائقة', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '1080p' },
    ],
  },
  {
    id: 'm8',
    competition: 'الدوري الفرنسي - الجولة 32',
    homeTeam: 'موناكو',
    homeLogo: '⚪🔴',
    awayTeam: 'مارسيليا',
    awayLogo: '⚪🔵',
    status: 'upcoming',
    time: '21:00',
    date: getRelativeDate(1),
    channel: 'beIN Sports HD 4',
    commentator: 'جواد بدة',
    streamServers: [],
  },
];

export const MOCK_NEWS = (): NewsItem[] => [
  {
    id: 'n1',
    title: 'أنشيلوتي يثق في تجاوز عقبة مانشستر سيتي بملعب الاتحاد في إياب دوري الأبطال',
    summary: 'أكد الإيطالي كارلو أنشيلوتي، المدير الفني لريال مدريد، أن فريقه جاهز تماماً لملاقاة مانشستر سيتي، مشيراً إلى أن دوري الأبطال هو بطولة ريال مدريد المفضلة.',
    image: '🏆',
    date: getRelativeDate(0),
    category: 'دوري أبطال أوروبا',
    views: 18450,
  },
  {
    id: 'n2',
    title: 'محمد صلاح يواصل كتابة التاريخ ويسجل الهاتريك رقم 10 في الدوري الإنجليزي الممتاز',
    summary: 'برقم قياسي غير مسبوق، تمكن النجم المصري محمد صلاح من حسم لقاء ليفربول الأخير بتسجيله ثلاثة أهداف مذهلة هزت مدرجات ملعب الأنفيلد.',
    image: '👑',
    date: getRelativeDate(0),
    category: 'الدوري الإنجليزي',
    views: 31200,
  },
  {
    id: 'n3',
    title: 'نجم الهلال السعودي يؤكد: كلاسيكو النصر دائماً يتطلب تركيزاً استثنائياً للفوز باللقب',
    summary: 'أفصح قائد نادي الهلال في تصريح حصري لكووورة لايف أن الاستعدادات لمواجهة النصر تسير على أفضل وجه لتأمين الثلاث نقاط وحسم درع الدوري السعودي.',
    image: '🇸🇦',
    date: getRelativeDate(-1),
    category: 'الدوري السعودي',
    views: 22800,
  },
  {
    id: 'n4',
    title: 'برشلونة يسعى للتعاقد مع موهبة شابة جديدة من البرازيل في ميركاتو الصيف الحالي',
    summary: 'أفادت تقارير إعلامية مقربة من إدارة البلوجرانا بأن المدير الرياضي وضع عينه على الجوهرة البرازيلية الصاعدة لتدعيم خط الهجوم في الموسم القادم.',
    image: '⚽',
    date: getRelativeDate(-1),
    category: 'الدوري الإسباني',
    views: 14700,
  },
];

export const DEFAULT_ADS_CONFIG: AdsConfig = {
  headerAdCode: `<!-- بنر علوي مجهز لأدسينس - مقاس 728x90 -->
<div class="w-full bg-amber-50 rounded border border-amber-200 text-amber-800 text-xs font-mono p-4 flex flex-col items-center justify-center gap-2">
  <div class="font-bold flex items-center gap-1">📣 مساحة إعلانية - بنر علوي (Google AdSense 728x90)</div>
  <p class="text-gray-500 font-sans text-center">يمكنك تبديل هذا الرمز ليعرض إعلانات Google AdSense مباشرة بوضع شفرة إعلانك في لوحة التحكم الإعلانية</p>
  <div class="px-2 py-1 bg-yellow-200 text-yellow-900 rounded font-sans font-bold select-none text-[10px]">إعلان تجريبي نشط</div>
</div>`,
  sidebarAdCode: `<!-- بنر جانبي مجهز لأدسينس - مقاس 300x250 -->
<div class="w-full h-64 bg-slate-50 rounded border border-slate-200 text-blue-900 text-xs font-mono p-4 flex flex-col items-center justify-center gap-2">
  <div class="font-bold flex items-center gap-1">📣 مساحة إعلانية جانبية (300x250)</div>
  <p class="text-gray-500 font-sans text-center text-[11px]">مكان ممتاز لوضع شفرة Adsterra أو Google AdSense</p>
  <div class="px-2 py-1 bg-yellow-200 text-yellow-900 rounded font-sans font-bold select-none text-[10px]">إعلان تجريبي</div>
</div>`,
  midFeedAdCode: `<!-- إعلان في منتصف التغذية الإخبارية -->
<div class="w-full bg-emerald-50 rounded border border-emerald-200 text-emerald-900 text-xs font-mono p-4 flex flex-col items-center justify-center gap-2">
  <div class="font-bold">📣 إعلان ممول في جدول اليوم</div>
  <p class="text-gray-600 font-sans text-center">أضف كود إعلانك لكي يظهر للمستخدمين بين جداول البث المباشر</p>
</div>`,
  popunderAdCode: `<!-- شفرة الإعلانات المنبثقة Popunder (Adsterra, Clickadilla) -->
<script>
  console.log("Nexus Korra Popunder System: Ready! Add your Adsterra script in the configuration drawer.");
</script>`,
  stickyFooterAdCode: `<!-- إعلان سفلي لاصق -->
<div class="w-full bg-rose-50 rounded border-t border-rose-200 text-rose-900 text-xs font-mono py-2 px-4 flex items-center justify-between">
  <span class="font-bold">📣 إعلان سفلي لاصق (Anchor Ad)</span>
  <span class="text-gray-500 font-sans">هذا الشريط يظهر مثبت في أسفل الموقع ويمكن تغييره بشفرة AdSense أو Adsterra</span>
</div>`,
  isDemoMode: true,
};
