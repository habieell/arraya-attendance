"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import PerizinanDetailModal from "../example/ModalExample/PerizinanDetailModal";
import { Leave } from "@/components/types/leave"
import Image from "next/image";
import { useLeave } from "../../hooks/leave/useLeave"

export default function LeaveTable() {
    const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
    const { leave, loading: loadingLeave } = useLeave();

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="py-3 text-sm font-medium text-gray-700 dark:text-white">Tanggal Pengajuan</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Nama</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Departemen</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Jenis Izin</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(leave) && leave.length > 0 ? (
                                    leave.map((l, index) => (
                                        <TableRow
                                            key={`${l.id}-${index}`}
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                            onClick={() => setSelectedLeave(l)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                {l.created_at
                                                    ? new Date(l.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-800 dark:text-white/90">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                        <Image
                                                            src={l.user.profile?.photo || '/images/user/user-01.jpg'}
                                                            alt={l.user.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span>{l.user.profile?.full_name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-white text-center">{l.user.department?.name?? "-"}</TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-white text-center">{l.type_leave?.name?? "-"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            Belum ada perizinan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            {selectedLeave && (
                <PerizinanDetailModal
                    isOpen={true}
                    onClose={() => setSelectedLeave(null)}
                    data={selectedLeave}
                />
            )}
        </>
    );
}
