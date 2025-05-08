'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useDepartmentAction from '@/hooks/department/useDepartmentAction';
import { DepartmentCreate } from '@/components/types/department';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import Select from '../Select';
import { useCompany } from '@/hooks/company/useCompany';
import { useBranch } from '@/hooks/branch/useBranch';
import { useUsers } from '@/hooks/users/useUsers';
import { toast } from 'react-hot-toast';

interface Props {
    department?: DepartmentCreate | null;
    onSuccess?: () => void;
}

export default function FormDepartment({ department, onSuccess }: Props) {
    const { createDepartment, updateDepartment } = useDepartmentAction();
    const [formData, setFormData] = useState<Partial<DepartmentCreate>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { company } = useCompany();
    const { branch } = useBranch();
    const { users } = useUsers();

    const isUpdate = !!department;

    // Populate form on update
    useEffect(() => {
        if (department) {
            setFormData({
                name: department.name,
                company_id: department.company_id,
                branch_id: department.branch_id,
                director_id: department.director_id,
            });
        } else {
            setFormData({});
        }
    }, [department]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.company_id) {
            toast.error('Lengkapi semua field sebelum submit.');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (isUpdate && department?.id) {
                await updateDepartment(department.id, formData as DepartmentCreate);
            } else {
                await createDepartment(formData as Omit<DepartmentCreate, 'id'>);
                setFormData({});
            }
            onSuccess?.();
        } catch (err) {

        } finally {
            setIsSubmitting(false);
            setShowConfirm(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value || undefined }));
    };

    const companyOptions = [{ value: '', label: 'Tidak ada' }, ...(company || []).map((c) => ({ value: String(c.id), label: c.name }))];

    const branchOptions = [{ value: '', label: 'Tidak ada' }, ...(branch || []).map((b) => ({ value: String(b.id), label: b.name }))];

    const userOptions = [{ value: '', label: 'Tidak ada' }, ...(users || []).map((u) => ({ value: String(u.id), label: u.name }))];


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update Department' : 'Create Department'}>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nama Department</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Nama Department"
                            />
                        </div>

                        <div>
                            <Label>Perusahaan</Label>
                            <Select
                                options={companyOptions}
                                placeholder="Pilih perusahaan"
                                value={formData.company_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('company_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Cabang</Label>
                            <Select
                                options={branchOptions}
                                placeholder="Pilih Cabang"
                                value={formData.branch_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('branch_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Direktur</Label>
                            <Select
                                options={userOptions}
                                placeholder="Pilih direktur"
                                value={formData.director_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('director_id', val)}
                            />
                        </div>
                    </div>

                    <div className="col-span-3 mt-8 max-w-sm text-center">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-700"
                        >
                            {isUpdate ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </ComponentCard>
            </Form>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmSubmit}
                title={isUpdate ? 'Update Department?' : 'Tambah Department?'}
                description={
                    isUpdate
                        ? `Department "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `Department baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
