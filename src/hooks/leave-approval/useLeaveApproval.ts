import { useState, useEffect } from 'react';
import { LeaveApproval } from '../../components/types/leaveApproval';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useLeaveApproval() {
  const [leaveApproval, setLeaveApproval] = useState<LeaveApproval[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchLeaveApproval();
  }, []);

  const fetchLeaveApproval = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: LeaveApproval[] }>('/v1/leaveApproval', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setLeaveApproval(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { leaveApproval, loading, error,  refetch: fetchLeaveApproval};
}
