import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value;
  const { pathname } = request.nextUrl;

  // Kalau belum login dan buka halaman selain /auth -> redirect ke /auth/signin
  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Kalau sudah login dan buka / atau /auth/signin, redirect ke dashboard
  if (token && (pathname === '/' || pathname === '/auth/signin')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Kalau user role HR tapi buka /admin -> redirect ke unauthorized
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // (optional) nanti kalau ada /hr page, bisa ditambah proteksi disini

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|_static).*)'],
};
