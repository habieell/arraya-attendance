import { useState } from 'react';
import { PositionCreate } from '../../components/types/position';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function usePositionAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createPosition = async (
        positionData: Omit<PositionCreate, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<PositionCreate>('/v1/position', positionData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Posisi berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Posisi Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updatePosition = async (
        id: number,
        updatedData: Partial<PositionCreate>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<PositionCreate>(`/v1/position/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Posisi berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Posisi Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deletePosition = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/position/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Posisi berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Posisi Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createPosition, updatePosition, deletePosition, loading, error };
}
