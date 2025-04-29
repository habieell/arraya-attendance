import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setLoginCookies } from '@/lib/cookies';
import { parseCookies, destroyCookie } from 'nookies';
import AxiosInstance from '@/lib/axios';

export default function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const login = async (email: string, password: string) => {
    try {
      const res = await AxiosInstance.post('/v1/auth/login', { email, password });
      const { access_token: accessToken, refresh_token: refreshToken } = res.data.data.token;
      
      const { role } = res.data.data.user;

      setLoginCookies(accessToken, refreshToken, role.name);

      if (role.name === 'admin' || role.slug_name === 'adm') {
        router.push('/admin');
      } else if (role.name === 'HC') {
        router.push('/hc');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;

      if (!token) {
        setError('Tidak ada token ditemukan untuk logout');
        return;
      }

      await AxiosInstance.post('/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      destroyCookie(null, 'accessToken');
      destroyCookie(null, 'refreshToken');
      destroyCookie(null, 'role');

      router.push('/');
    } catch (error) {
      console.error('Error saat logout:', error);
      setError('Gagal logout. Silakan coba lagi.');
    }
  };


  return {
    login,
    logout,
    error,
  };
}
