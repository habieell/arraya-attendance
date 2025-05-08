import { useState, useEffect } from 'react';
import { Department } from '../../components/types/department';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useDepartment() {
  const [department, setDepartment] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Department[] }>('/v1/department', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setDepartment(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { department, loading, error,  refetch: fetchDepartment};
}
