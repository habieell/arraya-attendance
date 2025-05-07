// /hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { User } from '../../components/types/user';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (!token) {
        setError('Tidak ada token ditemukan');
        return;
      }
  
      const res = await AxiosInstance.get<{ status: number; message: string; data: User[] }>('/v1/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      setUsers(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  return { users, loading, error };
}
