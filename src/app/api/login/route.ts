import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, role } = await request.json();

  const response = NextResponse.json({ success: true });

  // Set accessToken cookie
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  // Set userRole cookie
  response.cookies.set('userRole', role, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
