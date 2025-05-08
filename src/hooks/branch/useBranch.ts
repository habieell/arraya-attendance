// /hooks/useCompany.ts
import { useState, useEffect } from 'react';
import { Branch } from '../../components/types/branch';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useBranch() {
  const [branch, setBranch] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchBranch();
  }, []);

  const fetchBranch = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Branch[] }>('/v1/branch', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setBranch(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { branch, loading, error,  refetch: fetchBranch};
}
