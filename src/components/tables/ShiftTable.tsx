"use client"
import React, { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormShift from "@/components/form/admin/FormShift";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useShift } from "@/hooks/shift/useShift";
import { Shift } from "@/components/types/shift";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../ui/modal/ConfirmationModal";
import useShiftAction from '@/hooks/shift/useShiftAction';

export default function ShiftTable() {
    const { deleteShift } = useShiftAction();
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
    const { shift, loading, error, refetch } = useShift();
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
                    setSelectedShift(null);
                }}
            >
                <FormShift
                    shift={
                        selectedShift
                            ? {
                                id: selectedShift.id,
                                company_id: selectedShift.company?.id ? String(selectedShift.company.id) : '',
                                name: selectedShift.name,
                                start_time: selectedShift.start_time,
                                end_time: selectedShift.end_time,
                            }
                            : null
                    }
                    onSuccess={() => {
                        refetch();
                        closeModal();
                        setSelectedShift(null);
                    }}
                />
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Perusahaan</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Name</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Jam Masuk</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Jam Pulang</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(shift) && shift.length > 0 ? (
                                    shift.map((shift) => (
                                        <TableRow
                                            key={shift.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedShift(shift)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{shift.company.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{shift.name}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                {shift.start_time
                                                    ? new Date(shift.start_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                                                    : '-'}
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                {shift.end_time
                                                    ? new Date(shift.end_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedShift(shift);
                                                            openModal();
                                                        }}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedShift(shift);
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
                                            Data Shift tidak tersedia.
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
                    setSelectedShift(null);
                }}
                onConfirm={() => {
                    if (selectedShift?.id) {
                        deleteShift(selectedShift.id, () => {
                            refetch();
                        });
                    }
                    setShowConfirm(false);
                    setSelectedShift(null);
                }}
                title="Hapus data ini?"
                description={`Posisi "${selectedShift?.name}" akan dihapus secara permanen.`}
                confirmText="Hapus"
                cancelText="Batal"
            />

        </>
    )
}
