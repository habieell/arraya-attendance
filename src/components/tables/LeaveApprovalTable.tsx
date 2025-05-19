"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import LeaveApproveDetailModal from "../example/ModalExample/LeaveApproveDetailModal";
import { LeaveApproval } from "@/components/types/leaveApproval"
import Image from "next/image";
import { useLeaveApproval } from "../../hooks/leave-approval/useLeaveApproval"

export default function LeaveApproveTable() {
    const [selectedLeaveApprove, setSelectedLeaveApprove] = useState<LeaveApproval | null>(null);
    const { leaveApproval, loading: loadingLeave } = useLeaveApproval();


    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[1100px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Nama</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Jenis Izin</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Approved</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Status</TableCell>
                                    <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-white">Tanggal Approve</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(leaveApproval) && leaveApproval.length > 0 ? (
                                    leaveApproval.map((l, index) => (
                                        <TableRow
                                            key={`${l.id}-${index}`}
                                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                                            onClick={() => setSelectedLeaveApprove(l)}
                                        >
                                            <TableCell className="px-5 py-4 text-sm text-gray-800 dark:text-white/90">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                        <Image
                                                            src={l.leave.user.profile?.photo || '/images/user/user-01.jpg'}
                                                            alt={l.leave.user.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span>{l.leave.user.profile?.full_name}</span>
                                                    <span>{l.leave.user.department.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-white">{l.leave.type_leave.name}</TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-white">{l.approved_by.name}</TableCell>
                                            <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-white">{l.status}</TableCell>
                                              <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                {l.approved_at
                                                    ? new Date(l.approved_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                                    : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            Belum ada Approvan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            {selectedLeaveApprove && (
                <LeaveApproveDetailModal
                    isOpen={true}
                    onClose={() => setSelectedLeaveApprove(null)}
                    data={selectedLeaveApprove}
                />
            )}
        </>
    );
}
