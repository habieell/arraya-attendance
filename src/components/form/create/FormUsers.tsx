'use client';

import React, { useState } from 'react';
import {useUsers} from '@/hooks/useUsers';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Select from '../Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../../icons';
import DatePicker from '@/components/form/date-picker';
import { User } from '@/components/types/user';
import { UserProfile } from '@/components/types/userProfile';

export default function FormUsers() {
  const { users, loading, error } = useUsers();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useUsers();


  const [formData, setFormData] = useState<Partial<User & UserProfile>>({
  
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof (User & UserProfile), value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Validasi formData sebelum dipanggil
    if (!formData.name || !formData.email) {
      console.error('Name and email are required');
      return;
    }

    try {
      await createUser(formData as Omit<User, 'id'>); // Cast ke Omit<User, 'id'>
      setFormData({ name: '', email: '', gender: null });
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };


  const userOptions = users.map(user => ({
    value: String(user.id),
    label: user.name,
  }));

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <ComponentCard title="Tambah Users">
        <div className="grid grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <Label>Nama</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name || ''} 
              onChange={handleChange} 
              placeholder="Nama lengkap"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role ID */}
          <div>
            <Label>Role</Label>
            <Select
              options={userOptions}
              placeholder="Pilih role"
              onChange={(val) => handleSelectChange('roleId', val)}
            />
          </div>

          {/* Company ID */}
          <div>
            <Label>Company</Label>
            <Select
              options={userOptions}
              placeholder="Pilih company"
              onChange={(val) => handleSelectChange('companyid', val)}
            />
          </div>

          {/* Branch ID */}
          <div>
            <Label>Branch</Label>
            <Select
              options={userOptions}
              placeholder="Pilih branch"
              onChange={(val) => handleSelectChange('branchId', val)}
            />
          </div>

          {/* Department ID */}
          <div>
            <Label>Department</Label>
            <Select
              options={userOptions}
              placeholder="Pilih department"
              onChange={(val) => handleSelectChange('departmentId', val)}
            />
          </div>

          {/* Position ID */}
          <div>
            <Label>Position</Label>
            <Select
              options={userOptions}
              placeholder="Pilih position"
              onChange={(val) => handleSelectChange('positionId', val)}
            />
          </div>

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleChange}
              placeholder="Nama lengkap"
            />
          </div>

          {/* Birth Place */}
          <div>
            <Label>Birth Place</Label>
            <Input
              type="text"
              name="birthPlace"
              value={formData.birthPlace || ''}
              onChange={handleChange}
              placeholder="Tempat lahir"
            />
          </div>

          {/* Birth Date */}
          <div>
            <Label>Birth Date</Label>
            <DatePicker
              id="birthDate"
              label=""
              placeholder="Tanggal lahir"
              onChange={(dates, dateString) => {
                handleSelectChange('birthDate', dateString);
              }}
            />
          </div>

          {/* Address */}
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

          {/* Phone Number */}
          <div>
            <Label>No. HP</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
              placeholder="08xxxxxxxx"
            />
          </div>

          {/* Gender */}
          <div>
            <Label>Jenis Kelamin</Label>
            <Select
              options={genderOptions}
              placeholder="Pilih gender"
              onChange={(val) => handleSelectChange('gender', val)}
            />
          </div>

          {/* Photo */}
          <div>
            <Label>Photo URL</Label>
            <Input
              type="text"
              name="photo"
              value={formData.photo || ''}
              onChange={handleChange}
              placeholder="Link photo profile"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-3 mt-8 max-w-sm text-center">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-700"
          >
            Submit
          </button>
        </div>
      </ComponentCard>
    </Form>
  );
}
