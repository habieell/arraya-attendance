import { useState } from 'react';
import { Company } from '../../components/types/company';
import AxiosInstance from '@/lib/axios';
import { parseCookies } from 'nookies';

export default function useCompanyAction() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const createCompany = async (
        companyData: Omit<Company, 'id'>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.post<Company>('/v1/company', companyData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onSuccess?.();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    const updateCompany = async (
        id: number,
        updatedData: Partial<Company>,
        onSuccess?: () => void
    ) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.put<Company>(`/v1/company/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onSuccess?.();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCompany = async (id: number, onSuccess?: () => void) => {
        try {
            setLoading(true);
            const cookies = parseCookies();
            const token = cookies.accessToken;
            if (!token) throw new Error('Tidak ada token ditemukan');

            await AxiosInstance.delete(`/v1/company/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onSuccess?.();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { createCompany, updateCompany, deleteCompany, loading, error };
}
