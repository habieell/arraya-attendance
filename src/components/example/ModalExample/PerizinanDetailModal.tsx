"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

interface Permission {
  date: string;        // Tanggal pengajuan
  startDate: string;   // Tanggal mulai izin
  endDate: string;     // Tanggal akhir izin
  type: "Izin" | "Sakit" | "Cuti";
  reason: string;
  status: "Disetujui" | "Ditolak" | "Menunggu";
}

interface UserPermission {
  id: number;
  name: string;
  email: string;
  department: string;
  permissions: Permission[];
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: {
    user: UserPermission;
    permission: Permission;
  };
}

export default function PerizinanDetailModal({ isOpen, onClose, data }: Props) {
  const { user, permission } = data;

  const statusColor =
    permission.status === "Disetujui"
      ? "bg-[#ecfdf3] text-[#039855]"
      : permission.status === "Ditolak"
      ? "bg-[#fef3f2] text-[#d92d20]"
      : "bg-[#fffaeb] text-[#dc6803]";

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Detail Perizinan
          </Dialog.Title>

          {/* FOTO & NAMA */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={user.image || "/images/user/user-17.jpg"}
              alt={user.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.department}</p>
            </div>
          </div>

          {/* DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Departemen:</span> {user.department}</p>
            <p><span className="font-semibold">Jenis Izin:</span> {permission.type}</p>
            <p><span className="font-semibold">Alasan:</span> {permission.reason}</p>
            <p><span className="font-semibold">Tanggal Pengajuan:</span> {permission.date}</p>
            <p><span className="font-semibold">Tanggal Mulai:</span> {permission.startDate}</p>
            <p><span className="font-semibold">Tanggal Hingga:</span> {permission.endDate}</p>
          </div>

          {/* STATUS DI BAWAH */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status Perizinan</p>
            <div className={`inline-block text-base px-5 py-2 rounded-full font-semibold ${statusColor}`}>
              {permission.status}
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-8 text-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
