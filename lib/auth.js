// مصادقة بسيطة للأدمن عبر cookie موقّع (HMAC)
import crypto from 'crypto';

const COOKIE = 'nx_admin';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || 'dev-insecure-secret';
}

export function makeToken() {
  const payload = `admin.${Date.now()}`;
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('hex');
  if (parts[2].length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected));
}

export function checkPassword(input) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass || !input) return false;
  const a = Buffer.from(String(input));
  const b = Buffer.from(String(pass));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const COOKIE_NAME = COOKIE;
