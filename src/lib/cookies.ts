import { setCookie, destroyCookie } from 'nookies';

export function setLoginCookies(accessToken: string, refreshToken: string, role: string) {
    
  setCookie(null, 'accessToken', accessToken, {
    maxAge: 60 * 60, // 1 jam
    path: '/',
  });

  setCookie(null, 'refreshToken', refreshToken, {
    maxAge: 7 * 24 * 60 * 60, // 7 hari
    path: '/',
  });

  setCookie(null, 'role', role, {
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export function clearLoginCookies() {
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');
  destroyCookie(null, 'role');
}
