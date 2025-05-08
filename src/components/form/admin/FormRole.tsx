"use client";
import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useRoleAction from '@/hooks/role/useRoleAction';
import { Role } from '@/components/types/role';
import {ConfirmationModal} from '../../ui/modal/ConfirmationModal'; 

interface Props {
  role?: Role | null;
  onSuccess?: () => void;
}

export default function FormRole({ role, onSuccess }: Props) {
  const { createRole, updateRole } = useRoleAction();
  const [formData, setFormData] = useState<Partial<Role>>({});
  const [showConfirm, setShowConfirm] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const isUpdate = !!role;

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        slug_name: role.slug_name,
      });
    } else {
      setFormData({});
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.slug_name) {
      console.error('Name and slugname required');
      return;
    }

    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isUpdate && role?.id) {
        await updateRole(role.id, formData as Role);

      } else {
        await createRole(formData as Omit<Role, 'id'>);

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
        <ComponentCard title={isUpdate ? 'Update Role' : 'Create Role'}>
          <div className="gap-4">
            <div>
              <Label>Nama Role</Label>
              <Input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Nama Role"
              />
            </div>

            <div>
              <Label>Singkatan</Label>
              <Input
                type="text"
                name="slug_name"
                value={formData.slug_name || ''}
                onChange={handleChange}
                placeholder="Singkatan"
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
        title={isUpdate ? 'Update Role?' : 'Tambah Role?'}
        description={
          isUpdate
            ? `Role "${formData.name}" akan diperbarui. Apakah Anda yakin?`
            : `Role baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
        }
        confirmText={isUpdate ? 'Update' : 'Submit'}
        cancelText="Batal"
        isLoading={isSubmitting}
      />
    </>
  );
}
