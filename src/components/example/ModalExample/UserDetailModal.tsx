"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

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
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail | null;
}

export default function UserDetailModal({ isOpen, onClose, user }: Props) {
  if (!user) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" aria-hidden="true" />

      {/* MODAL CONTENT */}
      <div className="relative z-[9999] max-w-md w-full p-4">
        <Dialog.Panel className="w-full rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
          <Dialog.Title className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Detail Karyawan
          </Dialog.Title>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={user.image}
              width={60}
              height={60}
              className="rounded-full"
              alt={user.name}
            />
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">{user.role}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <p><strong>Tempat & Tanggal Lahir:</strong> {user.birthPlace}, {user.birthDate}</p>
            <p><strong>Alamat:</strong> {user.address}</p>
            <p><strong>Domisili:</strong> {user.domicile}</p>
          </div>
          <div className="mt-6 text-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Tutup
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
