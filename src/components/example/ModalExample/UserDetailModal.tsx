"use client";

import React, { useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HeroUIDatePicker } from "../../calendar/HeroUIDatePicker";



interface Attendance {
  date: string;
  status: "Hadir" | "Izin" | "Sakit" | "Cuti";
  timeIn?: string;
  timeOut?: string;
  isLate?: boolean;
}

interface UserDetail {
  id: number;
  image: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  company: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  domicile: string;
  attendanceHistory: Attendance[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail | null;
}

export default function UserDetailModal({ isOpen, onClose, user }: Props) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const filteredAttendance = useMemo(() => {
    if (!user) return [];
    return user.attendanceHistory.filter((a) =>
      selectedMonth ? a.date.startsWith(selectedMonth) : true
    );
  }, [user, selectedMonth]);

  const exportToExcel = () => {
    if (!user) return;

    const worksheetData = filteredAttendance.map((item) => ({
      Tanggal: new Date(item.date).toLocaleDateString("id-ID"),
      Status: item.status,
      "Jam Masuk": item.status === "Hadir" ? item.timeIn || "-" : "-",
      "Jam Keluar": item.status === "Hadir" ? item.timeOut || "-" : "-",
      Keterangan:
        item.status === "Hadir"
          ? item.isLate
            ? "Terlambat"
            : "Tepat Waktu"
          : item.status,
    }));

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
            src={user.image}
            width={80}
            height={80}
            className="rounded-full"
            alt={user.name}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{user.role}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300 mb-8">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company}</p>
          <p><strong>Tempat & Tanggal Lahir:</strong> {user.birthPlace}, {user.birthDate}</p>
          <p><strong>Alamat:</strong> {user.address}</p>
          <p><strong>Domisili:</strong> {user.domicile}</p>
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
                {filteredAttendance.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">
                      {new Date(item.date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold
                          ${
                            item.status === "Hadir"
                              ? "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400"
                              : item.status === "Izin"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600/20 dark:text-yellow-300"
                              : item.status === "Sakit"
                              ? "bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-300"
                              : item.status === "Cuti"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300"
                              : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                      {item.status === "Hadir" ? item.timeIn || "-" : "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                      {item.status === "Hadir" ? item.timeOut || "-" : "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                      {item.status === "Hadir"
                        ? item.isLate
                          ? "Terlambat"
                          : "Tepat Waktu"
                        : item.status}
                    </td>
                  </tr>
                ))}
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
