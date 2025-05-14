import { useState } from 'react';
import { TypeLeaves } from '../../components/types/typeLeaves';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function usePositionAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createTypeLeaves = async (
        typeLeavesData: Omit<TypeLeaves, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<TypeLeaves>('/v1/type-leave', typeLeavesData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Type Leave berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Type Leave Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateTypeLeaves = async (
        id: number,
        updatedData: Partial<TypeLeaves>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<TypeLeaves>(`/v1/type-leave/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Type Leave berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Type Leave Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTypeLeaves = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');
 
            await AxiosInstance.delete(`/v1/type-leave/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Type Leave berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Type Leave Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createTypeLeaves, updateTypeLeaves, deleteTypeLeaves, loading, error };
}
