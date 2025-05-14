'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useShiftAction from '@/hooks/shift/useShiftAction';
import { ShiftCreate } from '@/components/types/shift';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import Select from '../Select';
import { useCompany } from '@/hooks/company/useCompany';
import { toast } from 'react-hot-toast';
import DatePicker from '../date-picker';

interface Props {
    shift?: ShiftCreate | null;
    onSuccess?: () => void;
}

export default function FormShift({ shift, onSuccess }: Props) {
    const { createShift, updateShift } = useShiftAction();
    const [formData, setFormData] = useState<Partial<ShiftCreate>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { company } = useCompany();

    const isUpdate = !!shift;

    // Populate form on update
    useEffect(() => {
        if (shift) {
            setFormData({
                name: shift.name,
                company_id: shift.company_id,
                start_time: new Date(shift.start_time), // Pastikan ini Date
                end_time: new Date(shift.end_time),
            });
        } else {
            setFormData({});
        }
    }, [shift]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.company_id || !formData.start_time || !formData.end_time) {
            toast.error('Lengkapi semua field sebelum submit.');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (isUpdate && shift?.id) {
                await updateShift(shift.id, formData as ShiftCreate);
            } else {
                await createShift(formData as Omit<ShiftCreate, 'id'>);
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

    const handleDateChange = (field: 'start_time' | 'end_time', value: Date) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const companyOptions = [...(company || []).map((d) => ({ value: String(d.id), label: d.name }))];

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update Shift' : 'Create Shift'}>
                    <div className="grid gap-4">
                        <div>
                            <Label>Nama Shift</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Nama Shift"
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

                        <DatePicker
                            id="start_time"
                            label="Jam Masuk"
                            mode="time"
                            placeholder="Select Jam Masuk"
                            defaultDate={formData.start_time}
                            onChange={([time]) => handleDateChange('start_time', time)}
                        />

                        <DatePicker
                            id="end_time"
                            label="Jam Pulang"
                            mode="time"
                            placeholder="Select Jam Pulang"
                            defaultDate={formData.end_time}
                            onChange={([time]) => handleDateChange('end_time', time)}
                        />

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
                title={isUpdate ? 'Update Shift?' : 'Tambah Shift?'}
                description={
                    isUpdate
                        ? `Shift "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `Shift baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
