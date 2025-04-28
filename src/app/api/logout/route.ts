import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Hapus cookies
  response.cookies.set('accessToken', '', {
    path: '/',
    expires: new Date(0),
  });

  response.cookies.set('userRole', '', {
    path: '/',
    expires: new Date(0),
  });

  return response;
}
