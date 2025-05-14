import { useState } from 'react';
import { ShiftCreate } from '../../components/types/shift';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function usePositionAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createShift = async (
        shiftData: Omit<ShiftCreate, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<ShiftCreate>('/v1/shift', shiftData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Shift berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Shift Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateShift = async (
        id: number,
        updatedData: Partial<ShiftCreate>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<ShiftCreate>(`/v1/shift/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Shift berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Shift Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteShift = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/shift/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Shift berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Shift Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createShift, updateShift, deleteShift, loading, error };
}
