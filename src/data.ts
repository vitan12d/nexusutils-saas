import { Match, NewsArticle, LeagueStandings } from './types';

// Real-world team logos (using clean transparent SVG logos or high-quality football shapes)
const LOGOS = {
  hilal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&h=80&fit=crop&q=80", // placeholder sports
  nassr: "https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=80&h=80&fit=crop&q=80",
  ittihad: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=80&h=80&fit=crop&q=80",
  ahli: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&h=80&fit=crop&q=80",
  madrid: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=80&h=80&fit=crop&q=80",
  barca: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&h=80&fit=crop&q=80",
  city: "https://images.unsplash.com/photo-1431324155629-1a6edd1d126c?w=80&h=80&fit=crop&q=80",
  liverpool: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=80&h=80&fit=crop&q=80",
  arsenal: "https://images.unsplash.com/photo-1542652694-40abf5264360?w=80&h=80&fit=crop&q=80",
  bayern: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=80&h=80&fit=crop&q=80",
};

export const INITIAL_MATCHES: Match[] = [
  // Live matches (Today is 2026-06-13)
  {
    id: 'm1',
    homeTeam: 'ريال مدريد',
    awayTeam: 'برشلونة',
    homeLogo: '🇪🇸',
    awayLogo: '🇪🇸',
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
    minute: 74,
    league: 'دوري أبطال أوروبا',
    date: '2026-06-13',
    time: '21:00',
    liveStreamUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    channel: 'beIN Sports HD 1',
    commentary: [
      'د 72: تسديدة قوية من ليفاندوفسكي تمر بجوار القائم الأيمن للحارس كورتوا.',
      'د 68: بطاقة صفراء للاعب داني كارفاخال بعد تدخل طائش في وسط الملعب.',
      'د 60: جووووووول! داني أولمو يقلص الفارق لبرشلونة بضربة رأس رشيقة.',
      'د 45: استراحة الشوط الأول مع تفوق هجومي لكتيبة ريال مدريد.',
      'د 35: جووووووول! فينيسيوس جونيور يحرز الهدف الثاني للملكي بعد تمريرة بينية ساحرة.',
      'د 12: جووووووول! مبابي يسجل هدف الافتتاح لريال مدريد بتسديدة لا تصد ولا ترد!'
    ]
  },
  {
    id: 'm2',
    homeTeam: 'الهلال',
    awayTeam: 'النصر',
    homeLogo: '🇸🇦',
    awayLogo: '🇸🇦',
    homeScore: 3,
    awayScore: 2,
    status: 'LIVE',
    minute: 88,
    league: 'الدوري السعودي للمحترفين',
    date: '2026-06-13',
    time: '20:30',
    liveStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    channel: 'SSC Sports 1 HD',
    commentary: [
      'د 86: رونالدو يستعد لتنفيذ ركلة حرة مباشرة خطيرة على حدود منطقة الجزاء.',
      'د 82: جووووووول! تاليسكا يسجل الهدف الثاني للنصر ويشعل الدقائق الأخيرة!',
      'د 70: تبديل هجومي للنصر بدخول ماني بدلاً من الخيبري لزيادة الكثافة الأمامية.',
      'د 54: جووووووول! ميتروفيتش يسجل هدفه الشخصي الثاني والثالث للهلال كالعادة!',
      'د 41: بطاقة صفراء للمدافع علي البليهي لإضاعة الوقت ومضايقة المنافس.',
      'د 28: جووووووول! ألكسندر ميتروفيتش يعيد التقدم للزعيم برأسية قوية.'
    ]
  },
  {
    id: 'm3',
    homeTeam: 'مانشستر سيتي',
    awayTeam: 'ليفربول',
    homeLogo: '🇬🇧',
    awayLogo: '🇬🇧',
    homeScore: 0,
    awayScore: 0,
    status: 'LIVE',
    minute: 15,
    league: 'الدوري الإنجليزي الممتاز',
    date: '2026-06-13',
    time: '19:00',
    liveStreamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    channel: 'beIN Sports HD 2',
    commentary: [
      'د 12: محمد صلاح ينفذ هجمة مرتدة سريعة ويمرر للويس دياز لكن الكرة مقطوعة.',
      'د 5: ضغط مكثف من اليونايتد والسيتي لفرض السيطرة على خط الوسط.'
    ]
  },
  // Upcoming matches (Tonight or Tomorrow)
  {
    id: 'm4',
    homeTeam: 'بايرن ميونخ',
    awayTeam: 'أرسنال',
    homeLogo: '🇩🇪',
    awayLogo: '🇬🇧',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    league: 'دوري أبطال أوروبا',
    date: '2026-06-13',
    time: '23:15',
    channel: 'beIN Sports Premium Premium',
  },
  {
    id: 'm5',
    homeTeam: 'الاتحاد',
    awayTeam: 'الأهلي',
    homeLogo: '🇸🇦',
    awayLogo: '🇸🇦',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    league: 'الدوري السعودي للمحترفين',
    date: '2026-06-14',
    time: '18:45',
    channel: 'SSC Sports Extra 1',
  },
  {
    id: 'm6',
    homeTeam: 'باريس سان جيرمان',
    awayTeam: 'أتلتيكو مدريد',
    homeLogo: '🇫🇷',
    awayLogo: '🇪🇸',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    league: 'دوري أبطال أوروبا',
    date: '2026-06-14',
    time: '22:00',
    channel: 'beIN Sports HD 4',
  },
  // Finished matches (Yesterday 2026-06-12)
  {
    id: 'm7',
    homeTeam: 'الاتفاق',
    awayTeam: 'الشباب',
    homeLogo: '🇸🇦',
    awayLogo: '🇸🇦',
    homeScore: 1,
    awayScore: 2,
    status: 'FINISHED',
    league: 'الدوري السعودي للمحترفين',
    date: '2026-06-12',
    time: '18:30',
    channel: 'SSC Sports 2 HD',
  },
  {
    id: 'm8',
    homeTeam: 'يوفنتوس',
    awayTeam: 'ميلان',
    homeLogo: '🇮🇹',
    awayLogo: '🇮🇹',
    homeScore: 3,
    awayScore: 1,
    status: 'FINISHED',
    league: 'الدوري الإيطالي الممتاز',
    date: '2026-06-12',
    time: '21:45',
    channel: 'AD Sports Premium 1',
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'عاجل: نكسس لايف كورة يكشف خطة ريال مدريد للميركاتو الصيفي ومصير المعارين',
    summary: 'وفقاً لمصادر مقربة من معسكر النادي الملكي، فإن الإدارة حسمت صفقات الصيف لتأمين الاستقرار الهجومي والدفاعي وبدأت النقاش لخفض عقود الرواتب.',
    content: 'في رصد خاص لمنصة "Nexus live kooora"، تأكد استهداف النادي الملكي لثلاثة أسماء دفاعية شابة لتعويض الغيابات الطويلة. التقارير تؤكد أن المدرب كارلو أنشيلوتي وافق بالتنسيق التام مع فلورنتينو بيريز على منح مهلة نهائية للاعبين المعارين قبل الإعلان عن تمديد وإغلاق الميزانية المالية والتحضير الفني بالولايات المتحدة.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=300&fit=crop&q=80',
    date: '2026-06-13',
    category: 'الكرة العالمية',
    author: 'أحمد التميمي',
    commentsCount: 24,
    views: 1250
  },
  {
    id: 'n2',
    title: 'محلل نكسس لايف كورة: صراع تكتيكي مشتعل في ديربي الهلال والنصر وأسلحة جيسوس ضد صرامة بيولي',
    summary: 'تحليل دقيق لنقاط القوة والضعف في الفريقين، والخيارات الفنية البديلة التي قد تحسم الكلاسيكو الناري الليلة في الدوري السعودي.',
    content: 'يستمر الحوار الفني الكبير بين الهلال والنصر لإحراز النقاط الثلاث. يعول جيسوس على سرعات مالكوم وانطلاقات ميتروفيتش في العمق لكسر الخط الخلفي لبيولي الذي يسعى بدوره لإغلاق المساحات وتحرير كريستيانو رونالدو لتقليص فارق النقاط والحفاظ على نغمة التهديف المميزة.',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&h=300&fit=crop&q=80',
    date: '2026-06-13',
    category: 'الكرة السعودية',
    author: 'ياسر القحطاني',
    commentsCount: 42,
    views: 2980
  },
  {
    id: 'n3',
    title: 'رسمياً: تحديد موعد سحب قرعة مجموعات دوري أبطال أوروبا للنظام الجديد الكلمة لمنصتنا نكسس لايف كورة',
    summary: 'أعلن الاتحاد الأوروبي لكرة القدم يويفا عن آلية التوزيع الجديد للفرق والمرحلة المحدثة لعام 2026 بجدولة بث مباشر كاملة.',
    content: 'يعلن اليويفا النظام الشامل المطور لمجموعات دوري الأبطال بحضور نخبة نجوم القارة. وسوف تنقل منصة "نكسس لايف كورة" التفاصيل الفورية أولاً بأول مع توفير تغطية حية وروزنامة المباريات وحساب احتمالات المواجهات النارية مباشرة لمشتركينا الأوفياء.',
    image: 'https://images.unsplash.com/photo-1540747737956-37872f7e91b3?w=600&h=300&fit=crop&q=80',
    date: '2026-06-12',
    category: 'الكرة الأوروبية',
    author: 'جمال الغندور',
    commentsCount: 15,
    views: 890
  }
];

export const STANDINGS_DATA: Record<string, LeagueStandings> = {
  spl: {
    leagueName: 'الدوري السعودي للمحترفين',
    season: '2025/2026',
    standings: [
      { rank: 1, teamName: 'الهلال', teamLogo: '🔵', played: 28, won: 24, drawn: 3, lost: 1, goalsFor: 76, goalsAgainst: 18, goalDifference: 58, points: 75 },
      { rank: 2, teamName: 'النصر', teamLogo: '🟡', played: 28, won: 20, drawn: 4, lost: 4, goalsFor: 69, goalsAgainst: 28, goalDifference: 41, points: 64 },
      { rank: 3, teamName: 'الأهلي', teamLogo: '🟢', played: 28, won: 17, drawn: 6, lost: 5, goalsFor: 54, goalsAgainst: 32, goalDifference: 22, points: 57 },
      { rank: 4, teamName: 'الاتحاد', teamLogo: '🟡⚫', played: 28, won: 15, drawn: 5, lost: 8, goalsFor: 49, goalsAgainst: 34, goalDifference: 15, points: 50 },
      { rank: 5, teamName: 'التعاون', teamLogo: '🟡🔵', played: 28, won: 13, drawn: 7, lost: 8, goalsFor: 42, goalsAgainst: 31, goalDifference: 11, points: 46 },
    ]
  },
  ucl: {
    leagueName: 'دوري أبطال أوروبا (المجموعة A)',
    season: '2025/2026',
    standings: [
      { rank: 1, teamName: 'ريال مدريد', teamLogo: '⚪', played: 5, won: 4, drawn: 1, lost: 0, goalsFor: 12, goalsAgainst: 4, goalDifference: 8, points: 13 },
      { rank: 2, teamName: 'أرسنال', teamLogo: '🔴', played: 5, won: 3, drawn: 1, lost: 1, goalsFor: 9, goalsAgainst: 5, goalDifference: 4, points: 10 },
      { rank: 3, teamName: 'ميلان', teamLogo: '🔴⚫', played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 7, goalsAgainst: 9, goalDifference: -2, points: 6 },
      { rank: 4, teamName: 'سيلتيك', teamLogo: '🟢⚪', played: 5, won: 0, drawn: 2, lost: 3, goalsFor: 3, goalsAgainst: 11, goalDifference: -8, points: 2 },
    ]
  },
  epl: {
    leagueName: 'الدوري الإنجليزي الممتاز',
    season: '2025/2026',
    standings: [
      { rank: 1, teamName: 'مانشستر سيتي', teamLogo: '🩵', played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 74, goalsAgainst: 26, goalDifference: 48, points: 71 },
      { rank: 2, teamName: 'أرسنال', teamLogo: '🔴', played: 30, won: 21, drawn: 6, lost: 3, goalsFor: 70, goalsAgainst: 22, goalDifference: 48, points: 69 },
      { rank: 3, teamName: 'ليفربول', teamLogo: '🔴', played: 30, won: 20, drawn: 7, lost: 3, goalsFor: 68, goalsAgainst: 29, goalDifference: 39, points: 67 },
      { rank: 4, teamName: 'أستون فيلا', teamLogo: '🟣', played: 30, won: 18, drawn: 5, lost: 7, goalsFor: 58, goalsAgainst: 41, goalDifference: 17, points: 59 },
      { rank: 5, teamName: 'توتنهام', teamLogo: '⚪', played: 30, won: 17, drawn: 4, lost: 9, goalsFor: 55, goalsAgainst: 44, goalDifference: 11, points: 55 },
    ]
  }
};
