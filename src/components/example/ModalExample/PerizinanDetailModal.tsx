"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Leave } from "@/components/types/leave";


interface Props {
  isOpen: boolean;
  onClose: () => void;
    data: Leave;
}

export default function PerizinanDetailModal({ isOpen, onClose, data }: Props) {
const leave = data;

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
              src={leave.user.profile?.photo || "/images/user/user-17.jpg"}
              alt={leave.user.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{leave.user.profile?.full_name || "-"}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{leave.user.department.name}</p>
            </div>
          </div>

          {/* DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Jenis Izin:</span>{leave.TypeLeave.name}</p>
            <p><span className="font-semibold">Tanggal Pengajuan:</span>
              {leave.created_at
                ? new Date(leave.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                : '-'}
            </p>
            <p><span className="font-semibold">Mulai:</span>
              {leave.start_date
                ? new Date(leave.start_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                : '-'}
            </p>
            <p><span className="font-semibold">Hingga:</span>
              {leave.end_date
                ? new Date(leave.end_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
                : '-'}
            </p>
            <p><span className="font-semibold">Alasan:</span>{leave.description}</p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Photo</p>
            <div className="inline-block text-base px-5 py-2 rounded-full fon t-semibold">
              {leave.url_photo}
            </div>
          </div>

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
