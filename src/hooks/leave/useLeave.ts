import { useState, useEffect } from 'react';
import { Leave } from '../../components/types/leave';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useLeave() {
  const [leave, setLeave] = useState<Leave[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchLeave();
  }, []);

  const fetchLeave = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Leave[] }>('/v1/leave', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setLeave(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { leave, loading, error,  refetch: fetchLeave};
}
