'use client';

import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useUserAction from '@/hooks/users/useUsersAction';
import { UserCreate } from '@/components/types/user';
import { ConfirmationModal } from '../../ui/modal/ConfirmationModal';
import Select from '../Select';
import { useCompany } from '@/hooks/company/useCompany';
import { useRole } from '@/hooks/role/useRole';
import { useBranch } from '@/hooks/branch/useBranch';
import { usePosition } from '@/hooks/position/usePosition';
import { useDepartment } from '@/hooks/department/useDepartment';
import { toast } from 'react-hot-toast';
import DatePicker from '../date-picker';
import { EyeCloseIcon, EyeIcon } from '../../../icons';
import FileInput from '../input/FileInput';

interface Props {
    user?: UserCreate | null;
    onSuccess?: () => void;
}

export default function FormUser({ user, onSuccess }: Props) {
    const { createUser, updateUser } = useUserAction();
    const [formData, setFormData] = useState<Partial<UserCreate>>({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { company } = useCompany();
    const { role } = useRole();
    const { branch } = useBranch();
    const { position } = usePosition();
    const { department } = useDepartment();

    const isUpdate = !!user;

    // Populate form on update
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: user.password,
                role_id: user.role_id,
                company_id: user.company_id,
                branch_id: user.branch_id,
                position_id: user.position_id,
                department_id: user.department_id,
                birth_date: user.birth_date,
                birth_place: user.birth_place,
                address: user.address,
                phone_number: user.phone_number,
                gender: user.gender,
                photo: user.photo,
            });
        } else {
            setFormData({});
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.company_id || !formData.role_id || !formData.position_id || !formData.department_id) {
            toast.error('Lengkapi semua field sebelum submit.');
            return;
        }

        setShowConfirm(true);
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (isUpdate && user?.id) {
                await updateUser(user.id, formData as UserCreate);
            } else {
                await createUser(formData as Omit<UserCreate, 'id'>);
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

    const handleDateChange = (field: 'birth_date', value: Date) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTextareaChange = (value: string) => {
        setFormData((prev) => ({ ...prev, address: value }));
    };

    const roleOptions = [...(role || []).map((d) => ({ value: String(d.id), label: d.name }))];
    const companyOptions = [...(company || []).map((d) => ({ value: String(d.id), label: d.name }))];
    const branchOptions = [{ value: '', label: 'Tidak ada' }, ...(branch || []).map((d) => ({ value: String(d.id), label: d.name }))];
    const positionOptions = [...(position || []).map((d) => ({ value: String(d.id), label: d.name }))];
    const departmentOptions = [{ value: '', label: 'Tidak ada' }, ...(department || []).map((d) => ({ value: String(d.id), label: d.name }))];
    const genderOptions = [
        { value: '1', label: 'Male' },
        { value: '0', label: 'Female' },
    ];

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ComponentCard title={isUpdate ? 'Update User' : 'Create User'}>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                placeholder="Email aktif"
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                    placeholder="Masukkan password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                    ) : (
                                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label>Role</Label>
                            <Select
                                options={roleOptions}
                                placeholder="Pilih Role"
                                value={formData.role_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('role-id', val)}
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
                            <Label>Cabang</Label>
                            <Select
                                options={branchOptions}
                                placeholder="Pilih Cabang"
                                value={formData.branch_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('branch_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Job Posisi</Label>
                            <Select
                                options={positionOptions}
                                placeholder="Job Posisi"
                                value={formData.position_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('position_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Department</Label>
                            <Select
                                options={departmentOptions}
                                placeholder="Department"
                                value={formData.department_id?.toString() || ''}
                                onChange={(val) => handleSelectChange('department_id', val)}
                            />
                        </div>

                        <div>
                            <Label>Full Name</Label>
                            <Input
                                type="text"
                                name="fullName"
                                value={formData.full_name || ''}
                                onChange={handleChange}
                                placeholder="Nama lengkap"
                            />
                        </div>

                        <div>
                            <Label>Tempat Lahir</Label>
                            <Input
                                type="text"
                                name="birth_place"
                                value={formData.birth_place || ''}
                                onChange={handleChange}
                                placeholder="Tempat lahir"
                            />
                        </div>

                        <DatePicker
                            id="birth_date"
                            label="Tanggal Lahir"
                            mode="time"
                            placeholder="Select Jam Masuk"
                            defaultDate={formData.birth_date || ''}
                            onChange={([time]) => handleDateChange('birth_date', time)}
                        />

                        <div className="col-span-3">
                            <Label>Alamat</Label>
                            <Input
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                placeholder="Alamat lengkap"
                            />
                        </div>

                        <div>
                            <Label>No. HP</Label>
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={formData.phone_number || ''}
                                onChange={handleChange}
                                placeholder="08xxxxxxxx"
                            />
                        </div>

                        <div>
                            <Label>Jenis Kelamin</Label>
                            <Select
                                options={genderOptions}
                                placeholder="Pilih gender"
                                onChange={(val) => handleSelectChange('gender', val)}
                            />
                        </div>

                        <div>
                            <Label>Photo Profile</Label>
                            <FileInput
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setFormData((prev) => ({ ...prev, photo: url }));
                                    }
                                }}
                            />
                            {formData.photo && (
                                <div className="mt-2">
                                    <img src={formData.photo} alt="Preview" className="h-20 rounded" />
                                </div>
                            )}
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
                title={isUpdate ? 'Update User?' : 'Tambah User?'}
                description={
                    isUpdate
                        ? `User "${formData.name}" akan diperbarui. Apakah Anda yakin?`
                        : `User baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
                }
                confirmText={isUpdate ? 'Update' : 'Submit'}
                cancelText="Batal"
                isLoading={isSubmitting}
            />
        </>
    );
}
