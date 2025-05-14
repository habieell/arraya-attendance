"use client";

import React, { useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HeroUIDatePicker } from "../../calendar/HeroUIDatePicker";
import { User } from "@/components/types/user";
import { Attendance } from "@/components/types/attendance";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  attendance: Attendance[];
}

export default function UserDetailModal({ isOpen, onClose, user, attendance }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const filteredAttendance = useMemo(() => {
    if (!user) return [];

    return attendance?.filter((a) => {
      const dateMonth = a.date instanceof Date
        ? a.date.toISOString().slice(0, 7)
        : new Date(a.date).toISOString().slice(0, 7);

      return selectedMonth ? dateMonth === selectedMonth : true;
    });
  }, [attendance, selectedMonth, user]);

  const getKeterangan = (item: Attendance): string => {
    const checkInStr = item.chek_in_time;
    const checkOutStr = item.chek_out_time;
    const shiftStartStr = item.user.company?.shift?.start_time;
    const shiftEndStr = item.user.company?.shift?.end_time;

    if (!shiftStartStr || !shiftEndStr) return "-";

    const shiftStart = new Date(`1970-01-01T${shiftStartStr}`);
    const shiftEnd = new Date(`1970-01-01T${shiftEndStr}`);
    const checkIn = checkInStr ? new Date(`1970-01-01T${checkInStr}`) : null;
    const checkOut = checkOutStr ? new Date(`1970-01-01T${checkOutStr}`) : null;

    if (!checkIn && !checkOut) return "Tidak Absen";
    if (checkIn && !checkOut) return "Belum Checkout";
    if (!checkIn && checkOut) return "Tidak Absen Masuk";

    const isLate = checkIn !== null && checkIn > shiftStart;
    const isEarlyLeave = checkOut !== null && checkOut < shiftEnd;

    if (isLate && isEarlyLeave) return "Terlambat & Pulang Cepat";
    if (isLate) return "Terlambat";
    if (isEarlyLeave) return "Pulang Cepat";

    return "Tepat Waktu";
  };


  const exportToExcel = () => {
    if (!user) return;

    const hasData = filteredAttendance.length > 0;

    const worksheetData = hasData
      ? filteredAttendance.map((item) => {
        const status = getKeterangan(item);
        return {
          Tanggal: new Date(item.date).toLocaleDateString("id-ID"),
          Status: status,
          "Jam Masuk": item.chek_in_time || "-",
          "Jam Keluar": item.chek_out_time || "-",
        };
      })
      : [
        {
          Tanggal: "",
          Status: "",
          "Jam Masuk": "",
          "Jam Keluar": "",
        },
      ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `Riwayat_Absensi_${user.name}.xlsx`);
  };


  if (!user) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" aria-hidden="true" />

      <div className="relative z-[9999] max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <Dialog.Title className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Detail Karyawan
        </Dialog.Title>

        <div className="flex items-center gap-6 mb-6">
          <Image
            src={user.profile?.photo || '/images/user/user-01.jpg'}
            width={80}
            height={80}
            className="rounded-full"
            alt={user.name}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.profile?.full_name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{user.role.name}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 mb-8">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.profile?.phone_number ?? "-"}</p>
          <p><strong>Company:</strong> {user.company?.name ?? "-"}</p>
          <p><strong>Tempat & Tanggal Lahir:</strong> {user.profile?.birth_place ?? "-"}, {user.profile?.birth_date ?? "-"}</p>
          <p><strong>Alamat:</strong> {user.profile?.address ?? "-"}</p>
          <p><strong>Posisi</strong> {user.position?.name ?? "-"}</p>
          <p><strong>Department</strong> {user.department?.name ?? "-"}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Filter Bulan:
          </label>
          <div className="flex items-center gap-3">
            <HeroUIDatePicker onChange={(val) => setSelectedMonth(val)} />
            <button
              onClick={() => setSelectedMonth("")}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset Bulan
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Riwayat Absensi</h3>
          <div className="overflow-auto rounded-lg border border-gray-200 dark:border-white/10">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
              <thead className="bg-gray-100 dark:bg-white/[0.05]">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Jam Masuk</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Jam Keluar</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredAttendance.map((item, idx) => {
                  const keterangan = getKeterangan(item);

                  const keteranganColor =
                    keterangan === "Tepat Waktu"
                      ? "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400"
                      : keterangan === "Terlambat"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600/20 dark:text-yellow-300"
                        : keterangan === "Pulang Cepat"
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300"
                          : keterangan === "Terlambat & Pulang Cepat"
                            ? "bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-300"
                            : keterangan === "Belum Checkout"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:text-purple-300"
                              : keterangan === "Tidak Absen" || keterangan === "Tidak Absen Masuk"
                                ? "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white"
                                : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white";

                  return (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                        {new Date(item.date).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                        {item.chek_in_time || "-"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                        {item.chek_out_time || "-"}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${keteranganColor}`}>
                          {keterangan}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-between flex-wrap gap-2">
          <button
            onClick={exportToExcel}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Export to Excel
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </Dialog>
  );
}
