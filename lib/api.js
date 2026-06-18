// طبقة موحّدة للتعامل مع API-Football (v3)
// المفتاح يُقرأ من متغير البيئة فقط، لا يُكتب في الكود إطلاقاً
const BASE_URL = 'https://v3.football.api-sports.io';

async function apiFootball(path, params = {}, revalidate = 60) {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) {
    throw new Error('API_FOOTBALL_KEY غير مضبوط في متغيرات البيئة');
  }

  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    headers: { 'x-apisports-key': key },
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error('فشل الاتصال بمزود البيانات: ' + res.status);
  }

  const data = await res.json();
  return data.response || [];
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// مباريات يوم محدد (الافتراضي: اليوم)
export function getFixturesByDate(date = todayISO()) {
  return apiFootball('/fixtures', { date }, 60);
}

// المباريات المباشرة الآن
export function getLiveFixtures() {
  return apiFootball('/fixtures', { live: 'all' }, 30);
}

// ترتيب دوري محدد لموسم محدد
export function getStandings(league, season) {
  return apiFootball('/standings', { league, season }, 3600);
}

// تفاصيل مباراة واحدة بالأحداث والتشكيلة
export function getFixtureById(id) {
  return apiFootball('/fixtures', { id }, 30);
}
