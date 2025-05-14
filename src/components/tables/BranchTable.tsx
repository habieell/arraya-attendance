"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormBranch from "@/components/form/admin/FormBranch";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useBranch } from "@/hooks/branch/useBranch";
import { Branch } from "@/components/types/branch";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useBranchAction from '@/hooks/branch/useBranchAction';

export default function BranchTable() {
    const { deleteBranch } = useBranchAction();
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { branch, loading, error, refetch } = useBranch();
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
                    setSelectedBranch(null);
                }}
            >
                <FormBranch
                    branch={
                        selectedBranch
                            ? {
                                id: selectedBranch.id,
                                company_id: selectedBranch.company?.id ? String(selectedBranch.company.id) : '',
                                name: selectedBranch.name,
                                address: selectedBranch.address,
                                contact: selectedBranch.contact,
                            }
                            : null
                    }
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedBranch(null);
                    }}
                />
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Cabang</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Perusahaan</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Alamat</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Contact</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(branch) && branch.length > 0 ? (
                                    branch.map((branch) => (
                                        <TableRow
                                            key={branch.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedBranch(branch)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{branch.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{branch.company.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{branch.address ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{branch.contact ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBranch(branch);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBranch(branch);
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
                                            Data branch tidak tersedia.
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
                    setSelectedBranch(null);
                }}
                onConfirm={() => {
                    if (selectedBranch?.id) {
                        deleteBranch(selectedBranch.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedBranch(null);
                }}
                title="Hapus data ini?"
                description={`Posisi "${selectedBranch?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}
