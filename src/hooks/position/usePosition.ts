import { useState, useEffect } from 'react';
import { Position } from '../../components/types/position';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function usePosition() {
  const [position, setPosition] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Position[] }>('/v1/position', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setPosition(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { position, loading, error,  refetch: fetchPosition};
}
