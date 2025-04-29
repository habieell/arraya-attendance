import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const role = req.cookies.get('role')?.value;

  const url = req.nextUrl.clone();

  // Kalau tidak ada token, redirect ke login
  if (!accessToken) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Kalau ada role tapi salah akses path
  if (role === 'Admin' && !url.pathname.startsWith('/admin')) {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  if (role === 'HC' && !url.pathname.startsWith('/hc')) {
    url.pathname = '/hc';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware aktif untuk semua route kecuali /login
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
