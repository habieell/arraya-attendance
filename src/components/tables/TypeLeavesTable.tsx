"use client"
import React, { useState} from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormTypeLeaves from "@/components/form/admin/FormTypeLeave";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useTypeLeaves } from "@/hooks/typeLeaves/useTypeLeaves";
import { TypeLeaves } from "@/components/types/typeLeaves";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useTypeLeavesAction from '@/hooks/typeLeaves/useTypeLeavesAction';

export default function TypeLeavesTable() {
    const { deleteTypeLeaves } = useTypeLeavesAction();
    const [selectedTypeLeaves, setSelectedTypeLeaves] = useState<TypeLeaves | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { typeLeaves, loading, error, refetch } = useTypeLeaves();
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
                    setSelectedTypeLeaves(null);
                }}
            >
                <FormTypeLeaves
                    typeLeaves={
                        selectedTypeLeaves
                            ? {
                                id: selectedTypeLeaves.id,
                                code: selectedTypeLeaves.code,
                                name: selectedTypeLeaves.name,
                            }
                            : null
                    }
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedTypeLeaves(null);
                    }}
                />
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Code</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Name</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(typeLeaves) && typeLeaves.length > 0 ? (
                                    typeLeaves.map((typeLeaves) => (
                                        <TableRow
                                            key={typeLeaves.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedTypeLeaves(typeLeaves)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{typeLeaves.code}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{typeLeaves.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTypeLeaves(typeLeaves);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTypeLeaves(typeLeaves);
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
                                            Data Type Leaves tidak tersedia.
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
                    setSelectedTypeLeaves(null);
                }}
                onConfirm={() => {
                    if (selectedTypeLeaves?.id) {
                        deleteTypeLeaves(selectedTypeLeaves.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedTypeLeaves(null);
                }}
                title="Hapus data ini?"
                description={`Type Leaves "${selectedTypeLeaves?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}