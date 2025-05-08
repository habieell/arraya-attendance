import { useState, useEffect } from 'react';
import { Role } from '../../components/types/role';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useRole() {
  const [role, setRole] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Role[] }>('/v1/role', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setRole(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { role, loading, error,  refetch: fetchRole};
}
