"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormCompany from "@/components/form/create/FormCompany";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useCompany } from "@/hooks/company/useCompany";
import { Company } from "@/components/types/company";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useCompanyAction from '@/hooks/company/useCompanyAction';

export default function CompanyTable() {
    const { deleteCompany, updateCompany } = useCompanyAction();
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { company, loading, error, refetch } = useCompany();
    const [showConfirm, setShowConfirm] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Terjadi kesalahan saat memuat data.</p>;
    return (
        <>
            <div className="text-end">
                <CreateButton onClick={openModal} />
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal();
                    setSelectedCompany(null);
                }}
            >
                <FormCompany
                    company={selectedCompany}
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedCompany(null);
                    }}
                />
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Nama</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Alamat</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Contact</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(company) && company.length > 0 ? (
                                    company.map((company) => (
                                        <TableRow
                                            key={company.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedCompany(company)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{company.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{company.address ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{company.contact ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedCompany(company);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedCompany(company);
                                                            setShowConfirm(true);
                                                        }}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            Data Perusahaan tidak tersedia.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => {
                    setShowConfirm(false);
                    setSelectedCompany(null);
                }}
                onConfirm={() => {
                    if (selectedCompany?.id) {
                        deleteCompany(selectedCompany.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedCompany(null);
                }}
                title="Hapus data ini?"
                description={`Perusahaan "${selectedCompany?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}
