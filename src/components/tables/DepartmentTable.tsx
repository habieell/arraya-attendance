"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormDepartment from "@/components/form/admin/FormDepartment";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useDepartment } from "@/hooks/department/useDepartment";
import { Department } from "@/components/types/department";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useDepartmentAction from '@/hooks/department/useDepartmentAction';

export default function DepartmentTable() {
    const { deleteDepartment } = useDepartmentAction();
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { department, loading, error, refetch } = useDepartment();
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
                    setSelectedDepartment(null);
                }}
            >
                <FormDepartment
                    department={
                        selectedDepartment
                            ? {
                                id: selectedDepartment.id,
                                name: selectedDepartment.name,
                                company_id: selectedDepartment.company?.id ? String(selectedDepartment.company.id) : '',
                                branch_id: selectedDepartment.branch?.id ? String(selectedDepartment.branch.id) : '',
                                director_id: selectedDepartment.director?.id ? String(selectedDepartment.director.id) : '',
                            }
                            : null
                    }
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedDepartment(null);
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
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Perusahaan</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(department) && department.length > 0 ? (
                                    department.map((department) => (
                                        <TableRow
                                            key={department.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedDepartment(department)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{department.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{department.company?.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDepartment(department);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedDepartment(department);
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
                                            Data department tidak tersedia.
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
                    setSelectedDepartment(null);
                }}
                onConfirm={() => {
                    if (selectedDepartment?.id) {
                        deleteDepartment(selectedDepartment.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedDepartment(null);
                }}
                title="Hapus data ini?"
                description={`department "${selectedDepartment?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}
