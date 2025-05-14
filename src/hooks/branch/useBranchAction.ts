import { useState } from 'react';
import { BranchCreate } from '../../components/types/branch';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-hot-toast';


export default function usePositionAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createBranch = async (
        branchData: Omit<BranchCreate, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<BranchCreate>('/v1/branch', branchData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Cabang Perusahaan berhasil ditambahkan')
            onSuccess?.();
        } catch (err) {
            toast.error('Cabang Perusahaan Gagal ditambahkan');
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateBranch = async (
        id: number,
        updatedData: Partial<BranchCreate>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<BranchCreate>(`/v1/branch/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Perusahaan Cabang berhasil diperbarui');
            onSuccess?.();
        } catch (err) {
            toast.error('Perusahaan Cabang Gagal diperbarui');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBranch = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/branch/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Perusahaan Cabang berhasil dihapus');
            onSuccess?.();
        } catch (err) {
            toast.error('Perusahaan Cabang Gagal dihapus');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createBranch, updateBranch, deleteBranch, loading, error };
}
