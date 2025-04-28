// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Kalau sudah login, jangan boleh buka /auth/signin atau /auth/signup lagi
  if (token && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Allow akses ke /auth, /api, /_next
  if (pathname.startsWith('/auth') || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Kalau belum login dan mau buka halaman lain ➔ Redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Untuk semua routes kecuali _next, favicon, dll
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
