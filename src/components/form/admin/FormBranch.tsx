'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useBranchAction from '@/hooks/branch/useBranchAction';
import { BranchCreate } from '@/components/types/branch';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import Select from '../Select';
import { useCompany } from '@/hooks/company/useCompany';
import { toast } from 'react-hot-toast';
import TextArea from '../input/TextArea';

interface Props {
    branch?: BranchCreate | null;
    onSuccess?: () => void;
}

export default function FormBranch({ branch, onSuccess }: Props) {
    const { createBranch, updateBranch } = useBranchAction();
    const [formData, setFormData] = useState<Partial<BranchCreate>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { company } = useCompany();

    const isUpdate = !!branch;

    // Populate form on update
    useEffect(() => {
        if (branch) {
            setFormData({
                name: branch.name,
                company_id: branch.company_id,
                address: branch.address,
                contact: branch.contact,
            });
        } else {
            setFormData({});
        }
    }, [branch]);

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
            if (isUpdate && branch?.id) {
                await updateBranch(branch.id, formData as BranchCreate);
                setFormData({});
            } else {
                await createBranch(formData as Omit<BranchCreate, 'id'>);
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

    const handleTextareaChange = (value: string) => {
        setFormData((prev) => ({ ...prev, address: value }));
      };

    const companyOptions = [...(company || []).map((d) => ({ value: String(d.id), label: d.name }))];

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update branch' : 'Create branch'}>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nama Cabang</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Nama Cabang"
                            />
                        </div>

                        <div>
                            <Label>Perusahaan</Label>
                            <Select
                                options={companyOptions}
                                placeholder="Pilih Perusahaan"
                                value={formData.company_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('company_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Alamat</Label>
                            <TextArea
                                rows={3}
                                value={formData.address || ''}
                                onChange={handleTextareaChange}
                                placeholder="Alamat"
                            />
                        </div>

                        <div>
                            <Label>Contact</Label>
                            <Input
                                type="text"
                                name="contact"
                                value={formData.contact || ''}
                                onChange={handleChange}
                                placeholder="Contact"
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
            </Form >

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmSubmit}
                title={isUpdate ? 'Update branch?' : 'Tambah branch?'}
                description={
                    isUpdate
                        ? `branch "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `branch baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
