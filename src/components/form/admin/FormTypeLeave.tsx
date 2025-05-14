'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useTypeLeavesAction from '@/hooks/typeLeaves/useTypeLeavesAction';
import { TypeLeaves } from '@/components/types/typeLeaves';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import { toast } from 'react-hot-toast';

interface Props {
    typeLeaves?: TypeLeaves | null;
    onSuccess?: () => void;
}

export default function FormTypeLeaves({ typeLeaves, onSuccess }: Props) {
    const { createTypeLeaves, updateTypeLeaves } = useTypeLeavesAction();
    const [formData, setFormData] = useState<Partial<TypeLeaves>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isUpdate = !!typeLeaves;

    useEffect(() => {
        if (typeLeaves) {
            setFormData({
                code: typeLeaves.code,
                name: typeLeaves.name,
            });
        } else {
            setFormData({});
        }
    }, [typeLeaves]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.code || !formData.name) {
            toast.error('Lengkapi semua field sebelum submit.');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (isUpdate && typeLeaves?.id) {
                await updateTypeLeaves(typeLeaves.id, formData as TypeLeaves);
            } else {
                await createTypeLeaves(formData as Omit<TypeLeaves, 'id'>);
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

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update Type Leave' : 'Create Type Leave'}>
                    <div className="grid gap-4">
                        <div>
                            <Label>Code Leave</Label>
                            <Input
                                type="text"
                                name="code"
                                value={formData.code || ''}
                                onChange={handleChange}
                                placeholder="Code"
                            />
                        </div>

                        <div>
                            <Label>Leave</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Nama Leave"
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
                title={isUpdate ? 'Update Type Leaves?' : 'Tambah Type Leaves?'}
                description={
                    isUpdate
                        ? `Type Leaves "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `Type Leaves baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
