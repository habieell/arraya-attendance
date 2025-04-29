"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import PerizinanDetailModal from "../example/ModalExample/PerizinanDetailModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/button/Button"; // Import button kamu

interface Permission {
  date: string;
  startDate: string;
  endDate: string;
  type: "Izin" | "Sakit" | "Cuti";
  reason: string;
  status: "Disetujui" | "Ditolak" | "Menunggu";
}

interface UserPermission {
  id: number;
  name: string;
  email: string;
  department: string;
  image?: string;
  permissions: Permission[];
}

const permissionData: UserPermission[] = [
  {
    id: 1,
    name: "Lindsey Curtis",
    email: "lindsey@example.com",
    department: "HRD",
    image: "/images/user/user-17.jpg",
    permissions: [
      {
        date: "2025-04-01",
        startDate: "2025-04-02",
        endDate: "2025-04-05",
        type: "Cuti",
        reason: "Liburan keluarga",
        status: "Disetujui",
      },
      {
        date: "2025-04-10",
        startDate: "2025-04-11",
        endDate: "2025-04-11",
        type: "Izin",
        reason: "Keperluan pribadi",
        status: "Menunggu",
      },
    ],
  },
  {
    id: 2,
    name: "Kaiya George",
    email: "kaiya@example.com",
    department: "Finance",
    image: "/images/user/user-18.jpg",
    permissions: [
      {
        date: "2025-04-03",
        startDate: "2025-04-04",
        endDate: "2025-04-06",
        type: "Sakit",
        reason: "Demam tinggi",
        status: "Ditolak",
      },
    ],
  },
  {
    id: 3,
    name: "Adrian Moore",
    email: "adrian@example.com",
    department: "IT",
    image: "/images/user/user-19.jpg",
    permissions: [
      {
        date: "2025-04-04",
        startDate: "2025-04-05",
        endDate: "2025-04-07",
        type: "Cuti",
        reason: "Pernikahan keluarga",
        status: "Disetujui",
      },
    ],
  },
  {
    id: 4,
    name: "Sophia Kim",
    email: "sophia@example.com",
    department: "Marketing",
    image: "/images/user/user-20.jpg",
    permissions: [
      {
        date: "2025-04-06",
        startDate: "2025-04-07",
        endDate: "2025-04-09",
        type: "Izin",
        reason: "Urusan kampus",
        status: "Menunggu",
      },
    ],
  },
  {
    id: 5,
    name: "Noah Smith",
    email: "noah@example.com",
    department: "IT",
    image: "/images/user/user-21.jpg",
    permissions: [
      {
        date: "2025-04-07",
        startDate: "2025-04-08",
        endDate: "2025-04-08",
        type: "Sakit",
        reason: "Sakit kepala",
        status: "Disetujui",
      },
    ],
  },
  {
    id: 6,
    name: "Ava Johnson",
    email: "ava@example.com",
    department: "Legal",
    image: "/images/user/user-22.jpg",
    permissions: [
      {
        date: "2025-04-08",
        startDate: "2025-04-09",
        endDate: "2025-04-10",
        type: "Cuti",
        reason: "Pulang kampung",
        status: "Ditolak",
      },
    ],
  },
  {
    id: 7,
    name: "Liam Garcia",
    email: "liam@example.com",
    department: "Finance",
    image: "/images/user/user-23.jpg",
    permissions: [
      {
        date: "2025-04-09",
        startDate: "2025-04-10",
        endDate: "2025-04-11",
        type: "Izin",
        reason: "Perpanjangan SIM",
        status: "Menunggu",
      },
    ],
  },
  {
    id: 8,
    name: "Emma Brown",
    email: "emma@example.com",
    department: "HRD",
    image: "/images/user/user-24.jpg",
    permissions: [
      {
        date: "2025-04-10",
        startDate: "2025-04-11",
        endDate: "2025-04-13",
        type: "Cuti",
        reason: "Acara keluarga",
        status: "Disetujui",
      },
    ],
  },
  {
    id: 9,
    name: "William Lee",
    email: "william@example.com",
    department: "Marketing",
    image: "/images/user/user-25.jpg",
    permissions: [
      {
        date: "2025-04-11",
        startDate: "2025-04-12",
        endDate: "2025-04-13",
        type: "Sakit",
        reason: "Radang tenggorokan",
        status: "Disetujui",
      },
    ],
  },
  {
    id: 10,
    name: "Isabella Walker",
    email: "isabella@example.com",
    department: "Legal",
    image: "/images/user/user-26.jpg",
    permissions: [
      {
        date: "2025-04-12",
        startDate: "2025-04-13",
        endDate: "2025-04-13",
        type: "Izin",
        reason: "Kepentingan keluarga",
        status: "Menunggu",
      },
    ],
  },
];

export default function PerizinanTable() {
  const [selectedPermission, setSelectedPermission] = useState<{
    user: UserPermission;
    permission: Permission;
  } | null>(null);

  const [role, setRole] = useState<string | undefined>();

  useEffect(() => {
    const userRole = Cookies.get('userRole');
    setRole(userRole);
  }, []);

  const handleExport = () => {
    const dataToExport = permissionData.flatMap((user) =>
      user.permissions.map((p) => ({
        Nama: user.name,
        Email: user.email,
        Departemen: user.department,
        Jenis_Izin: p.type,
        Alasan: p.reason,
        Status: p.status,
        Tanggal_Pengajuan: p.date,
        Dari_Tanggal: p.startDate,
        Sampai_Tanggal: p.endDate,
      }))
    );

    if (dataToExport.length === 0) {
      toast.error("Tidak ada data untuk diekspor!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataPerizinan");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "data-perizinan.xlsx");

    toast.success("Data berhasil diekspor!");
  };

  const handleApprove = (e: React.MouseEvent, user: UserPermission, permission: Permission) => {
    e.stopPropagation();
    toast.success(`Izin ${permission.type} oleh ${user.name} telah Disetujui!`);
    // Logic update status "Disetujui" bisa dibuat disini kalau dynamic
  };

  const handleReject = (e: React.MouseEvent, user: UserPermission, permission: Permission) => {
    e.stopPropagation();
    toast.error(`Izin ${permission.type} oleh ${user.name} telah Ditolak!`);
    // Logic update status "Ditolak" bisa dibuat disini kalau dynamic
  };

  return (
    <>
      {role === "hr" && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export Data Perizinan
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Nama</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Departemen</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Jenis Izin</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Alasan</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Pengajuan</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {permissionData.map((user) =>
                  user.permissions.map((p, index) => (
                    <TableRow
                      key={`${user.id}-${index}`}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                      onClick={() => setSelectedPermission({ user, permission: p })}
                    >
                      <TableCell className="px-5 py-4 text-sm text-gray-800 dark:text-white/90">{user.name}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.department}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{p.type}</TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{p.reason}</TableCell>
                      <TableCell className="px-5 py-4 text-sm">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            p.status === "Disetujui"
                              ? "bg-[#ecfdf3] text-[#039855]"
                              : p.status === "Ditolak"
                              ? "bg-[#fef3f2] text-[#d92d20]"
                              : "bg-[#fffaeb] text-[#dc6803]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{p.date}</TableCell>
                      <TableCell className="px-5 py-4 text-sm">
                        {p.status === "Menunggu" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-500 text-white"
                              onClick={(e) => handleApprove(e, user, p)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 text-white"
                              onClick={(e) => handleReject(e, user, p)}
                            >
                              Tolak
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {selectedPermission && (
        <PerizinanDetailModal
          isOpen={true}
          onClose={() => setSelectedPermission(null)}
          data={selectedPermission}
        />
      )}
    </>
  );
}
