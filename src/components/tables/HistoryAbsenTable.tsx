"use client"
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Table, TableBody, TableCell, TableHeader, TableRow, } from "../ui/table";
import { useAttendance } from "@/hooks/attendance/useAttendance";
import { Attendance } from "@/components/types/attendance";
import AbsenDetailModal from "../../components/example/ModalExample/DetailAbsenModal"
import PhotoModal from "@/components/example/ModalExample/PhotoModal";
import {View} from "lucide-react"


export default function HistoryAbsenTable() {
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
    const { attendance, loading, error, refetch } = useAttendance();
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const openPhoto = (link: string | null) => {
        setSelectedPhoto(link);
        setShowPhotoModal(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Terjadi kesalahan saat memuat data.</p>;
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1000px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                                <TableRow>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Tanggal</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Karyawan</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Jam Masuk</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Jam Pulang</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Foto Masuk</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Foto Pulang</TableCell>
                                    <TableCell isHeader className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">Aksi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Array.isArray(attendance) && attendance.length > 0 ? (
                                    attendance.map((attendance) => (
                                        <TableRow
                                            key={attendance.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                                            onClick={() => setSelectedAttendance(attendance)}
                                        >
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                {attendance.date
                                                    ? new Date(attendance.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{attendance.user.name ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{attendance.chek_in_time ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">{attendance.chek_out_time ?? "-"}</TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <button
                                                    onClick={() => openPhoto(attendance.photo_in)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    <View size={18} /> Lihat Foto
                                                </button>
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <button
                                                    onClick={() => openPhoto(attendance.photo_out)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                >
                                                    <View size={18} /> Lihat Foto
                                                </button>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedAttendance(attendance);
                                                            setShowDetailModal(true); // Tampilkan modal detail
                                                        }}
                                                        className="text-yellow-600 hover:text-yellow-800"
                                                    >
                                                        <View size={18} />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                            Data attendance tidak tersedia.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <AbsenDetailModal
                isOpen={showDetailModal}
                onClose={() => {
                    setSelectedAttendance(null);
                    setShowDetailModal(false);
                }}
                attendance={selectedAttendance}
            />

            <PhotoModal
                isOpen={showPhotoModal}
                onClose={() => setShowPhotoModal(false)}
                link={selectedPhoto}
            />


        </>
    )
}
