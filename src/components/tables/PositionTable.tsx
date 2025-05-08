"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormPosition from "@/components/form/admin/FormPosition";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { usePosition } from "@/hooks/position/usePosition";
import { Position } from "@/components/types/position";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import usePositionAction from '@/hooks/position/usePositionAction';

export default function DepartmentTable() {
    const { deletePosition } = usePositionAction();
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { position, loading, error, refetch } = usePosition();
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
                    setSelectedPosition(null);
                }}
            >
                <FormPosition
                    position={
                        selectedPosition
                            ? {
                                id: selectedPosition.id,
                                name: selectedPosition.name,
                                department_id: selectedPosition.department?.id ? String(selectedPosition.department.id) : '',
                                level: selectedPosition.level,
                            }
                            : null
                    }
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedPosition(null);
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
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Department</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Level</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(position) && position.length > 0 ? (
                                    position.map((position) => (
                                        <TableRow
                                            key={position.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedPosition(position)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{position.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{position.department?.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{position.level}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedPosition(position);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedPosition(position);
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
                    setSelectedPosition(null);
                }}
                onConfirm={() => {
                    if (selectedPosition?.id) {
                        deletePosition(selectedPosition.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedPosition(null);
                }}
                title="Hapus data ini?"
                description={`Posisi "${selectedPosition?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}
