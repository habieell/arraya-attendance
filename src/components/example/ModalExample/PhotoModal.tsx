"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  link: string | null; // ini adalah link foto (photo_in atau photo_out)
}

export default function PhotoModal({ isOpen, onClose, link }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" aria-hidden="true" />

      <div className="relative z-[9999] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800 flex flex-col items-center">
        <Dialog.Title className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Detail Foto
        </Dialog.Title>

        {link ? (
          <Image
            src={link}
            alt="Foto Absensi"
            width={400}
            height={400}
            className="rounded-lg object-contain"
          />
        ) : (
          <p className="text-gray-500">Foto tidak tersedia</p>
        )}
      </div>
    </Dialog>
  );
}
