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

// Definisi tipe data untuk karyawan
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

// Data karyawan
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
  },
  {
    id: 3,
    image: "/images/user/user-19.jpg",
    name: "Zain Geidt",
    email: "zain@example.com",
    role: "Content Writer",
    phone: "+62 813 4444 5555",
    company: "IC Global",
    address: "Jl. Mawar No. 20, Surabaya",
    birthPlace: "Surabaya",
    birthDate: "1992-09-15",
    domicile: "Surabaya",
  },
  {
    id: 4,
    image: "/images/user/user-20.jpg",
    name: "Abram Schleifer",
    email: "abram@example.com",
    role: "Digital Marketer",
    phone: "+62 812 6666 7777",
    company: "IC Global",
    address: "Jl. Anggrek No. 5, Yogyakarta",
    birthPlace: "Yogyakarta",
    birthDate: "1985-12-30",
    domicile: "Yogyakarta",
  },
  {
    id: 5,
    image: "/images/user/user-21.jpg",
    name: "Carla George",
    email: "carla@example.com",
    role: "Front-end Developer",
    phone: "+62 812 8888 9999",
    company: "Ay's On You",
    address: "Jl. Dahlia No. 8, Medan",
    birthPlace: "Medan",
    birthDate: "1991-07-18",
    domicile: "Medan",
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

      {/* Modal untuk menampilkan detail karyawan */}
      <UserDetailModal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </>
  );
}
