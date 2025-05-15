// /hooks/useCompany.ts
import { useState, useEffect } from 'react';
import { Attendance } from '../../components/types/attendance';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';


// all
export function useAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Attendance[] }>('/v1/attendance', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setAttendance(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };




  return { attendance, loading, error,  refetch: fetchAttendance};
}

// per user
export function useAttendanceUser(id: string | null) {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (id !== null) {
      fetchAttendance();
    }
  }, [id]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }

      const res = await AxiosInstance.get<{ status: number; message: string; data: Attendance[] }>(`/v1/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setAttendance(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { attendance, loading, error, refetch: fetchAttendance };
}
