// قائمة الدوريات المعروضة في صفحة الترتيب — عدّلها كما تشاء
export const FEATURED_LEAGUES = [
  { id: 39, slug: 'premier-league', name: 'الدوري الإنجليزي الممتاز' },
  { id: 140, slug: 'la-liga', name: 'الدوري الإسباني' },
  { id: 135, slug: 'serie-a', name: 'الدوري الإيطالي' },
  { id: 78, slug: 'bundesliga', name: 'الدوري الألماني' },
  { id: 61, slug: 'ligue-1', name: 'الدوري الفرنسي' },
  { id: 307, slug: 'saudi-league', name: 'دوري روشن السعودي' },
  { id: 2, slug: 'champions-league', name: 'دوري أبطال أوروبا' }
];

export function leagueBySlug(slug) {
  return FEATURED_LEAGUES.find((l) => l.slug === slug) || null;
}

export function currentSeason() {
  const now = new Date();
  // الموسم الأوروبي يبدأ في أغسطس
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
}
