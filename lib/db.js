// طبقة البيانات عبر Vercel KV
// إذا لم تُضبط KV (محلياً)، ترجع الدوال قوائم فارغة دون أن يتعطل البناء
import { kv } from '@vercel/kv';

const KEYS = {
  news: 'content:news',
  articles: 'content:articles',
  videos: 'content:videos',
  streams: 'content:streams'
};

function kvReady() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function readList(key) {
  if (!kvReady()) return [];
  const data = await kv.get(key);
  return Array.isArray(data) ? data : [];
}

async function writeList(key, list) {
  if (!kvReady()) throw new Error('KV غير مضبوط. اربط Vercel KV وأضف متغيرات البيئة.');
  await kv.set(key, list);
}

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
    .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;
}

// CRUD عام لأي نوع
export async function listItems(type) {
  const items = await readList(KEYS[type]);
  return items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export async function getItem(type, id) {
  const items = await readList(KEYS[type]);
  return items.find((i) => i.id === id || i.slug === id) || null;
}

export async function createItem(type, payload) {
  const items = await readList(KEYS[type]);
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const item = {
    id,
    slug: payload.slug ? slugify(payload.slug) : slugify(payload.title || id),
    createdAt: new Date().toISOString(),
    ...payload
  };
  items.push(item);
  await writeList(KEYS[type], items);
  return item;
}

export async function updateItem(type, id, payload) {
  const items = await readList(KEYS[type]);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error('العنصر غير موجود');
  items[idx] = { ...items[idx], ...payload, id };
  await writeList(KEYS[type], items);
  return items[idx];
}

export async function deleteItem(type, id) {
  const items = await readList(KEYS[type]);
  const next = items.filter((i) => i.id !== id);
  await writeList(KEYS[type], next);
  return { deleted: items.length - next.length };
}

// روابط البث: تظهر فقط من (kickoff - 15 دقيقة) حتى (kickoff + 130 دقيقة)
export function isStreamActive(s, now = Date.now()) {
  if (!s || !s.kickoff) return false;
  const k = new Date(s.kickoff).getTime();
  return now >= k - 15 * 60 * 1000 && now <= k + 130 * 60 * 1000;
}

export async function getActiveStreams() {
  const items = await readList(KEYS.streams);
  const now = Date.now();
  return items.filter((s) => isStreamActive(s, now));
}

// مطابقة رابط بث نشط مع مباراة بالاسم (اسم أحد الفريقين موجود في عنوان الرابط)
function norm(str) {
  return String(str || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

export async function findStreamForMatch({ home, away } = {}) {
  const active = await getActiveStreams();
  if (active.length === 0) return null;
  const h = norm(home);
  const a = norm(away);
  return active.find((s) => {
    const title = norm(s.title);
    return (h && title.includes(h)) || (a && title.includes(a));
  }) || null;
}
