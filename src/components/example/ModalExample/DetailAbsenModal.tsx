"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Attendance } from "@/components/types/attendance";
import { getLocation } from '@/hooks/getLokasi'
import { X } from "lucide-react";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    attendance: Attendance | null;
}

export default function DetailAbsenModal({ isOpen, onClose, attendance }: Props) {

    const [lokasiMasuk, setLokasiMasuk] = useState<string | null>(null);
    const [lokasiPulang, setLokasiPulang] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            if (attendance?.latitude_in && attendance?.longitude_in) {
                const lokasi = await getLocation(attendance.latitude_in, attendance.longitude_in);
                setLokasiMasuk(lokasi);
            }
            if (attendance?.latitude_out && attendance?.longitude_out) {
                const lokasi = await getLocation(attendance.latitude_out, attendance.longitude_out);
                setLokasiPulang(lokasi);
            }
        };

        fetchLocation();
    }, [attendance]);
    const getStatus = (item: Attendance): string => {
        const checkInStr = item.chek_in_time;
        const checkOutStr = item.chek_out_time;
        const shiftStartStr = item.user.company?.shift?.start_time;

        if (!shiftStartStr) return "-";

        const shiftStart = new Date(`1970-01-01T${shiftStartStr}`);
        const checkIn = checkInStr ? new Date(`1970-01-01T${checkInStr}`) : null;
        const checkOut = checkOutStr ? new Date(`1970-01-01T${checkOutStr}`) : null;

        if (!checkIn && !checkOut) return "Tidak Absen";
        if (checkIn && !checkOut) return "Belum Checkout";
        if (!checkIn && checkOut) return "Tidak Absen Masuk";

        if (checkIn) {
            const selisihMenit = (checkIn.getTime() - shiftStart.getTime()) / (1000 * 60);
            if (selisihMenit > 10) return "Terlambat";
            return "Tepat Waktu";
        }

        return "-";
    };

    if (!attendance) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" aria-hidden="true" />

            <div className="relative z-[9999] max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Detail Absensi
                </Dialog.Title>
                <p>  {new Date(attendance.date).toLocaleDateString("id-ID")}</p>

                <div className="flex items-center gap-6 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {attendance.user.profile?.full_name}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{attendance.user.department.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{attendance.user.position.name}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 mb-8">
                    <p><strong>Jam Masuk </strong>
                        {attendance.chek_in_time
                            ? new Date(attendance.chek_in_time).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })
                            : '-'}
                    </p>
                    <p><strong>Lokasi Absen masuk</strong> {lokasiMasuk ?? "-"}</p>
                    <p><strong>Status</strong> {attendance.user.profile?.phone_number ?? "-"}</p>
                    <p><strong>Jam Pulang</strong> {attendance.user.company?.name ?? "-"}</p>
                    <p><strong>Lokasi Absen Pulang</strong> {lokasiPulang ?? "-"}</p>
                    <p><strong>Status</strong> {getStatus(attendance)}</p>
                </div>

            </div>
        </Dialog>
    );
}
