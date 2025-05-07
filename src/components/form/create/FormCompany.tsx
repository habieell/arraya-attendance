"use client";
import React, { useEffect, useState } from 'react';
import Input from '../input/InputField';
import TextArea from '../input/TextArea';
import Form from '../Form';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import useCompanyAction from '@/hooks/company/useCompanyAction';
import { Company } from '@/components/types/company';
import {ConfirmationModal} from '../../ui/modal/ConfirmationModal'; 
import toast from 'react-hot-toast';

interface Props {
  company?: Company | null;
  onSuccess?: () => void;
}

export default function FormCompany({ company, onSuccess }: Props) {
  const { createCompany, updateCompany } = useCompanyAction();
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [showConfirm, setShowConfirm] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const isUpdate = !!company;

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        address: company.address,
        contact: company.contact,
      });
    } else {
      setFormData({});
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      console.error('Name and address required');
      return;
    }

    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    const loadingToast = toast.loading(isUpdate ? 'Memperbarui data...' : 'Menyimpan data...');
    try {
      if (isUpdate && company?.id) {
        await updateCompany(company.id, formData as Company);
        toast.success('Data perusahaan berhasil diperbarui');
      } else {
        await createCompany(formData as Omit<Company, 'id'>);
        toast.success('Data perusahaan berhasil dibuat');
        setFormData({});
      }
      onSuccess?.();
    } catch (err) {
      toast.error('Terjadi kesalahan saat menyimpan');
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, address: value }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <ComponentCard title={isUpdate ? 'Update Company' : 'Create Company'}>
          <div className="gap-4">
            <div>
              <Label>Nama Perusahaan</Label>
              <Input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Nama lengkap"
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
      </Form>

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        title={isUpdate ? 'Update Perusahaan?' : 'Tambah Perusahaan?'}
        description={
          isUpdate
            ? `Perusahaan "${formData.name}" akan diperbarui. Apakah Anda yakin?`
            : `Perusahaan baru akan ditambahkan dengan nama "${formData.name}". Lanjutkan?`
        }
        confirmText={isUpdate ? 'Update' : 'Submit'}
        cancelText="Batal"
        isLoading={isSubmitting}
      />
    </>
  );
}
