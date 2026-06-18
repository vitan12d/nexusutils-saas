'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    setLoading(false);
    if (res.ok) router.push('/admin');
    else setError('كلمة المرور غير صحيحة');
  }

  return (
    <div className="admin-login">
      <form onSubmit={submit} className="prose" style={{ maxWidth: 380, margin: '40px auto' }}>
        <h1 className="section-title">دخول لوحة التحكم</h1>
        <input
          type="password"
          className="admin-input"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error" style={{ marginTop: 10 }}>{error}</div>}
        <button className="btn-primary" disabled={loading}>{loading ? '...' : 'دخول'}</button>
      </form>
    </div>
  );
}
