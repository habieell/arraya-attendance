  "use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import UserDetailModal from "../example/ModalExample/UserDetailModal";

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

const usersData: UserDetail[] = [
  {
    id: 1,
    image: "/images/user/user-17.jpg",
    name: "Lindsey Curtis",
    email: "lindsey@example.com",
    role: "Web Designer",
    phone: "+62 812 3456 7890",
    company: "Ay's On You",
    address: "Jl. Melati No. 10, Jakarta",
    birthPlace: "Jakarta",
    birthDate: "1990-01-10",
    domicile: "Jakarta Selatan",
    attendanceHistory: [
      { date: "2025-04-01", status: "Hadir", timeIn: "08:10", timeOut: "17:05", isLate: false },
      { date: "2025-04-02", status: "Izin" },
      { date: "2025-03-15", status: "Sakit" },
    ],
  },
  {
    id: 2,
    image: "/images/user/user-18.jpg",
    name: "Kaiya George",
    email: "kaiya@example.com",
    role: "Project Manager",
    phone: "+62 811 2222 3333",
    company: "Ay's On You",
    address: "Jl. Kenanga No. 15, Bandung",
    birthPlace: "Bandung",
    birthDate: "1988-05-22",
    domicile: "Bandung",
    attendanceHistory: [
      { date: "2025-04-01", status: "Hadir", timeIn: "08:20", timeOut: "17:00", isLate: true },
      { date: "2025-03-22", status: "Hadir", timeIn: "08:00", timeOut: "17:00", isLate: false },
    ],
  },
  {
    id: 3,
    image: "/images/user/user-19.jpg",
    name: "Adrian Moore",
    email: "adrian@example.com",
    role: "Backend Developer",
    phone: "+62 813 2345 6789",
    company: "CodeBase Inc.",
    address: "Jl. Anggrek No. 5, Surabaya",
    birthPlace: "Surabaya",
    birthDate: "1992-08-17",
    domicile: "Surabaya",
    attendanceHistory: [],
  },
  {
    id: 4,
    image: "/images/user/user-20.jpg",
    name: "Sophia Kim",
    email: "sophia@example.com",
    role: "Marketing Specialist",
    phone: "+62 812 9876 5432",
    company: "BrightBrand",
    address: "Jl. Mawar No. 12, Jakarta",
    birthPlace: "Bekasi",
    birthDate: "1993-03-12",
    domicile: "Jakarta Timur",
    attendanceHistory: [
      { date: "2025-04-01", status: "Cuti" },
    ],
  },
  {
    id: 5,
    image: "/images/user/user-21.jpg",
    name: "Noah Smith",
    email: "noah@example.com",
    role: "Accountant",
    phone: "+62 856 1234 5678",
    company: "FinWise",
    address: "Jl. Jambu No. 9, Medan",
    birthPlace: "Medan",
    birthDate: "1991-09-15",
    domicile: "Medan",
    attendanceHistory: [],
  },
  {
    id: 6,
    image: "/images/user/user-22.jpg",
    name: "Ava Johnson",
    email: "ava@example.com",
    role: "UX Designer",
    phone: "+62 822 9988 7766",
    company: "Pixel Studio",
    address: "Jl. Pahlawan No. 20, Yogyakarta",
    birthPlace: "Yogyakarta",
    birthDate: "1995-12-01",
    domicile: "Yogyakarta",
    attendanceHistory: [
      { date: "2025-04-03", status: "Hadir", timeIn: "08:00", timeOut: "17:00", isLate: false },
    ],
  },
  {
    id: 7,
    image: "/images/user/user-23.jpg",
    name: "Liam Garcia",
    email: "liam@example.com",
    role: "Data Analyst",
    phone: "+62 838 4433 2211",
    company: "DataHub",
    address: "Jl. Mangga No. 3, Semarang",
    birthPlace: "Semarang",
    birthDate: "1990-04-28",
    domicile: "Semarang",
    attendanceHistory: [],
  },
  {
    id: 8,
    image: "/images/user/user-24.jpg",
    name: "Emma Brown",
    email: "emma@example.com",
    role: "HR Manager",
    phone: "+62 821 7777 8888",
    company: "HRConnect",
    address: "Jl. Duku No. 22, Jakarta",
    birthPlace: "Tangerang",
    birthDate: "1989-06-18",
    domicile: "Tangerang Selatan",
    attendanceHistory: [
      { date: "2025-04-01", status: "Hadir", timeIn: "08:10", timeOut: "17:05", isLate: false },
    ],
  },
  {
    id: 9,
    image: "/images/user/user-25.jpg",
    name: "William Lee",
    email: "william@example.com",
    role: "Legal Officer",
    phone: "+62 819 0000 1111",
    company: "LawPro",
    address: "Jl. Salak No. 17, Palembang",
    birthPlace: "Palembang",
    birthDate: "1994-10-05",
    domicile: "Palembang",
    attendanceHistory: [],
  },
  {
    id: 10,
    image: "/images/user/user-26.jpg",
    name: "Isabella Walker",
    email: "isabella@example.com",
    role: "Business Analyst",
    phone: "+62 852 4567 7890",
    company: "Insightful",
    address: "Jl. Kamboja No. 8, Bogor",
    birthPlace: "Bogor",
    birthDate: "1996-02-27",
    domicile: "Bogor",
    attendanceHistory: [
      { date: "2025-04-02", status: "Izin" },
    ],
  },
];


export default function UserTable() {
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400">
                    Nama
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400">
                    Email
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400">
                    Role
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400">
                    Nomor Telepon
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400">
                    Perusahaan
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {usersData.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCell className="px-5 py-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={user.image}
                            alt={user.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                            {user.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">
                      {user.role}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">
                      {user.company}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <UserDetailModal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </>
  );
}
