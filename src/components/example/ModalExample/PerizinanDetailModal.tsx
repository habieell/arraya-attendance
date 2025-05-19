"use client";

import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Leave } from "@/components/types/leave";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PerizinanTemplatePdf from "@/components/template/PerizinanTemplate";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Leave;
}

export default function PerizinanDetailModal({ isOpen, onClose, data }: Props) {
  const leave = data;
  const pdfRef = useRef<HTMLDivElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfContentRef.current) return;

    const pages = pdfContentRef.current.querySelectorAll(".pdf-page");
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i] as HTMLElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("formulir-tugas-dinas.pdf");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* BACKDROP BLUR */}
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 dark:bg-gray-900/10" />

        {/* MODAL CONTENT */}
        <div ref={pdfRef} className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-xl">
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
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {leave.user.profile?.full_name || "-"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {leave.user.department?.name}
              </p>
            </div>
          </div>

          {/* DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Jenis Izin:</span> {leave.type_leave?.name ?? "-"}</p>
            <p><span className="font-semibold">Tanggal Pengajuan:</span>
              {leave.created_at
                ? new Date(leave.created_at).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : '-'}
            </p>
            <p><span className="font-semibold">Mulai:</span>
              {leave.start_date
                ? new Date(leave.start_date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : '-'}
            </p>
            <p><span className="font-semibold">Hingga:</span>
              {leave.end_date
                ? new Date(leave.end_date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                : '-'}
            </p>
            <p><span className="font-semibold">Deskripsi:</span> {leave.description}</p>
          </div>

          {/* FOTO */}
          <div className="mt-8 mx-auto text-center">
            <Image
              src={leave.url_photo}
              alt="Foto Absensi"
              width={400}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>

          <div className="mt-8 flex justify-between">
            <div
              style={{
                position: "absolute",
                top: "-9999px",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <div ref={pdfContentRef}>
                <PerizinanTemplatePdf data={data} />
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Download PDF
            </button>
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
