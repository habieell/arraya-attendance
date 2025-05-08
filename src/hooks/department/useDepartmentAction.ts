import { useState } from 'react';
import { DepartmentCreate } from '../../components/types/department';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function useDepartmentAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createDepartment = async (
        departmentData: Omit<DepartmentCreate, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<DepartmentCreate>('/v1/department', departmentData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Department berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Department Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateDepartment = async (
        id: number,
        updatedData: Partial<DepartmentCreate>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<DepartmentCreate>(`/v1/department/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Department berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Department Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteDepartment = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/department/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Department berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Department Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createDepartment, updateDepartment, deleteDepartment, loading, error };
}
