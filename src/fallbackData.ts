/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, GroupData, PlayerStats, Article } from './types';

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 'art1',
    title: 'مواجهات حاسمة في المونديال: المنتخبات العربية تستعد لكتابة التاريخ من جديد',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    category: 'أخبار المونديال',
    publisherName: 'الجزيرة رياضة',
    publisherLogoColor: 'bg-amber-600',
    elapsed: 'منذ ساعة',
    commentsCount: 24,
    likesCount: 145,
    viewsCount: 1200,
    contentSummary: 'تترقب الجماهير العربية بشغف كبير انطلاق الجولات الحاسمة لمنتخباتنا الوطنية وسط آمال عريضة بتكرار الإنجازات الأسطورية السابقة.'
  },
  {
    id: 'art2',
    title: 'تكتيك المونديال: كيف يخطط وليد الركراكي للسيطرة على خط وسط الخصوم؟',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    category: 'تحليل تكتيكي',
    publisherName: 'الناقد الرياضي',
    publisherLogoColor: 'bg-emerald-600',
    elapsed: 'منذ ساعتين',
    commentsCount: 18,
    likesCount: 92,
    viewsCount: 850,
    contentSummary: 'في محاضرة فنية مفصلة، كشف الطاقم التدريبي عن مخططات إغلاق المساحات والضغط العالي لقطع خطوط التمرير.'
  }
];

export const GROUPS_2022: GroupData[] = [
  {
    name: 'المجموعة الأولى (Group A)',
    teams: [
      { teamName: 'هولندا', teamFlag: '🇳🇱', played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, points: 7 },
      { teamName: 'السنغال', teamFlag: '🇸🇳', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 4, points: 6 },
      { teamName: 'الإكوادور', teamFlag: '🇪🇨', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, points: 4 },
      { teamName: 'قطر', teamFlag: '🇶🇦', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 7, points: 0 }
    ]
  },
  {
    name: 'المجموعة الثانية (Group B)',
    teams: [
      { teamName: 'إنجلترا', teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 3, won: 2, drawn: 1, lost: 0, gf: 9, ga: 2, points: 7 },
      { teamName: 'أمريكا', teamFlag: '🇺🇸', played: 3, won: 1, drawn: 2, lost: 0, gf: 2, ga: 1, points: 5 },
      { teamName: 'إيران', teamFlag: '🇮🇷', played: 3, won: 1, drawn: 0, lost: 2, gf: 4, ga: 7, points: 3 },
      { teamName: 'ويلز', teamFlag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 6, points: 1 }
    ]
  },
  {
    name: 'المجموعة الثالثة (Group C)',
    teams: [
      { teamName: 'الأرجنتين', teamFlag: '🇦🇷', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 2, points: 6 },
      { teamName: 'بولندا', teamFlag: '🇵🇱', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, points: 4 },
      { teamName: 'المكسيك', teamFlag: '🇲🇽', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 3, points: 4 },
      { teamName: 'السعودية', teamFlag: '🇸🇦', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, points: 3 }
    ]
  },
  {
    name: 'المجموعة الرابعة (Group D)',
    teams: [
      { teamName: 'فرنسا', teamFlag: '🇫🇷', played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 3, points: 6 },
      { teamName: 'أستراليا', teamFlag: '🇦🇺', played: 3, won: 2, drawn: 0, lost: 1, gf: 3, ga: 4, points: 6 },
      { teamName: 'تونس', teamFlag: '🇹🇳', played: 3, won: 1, drawn: 1, lost: 1, gf: 1, ga: 1, points: 4 },
      { teamName: 'الدنمارك', teamFlag: '🇩🇰', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 3, points: 1 }
    ]
  },
  {
    name: 'المجموعة السادسة (Group F)',
    teams: [
      { teamName: 'المغرب', teamFlag: '🇲🇦', played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, points: 7 },
      { teamName: 'كرواتيا', teamFlag: '🇭🇷', played: 3, won: 1, drawn: 2, lost: 0, gf: 4, ga: 1, points: 5 },
      { teamName: 'بلجيكا', teamFlag: '🇧🇪', played: 3, won: 1, drawn: 1, lost: 1, gf: 1, ga: 2, points: 4 },
      { teamName: 'كندا', teamFlag: '🇨🇦', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 7, points: 0 }
    ]
  }
];

export const GROUPS_2026: GroupData[] = [
  {
    name: 'المجموعة الأولى (Group A)',
    teams: [
      { teamName: 'المغرب', teamFlag: '🇲🇦', played: 2, won: 2, drawn: 0, lost: 0, gf: 4, ga: 1, points: 6 },
      { teamName: 'إسبانيا', teamFlag: '🇪🇸', played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, points: 4 },
      { teamName: 'كندا', teamFlag: '🇨🇦', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 },
      { teamName: 'الإكوادور', teamFlag: '🇪🇨', played: 2, won: 0, drawn: 0, lost: 2, gf: 1, ga: 5, points: 0 }
    ]
  },
  {
    name: 'المجموعة الثانية (Group B)',
    teams: [
      { teamName: 'السعودية', teamFlag: '🇸🇦', played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, points: 4 },
      { teamName: 'ألمانيا', teamFlag: '🇩🇪', played: 2, won: 1, drawn: 1, lost: 0, gf: 2, ga: 1, points: 4 },
      { teamName: 'اليابان', teamFlag: '🇯🇵', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, points: 1 },
      { teamName: 'نيجيريا', teamFlag: '🇳🇬', played: 2, won: 0, drawn: 1, lost: 1, gf: 0, ga: 2, points: 1 }
    ]
  },
  {
    name: 'المجموعة الثالثة (Group C)',
    teams: [
      { teamName: 'مصر', teamFlag: '🇪🇬', played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 2, points: 4 },
      { teamName: 'البرازيل', teamFlag: '🇧🇷', played: 2, won: 1, drawn: 0, lost: 1, gf: 4, ga: 2, points: 3 },
      { teamName: 'إنجلترا', teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 3, points: 3 },
      { teamName: 'أستراليا', teamFlag: '🇦🇺', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, points: 1 }
    ]
  }
];

export const TOP_SCORERS_2022: PlayerStats[] = [
  { rank: 1, name: 'كيليان مبابي', team: 'فرنسا', teamFlag: '🇫🇷', goals: 8, assists: 2, matchesPlayed: 7, shotsOnTargetPercent: 58 },
  { rank: 2, name: 'ليونيل ميسي', team: 'الأرجنتين', teamFlag: '🇦🇷', goals: 7, assists: 3, matchesPlayed: 7, shotsOnTargetPercent: 62 },
  { rank: 3, name: 'أوليفيه جيرو', team: 'فرنسا', teamFlag: '🇫🇷', goals: 4, assists: 0, matchesPlayed: 6, shotsOnTargetPercent: 50 },
  { rank: 4, name: 'جوليان ألفاريز', team: 'الأرجنتين', teamFlag: '🇦🇷', goals: 4, assists: 0, matchesPlayed: 7, shotsOnTargetPercent: 55 },
  { rank: 5, name: 'يوسف النصيري', team: 'المغرب', teamFlag: '🇲🇦', goals: 3, assists: 0, matchesPlayed: 7, shotsOnTargetPercent: 48 }
];

export const TOP_SCORERS_2026: PlayerStats[] = [
  { rank: 1, name: 'سالم الدوسري', team: 'السعودية', teamFlag: '🇸🇦', goals: 3, assists: 1, matchesPlayed: 2, shotsOnTargetPercent: 75 },
  { rank: 2, name: 'يوسف النصيري', team: 'المغرب', teamFlag: '🇲🇦', goals: 3, assists: 0, matchesPlayed: 2, shotsOnTargetPercent: 66 },
  { rank: 3, name: 'كيليان مبابي', team: 'فرنسا', teamFlag: '🇫🇷', goals: 2, assists: 1, matchesPlayed: 2, shotsOnTargetPercent: 59 },
  { rank: 4, name: 'محمد صلاح', team: 'مصر', teamFlag: '🇪🇬', goals: 2, assists: 1, matchesPlayed: 2, shotsOnTargetPercent: 70 },
  { rank: 5, name: 'ليونيل ميسي', team: 'الأرجنتين', teamFlag: '🇦🇷', goals: 2, assists: 0, matchesPlayed: 2, shotsOnTargetPercent: 60 }
];

export function get2022Matches(isEn: boolean): Match[] {
  return [
    {
      id: 'm22-1',
      teamHome: isEn ? 'Morocco' : 'المغرب',
      teamAway: isEn ? 'Argentina' : 'الأرجنتين',
      teamHomeFlag: '🇲🇦',
      teamAwayFlag: '🇦🇷',
      scoreHome: 2,
      scoreAway: 1,
      time: isEn ? 'FT' : 'انتهت',
      date: '2022-11-22',
      status: 'finished',
      group: isEn ? 'Group Stage' : 'دور المجموعات',
      stadium: 'Lusail Iconic Stadium',
      possessionHome: 44,
      possessionAway: 56,
      shotsHome: 9,
      shotsAway: 12,
      events: [
        { minute: 10, player: 'Lionel Messi', type: 'goal', team: 'away' },
        { minute: 52, player: 'Soufiane Boufal', type: 'goal', team: 'home' },
        { minute: 68, player: 'Youssef En-Nesyri', type: 'goal', team: 'home' }
      ]
    },
    {
      id: 'm22-2',
      teamHome: isEn ? 'Saudi Arabia' : 'السعودية',
      teamAway: isEn ? 'Argentina' : 'الأرجنتين',
      teamHomeFlag: '🇸🇦',
      teamAwayFlag: '🇦🇷',
      scoreHome: 2,
      scoreAway: 1,
      time: isEn ? 'FT' : 'انتهت',
      date: '2022-11-22',
      status: 'finished',
      group: isEn ? 'Group Stage' : 'دور المجموعات',
      stadium: 'Lusail Stadium',
      possessionHome: 30,
      possessionAway: 70,
      shotsHome: 3,
      shotsAway: 15,
      events: [
        { minute: 10, player: 'Lionel Messi', type: 'goal', team: 'away' },
        { minute: 48, player: 'Saleh Al-Shehri', type: 'goal', team: 'home' },
        { minute: 53, player: 'Salem Al-Dawsari', type: 'goal', team: 'home' }
      ]
    },
    {
      id: 'm22-3',
      teamHome: isEn ? 'Tunisia' : 'تونس',
      teamAway: isEn ? 'France' : 'فرنسا',
      teamHomeFlag: '🇹🇳',
      teamAwayFlag: '🇫🇷',
      scoreHome: 1,
      scoreAway: 0,
      time: isEn ? 'FT' : 'انتهت',
      date: '2022-11-30',
      status: 'finished',
      group: isEn ? 'Group Stage' : 'دور المجموعات',
      stadium: 'Education City Stadium',
      possessionHome: 38,
      possessionAway: 62,
      shotsHome: 5,
      shotsAway: 10,
      events: [
        { minute: 58, player: 'Wahbi Khazri', type: 'goal', team: 'home' }
      ]
    }
  ];
}

export function get2026Matches(isEn: boolean): Match[] {
  return [
    {
      id: 'm26-1',
      teamHome: isEn ? 'Morocco' : 'المغرب',
      teamAway: isEn ? 'Argentina' : 'الأرجنتين',
      teamHomeFlag: '🇲🇦',
      teamAwayFlag: '🇦🇷',
      scoreHome: 2,
      scoreAway: 1,
      time: '65\'',
      date: '2026-06-17',
      status: 'live',
      group: isEn ? 'Group A' : 'المجموعة الأولى',
      stadium: 'MetLife Stadium, New York',
      liveMinute: 65,
      possessionHome: 48,
      possessionAway: 52,
      shotsHome: 8,
      shotsAway: 9,
      events: [
        { minute: 18, player: 'Youssef En-Nesyri', type: 'goal', team: 'home' },
        { minute: 42, player: 'Lionel Messi', type: 'goal', team: 'away' },
        { minute: 58, player: 'Hakim Ziyech', type: 'goal', team: 'home' }
      ]
    },
    {
      id: 'm26-2',
      teamHome: isEn ? 'Saudi Arabia' : 'السعودية',
      teamAway: isEn ? 'Germany' : 'ألمانيا',
      teamHomeFlag: '🇸🇦',
      teamAwayFlag: '🇩🇪',
      scoreHome: 1,
      scoreAway: 0,
      time: '28\'',
      date: '2026-06-17',
      status: 'live',
      group: isEn ? 'Group B' : 'المجموعة الثانية',
      stadium: 'SoFi Stadium, Los Angeles',
      liveMinute: 28,
      possessionHome: 41,
      possessionAway: 59,
      shotsHome: 4,
      shotsAway: 5,
      events: [
        { minute: 12, player: 'Salem Al-Dawsari', type: 'goal', team: 'home' }
      ]
    },
    {
      id: 'm26-3',
      teamHome: isEn ? 'Tunisia' : 'تونس',
      teamAway: isEn ? 'Brazil' : 'البرازيل',
      teamHomeFlag: '🇹🇳',
      teamAwayFlag: '🇧🇷',
      scoreHome: 0,
      scoreAway: 0,
      time: '20:30',
      date: '2026-06-17',
      status: 'upcoming',
      group: isEn ? 'Group B' : 'المجموعة الثانية',
      stadium: 'Hard Rock Stadium, Miami'
    }
  ];
}
