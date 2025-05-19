"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { LeaveApproval } from "@/components/types/leaveApproval";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: LeaveApproval;
}

export default function LeaveApproveDetailModal({ isOpen, onClose, data }: Props) {
  const LeaveApproval = data;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Detail Approval
          </Dialog.Title>

          {/* FOTO & NAMA */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={LeaveApproval.leave.user.profile?.photo || "/images/user/user-17.jpg"}
              alt={LeaveApproval.leave.user.name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {LeaveApproval.leave.user.profile?.full_name || "-"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {LeaveApproval.leave.user.department?.name || "-"}
              </p>
            </div>
          </div>

          {/* DETAIL IZIN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700 dark:text-gray-300 mb-8">
            <p><span className="font-semibold">Jenis Izin:</span> {LeaveApproval.leave.type_leave?.name || "-"}</p>
            <p><span className="font-semibold">Tanggal Pengajuan:</span> 
              {LeaveApproval.leave.created_at 
                ? new Date(LeaveApproval.leave.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
                : '-'}</p>
            <p><span className="font-semibold">Mulai:</span> 
              {LeaveApproval.leave.start_date 
                ? new Date(LeaveApproval.leave.start_date).toLocaleDateString('id-ID') 
                : '-'}</p>
            <p><span className="font-semibold">Hingga:</span> 
              {LeaveApproval.leave.end_date 
                ? new Date(LeaveApproval.leave.end_date).toLocaleDateString('id-ID') 
                : '-'}</p>
            <p className="md:col-span-2"><span className="font-semibold">Deskripsi:</span> {LeaveApproval.leave.description || "-"}</p>
          </div>

          {/* DETAIL APPROVAL */}
          <div className="border-t border-gray-200 dark:border-white/[0.05] pt-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Level Approval:</span> {LeaveApproval.level ?? "-"}</p>
            <p><span className="font-semibold">Diapprove oleh:</span> {LeaveApproval.approved_by?.profile?.full_name ?? "-"}</p>
            <p><span className="font-semibold">Status:</span> {LeaveApproval.status ?? "-"}</p>
            <p><span className="font-semibold">Catatan:</span> {LeaveApproval.note ?? "-"}</p>
            <p><span className="font-semibold">Tanggal Approve:</span> 
              {LeaveApproval.approved_at 
                ? new Date(LeaveApproval.approved_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
                : '-'}</p>
          </div>

          {/* FOTO BUKTI */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">URL Foto Bukti</p>
            <div className="inline-block text-base px-5 py-2 rounded-full font-semibold break-words">
              {LeaveApproval.leave.url_photo ?? "-"}
            </div>
          </div>

          {/* TOMBOL TUTUP */}
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
