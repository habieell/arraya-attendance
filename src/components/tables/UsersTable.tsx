"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal/Modal";
import { CreateButton } from "@/components/ui/button/ButtonCreate";
import FormUsers from "@/components/form/create/FormUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import UserDetailModal from "../example/ModalExample/UserDetailModal";
import { useUsers } from "@/hooks/useUsers"; 
import { User } from "@/components/types/user";

export default function UserTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | undefined>();
  const { isOpen, openModal, closeModal } = useModal();

  const { users, loading, error } = useUsers(); 

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    setRole(userRole);
  }, []);

  const handleAdd = () => {
    openModal(); // pakai modal yang sudah ada
  };

  // Optional handler untuk edit/hapus (placeholder)
  const handleEdit = () => alert("Edit karyawan (fitur ini perlu dibuat)");
  const handleDelete = () => alert("Hapus karyawan (fitur ini perlu dibuat)");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Terjadi kesalahan saat memuat data.</p>;

  return (
    <>
      <div className="text-end">
        <CreateButton onClick={openModal} />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <FormUsers />
      </Modal>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader>Nama</TableCell>
                  <TableCell isHeader>Email</TableCell>
                  <TableCell isHeader>Role</TableCell>
                  <TableCell isHeader>Nomor Telepon</TableCell>
                  <TableCell isHeader>Perusahaan</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.isArray(users) ? (
  users.map((user) => (
    <TableRow
      key={user.id}
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.05]"
      onClick={() => setSelectedUser(user)}
    >
      <TableCell className="px-5 py-4 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100">
            <Image
              width={40}
              height={40}
              src={"/avatar-placeholder.png"}
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
      <TableCell className="text-sm text-gray-500">{user.email}</TableCell>
      <TableCell className="text-sm text-gray-500">{user.roleId??  "-"}</TableCell>
      <TableCell className="text-sm text-gray-500">{user.companyid?? "-"}</TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
      Data pengguna tidak tersedia.
    </TableCell>
  </TableRow>
)}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* <UserDetailModal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      /> */}
    </>
  );
}
