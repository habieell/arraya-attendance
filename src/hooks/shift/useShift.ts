import { useState, useEffect } from 'react';
import { Shift } from '../../components/types/shift';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useShift() {
  const [shift, setShift] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchShift();
  }, []);

  const fetchShift = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Shift[] }>('/v1/shift', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setShift(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { shift, loading, error,  refetch: fetchShift};
}
