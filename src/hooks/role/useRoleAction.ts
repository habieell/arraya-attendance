import { useState } from 'react';
import { Role } from '../../components/types/role';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function useRoleAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createRole = async (
        roleData: Omit<Role, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<Role>('/v1/role', roleData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Role berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Role Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateRole = async (
        id: number,
        updatedData: Partial<Role>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<Role>(`/v1/role/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('role berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Role Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteRole = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/role/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Role berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Role Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createRole, updateRole, deleteRole, loading, error };
}
