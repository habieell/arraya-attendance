// /hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { User } from '../components/types/user';
import AxiosInstance from '@/lib/axios';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await AxiosInstance.get<User[]>('/v1/user');
      setUsers(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    try {
      const res = await AxiosInstance.post<User>('/v1/user', userData);
      setUsers(prev => [...prev, res.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateUser = async (id: number, updatedData: Partial<User>) => {
    try {
      await AxiosInstance.put<User>(`/v1/user/${id}`, updatedData);
      setUsers(prev =>
        prev.map(user => (user.id === id ? { ...user, ...updatedData } : user))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await AxiosInstance.delete(`/v1/user/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { users, loading, error, createUser, updateUser, deleteUser };
}
