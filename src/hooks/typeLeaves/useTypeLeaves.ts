import { useState, useEffect } from 'react';
import { TypeLeaves } from '../../components/types/typeLeaves';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useTypeLeaves() {
  const [typeLeaves, setTypeLeaves] = useState<TypeLeaves[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchTypeLeaves();
  }, []);

  const fetchTypeLeaves  = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: TypeLeaves[] }>('/v1/type-leave', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setTypeLeaves(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { typeLeaves, loading, error,  refetch: fetchTypeLeaves};
}
