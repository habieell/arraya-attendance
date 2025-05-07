import { useState, useEffect } from 'react';
import { User } from '../../components/types/user';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export default function useUsersAction() {
    const [_, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const cookies = parseCookies();
    const token = cookies.accessToken;

    const createUser = async (userData: Omit<User, 'id'>) => {
        try {
            if (!token) {
                setError('Tidak ada token ditemukan');
                return;
            }

            const res = await AxiosInstance.post<User>('/v1/user', userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(prev => [...prev, res.data]);
        } catch (err) {
            setError(err);
        }
    };

    const updateUser = async (id: number, updatedData: Partial<User>) => {
        try {
            if (!token) {
                setError('Tidak ada token ditemukan');
                return;
            }

            await AxiosInstance.put<User>(`/v1/user/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(prev =>
                prev.map(user => (user.id === id ? { ...user, ...updatedData } : user))
            );
        } catch (err) {
            setError(err);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            if (!token) {
                setError('Tidak ada token ditemukan');
                return;
            }
            
            await AxiosInstance.delete(`/v1/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            setError(err);
        }
    };
    return { createUser, updateUser, deleteUser, loading, error }
}
