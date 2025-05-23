'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import usePositionAction from '@/hooks/position/usePositionAction';
import { PositionCreate } from '@/components/types/position';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import Select from '../Select';
import { useDepartment } from '@/hooks/department/useDepartment';
import { toast } from 'react-hot-toast';

interface Props {
    position?: PositionCreate | null;
    onSuccess?: () => void;
}

export default function FormPosition({ position, onSuccess }: Props) {
    const { createPosition, updatePosition } = usePositionAction();
    const [formData, setFormData] = useState<Partial<PositionCreate>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { department } = useDepartment();

    const isUpdate = !!position;

    // Populate form on update
    useEffect(() => {
        if (position) {
            setFormData({
                name: position.name,
                department_id: position.department_id,
                level: position.level,
            });
        } else {
            setFormData({});
        }
    }, [position]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error('Lengkapi semua field sebelum submit.');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (isUpdate && position?.id) {
                await updatePosition(position.id, formData as PositionCreate);
                setFormData({});
            } else {
                await createPosition(formData as Omit<PositionCreate, 'id'>);
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

    const departmentOptions = [{ value: '', label: 'Tidak ada' }, ...(department || []).map((d) => ({ value: String(d.id), label: d.name }))];

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update Position' : 'Create Position'}>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nama Position</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Nama Posisi"
                            />
                        </div>

                        <div>
                            <Label>Department</Label>
                            <Select
                                options={departmentOptions}
                                placeholder="Pilih department"
                                value={formData.department_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('department_id', val)}
                            />
                        </div>
                        
                        <div>
                            <Label>Level</Label>
                            <Input
                                type="number"
                                name="level"
                                value={formData.level || ''}
                                onChange={handleChange}
                                placeholder="level"
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
                title={isUpdate ? 'Update Posisi?' : 'Tambah Posisi?'}
                description={
                    isUpdate
                        ? `Posisi "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `Posisi baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
