'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { key: 'news', label: 'أخبار' },
  { key: 'articles', label: 'مقالات' },
  { key: 'videos', label: 'فيديو' },
  { key: 'streams', label: 'روابط البث' }
];

const EMPTY = {
  news: { title: '', locale: 'ar', date: '', author: '', cover: '', excerpt: '', body: '' },
  articles: { title: '', locale: 'ar', date: '', author: '', cover: '', excerpt: '', body: '' },
  videos: { title: '', locale: 'ar', date: '', youtubeId: '', excerpt: '' },
  streams: { title: '', league: '', kickoff: '', channel: '', url: '' }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('news');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY.news);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  const load = useCallback(async (t) => {
    const res = await fetch(`/api/admin/${t}`);
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setItems(data.items || []);
  }, [router]);

  useEffect(() => { load(tab); setForm(EMPTY[tab]); setEditId(null); }, [tab, load]);

  function change(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function save(e) {
    e.preventDefault();
    setMsg('');
    const method = editId ? 'PUT' : 'POST';
    const payload = editId ? { ...form, id: editId } : form;
    const res = await fetch(`/api/admin/${tab}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      setMsg(editId ? 'تم التحديث' : 'تمت الإضافة');
      setForm(EMPTY[tab]); setEditId(null); load(tab);
    } else setMsg(data.error || 'خطأ');
  }

  async function remove(id) {
    if (!confirm('حذف هذا العنصر؟')) return;
    await fetch(`/api/admin/${tab}?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    load(tab);
  }

  function edit(it) { setForm({ ...EMPTY[tab], ...it }); setEditId(it.id); window.scrollTo(0, 0); }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  }

  const fields = FIELDS[tab];

  return (
    <div className="admin">
      <div className="admin-bar">
        <h1 className="section-title" style={{ margin: 0 }}>لوحة التحكم</h1>
        <button className="btn-ghost" onClick={logout}>خروج</button>
      </div>

      <div className="tabs">
        {TABS.map((tb) => (
          <button key={tb.key} className={`tab ${tab === tb.key ? 'active' : ''}`} onClick={() => setTab(tb.key)}>{tb.label}</button>
        ))}
      </div>

      <form onSubmit={save} className="prose admin-form">
        <h2 style={{ marginTop: 0 }}>{editId ? 'تعديل عنصر' : 'إضافة جديد'}</h2>
        {fields.map((f) => (
          f.type === 'textarea' ? (
            <textarea key={f.k} className="admin-input" rows={4} placeholder={f.label}
              value={form[f.k] || ''} onChange={(e) => change(f.k, e.target.value)} />
          ) : f.type === 'select' ? (
            <select key={f.k} className="admin-input" value={form[f.k] || 'ar'} onChange={(e) => change(f.k, e.target.value)}>
              <option value="ar">عربي</option>
              <option value="en">English</option>
            </select>
          ) : (
            <input key={f.k} className="admin-input" type={f.type} placeholder={f.label}
              value={form[f.k] || ''} onChange={(e) => change(f.k, e.target.value)} required={f.required} />
          )
        ))}
        {tab === 'streams' && (
          <p className="note">⚠️ استخدم روابط القنوات/المنصات الرسمية المرخّصة فقط. الرابط يظهر قبل المباراة بـ 15 دقيقة ويختفي تلقائياً بعد انتهائها.</p>
        )}
        {msg && <div className="note" style={{ background: '#e9f7ec' }}>{msg}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-primary">{editId ? 'حفظ التعديل' : 'إضافة'}</button>
          {editId && <button type="button" className="btn-ghost" onClick={() => { setForm(EMPTY[tab]); setEditId(null); }}>إلغاء</button>}
        </div>
      </form>

      <div className="table-wrap" style={{ marginTop: 18 }}>
        <div className="table-head">العناصر ({items.length})</div>
        {items.length === 0 && <div className="empty">لا توجد عناصر بعد.</div>}
        {items.map((it) => (
          <div key={it.id} className="admin-row">
            <div>
              <strong>{it.title}</strong>
              <span className="admin-meta">{it.kickoff || it.date} {it.channel ? `— ${it.channel}` : ''}</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-ghost" onClick={() => edit(it)}>تعديل</button>
              <button className="btn-danger" onClick={() => remove(it.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FIELDS = {
  news: [
    { k: 'title', label: 'العنوان', type: 'text', required: true },
    { k: 'locale', label: 'اللغة', type: 'select' },
    { k: 'date', label: 'التاريخ', type: 'date', required: true },
    { k: 'author', label: 'الكاتب', type: 'text' },
    { k: 'cover', label: 'رابط صورة الغلاف', type: 'text' },
    { k: 'excerpt', label: 'ملخص قصير', type: 'textarea' },
    { k: 'body', label: 'النص الكامل', type: 'textarea' }
  ],
  articles: [
    { k: 'title', label: 'العنوان', type: 'text', required: true },
    { k: 'locale', label: 'اللغة', type: 'select' },
    { k: 'date', label: 'التاريخ', type: 'date', required: true },
    { k: 'author', label: 'الكاتب', type: 'text' },
    { k: 'cover', label: 'رابط صورة الغلاف', type: 'text' },
    { k: 'excerpt', label: 'ملخص قصير', type: 'textarea' },
    { k: 'body', label: 'النص الكامل', type: 'textarea' }
  ],
  videos: [
    { k: 'title', label: 'العنوان', type: 'text', required: true },
    { k: 'locale', label: 'اللغة', type: 'select' },
    { k: 'date', label: 'التاريخ', type: 'date' },
    { k: 'youtubeId', label: 'معرّف يوتيوب (مثال: dQw4w9WgXcQ)', type: 'text', required: true },
    { k: 'excerpt', label: 'وصف', type: 'textarea' }
  ],
  streams: [
    { k: 'title', label: 'المباراة (مثال: السعودية ضد الأرجنتين)', type: 'text', required: true },
    { k: 'league', label: 'البطولة', type: 'text' },
    { k: 'kickoff', label: 'وقت البداية', type: 'datetime-local', required: true },
    { k: 'channel', label: 'القناة/المنصة الرسمية', type: 'text', required: true },
    { k: 'url', label: 'رابط البث الرسمي', type: 'text', required: true }
  ]
};
