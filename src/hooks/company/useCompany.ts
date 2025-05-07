// /hooks/useCompany.ts
import { useState, useEffect } from 'react';
import { Company } from '../../components/types/company';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useCompany() {
  const [company, setCompany] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Company[] }>('/v1/company', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setCompany(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { company, loading, error,  refetch: fetchCompany};
}
