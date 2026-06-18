import { NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// يحمي لوحة التحكم (ما عدا صفحة تسجيل الدخول)
export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!verifyToken(token)) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
